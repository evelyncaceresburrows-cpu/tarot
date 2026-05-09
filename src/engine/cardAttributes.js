/* =====================================================================
 * cardAttributes.js
 *
 * Atributos relacionales por carta. NO se escriben las 78 entradas a
 * mano: se derivan de la firma energética (cardEnergetics.js) y de
 * tablas pequeñas para Mayores y para los pocos casos donde la
 * derivación por palo+número no captura el matiz.
 *
 * Atributos expuestos por getCardAttrs(card):
 *
 *   emotionalAxis    eje emocional dominante. Hasta 2 valores.
 *                    [conexión-aislamiento, expansión-repliegue,
 *                     deseo-contención, claridad-niebla, ego-otro,
 *                     control-entrega, presencia-evasión]
 *
 *   tensionType      tipo de tensión que arrastra esa carta.
 *                    [mental | emocional | somática | simbólica | ninguna]
 *
 *   movementType     más rico que direction:
 *                    [avance | retroceso | circulación | suspensión | colapso]
 *
 *   rhythm           ya provisto por cardEnergetics — se respeta.
 *
 *   visibility       qué tan visible es lo que la carta nombra:
 *                    [clara | borrosa | oculta | expuesta | parcial]
 *
 *   shadowMode       cómo arroja sombra esta carta:
 *                    [proyección | represión | exhibición | sublimación |
 *                     negación | desplazamiento | ninguna]
 *
 *   relationalTags   etiquetas que otros motores leen para cruzar:
 *                    ej. ['amplifica-emoción', 'pide-claridad',
 *                          'bloquea-acción', 'sostiene-pausa']
 *
 * Reglas:
 *   1) Mayores → tabla chica (22 entradas).
 *   2) Menores → derivación por palo + número.
 *   3) Override puntual cuando hace falta (raros).
 *
 * Sin LLM. Determinístico. Mismas cartas → mismo perfil siempre.
 * ===================================================================*/

import { getCardEnergetics, isMajor } from './cardEnergetics.js'


/* ---------------------------------------------------------------- *
 * MAYORES — perfil único por carta                                  *
 * ---------------------------------------------------------------- */
const MAJOR_ATTRS = {
  'El Loco': {
    emotionalAxis: ['expansión-repliegue', 'presencia-evasión'],
    tensionType:   'simbólica',
    movementType:  'avance',
    visibility:    'expuesta',
    shadowMode:    'desplazamiento',
    relationalTags: ['enciende-impulso', 'pide-confianza', 'abre-umbral']
  },
  'El Mago': {
    emotionalAxis: ['ego-otro', 'control-entrega'],
    tensionType:   'mental',
    movementType:  'avance',
    visibility:    'clara',
    shadowMode:    'exhibición',
    relationalTags: ['concreta-intención', 'pide-gesto', 'amplifica-acción']
  },
  'La Sacerdotisa': {
    emotionalAxis: ['claridad-niebla', 'presencia-evasión'],
    tensionType:   'mental',
    movementType:  'suspensión',
    visibility:    'oculta',
    shadowMode:    'represión',
    relationalTags: ['guarda-secreto', 'pide-silencio', 'amplifica-niebla']
  },
  'La Emperatriz': {
    emotionalAxis: ['conexión-aislamiento', 'deseo-contención'],
    tensionType:   'emocional',
    movementType:  'circulación',
    visibility:    'expuesta',
    shadowMode:    'sublimación',
    relationalTags: ['amplifica-emoción', 'sostiene-cuidado', 'abre-cuerpo']
  },
  'El Emperador': {
    emotionalAxis: ['control-entrega', 'ego-otro'],
    tensionType:   'somática',
    movementType:  'circulación',
    visibility:    'clara',
    shadowMode:    'represión',
    relationalTags: ['pone-estructura', 'bloquea-flujo-emocional', 'sostiene-marco']
  },
  'El Hierofante': {
    emotionalAxis: ['ego-otro', 'control-entrega'],
    tensionType:   'simbólica',
    movementType:  'circulación',
    visibility:    'parcial',
    shadowMode:    'sublimación',
    relationalTags: ['transmite-tradición', 'pide-discernimiento', 'invoca-mandato']
  },
  'Los Enamorados': {
    emotionalAxis: ['ego-otro', 'deseo-contención'],
    tensionType:   'emocional',
    movementType:  'suspensión',
    visibility:    'expuesta',
    shadowMode:    'ninguna',
    relationalTags: ['pide-decisión', 'abre-vínculo', 'expone-coherencia']
  },
  'El Carro': {
    emotionalAxis: ['control-entrega', 'expansión-repliegue'],
    tensionType:   'somática',
    movementType:  'avance',
    visibility:    'clara',
    shadowMode:    'exhibición',
    relationalTags: ['empuja-foco', 'amplifica-acción', 'tensiona-rumbo']
  },
  'La Fuerza': {
    emotionalAxis: ['control-entrega', 'deseo-contención'],
    tensionType:   'somática',
    movementType:  'circulación',
    visibility:    'parcial',
    shadowMode:    'sublimación',
    relationalTags: ['contiene-intensidad', 'sostiene-cuidado', 'amplifica-paciencia']
  },
  'El Ermitaño': {
    emotionalAxis: ['conexión-aislamiento', 'claridad-niebla'],
    tensionType:   'mental',
    movementType:  'retroceso',
    visibility:    'oculta',
    shadowMode:    'represión',
    relationalTags: ['pide-silencio', 'enciende-lucidez', 'aísla-presencia']
  },
  'La Rueda de la Fortuna': {
    emotionalAxis: ['control-entrega', 'expansión-repliegue'],
    tensionType:   'simbólica',
    movementType:  'circulación',
    visibility:    'parcial',
    shadowMode:    'desplazamiento',
    relationalTags: ['marca-ciclo', 'pide-lectura-larga', 'desordena-control']
  },
  'La Justicia': {
    emotionalAxis: ['ego-otro', 'control-entrega'],
    tensionType:   'mental',
    movementType:  'suspensión',
    visibility:    'clara',
    shadowMode:    'ninguna',
    relationalTags: ['pide-coherencia', 'expone-verdad', 'corta-evasión']
  },
  'El Colgado': {
    emotionalAxis: ['control-entrega', 'presencia-evasión'],
    tensionType:   'simbólica',
    movementType:  'suspensión',
    visibility:    'parcial',
    shadowMode:    'sublimación',
    relationalTags: ['frena-acción', 'cambia-perspectiva', 'sostiene-pausa']
  },
  'La Muerte': {
    emotionalAxis: ['expansión-repliegue', 'presencia-evasión'],
    tensionType:   'simbólica',
    movementType:  'colapso',
    visibility:    'clara',
    shadowMode:    'desplazamiento',
    relationalTags: ['fuerza-cierre', 'rompe-aferramiento', 'pide-aceptación']
  },
  'La Templanza': {
    emotionalAxis: ['conexión-aislamiento', 'control-entrega'],
    tensionType:   'emocional',
    movementType:  'circulación',
    visibility:    'parcial',
    shadowMode:    'sublimación',
    relationalTags: ['armoniza-opuestos', 'sostiene-pausa', 'integra-ritmo']
  },
  'El Diablo': {
    emotionalAxis: ['deseo-contención', 'claridad-niebla'],
    tensionType:   'simbólica',
    movementType:  'suspensión',
    visibility:    'oculta',
    shadowMode:    'proyección',
    relationalTags: ['intensifica-deseo', 'amplifica-sombra', 'bloquea-libertad']
  },
  'La Torre': {
    emotionalAxis: ['control-entrega', 'expansión-repliegue'],
    tensionType:   'simbólica',
    movementType:  'colapso',
    visibility:    'expuesta',
    shadowMode:    'exhibición',
    relationalTags: ['rompe-estructura', 'fuerza-verdad', 'desnuda-mentira']
  },
  'La Estrella': {
    emotionalAxis: ['conexión-aislamiento', 'claridad-niebla'],
    tensionType:   'emocional',
    movementType:  'circulación',
    visibility:    'expuesta',
    shadowMode:    'ninguna',
    relationalTags: ['repara-confianza', 'amplifica-esperanza', 'sostiene-cuidado']
  },
  'La Luna': {
    emotionalAxis: ['claridad-niebla', 'presencia-evasión'],
    tensionType:   'emocional',
    movementType:  'suspensión',
    visibility:    'borrosa',
    shadowMode:    'proyección',
    relationalTags: ['amplifica-niebla', 'distorsiona-percepción', 'pide-paciencia']
  },
  'El Sol': {
    emotionalAxis: ['expansión-repliegue', 'claridad-niebla'],
    tensionType:   'ninguna',
    movementType:  'circulación',
    visibility:    'clara',
    shadowMode:    'ninguna',
    relationalTags: ['simplifica-escena', 'amplifica-claridad', 'descarta-niebla']
  },
  'El Juicio': {
    emotionalAxis: ['ego-otro', 'expansión-repliegue'],
    tensionType:   'simbólica',
    movementType:  'avance',
    visibility:    'expuesta',
    shadowMode:    'ninguna',
    relationalTags: ['llama-decisión', 'fuerza-reconocimiento', 'cierra-evasión']
  },
  'El Mundo': {
    emotionalAxis: ['expansión-repliegue', 'presencia-evasión'],
    tensionType:   'ninguna',
    movementType:  'circulación',
    visibility:    'clara',
    shadowMode:    'ninguna',
    relationalTags: ['cierra-ciclo', 'integra-recorrido', 'abre-siguiente']
  }
}


/* ---------------------------------------------------------------- *
 * MENORES — derivación por palo                                    *
 * ---------------------------------------------------------------- */
const SUIT_AXIS = {
  Copas:   ['conexión-aislamiento', 'deseo-contención'],
  Espadas: ['claridad-niebla', 'ego-otro'],
  Bastos:  ['expansión-repliegue', 'deseo-contención'],
  Oros:    ['control-entrega', 'presencia-evasión']
}

const SUIT_TENSION = {
  Copas:   'emocional',
  Espadas: 'mental',
  Bastos:  'somática',
  Oros:    'somática'
}

const SUIT_VISIBILITY = {
  Copas:   'parcial',
  Espadas: 'clara',
  Bastos:  'expuesta',
  Oros:    'parcial'
}

const SUIT_SHADOW = {
  Copas:   'sublimación',
  Espadas: 'represión',
  Bastos:  'exhibición',
  Oros:    'represión'
}


/* Por número: cómo se modula el comportamiento dentro del palo. */
const NUMBER_PROFILE = {
  As:        { movement: 'avance',       tags: ['enciende-impulso'] },
  Dos:       { movement: 'suspensión',   tags: ['expone-tensión-pareja'] },
  Tres:      { movement: 'avance',       tags: ['amplifica-emoción'] },
  Cuatro:    { movement: 'suspensión',   tags: ['sostiene-pausa'] },
  Cinco:     { movement: 'colapso',      tags: ['fragmenta-rumbo'] },
  Seis:      { movement: 'circulación',  tags: ['equilibra-ritmo'] },
  Siete:     { movement: 'retroceso',    tags: ['esconde-jugada'] },
  Ocho:      { movement: 'circulación',  tags: ['repite-gesto'] },
  Nueve:     { movement: 'retroceso',    tags: ['intensifica-soledad'] },
  Diez:      { movement: 'colapso',      tags: ['cierra-ciclo'] },
  Sota:      { movement: 'avance',       tags: ['curiosea-territorio'] },
  Caballero: { movement: 'avance',       tags: ['acelera-acción'] },
  Reina:     { movement: 'circulación',  tags: ['sostiene-presencia'] },
  Rey:       { movement: 'circulación',  tags: ['firma-criterio'] }
}


/* ---------------------------------------------------------------- *
 * Overrides puntuales para cuando la fórmula no alcanza             *
 *                                                                   *
 *   Solo se ajustan los campos que no calzan; el resto se hereda.   *
 * ---------------------------------------------------------------- */
const MINOR_OVERRIDES = {
  // Espadas — la carta de la "desconfianza difícil de explicar" cuando
  // se cruza con La Luna depende de que su shadowMode sea 'proyección'.
  'Espadas/Siete': { shadowMode: 'desplazamiento', visibility: 'oculta',
                     tags: ['esconde-jugada', 'amplifica-sospecha'] },
  'Espadas/Tres':  { tensionType: 'emocional',
                     tags: ['nombra-herida', 'expone-corte'] },
  'Espadas/Nueve': { shadowMode: 'proyección', visibility: 'oculta',
                     tags: ['amplifica-ansiedad', 'distorsiona-percepción'] },
  'Espadas/Ocho':  { movement: 'suspensión', shadowMode: 'represión',
                     tags: ['encierra-narrativa', 'bloquea-acción'] },
  'Espadas/Diez':  { movement: 'colapso',
                     tags: ['cierra-relato', 'pide-amanecer'] },

  'Copas/Cinco':   { shadowMode: 'desplazamiento',
                     tags: ['fija-pérdida', 'esconde-lo-que-queda'] },
  'Copas/Siete':   { visibility: 'borrosa', shadowMode: 'desplazamiento',
                     tags: ['amplifica-niebla', 'paraliza-elección'] },
  'Copas/Ocho':    { movement: 'retroceso',
                     tags: ['suelta-sin-cerrar'] },

  'Bastos/Cinco':  { tensionType: 'mental',
                     tags: ['enciende-fricción', 'gasta-energía'] },
  'Bastos/Diez':   { tensionType: 'somática',
                     tags: ['carga-cuerpo', 'pide-soltar'] },
  'Bastos/Siete':  { movement: 'suspensión',
                     tags: ['defiende-posición', 'rigidiza-trinchera'] },

  'Oros/Cuatro':   { shadowMode: 'represión',
                     tags: ['retiene-recurso', 'cierra-circulación'] },
  'Oros/Cinco':    { tensionType: 'emocional', visibility: 'expuesta',
                     tags: ['expone-carencia', 'rechaza-ayuda'] }
}


/* ---------------------------------------------------------------- *
 * API                                                                *
 * ---------------------------------------------------------------- */

/**
 * Devuelve el perfil relacional completo de una carta.
 * Carta puede ser Mayor (con .name), Menor (suit + number) o ya
 * enriquecida.
 */
export function getCardAttrs(card) {
  if (!card) return fallback()

  // Mayor — lookup directo
  if (card.name && MAJOR_ATTRS[card.name]) {
    const m = MAJOR_ATTRS[card.name]
    const e = getCardEnergetics(card)
    return {
      emotionalAxis: m.emotionalAxis,
      tensionType:   m.tensionType,
      movementType:  m.movementType,
      rhythm:        e.rhythm,
      visibility:    m.visibility,
      shadowMode:    m.shadowMode,
      relationalTags: [...m.relationalTags]
    }
  }

  // Menor — derivación por palo + número + override
  if (card.suit && card.number) {
    const e   = getCardEnergetics(card)
    const np  = NUMBER_PROFILE[card.number] || { movement: 'circulación', tags: [] }
    const ov  = MINOR_OVERRIDES[`${card.suit}/${card.number}`] || {}

    const tags = [...(np.tags || []), ...(ov.tags || [])]

    return {
      emotionalAxis: ov.axis || SUIT_AXIS[card.suit] || ['conexión-aislamiento'],
      tensionType:   ov.tensionType || SUIT_TENSION[card.suit] || 'ninguna',
      movementType:  ov.movement || np.movement,
      rhythm:        e.rhythm,
      visibility:    ov.visibility || SUIT_VISIBILITY[card.suit] || 'parcial',
      shadowMode:    ov.shadowMode || SUIT_SHADOW[card.suit] || 'ninguna',
      relationalTags: tags
    }
  }

  return fallback()
}

/** Versión enriquecida de la carta: la original + energetics + attrs. */
export function withAttrs(card) {
  return {
    ...card,
    isMajor: isMajor(card),
    energy:  getCardEnergetics(card),
    attrs:   getCardAttrs(card)
  }
}

/** Lo mismo para mazos enteros. */
export function attachAttrs(cards) {
  return (cards || []).map(withAttrs)
}

function fallback() {
  return {
    emotionalAxis: ['presencia-evasión'],
    tensionType:   'ninguna',
    movementType:  'suspensión',
    rhythm:        'stable',
    visibility:    'parcial',
    shadowMode:    'ninguna',
    relationalTags: []
  }
}


/* ---------------------------------------------------------------- *
 * Diccionarios públicos (debug / UI)                                 *
 * ---------------------------------------------------------------- */
export const ATTR_VALUES = {
  emotionalAxis: [
    'conexión-aislamiento',
    'expansión-repliegue',
    'deseo-contención',
    'claridad-niebla',
    'ego-otro',
    'control-entrega',
    'presencia-evasión'
  ],
  tensionType:  ['mental', 'emocional', 'somática', 'simbólica', 'ninguna'],
  movementType: ['avance', 'retroceso', 'circulación', 'suspensión', 'colapso'],
  visibility:   ['clara', 'borrosa', 'oculta', 'expuesta', 'parcial'],
  shadowMode:   [
    'proyección',
    'represión',
    'exhibición',
    'sublimación',
    'negación',
    'desplazamiento',
    'ninguna'
  ]
}
