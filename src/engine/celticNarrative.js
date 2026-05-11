/* =====================================================================
 * celticNarrative.js
 *
 * Compositor narrativo de la CRUZ CELTA — informe simbólico denso.
 *
 * No es una tirada corta expandida. Es la lectura más compleja del
 * sistema: 10 cartas leídas como UN sistema de fuerzas, no como suma.
 *
 * ARQUITECTURA
 *
 *   1. TESIS              — hipótesis específica para esta tirada
 *   2. NÚCLEO RELACIONAL  — carta 1 + carta 2 como relación (no suma)
 *   3. FUERZAS QUE EMPUJAN — posiciones 3 (corona) + 5 (pasado) + 6 (futuro)
 *   4. FUERZAS QUE RETIENEN — 4 (base) + 8 (entorno) + 9 (inner)
 *   5. CARTAS DOMINANTES  — qué reconfigura, palo dominante, peso de Mayores
 *   6. SISTEMA INVERTIDAS — qué se distorsiona; modifica hipótesis principal
 *   7. SITUACIONES HUMANAS — 2-3 escenas observables, no atmósferas
 *   8. CIERRE NARRATIVO   — eco + dirección posible, sin moraleja
 *
 * POSICIONES — orden tradicional Rider-Waite:
 *   0 present     — lo que está
 *   1 crossing    — lo que cruza
 *   2 crown       — lo que se asoma (consciente / aspiración)
 *   3 foundation  — la base (inconsciente / raíz)
 *   4 past        — lo que queda atrás
 *   5 future      — lo que llega
 *   6 self        — cómo llegas
 *   7 environment — lo que rodea
 *   8 inner       — esperanzas y miedos
 *   9 horizon     — dirección final
 *
 * IMPORTANTE
 *   No usar: "el aire", "la energía", "todo respira", "procesos",
 *   "algo está cambiando", "la cadencia", "la noche".
 *   Sí usar: contradicción humana, causalidad emocional, comportamiento
 *   observable, relaciones entre cartas.
 * ===================================================================*/


/* ---------- Helpers de carta ---------- */

function cardName(card) {
  return card?.nombre || card?.name || (card?.suit && card?.number ? `${card.number} de ${card.suit}` : 'esa carta')
}

function isReversed(card) {
  return !!(card?.reversed || card?.isReversed || (card?.attrs?.relationalTags || []).includes('__invertida__'))
}

function essenceLower(card, content) {
  const e = content?.essence || card?.essence || ''
  if (!e) return ''
  const t = e.trim().replace(/\.$/, '')
  return t.charAt(0).toLowerCase() + t.slice(1)
}

function isMajor(card) {
  return !!card?.isMajor
}


/* =================================================================
 *  TESIS PRINCIPAL — hipótesis específica para esta tirada
 *
 *  Se combina con la tesis genérica de narrativeComposer pero también
 *  considera el peso simbólico de las cartas dominantes y la
 *  configuración invertida específica de la Cruz Celta.
 * ================================================================ */

const CELTIC_THESES = {
  // patrón triple
  'desgaste-cronico':
    'Esta lectura no habla de conflicto: habla de demora. Hay varias cartas tratando de sostener algo que ya perdió estabilidad, y la pregunta no es qué hacer — es cuánto más estás dispuesta a sostenerlo así.',
  'tension-mental-sin-direccion':
    'Hay mucho movimiento mental sin dirección emocional. La cabeza está corriendo escenarios mientras el cuerpo lleva días pidiendo que se detenga la simulación.',
  'comprension-sin-movimiento':
    'Aquí está casi todo entendido. Lo que falta no es claridad — es la decisión de actuar sobre lo que ya se vio.',
  'sostener-demasiado':
    'La tensión principal no está en decidir: está en sostener demasiado. Varias cartas señalan que se cargó más de lo necesario y eso es lo que se está cobrando.',
  'movimiento-bloqueado':
    'Esta lectura habla de un movimiento que está cediendo paso. Algo quiere salir y otra cosa, también tuya, está apretando los puños para que no.',
  'algo-ya-paso':
    'Hay algo que ya pasó y la lectura confirma que no terminó de aterrizar. La energía no desaparece: se queda dando vueltas hasta que se nombra.',
  'ruptura-en-proceso':
    'Algo está cediendo y eso es lo que la tirada describe — no como sorpresa, como consecuencia. Llevaba tiempo crujiendo y por fin se nota afuera.',
  'distorsion-por-invertidas':
    'Esta tirada está distorsionada por dentro: varias cartas invertidas señalan que la lectura no está saliendo en su forma directa. La pregunta no es qué pasa, es qué resistencia estás poniendo a lo que ya entendiste.',
  'capitulo-largo':
    'Esto no es una pregunta del día. Es un capítulo entero abriéndose, y va a tardar más de lo que la cabeza quiere admitir.',
  'patron-cierra-ciclo':
    'Lo que aparece no es escena nueva: es la última escena de un patrón viejo. La lectura no muestra crisis — muestra el final de algo que llevaba más años de lo que parecía.'
}

/**
 * Decide la tesis basándose en macros + estadísticas + cartas manifesto.
 * Más específica que la tirada de 3 porque tiene 10 cartas de evidencia.
 */
export function generateCelticThesis({ macros, stats, enriched, crossing }) {
  // 1. Si hay cruce icónico fuerte, gana
  if (crossing?.weight >= 0.9) return crossing.phrase

  const has = (k) => macros.some(m => m.key === k)

  // 2. Combinaciones específicas
  if (has('agotamiento-sostenido') && has('dificultad-cerrar')) {
    return CELTIC_THESES['desgaste-cronico']
  }
  if (has('tension-mental-dominante') && !has('vinculo-en-juego') && !has('reparacion-en-curso')) {
    return CELTIC_THESES['tension-mental-sin-direccion']
  }
  if (has('claridad-retenida') && has('evasion-activa')) {
    return CELTIC_THESES['comprension-sin-movimiento']
  }
  if (has('exceso-control') && (has('agotamiento-sostenido') || has('deseo-bloqueado'))) {
    return CELTIC_THESES['sostener-demasiado']
  }
  if (has('deseo-bloqueado') && has('exceso-control')) {
    return CELTIC_THESES['movimiento-bloqueado']
  }
  if (has('negacion-evidente')) {
    return CELTIC_THESES['algo-ya-paso']
  }
  if (has('ruptura-en-curso')) {
    return CELTIC_THESES['ruptura-en-proceso']
  }
  if (has('patron-vuelve') && (stats.invertedCount >= 2 || has('resistencia-cierre'))) {
    return CELTIC_THESES['patron-cierra-ciclo']
  }

  // 3. Estadísticas extremas
  if (stats.invertedCount >= 4) return CELTIC_THESES['distorsion-por-invertidas']
  if (stats.majorCount >= 4)    return CELTIC_THESES['capitulo-largo']

  // 4. Si hay macro fuerte solo
  if (macros[0]) {
    const single = {
      'tension-mental-dominante':  CELTIC_THESES['tension-mental-sin-direccion'],
      'agotamiento-sostenido':     CELTIC_THESES['desgaste-cronico'],
      'claridad-retenida':         CELTIC_THESES['comprension-sin-movimiento'],
      'exceso-control':            CELTIC_THESES['sostener-demasiado'],
      'negacion-evidente':         CELTIC_THESES['algo-ya-paso'],
      'ruptura-en-curso':          CELTIC_THESES['ruptura-en-proceso'],
      'patron-vuelve':             CELTIC_THESES['patron-cierra-ciclo']
    }
    if (single[macros[0].key]) return single[macros[0].key]
  }

  // Fallback
  return 'Esta lectura no resuelve — distingue. Lo que sigue depende de qué te animes a ver primero.'
}


/* =================================================================
 *  NÚCLEO RELACIONAL — carta 1 (presente) + carta 2 (cruz) como
 *  RELACIÓN, no suma. Detecta el tipo de cruce y produce una frase
 *  que muestra cómo una carta actúa sobre la otra.
 * ================================================================ */

function detectCoreRelation(c1, c2) {
  const r1 = c1.energy?.rhythm
  const r2 = c2.energy?.rhythm
  const m1 = c1.attrs?.movementType
  const m2 = c2.attrs?.movementType
  const inv1 = isReversed(c1)
  const inv2 = isReversed(c2)
  const major2 = isMajor(c2)
  const suit1 = c1.suit
  const suit2 = c2.suit

  // Sabotaje silencioso: c2 invertida
  if (inv2 && !inv1)                                  return 'sabotea'
  // Aceleración: c2 rápida, c1 lenta o estable
  if (r2 === 'fast' && (r1 === 'slow' || r1 === 'stable')) return 'acelera'
  // Frenado: c2 lenta o suspendida, c1 rápida o en avance
  if ((r2 === 'slow' || m2 === 'suspensión') && r1 === 'fast') return 'frena'
  // Espadas cortando afecto: c2 espadas, c1 copas
  if (suit2 === 'Espadas' && suit1 === 'Copas')       return 'corta-afecto'
  // Mental sobre cuerpo: c2 mental, c1 emocional/somatica
  if (c2.attrs?.tensionType === 'mental' && (c1.attrs?.tensionType === 'emocional' || c1.attrs?.tensionType === 'somática')) return 'mentaliza'
  // Mayor cruzando carta del día
  if (major2 && !isMajor(c1))                         return 'eleva-a-capítulo'
  // Dos Mayores cruzados: capítulo doble
  if (major2 && isMajor(c1))                          return 'doble-capítulo'
  // Choque de palos opuestos
  if (suit2 === 'Bastos' && suit1 === 'Oros')         return 'incendia-estabilidad'
  if (suit2 === 'Oros' && suit1 === 'Bastos')         return 'aterriza-fuego'
  // Default: tensión simple
  return 'tensiona'
}

const CORE_LINES = {
  'sabotea': (c1, c2, e1, e2) =>
    `En el centro: ${e1 || cardName(c1).toLowerCase()}. Pero ${cardName(c2)} cae invertida, y eso desfigura todo el cruce — la carta que tendría que dar fricción honesta está haciendo otra cosa por debajo: sabotear, no atravesar.`,
  'acelera': (c1, c2, e1, e2) =>
    `${cardName(c2)} acelera algo que ${cardName(c1)} todavía estaba tratando de entender. La fricción no es entre dos verdades: es entre dos tiempos.`,
  'frena': (c1, c2, e1, e2) =>
    `${cardName(c2)} frena algo que ${cardName(c1)} venía moviendo casi sin darte cuenta. Lo que se cruza no es obstáculo: es el cuerpo pidiendo pausa.`,
  'corta-afecto': (c1, c2, e1, e2) =>
    `${cardName(c1)} es afectivo en el centro — ${e1}. Lo cruza ${cardName(c2)}, que decide con la cabeza lo que el corazón todavía está sintiendo. El choque no es de quién tiene razón: es de qué órgano está al mando hoy.`,
  'mentaliza': (c1, c2, e1, e2) =>
    `Lo que está pasando es del cuerpo (${cardName(c1)}, ${e1}), y la cabeza ya armó tres explicaciones para no sentirlo. ${cardName(c2)} no aclara: anestesia.`,
  'eleva-a-capítulo': (c1, c2, e1, e2) =>
    `En el centro: ${e1 || cardName(c1).toLowerCase()}. Lo cruza un Arcano Mayor — ${cardName(c2)}, ${e2 || 'un capítulo entero'} — así que la fricción no es del día. Es de meses, y la lectura empieza a entender que la pregunta era más grande de lo que parecía.`,
  'doble-capítulo': (c1, c2, e1, e2) =>
    `Dos Arcanos Mayores en el centro: ${cardName(c1)} y ${cardName(c2)}. La pregunta no es de escena, es de capítulo doble — dos hilos importantes están cruzándose al mismo tiempo, y conviene leer despacio cuál sostiene a cuál.`,
  'incendia-estabilidad': (c1, c2, e1, e2) =>
    `${cardName(c1)} en el centro es estructura, lo material — ${e1}. Lo cruza ${cardName(c2)}: el fuego viene a desordenar la estabilidad. No es accidente, es propósito.`,
  'aterriza-fuego': (c1, c2, e1, e2) =>
    `${cardName(c1)} venía con impulso — ${e1}. Lo cruza ${cardName(c2)}, la realidad concreta: cuerpo, dinero, oficio. El sueño tiene que aprender a caminar.`,
  'tensiona': (c1, c2, e1, e2) =>
    `En el centro: ${e1 || cardName(c1).toLowerCase()}. Lo cruza ${cardName(c2)} — ${e2 || 'no como sorpresa, como sombra'}. La fricción es real y vale la pena nombrarla antes de seguir.`
}

export function buildCoreRelation(slot0, slot1, content0, content1) {
  const c1 = slot0?.card || slot0
  const c2 = slot1?.card || slot1
  if (!c1 || !c2) return ''
  const e1 = essenceLower(c1, content0)
  const e2 = essenceLower(c2, content1)
  const rel = detectCoreRelation(c1, c2)
  const fn = CORE_LINES[rel] || CORE_LINES['tensiona']
  return fn(c1, c2, e1, e2)
}


/* =================================================================
 *  FUERZAS QUE EMPUJAN — posiciones 2 (corona), 4 (pasado), 5 (futuro)
 *
 *  Lee las tres como un sistema de empuje: qué insiste desde atrás,
 *  qué se está pensando como aspiración, qué se acerca.
 * ================================================================ */

export function buildPushingForces(slots, contents) {
  // posiciones: 2=crown, 4=past, 5=future
  const crown  = slots[2]?.card || slots[2]
  const past   = slots[4]?.card || slots[4]
  const future = slots[5]?.card || slots[5]
  if (!crown && !past && !future) return ''

  const eCrown  = essenceLower(crown,  contents?.[2])
  const ePast   = essenceLower(past,   contents?.[4])
  const eFuture = essenceLower(future, contents?.[5])

  // Detectar coherencia entre las tres
  const sameTension = past && future &&
    past.attrs?.tensionType === future.attrs?.tensionType &&
    past.attrs?.tensionType !== 'ninguna'
  const movingForward = future?.attrs?.movementType === 'avance' || future?.attrs?.movementType === 'circulación'
  const oldHabit = past?.attrs?.movementType === 'repetición' ||
                   (past?.attrs?.relationalTags || []).includes('repite-gesto')

  let opener
  if (oldHabit) {
    opener = `Desde atrás insiste ${cardName(past).toLowerCase()} (${ePast || 'algo viejo'}): un gesto que ya hiciste varias veces y todavía estás haciendo.`
  } else {
    opener = `Lo que viene de atrás todavía empuja — ${ePast || cardName(past).toLowerCase()}.`
  }

  const middle = crown
    ? ` Y lo que estás sosteniendo como aspiración o como pensamiento consciente es ${eCrown || cardName(crown).toLowerCase()}.`
    : ''

  let end = ''
  if (future) {
    if (movingForward) {
      end = ` En lo próximo asoma ${eFuture || cardName(future).toLowerCase()} — eso no espera más, va a empezar a notarse afuera.`
    } else {
      end = ` Y en lo próximo asoma ${eFuture || cardName(future).toLowerCase()}, que no acelera la situación sino que la profundiza.`
    }
  }

  let coherence = ''
  if (sameTension && past.attrs.tensionType === 'mental') {
    coherence = ' Las tres son cartas mentales: lo que empuja no es ola, es discurso interno.'
  } else if (sameTension && past.attrs.tensionType === 'emocional') {
    coherence = ' Las tres se mueven en lo afectivo: el empuje tiene cuerpo, no argumento.'
  }

  return `${opener}${middle}${end}${coherence}`
}


/* =================================================================
 *  FUERZAS QUE RETIENEN — posiciones 3 (base), 7 (entorno), 8 (inner)
 *
 *  Lee la raíz inconsciente, el entorno y el miedo/esperanza interno.
 *  Esto es lo que pesa sin moverse.
 * ================================================================ */

export function buildHoldingForces(slots, contents) {
  const found = slots[3]?.card || slots[3]   // foundation
  const env   = slots[7]?.card || slots[7]   // environment
  const inner = slots[8]?.card || slots[8]   // inner
  if (!found && !env && !inner) return ''

  const eFound = essenceLower(found, contents?.[3])
  const eEnv   = essenceLower(env,   contents?.[7])
  const eInner = essenceLower(inner, contents?.[8])

  let opener = ''
  if (found) {
    opener = `Por debajo, sosteniéndolo todo desde antes que la pregunta: ${eFound || cardName(found).toLowerCase()}. Esa es la raíz — lo que ya estaba ahí cuando llegaste a esto.`
  }

  let envLine = ''
  if (env) {
    // Si el entorno tiene dirección distinta a self, mencionamos
    const self = slots[6]?.card || slots[6]
    const dirDiffer = self && env && self.energy?.direction && env.energy?.direction &&
                      self.energy.direction !== env.energy.direction
    if (dirDiffer) {
      envLine = ` El entorno no acompaña — ${eEnv || cardName(env).toLowerCase()}: personas o lugares moviéndose para el otro lado, y eso cansa más de lo que reconoces.`
    } else {
      envLine = ` Lo que rodea — ${eEnv || cardName(env).toLowerCase()} — confirma el clima interno, no lo desafía.`
    }
  }

  let innerLine = ''
  if (inner) {
    const tenseInner = inner.energy?.temperature === 'tense'
    if (tenseInner) {
      innerLine = ` Y en el lugar más íntimo, pesa ${eInner || cardName(inner).toLowerCase()}: estás cargando un miedo que afuera todavía no se confirmó.`
    } else {
      innerLine = ` Y en el lugar más íntimo, late ${eInner || cardName(inner).toLowerCase()} — eso que aún no dices a nadie pero ya está moviéndote por dentro.`
    }
  }

  return `${opener}${envLine}${innerLine}`
}


/* =================================================================
 *  CARTAS DOMINANTES — qué reconfigura toda la lectura
 *
 *  Detecta:
 *   - Mayor con peso simbólico fuerte (Torre, Muerte, Diablo, Luna, Sol)
 *   - Palo con 4+ cartas
 *   - 4+ Mayores totales
 *   - Cartas manifiesto en posiciones críticas (1, 2, 9, 10)
 * ================================================================ */

const MAJOR_WEIGHTS = {
  'La Torre':      'reconfigura la lectura entera. Esto se está cayendo y todo lo demás se está acomodando alrededor del derrumbe',
  'La Muerte':     'reconfigura la lectura entera. Algo termina, y todas las otras cartas están leyendo cómo se vive ese fin',
  'El Diablo':     'reconfigura la lectura entera. Hay una atadura central, y todas las otras cartas son cómo se manifiesta',
  'La Luna':       'reconfigura la lectura entera. La niebla está en el centro, y todo lo demás se está leyendo a través de ella',
  'La Sacerdotisa':'reconfigura la lectura entera. Hay un saber retenido en el centro, y las demás cartas son lo que pesa al guardarlo',
  'El Loco':       'reconfigura la lectura entera. Hay un salto en curso, y las demás cartas leen cómo se vive ese vacío previo',
  'El Mundo':      'reconfigura la lectura entera. Algo se está completando, y todas las demás cartas son partes del cierre'
}

export function buildDominantCards({ enriched, stats, slots }) {
  // 1. Buscar Arcano Mayor manifiesto en posiciones críticas (1, 2, 9, 10)
  const criticalPositions = [0, 1, 8, 9]
  let manifest = null
  for (const i of criticalPositions) {
    const c = slots[i]?.card || slots[i]
    if (c && MAJOR_WEIGHTS[c.name]) {
      manifest = { card: c, position: i }
      break
    }
  }
  if (manifest) {
    const posName = ['en el centro', 'cruzando todo', 'en lo que cargás internamente', 'en la dirección final'][criticalPositions.indexOf(manifest.position)]
    return `${cardName(manifest.card)} ${posName}: ${MAJOR_WEIGHTS[manifest.card.name]}.`
  }

  // 2. Si hay 4+ Mayores, la lectura es de capítulos múltiples
  if (stats.majorCount >= 4) {
    return `Hay ${stats.majorCount} Arcanos Mayores en la tirada. La pregunta no es del día — son varios hilos grandes pasando al mismo tiempo, y conviene no aplastarlos en una sola explicación.`
  }

  // 3. Palo dominante (4+)
  if (stats.dominantSuit?.count >= 4) {
    const suit = stats.dominantSuit.suit
    const SUIT_DOMINANCE = {
      Espadas: `Las Espadas aparecen ${stats.dominantSuit.count} veces. La lectura intenta resolver mentalmente algo que ya agotó el pensamiento. Pensar más no va a aclarar más.`,
      Copas:   `Hay ${stats.dominantSuit.count} cartas de Copas. Todo lo que aparece es afectivo, aunque la pregunta no se haya formulado así. La cabeza está fuera del centro hoy.`,
      Bastos:  `Hay ${stats.dominantSuit.count} cartas de Bastos. La lectura late en el deseo y el impulso — y el problema no es si hay energía, es hacia dónde apunta.`,
      Oros:    `Hay ${stats.dominantSuit.count} cartas de Oros. Esto pide cuerpo, oficio, recurso. Las decisiones simbólicas no van a alcanzar: la respuesta es material.`
    }
    return SUIT_DOMINANCE[suit] || ''
  }

  // 4. Palo con 3 cartas + otra del mismo tipo afín
  if (stats.dominantSuit?.count === 3) {
    const suit = stats.dominantSuit.suit
    return `${stats.dominantSuit.count} cartas de ${suit} marcan el eje de la lectura — el centro de gravedad simbólica está ahí, aunque la pregunta haya empezado de otro lado.`
  }

  return ''
}


/* =================================================================
 *  SISTEMA DE INVERTIDAS — qué se distorsiona
 *
 *  Las invertidas modifican la hipótesis principal según el patrón:
 *   - dominancia (cuántas hay)
 *   - tipo (Mayor invertida vs Menor invertida)
 *   - palo de las invertidas
 *   - posición (push o hold)
 * ================================================================ */

export function buildInvertedSystem({ slots, enriched, stats }) {
  if (stats.invertedCount === 0) return ''

  const inverted = enriched.filter(isReversed)
  const invertedMajors = inverted.filter(isMajor)
  const invertedSuits = {}
  for (const c of inverted) {
    if (c.suit) invertedSuits[c.suit] = (invertedSuits[c.suit] || 0) + 1
  }

  // Posiciones de las invertidas: ¿push o hold?
  const pushPositions = [2, 4, 5]        // crown, past, future
  const holdPositions = [3, 7, 8]        // foundation, environment, inner
  let pushInverted = 0, holdInverted = 0
  enriched.forEach((c, i) => {
    if (isReversed(c)) {
      if (pushPositions.includes(i)) pushInverted++
      if (holdPositions.includes(i)) holdInverted++
    }
  })

  // CASO 1: ≥4 invertidas — la lectura está distorsionada entera
  if (stats.invertedCount >= 4) {
    return `Hay ${stats.invertedCount} cartas invertidas: la lectura entera está pasando por un filtro. La energía no desaparece — se desvía. El problema ya no parece falta de claridad: parece resistencia a actuar sobre algo que ya se entendió, y esa resistencia está coloreando todo.`
  }

  // CASO 2: 3 invertidas — hipótesis modificada
  if (stats.invertedCount === 3) {
    if (pushInverted >= 2) {
      return 'Tres cartas invertidas, dos en las posiciones que empujan. Lo que tendría que estar moviéndose — el pasado, el futuro próximo, la aspiración — está distorsionado. La lectura no muestra incapacidad para avanzar; muestra que lo que avanza está saliendo torcido.'
    }
    if (holdInverted >= 2) {
      return 'Tres cartas invertidas, dos en las posiciones que retienen. Lo que sostiene desde abajo está agitado: la raíz inconsciente, el entorno o el miedo interno están haciendo más ruido que la situación de superficie. Lo que pesa hoy no es lo que se ve.'
    }
    if (invertedMajors.length >= 2) {
      return `Tres cartas invertidas, ${invertedMajors.length} de ellas Arcanos Mayores. Lo simbólico está al revés: los capítulos importantes no están saliendo en su forma directa. Esto pide tiempo, no decisión.`
    }
    return 'Tres cartas invertidas cambian la dirección emocional de la lectura. Lo que parecía pregunta directa pasó a ser pregunta sobre la propia resistencia.'
  }

  // CASO 3: 2 invertidas — modifica el matiz
  if (stats.invertedCount === 2) {
    if (invertedMajors.length === 2) {
      return `Dos Arcanos Mayores invertidos: ${cardName(invertedMajors[0])} y ${cardName(invertedMajors[1])}. Los hilos grandes están saliendo torcidos. La lectura pesa porque ninguno de los dos llega en su forma limpia.`
    }
    const suitsEntries = Object.entries(invertedSuits)
    if (suitsEntries.length === 1 && suitsEntries[0][1] === 2) {
      const suit = suitsEntries[0][0]
      const SUIT_INV = {
        Espadas: 'Dos Espadas invertidas. Lo mental está atascado o se está enfriando hasta perder filo: las decisiones no están saliendo, están quedándose en relato.',
        Copas:   'Dos Copas invertidas. El afecto se está desregulando — o se desborda sin sostén o se cierra sin razón clara. Lo emocional no fluye.',
        Bastos:  'Dos Bastos invertidos. El impulso se apagó o se atropelló: hay fuego que no rinde y eso es lo que está cansando.',
        Oros:    'Dos Oros invertidos. Lo concreto se desordenó — recursos, cuerpo, rutina pidiendo revisión que llevas postergando.'
      }
      return SUIT_INV[suit] || ''
    }
    return 'Dos cartas invertidas matizan toda la lectura. La energía no desaparece: se desvía. Conviene leer despacio qué de lo que aparece se está saliendo de su forma directa.'
  }

  // CASO 4: 1 invertida
  if (stats.invertedCount === 1) {
    const inv = inverted[0]
    if (isMajor(inv)) {
      return `${cardName(inv)} cae invertida — es la única, y por eso pesa: un Arcano Mayor distorsionado marca dónde se está perdiendo claridad en una lectura que en general es directa.`
    }
    return ''  // 1 invertida menor no merece sección dedicada
  }

  return ''
}


/* =================================================================
 *  SITUACIONES HUMANAS — escenas concretas que la tirada sugiere
 *
 *  Cada macro detectado mapea a 2 escenas observables. Lo que aparece
 *  son comportamientos reales, no símbolos abstractos.
 * ================================================================ */

const HUMAN_SCENES = {
  'tension-mental-dominante': [
    'seguir una conversación que ya agotó hace tres mensajes',
    'releer un mail tres veces antes de responder',
    'tener la misma discusión interna en distintas habitaciones'
  ],
  'contencion-emocional': [
    'sentir el nudo en la garganta y ofrecer café',
    'cuidar a alguien para no tener que decirle que algo no está bien',
    'guardar una verdad porque decirla cambiaría demasiadas cosas a la vez'
  ],
  'dificultad-cerrar': [
    'volver a una conversación que ya tuvo su última versión',
    'mantener el número guardado de alguien con quien ya no hablas',
    'rearmar mentalmente cómo podría haber sido distinto'
  ],
  'exceso-control': [
    'organizar el escritorio cuando lo que cuesta es decidir',
    'asignar todas las tareas para no tener que pedir ayuda',
    'corregir al otro en algo chico cuando lo que molesta es algo grande'
  ],
  'claridad-retenida': [
    'tener un comentario armado y no decirlo en la reunión',
    'saber qué decisión va a tomarse y aún así callar para evitar la incomodidad',
    'esperar que el otro adivine lo que ya viste hace semanas'
  ],
  'evasion-activa': [
    'responder rápido para evitar sentir',
    'cambiar de tema cuando alguien acerca un punto que duele',
    'irse físicamente del lugar cuando la conversación se pone densa'
  ],
  'agotamiento-sostenido': [
    'aceptar una invitación con energía que no tienes',
    'levantarte cansada antes de empezar el día',
    'romperte hacer la cosa simple que llevas semanas postergando'
  ],
  'deseo-bloqueado': [
    'mirar lo que quieres hacer y argumentar por qué no es el momento',
    'pedirle permiso interno a alguien que ni siquiera te lo está negando',
    'ahogar las ganas con razones que sonaban bien hasta que las dijiste en voz alta'
  ],
  'patron-vuelve': [
    'darte cuenta de que es la cuarta vez que tienes esta misma sensación',
    'reconocer la voz interna que dice "esto ya pasó" y desestimarla',
    'empezar algo nuevo en el lugar exacto donde el anterior se cayó'
  ],
  'resistencia-cierre': [
    'mantener un acuerdo que sabes que ya no aplica',
    'asistir a un evento por inercia con quien ya no quieres ver',
    'sostener un proyecto porque cerrarlo daría vergüenza'
  ],
  'proyeccion-afuera': [
    'criticar a alguien por algo que tu pareja te dijo la semana pasada',
    'detectar fragilidad en otra persona y juzgarla porque te recuerda a ti',
    'ofenderse por un gesto del otro que casualmente tú estás haciendo'
  ],
  'decision-postergada': [
    'leer el mismo mensaje pendiente cada noche y no responder',
    'pedir consejo sin estar dispuesta a hacerle caso a ninguno',
    'mantener dos opciones abiertas para no tener que perder ninguna'
  ],
  'negacion-evidente': [
    'reconstruir cronológicamente por qué la versión real no es la real',
    'pedirle a alguien que confirme lo que ya sabes que no es así',
    'esperar que el tiempo deshaga lo que el cuerpo ya registró'
  ],
  'ruptura-en-curso': [
    'notar que algo cruje y seguir con la rutina como si no',
    'recibir la señal clara y decidir que "todavía no"',
    'sentir el alivio raro de no poder seguir sosteniendo'
  ],
  'reparacion-en-curso': [
    'aceptar una mano que antes habrías rechazado',
    'descansar sin culpa por primera vez en meses',
    'permitirte una alegría sin esperar la próxima caída'
  ],
  'vinculo-en-juego': [
    'hablar de cualquier cosa con tal de no nombrar lo que pasa entre ustedes',
    'medir lo que se dice a alguien específico antes de decirlo',
    'tener la sensación de que la próxima conversación con esa persona cambia algo'
  ],
  'avance-ciego': [
    'aceptar antes de leer bien',
    'comprometerte para no tener que seguir pensándolo',
    'moverte rápido para que no te alcance la duda'
  ]
}

export function buildHumanScenes(macros, seed = 0) {
  if (!macros || macros.length === 0) return []

  const scenes = []
  // Tomamos los 3 macros más fuertes y de cada uno 1 escena (rotación por seed)
  const top = macros.slice(0, 3)
  for (let i = 0; i < top.length; i++) {
    const m = top[i]
    const list = HUMAN_SCENES[m.key]
    if (list && list.length > 0) {
      const idx = (seed + i) % list.length
      scenes.push(list[idx])
    }
  }
  return scenes
}


/* =================================================================
 *  CIERRE NARRATIVO — eco + dirección posible
 *
 *  Sin moraleja, sin frase zen, sin consejo. Solo síntesis de tensión
 *  + una pista de hacia dónde podría aflojar.
 * ================================================================ */

const CLOSING_BY_THESIS_PATTERN = {
  'desgaste-cronico':
    'La lectura no muestra incapacidad para avanzar. Muestra el cansancio de seguir intentando hacerlo sin soltar nada.',
  'tension-mental-sin-direccion':
    'Esta tirada no pide otra ronda de análisis. Pide que la cabeza acepte que ya hizo su parte, y que lo que sigue no se decide pensando más.',
  'comprension-sin-movimiento':
    'Lo que falta no es entender. Es la cosa simple y costosa de actuar sobre lo que ya entendiste, aunque mover algo afuera sea más caro que rumiarlo por dentro.',
  'sostener-demasiado':
    'La pregunta no es cuánto más puedes sostener. Es a qué parte de ti le pertenece soltar primero — antes de que la situación elija por ti.',
  'movimiento-bloqueado':
    'La pelea no es con afuera. Es entre dos partes tuyas, y cualquiera que gane sin escuchar a la otra va a tener que volver a esta lectura más adelante.',
  'algo-ya-paso':
    'Hay una versión que ya pasó. La lectura sugiere quedarte con la nueva, aunque sea más fea — la vieja ya no es real, solo es cara de mantener.',
  'ruptura-en-proceso':
    'Lo que está cayendo se cae solo si dejás de empujarlo a quedarse. La energía que ponés en sostenerlo es la misma que necesitás para lo que viene después.',
  'distorsion-por-invertidas':
    'No es momento de decidir nada importante hoy. Lo que la lectura dice está pasando filtros, y forzar una conclusión sería elegir desde algo que aún no terminó de mostrarse.',
  'capitulo-largo':
    'Esto pide tiempo, no más esfuerzo. Las decisiones grandes no caben en una semana, y cualquier cosa que se apure ahora va a tener que rehacerse.',
  'patron-cierra-ciclo':
    'Si esta es la última escena del patrón, el trabajo no es resolver la escena: es decidir si vas a aceptar el cierre, o si vas a buscarle un quinto reparto.'
}

/* Mapeo macro key → thesis pattern key, para que el cierre se elija
   coherente cuando la tesis vino del cruce icónico u otra vía. */
const MACRO_TO_THESIS = {
  'tension-mental-dominante':  'tension-mental-sin-direccion',
  'agotamiento-sostenido':     'desgaste-cronico',
  'claridad-retenida':         'comprension-sin-movimiento',
  'exceso-control':            'sostener-demasiado',
  'deseo-bloqueado':           'movimiento-bloqueado',
  'negacion-evidente':         'algo-ya-paso',
  'ruptura-en-curso':          'ruptura-en-proceso',
  'patron-vuelve':             'patron-cierra-ciclo',
  'dificultad-cerrar':         'sostener-demasiado',
  'resistencia-cierre':        'sostener-demasiado',
  'evasion-activa':            'comprension-sin-movimiento',
  'contencion-emocional':      'comprension-sin-movimiento',
  'decision-postergada':       'tension-mental-sin-direccion',
  'avance-ciego':              'movimiento-bloqueado'
}

export function buildClosing(thesisKey, macros, stats) {
  // 1. Si la tesis viene del catálogo, usamos su cierre
  if (CLOSING_BY_THESIS_PATTERN[thesisKey]) {
    return CLOSING_BY_THESIS_PATTERN[thesisKey]
  }

  // 2. Distorsión fuerte por invertidas
  if (stats.invertedCount >= 4) {
    return CLOSING_BY_THESIS_PATTERN['distorsion-por-invertidas']
  }

  // 3. Combinaciones de macros — los dos primeros más fuertes
  if (macros && macros.length >= 2) {
    const m1 = macros[0].key, m2 = macros[1].key
    if ((m1 === 'agotamiento-sostenido' && m2 === 'dificultad-cerrar') ||
        (m1 === 'dificultad-cerrar' && m2 === 'agotamiento-sostenido')) {
      return CLOSING_BY_THESIS_PATTERN['desgaste-cronico']
    }
    if ((m1 === 'claridad-retenida' && m2 === 'evasion-activa') ||
        (m1 === 'evasion-activa' && m2 === 'claridad-retenida')) {
      return CLOSING_BY_THESIS_PATTERN['comprension-sin-movimiento']
    }
  }

  // 4. Macro dominante mapeado a tesis
  if (macros && macros[0]) {
    const mappedKey = MACRO_TO_THESIS[macros[0].key]
    if (mappedKey && CLOSING_BY_THESIS_PATTERN[mappedKey]) {
      return CLOSING_BY_THESIS_PATTERN[mappedKey]
    }
  }

  return 'Lo que la tirada deja no es una respuesta. Es una pregunta más afilada que la que trajiste, y conviene quedarte un día más con ella antes de moverte.'
}


/* =================================================================
 *  API PRINCIPAL
 *
 *  Recibe slots (con .card, .reversed y opcionalmente .content),
 *  enriquecidos (.energy, .attrs), macros, stats, crossing fuerte.
 *
 *  Devuelve un INFORME de 8 capas que la UI renderiza con jerarquía.
 * ================================================================ */

export function composeCelticInformReport({ slots, enriched, contents, macros, stats, crossing, seed = 0 }) {
  // Tesis principal
  const thesis = generateCelticThesis({ macros, stats, enriched, crossing })

  // Identificar la "key" de la tesis para que el cierre sea coherente
  const thesisKey = Object.entries(CELTIC_THESES).find(([_, v]) => v === thesis)?.[0]

  // Núcleo
  const core = buildCoreRelation(slots[0], slots[1], contents?.[0], contents?.[1])

  // Fuerzas
  const pushing = buildPushingForces(enriched, contents)
  const holding = buildHoldingForces(enriched, contents)

  // Cartas dominantes
  const dominants = buildDominantCards({ enriched, stats, slots: enriched })

  // Invertidas como modificador
  const inversions = buildInvertedSystem({ slots: enriched, enriched, stats })

  // Situaciones humanas
  const scenes = buildHumanScenes(macros, seed)

  // Cierre
  const closing = buildClosing(thesisKey, macros, stats)

  return {
    thesis,
    core,
    pushing,
    holding,
    dominants,
    inversions,
    scenes,
    closing,
    macros
  }
}
