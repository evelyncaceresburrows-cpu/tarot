// Shared utilities para integración con Flow.cl
//
// Flow firma las requests con HMAC-SHA256 sobre los parámetros ordenados
// alfabéticamente y concatenados como key=value (sin = ni & entre pares).
// La signature se envía como parámetro `s` junto con el resto.

const enc = new TextEncoder()

export interface FlowConfig {
  apiKey: string
  secretKey: string
  baseUrl: string  // 'https://sandbox.flow.cl/api' o 'https://www.flow.cl/api'
}

export function getFlowConfig(): FlowConfig {
  const apiKey    = Deno.env.get('FLOW_API_KEY')
  const secretKey = Deno.env.get('FLOW_SECRET_KEY')
  const baseUrl   = Deno.env.get('FLOW_BASE_URL') || 'https://sandbox.flow.cl/api'
  if (!apiKey || !secretKey) {
    throw new Error('FLOW_API_KEY y FLOW_SECRET_KEY son requeridos en env')
  }
  return { apiKey, secretKey, baseUrl }
}

/**
 * Firma un objeto de parámetros para Flow.
 * Devuelve el mismo objeto con el campo `s` agregado (signature).
 */
export async function signFlowParams(
  params: Record<string, string | number>,
  secretKey: string
): Promise<Record<string, string>> {
  // 1. Ordenar alfabéticamente
  const sorted = Object.keys(params).sort()

  // 2. Concatenar key + value (sin separadores)
  const toSign = sorted.map(k => `${k}${params[k]}`).join('')

  // 3. HMAC-SHA256 con la secretKey
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(toSign))
  const hex = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  const out: Record<string, string> = {}
  for (const k of sorted) out[k] = String(params[k])
  out.s = hex
  return out
}

/**
 * Verifica una signature recibida de Flow.
 * Útil en el webhook: Flow firma su POST con la secretKey y debemos verificar.
 */
export async function verifyFlowSignature(
  params: Record<string, string>,
  secretKey: string
): Promise<boolean> {
  const incoming = params.s
  if (!incoming) return false
  const { s: _omit, ...rest } = params
  const signed = await signFlowParams(rest as Record<string, string>, secretKey)
  return signed.s === incoming
}

/**
 * Hace POST application/x-www-form-urlencoded a Flow.
 * Devuelve la respuesta parseada como JSON.
 */
export async function flowPost(
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
  if (!res.ok) {
    throw new Error(`Flow ${path} → ${res.status}: ${text}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Flow ${path} → respuesta no-JSON: ${text}`)
  }
}

/**
 * GET con signature como query param.
 * Se usa para consultar status, etc.
 */
export async function flowGet(
  path: string,
  params: Record<string, string | number>,
  cfg: FlowConfig
): Promise<any> {
  const signed = await signFlowParams(params, cfg.secretKey)
  const qs = new URLSearchParams(signed).toString()
  const res = await fetch(`${cfg.baseUrl}${path}?${qs}`)
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Flow ${path} → ${res.status}: ${text}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Flow ${path} → respuesta no-JSON: ${text}`)
  }
}
