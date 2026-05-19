// Edge Function · create-payment
//
// Llamada por el cliente cuando alguien autenticado toca "Comprar Cruz Celta"
// en el Paywall.
//
// Pasos:
//   1. Verificar que el usuario está autenticado (Authorization: Bearer <jwt>).
//   2. Crear un row en payments con status='pending' y uses_granted=1.
//   3. Llamar a Flow /payment/create con el payment.id como commerceOrder.
//   4. Devolver al cliente { url, token } para que redirija al checkout.
//
// El cliente luego hace window.location = `${url}?token=${token}` y la persona
// paga en Flow. Cuando Flow confirma el pago, el webhook actualiza el payment
// en la tabla a status='completed'.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { getFlowConfig, flowPost } from '../_shared/flow.ts'
import { corsHeaders } from '../_shared/cors.ts'

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
    // 1. Autenticación · necesitamos el JWT del cliente para identificar al usuario
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

    // Cliente con el JWT del usuario, para que la RLS valide su identidad
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

    // 2. Crear payment con status='pending'.
    // Usamos service role porque payments no tiene policy INSERT para clientes.
    const adminClient = createClient(supabaseUrl, supabaseServiceRole)
    const { data: payment, error: payErr } = await adminClient
      .from('payments')
      .insert({
        user_id: userId,
        amount_cents: PRICE_CLP * 100, // guardamos en "centavos" para consistencia, aunque CLP no tiene decimales
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

    // 3. Crear orden en Flow.
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
      // Marcar el payment como failed para que no quede pending huérfano
      await adminClient
        .from('payments')
        .update({ status: 'failed' })
        .eq('id', payment.id)
      return new Response(
        JSON.stringify({ error: 'No pude conectar con Flow', detail: String(e) }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    // 4. Guardar el token de Flow en el payment para correlacionar.
    await adminClient
      .from('payments')
      .update({ provider_payment_id: flowResp.token })
      .eq('id', payment.id)

    // 5. Devolver al cliente la URL para redirigir.
    // El cliente hace `window.location = `${url}?token=${token}``
    return new Response(
      JSON.stringify({
        url: flowResp.url,
        token: flowResp.token,
        payment_id: payment.id
      }),
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
