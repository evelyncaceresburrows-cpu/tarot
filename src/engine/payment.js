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
 * Limpia los query params del retorno de pago para que no queden en la URL.
 */
export function clearPaymentReturnParams() {
  if (typeof window === 'undefined' || !window.history) return
  try {
    const url = new URL(window.location.href)
    url.searchParams.delete('payment')
    window.history.replaceState({}, '', url.toString())
  } catch (_) {}
}
