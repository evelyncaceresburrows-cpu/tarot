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
    'hay calidez sostenida, como cuando alguien te escucha sin interrumpirte',
    'predomina algo que abriga, no que ahoga',
    'es esa temperatura de cuarto donde se puede llorar sin urgencia',
    'la lectura tiene tono de mesa con luz baja, no de oficina',
    'hay un calor que no pide demostraciones'
  ],
  'cold': [
    'hay una claridad fría, esa que llega cuando ya no hay para dónde correr',
    'no es dureza — es la lucidez de quien dejó de explicarse',
    'el clima es como caminar al amanecer en mayo: limpio, sin abrigo, despierto',
    'todo se ve más nítido porque ya no hay nada que ocultar',
    'hay distancia honesta — la que se gana, no la que se impone'
  ],
  'cold-with-warmth': [
    'predomina lo frío, con un punto cálido que no se apaga ni con el peor pronóstico',
    'casi todo está bajo claridad fría, salvo un rincón que sigue abrigando',
    'es esa noche larga donde una luz al fondo de un pasillo cambia todo',
    'la lectura es lúcida y un poco dura, pero alguien o algo está cuidando desde la sombra'
  ],
  'warm-with-cold': [
    'predomina lo cálido, con una grieta fresca que conviene mirar de cerca',
    'casi todo abriga, salvo un detalle frío que está pidiendo ser nombrado',
    'es esa charla buena donde, sin embargo, alguien dijo algo que no se va',
    'lo cálido lleva la voz, pero hay un asunto pendiente que no se resuelve por sí solo'
  ],
  'tense': [
    'hay un nervio sostenido en toda la lectura — algo concreto que aún no se dijo',
    'es esa tirantez de las conversaciones que se postergaron demasiado',
    'todo está cargado, en ese silencio antes de que alguien decida hablar',
    'la cuerda está corta — cualquier cosa que toques va a vibrar más de lo esperado'
  ],
  'tense-undertone': [
    'la calma de la superficie esconde un hilo tirante por debajo',
    'aparenta tranquilidad, pero algo agudo se mueve debajo sin nombrarse',
    'es la pausa antes del crujido: nada está pasando, todo está por pasar',
    'hay un nervio fino en el cuerpo que la mente todavía no escuchó'
  ],
  'neutral': [
    'el aire es parejo, sin urgencia ni drama',
    'la lectura es de día normal, sin densidad especial — y a veces eso ya dice algo',
    'no hay extremos: hay observación, registro, paciencia',
    'todo respira en un punto medio, ni feliz ni difícil'
  ],
  'mixed': [
    'cada carta trae su propio clima — la lectura no es de un solo color',
    'el tono cambia de posición a posición, hay que leerlo escena por escena',
    'no hay una sola temperatura: hay varias capas conviviendo',
    'la lectura es un mosaico, no un paisaje'
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
    'Algo que estaba sólo en tu cabeza empieza a buscar palabras o gestos. Lo íntimo pide salir.',
    'Lo que pensaste en silencio durante meses está pidiendo aterrizar en una conversación o un acto.',
    'Algo que cuidaste sin mostrar está empezando a notarse afuera, te guste o no.',
    'La lectura se abre: lo que era pensamiento pide volverse hecho.'
  ],
  'gathering': [
    'Después de mucho movimiento afuera, algo te está pidiendo volver al centro.',
    'Estuviste mucho tiempo respondiendo a lo de afuera; ahora lo que pide atención está adentro.',
    'Lo que se desplegaba en lo visible se está plegando hacia lo íntimo — no es retroceso, es recogerse.',
    'Una etapa expansiva se cierra. Lo que sigue se piensa más despacio y en silencio.'
  ],
  'pause-in-the-middle': [
    'Hay una pausa en el medio que conviene respetar — apurarla la rompe.',
    'empiezas algo, te frenas, y antes de seguir hay un silencio que es parte del trabajo.',
    'La lectura tiene un respiro adentro. Quien apura ese respiro pierde lo que el respiro estaba haciendo.',
    'Algo se detiene a la mitad. No es bloqueo: es decantación.'
  ],
  'starting-to-move': [
    'Lo que estaba quieto empieza a aflojar. No es resolución todavía: es la primera grieta.',
    'Después de mucho tiempo de pausa, algo da el primer paso. Pequeño, pero real.',
    'La pausa larga empieza a ceder. Algo concreto se va a mover en los próximos días.',
    'Lo que estaba en compás de espera comienza a destrabarse.'
  ],
  'pause-then-resume': [
    'Hay un movimiento, una pausa que parece bloqueo y no lo es, y otro movimiento. La lectura respira.',
    'Avanzaste, frenaste, y ese frenar no fue derrota — era parte. Ahora vuelve a moverse.',
    'Dos impulsos con un silencio en medio. Ese silencio es donde se decide cómo va a ser el segundo movimiento.',
    'Avance, pausa, avance otra vez — sin urgencia ni dramatismo.'
  ],
  'deeply-inward': [
    'Las tres posiciones miran hacia adentro. Este momento se piensa, no se actúa: cualquier movimiento exterior va a ser ruido.',
    'Todo está pasando en privado. Lo que se decide aquí no necesita público.',
    'El centro de la lectura está en silencio, en una conversación tuya con ti misma.',
    'Toda la escena ocurre antes de que pase afuera — todavía es deliberación.'
  ],
  'fully-outward': [
    'Las tres posiciones empujan hacia el mundo. Esto se está jugando en lo visible: una conversación, una decisión, un gesto.',
    'No hay tiempo de seguir pensando. La lectura pide acción concreta.',
    'Todo apunta a salir, hacer, decir. Nada de esto se resuelve en silencio.',
    'Esta tirada se vive en lo concreto: en lo que dices, lo que firmas, lo que muestras.'
  ],
  'fully-suspended': [
    'Las tres posiciones están en pausa. La lectura te pide no decidir todavía — algo afuera tiene que moverse primero.',
    'Toda la tirada está en un umbral. No es bloqueo: es esperar a que aparezca la información que falta.',
    'Todo está esperando. Forzar una respuesta hoy es elegir desde lo que no sabes.',
    'La lectura entera está en compás de espera. La paciencia hoy vale más que la decisión.'
  ],
  'mixed': [
    'El movimiento no es lineal. Va, vuelve, se queda quieto. La lectura es así, no estás leyéndola mal.',
    'No hay un solo arco: hay avance, pausa y giro conviviendo en la misma escena.',
    'El movimiento es zigzagueante. No es indecisión — son varias cosas pasando a la vez.',
    'Cada posición tira para un lado distinto. Esa fricción ya es información.'
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
    'Tres Arcanos Mayores juntos. No es una escena: es un capítulo entero. Vas a recordar este momento.',
    'Las tres posiciones traen figuras grandes. Lo que pasa hoy va a tener consecuencias después de esta semana.'
  ],
  2: [
    'Dos Mayores en escena. Esto no es del día — es de los meses. Conviene leer despacio.',
    'Con dos Mayores, la pregunta pesa más de lo que parece desde afuera.'
  ],
  1: [
    'Un solo Mayor entre dos Menores. Esa Mayor es probablemente el ancla emocional — alrededor de ella se ordena el resto.',
    'Una pieza grande sostenida por dos gestos del día. Mirar bien cuál es la grande.'
  ],
  0: [
    'Ningún Mayor. La lectura es de gestos chicos: lo que dices hoy, una conversación, un detalle. No menos profunda — más íntima.',
    'Sin Mayores, esto se vive a escala humana. No hay drama estructural: hay vida cotidiana pidiendo atención.'
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
