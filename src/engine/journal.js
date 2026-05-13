// Diario · persistencia local de lecturas
//
// Una app de tarot contemplativo necesita memoria. No para hacer
// estadísticas, sino para que la práctica acumule textura: la persona
// puede volver a una lectura, leer su intención del momento, ver qué
// cartas salieron, agregar una nota después.
//
// Persistencia: localStorage. Sin backend. Sin telemetría. El diario
// vive en el dispositivo de la persona y solo ahí.
//
// Estructura de una entrada:
// {
//   id: string (uuid local),
//   timestamp: number (Date.now()),
//   dateISO: string (YYYY-MM-DD para agrupar por día),
//   type: 'unica' | 'tres' | 'celtica',
//   intention: string,
//   cards: Array<{ id: string, reversed: boolean, position?: string }>,
//   summary: string (tesis o primera línea de la lectura, para preview),
//   note: string (opcional, editable después)
// }
//
// API pública: list, save, get, update, remove, clear.

const KEY = 'tarot.ade.journal.v1'
const MAX_ENTRIES = 500 // tope blando — más allá de eso pedimos limpieza

function safeRead() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return []
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (_) {
    return []
  }
}

function safeWrite(entries) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    window.localStorage.setItem(KEY, JSON.stringify(entries))
    return true
  } catch (_) {
    // localStorage lleno o modo privado: silenciamos. No queremos
    // romper la lectura por no poder guardar el diario.
    return false
  }
}

function generateId() {
  // uuid local liviano. No necesitamos crypto-grade — solo único en
  // este dispositivo.
  return `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function toDateISO(ts) {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function listEntries() {
  const entries = safeRead()
  // orden cronológico inverso — la última lectura primero
  return entries.slice().sort((a, b) => b.timestamp - a.timestamp)
}

export function getEntry(id) {
  const entries = safeRead()
  return entries.find(e => e.id === id) || null
}

export function saveEntry({ type, intention, cards, summary }) {
  const entries = safeRead()
  const ts = Date.now()
  const entry = {
    id: generateId(),
    timestamp: ts,
    dateISO: toDateISO(ts),
    type: type || 'unica',
    intention: typeof intention === 'string' ? intention.trim() : '',
    cards: Array.isArray(cards) ? cards : [],
    summary: typeof summary === 'string' ? summary.trim() : '',
    note: ''
  }
  entries.push(entry)
  // tope blando: si pasamos MAX, descartamos las más viejas
  if (entries.length > MAX_ENTRIES) {
    entries.sort((a, b) => b.timestamp - a.timestamp)
    entries.length = MAX_ENTRIES
  }
  safeWrite(entries)
  return entry
}

export function updateNote(id, note) {
  const entries = safeRead()
  const idx = entries.findIndex(e => e.id === id)
  if (idx === -1) return false
  entries[idx] = { ...entries[idx], note: typeof note === 'string' ? note : '' }
  return safeWrite(entries)
}

export function removeEntry(id) {
  const entries = safeRead()
  const next = entries.filter(e => e.id !== id)
  if (next.length === entries.length) return false
  return safeWrite(next)
}

export function clearAll() {
  return safeWrite([])
}

// Conveniencia: agrupar por día para la vista de diario.
export function groupByDay(entries) {
  const groups = new Map()
  for (const e of entries) {
    const k = e.dateISO
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(e)
  }
  // devolvemos array de [dateISO, entries[]] ordenado descendente
  return Array.from(groups.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
}

// Formato humano de fecha para los headers de día.
// "Hoy" / "Ayer" / "Lun 12 may" / "12 may 2025"
export function humanDate(dateISO) {
  if (!dateISO) return ''
  const today = toDateISO(Date.now())
  if (dateISO === today) return 'Hoy'
  const yesterday = toDateISO(Date.now() - 86400000)
  if (dateISO === yesterday) return 'Ayer'

  const [y, m, d] = dateISO.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']

  const sameYear = date.getFullYear() === new Date().getFullYear()
  if (sameYear) {
    return `${dias[date.getDay()]} ${d} ${meses[m - 1]}`
  }
  return `${d} ${meses[m - 1]} ${y}`
}

// Formato corto de hora para el detalle.
export function humanTime(timestamp) {
  if (!timestamp) return ''
  const d = new Date(timestamp)
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${min}`
}
