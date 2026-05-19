// Edge Function · flow-webhook
//
// Flow llama a este endpoint cuando un pago cambia de estado.
// Es un POST application/x-www-form-urlencoded con un único campo `token`.
//
// Pasos:
//   1. Recibir el token.
//   2. Consultar /payment/getStatus en Flow con ese token.
//   3. Si status === 2 (pagado), marcar el payment en Supabase como completed.
//   4. Devolver 200 OK siempre que el procesamiento haya sido válido.
//
// IMPORTANTE: Este endpoint NO requiere autenticación de usuario (lo llama
// Flow, no el cliente). Pero validamos el token consultando a Flow de vuelta —
// nadie puede falsificar un pago sin tener el token real generado por Flow.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { getFlowConfig, flowGet } from '../_shared/flow.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // 1. Leer el form-urlencoded.
    const formText = await req.text()
    const params = Object.fromEntries(new URLSearchParams(formText))
    const token = params.token
    if (!token) {
      console.error('flow-webhook: no token')
      return new Response('Missing token', { status: 400 })
    }

    // 2. Consultar status del pago en Flow.
    const flow = getFlowConfig()
    const statusResp = await flowGet(
      '/payment/getStatus',
      { apiKey: flow.apiKey, token },
      flow
    )

    const flowStatus    = statusResp.status         // 1=pending, 2=paid, 3=rejected, 4=cancelled
    const commerceOrder = statusResp.commerceOrder  // nuestro payment.id (uuid)

    if (!commerceOrder) {
      console.error('flow-webhook: respuesta sin commerceOrder', statusResp)
      return new Response('Invalid response from Flow', { status: 500 })
    }

    // 3. Actualizar el payment en Supabase.
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const admin = createClient(supabaseUrl, serviceRole)

    let newStatus: string
    let completedAt: string | null = null

    switch (flowStatus) {
      case 2:
        newStatus = 'completed'
        completedAt = new Date().toISOString()
        break
      case 3:
        newStatus = 'failed'
        break
      case 4:
        newStatus = 'failed'
        break
      default:
        newStatus = 'pending'
    }

    const { error: updateErr } = await admin
      .from('payments')
      .update({
        status: newStatus,
        completed_at: completedAt
      })
      .eq('id', commerceOrder)

    if (updateErr) {
      console.error('flow-webhook: error actualizando payment', updateErr)
      return new Response('Internal error', { status: 500 })
    }

    console.log(`flow-webhook: payment ${commerceOrder} → ${newStatus} (flowStatus=${flowStatus})`)
    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('flow-webhook error:', err)
    return new Response('Internal error', { status: 500 })
  }
})
