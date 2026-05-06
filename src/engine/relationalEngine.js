/* =====================================================================
 * relationalEngine.js
 *
 * Motor relacional para tiradas de 3 cartas.
 *
 * El problema que resuelve:
 *   La síntesis vieja sumaba lecturas individuales con una frase
 *   genérica al cierre — se sentía template.
 *
 * Lo que hace este motor:
 *   1) Enriquece cada carta con su huella energética
 *      (ver cardEnergetics.js).
 *   2) Detecta 6 patrones relacionales sobre las 3 cartas:
 *        • temperatura dominante
 *        • contradicciones (frío vs calor, adentro vs afuera, etc.)
 *        • movimiento narrativo (apertura, recogimiento, pausa)
 *        • concentración de palos (Menores)
 *        • presencia de Arcanos Mayores
 *        • patrón rítmico (lento, rápido, en pulsos, quebrado)
 *   3) Compone una lectura atmosférica a partir de la INTERACCIÓN,
 *      no a partir de las cartas aisladas.
 *
 * Lo que NO hace:
 *   - No usa IA generativa.
 *   - No reescribe el contenido emocional de cada carta (essence,
 *     reading, prompt). Eso sigue viviendo en majorArcanaSymbolic /
 *     minorArcanaCards.
 *
 * Determinismo con variación:
 *   Para que la lectura no se sienta repetitiva entre tiradas con
 *   patrones similares, hay variantes por patrón y se elige una con
 *   un hash estable derivado de los nombres de las cartas. Misma
 *   tirada → misma síntesis. Tirada distinta con mismo patrón →
 *   variante distinta.
 * ===================================================================*/

import { getCardEnergetics, isMajor, enrichCard } from './cardEnergetics.js'


/* =====================================================================
 * Hash determinístico simple (para elegir variantes sin repetirse).
 * ===================================================================*/
function hashSeed(cards) {
  const s = (cards || []).map(c => c?.name || `${c?.suit}/${c?.number}` || '').join('|')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function pickVariant(arr, seed) {
  if (!arr || arr.length === 0) return ''
  return arr[seed % arr.length]
}


/* =====================================================================
 * DETECTORES
 * ===================================================================*/

/* Temperatura dominante en la lectura. */
function detectDominantTemperature(es) {
  const counts = { warm: 0, cold: 0, neutral: 0, tense: 0 }
  es.forEach(e => { counts[e.energy.temperature] = (counts[e.energy.temperature] || 0) + 1 })

  if (counts.tense >= 2)                          return 'tense'
  if (counts.cold === 3)                          return 'cold'
  if (counts.warm === 3)                          return 'warm'
  if (counts.cold >= 2 && counts.warm >= 1)       return 'cold-with-warmth'
  if (counts.warm >= 2 && counts.cold >= 1)       return 'warm-with-cold'
  if (counts.tense >= 1 && counts.warm + counts.cold >= 1) return 'tense-undertone'
  if (counts.warm >= 2)                           return 'warm'
  if (counts.cold >= 2)                           return 'cold'
  if (counts.neutral >= 2)                        return 'neutral'
  return 'mixed'
}

/* Contradicciones entre cartas: temperatura, dirección, ritmo. */
function detectContradictions(es) {
  const out = []
  const temps    = new Set(es.map(e => e.energy.temperature))
  const dirs     = new Set(es.map(e => e.energy.direction))
  const rhythms  = new Set(es.map(e => e.energy.rhythm))
  const types    = new Set(es.map(e => e.energy.energyType))

  if (temps.has('warm') && temps.has('cold')) {
    out.push({ type: 'temperature', detail: 'frío y calor coexisten' })
  }
  if (dirs.has('inward') && dirs.has('outward')) {
    out.push({ type: 'direction', detail: 'una parte se vuelca afuera mientras otra pide adentro' })
  }
  if (rhythms.has('fast') && rhythms.has('slow')) {
    out.push({ type: 'rhythm', detail: 'velocidades distintas conviviendo' })
  }
  if (types.has('mental') && types.has('emotional')) {
    out.push({ type: 'energyType', detail: 'lo que la cabeza pide y lo que el cuerpo siente no coinciden' })
  }
  if (types.has('active') && types.has('grounded')) {
    out.push({ type: 'energyType', detail: 'el impulso de avanzar y la necesidad de quedarse se cruzan' })
  }
  return out
}

/* Lectura del arco direccional posición1 → posición2 → posición3. */
function detectNarrativeMovement(es) {
  const [a, b, c] = es.map(e => e.energy.direction)

  if (a === 'inward'    && c === 'outward')                       return 'opening'
  if (a === 'outward'   && c === 'inward')                        return 'gathering'
  if (b === 'suspended' && a !== 'suspended' && c !== 'suspended')return 'pause-in-the-middle'
  if (a === 'suspended' && c !== 'suspended')                     return 'starting-to-move'
  if (a === 'outward'   && b === 'inward' && c === 'outward')     return 'pause-then-resume'
  if ([a,b,c].every(x => x === 'inward'))                         return 'deeply-inward'
  if ([a,b,c].every(x => x === 'outward'))                        return 'fully-outward'
  if ([a,b,c].every(x => x === 'suspended'))                      return 'fully-suspended'
  return 'mixed'
}

/* ¿Hay 2+ cartas del mismo palo? */
function detectSuitConcentration(es) {
  const counts = {}
  es.forEach(e => {
    if (e.suit) counts[e.suit] = (counts[e.suit] || 0) + 1
  })
  let best = null
  for (const [suit, n] of Object.entries(counts)) {
    if (n >= 2 && (!best || n > best.count)) best = { suit, count: n }
  }
  return best
}

/* Cuántos Mayores hay en la tirada. */
function detectMajorPresence(es) {
  const count = es.filter(e => e.isMajor).length
  return { count, ratio: count / Math.max(es.length, 1) }
}

/* Patrón rítmico general. */
function detectRhythmPattern(es) {
  const counts = { slow: 0, fast: 0, fragmented: 0, stable: 0 }
  es.forEach(e => { counts[e.energy.rhythm] = (counts[e.energy.rhythm] || 0) + 1 })

  if (counts.fragmented >= 2)                  return 'fragmented'
  if (counts.fast >= 2)                        return 'fast'
  if (counts.slow >= 2)                        return 'slow'
  if (counts.stable >= 2)                      return 'stable'
  if (counts.fast >= 1 && counts.slow >= 1)    return 'pulsed'
  if (counts.fragmented >= 1)                  return 'partly-fragmented'
  return 'mixed'
}


/* =====================================================================
 * COMPOSITORES
 *
 *   Cada compositor tiene MULTIPLES variantes por patrón. La elección
 *   es determinística (hashSeed) pero distinta para cada combinación
 *   real de cartas. Misma tirada = misma frase. Tirada parecida con
 *   otras cartas = otra frase.
 * ===================================================================*/

const TEMP_VARIANTS = {
  'warm': [
    'la temperatura general es cálida, casi cobijo',
    'predomina una calidez que abre, no que ahoga'
  ],
  'cold': [
    'el aire viene frío, pero no hostil',
    'predomina una claridad fría, lúcida'
  ],
  'cold-with-warmth': [
    'predomina lo frío, con un punto de calor que no se apaga',
    'lo frío manda, pero algo cálido sobrevive en una esquina'
  ],
  'warm-with-cold': [
    'predomina la calidez, con una zona fría que pide atención',
    'el clima es tibio, salvo por un punto que conviene mirar'
  ],
  'tense': [
    'hay una tensión sostenida atravesando todo',
    'el aire está firme, casi en filo'
  ],
  'tense-undertone': [
    'algo agudo tensa el aire por debajo, sin gritar',
    'se siente un nervio fino debajo de la calma'
  ],
  'neutral': [
    'el aire es parejo, sin extremos',
    'el clima no empuja en ninguna dirección'
  ],
  'mixed': [
    'el clima cambia de una posición a otra',
    'la temperatura no es uniforme, va por escenas'
  ]
}

const RHYTHM_VARIANTS = {
  'slow': [
    'el ritmo va despacio',
    'el tiempo de la lectura es lento, casi de invierno'
  ],
  'fast': [
    'el ritmo viene rápido',
    'todo se mueve a un paso enérgico'
  ],
  'fragmented': [
    'el ritmo está quebrado, en pulsos',
    'el ritmo se interrumpe a sí mismo'
  ],
  'stable': [
    'el ritmo está sostenido',
    'el pulso es parejo, sin saltos'
  ],
  'pulsed': [
    'el ritmo se mueve a saltos, lo lento alternado con lo rápido',
    'algo apura, algo frena, y conviven'
  ],
  'partly-fragmented': [
    'el ritmo es regular salvo por un pulso suelto',
    'el aire se mantiene parejo con un quiebre adentro'
  ],
  'mixed': [
    'el ritmo no es uniforme',
    'cada posición late con un tempo distinto'
  ]
}

const MOVEMENT_VARIANTS = {
  'opening': [
    'Hay un proceso que estaba adentro empezando a buscar afuera.',
    'Lo que se gestaba en privado pide ahora salir a tomar aire.'
  ],
  'gathering': [
    'Algo que se desplegaba afuera está volviendo a recogerse.',
    'Después de moverte, esta lectura te pide volver al centro.'
  ],
  'pause-in-the-middle': [
    'En el medio del proceso aparece una pausa que pide ser respetada.',
    'Hay un movimiento, una quietud breve, y otro movimiento.'
  ],
  'starting-to-move': [
    'Lo que estaba en suspenso empieza, lentamente, a moverse.',
    'Hay un punto en suspenso que está empezando a aflojar.'
  ],
  'pause-then-resume': [
    'Hay un movimiento, una pausa, y otro movimiento — el aire respira.',
    'La lectura late: avanza, frena, vuelve a avanzar.'
  ],
  'deeply-inward': [
    'Toda la lectura mira hacia adentro: este momento pide intimidad, no escenario.',
    'Las tres posiciones convergen en lo íntimo: nada de esto pasa afuera todavía.'
  ],
  'fully-outward': [
    'Toda la lectura empuja hacia afuera: hay algo queriendo manifestarse en lo concreto.',
    'Las tres posiciones tiran hacia el mundo: este capítulo se vive en lo visible.'
  ],
  'fully-suspended': [
    'Las tres posiciones están en pausa: la lectura te pide no decidir todavía.',
    'Toda la tirada queda suspendida, como en un umbral que aún no se cruza.'
  ],
  'mixed': [
    'El movimiento no es lineal: el aire va, vuelve, y a veces se queda quieto.',
    'No hay un solo arco: la lectura combina avance, pausa y giro.'
  ]
}

const CONTRADICTION_VARIANTS = {
  'temperature': [
    'La lectura parece moverse entre impulso y resistencia: algo intenta avanzar mientras otra parte todavía necesita pausa.',
    'Hay un punto cálido y otro frío al mismo tiempo: ninguno está de más, conviven.'
  ],
  'direction': [
    'Hay una contradicción entre lo que pide ser mostrado y lo que pide ser guardado.',
    'Una parte tuya empuja afuera mientras otra todavía pide adentro.'
  ],
  'rhythm': [
    'Lo rápido y lo lento conviven en la misma escena, y conviene no apurar lo que está madurando.',
    'Una parte está apurada, otra está esperando — y ambas tienen razón.'
  ],
  'energyType': [
    'Lo que la cabeza pide y lo que el cuerpo siente no terminan de coincidir.',
    'Hay una distancia entre el plan y la emoción que conviene mirar antes de decidir.'
  ]
}

const SUIT_VOICE = {
  Copas:   {
    2: ['Lectura centrada en lo emocional: vínculos, afectos, intuición.'],
    3: ['Las tres cartas laten en lo afectivo: el hilo principal son los vínculos y el sentir.']
  },
  Espadas: {
    2: ['Lectura centrada en lo mental: pensamientos, decisiones, verdades por nombrar.'],
    3: ['Las tres cartas laten en lo mental: el hilo principal son las decisiones y la claridad.']
  },
  Bastos:  {
    2: ['Lectura centrada en el movimiento: impulsos, deseos, proyectos en marcha.'],
    3: ['Las tres cartas laten en lo activo: el hilo principal es lo que querés mover.']
  },
  Oros:    {
    2: ['Lectura centrada en lo concreto: cuerpo, oficio, lo que se construye en el tiempo.'],
    3: ['Las tres cartas laten en lo material: el hilo principal es lo tangible y lo sostenido.']
  }
}

const MAJOR_PRESENCE_VARIANTS = {
  3: [
    'Las tres posiciones traen Mayores: estás claramente en un capítulo grande del viaje, no en una escena del día.',
    'Tres Arcanos Mayores juntos es señal de un momento bisagra, no de un comentario al pasar.'
  ],
  2: [
    'Hay dos Mayores en juego: este momento late en una escala más amplia que lo cotidiano.',
    'Con dos Mayores, la lectura está pidiendo ser escuchada como un capítulo, no como un detalle.'
  ],
  1: [
    'Un solo Mayor enmarca dos escenas más cotidianas que lo rodean.',
    'Hay una pieza grande sostenida por dos gestos del día.'
  ],
  0: [
    'No hay Mayores: la lectura se lee a ras del piso, en lo cotidiano y lo concreto.',
    'Sin Mayores, esto es escena del día: gestos chicos, dinámicas inmediatas.'
  ]
}


/* =====================================================================
 * COMPOSICIÓN FINAL
 * ===================================================================*/

function composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence, seed }) {
  const tempLine   = pickVariant(TEMP_VARIANTS[dominantTemp]   || TEMP_VARIANTS['mixed'],   seed)
  const rhythmLine = pickVariant(RHYTHM_VARIANTS[rhythmPattern] || RHYTHM_VARIANTS['mixed'], seed + 1)
  const majorLine  = pickVariant(MAJOR_PRESENCE_VARIANTS[majorPresence.count] ?? MAJOR_PRESENCE_VARIANTS[1], seed + 2)

  return [
    majorLine,
    `Atmósfera: ${tempLine}, y ${rhythmLine}.`
  ].join(' ')
}

function composeMovement({ narrativeMovement, contradictions, seed }) {
  const movement = pickVariant(MOVEMENT_VARIANTS[narrativeMovement] || MOVEMENT_VARIANTS['mixed'], seed + 3)

  if (contradictions.length === 0) return movement

  // Priorizar la contradicción más expresiva
  const order = ['temperature', 'direction', 'rhythm', 'energyType']
  const ordered = contradictions.sort((a,b) => order.indexOf(a.type) - order.indexOf(b.type))
  const c = ordered[0]
  const tension = pickVariant(CONTRADICTION_VARIANTS[c.type] || [], seed + 4)

  return tension ? `${movement} ${tension}` : movement
}

function composeSuitVoice(suitConcentration, seed) {
  if (!suitConcentration) return ''
  const { suit, count } = suitConcentration
  const variants = SUIT_VOICE[suit]?.[count]
  return pickVariant(variants || [], seed + 5)
}


/* =====================================================================
 * API PRINCIPAL
 * ===================================================================*/

/**
 * Compone una lectura relacional a partir de 3 cartas.
 *
 * @param {Array} cards  Tres cartas. Cada una puede ser un Mayor
 *                       (con .name) o un Menor (con .suit y .number).
 *                       El contenido emocional individual (essence,
 *                       reading, prompt) viene de los datasets, no de
 *                       acá.
 *
 * @returns {{
 *   atmosphere: string,
 *   movement:   string,
 *   suitVoice:  string,
 *   synthesis:  string,
 *   diagnosis:  object,
 *   enriched:   Array
 * }}
 */
export function composeRelationalReading(cards) {
  const enriched = (cards || []).map(c => enrichCard(c))

  const dominantTemp     = detectDominantTemperature(enriched)
  const contradictions   = detectContradictions(enriched)
  const narrativeMovement= detectNarrativeMovement(enriched)
  const suitConcentration= detectSuitConcentration(enriched)
  const majorPresence    = detectMajorPresence(enriched)
  const rhythmPattern    = detectRhythmPattern(enriched)

  const seed = hashSeed(cards)

  const atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence, seed })
  const movement   = composeMovement({ narrativeMovement, contradictions, seed })
  const suitVoice  = composeSuitVoice(suitConcentration, seed)

  const synthesis  = [atmosphere, movement, suitVoice].filter(Boolean).join(' ')

  return {
    atmosphere,
    movement,
    suitVoice,
    synthesis,
    diagnosis: {
      dominantTemperature: dominantTemp,
      rhythmPattern,
      narrativeMovement,
      contradictions,
      suitConcentration,
      majorPresence
    },
    enriched
  }
}


/* =====================================================================
 * USO
 *
 *   import { composeRelationalReading } from './engine/relationalEngine.js'
 *
 *   const reading = composeRelationalReading([
 *     cardForPosition1,   // qué es
 *     cardForPosition2,   // qué cruza
 *     cardForPosition3    // qué se abre
 *   ])
 *
 *   reading.atmosphere   → frase de apertura: capa, temperatura, ritmo
 *   reading.movement     → arco direccional + contradicciones
 *   reading.suitVoice    → si hay concentración de palo
 *   reading.synthesis    → las 3 anteriores concatenadas, lista para UI
 *   reading.diagnosis    → todos los patrones detectados (debug/UI)
 *   reading.enriched     → las 3 cartas con su huella energética
 *
 * Cuando se cablee a la UI, esto reemplaza la síntesis template del
 * componente ComposedReading. La lectura por posición sigue viniendo
 * de la carta individual (essence/reading/positions), pero el cierre
 * y la atmósfera ya no se sienten genéricas: salen de la INTERACCIÓN.
 * ===================================================================*/
