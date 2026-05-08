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
 *  · whisper   → línea breve de apertura cuando la carta cae acá
 *  · prompt    → pregunta abierta que la posición despierta
 * ===================================================================*/

export const CELTIC_POSITIONS = [
  {
    index: 0,
    key:       'present',
    classical: 'Situación actual',
    label:     'Lo que está latiendo ahora',
    role:      'Presencia',
    whisper:   'Acá, en el centro, está lo que se está manifestando ahora mismo.',
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
    label:     'Cómo estás vos en este momento',
    role:      'Identidad',
    whisper:   'Acá te ves a vos, tal como llegás a esta lectura — no como te ves siempre.',
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
    label:     'Lo que una parte de vos intenta proteger',
    role:      'Sombra interna',
    whisper:   'Acá vive la mezcla rara entre lo que querés y lo que temés que pase.',
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
  return `${pos.whisper} Acá: ${essence.charAt(0).toLowerCase()}${essence.slice(1)}.`
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
   Si "lo que querés" (crown) y "lo que rodea" (environment) tienen
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
    'La fuerza de los Mayores acá te pide leer esto despacio. No es ruido del día.'
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
  'aspiration-vs-result':     'Lo que aspirás y hacia donde se inclina la lectura no tienen el mismo aire. Conviene mirar si lo que querés es realmente lo que estás pidiendo, o si lo que pedís dice algo distinto de lo que querés.',
  'self-vs-environment':      'La dirección interna que traés y la del entorno no coinciden: parte de la fricción que sentís no es tuya, es el desfase entre vos y lo que rodea.',
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


export function composeCelticReading(cards) {
  if (!cards || cards.length < 10) return null
  const enriched = cards.slice(0, 10).map(c => enrichCard(c))
  const seed = hashFor(cards)

  const majorWeight     = detectMajorWeight(enriched)
  const suitDominance   = detectSuitDominance(enriched)
  const tempBalance     = detectTempBalance(enriched)
  const directionPull   = detectDirectionPull(enriched)
  const tensions        = detectSymbolicTensions(enriched)

  /* MOVIMIENTO A · CLIMA */
  const climateLine = pickSeeded(CLIMATE_LINES[majorWeight], seed)
  const tempLine    = TEMP_LINES[tempBalance] || ''
  const dirLine     = DIRECTION_LINES[directionPull] || ''

  const climate = [climateLine, tempLine, dirLine].filter(Boolean).join(' ')

  /* MOVIMIENTO B · ARCO entre pasado y futuro */
  const past = enriched[4]
  const future = enriched[5]
  let arc = ''
  if (past && future) {
    if (past.energy.direction === 'outward' && future.energy.direction === 'inward') {
      arc = 'Lo que se aleja venía manifestándose afuera; lo que se aproxima pide más recogimiento.'
    } else if (past.energy.direction === 'inward' && future.energy.direction === 'outward') {
      arc = 'Lo que se aleja era íntimo; lo que se aproxima pide aterrizar en algo concreto.'
    } else if (past.energy.temperature === 'tense' && future.energy.temperature === 'warm') {
      arc = 'Lo que queda atrás traía una tensión que el horizonte cercano empieza a dejar respirar.'
    } else if (past.energy.temperature === 'warm' && future.energy.temperature === 'cold') {
      arc = 'Lo que se aleja era cálido; lo que se aproxima trae una claridad más fría — no peor, más lúcida.'
    } else {
      arc = 'El pasado próximo y el futuro próximo dialogan en un mismo registro: la historia está siguiendo su línea.'
    }
  }

  /* MOVIMIENTO C · ECO de tensiones simbólicas + voz de palo */
  const echoLines = []
  if (suitDominance) {
    const sl = SUIT_LINES[suitDominance.suit]
    if (sl) echoLines.push(sl)
  }
  /* Tomar máximo 2 tensiones para no saturar */
  for (const t of tensions.slice(0, 2)) {
    const tl = TENSION_LINES[t.type]
    if (tl) echoLines.push(tl)
  }
  const echo = echoLines.join(' ')

  /* Pregunta de cierre — viene de la posición horizonte si la carta tiene prompt,
     si no, una pregunta abierta. */
  const horizonContent = cards[9]
  const closing = horizonContent?.prompt
    ? horizonContent.prompt
    : '¿Qué pasaría si dejaras que esta lectura sea cierta por un día?'

  return {
    /* Tres movimientos para que la UI pueda mostrarlos como párrafos
       separados con respiración entre ellos */
    climate,
    arc,
    echo,
    closing,

    /* Diagnóstico crudo (debug / UI condicional) */
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
