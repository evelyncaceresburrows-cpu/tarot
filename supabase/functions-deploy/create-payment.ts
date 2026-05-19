// Edge Function · create-payment (deploy combinado · inline _shared)
//
// Llamada por el cliente cuando alguien autenticado toca "Comprar Cruz Celta"
// en el Paywall. Crea un row en payments (pending), llama a Flow.cl
// /payment/create, y devuelve url+token al cliente para redirigir.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// ============================================================
// CORS (antes en _shared/cors.ts)
// ============================================================
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
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400'
  }
}

// ============================================================
// FLOW HELPERS (antes en _shared/flow.ts)
// ============================================================
const enc = new TextEncoder()

interface FlowConfig {
  apiKey: string
  secretKey: string
  baseUrl: string
}

function getFlowConfig(): FlowConfig {
  const apiKey    = Deno.env.get('FLOW_API_KEY')
  const secretKey = Deno.env.get('FLOW_SECRET_KEY')
  const baseUrl   = Deno.env.get('FLOW_BASE_URL') || 'https://sandbox.flow.cl/api'
  if (!apiKey || !secretKey) {
    throw new Error('FLOW_API_KEY y FLOW_SECRET_KEY son requeridos')
  }
  return { apiKey, secretKey, baseUrl }
}

async function signFlowParams(
  params: Record<string, string | number>,
  secretKey: string
): Promise<Record<string, string>> {
  const sorted = Object.keys(params).sort()
  const toSign = sorted.map(k => `${k}${params[k]}`).join('')
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(toSign))
  const hex = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0')).join('')
  const out: Record<string, string> = {}
  for (const k of sorted) out[k] = String(params[k])
  out.s = hex
  return out
}

async function flowPost(
  path: string,
  params: Record<string, string | number>,
  cfg: FlowConfig
): Promise<any> {
  const signed = await signFlowParams(params, cfg.secretKey)
  const body = new URLSearchParams(signed).toString()
  const res = await fetch(`${cfg.baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Flow ${path} → ${res.status}: ${text}`)
  try { return JSON.parse(text) }
  catch { throw new Error(`Flow ${path} → respuesta no-JSON: ${text}`) }
}

// ============================================================
// HANDLER
// ============================================================
const PRICE_CLP = parseInt(Deno.env.get('CRUZ_CELTA_PRICE_CLP') || '2000', 10)
const APP_BASE_URL = Deno.env.get('APP_BASE_URL') || 'https://adetarot.app'

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
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnon = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const authedClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } }
    })
    const { data: userData, error: userErr } = await authedClient.auth.getUser()
    if (userErr || !userData?.user) {
      return new Response(
        JSON.stringify({ error: 'Sesión inválida' }),
        { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }
    const userId = userData.user.id
    const userEmail = userData.user.email!

    const adminClient = createClient(supabaseUrl, supabaseServiceRole)
    const { data: payment, error: payErr } = await adminClient
      .from('payments')
      .insert({
        user_id: userId,
        amount_cents: PRICE_CLP * 100,
        currency: 'CLP',
        provider: 'flow',
        status: 'pending',
        uses_granted: 1,
        uses_consumed: 0
      })
      .select()
      .single()

    if (payErr || !payment) {
      console.error('payments insert error', payErr)
      return new Response(
        JSON.stringify({ error: 'No pude crear el pago' }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    const flow = getFlowConfig()
    const flowParams = {
      apiKey: flow.apiKey,
      commerceOrder: payment.id,
      subject: 'Cruz Celta · Tarot Ade',
      currency: 'CLP',
      amount: PRICE_CLP,
      email: userEmail,
      urlConfirmation: `${supabaseUrl}/functions/v1/flow-webhook`,
      urlReturn: `${APP_BASE_URL}/?payment=return`
    }

    let flowResp: any
    try {
      flowResp = await flowPost('/payment/create', flowParams, flow)
    } catch (e) {
      console.error('Flow /payment/create error:', e)
      await adminClient.from('payments').update({ status: 'failed' }).eq('id', payment.id)
      return new Response(
        JSON.stringify({ error: 'No pude conectar con Flow', detail: String(e) }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    await adminClient
      .from('payments')
      .update({ provider_payment_id: flowResp.token })
      .eq('id', payment.id)

    return new Response(
      JSON.stringify({ url: flowResp.url, token: flowResp.token, payment_id: payment.id }),
      { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('create-payment error:', err)
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: String(err) }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})
