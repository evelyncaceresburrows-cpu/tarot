/* =====================================================================
 * composeReading — sintetiza una lectura de 3 cartas (Tirada de tres)
 *
 * Reglas locales, sin IA generativa.
 * Input:  cards = [{ name, positions, inverted, reading? }, ...]
 * Output: { intro, byPosition[3], synthesis, question, crossing, detector }
 *
 * Capa nueva: si el motor relacional encuentra un cruce icónico (Luna+7E,
 * Torre+10E, etc.), esa frase aparece en `crossing` y se antepone a la
 * `synthesis`. Si los detectores agregan algo (sobrecarga mental, energía
 * suspendida, bloqueo, amplificación), aparece en `detector`. El bridge
 * heredado queda como fallback narrativo.
 * ===================================================================*/

import { composeRelationalReading } from './relationalEngine.js'

export function composeReading(cards) {
  if (!Array.isArray(cards) || cards.length < 3) {
    return null
  }
  const [c1, c2, c3] = cards

  const t1 = (c1.positions && c1.positions.whatIs)      || c1.reading || ''
  const t2 = (c2.positions && c2.positions.whatCrosses) || c2.reading || ''
  const t3 = (c3.positions && c3.positions.whatOpens)   || c3.reading || ''

  const tone     = pickTone(cards)
  const bridge   = buildBridge(c1, c2, c3)
  const closing  = buildClosingQuestion(cards)

  // Capa relacional emergente — toma cruces icónicos + detectores nuevos.
  // Si las cartas son Mayores ya tienen .name. Si son Menores ADE las
  // pasa con .name como "Tres de Espadas"; aquí derivamos suit/number
  // a partir del campo .paloKey y .romano si están disponibles, para
  // que el motor pueda matchear los pares.
  const normalized = cards.map(normalizeForEngine)
  let crossingLine = ''
  let detectorLine = ''
  try {
    const rel = composeRelationalReading(normalized)
    crossingLine = rel?.crossing || ''
    detectorLine = rel?.detector || ''
  } catch (_) {
    // Si algo falla en el motor relacional, no rompemos la lectura.
  }

  // La synthesis se construye con: cruce icónico (si hay) + bridge legacy.
  // El cruce manda y aterriza la lectura en lo específico antes del
  // puente atmosférico.
  const synthesis = [crossingLine, bridge].filter(Boolean).join(' ')

  return {
    intro: tone.intro,
    byPosition: [
      { label: 'Lo que está',    text: t1 },
      { label: 'Lo que cruza',   text: t2 },
      { label: 'Lo que se abre', text: t3 }
    ],
    synthesis,
    crossing: crossingLine,
    detector: detectorLine,
    question:  closing
  }
}

/* Normaliza una carta del deck de App.jsx al formato que entiende el
   motor relacional (suit + number para Menores; name para Mayores). */
function normalizeForEngine(card) {
  if (!card) return card
  // Mayor: ya viene con .name correcto.
  if (card.arcano === 'mayor' || card.paloKey === 'arcanos') {
    return { name: card.nombre || card.name }
  }
  // Menor: derivamos suit + number a partir de paloKey y romano.
  const suitMap = {
    copas: 'Copas', espadas: 'Espadas', bastos: 'Bastos', oros: 'Oros'
  }
  const numberMap = {
    '1': 'As', 'I': 'As', 'A': 'As',
    '2': 'Dos', 'II': 'Dos',
    '3': 'Tres', 'III': 'Tres',
    '4': 'Cuatro', 'IV': 'Cuatro',
    '5': 'Cinco', 'V': 'Cinco',
    '6': 'Seis', 'VI': 'Seis',
    '7': 'Siete', 'VII': 'Siete',
    '8': 'Ocho', 'VIII': 'Ocho',
    '9': 'Nueve', 'IX': 'Nueve',
    '10': 'Diez', 'X': 'Diez',
    'S': 'Sota', 'P': 'Sota',
    'C': 'Caballero', 'K': 'Caballero',
    'Q': 'Reina', 'R': 'Reina',
    'Re': 'Rey', 'KING': 'Rey'
  }
  const suit = suitMap[card.paloKey] || card.suit
  const number = numberMap[card.romano] || card.number
  if (suit && number) return { suit, number }
  // último recurso: usar nombre (sirve para name-based matching de Mayores)
  return { name: card.nombre || card.name }
}

/* =====================================================================
 * Tono general — depende de qué arcanos asoman
 * ===================================================================*/

function pickTone(cards) {
  const names = cards.map(c => c.name)
  const has = n => names.includes(n)

  if (has('La Torre') || has('La Muerte')) {
    return {
      intro: 'Puede que algo se esté moviendo más rápido de lo que esperabas. No es castigo; es ajuste.'
    }
  }

  if (has('El Sol') || has('La Estrella')) {
    return {
      intro: 'Hay una claridad que empieza a asomarse. No hace ruido, pero se nota.'
    }
  }

  if (has('El Diablo') || has('El Colgado')) {
    return {
      intro: 'Algo se sostiene en pausa. Lo incómodo está pidiendo ser nombrado, no resuelto a la fuerza.'
    }
  }

  if (has('La Sacerdotisa') || has('La Luna') || has('El Ermitaño')) {
    return {
      intro: 'Hay un saber que aún no termina de mostrarse. Conviene escuchar antes de decidir.'
    }
  }

  if (has('El Loco') || has('El Mago')) {
    return {
      intro: 'Algo quiere comenzar. No con certeza absoluta, sino con la intención de mirar lo que llega.'
    }
  }

  return {
    intro: 'Lo que aparece aquí no es una respuesta cerrada. Es una forma de mirar lo que ya está en movimiento.'
  }
}

/* =====================================================================
 * Puente narrativo — síntesis a partir de combinaciones de arquetipos
 * ===================================================================*/

function buildBridge(c1, c2, c3) {
  const a = c1.name
  const b = c2.name
  const c = c3.name

  /* Combinaciones específicas */

  if (a === 'El Loco' && b === 'La Torre') {
    return 'El impulso de avanzar se cruza con una estructura que ya no sostiene. Lo que parece quiebre puede ser dirección.'
  }
  if (b === 'El Diablo') {
    return 'Hay algo en el centro que tiende a repetirse. No se resuelve empujando, sino viendo con más honestidad.'
  }
  if (b === 'La Torre') {
    return 'En el medio aparece un quiebre. Atravesarlo sin resistirlo abre el espacio que viene después.'
  }
  if (b === 'La Muerte') {
    return 'Algo está cerrándose en el cruce. Reconocerlo, aunque cueste, es lo que permite que lo siguiente respire.'
  }
  if (c === 'El Sol' || c === 'La Estrella') {
    return 'Lo que se abre trae una claridad más serena. No es premio: es alivio después de moverte con honestidad.'
  }
  if (c === 'El Mundo') {
    return 'Lo que se abre tiene aire de cierre. Algo se integra, aunque todavía estés caminando hacia ahí.'
  }
  if (a === 'La Muerte' || a === 'La Torre') {
    return 'Partes desde un terreno que ya cambió. Lo que sigue se ordena con más calma si reconoces ese suelo nuevo.'
  }
  if (a === 'El Ermitaño' || b === 'El Ermitaño' || c === 'El Ermitaño') {
    return 'En algún punto del recorrido, el silencio es lo que ordena. Mirar adentro acomoda lo que afuera parece urgente.'
  }
  if (a === 'La Justicia' || b === 'La Justicia' || c === 'La Justicia') {
    return 'Hay una decisión presente, aunque no se nombre todavía. Lo que elijas tendrá peso porque nace de mayor conciencia.'
  }

  /* Fallback general */
  return 'Las tres cartas no dicen lo mismo, pero apuntan a un mismo eje: moverte con más conciencia dentro de lo que ya está ocurriendo.'
}

/* =====================================================================
 * Pregunta final — varía según haya cartas invertidas
 * ===================================================================*/

function buildClosingQuestion(cards) {
  const invertedCount = cards.filter(c => c.inverted).length

  if (invertedCount >= 2) {
    return '¿Qué se ordena distinto cuando dejas de pelearte con lo que estás sintiendo?'
  }
  if (invertedCount === 1) {
    return '¿Qué se ordena distinto cuando miras esto sin apuro?'
  }
  return '¿Qué de todo esto te hizo más sentido, aunque no lo entiendas del todo?'
}
