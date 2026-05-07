/* =====================================================================
 * emotionalMemory.js
 *
 * Memoria emocional persistente (localStorage).
 *
 * No guarda CARTAS. Guarda ATMÓSFERAS:
 *   { dominantTemperature, rhythmPattern, narrativeMovement,
 *     suitConcentration, majorPresence, ts }
 *
 * Cuando llega una nueva tirada, se compara con las últimas N atmósferas
 * y, si hay un eco —misma temperatura, mismo movimiento o misma
 * concentración de palo—, se devuelve una micro-frase que la app
 * puede mostrar como continuidad emocional.
 *
 * No menciona cartas. Solo aire.
 * ===================================================================*/

const KEY = 'tarot-ade:atmospheres'
const MAX_KEEP = 12

/* ---------- IO ---------- */

export function loadAtmospheres() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveAtmosphere(diagnosis) {
  if (typeof window === 'undefined') return
  if (!diagnosis) return
  try {
    const prev = loadAtmospheres()
    const entry = {
      ts: Date.now(),
      dominantTemperature: diagnosis.dominantTemperature || null,
      rhythmPattern:       diagnosis.rhythmPattern || null,
      narrativeMovement:   diagnosis.narrativeMovement || null,
      suit:                diagnosis.suitConcentration?.suit || null,
      majorCount:          diagnosis.majorPresence?.count ?? 0
    }
    const next = [entry, ...prev].slice(0, MAX_KEEP)
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch { /* ignore */ }
}

/* ---------- DETECTOR DE ECOS ---------- */

/* Compara la atmósfera actual con las anteriores y devuelve la primera
 * coincidencia significativa (no la propia, no un eco trivial).
 * "Significativa" = comparte al menos UNO de:
 *   · misma temperatura dominante (cuando no es 'mixed' ni 'neutral')
 *   · mismo movimiento narrativo (cuando no es 'mixed')
 *   · mismo palo concentrado
 *
 * Devuelve { type, daysAgo } o null. */
export function findEcho(currentDiag) {
  if (!currentDiag) return null
  const prev = loadAtmospheres()
  /* la última guardada es esta misma; comparar contra las que la siguen */
  const others = prev.slice(1)
  if (others.length === 0) return null

  const curTemp = currentDiag.dominantTemperature
  const curMove = currentDiag.narrativeMovement
  const curSuit = currentDiag.suitConcentration?.suit

  for (const past of others) {
    /* Eco de temperatura (solo si no es 'mixed' ni 'neutral') */
    if (curTemp && curTemp !== 'mixed' && curTemp !== 'neutral'
        && past.dominantTemperature === curTemp) {
      return { type: 'temperature', value: curTemp, daysAgo: daysBetween(past.ts) }
    }
    /* Eco de movimiento */
    if (curMove && curMove !== 'mixed' && past.narrativeMovement === curMove) {
      return { type: 'movement', value: curMove, daysAgo: daysBetween(past.ts) }
    }
    /* Eco de palo concentrado */
    if (curSuit && past.suit === curSuit) {
      return { type: 'suit', value: curSuit, daysAgo: daysBetween(past.ts) }
    }
  }
  return null
}

function daysBetween(pastTs) {
  const ms = Date.now() - pastTs
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
}


/* ---------- COMPOSICIÓN DE FRASE ---------- */

/* Devuelve una frase corta lista para mostrar abajo de la síntesis,
 * o '' si no hay eco. No nombra cartas; solo atmósfera. */
export function composeEchoLine(currentDiag) {
  const echo = findEcho(currentDiag)
  if (!echo) return ''

  const when = phraseWhen(echo.daysAgo)

  if (echo.type === 'temperature') {
    const map = {
      'warm':            `${when} también apareció esta calidez`,
      'cold':            `${when} también apareció este frío lúcido`,
      'tense':           `${when} también latió esta tensión`,
      'cold-with-warmth':`${when} también apareció este clima frío con un punto cálido`,
      'warm-with-cold':  `${when} también apareció esta calidez con un rincón frío`,
      'tense-undertone': `${when} también pasó este nervio fino debajo de la calma`
    }
    return map[echo.value] ? map[echo.value] + '.' : ''
  }
  if (echo.type === 'movement') {
    const map = {
      'opening':           `${when} también algo se abría hacia afuera`,
      'gathering':         `${when} también algo volvía al centro`,
      'pause-in-the-middle':`${when} también apareció esta pausa en el medio`,
      'starting-to-move':  `${when} también algo empezaba a aflojar`,
      'pause-then-resume': `${when} también la lectura tenía este respiro`,
      'deeply-inward':     `${when} también todo miraba hacia adentro`,
      'fully-outward':     `${when} también todo empujaba hacia afuera`,
      'fully-suspended':   `${when} también todo estaba en pausa`
    }
    return map[echo.value] ? map[echo.value] + '.' : ''
  }
  if (echo.type === 'suit') {
    const map = {
      Copas:   `${when} también el centro estaba en lo emocional`,
      Espadas: `${when} también el centro estaba en lo mental`,
      Bastos:  `${when} también el centro estaba en el movimiento`,
      Oros:    `${when} también el centro estaba en lo concreto`
    }
    return map[echo.value] ? map[echo.value] + '.' : ''
  }
  return ''
}

function phraseWhen(daysAgo) {
  if (daysAgo === 0) return 'Hoy mismo'
  if (daysAgo === 1) return 'Ayer'
  if (daysAgo <= 3)  return `Hace ${daysAgo} días`
  if (daysAgo <= 7)  return 'Esta semana'
  if (daysAgo <= 14) return 'Hace un par de semanas'
  if (daysAgo <= 35) return 'Hace un mes'
  return 'Hace un tiempo'
}

/* ---------- DEBUG / RESET ---------- */

export function clearAtmospheres() {
  if (typeof window === 'undefined') return
  try { window.localStorage.removeItem(KEY) } catch { /* ignore */ }
}
