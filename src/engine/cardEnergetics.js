/* =====================================================================
 * cardEnergetics.js
 *
 * Añade 4 atributos relacionales a cualquier carta del mazo:
 *   - energyType:  emotional | mental | transformative | active | grounded
 *   - temperature: warm | cold | neutral | tense
 *   - direction:   inward | outward | suspended
 *   - rhythm:      slow | fast | fragmented | stable
 *
 * Derivación determinística (misma carta = misma energética siempre).
 * Tres capas, en orden de prioridad creciente:
 *   1) base por palo (Minor)
 *   2) modificador por número (Minor)
 *   3) override puntual (Minor o Major)
 *
 * Los Mayores se mapean uno a uno: cada arcano tiene firma única.
 *
 * Importante: este archivo NO toca el contenido emocional de las cartas
 * (essence, reading, etc.). Solo expone una "huella energética" que el
 * motor relacional puede leer para componer lecturas atmosféricas.
 * ===================================================================*/


/* ---------------------------------------------------------------- *
 * MENORES · base por palo                                          *
 * ---------------------------------------------------------------- */
const SUIT_ENERGY = {
  Copas:   { energyType: 'emotional',  temperature: 'warm',    direction: 'inward',  rhythm: 'slow' },
  Espadas: { energyType: 'mental',     temperature: 'cold',    direction: 'outward', rhythm: 'fast' },
  Bastos:  { energyType: 'active',     temperature: 'warm',    direction: 'outward', rhythm: 'fast' },
  Oros:    { energyType: 'grounded',   temperature: 'neutral', direction: 'inward',  rhythm: 'slow' }
}


/* ---------------------------------------------------------------- *
 * MENORES · modificador por número                                 *
 *                                                                  *
 *   Sigue la narrativa numérica: As semilla, 5 crisis, 7 reflexión, *
 *   10 cierre, etc. Los modifs sólo sobreescriben campos puntuales. *
 * ---------------------------------------------------------------- */
const NUMBER_MOD = {
  As:        { direction: 'outward',   rhythm: 'fast' },
  Dos:       { direction: 'suspended', rhythm: 'stable' },
  Tres:      { direction: 'outward',   rhythm: 'fast' },
  Cuatro:    {                          rhythm: 'stable' },
  Cinco:     { temperature: 'tense',    rhythm: 'fragmented' },
  Seis:      { temperature: 'warm',     rhythm: 'stable' },
  Siete:     { direction: 'inward',     rhythm: 'slow' },
  Ocho:      {                          rhythm: 'stable' },
  Nueve:     { direction: 'inward',     rhythm: 'slow' },
  Diez:      {                          rhythm: 'stable' },
  Sota:      { direction: 'outward' },
  Caballero: { direction: 'outward',    rhythm: 'fast' },
  Reina:     { direction: 'inward',     rhythm: 'stable' },
  Rey:       {                          rhythm: 'stable' }
}


/* ---------------------------------------------------------------- *
 * MENORES · overrides puntuales                                     *
 *                                                                  *
 *   Cuando la mezcla palo+número no captura el matiz emocional     *
 *   real de la carta, se ajusta aquí. Clave: "Suit/Number".         *
 * ---------------------------------------------------------------- */
const MINOR_OVERRIDES = {
  // Copas
  'Copas/Cinco':    { temperature: 'cold',    rhythm: 'fragmented' }, // pérdida
  'Copas/Ocho':     { direction: 'outward' },                          // partir
  // Espadas
  'Espadas/Tres':   { temperature: 'tense' },                          // herida
  'Espadas/Cuatro': { temperature: 'cold',    rhythm: 'stable' },      // tregua
  'Espadas/Seis':   { direction: 'outward',   rhythm: 'slow' },        // travesía
  'Espadas/Nueve':  { temperature: 'cold',    rhythm: 'fragmented' },  // ansiedad nocturna
  'Espadas/Diez':   { rhythm: 'stable' },                              // punto final
  // Bastos
  'Bastos/Tres':    { rhythm: 'stable' },                              // espera activa
  'Bastos/Cuatro':  { rhythm: 'stable' },                              // hito celebrado
  'Bastos/Nueve':   { temperature: 'tense' },                          // última guardia
  'Bastos/Diez':    { temperature: 'tense',   rhythm: 'fragmented' },  // sobrecarga
  // Oros
  'Oros/Cinco':     { temperature: 'cold',    direction: 'outward' },  // exclusión, frío
  'Oros/Cuatro':    { rhythm: 'stable' },                              // apego rígido
  'Oros/Diez':      { rhythm: 'stable' }                               // legado
}


/* ---------------------------------------------------------------- *
 * MAYORES · firma única por carta                                   *
 *                                                                  *
 *   Cada Arcano Mayor tiene un perfil propio: no se deriva.         *
 * ---------------------------------------------------------------- */
const MAJOR_ENERGY = {
  'El Loco':                { energyType: 'active',         temperature: 'warm',    direction: 'outward',   rhythm: 'fast' },
  'El Mago':                { energyType: 'active',         temperature: 'warm',    direction: 'outward',   rhythm: 'fast' },
  'La Sacerdotisa':         { energyType: 'mental',         temperature: 'cold',    direction: 'inward',    rhythm: 'slow' },
  'La Emperatriz':          { energyType: 'emotional',      temperature: 'warm',    direction: 'inward',    rhythm: 'slow' },
  'El Emperador':           { energyType: 'grounded',       temperature: 'neutral', direction: 'outward',   rhythm: 'stable' },
  'El Hierofante':          { energyType: 'mental',         temperature: 'neutral', direction: 'inward',    rhythm: 'stable' },
  'Los Enamorados':         { energyType: 'emotional',      temperature: 'warm',    direction: 'suspended', rhythm: 'stable' },
  'El Carro':               { energyType: 'active',         temperature: 'warm',    direction: 'outward',   rhythm: 'fast' },
  'La Fuerza':              { energyType: 'emotional',      temperature: 'warm',    direction: 'inward',    rhythm: 'stable' },
  'El Ermitaño':            { energyType: 'mental',         temperature: 'cold',    direction: 'inward',    rhythm: 'slow' },
  'La Rueda de la Fortuna': { energyType: 'transformative', temperature: 'neutral', direction: 'suspended', rhythm: 'fragmented' },
  'La Justicia':            { energyType: 'mental',         temperature: 'cold',    direction: 'suspended', rhythm: 'stable' },
  'El Colgado':             { energyType: 'transformative', temperature: 'cold',    direction: 'suspended', rhythm: 'slow' },
  'La Muerte':              { energyType: 'transformative', temperature: 'cold',    direction: 'inward',    rhythm: 'slow' },
  'La Templanza':           { energyType: 'emotional',      temperature: 'warm',    direction: 'inward',    rhythm: 'slow' },
  'El Diablo':              { energyType: 'transformative', temperature: 'warm',    direction: 'inward',    rhythm: 'fragmented' },
  'La Torre':               { energyType: 'transformative', temperature: 'tense',   direction: 'outward',   rhythm: 'fragmented' },
  'La Estrella':            { energyType: 'emotional',      temperature: 'warm',    direction: 'inward',    rhythm: 'slow' },
  'La Luna':                { energyType: 'emotional',      temperature: 'cold',    direction: 'inward',    rhythm: 'fragmented' },
  'El Sol':                 { energyType: 'active',         temperature: 'warm',    direction: 'outward',   rhythm: 'fast' },
  'El Juicio':              { energyType: 'transformative', temperature: 'warm',    direction: 'outward',   rhythm: 'fast' },
  'El Mundo':               { energyType: 'grounded',       temperature: 'warm',    direction: 'outward',   rhythm: 'stable' }
}

const MAJOR_NAMES = new Set(Object.keys(MAJOR_ENERGY))


/* ---------------------------------------------------------------- *
 * API                                                               *
 * ---------------------------------------------------------------- */

/* Determina si una carta es Arcano Mayor por nombre. */
export function isMajor(card) {
  return !!card && MAJOR_NAMES.has(card.name)
}

/* Devuelve la huella energética de cualquier carta. */
export function getCardEnergetics(card) {
  if (!card) return fallback()

  // Mayor: lookup directo
  if (card.name && MAJOR_ENERGY[card.name]) {
    return { ...MAJOR_ENERGY[card.name] }
  }

  // Menor: base + número + override
  if (card.suit && card.number) {
    const base       = SUIT_ENERGY[card.suit]                   || {}
    const numberMod  = NUMBER_MOD[card.number]                  || {}
    const override   = MINOR_OVERRIDES[`${card.suit}/${card.number}`] || {}
    return { ...base, ...numberMod, ...override }
  }

  return fallback()
}

/* Versión enriquecida de la carta: la original + huella + flag isMajor. */
export function enrichCard(card) {
  return {
    ...card,
    energy:  getCardEnergetics(card),
    isMajor: isMajor(card)
  }
}

/* Para enriquecer mazos enteros si hace falta. */
export function enrichDeck(cards) {
  return (cards || []).map(enrichCard)
}

function fallback() {
  return { energyType: 'neutral', temperature: 'neutral', direction: 'suspended', rhythm: 'stable' }
}


/* ---------------------------------------------------------------- *
 * Diccionarios exportados (útiles para depuración o UI)             *
 * ---------------------------------------------------------------- */
export const ENERGY_VALUES = {
  energyType:  ['emotional', 'mental', 'transformative', 'active', 'grounded'],
  temperature: ['warm', 'cold', 'neutral', 'tense'],
  direction:   ['inward', 'outward', 'suspended'],
  rhythm:      ['slow', 'fast', 'fragmented', 'stable']
}
