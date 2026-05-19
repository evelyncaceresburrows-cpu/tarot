// payment.js · cliente para iniciar compra de Cruz Celta.
//
// Llama a la Edge Function `create-payment` que crea una orden en Flow.cl,
// devuelve la URL de checkout, y el frontend redirige al usuario.

import { supabase, isAuthConfigured, getSession } from './auth.js'

export const CRUZ_CELTA_PRICE_CLP = 2000

/**
 * Inicia el flujo de compra de una Cruz Celta.
 * Llama a la edge function, recibe { url, token } y redirige al checkout
 * de Flow. La función puede tardar 1-3 segundos.
 *
 * Devuelve antes de redirigir si hay error.
 */
export async function startCruzCeltaPayment() {
  if (!isAuthConfigured()) {
    throw new Error('Pagos no disponibles en este entorno.')
  }

  const session = await getSession()
  if (!session?.access_token) {
    throw new Error('Necesitas estar autenticado para comprar.')
  }

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
    }
  })

  if (!res.ok) {
    let detail = ''
    try { detail = (await res.json()).error || (await res.text()) } catch {}
    throw new Error(detail || `Error ${res.status} al iniciar el pago.`)
  }

  const data = await res.json()
  if (!data.url || !data.token) {
    throw new Error('Respuesta inválida de la pasarela.')
  }

  // Flow espera que redirijamos a `${url}?token=${token}`.
  // La persona paga en Flow, después vuelve a APP_BASE_URL/?payment=return
  // donde el frontend chequeará si su payment quedó completed.
  window.location.href = `${data.url}?token=${data.token}`
}

/**
 * Chequea si la URL actual viene de un retorno de Flow.
 * El backend redirige a /?payment=return después del checkout.
 */
export function isPaymentReturn() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('payment') === 'return'
}

/**
 * Extrae el token de Flow que viene en la URL al volver del checkout.
 * Flow lo agrega automáticamente al urlReturn que le pasamos.
 */
export function getPaymentReturnToken() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}

/**
 * Limpia los query params del retorno de pago para que no queden en la URL.
 */
export function clearPaymentReturnParams() {
  if (typeof window === 'undefined' || !window.history) return
  try {
    const url = new URL(window.location.href)
    url.searchParams.delete('payment')
    url.searchParams.delete('token')
    window.history.replaceState({}, '', url.toString())
  } catch (_) {}
}

/**
 * Verifica activamente el estado del pago consultando a Flow.
 * Devuelve { status: 'completed' | 'pending' | 'failed', payment_id, uses_remaining }.
 *
 * Esto NO depende del webhook: la edge function consulta Flow directamente.
 * Si el pago se completó, también marca el row en payments para que el
 * gate de Cruz Celta lo encuentre.
 */
export async function verifyPaymentStatus(token) {
  if (!isAuthConfigured()) throw new Error('Auth no configurado.')
  const session = await getSession()
  if (!session?.access_token) throw new Error('Necesitas estar autenticado.')

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ token })
  })

  if (!res.ok) {
    let detail = ''
    try { detail = (await res.json()).error || (await res.text()) } catch {}
    throw new Error(detail || `Error ${res.status} verificando pago.`)
  }

  return await res.json()
}

/**
 * Polling de verifyPaymentStatus hasta completed o agotar reintentos.
 * Devuelve el último resultado (o lanza si error de red).
 *
 *   onProgress(attempt, total) — callback opcional para UI.
 */
export async function pollPaymentStatus(token, opts = {}) {
  const maxAttempts = opts.maxAttempts || 15  // 15 × 2s = 30s máximo
  const intervalMs = opts.intervalMs || 2000
  const onProgress = opts.onProgress || (() => {})

  let last = null
  for (let i = 0; i < maxAttempts; i++) {
    onProgress(i + 1, maxAttempts)
    try {
      last = await verifyPaymentStatus(token)
      if (last.status === 'completed') return last
      if (last.status === 'failed') return last
      // status === 'pending' → esperar y reintentar
    } catch (e) {
      // Si hay error de red, esperamos también y reintentamos.
      last = { status: 'error', error: String(e) }
    }
    if (i < maxAttempts - 1) {
      await new Promise(r => setTimeout(r, intervalMs))
    }
  }
  return last || { status: 'pending' }
}
