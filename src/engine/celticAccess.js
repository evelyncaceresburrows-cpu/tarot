// celticAccess · gate de la Cruz Celta.
//
// Modelo: primera Cruz Celta gratis por cuenta. Después paga.
//
// Estados posibles que devuelve checkCelticAccess():
//
//   { state: 'unconfigured' }
//      Supabase no está configurado (env vars vacías). En MVP/dev se
//      deja pasar para no romper la app. El llamador decide.
//
//   { state: 'needs_signup' }
//      No hay sesión. Mandar a inscripción (email + magic link).
//
//   { state: 'allowed', remaining: 'free', paymentId: null }
//      Tiene su tirada gratuita disponible.
//
//   { state: 'allowed', remaining: 'paid', paymentId: '<uuid>' }
//      Tiene al menos un pago con usos disponibles.
//
//   { state: 'needs_payment' }
//      Ya usó su tirada gratis y no tiene pagos activos.
//
// consumeCelticUse(access) registra el consumo una vez que la Cruz
// Celta efectivamente se completó. No descuenta antes — si el flujo
// se aborta a mitad, no se gasta el uso.

import { supabase, isAuthConfigured, getCurrentUser } from './auth.js'

export async function checkCelticAccess() {
  if (!isAuthConfigured()) {
    return { state: 'unconfigured' }
  }

  const user = await getCurrentUser()
  if (!user) {
    return { state: 'needs_signup' }
  }

  // ¿Ya usó su tirada gratis?
  try {
    const { count: freeCount, error: freeErr } = await supabase
      .from('celtic_uses')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('source', 'free')

    if (freeErr) throw freeErr

    if (!freeCount || freeCount === 0) {
      return { state: 'allowed', remaining: 'free', paymentId: null }
    }
  } catch (e) {
    // Si la consulta falla, somos conservadores: pedir pago.
    console.warn('checkCelticAccess: error chequeando free uses', e)
    return { state: 'needs_payment' }
  }

  // ¿Tiene un pago activo con usos disponibles?
  try {
    const { data: payments, error: payErr } = await supabase
      .from('payments')
      .select('id, uses_granted, uses_consumed, created_at')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: true })

    if (payErr) throw payErr

    const available = (payments || []).find(p => p.uses_consumed < p.uses_granted)
    if (available) {
      return { state: 'allowed', remaining: 'paid', paymentId: available.id }
    }
  } catch (e) {
    console.warn('checkCelticAccess: error chequeando pagos', e)
  }

  return { state: 'needs_payment' }
}

// Registrar el uso al terminar la lectura.
// access es el objeto devuelto por checkCelticAccess al iniciar.
export async function consumeCelticUse(access) {
  if (!isAuthConfigured() || !access || access.state !== 'allowed') return

  const user = await getCurrentUser()
  if (!user) return

  try {
    if (access.remaining === 'free') {
      await supabase
        .from('celtic_uses')
        .insert({ user_id: user.id, source: 'free' })
    } else if (access.remaining === 'paid' && access.paymentId) {
      // RPC atómica: descuenta uso + registra el celtic_use 'paid'.
      await supabase.rpc('consume_paid_use', { p_payment_id: access.paymentId })
    }
  } catch (e) {
    // Silenciamos para no romper el flujo de lectura. El log queda
    // para diagnóstico.
    console.warn('consumeCelticUse: fallo al registrar', e)
  }
}
