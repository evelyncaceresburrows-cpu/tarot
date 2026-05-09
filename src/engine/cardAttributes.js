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
 * INVERSIÓN — transformaciones de atributos cuando una carta cae    *
 * invertida. La inversión NO es lo opuesto del símbolo, es su        *
 * distorsión humana. El movimiento, la sombra y los tags cambian de *
 * comportamiento; lo demás se conserva.                              *
 * ---------------------------------------------------------------- */

/* shadowMode invertido: cómo se desfigura cuando la carta cae al revés.
   - represión   ↔ exhibición       (lo guardado se filtra o estalla)
   - proyección  ↔ negación          (la sombra ya no se ve afuera, se niega adentro)
   - sublimación ↔ desplazamiento    (lo elevado regresa, lo asimilado se descarga mal)
   - exhibición  ↔ represión         (lo expuesto se reprime)
   - desplazamiento → exhibición     (lo desviado se vuelve evidente)
   - negación    → exhibición        (lo negado se nombra a la fuerza)
   - ninguna     → desplazamiento    (cuando lo invertido distorsiona algo limpio)
*/
const SHADOW_INVERT = {
  'represión':     'exhibición',
  'proyección':    'negación',
  'sublimación':   'desplazamiento',
  'exhibición':    'represión',
  'desplazamiento':'exhibición',
  'negación':      'exhibición',
  'ninguna':       'desplazamiento'
}

/* movementType invertido: cómo se rompe el movimiento natural de la carta.
   - avance       → atropello       (avanzar sin escuchar señales)
   - retroceso    → repetición       (volver al mismo lugar sin aprender)
   - circulación  → estancamiento    (la corriente se cierra)
   - suspensión   → fuga             (la pausa se vuelve evasión activa)
   - colapso      → resistencia      (lo que tenía que caer se sostiene con esfuerzo)
*/
const MOVEMENT_INVERT = {
  'avance':       'atropello',
  'retroceso':    'repetición',
  'circulación':  'estancamiento',
  'suspensión':   'fuga',
  'colapso':      'resistencia'
}

/* Tags invertidos: cómo se distorsiona cada relación.
   Solo transformamos los tags conocidos; los desconocidos se descartan. */
const TAG_INVERT = {
  // amplificación → distorsión / negación
  'amplifica-niebla':     'niega-niebla',
  'amplifica-emoción':    'desborda-emoción',
  'amplifica-sombra':     'oculta-sombra',
  'amplifica-acción':     'atropella-acción',
  'amplifica-claridad':   'rechaza-claridad',
  'amplifica-paciencia':  'fuerza-prisa',
  'amplifica-niebla':     'fuerza-claridad-falsa',
  'amplifica-esperanza':  'sostiene-fe-ciega',
  'amplifica-sospecha':   'anula-sospecha',
  'amplifica-ansiedad':   'congela-ansiedad',

  // bloqueo → atropello del bloqueo
  'bloquea-flujo-emocional': 'desborda-flujo-emocional',
  'bloquea-acción':       'fuerza-acción-prematura',
  'bloquea-libertad':     'simula-libertad',
  'bloquea-claridad':     'sustituye-claridad',

  // gestos → su distorsión
  'pide-gesto':           'fuerza-gesto',
  'pide-silencio':        'rechaza-silencio',
  'pide-claridad':        'rechaza-claridad',
  'pide-confianza':       'sospecha-todo',
  'pide-paciencia':       'apura-respuesta',
  'pide-discernimiento':  'rechaza-discernimiento',
  'pide-decisión':        'evita-decisión',
  'pide-coherencia':      'fuerza-incoherencia',
  'pide-aceptación':      'rechaza-aceptación',
  'pide-lectura-larga':   'reduce-a-anécdota',

  // movimientos → su negación
  'enciende-impulso':     'apaga-impulso',
  'concreta-intención':   'diluye-intención',
  'guarda-secreto':       'filtra-secreto',
  'sostiene-cuidado':     'sobrecuida',
  'sostiene-pausa':       'rompe-pausa',
  'sostiene-presencia':   'simula-presencia',
  'sostiene-cuidado':     'invade-con-cuidado',
  'pone-estructura':      'rigidiza-estructura',
  'transmite-tradición':  'impone-tradición',
  'invoca-mandato':       'esquiva-mandato',
  'empuja-foco':          'dispersa-foco',
  'tensiona-rumbo':       'pierde-rumbo',
  'contiene-intensidad':  'reprime-intensidad',
  'enciende-lucidez':     'aísla-lucidez',
  'aísla-presencia':      'huye-presencia',
  'marca-ciclo':          'niega-ciclo',
  'desordena-control':    'aferra-control',
  'expone-verdad':        'tergiversa-verdad',
  'corta-evasión':        'inventa-evasión',
  'frena-acción':         'fuerza-acción',
  'cambia-perspectiva':   'fija-perspectiva',
  'fuerza-cierre':        'evita-cierre',
  'rompe-aferramiento':   'aferra-más-fuerte',
  'armoniza-opuestos':    'desbalancea-opuestos',
  'integra-ritmo':        'fragmenta-ritmo',
  'intensifica-deseo':    'niega-deseo',
  'rompe-estructura':     'sostiene-ruina',
  'fuerza-verdad':        'tapa-verdad',
  'desnuda-mentira':      'maquilla-mentira',
  'repara-confianza':     'sospecha-de-todo',
  'distorsiona-percepción':'fuerza-percepción-falsa',
  'simplifica-escena':    'complica-escena',
  'descarta-niebla':      'romantiza-niebla',
  'llama-decisión':       'silencia-llamado',
  'fuerza-reconocimiento':'rechaza-reconocimiento',
  'cierra-evasión':       'fortalece-evasión',
  'cierra-ciclo':         'estira-ciclo',
  'integra-recorrido':    'descarta-recorrido',
  'abre-siguiente':       'cierra-puerta',
  'expone-tensión-pareja':'oculta-tensión-pareja',
  'fragmenta-rumbo':      'aferra-rumbo-malo',
  'equilibra-ritmo':      'desbalancea-ritmo',
  'esconde-jugada':       'expone-jugada-mal',
  'repite-gesto':         'rompe-gesto',
  'intensifica-soledad':  'huye-de-la-soledad',
  'curiosea-territorio':  'invade-territorio',
  'acelera-acción':       'paraliza-acción',
  'firma-criterio':       'cede-criterio',
  'nombra-herida':        'tapa-herida',
  'expone-corte':         'maquilla-corte',
  'encierra-narrativa':   'invade-narrativa',
  'cierra-relato':        'estira-relato',
  'pide-amanecer':        'rechaza-amanecer',
  'fija-pérdida':         'romantiza-pérdida',
  'esconde-lo-que-queda': 'devalúa-lo-que-queda',
  'paraliza-elección':    'fuerza-elección',
  'suelta-sin-cerrar':    'aferra-sin-elegir',
  'enciende-fricción':    'apaga-fricción-falsa',
  'gasta-energía':        'congela-energía',
  'carga-cuerpo':         'somatiza-resentimiento',
  'pide-soltar':          'aferra-más',
  'defiende-posición':    'rinde-posición',
  'rigidiza-trinchera':   'abandona-trinchera',
  'retiene-recurso':      'malgasta-recurso',
  'cierra-circulación':   'desborda-circulación',
  'expone-carencia':      'oculta-carencia',
  'rechaza-ayuda':        'depende-de-ayuda',
  'abre-umbral':          'cierra-umbral',
  'abre-cuerpo':          'cierra-cuerpo',
  'abre-vínculo':         'evita-vínculo',
  'expone-coherencia':    'simula-coherencia'
}

/* tensionType invertido: la tensión que la carta normalmente sostiene se
   desreguló. mental → mental difuso, emocional → emocional desbordado, etc.
   Conservamos el tipo pero marcamos en relationalTags que está invertido
   para que los detectores lo lean. */
function invertVisibility(v) {
  return ({
    'clara':   'borrosa',     // la luz se enturbia
    'expuesta':'oculta',      // lo expuesto se esconde
    'oculta':  'expuesta',    // lo oculto se filtra
    'borrosa': 'borrosa',     // la niebla negada sigue niebla
    'parcial': 'parcial'      // lo parcial se mantiene
  })[v] || v
}

/* Construye atributos modificados por inversión. */
function applyInversionToAttrs(base) {
  const newTags = (base.relationalTags || [])
    .map(t => TAG_INVERT[t] || t) // si no hay mapeo, dejamos el tag tal cual
    .concat(['__invertida__']) // bandera para detectores

  return {
    ...base,
    movementType:  MOVEMENT_INVERT[base.movementType] || base.movementType,
    shadowMode:    SHADOW_INVERT[base.shadowMode]     || base.shadowMode,
    visibility:    invertVisibility(base.visibility),
    relationalTags: newTags
  }
}


/* ---------------------------------------------------------------- *
 * API                                                                *
 * ---------------------------------------------------------------- */

/**
 * Devuelve el perfil relacional completo de una carta.
 * Carta puede ser Mayor (con .name), Menor (suit + number) o ya enriquecida.
 *
 * @param {Object}  card     La carta.
 * @param {boolean} reversed Si está invertida, modificamos atributos.
 */
export function getCardAttrs(card, reversed = false) {
  if (!card) return fallback()

  let base

  // Mayor — lookup directo
  if (card.name && MAJOR_ATTRS[card.name]) {
    const m = MAJOR_ATTRS[card.name]
    const e = getCardEnergetics(card)
    base = {
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
  else if (card.suit && card.number) {
    const e   = getCardEnergetics(card)
    const np  = NUMBER_PROFILE[card.number] || { movement: 'circulación', tags: [] }
    const ov  = MINOR_OVERRIDES[`${card.suit}/${card.number}`] || {}

    const tags = [...(np.tags || []), ...(ov.tags || [])]

    base = {
      emotionalAxis: ov.axis || SUIT_AXIS[card.suit] || ['conexión-aislamiento'],
      tensionType:   ov.tensionType || SUIT_TENSION[card.suit] || 'ninguna',
      movementType:  ov.movement || np.movement,
      rhythm:        e.rhythm,
      visibility:    ov.visibility || SUIT_VISIBILITY[card.suit] || 'parcial',
      shadowMode:    ov.shadowMode || SUIT_SHADOW[card.suit] || 'ninguna',
      relationalTags: tags
    }
  }
  else {
    return fallback()
  }

  return reversed ? applyInversionToAttrs(base) : base
}

/** Versión enriquecida de la carta: la original + energetics + attrs.
 *  Acepta `reversed` para que el motor pueda enriquecer correctamente
 *  cartas invertidas en una tirada. */
export function withAttrs(card, reversed = false) {
  return {
    ...card,
    isMajor:   isMajor(card),
    isReversed: !!reversed,
    energy:    getCardEnergetics(card),
    attrs:     getCardAttrs(card, reversed)
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
