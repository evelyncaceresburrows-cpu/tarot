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
import { withAttrs } from './cardAttributes.js'
import { findCrossings } from './iconicCrossings.js'
import { runAllDetectors } from './relationalDetectors.js'
import { detectMacros, readingStats } from './narrativeMacros.js'
import { composeThreeCardNarrative } from './narrativeComposer.js'


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

/* TEMP_VARIANTS — solo frases con imagen humana o gesto reconocible.
   Las atmósferas que podían servir para cualquier carta fueron eliminadas. */
const TEMP_VARIANTS = {
  'warm': [
    'hay calidez sostenida, como cuando alguien te escucha sin interrumpirte',
    'es esa temperatura de cuarto donde se puede llorar sin urgencia',
    'la lectura tiene tono de mesa con luz baja, no de oficina'
  ],
  'cold': [
    'no es dureza — es la lucidez de quien dejó de explicarse',
    'todo se ve más nítido porque ya no hay nada que ocultar',
    'hay distancia honesta — la que se gana, no la que se impone'
  ],
  'cold-with-warmth': [
    'es esa noche larga donde una luz al fondo de un pasillo cambia todo',
    'la lectura es lúcida y un poco dura, pero algo cuida desde la sombra'
  ],
  'warm-with-cold': [
    'es esa charla buena donde, sin embargo, alguien dijo algo que no se va',
    'lo cálido lleva la voz, pero hay un asunto pendiente que no se resuelve solo'
  ],
  'tense': [
    'hay un nervio sostenido — algo concreto que aún no se dijo',
    'es esa tirantez de las conversaciones que se postergaron demasiado',
    'la cuerda está corta — cualquier cosa que toques va a vibrar más de lo esperado'
  ],
  'tense-undertone': [
    'es la pausa antes del crujido: nada está pasando, todo está por pasar',
    'hay un nervio fino en el cuerpo que la mente todavía no escuchó'
  ],
  // 'neutral' y 'mixed' quedan vacíos — la atmósfera neutra/mosaico no
  // aporta imagen humana. Si caemos aquí, el motor omite la línea de
  // temperatura y la lectura respira sin relleno atmosférico.
  'neutral': [],
  'mixed':   []
}

/* RHYTHM_VARIANTS — el ritmo solo se nombra cuando aporta gesto humano.
   stable/partly-fragmented/mixed quedan vacíos a propósito: cuando el
   ritmo es parejo, no hace falta decirlo. */
const RHYTHM_VARIANTS = {
  'slow': [
    'el tiempo de la lectura no está apurado — sería un error apurarlo'
  ],
  'fast': [
    'esto se está moviendo a un ritmo que pide responder al día, no a la semana'
  ],
  'fragmented': [
    'el ritmo viene en saltos — lo que se decide hoy puede no calzar con lo de mañana'
  ],
  'pulsed': [
    'hay dos compases conviviendo: uno apura, uno frena'
  ],
  'stable':            [],
  'partly-fragmented': [],
  'mixed':             []
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
 *
 * Antes había 10 frases atmosféricas tipo "el aire pide silencio". Las
 * eliminé porque podían servir para cualquier lectura. En modo minimal,
 * si no hay cruce icónico ni detector específico, la app simplemente
 * no muestra apertura — el silencio es mejor que el relleno.
 * ---------------------------------------------------------------- */
const MINIMAL_OPENINGS = []

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
  const tempLine   = pickVariant(TEMP_VARIANTS[dominantTemp]   || [], seed)
  const rhythmLine = pickVariant(RHYTHM_VARIANTS[rhythmPattern] || [], seed + 1)
  const majorLine  = pickVariant(MAJOR_PRESENCE_VARIANTS[majorPresence.count] ?? MAJOR_PRESENCE_VARIANTS[1], seed + 2)

  // Si no hay temperatura ni ritmo con peso, omitimos la línea de
  // atmósfera entera. Es mejor el silencio que el relleno.
  let atmosphereLine = ''
  if (tempLine && rhythmLine) {
    atmosphereLine = `Atmósfera: ${tempLine}, y ${rhythmLine}.`
  } else if (tempLine) {
    atmosphereLine = `Atmósfera: ${tempLine}.`
  } else if (rhythmLine) {
    atmosphereLine = rhythmLine.charAt(0).toUpperCase() + rhythmLine.slice(1) + '.'
  }

  return [majorLine, atmosphereLine].filter(Boolean).join(' ')
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
  // Doble enriquecimiento: energía (compat) + atributos relacionales nuevos.
  // Si la carta viene con `.reversed=true` (inyectado por el caller), los
  // atributos se transforman acorde a la inversión.
  const enriched = (cards || []).map(c => {
    const base = enrichCard(c)
    return withAttrs(base, c?.reversed === true || c?.isReversed === true)
  })

  // NUEVA CAPA — detectores macro y composición narrativa.
  // El compositor narrativo arma una tesis y secciones donde las cartas
  // son evidencia, no suma de significados.
  const macros = detectMacros(enriched)
  const stats  = readingStats(enriched)

  const seed = hashSeed(cards)

  // ---- 1) CRUCES ICÓNICOS — prioridad máxima ----
  // Si dos cartas tienen un par escrito a mano, esa frase manda y se
  // antepone a la atmósfera genérica.
  const crossings = findCrossings(cards)

  // ---- 2) DETECTORES — los 10 ----
  const detectors = runAllDetectors(enriched, seed)

  // ---- 3) Diagnóstico legacy (compat con UI vieja) ----
  const dominantTemp      = detectDominantTemperature(enriched)
  const contradictions    = detectContradictions(enriched)
  const narrativeMovement = detectNarrativeMovement(enriched)
  const suitConcentration = detectSuitConcentration(enriched)
  const majorPresenceLeg  = detectMajorPresence(enriched)
  const rhythmPattern     = detectRhythmPattern(enriched)

  const diagnosis = {
    // legacy (consumido por UI/Cruz Celta)
    dominantTemperature: dominantTemp,
    rhythmPattern,
    narrativeMovement,
    contradictions,
    suitConcentration,
    majorPresence: majorPresenceLeg,

    // nuevo (consumido por compositor relacional emergente)
    crossings,
    detectors
  }

  const mode = decideMode(seed, diagnosis)

  /* Composición por modo. Cada uno respeta una atmósfera distinta. */
  let atmosphere = ''
  let movement   = ''
  let suitVoice  = ''
  let crossingLine = ''

  // Si hay un cruce icónico fuerte (weight >= 0.85) lo usamos como ancla
  // de la atmósfera. Las frases de cruces son específicas y humanas, y
  // pesan más que la temperatura/ritmo abstractos.
  const topCrossing = crossings.find(c => c.weight >= 0.85) || crossings[0]

  // El cruce icónico siempre se expone en `crossing` cuando existe, y
  // queda fuera de `atmosphere` para que la UI pueda mostrarlo aparte.
  if (topCrossing) crossingLine = topCrossing.phrase

  if (mode === 'minimal') {
    if (!topCrossing) {
      atmosphere = pickVariant(MINIMAL_OPENINGS, seed)
      if (contradictions.length > 0 && contradictions[0].type === 'temperature') {
        atmosphere += ' ' + pickVariant(CONTRADICTION_VARIANTS.temperature, seed + 11)
      }
    }
  } else if (mode === 'short') {
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence: majorPresenceLeg, seed })
  } else if (mode === 'medium') {
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence: majorPresenceLeg, seed })
    movement = composeMovementEnriched(detectors, contradictions, narrativeMovement, seed)
  } else {
    atmosphere = composeAtmosphere({ dominantTemp, rhythmPattern, majorPresence: majorPresenceLeg, seed })
    movement   = composeMovementEnriched(detectors, contradictions, narrativeMovement, seed)
    suitVoice  = composeSuitVoice(suitConcentration, seed)
  }

  // Capa adicional: detectores específicos que no pasan por atmósfera.
  // Solo se inyecta UNO, el más informativo, para no sobrecargar.
  const detectorLine = pickStrongestDetector(detectors)

  const synthesis = [crossingLine, atmosphere, movement, detectorLine, suitVoice]
    .filter(Boolean)
    .join(' ')

  // === NARRATIVA EN CAPAS — la salida nueva del compositor ===
  // Compone tesis + núcleo + tensión + invertidas + síntesis a partir
  // de macros + stats + cruce icónico. Las cartas son evidencia, no suma.
  const narrative = composeThreeCardNarrative({
    cards: enriched,
    macros,
    stats,
    crossing: topCrossing,
    seed
  })

  return {
    mode,
    atmosphere,
    movement,
    suitVoice,
    crossing: crossingLine,
    detector: detectorLine,
    synthesis,
    diagnosis: { ...diagnosis, macros, stats },
    enriched,
    narrative   // ← arquitectura nueva
  }
}


/* =====================================================================
 *  Helpers de composición que usan los detectores nuevos.
 * ===================================================================*/

/**
 * Compone la línea de movimiento. Si los detectores nuevos detectan
 * suspensión total, mental overload, o movimiento vs inmovilidad,
 * usamos esa frase específica antes de caer en la genérica.
 */
function composeMovementEnriched(detectors, contradictions, narrativeMovement, seed) {
  if (detectors.suspended) return detectors.suspended.line
  if (detectors.mentalOverload) return detectors.mentalOverload.line
  if (detectors.movementVsStillness) return detectors.movementVsStillness.line

  // fallback al compositor legacy
  return composeMovement({ narrativeMovement, contradictions, seed })
}

/**
 * Elige la frase más informativa entre los detectores que no se hayan
 * usado ya en composeMovementEnriched. Devuelve string vacío si no hay.
 *
 * Prioridad (de más específica a más general):
 *   1) Señal de tag invertido — la inversión está nombrando algo concreto
 *   2) Inversión dominante — 2+ cartas al revés cambia toda la lectura
 *   3) Bloqueos
 *   4) Amplificaciones
 *   5) Claridad vs niebla
 *   6) Contradicciones emocionales fuertes
 */
function pickStrongestDetector(d) {
  if (d.invertedSignal)      return d.invertedSignal.line
  if (d.invertedDominance)   return d.invertedDominance.line
  if (d.blocks?.[0])         return d.blocks[0].line
  if (d.amplifications?.[0]) return d.amplifications[0].line
  if (d.clarityVsFog)        return d.clarityVsFog.line
  if (d.contradictions?.length) return d.contradictions[0].line
  return ''
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
