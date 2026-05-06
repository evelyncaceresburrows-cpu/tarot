/* =====================================================================
 * minorArcanaSuitSystem.js
 *
 * Sistema simbólico modular para los Arcanos Menores.
 *
 * FILOSOFÍA
 *   - Los Mayores hablan de capítulos del viaje. Los Menores hablan de
 *     escenas: dinámicas cotidianas, tensiones concretas, gestos chicos.
 *   - Por eso la lectura debe sentirse más rápida, más situacional,
 *     y al mismo tiempo conservar profundidad emocional.
 *   - Nada de ensayos espirituales por carta. Nada de IA genérica.
 *
 * TRES CAPAS
 *   1) suitSystem      → identidad maestra por palo  (4 palos)
 *   2) numericSystem   → identidad por número        (As → Rey)
 *   3) composeMinor    → función que combina ambas para producir
 *                        la base simbólica de cada carta antes de
 *                        escribir su contenido emocional final.
 *
 * SCHEMA POR CARTA MENOR (resultado deseado del proceso)
 *   {
 *     suit, number,
 *     essence:        string  ← 1 frase, anclada en el cruce palo+número
 *     reading:        string  ← lectura corta, 2-3 oraciones máximo
 *     synthesis:      string  ← 1 oración, eco emocional
 *     prompt:         string  ← pregunta breve, sin respuesta
 *     themes:         string[]
 *     manifestations: string[]   ← 3-4 escenas cotidianas
 *     shadows:        string[]   ← 2-3 sombras concretas
 *   }
 *
 * Tono: contemplativo, editorial, humano. No predictivo.
 * Inspiración visual: Rider-Waite-Smith.
 * ===================================================================*/


/* =====================================================================
 * 1) SISTEMA DE PALOS — identidad maestra
 * ===================================================================*/

export const suitSystem = {

  /* ---------- COPAS · Agua · emoción ----------------------------- */
  Copas: {
    suit:           'Copas',
    element:        'Agua',
    coreThemes:     ['Emociones', 'Vínculos', 'Intuición', 'Sensibilidad', 'Deseo afectivo', 'Mundo interior'],
    emotionalTone:  'Íntimo, fluido, emocional. La temperatura más cálida del mazo. Habla en susurros antes que en sentencias.',
    visualAtmosphere: [
      'Agua quieta y agua en movimiento',
      'Reflejos sobre superficies',
      'Azules suaves, plateados, malvas profundos',
      'Luna llena y mareas',
      'Luz lunar nocturna o luz dorada al atardecer',
      'Copas que se vierten, líquidos que se mezclan'
    ],
    symbolicWorld: [
      'El agua como espejo emocional',
      'La copa que recibe y derrama',
      'Los peces como contenido del inconsciente',
      'El cáliz ritual: lo que se ofrece y se recibe',
      'La marea como ritmo afectivo'
    ],
    shadows: [
      'Hipersensibilidad sin contención',
      'Idealización afectiva',
      'Refugiarse en la fantasía emocional',
      'Confundir intensidad con verdad',
      'Saturar al otro emocionalmente'
    ],
    pacing:        'Lento, ondulante, en oleadas. En Copas las cosas no se resuelven: maduran.',
    readingStyle:  'Lectura emocional, con preguntas suaves. Privilegiar el sentir sobre el explicar. Hablar desde adentro, no desde el manual.'
  },

  /* ---------- ESPADAS · Aire · pensamiento ------------------------ */
  Espadas: {
    suit:           'Espadas',
    element:        'Aire',
    coreThemes:     ['Pensamiento', 'Conflicto', 'Verdad', 'Tensión mental', 'Claridad incómoda', 'Comunicación'],
    emotionalTone:  'Filoso, racional, incómodo. Aire frío que despierta y a veces hiere. Habla con precisión, no con dulzura.',
    visualAtmosphere: [
      'Cielos grises, nubes apretadas',
      'Viento cortante, hojas o telas movidas',
      'Espadas verticales y diagonales',
      'Líneas duras, geometría limpia',
      'Acero pulido, reflejos metálicos fríos',
      'Paleta azul-acero, blanco hueso, plomo'
    ],
    symbolicWorld: [
      'La espada como pensamiento que corta',
      'El cielo como mente abierta o cargada',
      'Las nubes como ideas en movimiento',
      'El aire como medio de la palabra',
      'La balanza interna entre razón y conciencia'
    ],
    shadows: [
      'Análisis paralizante',
      'Crueldad disfrazada de honestidad',
      'Mente que se devora a sí misma',
      'Verdad usada como arma',
      'Disociación, frialdad emocional'
    ],
    pacing:        'Rápido, cortante, agudo. En Espadas los conflictos se piensan: pueden resolverse en un giro mental o cronificarse en obsesión.',
    readingStyle:  'Lectura clara, casi quirúrgica. Nombrar lo incómodo con cuidado, sin endulzar. Privilegiar la verdad sobre la comodidad.'
  },

  /* ---------- BASTOS · Fuego · impulso --------------------------- */
  Bastos: {
    suit:           'Bastos',
    element:        'Fuego',
    coreThemes:     ['Impulso', 'Creatividad', 'Deseo de avanzar', 'Energía', 'Movimiento', 'Vocación'],
    emotionalTone:  'Activo, expansivo, cálido. La temperatura del entusiasmo y también del enojo. Habla con fuerza, ganas, ímpetu.',
    visualAtmosphere: [
      'Fuego, llamas, brasas vivas',
      'Rojos Rider, naranjas, ocres encendidos',
      'Movimiento explícito, gestos amplios',
      'Chispas, humo, luz dorada al sol',
      'Brotes verdes sobre el bastón vivo',
      'Cielos abiertos, paisajes vastos'
    ],
    symbolicWorld: [
      'El bastón vivo: voluntad creadora',
      'El fuego como motor interno',
      'El brote en la madera: la idea que sigue viva',
      'Las hojas que aparecen sobre el bastón: el deseo no se apaga',
      'La distancia conquistada como signo de movimiento'
    ],
    shadows: [
      'Quemarse rápido',
      'Confundir entusiasmo con dirección',
      'Imponer la propia energía sin escuchar',
      'Reactividad e impaciencia',
      'Empezar muchas cosas y terminar pocas'
    ],
    pacing:        'Rápido, expansivo, en pulsos. En Bastos los procesos arrancan rápido y piden cuidado para no apagarse.',
    readingStyle:  'Lectura energética, sin caer en coaching. Hablar de impulso, dirección, deseo. Activa, pero no urgente.'
  },

  /* ---------- OROS · Tierra · cuerpo y materia -------------------- */
  Oros: {
    suit:           'Oros',
    element:        'Tierra',
    coreThemes:     ['Cuerpo', 'Trabajo', 'Estabilidad', 'Valor', 'Materia', 'Construcción cotidiana'],
    emotionalTone:  'Terrestre, lento, concreto. La temperatura del oficio y la paciencia. Habla con calma, midiendo, sin apuro.',
    visualAtmosphere: [
      'Tierra, jardines, viñedos',
      'Dorado envejecido, ocres tibios',
      'Piedra tallada, madera vieja',
      'Texturas táctiles: lana, madera, hojas',
      'Verde profundo, marrón cálido',
      'Luz de tarde, sombras largas'
    ],
    symbolicWorld: [
      'El pentáculo como valor concreto',
      'La moneda como intercambio honesto',
      'El cuerpo como territorio que se habita',
      'El trabajo como ritual cotidiano',
      'La casa, el huerto y el oficio como formas del cuidado'
    ],
    shadows: [
      'Apego a la seguridad material',
      'Miedo a no tener',
      'Confundir valor con productividad',
      'Estancamiento, rutina sin alma',
      'Materialismo desconectado de sentido'
    ],
    pacing:        'Lento, sostenido, paso a paso. En Oros los procesos se construyen con tiempo y oficio.',
    readingStyle:  'Lectura concreta, encarnada. Hablar de lo cotidiano, del cuerpo, de lo tangible. Sin metáforas vacías.'
  }

}


/* =====================================================================
 * 2) SISTEMA NUMÉRICO — identidad por número (As → Rey)
 *
 *    Cada número tiene un carácter narrativo independiente del palo.
 *    Al cruzar número con palo se obtiene la "voz" base de la carta.
 * ===================================================================*/

export const numericSystem = {

  /* --- Números 1 → 10 ------------------------------------------- */
  As: {
    label:           'As',
    rank:            1,
    emotionalTheme:  'Potencial puro, semilla',
    movementType:    'Apertura, regalo que llega',
    tension:         'Todavía sin forma; pide ser tomado',
    narrativeEnergy: 'Inicio absoluto del palo en su versión más esencial'
  },
  Dos: {
    label:           'Dos',
    rank:            2,
    emotionalTheme:  'Encuentro de dos fuerzas',
    movementType:    'Balance, intercambio, espejo',
    tension:         'Elegir o sostener ambas a la vez',
    narrativeEnergy: 'Pausa frente a una dualidad significativa'
  },
  Tres: {
    label:           'Tres',
    rank:            3,
    emotionalTheme:  'Primera concreción, expansión',
    movementType:    'Lo íntimo se vuelve compartido',
    tension:         'Salir al mundo con lo que se gestó adentro',
    narrativeEnergy: 'Floración, presentación, primer fruto'
  },
  Cuatro: {
    label:           'Cuatro',
    rank:            4,
    emotionalTheme:  'Estabilidad ganada',
    movementType:    'Pausa, consolidación, contención',
    tension:         'Riesgo de aferrarse o de estancarse',
    narrativeEnergy: 'Refugio, base que se sostiene'
  },
  Cinco: {
    label:           'Cinco',
    rank:            5,
    emotionalTheme:  'Crisis, prueba, conflicto',
    movementType:    'Choque que desordena lo construido',
    tension:         'Lo que parecía firme tambalea',
    narrativeEnergy: 'Frustración, pérdida o fricción que enseña'
  },
  Seis: {
    label:           'Seis',
    rank:            6,
    emotionalTheme:  'Recuperación, equilibrio recuperado',
    movementType:    'Fluidez, reciprocidad, ajuste',
    tension:         'Sostener la armonía recompuesta',
    narrativeEnergy: 'Alivio después de la prueba, gesto de gentileza'
  },
  Siete: {
    label:           'Siete',
    rank:            7,
    emotionalTheme:  'Reflexión, intimidad, evaluación',
    movementType:    'Hacia adentro, paso silencioso',
    tension:         'Definir el rumbo sin ruido externo',
    narrativeEnergy: 'Pregunta privada, decisión interior'
  },
  Ocho: {
    label:           'Ocho',
    rank:            8,
    emotionalTheme:  'Maestría, oficio, ritmo sostenido',
    movementType:    'Estructura, organización, repetición consciente',
    tension:         'Sostener el ritmo sin perder el sentido',
    narrativeEnergy: 'Habilidad encarnada, disciplina sin rigidez'
  },
  Nueve: {
    label:           'Nueve',
    rank:            9,
    emotionalTheme:  'Culminación interior',
    movementType:    'Recogimiento previo al cierre',
    tension:         'Sostener la propia luz a solas',
    narrativeEnergy: 'Casi llegado, todavía a solas con el camino'
  },
  Diez: {
    label:           'Diez',
    rank:            10,
    emotionalTheme:  'Culminación, cierre, exceso',
    movementType:    'Llegada, fin de ciclo, traspaso',
    tension:         'Lo cumplido también pesa',
    narrativeEnergy: 'Plenitud, peso, transición hacia el siguiente ciclo'
  },

  /* --- Figuras: Sota / Caballero / Reina / Rey ------------------ */
  Sota: {
    label:           'Sota',
    rank:            11,
    isFigure:        true,
    emotionalTheme:  'Curiosidad inicial, mirada fresca',
    movementType:    'Primer contacto, exploración receptiva',
    tension:         'Aprender a mirar sin saber todavía',
    narrativeEnergy: 'Mensaje, novedad, entusiasmo aún sin oficio'
  },
  Caballero: {
    label:           'Caballero',
    rank:            12,
    isFigure:        true,
    emotionalTheme:  'Impulso dirigido',
    movementType:    'Movimiento explícito hacia un objetivo',
    tension:         'Encauzar el ímpetu sin atropellar',
    narrativeEnergy: 'Acción, búsqueda, viaje activo'
  },
  Reina: {
    label:           'Reina',
    rank:            13,
    isFigure:        true,
    emotionalTheme:  'Madurez interior, sabiduría encarnada',
    movementType:    'Sostener desde adentro sin imponer',
    tension:         'Cuidar sin perderse en el cuidado',
    narrativeEnergy: 'Presencia firme y cálida, autoridad receptiva'
  },
  Rey: {
    label:           'Rey',
    rank:            14,
    isFigure:        true,
    emotionalTheme:  'Dominio integrado, estabilidad activa',
    movementType:    'Decisión firme, autoridad serena',
    tension:         'No volverse rígido en el saber propio',
    narrativeEnergy: 'Maestría plena, integración del palo en su forma adulta'
  }

}


/* =====================================================================
 * 3) COMPOSER — base simbólica para escribir cada carta menor
 *
 *    Combina la identidad del palo y la del número en una "matriz"
 *    de partida, sobre la cual se escribe el contenido emocional final
 *    (essence, reading, synthesis, prompt, etc.) en pasadas posteriores.
 *
 *    No reemplaza la escritura humana: la sostiene.
 * ===================================================================*/

const suitKeys     = Object.keys(suitSystem)
const numericKeys  = Object.keys(numericSystem)

export function composeMinorIdentity({ suit, number }) {
  const s = suitSystem[suit]
  const n = numericSystem[number]
  if (!s) throw new Error(`Palo desconocido: ${suit}. Esperado uno de: ${suitKeys.join(', ')}`)
  if (!n) throw new Error(`Número desconocido: ${number}. Esperado uno de: ${numericKeys.join(', ')}`)

  return {
    suit:    s.suit,
    number:  n.label,
    rank:    n.rank,
    isFigure: !!n.isFigure,

    /* Identidad combinada: cómo se cruza este número con este palo */
    emotionalCross: `${n.emotionalTheme} en clave ${s.suit.toLowerCase()}: ${s.emotionalTone}`,
    movementCross:  `${n.movementType}, con el ritmo ${s.pacing.toLowerCase()}`,
    tensionCross:   `${n.tension} dentro del territorio de ${s.coreThemes.slice(0, 3).join(', ').toLowerCase()}.`,

    /* Atmósfera visual sugerida para ilustración o prosa */
    atmosphere: {
      element:        s.element,
      visual:         s.visualAtmosphere,
      symbolicWorld:  s.symbolicWorld
    },

    /* Sombras combinadas: las del palo + el matiz numérico */
    shadowsHints: s.shadows,

    /* Tono recomendado al escribir essence/reading */
    voiceGuidance: s.readingStyle,

    /* Plantilla del schema final que la carta debe completar */
    template: {
      essence:        '',
      reading:        '',
      synthesis:      '',
      prompt:         '',
      themes:         [],
      manifestations: [],
      shadows:        []
    }
  }
}


/* =====================================================================
 * 4) HELPERS — listas y utilidades
 * ===================================================================*/

export const allSuits    = suitKeys                       // ['Copas', 'Espadas', 'Bastos', 'Oros']
export const allNumbers  = numericKeys                    // ['As', 'Dos', ..., 'Rey']
export const allMinorIds = suitKeys.flatMap(suit =>
  numericKeys.map(number => ({ suit, number }))
)                                                          // 4 × 14 = 56 identificadores

export function getSuit(name)     { return suitSystem[name]    || null }
export function getNumber(label)  { return numericSystem[label] || null }


/* =====================================================================
 * NOTAS DE USO
 * =====================================================================
 *
 *   import { composeMinorIdentity } from './minorArcanaSuitSystem.js'
 *
 *   const id = composeMinorIdentity({ suit: 'Copas', number: 'Tres' })
 *   // → identidad base: tono Copas + carga narrativa del Tres
 *   //   sobre la que se escribe luego essence / reading / etc.
 *
 *   Para listar las 56 identidades:
 *     import { allMinorIds } from './minorArcanaSuitSystem.js'
 *     allMinorIds.forEach(({ suit, number }) => { ... })
 *
 *   Próxima fase (no contenida en este archivo):
 *     - escribir, palo por palo, las 14 cartas usando esta matriz como base.
 *     - mantener el schema corto: 1 essence, 2-3 oraciones de reading,
 *       1 synthesis, 1 prompt, 3-4 manifestations, 2-3 shadows.
 *     - revisar variabilidad: ningún número debería sonar igual entre palos.
 * ===================================================================*/
