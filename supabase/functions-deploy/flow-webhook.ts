// Edge Function · flow-webhook (deploy combinado · inline _shared)
//
// Flow llama acá cuando un pago cambia de estado. Recibimos el token,
// consultamos status en Flow, y actualizamos el payment en Supabase.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

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

async function flowGet(
  path: string,
  params: Record<string, string | number>,
  cfg: FlowConfig
): Promise<any> {
  const signed = await signFlowParams(params, cfg.secretKey)
  const qs = new URLSearchParams(signed).toString()
  const res = await fetch(`${cfg.baseUrl}${path}?${qs}`)
  const text = await res.text()
  if (!res.ok) throw new Error(`Flow ${path} → ${res.status}: ${text}`)
  try { return JSON.parse(text) }
  catch { throw new Error(`Flow ${path} → respuesta no-JSON: ${text}`) }
}

// ============================================================
// HANDLER
// ============================================================
Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const formText = await req.text()
    const params = Object.fromEntries(new URLSearchParams(formText))
    const token = params.token
    if (!token) {
      console.error('flow-webhook: no token')
      return new Response('Missing token', { status: 400 })
    }

    const flow = getFlowConfig()
    const statusResp = await flowGet(
      '/payment/getStatus',
      { apiKey: flow.apiKey, token },
      flow
    )

    const flowStatus    = statusResp.status
    const commerceOrder = statusResp.commerceOrder

    if (!commerceOrder) {
      console.error('flow-webhook: respuesta sin commerceOrder', statusResp)
      return new Response('Invalid response from Flow', { status: 500 })
    }

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
      case 3: newStatus = 'failed'; break
      case 4: newStatus = 'failed'; break
      default: newStatus = 'pending'
    }

    const { error: updateErr } = await admin
      .from('payments')
      .update({ status: newStatus, completed_at: completedAt })
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
