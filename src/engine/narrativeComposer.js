/* =====================================================================
 * narrativeComposer.js
 *
 * Compositor narrativo de Ade.
 *
 * Reemplaza el esquema viejo "atmosphere + movement + suitVoice + detector"
 * por una estructura en capas que parte de una TESIS y desarrolla las
 * cartas como evidencia, no como suma.
 *
 *   Tirada de 3 (capas reducidas):
 *     1. tesis           — observación de apertura sobre el conjunto
 *     2. núcleo          — qué está pasando en el centro (carta 1+2)
 *     3. tensión         — qué hace que esto no sea simple
 *     4. invertidas      — si las hay, cómo cambian el tono
 *     5. síntesis        — qué pide la lectura, sin moralizar
 *
 *   Cruz Celta (capas completas):
 *     1. tesis           — observación de apertura
 *     2. núcleo          — centro (1+2)
 *     3. tensión         — qué sostiene el conflicto
 *     4. intento         — qué intenta cambiar (3+5+6)
 *     5. resistencia     — qué se resiste (4+7+8)
 *     6. patrón          — qué patrón se repite (5+10 o macros)
 *     7. invertidas      — efecto de inversiones sobre el conjunto
 *     8. síntesis        — cierre interpretativo
 *
 * Cada sección se construye combinando: macros detectados + posiciones
 * + cruces icónicos + esencias de cartas. No hay relleno atmosférico:
 * si una sección no tiene material, queda vacía y la UI no la muestra.
 *
 * IMPORTANTE
 *   Las cartas se citan SIEMPRE como evidencia de una hipótesis, nunca
 *   como lookup individual de significado. Si una macro detecta
 *   "contención emocional" y hay La Sacerdotisa y 4 de Copas, la frase
 *   se construye sobre el patrón, no sobre "La Sacerdotisa significa…".
 * ===================================================================*/

import { findCrossings } from './iconicCrossings.js'


/* ================================================================ *
 *  TESIS — la observación de apertura.
 *
 *  La tesis nace de la combinación de los 1-2 macros más fuertes y la
 *  estadística general (Mayores, invertidas, palo dominante). Las
 *  variantes están escritas a mano: no se ensamblan por templates.
 * ================================================================ */

const THESIS_BY_COMBO = {
  /* combinaciones de dos macros (claves ordenadas alfabéticamente) */
  'contencion-emocional|tension-mental-dominante':
    'Esta tirada es más de cabeza que de corazón — y la cabeza está cuidando lo que el cuerpo todavía no se anima a decir.',
  'agotamiento-sostenido|tension-mental-dominante':
    'Esta tirada habla más de desgaste que de conflicto. Varias cartas tratan de sostener algo que ya perdió estabilidad.',
  'agotamiento-sostenido|dificultad-cerrar':
    'El peso no es la situación. Es el tiempo que llevas cargándola sin soltarla.',
  'claridad-retenida|evasion-activa':
    'Ya viste lo que pasa. La tirada no es sobre lo que falta entender — es sobre lo que estás eligiendo no nombrar.',
  'claridad-retenida|tension-mental-dominante':
    'Hay algo claro que no se está diciendo, y la cabeza está pagando el costo en silencio.',
  'contencion-emocional|claridad-retenida':
    'Sabes algo y lo estás guardando. Esta tirada nombra el peso de ese silencio, no su contenido.',
  'decision-postergada|tension-mental-dominante':
    'Hay una decisión esperando y la cabeza ya hizo seis veces el recorrido. Lo que falta no es análisis: es elegir.',
  'evasion-activa|patron-vuelve':
    'Lo que estás esquivando ya lo esquivaste antes. La tirada nombra el patrón, no la situación de hoy.',
  'patron-vuelve|tension-mental-dominante':
    'No es una situación nueva. Es la misma escena con otra ropa, y la cabeza la está leyendo como si fuera primera vez.',
  'exceso-control|deseo-bloqueado':
    'Hay una parte tuya queriendo moverse y otra apretando los puños. El control de hoy es lo que está costando el movimiento de mañana.',
  'exceso-control|tension-mental-dominante':
    'La situación se está manejando con muy poca soltura. Mantener el orden está consumiendo más que el problema original.',
  'negacion-evidente|tension-mental-dominante':
    'Hay algo que ya pasó y la cabeza sigue armando teorías para que no haya pasado. El esfuerzo está mal puesto.',
  'resistencia-cierre|dificultad-cerrar':
    'Algo terminó hace tiempo y la tirada lo confirma. Sostenerlo un día más cuesta lo mismo que soltarlo, solo que se nota menos.',
  'ruptura-en-curso|tension-mental-dominante':
    'Algo está cediendo y el cuerpo lo sabe antes que la cabeza. La tensión que sientes está leyendo bien, aunque la cabeza todavía no quiera firmarla.',
  'avance-ciego|tension-mental-dominante':
    'Hay un impulso saliendo antes de tiempo, y otra parte tuya queriendo frenarlo. Una de las dos tiene razón hoy.',
  'reparacion-en-curso|tension-mental-dominante':
    'Algo se está acomodando despacio y la cabeza está tratando de apurar lo que pide tiempo.',
  'proyeccion-afuera|tension-mental-dominante':
    'Hay una sombra que estás viendo en otros más nítida que en ti. La tirada invita a girar el espejo.',
  'vinculo-en-juego|decision-postergada':
    'La pregunta es vincular aunque no la hayas formulado así. Y hay una decisión esperando que no se va a resolver pensando más.',
  'vinculo-en-juego|contencion-emocional':
    'Hay un vínculo en juego, y algo importante de ese vínculo no se está diciendo. La tirada pesa porque pesa el silencio.',
  'deseo-bloqueado|tension-mental-dominante':
    'Quieres algo y al mismo tiempo estás pensando todas las razones por las que no. Las dos cosas son tuyas — y la pelea entre ellas es lo que cansa.'
}

const THESIS_BY_SINGLE = {
  'tension-mental-dominante':
    'La cabeza está cargando el peso de la situación. Pensar más no va a aclarar más — el cuerpo lleva días avisando lo que la mente está discutiendo.',
  'contencion-emocional':
    'El centro de esta tirada es contención, no acción. Hay algo afectivo que se está guardando, y guardarlo también tiene costo.',
  'dificultad-cerrar':
    'Algo terminó por dentro y se sigue sosteniendo por fuera. La lectura nombra la diferencia entre las dos cosas.',
  'agotamiento-sostenido':
    'Lo que aparece tiene cara de crisis. Por dentro es cansancio acumulado, y pide pausa real más que esfuerzo.',
  'claridad-retenida':
    'Hay algo que ya viste con claridad y no estás diciendo. La tirada habla del peso de esa información retenida.',
  'evasion-activa':
    'Hay algo de lo que te estás yendo sin nombrarlo. Irse en silencio también deja huella.',
  'exceso-control':
    'La situación se está manejando con muy poca soltura. El control que estás poniendo está costando más que la situación misma.',
  'deseo-bloqueado':
    'Hay un querer vivo y una parte tuya conteniéndolo. Afuera no hay con quién pelear: la disputa es interna.',
  'patron-vuelve':
    'No es una situación nueva. La misma escena vuelve con otro reparto, y la pregunta es qué parte tuya sigue eligiéndola.',
  'resistencia-cierre':
    'Algo pide cerrar y lo estás sosteniendo con esfuerzo. Lo que evita el cierre cuesta más que el cierre mismo.',
  'proyeccion-afuera':
    'Hay una sombra que estás viendo más clara en los demás que en ti. La lectura sugiere girar la mirada.',
  'decision-postergada':
    'Hay una decisión esperando que no se va a resolver pensando más. Posponerla un día más también es elegir.',
  'ruptura-en-curso':
    'Algo está cediendo y eso es lo que la lectura nombra. No es accidente: es proceso que llevaba tiempo.',
  'reparacion-en-curso':
    'Algo se está acomodando despacio. La lectura no marca crisis — marca el trabajo lento que ya está pasando.',
  'vinculo-en-juego':
    'La pregunta es vincular, aunque no la hayas formulado así. Lo afectivo está en el centro de todo.',
  'negacion-evidente':
    'Hay algo que ya pasó y la cabeza sigue construyendo versiones para que no haya pasado. La tirada nombra ese esfuerzo.',
  'avance-ciego':
    'Hay un impulso saliendo antes de tiempo. La velocidad de hoy es la que vas a tener que reescribir mañana.'
}

const THESIS_BY_STATS = {
  threeReversed:
    'Tres cartas invertidas cambian el tono entero de la tirada. El problema no parece falta de claridad — parece resistencia a actuar sobre algo que ya se entendió.',
  threeMajors:
    'Tres Arcanos Mayores. No es una pregunta del día — es un capítulo, y va a tardar más de lo que la mente quiere admitir.',
  threeSameSuit_Espadas:
    'Tres Espadas en una sola tirada. Toda la lectura está en la cabeza, y la cabeza ya lleva días discutiendo lo mismo.',
  threeSameSuit_Copas:
    'Tres Copas. La tirada late en lo afectivo de principio a fin — y la cabeza, por una vez, está fuera del centro.',
  threeSameSuit_Bastos:
    'Tres Bastos. Hay deseo, hay impulso, hay fuego. La pregunta no se trata de la energía, sino de su dirección.',
  threeSameSuit_Oros:
    'Tres Oros. Esto pide cuerpo, oficio, recurso. Las decisiones simbólicas no van a alcanzar — pide aterrizaje material.'
}

const THESIS_FALLBACK = [
  'Lo que aparece en la tirada no es una respuesta cerrada. Es una forma de mirar lo que ya se está moviendo.',
  'La lectura no resuelve — distingue. Lo que sigue de aquí depende de qué te animes a ver primero.'
]

function pairKey(a, b) {
  return [a, b].sort().join('|')
}

function generateThesis(macros, stats, seed) {
  // Prioridad 1: estadísticas extremas (3 invertidas, 3 Mayores, 3 mismo palo)
  if (stats.invertedCount >= 3) return THESIS_BY_STATS.threeReversed
  if (stats.majorCount >= 3)    return THESIS_BY_STATS.threeMajors
  if (stats.dominantSuit?.count >= 3) {
    const key = 'threeSameSuit_' + stats.dominantSuit.suit
    if (THESIS_BY_STATS[key]) return THESIS_BY_STATS[key]
  }

  // Prioridad 2: combinación de dos macros fuertes (intensity ≥ 2)
  const strongMacros = macros.filter(m => m.intensity >= 2)
  if (strongMacros.length >= 2) {
    const k = pairKey(strongMacros[0].key, strongMacros[1].key)
    if (THESIS_BY_COMBO[k]) return THESIS_BY_COMBO[k]
  }

  // Prioridad 3: un macro fuerte solo (intensity ≥ 2)
  if (strongMacros.length >= 1 && THESIS_BY_SINGLE[strongMacros[0].key]) {
    return THESIS_BY_SINGLE[strongMacros[0].key]
  }

  // PRIORIDAD 4: SILENCIO DELIBERADO.
  // Si no hay estadísticas extremas ni macros con intensity ≥ 2, la
  // lectura no tiene material suficiente para sostener una tesis honesta.
  // En vez de inventar una con el fallback genérico, devolvemos null —
  // el compositor omite la sección. Algunas lecturas no piden veredicto.
  return null
}


/* ================================================================ *
 *  NÚCLEO, TENSIÓN, INTENTO, RESISTENCIA, PATRÓN
 *
 *   Cada sección lee una parte del conjunto y dice qué está pasando.
 *   Las cartas se mencionan como evidencia, no como lookup.
 * ================================================================ */

function essenceOf(card) {
  // Buscar essence en el contenido enriquecido si existe; si no, nombre.
  return card?.content?.essence || card?.essence || card?.nombre || card?.name || ''
}

function nameOf(card) {
  return card?.nombre || card?.name || (card?.suit && card?.number ? `${card.number} de ${card.suit}` : '')
}

/* Convierte la primera letra a minúscula y quita el punto final. */
function lowerFirst(s) {
  if (!s) return ''
  const t = s.trim().replace(/\.$/, '')
  return t.charAt(0).toLowerCase() + t.slice(1)
}

/* NÚCLEO — qué está pasando en el centro. Para tirada de 3 usa carta 1+2,
   para Cruz Celta usa posiciones 1 (presente) + 2 (cruz). */
function buildCore(card1, card2) {
  if (!card1 || !card2) return ''
  const n1 = nameOf(card1)
  const e1 = lowerFirst(essenceOf(card1))
  const e2 = lowerFirst(essenceOf(card2))

  if (!e1 && !e2) return ''
  if (!e2) return `En el centro: ${e1}.`

  // Si la segunda es un Arcano Mayor, lo nombramos como capítulo.
  const c2Major = card2.isMajor
  if (c2Major) {
    return `En el centro: ${e1}. Lo cruza un Arcano Mayor — ${e2} —, así que la fricción no es del día, es de capítulo.`
  }
  return `En el centro: ${e1}. Lo que se le pega, casi como sombra: ${e2}.`
}

/* TENSIÓN — qué sostiene el conflicto. Toma el macro más fuerte que
   describa una tensión y agrega la evidencia. */
const TENSION_LINES = {
  'tension-mental-dominante': (evidence) =>
    `La tensión está en lo mental. ${evidence.length > 1 ? 'Varias cartas señalan que la cabeza ya hizo el recorrido varias veces' : 'La cabeza está sosteniendo más peso del que conviene'}.`,
  'contencion-emocional': () =>
    'La tensión está en lo que se está guardando. El afecto pide aire y la respuesta es silencio o estructura.',
  'exceso-control': () =>
    'La tensión está en el control. Cuanto más se aprieta, menos respira lo que se quería cuidar.',
  'deseo-bloqueado': () =>
    'La tensión está entre dos partes tuyas: una quiere moverse, otra está conteniendo. Ambas tienen razón en distinto plano.',
  'agotamiento-sostenido': () =>
    'La tensión es cansancio acumulado, no crisis aguda. Lo que pide la situación es pausa, no más empuje.',
  'claridad-retenida': () =>
    'La tensión está en lo no dicho. Algo claro está esperando ser nombrado, y mientras tanto pesa en el cuerpo.',
  'evasion-activa': () =>
    'La tensión está en lo que estás eludiendo. Irse en silencio también deja factura.',
  'negacion-evidente': () =>
    'La tensión está en negar algo que ya pasó. La cabeza está armando teorías nuevas para sostener una versión vieja.',
  'patron-vuelve': () =>
    'La tensión es de repetición. Ya estuviste aquí; la pregunta no es qué hacer ahora, es por qué volvió esta escena.',
  'avance-ciego': () =>
    'La tensión está entre impulso y prudencia. Una parte tuya está empujando y otra te está pidiendo frenar.'
}

function buildTension(macros) {
  for (const m of macros) {
    const fn = TENSION_LINES[m.key]
    if (fn) return fn(m.evidence)
  }
  return ''
}

/* INTENTO — qué intenta cambiar. Para Cruz Celta usa posición 3 (corona)
   + 6 (futuro próximo) o sus equivalentes. */
function buildAttempt(cards, macros) {
  // Buscamos macros que hablan de movimiento/intento
  const moving = macros.find(m =>
    ['reparacion-en-curso','ruptura-en-curso','decision-postergada','avance-ciego'].includes(m.key)
  )
  if (moving) {
    switch (moving.key) {
      case 'reparacion-en-curso':
        return 'Algo se está intentando recomponer — despacio, sin garantía pero con dirección.'
      case 'ruptura-en-curso':
        return 'Algo está intentando romperse para que pueda salir lo siguiente. No hace falta decidirlo — ya está pasando.'
      case 'decision-postergada':
        return 'Lo que la tirada intenta mover es una decisión que llevas demasiado tiempo evitando. La situación pide elegir, no más análisis.'
      case 'avance-ciego':
        return 'Una parte tuya intenta lanzarse ya. Conviene preguntarse si la urgencia es de la situación o de no soportar la espera.'
    }
  }
  // Si no hay macro de movimiento, miramos el movimiento dominante en el conjunto.
  const advancing = cards.filter(c => ['avance','circulación'].includes(c?.attrs?.movementType))
  if (advancing.length >= 2) {
    return 'Hay movimiento queriendo salir. La pregunta no es si moverse — es hacia dónde.'
  }
  return ''
}

/* RESISTENCIA — qué se resiste a cambiar. */
function buildResistance(cards, macros) {
  const resisting = macros.find(m =>
    ['exceso-control','resistencia-cierre','dificultad-cerrar','negacion-evidente'].includes(m.key)
  )
  if (resisting) {
    switch (resisting.key) {
      case 'exceso-control':
        return 'Lo que se resiste es soltar el control. Mantener el orden es lo que está costando el movimiento real.';
      case 'resistencia-cierre':
        return 'Lo que se resiste es el cierre. Algo pide terminar y se está sosteniendo con un esfuerzo que ya no rinde.';
      case 'dificultad-cerrar':
        return 'Lo que se resiste es soltar lo que ya terminó por dentro. La forma sigue ahí porque cerrarla obliga a decidir qué viene.';
      case 'negacion-evidente':
        return 'Lo que se resiste es admitir lo evidente. Mientras más se niega, más cara se vuelve la versión nueva.'
    }
  }
  return ''
}

/* PATRÓN REPETIDO — si hay macro de repetición o cartas cíclicas. */
function buildPattern(macros) {
  const rep = macros.find(m => m.key === 'patron-vuelve' || m.key === 'proyeccion-afuera')
  if (!rep) return ''
  if (rep.key === 'patron-vuelve') {
    return 'Esta escena ya pasó antes, con otros nombres. Lo que cambia no es la situación: es a qué parte tuya le toca el rol esta vez.'
  }
  if (rep.key === 'proyeccion-afuera') {
    return 'Hay un patrón: lo que más fácil ves en los demás es probablemente lo que cuesta más mirar en ti.'
  }
  return ''
}

/* INVERTIDAS — cómo cambian el tono general. Solo si hay 2+ invertidas. */
function buildInversions(cards, stats, macros) {
  if (stats.invertedCount < 2) return ''
  if (stats.invertedCount >= 3) {
    return 'Tres cartas invertidas cambian el problema entero. Lo que pide la lectura ya no es entender más — es enfrentar la resistencia que estás poniendo a lo que ya entendiste.'
  }
  // Dos invertidas — analizar qué tipo de inversión.
  const denial   = macros.find(m => m.key === 'negacion-evidente')
  const evasion  = macros.find(m => m.key === 'evasion-activa')
  if (denial) {
    return 'Las dos cartas invertidas señalan negación. Hay algo que ya pasó y la cabeza sigue armando explicaciones para que no haya pasado.'
  }
  if (evasion) {
    return 'Las dos invertidas señalan fuga. Te estás yendo de algo que pide ser nombrado primero.'
  }
  return 'Hay dos cartas invertidas. La lectura no está saliendo en su forma directa — algo está pasando filtros que conviene mirar.'
}

/* SÍNTESIS — qué pide la tirada. Una sola línea, sin moralizar. */
function buildSynthesis(macros, stats, hasCrossing) {
  // Si hay un cruce icónico fuerte, la síntesis lo respeta y no repite.
  if (hasCrossing) {
    return 'Lo que pide la tirada está dicho arriba en una sola frase. Lo demás es el contexto que la sostiene.'
  }
  const top = macros[0]
  if (!top) {
    return 'Esta tirada no exige una respuesta hoy. Te pide quedarte un día más con la pregunta antes de moverte.'
  }
  switch (top.key) {
    case 'tension-mental-dominante':
      return 'La tirada pide salir de la cabeza. Decidir más rápido no aclara: lo que falta es traer el cuerpo a la conversación.'
    case 'contencion-emocional':
      return 'La tirada pide dejar que lo que se está guardando encuentre forma. No tiene que ser dicho a todos — tiene que ser dicho.'
    case 'dificultad-cerrar':
      return 'La tirada pide cerrar. No hay un momento perfecto: hay este.'
    case 'agotamiento-sostenido':
      return 'La tirada pide pausa real. Descansar también es decisión, y posponerla la vuelve más cara.'
    case 'claridad-retenida':
      return 'La tirada pide nombrar lo que ya viste. Una vez dicho, no se puede des-saber — y eso es lo que está costando.'
    case 'evasion-activa':
      return 'La tirada pide girar la cara hacia lo que estás esquivando. No para resolverlo: para mirarlo.'
    case 'exceso-control':
      return 'La tirada pide aflojar la mano. Lo que estás cuidando no se rompe si lo dejas respirar.'
    case 'deseo-bloqueado':
      return 'La tirada pide escuchar al deseo sin censurarlo. No tiene que ejecutarse — tiene que ser oído.'
    case 'patron-vuelve':
      return 'La tirada pide cambiar el papel que haces en esta escena, no la escena.'
    case 'resistencia-cierre':
      return 'La tirada pide dejar caer lo que ya cayó. Sostenerlo no lo salva — solo te cansa.'
    case 'decision-postergada':
      return 'La tirada pide elegir. Cualquier elección ordena más que la espera indefinida.'
    case 'reparacion-en-curso':
      return 'La tirada pide no apurar lo que se está acomodando. Confiar también es trabajo.'
    case 'vinculo-en-juego':
      return 'La tirada pide hablar con quien está implicado, no con quien está cerca.'
    case 'proyeccion-afuera':
      return 'La tirada pide girar el espejo. Lo que ves afuera, parte está adentro.'
    case 'ruptura-en-curso':
      return 'La tirada pide dejar que lo que se está cayendo se caiga, sin apresurar ni sostener.'
    case 'avance-ciego':
      return 'La tirada pide esperar 24 horas antes de moverte. Si la decisión sigue siendo buena mañana, ya estará lista.'
    case 'negacion-evidente':
      return 'La tirada pide admitir lo que ya pasó. La versión nueva empieza ahí, no antes.'
  }
  return 'Esta tirada pide más atención que respuesta. La forma de lo que sigue va a aparecer cuando dejes de empujarla.'
}


/* ================================================================ *
 *  API PRINCIPAL
 * ================================================================ */

/**
 * Compone una lectura narrativa de 3 cartas.
 *
 * @param {Array} cards     cartas enriquecidas (withAttrs aplicado)
 * @param {Array} macros    resultado de detectMacros()
 * @param {Object} stats    resultado de readingStats()
 * @param {Object} crossing  cruce icónico fuerte si existe ({phrase, weight, ...})
 * @param {number} seed     hash determinístico para variantes
 *
 * @returns {Object} narrative = {
 *   thesis,    // string — la observación de apertura
 *   core,      // string — qué está pasando en el centro
 *   tension,   // string — qué sostiene el conflicto
 *   inversions, // string — efecto de invertidas (si hay)
 *   synthesis, // string — qué pide la tirada
 *   macros,    // array de macros detectados (debug + UI opcional)
 * }
 */
export function composeThreeCardNarrative({ cards, macros, stats, crossing, seed }) {
  return {
    thesis:     crossing?.phrase || generateThesis(macros, stats, seed),
    core:       buildCore(cards[0], cards[1]),
    tension:    buildTension(macros),
    inversions: buildInversions(cards, stats, macros),
    synthesis:  buildSynthesis(macros, stats, !!crossing),
    macros
  }
}

/**
 * Compone una lectura narrativa de Cruz Celta (10 cartas).
 *
 * @param {Array} slots — 10 elementos { slot:{card,reversed}, content }
 *                        El caller ya resolvió contenido por carta.
 * @param {Array} macros - macros detectados sobre las 10 cartas
 * @param {Object} stats - stats sobre las 10
 * @param {Object} crossing - cruce icónico si lo hay
 * @param {number} seed
 *
 * @returns {Object} narrative = {
 *   thesis, core, tension, attempt, resistance, pattern, inversions,
 *   synthesis, macros
 * }
 */
export function composeCelticNarrative({ cards, macros, stats, crossing, seed }) {
  return {
    thesis:     crossing?.phrase || generateThesis(macros, stats, seed),
    core:       buildCore(cards[0], cards[1]),
    tension:    buildTension(macros),
    attempt:    buildAttempt(cards, macros),
    resistance: buildResistance(cards, macros),
    pattern:    buildPattern(macros),
    inversions: buildInversions(cards, stats, macros),
    synthesis:  buildSynthesis(macros, stats, !!crossing),
    macros
  }
}

/**
 * Etiquetas para macros — para que la UI pueda mostrar la lista como
 * "Predomina: contención emocional · tensión mental · dificultad para cerrar".
 */
export function macrosAsList(macros, max = 3) {
  return macros.slice(0, max).map(m => m.label)
}
