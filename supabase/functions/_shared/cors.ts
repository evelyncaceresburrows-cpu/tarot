// CORS headers para las edge functions.
// La app vive en adetarot.app + tarot-zeta-eosin.vercel.app + localhost dev.

export const ALLOWED_ORIGINS = [
  'https://adetarot.app',
  'https://www.adetarot.app',
  'https://tarot-zeta-eosin.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
]

export function corsHeaders(origin: string | null): HeadersInit {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : 'https://adetarot.app'
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400'
  }
}
