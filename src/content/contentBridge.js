/* =====================================================================
 * contentBridge.js
 *
 * Adapter unificado entre el deck de App.jsx y los datasets simbólicos.
 *
 * EL PROBLEMA QUE RESUELVE
 *   El deck en App.jsx representa cada carta como:
 *     { nombre, paloKey, arcano, romano, src, derecho, invertido, ... }
 *
 *   Los datasets simbólicos usan formas distintas:
 *     - Mayores  → { name, number, essence, reading, synthesis,
 *                    prompt, extension, positions, ... }
 *     - Menores  → { suit, number, essence, reading, synthesis,
 *                    prompt, themes, manifestations, shadows }
 *
 *   Este bridge devuelve, para CUALQUIER carta del deck, un objeto
 *   con shape consistente que la UI puede consumir sin ramificar
 *   por palo.
 *
 * EXPORTA
 *   spreadPositions             — labels de las 3 posiciones
 *   findContentByCard(card)     — contenido unificado
 *   findPositionByCard(card, k) — texto de una posición concreta
 *   toEngineCard(card)          — input mínimo para el motor relacional
 * ===================================================================*/

import { findSymbolicCard }     from './majorArcanaSymbolic.js'
import { findMinorCard }        from './minorArcanaCards.js'


/* ---------------------------------------------------------------- *
 * Etiquetas de las 3 posiciones (mismas que el sistema anterior).  *
 * ---------------------------------------------------------------- */
export const spreadPositions = {
  whatIs:      'Lo que está',
  whatCrosses: 'Lo que cruza',
  whatOpens:   'Lo que se abre'
}


/* ---------------------------------------------------------------- *
 * Mapeos: paloKey del deck → suit del dataset Menor                *
 * ---------------------------------------------------------------- */
const SUIT_KEY_TO_NAME = {
  copas:   'Copas',
  oros:    'Oros',
  espadas: 'Espadas',
  bastos:  'Bastos'
}

const VALOR_NAMES = new Set([
  'As', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete',
  'Ocho', 'Nueve', 'Diez', 'Sota', 'Caballero', 'Reina', 'Rey'
])

/* Parsea "As de Copas" → { suit: 'Copas', number: 'As' } */
function parseMinorIds(card) {
  if (!card?.nombre) return null
  const m = card.nombre.match(/^(\S+)\s+de\s+(.+)$/)
  if (!m) return null
  const numberLabel = VALOR_NAMES.has(m[1]) ? m[1] : null
  const suit = SUIT_KEY_TO_NAME[card.paloKey] || m[2]
  if (!numberLabel || !suit) return null
  return { suit, number: numberLabel }
}


/* ---------------------------------------------------------------- *
 * Composición de positions para Menores                            *
 *                                                                  *
 * Los Menores no tienen positions explícitas (su schema es corto). *
 * Las derivamos del propio contenido para que la lectura por       *
 * posición no sea genérica:                                        *
 *   whatIs      → essence (lo que se está manifestando)            *
 *   whatCrosses → shadow más relevante (lo que tensiona)           *
 *   whatOpens   → synthesis (lo que la carta deja abierto)         *
 * ---------------------------------------------------------------- */
function buildMinorPositions(minor) {
  const whatIs      = minor.essence
  const shadow      = minor.shadows?.[0]
  const whatCrosses = shadow
    ? `${shadow}${shadow.endsWith('.') ? '' : '.'} Esa tendencia es lo que cruza el momento.`
    : (minor.reading?.split('.').slice(0, 1)[0] + '.') || minor.essence
  const whatOpens   = minor.synthesis || minor.essence
  return { whatIs, whatCrosses, whatOpens }
}


/* ---------------------------------------------------------------- *
 * Composición de extension para Menores                            *
 *                                                                  *
 * El schema corto no trae extension. Para que "Profundizar lectura"*
 * tenga algo significativo en Menores, componemos una capa breve   *
 * a partir de manifestations + shadows + synthesis. Mantiene el    *
 * registro contemplativo, sin inflar la carta como si fuera Mayor. *
 * ---------------------------------------------------------------- */
function buildMinorExtension(minor) {
  const parts = []
  if (minor.manifestations?.length) {
    parts.push(`Suele asomar en gestos chicos: ${minor.manifestations.join('; ')}.`)
  }
  if (minor.shadows?.length) {
    const sombras = minor.shadows.map(s => s.replace(/^./, c => c.toLowerCase())).join(' · ')
    parts.push(`Conviene mirarla cuando aparece como ${sombras}.`)
  }
  if (minor.synthesis) parts.push(minor.synthesis)
  return parts.join(' ')
}


/* =================================================================
 * API
 * ===============================================================*/

/**
 * Devuelve el contenido simbólico unificado para una carta del deck.
 * Devuelve null si la carta no tiene contenido escrito todavía.
 */
export function findContentByCard(card) {
  if (!card) return null

  // ---------- Mayor ----------
  if (card.arcano === 'mayor' || card.paloKey === 'arcanos') {
    const sym = findSymbolicCard(card.nombre)
    if (!sym) return null
    return {
      ...sym,
      isMajor: true
      // sym ya trae: name, number, essence, reading, synthesis, prompt,
      // extension, positions, traditionalMeanings, archetypes,
      // emotionalThemes, manifestations, shadows, visualSymbols.
    }
  }

  // ---------- Menor ----------
  const ids = parseMinorIds(card)
  if (!ids) return null
  const minor = findMinorCard(ids)
  if (!minor) return null

  return {
    ...minor,
    isMajor:   false,
    // Adaptaciones para que la UI consuma el mismo shape que un Mayor:
    name:      card.nombre,            // "As de Copas"
    positions: buildMinorPositions(minor),
    extension: buildMinorExtension(minor)
  }
}


/**
 * Devuelve el texto de una posición concreta para una carta del deck.
 * Si la carta no tiene contenido, cae a string vacío.
 */
export function findPositionByCard(card, positionKey) {
  const c = findContentByCard(card)
  return c?.positions?.[positionKey] || c?.reading || ''
}


/**
 * Convierte una carta del deck a la forma mínima que entiende el
 * motor relacional (composeRelationalReading).
 *
 * Mayores → { name }
 * Menores → { suit, number, name }
 */
export function toEngineCard(card) {
  if (!card) return {}
  if (card.arcano === 'mayor' || card.paloKey === 'arcanos') {
    return { name: card.nombre }
  }
  const ids = parseMinorIds(card)
  if (!ids) return { name: card.nombre }
  return { ...ids, name: card.nombre }
}
