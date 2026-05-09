/* =====================================================================
 * relationalDetectors.js
 *
 * Los 10 detectores que el motor relacional corre sobre el conjunto
 * de cartas enriquecidas. Cada detector es una función pura: recibe
 * cartas (con .energy y .attrs) y devuelve un objeto con flag + frases
 * ancladas, no plantilla.
 *
 *  1. detectEmotionalContradictions    — calor/frío, conexión/aislamiento,
 *                                          deseo/contención, etc.
 *  2. detectSuitDominance              — 2+ cartas de un mismo palo.
 *  3. detectMentalOverload             — Espadas + tensión mental fuerte.
 *  4. detectSuspendedEnergy            — todo en suspensión.
 *  5. detectMovementVsStillness        — empuje y quietud conviviendo.
 *  6. detectClarityVsFog               — visibilidad clara vs borrosa.
 *  7. detectMajorPresence              — cuántos Mayores y de qué tipo.
 *  8. detectEmotionalRhythm            — ritmo emocional general.
 *  9. detectAmplifications             — pares con tags que se refuerzan.
 * 10. detectBlocks                     — pares con tags que se neutralizan.
 *
 * Las frases se eligen con seed determinístico (mismo conjunto → misma
 * frase). Esto evita el sabor template: cada detector tiene 3-5 frases
 * por caso, y la elección depende del hash del set.
 * ===================================================================*/


/* ---------------------------------------------------------------- *
 * Hash y picker (los mismos del relationalEngine viejo)             *
 * ---------------------------------------------------------------- */
function pickVariant(arr, seed) {
  if (!arr || arr.length === 0) return ''
  return arr[seed % arr.length]
}


/* ================================================================ *
 * 1. CONTRADICCIONES EMOCIONALES
 *
 *   Cruza emotionalAxis: si dos cartas traen ejes opuestos
 *   (conexión vs aislamiento, deseo vs contención, etc.) marcamos.
 * ================================================================ */
const AXIS_OPPOSITES = {
  'conexión-aislamiento': 'aislamiento',
  'expansión-repliegue':  'repliegue',
  'deseo-contención':     'contención',
  'claridad-niebla':      'niebla',
  'ego-otro':             'otro',
  'control-entrega':      'entrega',
  'presencia-evasión':    'evasión'
}

const CONTRADICTION_LINES = {
  'temperatura-mixta': [
    'Calor y frío conviven en la misma escena. Ninguno de los dos sobra: están haciendo distinto trabajo.',
    'Una parte de la lectura abriga, otra mantiene la distancia. La tensión no se resuelve eligiendo: se sostiene.',
    'Lo que da calor y lo que da claridad fría no están peleando — están pidiendo turnos.'
  ],
  'ritmo-disonante': [
    'Una parte tuya pide acelerar y otra pide demorarse. Las dos tienen razón en distinto plano.',
    'Hay un compás rápido y uno lento conviviendo. Apurar el lento o frenar el rápido los rompe a ambos.',
    'El tiempo no es uniforme: hay urgencia y hay decantación, y hay que distinguir cuál es cuál.'
  ],
  'mente-vs-cuerpo': [
    'Lo que la cabeza tiene resuelto, el cuerpo todavía no firma. Y lo que el cuerpo sabe, la cabeza está peleando.',
    'Hay una distancia entre el plan y la emoción. Antes de decidir, conviene escuchar a quién no está de acuerdo.',
    'La cabeza dice "ya está" y el cuerpo dice "todavía no". Insistirle a una de las dos es romper algo.'
  ],
  'conexión-vs-aislamiento': [
    'Una parte tuya pide acercarte y otra pide cuarto propio. Resolverlo a favor de uno solo va a tener costo.',
    'Hay deseo de vínculo y necesidad de retiro al mismo tiempo. Ambos son válidos en distintos momentos del día.',
    'La lectura sostiene presencia y distancia a la vez. La mezcla, no la decisión, es el camino.'
  ],
  'deseo-vs-contención': [
    'El deseo está vivo y, al mismo tiempo, hay una parte que pide no entregar todo. Negociar entre las dos es el trabajo, no eliminar a una.',
    'Hay un querer y un cuidado conviviendo. No es contradicción moral: es regulación.',
    'Algo te llama y algo te frena. Entender qué pide cada uno cambia la conversación.'
  ],
  'claridad-vs-niebla': [
    'Una parte de la escena ya está vista y otra todavía no se deja leer. Forzar que sea todo claro hoy va a producir conclusiones falsas.',
    'Hay lucidez y hay niebla en la misma habitación. La pregunta no es cuál es real — las dos lo son.',
    'Lo que ves nítido y lo que ves borroso piden distinta forma de moverse. Mezclarlas es donde aparecen los errores.'
  ]
}

export function detectEmotionalContradictions(cards, seed) {
  const out = []
  const temps = new Set(cards.map(c => c.energy?.temperature).filter(Boolean))
  const dirs  = new Set(cards.map(c => c.energy?.direction).filter(Boolean))
  const rhys  = new Set(cards.map(c => c.energy?.rhythm).filter(Boolean))
  const types = new Set(cards.map(c => c.energy?.energyType).filter(Boolean))
  const allAxes = cards.flatMap(c => c.attrs?.emotionalAxis || [])
  const visibilities = new Set(cards.map(c => c.attrs?.visibility).filter(Boolean))

  if (temps.has('warm') && temps.has('cold')) {
    out.push({ key: 'temperatura-mixta', line: pickVariant(CONTRADICTION_LINES['temperatura-mixta'], seed) })
  }
  if (rhys.has('fast') && rhys.has('slow')) {
    out.push({ key: 'ritmo-disonante', line: pickVariant(CONTRADICTION_LINES['ritmo-disonante'], seed + 1) })
  }
  if (types.has('mental') && types.has('emotional')) {
    out.push({ key: 'mente-vs-cuerpo', line: pickVariant(CONTRADICTION_LINES['mente-vs-cuerpo'], seed + 2) })
  }

  if (allAxes.includes('conexión-aislamiento') && cards.length >= 2) {
    const dirsArr = cards.map(c => c.energy?.direction)
    if (dirsArr.includes('inward') && dirsArr.includes('outward')) {
      out.push({ key: 'conexión-vs-aislamiento', line: pickVariant(CONTRADICTION_LINES['conexión-vs-aislamiento'], seed + 3) })
    }
  }

  if (allAxes.filter(a => a === 'deseo-contención').length >= 2) {
    out.push({ key: 'deseo-vs-contención', line: pickVariant(CONTRADICTION_LINES['deseo-vs-contención'], seed + 4) })
  }

  if (visibilities.has('clara') && (visibilities.has('borrosa') || visibilities.has('oculta'))) {
    out.push({ key: 'claridad-vs-niebla', line: pickVariant(CONTRADICTION_LINES['claridad-vs-niebla'], seed + 5) })
  }

  return out
}


/* ================================================================ *
 * 2. DOMINANCIA DE PALOS
 * ================================================================ */
const SUIT_DOMINANCE_LINES = {
  Copas: {
    2: [
      'Dos cartas de Copas. El hilo principal aquí es afectivo, aunque la pregunta haya empezado de otro lado.',
      'La lectura se inclina a lo afectivo. Lo material y lo mental están, pero secundarios.'
    ],
    3: [
      'Tres Copas en la misma escena. Esto es del corazón antes que de la cabeza, y resolverlo desde la lógica va a fallar.',
      'Toda la lectura late en lo afectivo. No es momento de planes — es momento de mirar lo que se siente.'
    ]
  },
  Espadas: {
    2: [
      'Dos cartas de Espadas. La cabeza está trabajando fuerte, y eso solo a veces es claridad: a veces es ruido.',
      'La lectura se inclina a lo mental. Conviene revisar si el pensamiento está sirviendo o solo girando.'
    ],
    3: [
      'Tres Espadas. Tu cabeza está sosteniendo el peso de la situación entera, y muy posiblemente esté agotada.',
      'Toda la lectura es mental. Esto no se soluciona pensando más: pide aire afuera.'
    ]
  },
  Bastos: {
    2: [
      'Dos cartas de Bastos. Hay impulso pidiendo gesto. Lo bueno: el deseo está vivo. Lo riesgoso: gastar el fuego sin rumbo.',
      'La lectura se inclina al movimiento. Algo quiere salir; el trabajo es decidir hacia dónde.'
    ],
    3: [
      'Tres Bastos. La energía está al máximo y el rumbo no está claro del todo. Va a ser una semana intensa.',
      'Toda la lectura es activa. Cuidado con los incendios sin destino — el coraje sin foco se gasta rápido.'
    ]
  },
  Oros: {
    2: [
      'Dos cartas de Oros. La pregunta tiene cuerpo: dinero, oficio, casa, salud. Aterrizar antes de filosofar.',
      'La lectura se inclina a lo concreto. Lo simbólico está ahí, pero hoy pesa más lo tangible.'
    ],
    3: [
      'Tres Oros. Esto es de tierra: estructura, tiempo, repetición, recurso. Las soluciones rápidas no aplican.',
      'Toda la lectura habla del cuerpo y del oficio. Lo que pide la situación se construye con manos, no con discurso.'
    ]
  }
}

export function detectSuitDominance(cards, seed) {
  const counts = {}
  for (const c of cards) {
    if (c.suit) counts[c.suit] = (counts[c.suit] || 0) + 1
  }
  let best = null
  for (const [suit, n] of Object.entries(counts)) {
    if (n >= 2 && (!best || n > best.count)) best = { suit, count: n }
  }
  if (!best) return null
  const variants = SUIT_DOMINANCE_LINES[best.suit]?.[Math.min(best.count, 3)]
  return {
    suit: best.suit,
    count: best.count,
    line: pickVariant(variants || [], seed + 6)
  }
}


/* ================================================================ *
 * 3. EXCESO DE TENSIÓN MENTAL
 * ================================================================ */
const MENTAL_OVERLOAD_LINES = [
  'Hay demasiada cabeza en esta lectura. Lo que se está pensando una y otra vez ya no produce: pide aterrizaje físico, no otra vuelta.',
  'La mente está cargada. Tres conversaciones por dentro, ninguna por fuera. Algo de eso necesita salir en voz alta antes de seguir.',
  'Pensar más sobre esto no va a aclarar más. La lectura apunta a salir del análisis y volver al cuerpo.',
  'La cabeza está tomando decisiones por el cuerpo. Y el cuerpo, calladito, lleva días avisando lo que la cabeza no quiere ver.'
]

export function detectMentalOverload(cards, seed) {
  const mental = cards.filter(c => c.attrs?.tensionType === 'mental').length
  const espadas = cards.filter(c => c.suit === 'Espadas').length
  const sharp = cards.some(c => ['Espadas/Nueve', 'Espadas/Diez', 'Espadas/Ocho'].includes(`${c.suit}/${c.number}`))

  const isOverloaded =
    mental >= 2 ||
    espadas >= 3 ||
    (espadas >= 2 && sharp)

  if (!isOverloaded) return null
  return { line: pickVariant(MENTAL_OVERLOAD_LINES, seed + 7) }
}


/* ================================================================ *
 * 4. ENERGÍA SUSPENDIDA
 * ================================================================ */
const SUSPENDED_LINES = [
  'Toda la escena está en pausa. Esto no es bloqueo: es esperar a que aparezca la información que falta. Decidir hoy es decidir desde lo que no sabes.',
  'La lectura completa está en compás de espera. La paciencia hoy vale más que la decisión, y forzar una respuesta va a salir cara después.',
  'Todo está suspendido. La situación pide no moverse aún, no porque no puedas — porque mover ahora rompe lo que está madurando.',
  'Nada se decide hoy. La lectura entera te invita a sostener el no-saber un rato más, sin convertirlo en angustia.'
]

export function detectSuspendedEnergy(cards, seed) {
  const dirs = cards.map(c => c.energy?.direction)
  const moves = cards.map(c => c.attrs?.movementType)
  const allSuspended = dirs.every(d => d === 'suspended')
  const mostSuspended = moves.filter(m => m === 'suspensión').length >= Math.ceil(cards.length * 0.66)

  if (!allSuspended && !mostSuspended) return null
  return { line: pickVariant(SUSPENDED_LINES, seed + 8) }
}


/* ================================================================ *
 * 5. MOVIMIENTO VS INMOVILIDAD
 * ================================================================ */
const MOVEMENT_VS_STILLNESS_LINES = [
  'Hay una parte queriendo lanzarse y otra plantada en su lugar. La fricción no es defecto de la lectura: es la pregunta exacta.',
  'Algo empuja hacia adelante mientras otra cosa pide quedarse quieta. Resolverlo a favor de un solo lado va a costar lo mismo en cualquier dirección.',
  'Avance e inmovilidad conviven. La pregunta no es "cuál es mejor": es "cuál corresponde a esta hora del día".',
  'Una parte tuya está corriendo y otra está sentada. Las dos son tuyas, y ninguna está equivocada — están en distintos tiempos.'
]

export function detectMovementVsStillness(cards, seed) {
  const moves = cards.map(c => c.attrs?.movementType)
  const hasAdvance = moves.some(m => m === 'avance' || m === 'circulación')
  const hasStill   = moves.some(m => m === 'suspensión' || m === 'retroceso')
  if (!hasAdvance || !hasStill) return null
  return { line: pickVariant(MOVEMENT_VS_STILLNESS_LINES, seed + 9) }
}


/* ================================================================ *
 * 6. CLARIDAD VS NIEBLA
 * ================================================================ */
const CLARITY_VS_FOG_LINES = [
  'Hay un punto nítido y otro borroso en la misma escena. Lo claro no resuelve lo confuso, y lo confuso no anula lo claro: piden manejarse en paralelo.',
  'Una parte ya se ve. Otra todavía está pidiendo paciencia para revelarse. Apurar la borrosa va a producir certeza falsa.',
  'Coexisten lo que ya está visto y lo que todavía no. Conviene actuar sobre lo claro y dejar quieta lo nebuloso, no al revés.',
  'No todo se ve igual de bien hoy. Lo borroso no es error: es información que aún no terminó de llegar.'
]

export function detectClarityVsFog(cards, seed) {
  const visibilities = cards.map(c => c.attrs?.visibility)
  const hasClear = visibilities.includes('clara') || visibilities.includes('expuesta')
  const hasFog   = visibilities.includes('borrosa') || visibilities.includes('oculta')
  if (!hasClear || !hasFog) return null
  return { line: pickVariant(CLARITY_VS_FOG_LINES, seed + 10) }
}


/* ================================================================ *
 * 7. PRESENCIA FUERTE DE MAYORES
 * ================================================================ */
const MAJOR_PRESENCE_LINES = {
  3: [
    'Tres Arcanos Mayores. Esto no es escena del día: es capítulo entero. Lo que pasa hoy va a tener consecuencias varios meses adelante.',
    'Las tres figuras son grandes. La lectura no se cierra esta semana — está empezando algo más largo.',
    'Tres Mayores juntos: la situación tiene escala simbólica. Conviene leerla como momento bisagra, no como martes común.'
  ],
  2: [
    'Dos Mayores en escena. La pregunta pesa más de lo que parece desde afuera, y conviene darle el espacio que pide.',
    'Hay dos figuras grandes y una más chica. Lo importante son las dos figuras: la chica matiza, no decide.',
    'Con dos Mayores la lectura ya no es del día — es de los meses. Se mueve más despacio y con más peso.'
  ],
  1: [
    'Un Mayor entre cartas chicas. Esa figura grande es probablemente el ancla emocional alrededor de la cual se ordena todo lo demás.',
    'Un solo Mayor en la mesa. Cuál sea esa carta importa más que la posición — es donde está el centro de gravedad.',
    'Una pieza simbólica sostenida por dos gestos cotidianos. Lo simbólico le da sentido a lo cotidiano, no al revés.'
  ],
  0: [
    'Sin Mayores. Esto se vive a escala humana: una conversación, un mail, una decisión chica. No menos profundo — más íntimo.',
    'Ningún Arcano Mayor. La lectura es de gestos del día, no de capítulos de vida. Eso ya es información.',
    'Esto pasa en lo cotidiano: lo que dices hoy, lo que firmas, lo que te animás a no contestar. No hay drama estructural — hay vida.'
  ]
}

export function detectMajorPresence(cards, seed) {
  const count = cards.filter(c => c.isMajor).length
  const variants = MAJOR_PRESENCE_LINES[Math.min(count, 3)] || MAJOR_PRESENCE_LINES[1]
  return {
    count,
    line: pickVariant(variants, seed + 11)
  }
}


/* ================================================================ *
 * 8. RITMO EMOCIONAL GENERAL
 * ================================================================ */
const RHYTHM_LINES = {
  slow: [
    'El tiempo de la lectura va despacio. La situación no pide acelerar — pide habitar lo que tarde lo que tarde.',
    'El compás es bajo. Lo que se decide rápido aquí va a salir mal hecho.',
    'Todo se mueve a paso lento. El cuerpo de la lectura tiene tempo de invierno.'
  ],
  fast: [
    'El ritmo está alto. Las cosas se están moviendo a un compás que pide reaccionar el día, no la semana.',
    'Hay aceleración. No caos: ritmo activo. Lo que se hace en estos días deja huella concreta.',
    'El tiempo aprieta. Lo que pide decisión hoy ya se viene gestando hace rato.'
  ],
  fragmented: [
    'El ritmo está astillado. Hay pulsos que no encajan entre sí — y eso es exactamente la lectura, no algo que esté fallando.',
    'El compás se rompe a sí mismo. La situación se mueve por saltos, no en línea.',
    'El tiempo viene en pedazos. Tratar de ordenarlo en una secuencia limpia va a fallar.'
  ],
  stable: [
    'El ritmo es parejo. No es estancamiento: es sostenimiento. Lo que está pasando ahora va a parecerse a lo que pase mañana.',
    'El compás está estable. Esa estabilidad es activo, no defecto.',
    'Todo respira en un mismo tiempo. La calma no es ausencia: es oficio.'
  ],
  pulsed: [
    'Hay dos compases en la misma escena: uno que apura y otro que frena. Convivir es lo único honesto.',
    'El ritmo se acelera y se calma en pulsos. Forzar un solo tempo va a romper algo.',
    'Lo lento y lo rápido alternan. La sensación de mareo es parte de la lectura, no error.'
  ],
  mixed: [
    'Cada carta tiene su propio compás. La lectura no se vive como una canción — se vive como tres canciones distintas pasando a la vez.',
    'No hay un ritmo único: hay capas con tiempos distintos. La pregunta es cuál es el de fondo y cuál es el de superficie.',
    'El tiempo cambia de carta a carta. Eso no es defecto del mazo: es información sobre el momento.'
  ]
}

export function detectEmotionalRhythm(cards, seed) {
  const rhythms = cards.map(c => c.energy?.rhythm).filter(Boolean)
  const counts = { slow: 0, fast: 0, fragmented: 0, stable: 0 }
  for (const r of rhythms) counts[r] = (counts[r] || 0) + 1

  let pattern = 'mixed'
  if (counts.fragmented >= 2)                          pattern = 'fragmented'
  else if (counts.fast >= 2)                           pattern = 'fast'
  else if (counts.slow >= 2)                           pattern = 'slow'
  else if (counts.stable >= 2)                         pattern = 'stable'
  else if (counts.fast >= 1 && counts.slow >= 1)       pattern = 'pulsed'

  return {
    pattern,
    line: pickVariant(RHYTHM_LINES[pattern], seed + 12)
  }
}


/* ================================================================ *
 * 9. AMPLIFICACIONES — pares cuyo cruce intensifica
 * ================================================================ */
const AMPLIFY_RULES = [
  // si una carta amplifica algo (X) y otra trae también X, se intensifica
  { match: c => c.attrs?.relationalTags?.includes('amplifica-niebla'),
    against: c => c.attrs?.visibility === 'borrosa' || c.attrs?.visibility === 'oculta',
    line: 'Hay una niebla que se está reforzando entre dos cartas. Lo confuso no se va a aclarar empujándolo: pide tiempo.' },

  { match: c => c.attrs?.relationalTags?.includes('amplifica-emoción'),
    against: c => c.suit === 'Copas' || c.attrs?.tensionType === 'emocional',
    line: 'Lo emocional se está amplificando. Esto pide ser sentido sin que la cabeza lo intervenga todavía.' },

  { match: c => c.attrs?.relationalTags?.includes('amplifica-sombra'),
    against: c => c.attrs?.shadowMode === 'proyección' || c.attrs?.shadowMode === 'represión',
    line: 'Una sombra se está volviendo más grande porque dos cartas la están alimentando desde lados distintos.' },

  { match: c => c.attrs?.relationalTags?.includes('amplifica-acción'),
    against: c => c.attrs?.movementType === 'avance',
    line: 'El impulso se está reforzando. Si vas a moverte, mejor moverte ya — la ventana es ahora.' },

  { match: c => c.attrs?.relationalTags?.includes('amplifica-claridad'),
    against: c => c.attrs?.visibility === 'clara' || c.attrs?.visibility === 'expuesta',
    line: 'La claridad se está reforzando. Lo que ya viste se vuelve más evidente — no se puede des-saber.' }
]

export function detectAmplifications(cards, seed) {
  const found = []
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (i === j) continue
      for (const rule of AMPLIFY_RULES) {
        if (rule.match(cards[i]) && rule.against(cards[j])) {
          found.push({ line: rule.line })
          break
        }
      }
    }
  }
  // dedup por línea
  const unique = []
  const seen = new Set()
  for (const f of found) {
    if (!seen.has(f.line)) { seen.add(f.line); unique.push(f) }
  }
  return unique.slice(0, 1) // solo el más fuerte
}


/* ================================================================ *
 * 10. BLOQUEOS — pares cuyo cruce neutraliza
 * ================================================================ */
const BLOCK_RULES = [
  { match: c => c.attrs?.relationalTags?.includes('bloquea-acción'),
    against: c => c.attrs?.movementType === 'avance',
    line: 'Hay un impulso queriendo lanzarse, y otra carta lo está sosteniendo en pausa. La pausa, hoy, tiene la voz.' },

  { match: c => c.attrs?.relationalTags?.includes('bloquea-flujo-emocional'),
    against: c => c.suit === 'Copas',
    line: 'Lo afectivo está pidiendo aire y una estructura más rígida lo está conteniendo. Aflojar el marco es parte de cuidar lo emocional.' },

  { match: c => c.attrs?.relationalTags?.includes('bloquea-libertad'),
    against: c => c.attrs?.movementType === 'avance' || c.attrs?.movementType === 'circulación',
    line: 'Una atadura está deteniendo movimiento que ya estaba listo. Mirarla de cerca es lo que la afloja.' },

  { match: c => c.attrs?.relationalTags?.includes('bloquea-claridad'),
    against: c => c.attrs?.visibility === 'clara',
    line: 'Hay claridad disponible y algo la está velando. Lo que tapa la vista no es la situación: es algo dentro tuyo que prefiere no verla.' }
]

export function detectBlocks(cards, seed) {
  const found = []
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (i === j) continue
      for (const rule of BLOCK_RULES) {
        if (rule.match(cards[i]) && rule.against(cards[j])) {
          found.push({ line: rule.line })
          break
        }
      }
    }
  }
  const unique = []
  const seen = new Set()
  for (const f of found) {
    if (!seen.has(f.line)) { seen.add(f.line); unique.push(f) }
  }
  return unique.slice(0, 1)
}


/* ================================================================ *
 *  DETECTORES DE INVERTIDAS
 *
 *   Cuando hay cartas invertidas, los attrs traen tags distorsionados
 *   y la bandera __invertida__. Estos detectores leen ese estado y
 *   nombran lo que está pasando — sin romantizar la inversión, sin
 *   moralizar.
 * ================================================================ */
const INVERSION_PRESENCE_LINES = {
  3: [
    'Tres cartas invertidas en una tirada de tres. Esto es señal de bloqueo sostenido: nada está saliendo en su forma directa hoy. Conviene no decidir desde aquí.',
    'Las tres cartas vinieron al revés. Eso no es casualidad — es la lectura diciéndote que cualquier respuesta hoy va a ser distorsión, no claridad.'
  ],
  2: [
    'Dos cartas invertidas. Lo que la lectura quería decir está pasando filtros que conviene mirar antes de decidir.',
    'Hay dos cartas al revés. La lectura no está saliendo en su forma limpia: hay algo bloqueando, exagerando o evitando.'
  ]
}

/* Tags invertidos críticos → frase específica. Se busca el primero que
   aparezca en cualquier carta. */
const INVERTED_TAG_LINES = {
  'fuerza-claridad-falsa': 'Estás apurando una respuesta que todavía no se dejó ver. La conclusión que armaste hoy es probable que no resista mañana.',
  'apura-respuesta':       'Hay urgencia de cerrar algo que pide más tiempo. Decidir ya es decidir desde el cansancio, no desde la lectura.',
  'sospecha-todo':         'La sospecha está leyendo todo como amenaza. Lo que el otro hace ya no se ve, solo se interpreta.',
  'sostiene-fe-ciega':     'Hay una esperanza que no se está sosteniendo en gestos concretos. Creer está bien; creer sin moverte es otra cosa.',
  'simula-libertad':       'Algo se está nombrando como elección libre que en realidad es repetición disfrazada. La cuerda ya no aprieta — sigue ahí porque así es más cómoda.',
  'oculta-sombra':         'Una parte tuya está negando algo que el cuerpo ya registró. Disimular hacia adentro cuesta más caro que mirar.',
  'desborda-emoción':      'Lo afectivo se está derramando sobre todo. No es sensibilidad — es desregulación que pide pausa, no confirmación.',
  'fuerza-acción-prematura': 'Hay un impulso saliendo antes de tiempo. Lo que se mueve hoy va a tener que reescribirse mañana.',
  'evita-decisión':        'La decisión está al alcance y la estás dejando pasar. Posponerla un día más también es elegir.',
  'congela-ansiedad':      'La ansiedad ya no se mueve, se quedó. Naturalizar la angustia no es sostenerla: es dejar de mirarla.',
  'rinde-posición':        'Estás soltando algo que sabías defender. Asegurate de que no es por agotamiento — perder lo propio por cansancio se paga después.',
  'aferra-más-fuerte':     'Lo que tenía que cerrar se está sosteniendo con más fuerza. La negación del cierre lo vuelve más doloroso, no menos.',
  'maquilla-mentira':      'Lo que ya se vio se está cubriendo otra vez. Dos personas saben que pasó: tú, y tu cuerpo.',
  'romantiza-pérdida':     'La pérdida se volvió historia y la historia se volvió identidad. Lo que perdiste sigue siendo real; estar ahí no.',
  'depende-de-ayuda':      'Pedir ayuda es bueno; convertir a alguien en muleta no. La diferencia es si sigues moviéndote tú o no.',
  'sustituye-claridad':    'Estás reemplazando lo que ves con lo que prefieres ver. La cabeza ofrece otra explicación cada vez que la primera te incomoda.'
}

export function detectInvertedDominance(cards, seed) {
  const inverted = cards.filter(c => c?.isReversed || c?.reversed || c?.attrs?.relationalTags?.includes('__invertida__'))
  if (inverted.length < 2) return null
  const variants = INVERSION_PRESENCE_LINES[Math.min(inverted.length, 3)] || INVERSION_PRESENCE_LINES[2]
  return {
    count: inverted.length,
    line: pickVariant(variants, seed + 13)
  }
}

export function detectInvertedTagSignal(cards, seed) {
  // Buscar el primer tag invertido crítico que aparezca
  for (const card of cards) {
    const tags = card?.attrs?.relationalTags || []
    for (const tag of tags) {
      if (INVERTED_TAG_LINES[tag]) {
        return { tag, line: INVERTED_TAG_LINES[tag] }
      }
    }
  }
  return null
}


/* =====================================================================
 *  ORQUESTADOR — corre los 10 detectores en orden y devuelve diagnóstico
 *  rico para que el motor compositor priorice y arme la lectura.
 * ===================================================================*/
export function runAllDetectors(cards, seed) {
  return {
    contradictions: detectEmotionalContradictions(cards, seed),
    suitDominance:  detectSuitDominance(cards, seed),
    mentalOverload: detectMentalOverload(cards, seed),
    suspended:      detectSuspendedEnergy(cards, seed),
    movementVsStillness: detectMovementVsStillness(cards, seed),
    clarityVsFog:   detectClarityVsFog(cards, seed),
    majorPresence:  detectMajorPresence(cards, seed),
    rhythm:         detectEmotionalRhythm(cards, seed),
    amplifications: detectAmplifications(cards, seed),
    blocks:         detectBlocks(cards, seed),
    // capa de invertidas
    invertedDominance: detectInvertedDominance(cards, seed),
    invertedSignal:    detectInvertedTagSignal(cards, seed)
  }
}
