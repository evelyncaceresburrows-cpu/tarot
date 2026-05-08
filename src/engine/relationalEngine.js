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
    'predomina una calidez que abre, no que ahoga',
    'el aire es tibio, sostenido',
    'algo cálido atraviesa la escena entera',
    'el clima abriga sin pedir permiso'
  ],
  'cold': [
    'el aire viene frío, pero no hostil',
    'predomina una claridad fría, lúcida',
    'la lectura está bajo una luz limpia y fresca',
    'todo respira en una temperatura más baja, más nítida',
    'hay una distancia honesta en el clima'
  ],
  'cold-with-warmth': [
    'predomina lo frío, con un punto de calor que no se apaga',
    'lo frío manda, pero algo cálido sobrevive en una esquina',
    'el aire es fresco, salvo por un rincón tibio',
    'la lectura está bajo niebla fría con un foquito cálido adentro'
  ],
  'warm-with-cold': [
    'predomina la calidez, con una zona fría que pide atención',
    'el clima es tibio, salvo por un punto que conviene mirar',
    'casi todo abriga, pero hay una grieta más fresca',
    'lo cálido lleva la voz, lo frío hace una pausa breve'
  ],
  'tense': [
    'hay una tensión sostenida atravesando todo',
    'el aire está firme, casi en filo',
    'todo está cargado, como antes de que algo se nombre',
    'la lectura tiene cuerda corta'
  ],
  'tense-undertone': [
    'algo agudo tensa el aire por debajo, sin gritar',
    'se siente un nervio fino debajo de la calma',
    'la calma tiene un hilo tirante adentro',
    'hay un filo bajo la superficie, sin ruido'
  ],
  'neutral': [
    'el aire es parejo, sin extremos',
    'el clima no empuja en ninguna dirección',
    'la temperatura es de habitación, sin drama',
    'todo respira en un punto medio'
  ],
  'mixed': [
    'el clima cambia de una posición a otra',
    'la temperatura no es uniforme, va por escenas',
    'cada carta trae su propio aire',
    'el clima se mueve, no es un solo paisaje'
  ]
}

const RHYTHM_VARIANTS = {
  'slow': [
    'el ritmo va despacio',
    'el tiempo de la lectura es lento, casi de invierno',
    'todo se demora en un compás bajo',
    'la cadencia es lenta, sin apuro',
    'el aire avanza en silencio largo'
  ],
  'fast': [
    'el ritmo viene rápido',
    'todo se mueve a un paso enérgico',
    'la lectura tiene velocidad propia',
    'el tiempo está acelerado, no caótico'
  ],
  'fragmented': [
    'el ritmo está quebrado, en pulsos',
    'el ritmo se interrumpe a sí mismo',
    'todo viene a saltos, no en línea',
    'el tiempo se astilla en partes'
  ],
  'stable': [
    'el ritmo está sostenido',
    'el pulso es parejo, sin saltos',
    'la cadencia se mantiene, ni rápida ni lenta',
    'todo respira en un mismo tiempo'
  ],
  'pulsed': [
    'el ritmo se mueve a saltos, lo lento alternado con lo rápido',
    'algo apura, algo frena, y conviven',
    'la cadencia tiene dos tiempos',
    'el ritmo se acelera y se calma sin pelear'
  ],
  'partly-fragmented': [
    'el ritmo es regular salvo por un pulso suelto',
    'el aire se mantiene parejo con un quiebre adentro',
    'casi todo respira igual, salvo por un quiebre breve'
  ],
  'mixed': [
    'el ritmo no es uniforme',
    'cada posición late con un tempo distinto',
    'el tiempo cambia de carta a carta'
  ]
}

const MOVEMENT_VARIANTS = {
  'opening': [
    'Hay un proceso que estaba adentro empezando a buscar afuera.',
    'Lo que se gestaba en privado pide ahora salir a tomar aire.',
    'Algo que había crecido en silencio empieza a mostrarse.',
    'La lectura se abre: lo íntimo asoma a lo visible.'
  ],
  'gathering': [
    'Algo que se desplegaba afuera está volviendo a recogerse.',
    'Después de moverte, esta lectura te pide volver al centro.',
    'El movimiento se repliega: lo de afuera busca lo de adentro.',
    'Una etapa expansiva se cierra hacia dentro.'
  ],
  'pause-in-the-middle': [
    'En el medio del proceso aparece una pausa que pide ser respetada.',
    'Hay un movimiento, una quietud breve, y otro movimiento.',
    'La lectura tiene un respiro en el centro.',
    'Algo se detiene a la mitad antes de seguir.'
  ],
  'starting-to-move': [
    'Lo que estaba en suspenso empieza, lentamente, a moverse.',
    'Hay un punto en suspenso que está empezando a aflojar.',
    'La pausa anterior empieza a soltar aire.',
    'Algo que estaba quieto da el primer paso.'
  ],
  'pause-then-resume': [
    'Hay un movimiento, una pausa, y otro movimiento — el aire respira.',
    'La lectura late: avanza, frena, vuelve a avanzar.',
    'El ritmo respira: dos impulsos con un silencio en medio.',
    'Hay avance, pausa, y otra vez avance, sin urgencia.'
  ],
  'deeply-inward': [
    'Toda la lectura mira hacia adentro: este momento pide intimidad, no escenario.',
    'Las tres posiciones convergen en lo íntimo: nada de esto pasa afuera todavía.',
    'El centro de la lectura está hacia dentro, en silencio.',
    'Toda la escena se está pensando, no actuando.'
  ],
  'fully-outward': [
    'Toda la lectura empuja hacia afuera: hay algo queriendo manifestarse en lo concreto.',
    'Las tres posiciones tiran hacia el mundo: este capítulo se vive en lo visible.',
    'Todo el aire empuja a salir, a actuar, a aterrizar.',
    'La lectura está toda hacia afuera, sin interior reservado.'
  ],
  'fully-suspended': [
    'Las tres posiciones están en pausa: la lectura te pide no decidir todavía.',
    'Toda la tirada queda suspendida, como en un umbral que aún no se cruza.',
    'Todo está esperando algo que aún no llegó.',
    'La lectura entera está en compás de espera.'
  ],
  'mixed': [
    'El movimiento no es lineal: el aire va, vuelve, y a veces se queda quieto.',
    'No hay un solo arco: la lectura combina avance, pausa y giro.',
    'El movimiento es zigzagueante, no recto.',
    'Cada posición tira para un lado distinto, y eso también es información.'
  ]
}

/* ---------------------------------------------------------------- *
 * APERTURAS minimalistas — para modos cortos / silenciosos
 * ---------------------------------------------------------------- */
const MINIMAL_OPENINGS = [
  'Algo ya cambió.',
  'Todo respira distinto.',
  'Hay un eco que no termina.',
  'El aire pide silencio.',
  'Algo se mueve sin nombrarse.',
  'La escena ya cambió de luz.',
  'Algo está empezando a contestar solo.',
  'No es una respuesta cerrada todavía.',
  'Algo se acomoda sin ruido.',
  'El aire trae otra densidad.'
]

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
    3: ['Las tres cartas laten en lo activo: el hilo principal es lo que quieres mover.']
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
 * Decide el "modo" de salida para evitar la sensación de template.
 *
 *  · 'minimal' — solo una frase corta, casi un suspiro.    (~25%)
 *  · 'short'   — solo atmósfera, sin movimiento ni voz.    (~25%)
 *  · 'medium'  — atmósfera + movimiento.                   (~25%)
 *  · 'full'    — atmósfera + movimiento + voz de palo.     (~25%)
 *
 *  Algunos casos fuerzan modo full (3 Mayores, 3 mismo palo) porque
 *  ahí la lectura merece desplegarse. Otros casos fuerzan minimal
 *  cuando todo está en suspenso (la app debe respetar el silencio).
 */
function decideMode(seed, diagnosis) {
  const { majorPresence, suitConcentration, narrativeMovement } = diagnosis

  // Fuerzas: cuando la tirada es claramente densa o claramente quieta
  if (majorPresence.count === 3) return 'full'
  if (suitConcentration?.count === 3) return 'full'
  if (narrativeMovement === 'fully-suspended') return 'minimal'

  // Resto: distribución por seed
  const m = seed % 4
  return ['minimal', 'short', 'medium', 'full'][m]
}

/**
 * Compone una lectura relacional a partir de 3 cartas.
 *
 * @param {Array} cards  Tres cartas. Cada una puede ser un Mayor
 *                       (con .name) o un Menor (con .suit y .number).
 *
 * @returns {{
 *   mode:       'minimal'|'short'|'medium'|'full',
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

  const dominantTemp      = detectDominantTemperature(enriched)
  const contradictions    = detectContradictions(enriched)
  const narrativeMovement = detectNarrativeMovement(enriched)
  const suitConcentration = detectSuitConcentration(enriched)
  const majorPresence     = detectMajorPresence(enriched)
  const rhythmPattern     = detectRhythmPattern(enriched)

  const diagnosis = {
    dominantTemperature: dominantTemp,
    rhythmPattern,
    narrativeMovement,
    contradictions,
    suitConcentration,
    majorPresence
  }

  const seed = hashSeed(cards)
  const mode = decideMode(seed, diagnosis)

  /* Composición por modo. Cada uno respeta una atmósfera distinta. */
  let atmosphere = ''
  let movement   = ''
  let suitVoice  = ''

  if (mode === 'minimal') {
    /* Solo una frase corta — el silencio importa más que la explicación */
    atmosphere = pickVariant(MINIMAL_OPENINGS, seed)
    /* Si hay contradicción fuerte, agregar UNA línea de tensión */
    if (contradictions.length > 0 && contradictions[0].type === 'temperature') {
      atmosphere += ' ' + pickVariant(CONTRADICTION_VARIANTS.temperature, seed + 11)
    }
  } else if (mode === 'short') {
    /* Solo la atmósfera, sin movimiento ni voz de palo */
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence, seed })
  } else if (mode === 'medium') {
    /* Atmósfera + movimiento, sin voz de palo */
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence, seed })
    movement   = composeMovement({ narrativeMovement, contradictions, seed })
  } else {
    /* full: atmósfera + movimiento + voz de palo */
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence, seed })
    movement   = composeMovement({ narrativeMovement, contradictions, seed })
    suitVoice  = composeSuitVoice(suitConcentration, seed)
  }

  const synthesis = [atmosphere, movement, suitVoice].filter(Boolean).join(' ')

  return {
    mode,
    atmosphere,
    movement,
    suitVoice,
    synthesis,
    diagnosis,
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
