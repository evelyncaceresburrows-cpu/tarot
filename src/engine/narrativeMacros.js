/* =====================================================================
 * narrativeMacros.js
 *
 * Detectores macro: leen el conjunto de cartas enriquecidas y nombran
 * PATRONES HUMANOS RECONOCIBLES — no atmósferas, no temperaturas, no
 * "energías". Son comportamientos: contener, evitar, postergar, vigilar,
 * insistir, huir.
 *
 * El objetivo es alimentar al compositor narrativo con una lista de
 * patrones presentes para que pueda construir una TESIS, no una suma
 * de significados.
 *
 * Cada detector devuelve `null` (no presente) o un objeto:
 *   {
 *     key:        identificador del patrón
 *     label:      etiqueta corta para mostrar (ej. "contención emocional")
 *     intensity:  1-3, cuántas señales apoyan el patrón
 *     evidence:   array de claves de cartas que lo justifican
 *   }
 *
 * Las cartas vienen ya enriquecidas (withAttrs) — con .energy, .attrs,
 * .isMajor, .isReversed.
 * ===================================================================*/


/* ---------- Helpers internos ---------- */

function key(card) {
  if (!card) return ''
  if (card.name) return card.name
  if (card.suit && card.number) return `${card.suit}/${card.number}`
  return ''
}

function hasTag(card, tag) {
  return (card?.attrs?.relationalTags || []).includes(tag)
}

function isReversed(card) {
  return !!(card?.reversed || card?.isReversed || hasTag(card, '__invertida__'))
}

function countWhere(cards, predicate) {
  return cards.filter(predicate).length
}


/* ================================================================ *
 *  DETECTORES MACRO
 *
 *   Orden importante: los más específicos van primero. El compositor
 *   usa intensity para priorizar cuáles entran en la tesis y cuáles
 *   se mencionan después.
 * ================================================================ */

/* 1. Tensión mental dominante — la cabeza está cargando el peso. */
function macroMentalOverload(cards) {
  const espadas = cards.filter(c => c.suit === 'Espadas')
  const mentalAttr = cards.filter(c => c.attrs?.tensionType === 'mental')
  const sharp = cards.filter(c => ['Espadas/Ocho','Espadas/Nueve','Espadas/Diez'].includes(key(c)))

  let intensity = 0
  if (espadas.length >= 2) intensity++
  if (espadas.length >= 3) intensity++
  if (mentalAttr.length >= 2) intensity++
  if (sharp.length >= 1) intensity++

  if (intensity < 2) return null
  return {
    key: 'tension-mental-dominante',
    label: 'tensión mental dominante',
    intensity: Math.min(intensity, 3),
    evidence: [...espadas, ...mentalAttr].map(key).filter((v,i,a) => a.indexOf(v) === i)
  }
}

/* 2. Contención emocional — hay afecto que se está guardando. */
function macroEmotionalContainment(cards) {
  const repressed = cards.filter(c => c.attrs?.shadowMode === 'represión')
  const copas = cards.filter(c => c.suit === 'Copas')
  const guarda = cards.filter(c =>
    hasTag(c, 'guarda-secreto') ||
    hasTag(c, 'contiene-intensidad') ||
    hasTag(c, 'oculta-tensión-pareja') ||
    hasTag(c, 'pide-silencio')
  )

  let intensity = 0
  if (repressed.length >= 1 && copas.length >= 1) intensity++
  if (guarda.length >= 1) intensity++
  if (cards.some(c => c.name === 'La Sacerdotisa')) intensity++

  if (intensity < 2) return null
  return {
    key: 'contencion-emocional',
    label: 'contención emocional',
    intensity: Math.min(intensity, 3),
    evidence: [...repressed, ...guarda].map(key).filter((v,i,a) => a.indexOf(v) === i)
  }
}

/* 3. Dificultad para cerrar — algo terminó y se sigue sosteniendo. */
function macroDifficultyClosing(cards) {
  let intensity = 0
  const evidence = []

  for (const c of cards) {
    const k = key(c)
    // Muerte invertida
    if (c.name === 'La Muerte' && isReversed(c)) { intensity += 2; evidence.push(k) }
    // 10 de Espadas invertida
    if (k === 'Espadas/Diez' && isReversed(c)) { intensity += 2; evidence.push(k) }
    // 8 de Copas invertida (suelta sin cerrar)
    if (k === 'Copas/Ocho' && isReversed(c)) { intensity += 1; evidence.push(k) }
    // tags de aferramiento
    if (hasTag(c, 'aferra-más-fuerte') || hasTag(c, 'evita-cierre') ||
        hasTag(c, 'estira-ciclo')      || hasTag(c, 'aferra-sin-elegir')) {
      intensity += 1; evidence.push(k)
    }
  }

  if (intensity < 2) return null
  return {
    key: 'dificultad-cerrar',
    label: 'dificultad para cerrar',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 4. Exceso de control — la situación se está manejando con muy poca soltura. */
function macroOverControl(cards) {
  const controlCards = cards.filter(c =>
    ['El Emperador','El Carro','El Hierofante'].includes(c.name) ||
    key(c) === 'Oros/Cuatro' ||
    key(c) === 'Bastos/Siete' ||
    hasTag(c, 'pone-estructura') ||
    hasTag(c, 'rigidiza-estructura') ||
    hasTag(c, 'retiene-recurso')
  )
  if (controlCards.length < 2) return null
  return {
    key: 'exceso-control',
    label: 'exceso de control',
    intensity: Math.min(controlCards.length, 3),
    evidence: controlCards.map(key)
  }
}

/* 5. Claridad retenida — hay algo visto que no se está nombrando. */
function macroClarityWithheld(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.name === 'La Sacerdotisa') { intensity++; evidence.push(k) }
    if (k === 'Espadas/Ocho' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (k === 'Espadas/Dos' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (hasTag(c, 'guarda-secreto') || hasTag(c, 'esconde-jugada')) { intensity++; evidence.push(k) }
    // Espadas/As invertida → claridad rechazada
    if (k === 'Espadas/As' && isReversed(c)) { intensity += 2; evidence.push(k) }
  }
  if (intensity < 2) return null
  return {
    key: 'claridad-retenida',
    label: 'claridad retenida',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 6. Evasión activa — alguien se está yendo de algo sin nombrarlo. */
function macroActiveEvasion(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (k === 'Copas/Ocho') { intensity++; evidence.push(k) }
    if (k === 'Espadas/Siete') { intensity++; evidence.push(k) }
    if (c.name === 'El Diablo' && isReversed(c)) { intensity++; evidence.push(k) }
    if (c.attrs?.movementType === 'fuga') { intensity++; evidence.push(k) }
    if (hasTag(c, 'simula-libertad') || hasTag(c, 'huye-presencia') ||
        hasTag(c, 'apura-respuesta')  || hasTag(c, 'rechaza-claridad')) {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'evasion-activa',
    label: 'evasión activa',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 7. Agotamiento sostenido — la situación lleva más tiempo del que conviene. */
function macroSustainedExhaustion(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (['Bastos/Nueve','Bastos/Diez','Espadas/Cuatro','Oros/Cinco','Espadas/Diez'].includes(k)) {
      intensity++; evidence.push(k)
    }
    if (c.name === 'El Colgado') { intensity++; evidence.push(k) }
    if (hasTag(c, 'carga-cuerpo') || hasTag(c, 'intensifica-soledad')) {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'agotamiento-sostenido',
    label: 'agotamiento sostenido',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 8. Deseo bloqueado o desviado — Diablo + Bastos contenidos, Templanza invertida. */
function macroBlockedDesire(cards) {
  let intensity = 0
  const evidence = []
  const hasDiablo = cards.some(c => c.name === 'El Diablo')
  const hasBastosWithControl = cards.some(c =>
    c.suit === 'Bastos' && (c.attrs?.movementType === 'suspensión' || c.attrs?.movementType === 'estancamiento')
  )
  if (hasDiablo && hasBastosWithControl) { intensity += 2 }
  if (cards.some(c => c.name === 'La Templanza' && isReversed(c))) { intensity++ }
  if (cards.some(c => key(c) === 'Bastos/As' && cards.some(o => key(o) === 'Oros/Cuatro'))) { intensity++ }

  if (intensity < 2) return null
  return {
    key: 'deseo-bloqueado',
    label: 'deseo bloqueado',
    intensity: Math.min(intensity, 3),
    evidence: cards
      .filter(c => c.name === 'El Diablo' || c.suit === 'Bastos' || (c.name === 'La Templanza' && isReversed(c)))
      .map(key)
  }
}

/* 9. Patrón que vuelve — algo se está repitiendo. */
function macroRepetition(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.name === 'La Rueda de la Fortuna') { intensity++; evidence.push(k) }
    if (k === 'Copas/Seis') { intensity++; evidence.push(k) }
    if (hasTag(c, 'repite-gesto') || hasTag(c, 'marca-ciclo') ||
        c.attrs?.movementType === 'repetición') {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'patron-vuelve',
    label: 'patrón que vuelve',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 10. Resistencia al cierre — lo que tenía que terminar se sostiene con esfuerzo. */
function macroResistanceToClose(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.attrs?.movementType === 'resistencia') { intensity++; evidence.push(k) }
    if (c.name === 'La Torre' && isReversed(c)) { intensity += 2; evidence.push(k) }
    if (hasTag(c, 'sostiene-ruina') || hasTag(c, 'maquilla-mentira')) {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'resistencia-cierre',
    label: 'resistencia al cierre',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 11. Proyección hacia afuera — la sombra se ve en los demás, no en una. */
function macroProjection(cards) {
  const projected = cards.filter(c => c.attrs?.shadowMode === 'proyección')
  if (projected.length < 2) return null
  return {
    key: 'proyeccion-afuera',
    label: 'proyección hacia afuera',
    intensity: Math.min(projected.length, 3),
    evidence: projected.map(key)
  }
}

/* 12. Decisión postergada — algo pide elegir y se está dejando flotar. */
function macroDeferredDecision(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (k === 'Espadas/Dos') { intensity += 2; evidence.push(k) }
    if (c.name === 'Los Enamorados') { intensity++; evidence.push(k) }
    if (c.name === 'La Justicia') { intensity++; evidence.push(k) }
    if (c.name === 'El Colgado') { intensity++; evidence.push(k) }
    if (hasTag(c, 'evita-decisión') || hasTag(c, 'pide-decisión')) {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'decision-postergada',
    label: 'decisión postergada',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 13. Ruptura ya en curso — algo está cediendo y el cuerpo lo sabe. */
function macroBreakingInProgress(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.name === 'La Torre' && !isReversed(c)) { intensity += 2; evidence.push(k) }
    if (c.name === 'La Muerte' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (k === 'Espadas/Diez' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (k === 'Espadas/Tres' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (hasTag(c, 'rompe-estructura') || hasTag(c, 'fuerza-cierre')) {
      intensity++; evidence.push(k)
    }
  }
  if (intensity < 2) return null
  return {
    key: 'ruptura-en-curso',
    label: 'ruptura ya en curso',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 14. Reparación en curso — algo se está recomponiendo, despacio. */
function macroRepair(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    if (c.name === 'La Estrella' && !isReversed(c)) { intensity += 2; evidence.push(key(c)) }
    if (c.name === 'La Templanza' && !isReversed(c)) { intensity++; evidence.push(key(c)) }
    if (key(c) === 'Copas/Seis' && !isReversed(c)) { intensity++; evidence.push(key(c)) }
    if (hasTag(c, 'repara-confianza') || hasTag(c, 'armoniza-opuestos')) {
      intensity++; evidence.push(key(c))
    }
  }
  if (intensity < 2) return null
  return {
    key: 'reparacion-en-curso',
    label: 'reparación en curso',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 15. Vínculo en juego — la pregunta es vincular, aunque no se haya dicho. */
function macroBondInPlay(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.name === 'Los Enamorados') { intensity++; evidence.push(k) }
    if (['Copas/Dos','Copas/Tres','Copas/Diez'].includes(k)) { intensity++; evidence.push(k) }
    if (k === 'Espadas/Tres') { intensity++; evidence.push(k) }
  }
  if (intensity < 2) return null
  return {
    key: 'vinculo-en-juego',
    label: 'vínculo en juego',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}

/* 16. Negación de lo evidente — varias invertidas con shadowMode=negación. */
function macroDenial(cards) {
  const denied = cards.filter(c => c.attrs?.shadowMode === 'negación' || hasTag(c, 'oculta-sombra'))
  if (denied.length < 2) return null
  return {
    key: 'negacion-evidente',
    label: 'negación de lo evidente',
    intensity: Math.min(denied.length, 3),
    evidence: denied.map(key)
  }
}

/* 17. Avance ciego — hay impulso sin lectura. */
function macroBlindMomentum(cards) {
  let intensity = 0
  const evidence = []
  for (const c of cards) {
    const k = key(c)
    if (c.name === 'El Loco' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (k === 'Bastos/Caballero' && !isReversed(c)) { intensity++; evidence.push(k) }
    if (c.attrs?.movementType === 'atropello') { intensity++; evidence.push(k) }
  }
  if (intensity < 2) return null
  return {
    key: 'avance-ciego',
    label: 'avance ciego',
    intensity: Math.min(intensity, 3),
    evidence: [...new Set(evidence)]
  }
}


/* ================================================================ *
 *  ORQUESTADOR
 * ================================================================ */

const DETECTORS = [
  macroMentalOverload,
  macroEmotionalContainment,
  macroDifficultyClosing,
  macroOverControl,
  macroClarityWithheld,
  macroActiveEvasion,
  macroSustainedExhaustion,
  macroBlockedDesire,
  macroRepetition,
  macroResistanceToClose,
  macroProjection,
  macroDeferredDecision,
  macroBreakingInProgress,
  macroRepair,
  macroBondInPlay,
  macroDenial,
  macroBlindMomentum
]

/**
 * Corre todos los detectores macro sobre las cartas enriquecidas.
 *
 * @returns Array de patrones presentes, ordenado por intensity desc.
 *          Cada uno: { key, label, intensity, evidence[] }
 */
export function detectMacros(cards) {
  const out = []
  for (const detector of DETECTORS) {
    const result = detector(cards)
    if (result) out.push(result)
  }
  out.sort((a, b) => b.intensity - a.intensity)
  return out
}

/**
 * Estadísticas básicas que el compositor usa para introducir invertidas,
 * presencia de Mayores y dominancia de palo.
 */
export function readingStats(cards) {
  const invertedCount = cards.filter(isReversed).length
  const majorCount    = cards.filter(c => c.isMajor).length
  const suitCounts    = {}
  for (const c of cards) {
    if (c.suit) suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1
  }
  let dominantSuit = null
  for (const [s, n] of Object.entries(suitCounts)) {
    if (n >= 2 && (!dominantSuit || n > dominantSuit.count)) dominantSuit = { suit: s, count: n }
  }
  return { invertedCount, majorCount, suitCounts, dominantSuit, total: cards.length }
}
