// Edge Function · verify-payment
//
// Llamada por el cliente cuando vuelve de Flow después del checkout.
// Consulta a Flow /payment/getStatus con el token, y si el pago está
// confirmado, marca el payment en la tabla como completed.
//
// Esto resuelve la race condition del webhook: en lugar de esperar
// que Flow nos avise (puede tardar 1-2 minutos), nosotros consultamos
// activamente y damos acceso inmediato si Flow ya tiene el pago.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// CORS
const ALLOWED_ORIGINS = [
  'https://adetarot.app',
  'https://www.adetarot.app',
  'https://tarot-zeta-eosin.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
]
function corsHeaders(origin: string | null): HeadersInit {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : 'https://adetarot.app'
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
  }
}

// Flow helpers
const enc = new TextEncoder()

async function signParams(params: Record<string, string | number>, secret: string) {
  const sorted = Object.keys(params).sort()
  const toSign = sorted.map(k => `${k}${params[k]}`).join('')
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(toSign))
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('Origin'))

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors })
  }
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Autenticación
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const { token } = await req.json()
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token requerido' }),
        { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnon = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const flowApiKey = Deno.env.get('FLOW_API_KEY')!
    const flowSecret = Deno.env.get('FLOW_SECRET_KEY')!
    const flowBase = Deno.env.get('FLOW_BASE_URL') || 'https://www.flow.cl/api'

    // Verificar identidad del usuario
    const authed = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } }
    })
    const { data: userData } = await authed.auth.getUser()
    if (!userData?.user) {
      return new Response(
        JSON.stringify({ error: 'Sesión inválida' }),
        { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    // Consultar status del pago en Flow
    const params = { apiKey: flowApiKey, token }
    const sig = await signParams(params, flowSecret)
    const qs = new URLSearchParams({ ...params, s: sig }).toString()

    let flowResp: any
    try {
      const r = await fetch(`${flowBase}/payment/getStatus?${qs}`)
      const text = await r.text()
      if (!r.ok) {
        return new Response(
          JSON.stringify({ error: 'Error consultando Flow', detail: text }),
          { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
        )
      }
      flowResp = JSON.parse(text)
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'No pude conectar con Flow', detail: String(e) }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const flowStatus = flowResp.status    // 1=pending, 2=paid, 3=rejected, 4=cancelled
    const commerceOrder = flowResp.commerceOrder

    if (!commerceOrder) {
      return new Response(
        JSON.stringify({ error: 'Respuesta inválida de Flow' }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    // Mapear y actualizar el payment en la tabla
    const admin = createClient(supabaseUrl, serviceRole)
    let newStatus: string
    let completedAt: string | null = null
    let humanStatus: 'completed' | 'pending' | 'failed'

    switch (flowStatus) {
      case 2:
        newStatus = 'completed'
        completedAt = new Date().toISOString()
        humanStatus = 'completed'
        break
      case 3:
      case 4:
        newStatus = 'failed'
        humanStatus = 'failed'
        break
      default:
        newStatus = 'pending'
        humanStatus = 'pending'
    }

    // Solo actualizamos si el estado actual no es ya completed (idempotencia)
    const { data: current } = await admin
      .from('payments')
      .select('status')
      .eq('id', commerceOrder)
      .single()

    if (current?.status !== 'completed') {
      await admin
        .from('payments')
        .update({ status: newStatus, completed_at: completedAt })
        .eq('id', commerceOrder)
    }

    // Verificamos que el payment sea del usuario que llama
    const { data: payment } = await admin
      .from('payments')
      .select('user_id, uses_granted, uses_consumed, status')
      .eq('id', commerceOrder)
      .single()

    if (payment?.user_id !== userData.user.id) {
      return new Response(
        JSON.stringify({ error: 'Pago no corresponde al usuario' }),
        { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        status: humanStatus,
        flow_status: flowStatus,
        payment_id: commerceOrder,
        uses_remaining: payment ? Math.max(0, payment.uses_granted - payment.uses_consumed) : 0
      }),
      { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('verify-payment error:', err)
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: String(err) }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})
