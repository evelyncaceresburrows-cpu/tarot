// Auth · cliente Supabase + magic link.
//
// La identidad de Tarot Ade es deliberadamente liviana: email + magic
// link. Sin contraseñas, sin redes sociales. La persona escribe su
// correo, recibe un enlace, vuelve a la app autenticada. Eso es todo.
//
// Si las variables de entorno no están configuradas (entorno de
// desarrollo sin Supabase aún), el módulo se desactiva grácilmente:
// isAuthConfigured() devuelve false y el resto de la app puede caer
// en un fallback (en MVP: dejar pasar a Cruz Celta para no romper la
// experiencia).

import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (URL && KEY)
  ? createClient(URL, KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : null

export function isAuthConfigured() {
  return !!supabase
}

// Envía el magic link al email. La URL de redirección vuelve a la app.
export async function sendMagicLink(email) {
  if (!supabase) throw new Error('La autenticación no está configurada todavía.')
  const cleanEmail = (email || '').trim().toLowerCase()
  if (!cleanEmail || cleanEmail.indexOf('@') === -1) {
    throw new Error('Escribe un correo válido.')
  }
  const redirectTo =
    typeof window !== 'undefined' && window.location
      ? window.location.origin + '/'
      : undefined

  const { error } = await supabase.auth.signInWithOtp({
    email: cleanEmail,
    options: {
      emailRedirectTo: redirectTo,
      // shouldCreateUser default true — si no existe, se crea.
    }
  })
  if (error) throw error
}

export async function getCurrentUser() {
  if (!supabase) return null
  try {
    const { data } = await supabase.auth.getUser()
    return data && data.user ? data.user : null
  } catch (_) {
    return null
  }
}

export async function getSession() {
  if (!supabase) return null
  try {
    const { data } = await supabase.auth.getSession()
    return data && data.session ? data.session : null
  } catch (_) {
    return null
  }
}

export async function signOut() {
  if (!supabase) return
  try { await supabase.auth.signOut() } catch (_) {}
}

// Listener de cambios de sesión. Devuelve función para desuscribirse.
export function onAuthChange(cb) {
  if (!supabase) return () => {}
  try {
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      cb(session && session.user ? session.user : null)
    })
    return () => {
      try { sub.data.subscription.unsubscribe() } catch (_) {}
    }
  } catch (_) {
    return () => {}
  }
}
