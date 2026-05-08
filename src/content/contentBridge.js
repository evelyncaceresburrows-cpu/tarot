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


/* ---------------------------------------------------------------- *
 * Situaciones humanas integradas en la lectura                     *
 *                                                                  *
 * Toma 3 manifestations (derivadas del manual) y las traduce a una *
 * frase prosaica con conectores naturales:                         *
 *   "Puede asomar cuando … O cuando … También cuando …"            *
 *                                                                  *
 * Las manifestations ya vienen con el material simbólico extraído  *
 * del manual de Rimi Jiménez Nallde. Esta función las cose como    *
 * prosa para que la lectura sea más concreta sin volverse lista.   *
 * ---------------------------------------------------------------- */

/* Conjuga / adapta una manifestación para que entre como subordinada
 * después de "cuando ___". Maneja los patrones más frecuentes:
 *   · Verbo infinitivo  → tú (Soltar → soltás), incluso seguido de coma
 *   · "Una/Un/El/La X"  → "aparece una/un/el/la X" (preserva relativas)
 *   · Plurales con det. → "aparecen los/las/algunos X"
 *   · Sustantivos sueltos (ganas, sueños...) → prefijo "asoman"
 *   · Sustantivos abstractos (necesidad, deseo...) → "aparece la/el X"
 *   · Cláusulas ya formadas → as-is con lowercase inicial
 */
function adaptManifestation(raw) {
  if (!raw) return ''
  let s = raw.trim().replace(/\.$/, '')
  s = s.charAt(0).toLowerCase() + s.slice(1)

  /* Verbos en infinitivo → tú. Considera coma o espacio inmediatamente
     después del verbo (ej. "Sentir, después de…"). */
  const verbMap = {
    'soltar':       'sueltas',
    'sentir':       'sientes',
    'sentirte':     'te sientes',
    'sentirse':     'te sientes',
    'reconocer':    'reconoces',
    'reconocerte':  'te reconoces',
    'aceptar':      'aceptas',
    'aceptarte':    'te aceptas',
    'volver':       'vuelves',
    'volverte':     'te vuelves',
    'decir':        'dices',
    'hacer':        'haces',
    'mirar':        'miras',
    'mirarte':      'te miras',
    'elegir':       'eliges',
    'cambiar':      'cambias',
    'encontrar':    'encuentras',
    'encontrarte':  'te encuentras',
    'aprender':     'aprendes',
    'llorar':       'lloras',
    'asumir':       'asumes',
    'comprender':   'comprendes',
    'compartir':    'compartes',
    'escuchar':     'escuchas',
    'sostener':     'sostienes',
    'sostenerte':   'te sostienes',
    'pedir':        'pides',
    'ofrecer':      'ofreces',
    'cuidar':       'cuidas',
    'cuidarte':     'te cuidas',
    'cerrar':       'cierras',
    'abrir':        'abres',
    'perder':       'pierdes',
    'ganar':        'ganas',
    'buscar':       'buscas',
    'esperar':      'esperas',
    'tomar':        'tomas',
    'tomarte':      'te tomas',
    'tomarse':      'te tomas',
    'dar':          'das',
    'darte':        'te das',
    'vivir':        'vives',
    'seguir':       'sigues',
    'empezar':      'empiezas',
    'terminar':     'terminas',
    'aparecer':     'aparece',
    'salir':        'sales',
    'entrar':       'entras',
    'tener':        'tienes',
    'recibir':      'recibes',
    'permitir':     'permites',
    'permitirte':   'te permites',
    'permitirse':   'te permites',
    'recordar':     'recuerdas',
    'olvidar':      'olvidas',
    'pisar':        'pisas',
    'cocinar':      'cocinas',
    'cumplir':      'cumples',
    'manejar':      'manejas',
    'sumar':        'sumas',
    'sumarte':      'te sumas',
    'lanzar':       'lanzas',
    'lanzarte':     'te lanzas',
    'apuntar':      'apuntas',
    'apuntarte':    'te apuntas',
    'reorganizar':  'reorganizas',
    'reorganizarte':'te reorganizas',
    'anotar':       'anotas',
    'anotarte':     'te anotas',
    'anticipar':    'anticipas',
    'mediar':       'medias',
    'reconciliarse':'te reconcilias',
    'cargar':       'cargas',
    'cargarte':     'te cargas',
    'reservarte':   'te reservas',
    'editar':       'editas',
    'ahorrarse':    'te ahorras',
    'pelear':       'peleas',
    'pelearte':     'te peleas',
    'identificarte':'te identificas',
    'rechazar':     'rechazas',
    'apagar':       'apagas',
    'reducir':      'reduces',
    'planear':      'planeas',
    'avanzar':      'avanzas',
    'mantener':     'mantienes',
    'mantenerte':   'te mantienes',
    'recuperar':    'recuperas',
    'recuperarte':  'te recuperas',
    'defender':     'defiendes',
    'defenderte':   'te defiendes',
    'liderar':      'lideras',
    'inspirar':     'inspiras',
    'subirte':      'te subes',
    'bajar':        'bajas',
    'enviar':       'envías',
    'cabalgar':     'cabalgas',
    'mostrar':      'muestras',
    'mostrarte':    'te muestras',
    'celebrar':     'celebras',
    'confiar':      'confías',
    'pasar':        'pasas',
    'notar':        'notas',
    'levantar':     'levantas',
    'caer':         'caes',
    'jugar':        'juegas',
    'despertarte':  'te despiertas',
    'despertarse':  'te despiertas',
    'darse':        'te das',
    'organizar':    'organizas',
    'organizarte':  'te organizas',
    'reservar':     'reservas',
    'detenerte':    'te detienes',
    'detenerse':    'te detienes',
    'animarte':     'te animas',
    'mover':        'mueves',
    'moverte':      'te mueves',
    'moverse':      'te mueves',
    'crecer':       'creces',
    'florecer':     'floreces',
    'caminar':      'caminas',
    'subir':        'subes',
    'cruzar':       'cruzas',
    'cruzarte':     'te cruzas'
  }

  for (const [verb, conjugated] of Object.entries(verbMap)) {
    /* Match con espacio o coma inmediatamente después del verbo */
    const re = new RegExp(`^${verb}([\\s,])`)
    if (re.test(s)) {
      return s.replace(re, conjugated + '$1')
    }
  }

  /* Sustantivos plurales sueltos: ganas, sueños, mensajes, etc. */
  if (/^(ganas|sueños|mensajes|noticias|señales|miedos|pensamientos|opciones|llamados)\b/.test(s)) {
    return 'asoman ' + s
  }

  /* Nominal phrases con determinante: el/la/los/las/un/una/algún… */
  if (/^(una|un|el|la)\s/.test(s)) {
    return 'aparece ' + s
  }
  if (/^(los|las|algunos|algunas)\s/.test(s)) {
    return 'aparecen ' + s
  }
  if (/^(algún|alguna)\s/.test(s)) {
    return 'aparece ' + s
  }

  /* Sustantivos abstractos singulares comunes (sin determinante) */
  if (/^(necesidad|sensación|urgencia|memoria|nostalgia|tregua|llamado|deseo|impulso)\b/.test(s)) {
    return 'aparece la ' + s
  }

  /* Default: cláusula ya formada (algo X, dar vueltas, etc.) → as-is */
  return s
}

/**
 * Devuelve una frase corta con 3 situaciones humanas derivadas de las
 * manifestations. Si no hay 3, devuelve string vacío.
 */
export function composeSituations(manifestations) {
  if (!Array.isArray(manifestations) || manifestations.length < 3) return ''
  const [a, b, c] = manifestations.slice(0, 3).map(adaptManifestation)
  if (!a || !b || !c) return ''
  return `Puede asomar cuando ${a}. O cuando ${b}. También cuando ${c}.`
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
