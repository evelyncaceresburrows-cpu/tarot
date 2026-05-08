/* =====================================================================
 * celticReading.js
 *
 * La Cruz Celta de ADE — la experiencia profunda de 10 cartas.
 *
 * DECISIONES DE DISEÑO
 *   · Mantenemos las 10 posiciones tradicionales Rider-Waite
 *     pero los títulos se reinterpretan en el lenguaje contemplativo
 *     de ADE (íntimo, simbólico, no técnico).
 *   · Cada posición tiene un ROL narrativo distinto: presencia,
 *     tensión, aspiración, raíz, pasado, futuro, identidad,
 *     entorno, sombra interna, horizonte.
 *   · La lectura se construye PROGRESIVAMENTE — la app revela
 *     una carta por vez y la lectura se adapta.
 *   · Al final, una síntesis relacional larga, no una concatenación.
 *
 * IMPORTANTE
 *   Esto NO es un dashboard. Es un ritual. La interfaz que consume
 *   este motor debe respetar pausas, respiración, peso simbólico.
 * ===================================================================*/

import { enrichCard, isMajor } from './cardEnergetics.js'

/* =====================================================================
 * 1. POSICIONES — metadatos completos
 *
 *  · classical → nombre tradicional Rider-Waite (referencia interna)
 *  · label     → cómo lo lee la usuaria (lenguaje ADE)
 *  · role      → función narrativa de la posición en la cruz
 *  · whisper   → línea breve de apertura cuando la carta cae aquí
 *  · prompt    → pregunta abierta que la posición despierta
 * ===================================================================*/

export const CELTIC_POSITIONS = [
  {
    index: 0,
    key:       'present',
    classical: 'Situación actual',
    label:     'Lo que está latiendo ahora',
    role:      'Presencia',
    whisper:   'Aquí, en el centro, está lo que se está manifestando ahora mismo.',
    prompt:    '¿Qué está pidiendo ser visto sin interpretación?'
  },
  {
    index: 1,
    key:       'crossing',
    classical: 'Lo que cruza',
    label:     'Lo que tensiona el movimiento',
    role:      'Tensión',
    whisper:   'Atravesando lo central aparece lo que da textura, fricción, contraste.',
    prompt:    '¿Qué hace que esto no sea simple?'
  },
  {
    index: 2,
    key:       'crown',
    classical: 'Lo que corona',
    label:     'Lo que se asoma como aspiración',
    role:      'Aspiración',
    whisper:   'Por encima de la escena, esta carta indica lo que se está pensando, lo que se aspira.',
    prompt:    '¿Qué imagen del futuro estás sosteniendo —consciente o no?'
  },
  {
    index: 3,
    key:       'foundation',
    classical: 'La base',
    label:     'Lo que sostiene silenciosamente esta historia',
    role:      'Raíz',
    whisper:   'Debajo, esta carta nombra lo que ya estaba ahí mucho antes de la pregunta.',
    prompt:    '¿Qué está en la raíz, aunque no se vea?'
  },
  {
    index: 4,
    key:       'past',
    classical: 'Lo que queda atrás',
    label:     'Lo que ya se está alejando',
    role:      'Pasado próximo',
    whisper:   'A la izquierda del centro, esta carta es lo que vino antes y todavía deja eco.',
    prompt:    '¿Qué se está despidiendo en silencio?'
  },
  {
    index: 5,
    key:       'future',
    classical: 'Lo que se aproxima',
    label:     'Lo que empieza a hacer presencia',
    role:      'Futuro próximo',
    whisper:   'A la derecha del centro, esta carta es lo que asoma en el horizonte cercano.',
    prompt:    '¿Qué empieza a hacer presencia, todavía sin nombre?'
  },
  {
    index: 6,
    key:       'self',
    classical: 'El consultante',
    label:     'Cómo estás tú en este momento',
    role:      'Identidad',
    whisper:   'Aquí te ves a tú, tal como llegás a esta lectura — no como te ves siempre.',
    prompt:    '¿Desde qué versión tuya estás mirando esto?'
  },
  {
    index: 7,
    key:       'environment',
    classical: 'El entorno',
    label:     'Lo que rodea sin ser tuyo',
    role:      'Contexto',
    whisper:   'Esta carta describe el aire alrededor: las personas, lo dicho y lo no dicho.',
    prompt:    '¿Qué del afuera está pesando en esto, aunque no te pertenezca?'
  },
  {
    index: 8,
    key:       'inner',
    classical: 'Esperanzas y miedos',
    label:     'Lo que una parte de tú intenta proteger',
    role:      'Sombra interna',
    whisper:   'Aquí vive la mezcla rara entre lo que quieres y lo que temés que pase.',
    prompt:    '¿Qué parte tuya está tratando de cuidar algo, aunque no lo nombres así?'
  },
  {
    index: 9,
    key:       'horizon',
    classical: 'Resultado',
    label:     'El horizonte hacia el que se inclina',
    role:      'Horizonte',
    whisper:   'No es una sentencia: es la dirección hacia donde, hoy, todo esto se inclina.',
    prompt:    '¿Qué pasaría si dejaras que esta lectura sea cierta por un día?'
  }
]

export const CELTIC_POSITION_COUNT = 10


/* =====================================================================
 * 2. WHISPER COMPOSER · línea adaptativa por carta
 *
 *  Para cada (posición, carta) producimos una micro-narrativa que
 *  toma:
 *   · whisper de la posición (para el rol)
 *   · essence de la carta (para el contenido)
 *   · synthesis o reading de la carta (para el matiz)
 *
 *  Resultado: una frase breve íntima que sirve durante el reveal
 *  uno-por-uno. NO es la lectura larga; es la voz baja que acompaña.
 * ===================================================================*/

export function composeCardWhisper(positionIndex, cardContent) {
  const pos = CELTIC_POSITIONS[positionIndex]
  if (!pos || !cardContent) return ''
  const essence = (cardContent.essence || '').trim().replace(/\.$/, '')
  if (!essence) return pos.whisper
  return `${pos.whisper} Aquí: ${essence.charAt(0).toLowerCase()}${essence.slice(1)}.`
}


/* =====================================================================
 * 3. DETECTORES GLOBALES · una vista de las 10 cartas
 *
 *  No replica todo el motor relacional (que está pensado para 3
 *  cartas en 3 posiciones específicas), pero sí extrae los pulsos
 *  clave para una tirada larga:
 *    · % de Mayores
 *    · palo dominante
 *    · tendencia de temperatura
 *    · tendencia de dirección
 *    · contradicciones presentes
 * ===================================================================*/

function detectMajorWeight(enriched) {
  const count = enriched.filter(e => e.isMajor).length
  if (count >= 6) return 'overwhelming'
  if (count >= 4) return 'strong'
  if (count >= 2) return 'present'
  if (count === 1) return 'single'
  return 'absent'
}

function detectSuitDominance(enriched) {
  const counts = {}
  enriched.forEach(e => {
    if (e.suit) counts[e.suit] = (counts[e.suit] || 0) + 1
  })
  let best = null
  for (const [suit, n] of Object.entries(counts)) {
    if (!best || n > best.count) best = { suit, count: n }
  }
  if (!best || best.count < 3) return null
  return best
}

function detectTempBalance(enriched) {
  const c = { warm: 0, cold: 0, tense: 0, neutral: 0 }
  enriched.forEach(e => { c[e.energy.temperature] = (c[e.energy.temperature] || 0) + 1 })
  if (c.tense >= 3) return 'tense'
  if (c.warm >= 5) return 'warm'
  if (c.cold >= 5) return 'cold'
  if (c.warm >= 3 && c.cold >= 3) return 'split'
  if (c.warm > c.cold + 1) return 'warm-leaning'
  if (c.cold > c.warm + 1) return 'cold-leaning'
  return 'mixed'
}

function detectDirectionPull(enriched) {
  const c = { inward: 0, outward: 0, suspended: 0 }
  enriched.forEach(e => { c[e.energy.direction] = (c[e.energy.direction] || 0) + 1 })
  if (c.inward >= 6) return 'deeply-inward'
  if (c.outward >= 6) return 'fully-outward'
  if (c.suspended >= 4) return 'mostly-suspended'
  if (c.inward >= 4 && c.outward >= 4) return 'split-direction'
  return 'mixed'
}

/* Detectar tensiones simbólicas concretas: pares de cartas en
   posiciones específicas que dialogan/chocan. Ej: si la carta del
   pasado y la del futuro pertenecen al mismo palo, hay continuidad.
   Si "lo que quieres" (crown) y "lo que rodea" (environment) tienen
   temperatura opuesta, hay contradicción de mundo. */
function detectSymbolicTensions(enriched) {
  const tensions = []
  const [present, crossing, crown, foundation, past, future, self, env, inner, horizon] = enriched

  // pasado vs futuro
  if (past?.suit && future?.suit && past.suit === future.suit) {
    tensions.push({ type: 'continuity-of-suit', detail: `el palo del pasado vuelve en el horizonte cercano (${past.suit})` })
  }
  // crown vs horizonte: aspiración vs inclinación real
  if (crown && horizon) {
    if (crown.energy.temperature !== horizon.energy.temperature) {
      tensions.push({ type: 'aspiration-vs-result', detail: 'lo que aspirás y hacia donde se inclina la lectura tienen temperaturas distintas' })
    }
  }
  // self vs environment
  if (self && env) {
    if (self.energy.direction !== env.energy.direction) {
      tensions.push({ type: 'self-vs-environment', detail: 'la dirección interna que traés y la del entorno no coinciden' })
    }
  }
  // crossing es Mayor: la tensión es de capítulo, no de escena
  if (crossing?.isMajor) {
    tensions.push({ type: 'major-crossing', detail: 'lo que tensiona el momento es un Arcano Mayor — un capítulo, no un detalle' })
  }
  // inner (esperanzas/miedos) en oposición a horizonte
  if (inner && horizon && inner.energy.temperature === 'tense' && horizon.energy.temperature === 'warm') {
    tensions.push({ type: 'inner-fear-vs-warm-horizon', detail: 'lo que te pesa por dentro está más tenso que lo que la lectura inclina' })
  }
  return tensions
}


/* =====================================================================
 * 4. SÍNTESIS FINAL
 *
 *  Compone una lectura larga con tres movimientos:
 *    A · CLIMA — peso de Mayores + temperatura + dirección
 *    B · ARCO  — qué se está moviendo entre pasado, presente, futuro
 *    C · ECO   — tensiones simbólicas detectadas y la pregunta que dejan
 *
 *  No es un resumen. Es un cierre con peso.
 * ===================================================================*/

const CLIMATE_LINES = {
  overwhelming: [
    'Esta lectura late en una escala muy grande: estás claramente en un capítulo central de tu vida, no en una escena al pasar.',
    'La presencia abrumadora de Arcanos Mayores nombra un momento bisagra. Lo que pase ahora va a importar después.'
  ],
  strong: [
    'Esta lectura tiene varios capítulos abiertos a la vez. No es una pregunta cualquiera: es una ventana a algo grande.',
    'La fuerza de los Mayores aquí te pide leer esto despacio. No es ruido del día.'
  ],
  present: [
    'Hay un par de Arcanos Mayores que enmarcan la lectura: algo importante te atraviesa, sin ser todo.',
    'La lectura se mueve entre lo cotidiano y un capítulo más amplio.'
  ],
  single: [
    'Una sola figura grande se asoma sobre escenas más cotidianas: probablemente sea el centro emocional de la lectura.',
    'Hay una pieza grande sostenida por gestos del día.'
  ],
  absent: [
    'Esta lectura se mueve a ras del piso, en lo concreto y lo cotidiano. No es menos profunda — es más íntima.',
    'No hay Mayores: el ritual está hecho de gestos chicos. Conviene leer sin buscar el drama.'
  ]
}

const TEMP_LINES = {
  tense:        'Atraviesa una tensión sostenida — algo todavía no se nombró.',
  warm:         'El clima es mayormente cálido, sostenido.',
  cold:         'Predomina una claridad fría, lúcida, sin dureza.',
  split:        'Frío y calor conviven a partes casi iguales: dos verdades distintas en la misma escena.',
  'warm-leaning': 'Predomina lo cálido, con una zona fresca que pide atención.',
  'cold-leaning': 'Predomina lo lúcido, con un punto cálido que sobrevive.',
  mixed:        'El clima cambia de carta a carta — no hay una sola temperatura.'
}

const DIRECTION_LINES = {
  'deeply-inward':   'La mayoría de la lectura mira hacia adentro: este momento se está pensando, no actuando.',
  'fully-outward':   'La mayoría de la lectura empuja hacia afuera: lo importante se está jugando en lo concreto.',
  'mostly-suspended':'Mucho de esto está en pausa, esperando que algo se mueva primero.',
  'split-direction': 'Una parte de la lectura quiere salir, otra pide quedarse adentro.',
  mixed:             'El movimiento no tiene una dirección única.'
}

const SUIT_LINES = {
  Copas:   'El centro emocional de la lectura está en los vínculos, los afectos y la intuición.',
  Espadas: 'El centro emocional de la lectura está en pensamientos, decisiones y verdades a nombrar.',
  Bastos:  'El centro emocional de la lectura está en impulsos, deseos y proyectos en marcha.',
  Oros:    'El centro emocional de la lectura está en el cuerpo, el oficio y lo que se construye con tiempo.'
}

const TENSION_LINES = {
  'continuity-of-suit':       'Algo del territorio del pasado vuelve en el horizonte cercano: hay una historia que todavía está terminando de cerrarse.',
  'aspiration-vs-result':     'Lo que aspirás y hacia donde se inclina la lectura no tienen el mismo aire. Conviene mirar si lo que quieres es realmente lo que estás pidiendo, o si lo que pides dice algo distinto de lo que quieres.',
  'self-vs-environment':      'La dirección interna que traés y la del entorno no coinciden: parte de la fricción que sientes no es tuya, es el desfase entre tú y lo que rodea.',
  'major-crossing':           'Lo que cruza la lectura es un Arcano Mayor: la fricción no es del día, es del capítulo.',
  'inner-fear-vs-warm-horizon':'Lo que te pesa por dentro está más tenso que lo que la lectura inclina hacia afuera. Probablemente estás cargando con un miedo que la realidad no está confirmando.'
}

function pickSeeded(arr, seed) {
  if (!arr || arr.length === 0) return ''
  return arr[seed % arr.length]
}

function hashFor(cards) {
  const s = (cards || []).map(c => c?.name || `${c?.suit}/${c?.number}`).join('|')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}


/* =====================================================================
 * 5. CONSTRUCCIÓN POR BLOQUES NARRATIVOS
 *
 *  La lectura se monta en 5 movimientos que crecen en profundidad:
 *
 *    OPENING — apertura general (tono emocional dominante)
 *    BLOQUE 1 — cartas 1-2-3: situación · tensión · aspiración
 *    BLOQUE 2 — cartas 4-5-6: raíz · pasado próximo · futuro próximo
 *    BLOQUE 3 — cartas 7-8-9: cómo llegas · entorno · sombra interna
 *    CLOSING  — carta 10 + síntesis emocional total
 *
 *  Cada bloque RELACIONA las 3 cartas, no las concatena. La sintaxis
 *  cambia con la energía dominante del trío para que no suene a
 *  template.
 * ===================================================================*/

function lowerFirst(s) {
  if (!s) return ''
  const t = s.trim().replace(/\.$/, '')
  return t.charAt(0).toLowerCase() + t.slice(1)
}

function essenceOf(card, content) {
  return lowerFirst(content?.essence) || lowerFirst(card?.nombre) || ''
}

/* ---------- OPENING — apertura general --------------------------- */

function buildOpening(majorWeight, tempBalance, directionPull, seed) {
  const climate = pickSeeded(CLIMATE_LINES[majorWeight], seed)
  const tempL   = TEMP_LINES[tempBalance] || ''
  const dirL    = DIRECTION_LINES[directionPull] || ''
  return [climate, tempL, dirL].filter(Boolean).join(' ')
}


/* ---------- BLOQUE 1 — situación · tensión · aspiración ----------
 *  Presente (1) + Cruz (2) + Corona (3)
 *  La narrativa: "lo que se manifiesta · lo que da fricción · lo que
 *  se asoma como horizonte mental".
 * ----------------------------------------------------------------- */

function buildBlock1(s1, s2, s3) {
  const e1 = essenceOf(s1.slot.card, s1.content)
  const e2 = essenceOf(s2.slot.card, s2.content)
  const e3 = essenceOf(s3.slot.card, s3.content)

  const c2Major  = s2.content?.isMajor
  const tempEq12 = s1.content && s2.content
    && (enrichCard(s1.slot.card).energy.temperature === enrichCard(s2.slot.card).energy.temperature)
  const tempEq13 = s1.content && s3.content
    && (enrichCard(s1.slot.card).energy.temperature === enrichCard(s3.slot.card).energy.temperature)

  /* Frase apertura — varía si la cruz es Mayor (capítulo) o Menor (escena) */
  const opener = c2Major
    ? `En el centro de la escena, ${e1}. Cruzándolo aparece algo más grande, una bisagra: ${e2}.`
    : `En el centro, ${e1}. Lo que tensiona el momento se le superpone, casi como sombra: ${e2}.`

  /* Frase aspiración — varía si corona armoniza o contradice el centro */
  let coronation
  if (tempEq13) {
    coronation = `Y por encima, lo que se asoma como aspiración respira en el mismo aire: ${e3}.`
  } else {
    coronation = `Por encima, lo que se asoma como aspiración pide otra cosa: ${e3}.`
  }

  return `${opener} ${coronation}`
}


/* ---------- BLOQUE 2 — raíz · pasado · futuro -------------------
 *  Base (4) + Pasado próximo (5) + Futuro próximo (6)
 *  La narrativa: "lo que sostiene desde abajo · lo que se va · lo
 *  que llega". Es el ARCO del tiempo y el movimiento interno.
 * ---------------------------------------------------------------- */

function buildBlock2(s4, s5, s6) {
  const e4 = essenceOf(s4.slot.card, s4.content)
  const e5 = essenceOf(s5.slot.card, s5.content)
  const e6 = essenceOf(s6.slot.card, s6.content)

  const dirPast = enrichCard(s5.slot.card).energy.direction
  const dirFut  = enrichCard(s6.slot.card).energy.direction
  const tempPast = enrichCard(s5.slot.card).energy.temperature
  const tempFut  = enrichCard(s6.slot.card).energy.temperature

  /* Frase raíz */
  const root = `Debajo de todo eso, lo que sostiene esta historia en silencio: ${e4}.`

  /* Frase arco entre pasado y futuro — varía por dirección y temperatura */
  let arc
  if (dirPast === 'outward' && dirFut === 'inward') {
    arc = `Lo que se aleja venía manifestándose afuera —${e5}—; lo que llega pide volver a habitar lo íntimo —${e6}—.`
  } else if (dirPast === 'inward' && dirFut === 'outward') {
    arc = `Lo que se aleja era íntimo —${e5}—; lo que se aproxima pide aterrizar en lo concreto —${e6}—.`
  } else if (tempPast === 'tense' && tempFut === 'warm') {
    arc = `Lo que se aleja traía tensión —${e5}—; lo que se acerca empieza a dejar respirar —${e6}—.`
  } else if (tempPast === 'warm' && tempFut === 'cold') {
    arc = `Lo que se aleja era cálido —${e5}—; lo que llega trae una claridad más fría, más lúcida —${e6}—.`
  } else if (tempPast === tempFut && dirPast === dirFut) {
    arc = `El pasado próximo y el futuro cercano comparten registro: lo que se va —${e5}— y lo que llega —${e6}— hablan el mismo idioma. La historia sigue su línea.`
  } else {
    arc = `Lo que se va: ${e5}. Lo que se aproxima: ${e6}. Entre ambos, un movimiento que todavía está terminando de decidir su forma.`
  }

  return `${root} ${arc}`
}


/* ---------- BLOQUE 3 — identidad · entorno · sombra interna -----
 *  Self (7) + Entorno (8) + Esperanzas/Miedos (9)
 *  La narrativa: "cómo llegas · qué hay alrededor · qué cuidas por
 *  dentro". Es la lectura humana, los vínculos y el deseo.
 * ---------------------------------------------------------------- */

function buildBlock3(s7, s8, s9) {
  const e7 = essenceOf(s7.slot.card, s7.content)
  const e8 = essenceOf(s8.slot.card, s8.content)
  const e9 = essenceOf(s9.slot.card, s9.content)

  const dirSelf = enrichCard(s7.slot.card).energy.direction
  const dirEnv  = enrichCard(s8.slot.card).energy.direction
  const tempInner = enrichCard(s9.slot.card).energy.temperature
  const tempSelf  = enrichCard(s7.slot.card).energy.temperature

  /* Frase del self */
  const selfLine = `Llegas a esta lectura con esta versión tuya: ${e7}.`

  /* Frase del entorno — varía si choca con el self */
  let envLine
  if (dirSelf !== dirEnv) {
    envLine = `Y alrededor, un aire que no acompaña del todo: ${e8}.`
  } else {
    envLine = `Lo que rodea, sin ser tuyo, se mueve en el mismo registro: ${e8}.`
  }

  /* Frase del inner — varía por contraste con el self */
  let innerLine
  if (tempInner === 'tense' && tempSelf !== 'tense') {
    innerLine = `Y por dentro, una parte tuya está cuidando algo más tenso de lo que tu propia versión deja ver: ${e9}.`
  } else if (tempInner === tempSelf) {
    innerLine = `Y lo que esa parte tuya intenta proteger se mueve en el mismo color: ${e9}.`
  } else {
    innerLine = `Y en lo más íntimo, una mezcla rara entre lo que quieres y lo que temes: ${e9}.`
  }

  return `${selfLine} ${envLine} ${innerLine}`
}


/* ---------- CLOSING — horizonte · síntesis · pregunta -----------
 *  Carta 10 + síntesis relacional + pregunta de cierre.
 *  Aquí cosemos las tensiones simbólicas detectadas a lo largo de
 *  la lectura — cuando aparecen — para que el cierre tenga densidad.
 * ---------------------------------------------------------------- */

function buildClosing(s10, tensions, suitDominance) {
  const e10 = essenceOf(s10.slot.card, s10.content)

  /* Frase del horizonte */
  let horizon = `Y el horizonte hacia el que todo esto se inclina: ${e10}.`

  /* Si el horizonte contiene un prompt propio (carta escrita), lo
     guardamos para la pregunta final. Si no, tendremos un fallback. */

  /* Coser tensiones simbólicas como capa de profundidad */
  const tensionParts = []
  if (suitDominance) {
    tensionParts.push(SUIT_LINES[suitDominance.suit] || '')
  }
  for (const t of tensions.slice(0, 2)) {
    const tl = TENSION_LINES[t.type]
    if (tl) tensionParts.push(tl)
  }
  const tensionLine = tensionParts.filter(Boolean).join(' ')

  return {
    horizonLine: horizon,
    synthesis: tensionLine
  }
}


/* =====================================================================
 * 6. EXPORT — composer principal
 * ===================================================================*/

/**
 * Componer una lectura completa de Cruz Celta.
 *
 * @param {Array} slots — array de 10 elementos con shape:
 *                        { slot: { card, reversed }, content }
 *                        El caller (componente UI) hace la resolución
 *                        de contenido vía contentBridge.findContentByCard.
 * @returns lectura en 5 movimientos + diagnosis.
 */
export function composeCelticReading(slots) {
  if (!slots || slots.length < 10) return null

  const cards    = slots.slice(0, 10).map(s => s.slot.card)
  const enriched = cards.map(c => enrichCard(c))
  const seed     = hashFor(cards)

  const majorWeight   = detectMajorWeight(enriched)
  const suitDominance = detectSuitDominance(enriched)
  const tempBalance   = detectTempBalance(enriched)
  const directionPull = detectDirectionPull(enriched)
  const tensions      = detectSymbolicTensions(enriched)

  const opening = buildOpening(majorWeight, tempBalance, directionPull, seed)
  const block1  = buildBlock1(slots[0], slots[1], slots[2])
  const block2  = buildBlock2(slots[3], slots[4], slots[5])
  const block3  = buildBlock3(slots[6], slots[7], slots[8])
  const { horizonLine, synthesis } = buildClosing(slots[9], tensions, suitDominance)

  /* Pregunta de cierre */
  const closingPrompt = slots[9].content?.prompt
    || '¿Qué pasaría si dejaras que esta lectura sea cierta por un día?'

  return {
    opening,
    block1,
    block2,
    block3,
    horizonLine,
    synthesis,
    closingPrompt,

    /* Compatibilidad con la versión anterior */
    climate: opening,
    arc: block2,
    echo: synthesis,
    closing: closingPrompt,

    diagnosis: {
      majorWeight,
      suitDominance,
      tempBalance,
      directionPull,
      tensions
    },
    enriched
  }
}
