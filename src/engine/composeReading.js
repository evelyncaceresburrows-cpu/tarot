/* =====================================================================
 * composeReading — sintetiza una lectura de 3 cartas (Tirada de tres)
 *
 * Reglas locales, sin IA generativa.
 * Input:  cards = [{ name, positions, inverted, reading? }, ...]
 * Output: { intro, byPosition[3], synthesis, question }
 * ===================================================================*/

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

  return {
    intro: tone.intro,
    byPosition: [
      { label: 'Lo que está',    text: t1 },
      { label: 'Lo que cruza',   text: t2 },
      { label: 'Lo que se abre', text: t3 }
    ],
    synthesis: bridge,
    question:  closing
  }
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
    return 'Partís desde un terreno que ya cambió. Lo que sigue se ordena con más calma si reconocés ese suelo nuevo.'
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
    return '¿Qué se ordena distinto cuando dejás de pelearte con lo que estás sintiendo?'
  }
  if (invertedCount === 1) {
    return '¿Qué se ordena distinto cuando miras esto sin apuro?'
  }
  return '¿Qué de todo esto te hizo más sentido, aunque no lo entiendas del todo?'
}
