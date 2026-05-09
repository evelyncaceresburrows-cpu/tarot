/* =====================================================================
 * majorArcanaSymbolic.js — Dataset maestro
 *
 * Fuente:    Manual Rider-Waite-Smith (Rimi Jiménez Nallde, "Equilibrio
 *            y Sabiduría") como referencia simbólica y arquetípica.
 * Tono app:  íntimo, contemplativo, editorial, emocional, no predictivo.
 *
 * Schema por carta:
 *   {
 *     name, number,
 *     essence:             string         ← tagline, 1 frase
 *
 *     traditionalMeanings: string[]       ← extraídos del manual
 *     archetypes:          string[]       ← figura central / arquetipo
 *     emotionalThemes:     string[]       ← lo emocional que activa
 *     manifestations:      string[]       ← cómo se vive en lo cotidiano
 *     shadows:             string[]       ← sombra / lectura invertida
 *     visualSymbols:       string[]       ← elementos icónicos de la lámina
 *
 *     reading:             string         ← lectura breve, ~3 oraciones
 *     synthesis:           string         ← esencia emocional, 1-2 oraciones
 *     extension:           string         ← capa más íntima, párrafo
 *     prompt:              string         ← pregunta reflexiva, sin respuesta
 *
 *     positions: { whatIs, whatCrosses, whatOpens }
 *   }
 *
 * Reglas de redacción:
 *   - Nunca copiar el manual literalmente.
 *   - Traducir el simbolismo a experiencia emocional humana.
 *   - Evitar lenguaje predictivo. Usar "podría", "quizás".
 *   - Sin coaching, sin ensayo espiritual, sin tono académico.
 *
 * Orden:    Numérico (0 → XXI). Bloques temáticos comentados como apoyo
 *           narrativo, no como agrupación dura.
 * ===================================================================*/

export const majorArcanaSymbolic = [
  {
    name:    'El Loco',
    number:  '0',
    essence: 'Un joven a un paso del vacío, mirando al cielo, sin ver el borde.',

    traditionalMeanings: [
      'Aventura',
      'Riesgo asumido',
      'Libertad',
      'Inicio de un ciclo',
      'Inocencia activa',
      'Salto al vacío con confianza'
    ],
    archetypes: [
      'El peregrino que parte sin mapa',
      'El iniciado que aún no sabe qué va a aprender',
      'La inocencia que precede a toda experiencia'
    ],
    emotionalThemes: ['Apertura', 'Vértigo dulce', 'Confianza sin garantías', 'Liviandad', 'Desapego del antes'],
    manifestations: [
      'Renunciar a un trabajo sin tener plan B',
      'Ignorar alarmas evidentes en una relación nueva',
      'Sentir una ligereza eufórica tras perderlo todo'
    ],
    shadows: [
      'Negligencia pura, estupidez disfrazada de fe ciega.',
      'El riesgo es leerla como reducirlo a "nuevos y felices comienzos".',
      'Conviene no caer en "Viene un viaje divertido" o "eres un espíritu libre".'
    ],
    visualSymbols: [
      'El precipicio a sus pies — el riesgo asumido con liviandad',
      'El perro blanco — instinto que avisa, no que detiene',
      'El bolso pequeño — la experiencia previa, llevada con humildad',
      'La rosa blanca — la pureza del deseo de empezar',
      'El sol detrás — la energía vital que sostiene el salto'
    ],

    reading: 'Hay un salto que viene, y tu cuerpo lo sabe antes que tu cabeza. Es ese nudo bajo el esternón, exactamente antes de algo que ya no va a tener vuelta. Lo que parece ligereza está mirando hacia adelante con los ojos cerrados.',
    synthesis: 'No es valentía. Es vértigo, y ya empezó.',
    extension: 'El Loco no es bondad ni libertad: es vértigo. Mira la imagen sin maquillarla — un joven con una rosa blanca en la mano, una alforja al hombro, un perro saltando, y el siguiente paso es aire. Su cara mira al cielo, no al suelo: por eso no ve el borde. Eso es la carta entera. La confianza absoluta puesta en una dirección que nadie midió. A veces eso te lleva a un país nuevo. A veces te deja sin trabajo, sin contención, sin red. La carta no juzga el salto: te recuerda que estás a un paso. La pluma roja en su gorro y el sol al fondo dan el aire luminoso del momento — no es trágico, es vertiginoso. A diferencia de La Muerte, aquí no hay luto todavía: solo el vacío previo a la experiencia pura, el último instante antes de saber qué pasa al pisar lo que sigue.',
    prompt: '¿A qué precipicio te estás acercando con los ojos cerrados?',

    positions: {
      whatIs:      'Hay un comienzo, un impulso o una apertura pidiendo lugar.',
      whatCrosses: 'La exigencia de tenerlo todo claro antes de moverse puede paralizar.',
      whatOpens:   'Se abre un terreno nuevo si te permites entrar sin saberlo todo.'
    },

    reversed: {
      essence: 'El joven mira el cielo pero ya no se mueve. La rosa blanca se marchitó.',
      reading: 'El impulso está bloqueado o desbocado, y en cualquiera de los dos casos no escucha. O te paralizaste por miedo y le llamas prudencia, o te lanzaste con tanta euforia que dejaste de oír las señales que el cuerpo ya estaba dándote.',
      synthesis: 'No es libertad. Es huida o parálisis vestida de impulso.',
      prompt: '¿Estás llamando libertad a algo que en realidad es miedo a quedarte? ¿O imprudencia a algo que es no querer ver?',
      manifestations: [
        'Mantener una rutina segura mientras te repites que es una decisión libre',
        'Tomar decisiones importantes en piloto automático, ignorando alarmas que ves de reojo',
        'Saltar de ciudad, trabajo o relación cada vez que algo se vuelve incómodo'
      ],
      shadows: [
        'Se bloquea la confianza honesta — quedó mezclada con miedo o con negación.',
        'Se exagera la imprudencia (no escuchar señales) o la inacción (no moverte de lo conocido).',
        'Se evita mirar el costo real del salto, o el costo real de no saltar nunca.'
      ]
    }
  },

  {
    name:    'El Mago',
    number:  'I',
    essence: 'Tienes más herramientas de las que estás usando.',

    traditionalMeanings: [
      'Voluntad',
      'Acción consciente',
      'Canalización',
      'Inicio activo',
      'Concreción de la intención',
      'Habilidad puesta en gesto'
    ],
    archetypes: [
      'El que sabe que tiene los elementos y elige cuál usar',
      'La voluntad que se enfoca',
      'El cruce entre lo que pensás y lo que haces'
    ],
    emotionalThemes: [
      'Foco',
      'Determinación tranquila',
      'Confianza en lo que sabes hacer',
      'Energía disponible',
      'Claridad de propósito'
    ],
    manifestations: [
      'Manipular una situación usando exclusivamente el lenguaje',
      'Organizar minuciosamente el escritorio antes de un proyecto complejo',
      'Hablar con fluidez para convencer a escépticos'
    ],
    shadows: [
      'Usar la habilidad mental y verbal para estafar o engañar.',
      'El riesgo es leerla como limitarlo a "tienes mucho talento".',
      'Conviene no caer en "Vas a encontrar un trabajo mágico y fácil".'
    ],
    visualSymbols: [
      'La lemniscata sobre la cabeza — energía infinita disponible si se canaliza',
      'Los cuatro elementos sobre la mesa — todo lo necesario ya está al alcance',
      'Una mano hacia arriba, otra hacia abajo — recibir y entregar al mismo tiempo',
      'La banda blanca ceñida pero suelta — disciplina sin opresión',
      'Las rosas y los lirios — deseo y pureza creciendo en el mismo jardín'
    ],

    reading: 'Tienes a mano más de lo que estás usando. Esta carta no te empuja; te recuerda que el punto de partida ya está aquí, esperando un gesto consciente. No es momento de planificar más: es momento de poner la mano sobre algo concreto y empezar.',
    synthesis: 'El poder no es tener: es elegir cómo se usa lo que ya tienes.',
    extension: 'El Mago no inventa nada: ordena lo que ya está. Sobre su mesa están los cuatro elementos —pensamiento, emoción, cuerpo, materia— y su trabajo no es traer más, sino elegir con qué empezar. La lemniscata sobre su cabeza no es magia exterior: es la confirmación de que la energía circula cuando hay un canal claro. Si esta carta aparece, probablemente no te falte nada esencial; lo que falta es el gesto que une intención y acción. La trampa de El Mago es creer que el poder está en demostrar; su sabiduría es saber que el poder está en concretar, aunque nadie esté mirando.',
    prompt: '¿Qué herramienta tuya está sin usar, esperando que la elijas?',

    positions: {
      whatIs:      'Hay voluntad disponible y herramientas concretas para iniciar algo.',
      whatCrosses: 'La dispersión o la búsqueda de aprobación pueden frenar el movimiento.',
      whatOpens:   'Se abre un terreno donde lo intencional puede tomar forma real.'
    },

    reversed: {
      essence: 'La lemniscata se apagó. Los elementos siguen sobre la mesa, pero las manos se quedaron quietas o se mueven sin canal.',
      reading: 'Tienes las herramientas y no las eliges, o las usas para impresionar en lugar de concretar. La voluntad se dispersa en proyectos paralelos, en planificar más, en hablar bonito. Lo que falta no es talento — es el gesto humilde de poner la mano sobre algo y empezar sin público.',
      synthesis: 'El poder sin gesto se vuelve performance.',
      prompt: '¿Qué herramienta tuya estás usando para mostrarte capaz, en vez de para hacer algo concreto?',
      manifestations: [
        'Anunciar un proyecto en redes y dejarlo morir antes de la primera acción real',
        'Saber exactamente cómo se hace algo y postergarlo durante meses por miedo a que no salga perfecto',
        'Convencer con palabras a alguien de algo que tú mismo no terminas de creer ni de hacer'
      ],
      shadows: [
        'Se bloquea la concreción — todo queda en idea brillante o en demostración.',
        'Se exagera la apariencia (vendes la capacidad) o la dispersión (saltas de herramienta en herramienta).',
        'Se evita mirar que el poder real exige sostener algo aunque nadie aplauda.'
      ]
    }
  },

  {
    name:    'La Sacerdotisa',
    number:  'II',
    essence: 'Sentada entre dos pilares, sostiene un pergamino que casi nadie alcanza a leer.',

    traditionalMeanings: ['Intuición', 'Sabiduría interior', 'Misterio', 'Receptividad', 'Conocimiento no verbal', 'Pausa lúcida'],
    archetypes: [
      'La guardiana del umbral interior',
      'La que sabe sin tener que demostrarlo',
      'La pausa que escucha antes de hablar'
    ],
    emotionalThemes: [
      'Recogimiento',
      'Sensibilidad fina',
      'Necesidad de silencio',
      'Atención a lo que no se dice',
      'Confianza en lo intuitivo'
    ],
    manifestations: [
      'Guardar un secreto que cambiaría una dinámica familiar',
      'Observar en silencio cómo alguien miente',
      'Elegir no actuar para ver cómo se desarrolla una crisis'
    ],
    shadows: [
      'Manipulación pasivo-agresiva, aislamiento tóxico.',
      'El riesgo es leerla como "Hazle caso a tu intuición".',
      'Conviene no caer en "Una mujer misteriosa te va a ayudar".'
    ],
    visualSymbols: [
      'Dos columnas, una blanca (J) y una negra (B) — los opuestos que sostiene sin elegir uno',
      'El pergamino con la palabra "Tora" parcialmente cubierto por su manto — el saber que se muestra a medias',
      'La luna creciente a sus pies — el ciclo emocional que regula lo que dice y lo que calla',
      'La cruz solar sobre el pecho — la lucidez en el centro del cuerpo, no en la cabeza',
      'El velo bordado con granadas a su espalda — lo que guarda no está prohibido, está esperando'
    ],

    reading: 'Sabes algo que todavía no dijiste. Lo que callas no es ausencia: es decisión, y la decisión empieza a pesarte en la garganta. Esta carta no te pide hablar — te pregunta cuánto te cuesta no hacerlo.',
    synthesis: 'A veces el silencio es contención. A veces es manipulación. Solo tú sabes cuál.',
    extension: 'La Sacerdotisa no es solo sabiduría: es contención. Mira la imagen — sentada entre las dos columnas blanca y negra, con un pergamino parcialmente oculto bajo el manto, sin gestos, sin señas, sin invitación a entrar. La luna creciente a sus pies marca el ciclo emocional bajo el cual ella regula lo que dice y lo que calla. La cruz solar sobre el pecho dice que su lucidez vive en el cuerpo, no en el discurso. La tensión de esta carta es muy específica: no es secreto romántico, es la pesadez de saber algo que cambiaría una dinámica si lo dijeras. La atmósfera es de templo frío, agua oscura estancada — quietud que también puede volverse aislamiento. A diferencia del Hierofante, que enseña hacia afuera con autoridad ortodoxa, ella es la doctrina interna que no se transmite con palabras. Cuando esta carta aparece, vale la pena distinguir: hay silencios que maduran, y hay silencios que se vuelven manipulación pasiva-agresiva. Solo tú sabes cuál estás sosteniendo.',
    prompt: '¿Qué es eso que ya sabes pero te niegas a decir en voz alta?',

    positions: {
      whatIs:      'Hay una intuición o saber interior pidiendo espacio para escucharse.',
      whatCrosses: 'La urgencia de respuestas o la necesidad de explicar pueden tapar lo que sabes.',
      whatOpens:   'Se abre una comprensión más serena, nacida del silencio y no de la urgencia.'
    },

    reversed: {
      essence: 'El velo se cerró por completo. El pergamino quedó dentro, tan adentro que ya no se lee.',
      reading: 'El silencio dejó de ser contención y se volvió muro. O guardas tanto que ya nadie sabe lo que sientes —incluida tú—, o lo que callas se filtra de otras formas: indirectas, distancias, pequeñas venganzas que no tienen nombre. La intuición no falla; lo que falla es la honestidad de mirarla.',
      synthesis: 'Hay silencios que protegen y hay silencios que castigan. No son lo mismo.',
      prompt: '¿Tu silencio está sosteniendo algo, o ya está usando ese algo en contra de alguien?',
      manifestations: [
        'Decir "no pasa nada" cuando hay algo enorme pasando, y esperar que el otro lo adivine',
        'Aislarte tanto que ya no sabes si es paz o resentimiento lo que estás cuidando',
        'Confundir tener miedo de decir algo con saber que no debe decirse'
      ],
      shadows: [
        'Se bloquea la palabra honesta — lo que se sabe no llega a ser dicho.',
        'Se exagera el repliegue (aislamiento) o la indirecta (silencio que igual castiga).',
        'Se evita mirar el costo del secreto: lo que el otro pierde por no saber, y lo que tú pierdes por sostenerlo.'
      ]
    }
  },

  {
    name:    'La Emperatriz',
    number:  'III',
    essence: 'Lo que cuidas, crece.',

    traditionalMeanings: [
      'Fertilidad',
      'Creación',
      'Abundancia emocional',
      'Sensibilidad',
      'Maternidad simbólica',
      'Conexión con el cuerpo'
    ],
    archetypes: ['La que crea sin apuro', 'La energía creadora que también descansa', 'La sabiduría del cuerpo'],
    emotionalThemes: ['Ternura', 'Gozo tranquilo', 'Sensorialidad', 'Plenitud sin urgencia', 'Cuidado activo'],
    manifestations: [
      'Proveer cuidado excesivo hasta anular al otro',
      'Disfrutar del confort físico ignorando los problemas prácticos',
      'Crear un refugio cálido en medio del caos'
    ],
    shadows: [
      'Dependencia emocional, sobreprotección tóxica y absorbente.',
      'El riesgo es leerla como "Vas a quedar embarazada".',
      'Conviene no caer en "Viene abundancia de dinero y lujo".'
    ],
    visualSymbols: [
      'El trono entre la vegetación — el poder que reposa en lo vivo',
      'La corona de doce estrellas — lo cíclico y femenino, no lo brillante',
      'Las granadas en el vestido — la fertilidad como abundancia interior',
      'El campo de trigo a sus pies — lo que está madurando sin que ella tenga que apurarlo',
      'El símbolo de Venus apoyado, no exhibido — el deseo sereno de crear'
    ],

    reading: 'Hay algo en ti que quiere crear, sostener o cuidar, y lo que pide no es más esfuerzo: pide presencia. Esta carta te invita a habitar el cuerpo, los sentidos, el tiempo lento. Lo que cultivás con cariño, sin medirlo todo el tiempo, está creciendo más de lo que parece.',
    synthesis: 'Crear también es esperar.',
    extension: 'La Emperatriz no produce: gestiona la vida desde adentro. Su trono no está en un palacio, está en medio del bosque, porque el lugar de la creación es el lugar donde algo crece a su propio ritmo. La corona de estrellas y el manto con granadas dicen lo mismo desde dos lados: lo fértil no se decreta, se acompaña. Si esta carta aparece, lo más útil quizás no sea hacer más, sino estar presente con más cariño en lo que ya está siendo. Cuida lo que cuidas también contigo adentro: la maternidad simbólica no es solo hacia afuera. Y permítete el placer de los sentidos: la Emperatriz sabe que sin gozo, lo que se crea se vuelve obligación.',
    prompt: '¿Qué está creciendo en tu vida que solo necesita ser cuidado, no apurado?',

    positions: {
      whatIs:      'Hay un proceso creativo o afectivo que pide cuidado, presencia y tiempo lento.',
      whatCrosses: 'La urgencia o la auto-exigencia pueden bloquear la fertilidad de lo que está naciendo.',
      whatOpens:   'Se abre una etapa más sensorial, donde habitar el cuerpo y el placer es parte del crecimiento.'
    },

    reversed: {
      essence: 'El jardín está descuidado o asfixiado. La Emperatriz cuida lo de afuera y se olvida de su propio cuerpo, o cuida tanto que ahoga lo que crece.',
      reading: 'El cuidado se desreguló. O das tanto que ya no queda jardín para ti, o te encerraste en ti misma y dejas que lo que cuidas se marchite. Lo fértil pide presencia equilibrada, y la presencia se volvió sacrificio o abandono.',
      synthesis: 'Cuidar todo menos a una misma no es generosidad. Es agotamiento con buena prensa.',
      prompt: '¿A quién o qué estás cuidando con una intensidad que ya no es vida, sino control?',
      manifestations: [
        'Cocinar para todos, escuchar a todos, sostener a todos, y llegar al baño a llorar sin saber por qué',
        'Sobreproteger a un hijo, una pareja o un proyecto hasta que ya no respira solo',
        'Dejar de cuidarte —el cuerpo, el descanso, el placer— como si no merecieras ese cuidado tú también'
      ],
      shadows: [
        'Se bloquea el goce simple — lo sensorial pierde lugar bajo la lista de tareas.',
        'Se exagera el sacrificio o el control sobre lo que se cuida; la abundancia se vuelve carga.',
        'Se evita mirar que necesitas recibir, no solo dar.'
      ]
    }
  },

  {
    name:    'El Emperador',
    number:  'IV',
    essence: 'El cuidado también se llama estructura.',

    traditionalMeanings: ['Estructura', 'Orden', 'Estabilidad', 'Autoridad', 'Responsabilidad', 'Límites firmes'],
    archetypes: [
      'El que sostiene',
      'La autoridad que protege en lugar de imponer',
      'La figura que dice sí y no con la misma claridad'
    ],
    emotionalThemes: [
      'Firmeza',
      'Seguridad',
      'Cansancio del que sostiene',
      'Necesidad de límites claros',
      'Responsabilidad asumida'
    ],
    manifestations: [
      'Imponer una regla estricta para ocultar el miedo al desorden',
      'Asumir el mando de una crisis sin pedir permiso a nadie',
      'Sentir el cuerpo tenso por la incapacidad de ceder en una discusión'
    ],
    shadows: [
      'Despotismo, frialdad emocional, incapacidad de mostrar vulnerabilidad.',
      'El riesgo es leerla como "Un hombre mayor te controlará".',
      'Conviene no caer en "Te van a dar un puesto de jefe".'
    ],
    visualSymbols: [
      'El trono de piedra — la base que ya no se mueve',
      'Los carneros tallados en los brazos — la voluntad firme, casi terca',
      'La armadura debajo de la túnica — la disposición a sostener si hace falta',
      'Las montañas áridas — el terreno que se domina sin negar su dureza',
      'El ankh en la mano — el poder usado para preservar la vida, no para imponerla'
    ],

    reading: 'Algo en este momento pide estructura: una decisión clara, un límite que se sostenga, una rutina que ordene. El Emperador no llega a controlar: llega a recordarte que el cuidado también necesita columnas. Poner el peso donde corresponde —y dejar de cargar lo que no es tuyo— es parte de su sabiduría.',
    synthesis: 'Sostener también es una forma de amar.',
    extension: 'El Emperador parece distante, pero su trabajo es serio: hace que las cosas se mantengan. La piedra debajo suyo no es frío, es base; los carneros tallados no son agresivos, son la voluntad firme que no se mueve cuando todo alrededor pide cambios bruscos. Si esta carta aparece, probablemente algo en ti esté pidiendo estructura: un horario, un límite con alguien, una decisión que ya no merece más vueltas. La trampa del Emperador es endurecerse cuando podría simplemente sostener; su sabiduría es entender que el orden no se opone al afecto, lo posibilita. Sin marco, el cuidado se vuelve caos; con demasiado marco, se vuelve ahogo. Esta carta te invita a encontrar el punto donde la firmeza protege en lugar de aprisionar.',
    prompt: '¿Dónde te falta estructura, y dónde te sobra?',

    positions: {
      whatIs:      'Hay una situación que pide orden, decisión clara o límites firmes.',
      whatCrosses: 'El control rígido puede confundirse con cuidado y ahogar lo vivo.',
      whatOpens:   'Se abre la posibilidad de sostener desde la firmeza serena, no desde el miedo.'
    },

    reversed: {
      essence: 'El trono se quedó vacío, o se volvió una jaula. La armadura aprieta a quien debería sostener.',
      reading: 'Hay caos donde pediste orden, o hay rigidez donde pediste cuidado. O abandonaste tu autoridad y todo se está cayendo a los costados, o la usaste para imponer y ya nadie quiere acercarse. La firmeza serena se desfiguró: hacia un lado se volvió tiranía, hacia el otro se volvió ausencia.',
      synthesis: 'La autoridad sin afecto se vuelve cárcel. El afecto sin estructura se vuelve caos.',
      prompt: '¿Dónde te volviste demasiado rígido para no sentirte frágil, o demasiado blando para no enfrentar?',
      manifestations: [
        'Imponer reglas a una pareja, un hijo o un equipo, y notar que se alejaron sin decirlo',
        'Soltar todos los límites por agotamiento y sentir que la vida te está pasando por encima',
        'Llamar "responsabilidad" a un control que en realidad nace de no confiar en nadie'
      ],
      shadows: [
        'Se bloquea el sostén afectivo — la estructura se vuelve fría o desaparece.',
        'Se exagera el control (rigidez, autoritarismo) o el descontrol (abdicación, caos).',
        'Se evita mirar el miedo de fondo: a perder el lugar, a no poder con todo, a no ser querido si dejas de proveer.'
      ]
    }
  },

  {
    name:    'El Hierofante',
    number:  'V',
    essence: 'Hay saberes que se reciben y otros que se cuestionan.',

    traditionalMeanings: ['Tradición', 'Enseñanza', 'Estructura espiritual', 'Mediación', 'Pertenencia', 'Saber transmitido'],
    archetypes: [
      'El maestro que cuida la transmisión',
      'La voz de la tradición',
      'El puente entre lo aprendido y lo propio'
    ],
    emotionalThemes: [
      'Búsqueda de sentido',
      'Tensión con lo recibido',
      'Necesidad de pertenecer',
      'Respeto incómodo',
      'Fidelidad a las propias creencias'
    ],
    manifestations: [
      'Cumplir un rito familiar o social por pura obligación moral',
      'Acatar la norma de una institución aunque parezca obsoleta',
      'Buscar desesperadamente la aprobación de un maestro'
    ],
    shadows: [
      'Conformismo ciego, intolerancia al pensamiento divergente.',
      'El riesgo es leerla como "Te vas a casar por la iglesia".',
      'Conviene no caer en "Ve a la universidad o busca a un cura".'
    ],
    visualSymbols: [
      'Las dos llaves cruzadas a sus pies — lo que abre y lo que cierra del saber recibido',
      'Los dos discípulos arrodillados — la transmisión, el pasaje de generación',
      'El báculo triple — los planos de lo material, lo emocional y lo simbólico',
      'La corona de tres niveles — la jerarquía interna del saber',
      'Las columnas grises — el marco institucional, sólido pero no eterno'
    ],

    reading: 'Hay una tensión entre lo que aprendiste y lo que sientes ahora. Esta carta no te dice que rompas con la tradición: te invita a discernir qué de todo lo recibido todavía te sostiene y qué pide ser revisado. Pertenecer y pensar por una misma no son opuestos.',
    synthesis: 'Heredar no es destino. Es punto de partida.',
    extension: 'El Hierofante guarda algo importante: la memoria de que nadie aprende de cero, que toda búsqueda interior se apoya en saberes anteriores aunque después los reformule. Las dos llaves a sus pies dicen que el saber abre y también cierra: depende de cómo se use. Si esta carta aparece, probablemente haya un cruce entre lo que te enseñaron —en tu familia, en tu profesión, en tu cultura— y lo que estás empezando a sentir como propio. El trabajo no es destruir lo recibido ni acatarlo en bloque: es separar con cuidado, quedarte con lo que te representa y dejar ir lo que ya no. Pertenecer a algo más grande que tú misma no es debilidad; pertenecer sin discernir, sí.',
    prompt: '¿Qué creencia heredada estás sosteniendo por costumbre y no por convicción?',

    positions: {
      whatIs:      'Hay una situación atravesada por la tradición, los mandatos o el saber recibido.',
      whatCrosses: 'Aceptar sin cuestionar —o rebelarse sin discernir— puede simplificar de menos.',
      whatOpens:   'Se abre la posibilidad de elegir, dentro de lo recibido, qué haces tuyo y qué sueltas.'
    },

    reversed: {
      essence: 'El templo se cerró por dentro, o se rompió desde afuera sin haber entendido qué guardaba. Las dos llaves quedaron mezcladas en el piso.',
      reading: 'O cumples una doctrina —familiar, profesional, espiritual— que ya no crees, solo porque romper costaría más, o saliste a romper todo sin haber distinguido qué te servía y qué no. Pertenecer y pensar por una misma se volvieron polos enfrentados, cuando en realidad necesitan convivir.',
      synthesis: 'Acatar sin convicción y rebelarse sin discernir son la misma trampa con distinto traje.',
      prompt: '¿Qué estás repitiendo por costumbre, y qué estás rechazando solo para diferenciarte?',
      manifestations: [
        'Sostener una práctica religiosa, profesional o familiar en piloto automático mientras por dentro ya no crees nada',
        'Cortar lazo con una tradición y descubrir, después, que no tenías nada propio para poner en su lugar',
        'Confundir tu voz con la voz de tu familia y no notar que llevas años repitiendo frases que no son tuyas'
      ],
      shadows: [
        'Se bloquea el discernimiento — todo lo recibido se vuelve verdad o todo se vuelve mentira.',
        'Se exagera la obediencia (sumisión sin convicción) o la rebeldía (rechazo sin examen).',
        'Se evita mirar la tarea adulta: separar lo recibido en lo que sostiene y lo que ya no, una pieza a la vez.'
      ]
    }
  },

  {
    name:    'Los Enamorados',
    number:  'VI',
    essence: 'Elegir también revela quién sos.',

    traditionalMeanings: [
      'Elección',
      'Vínculo significativo',
      'Unión',
      'Coherencia interna',
      'Decisión que define',
      'Polaridad armonizada'
    ],
    archetypes: ['La elección que te define', 'El vínculo como espejo', 'La encrucijada honesta'],
    emotionalThemes: ['Deseo', 'Duda lúcida', 'Sensación de cruce', 'Atracción y responsabilidad', 'Vértigo de elegir'],
    manifestations: [
      'Elegir entre la lealtad a los principios y el deseo instintivo por otro',
      'Mostrarse emocionalmente desnudo y sentir terror al rechazo',
      'La claridad repentina de una afinidad inevitable'
    ],
    shadows: [
      'Quedarse paralizado por el miedo a elegir mal.',
      'El riesgo es leerla como "Es la carta del amor y tu alma gemela".',
      'Conviene no caer en "Vas a tener que elegir entre dos amantes".'
    ],
    visualSymbols: [
      'El ángel sobre las dos figuras — la mirada que sostiene la decisión sin imponerla',
      'El sol detrás del ángel — la conciencia plena de lo que se está eligiendo',
      'El árbol con frutos detrás de la mujer — el deseo y sus consecuencias',
      'El árbol con llamas detrás del hombre — la voluntad y su riesgo',
      'La montaña entre ambos — el eje vertical, la propia conciencia que decide'
    ],

    reading: 'Hay una decisión que ya no es solo sobre lo que quieres, sino sobre quién quieres ser. Esta carta no romantiza el amor ni obliga a elegir rápido: te muestra que toda elección significativa también te define. La pregunta no es solo "qué elijo", sino "desde dónde elijo".',
    synthesis: 'Eliges dos veces: una con lo que dices, otra con lo que dejas de hacer.',
    extension: 'Los Enamorados no son solo una carta de amor: son una carta de coherencia. El ángel que sostiene la escena no decide por las figuras, las observa: lo que se está poniendo en juego no es solo el vínculo, es la propia honestidad. Si esta carta aparece, hay una decisión —vincular, vital, ética— que ya no se puede postergar sin costo. La trampa es esperar que las cosas se acomoden solas o que alguien decida por ti; la sabiduría es entender que toda elección importante también es una declaración sobre quién eres. La paz que viene después no depende de haber acertado; depende de haber elegido despierta.',
    prompt: '¿Qué te pide elegir esta situación, no solo a nivel de afuera, sino a nivel de quién eres?',

    positions: {
      whatIs:      'Hay una elección significativa, vincular o existencial pidiendo definición.',
      whatCrosses: 'Querer evitar el costo de elegir puede prolongar la confusión.',
      whatOpens:   'Se abre una claridad propia cuando eliges desde lo que eres, no desde lo que conviene.'
    },

    reversed: {
      essence: 'El ángel sigue sobre la escena, pero las dos figuras dejaron de mirarse y de mirarse entre sí. La elección se postergó tanto que empezó a tomarse sola.',
      reading: 'No estás eligiendo con honestidad. O sostienes dos cosas a la vez para no perder ninguna, o eliges desde el cálculo —lo que conviene, lo que duele menos, lo que dicen los demás— y el cuerpo lo registra. La carta no te pide acertar: te pide dejar de mentirte sobre el costo de no decidir.',
      synthesis: 'Posponer la elección también es una elección. Una más cara y menos consciente.',
      prompt: '¿Qué decisión estás dejando que el tiempo tome por ti porque enfrentarla obligaría a perder algo?',
      manifestations: [
        'Mantener dos vínculos, dos trabajos o dos ciudades en simultáneo durante meses, llamándolo "todavía estoy viendo"',
        'Decidir según lo que minimice el conflicto inmediato y descubrir, después, que ese era el conflicto',
        'Elegir desde la culpa, desde la deuda o desde el deseo de aprobación, y notar que la decisión no se siente tuya'
      ],
      shadows: [
        'Se bloquea la coherencia entre lo que sientes, lo que dices y lo que haces.',
        'Se exagera la indecisión, o se exagera la elección apurada para librarse de la incomodidad.',
        'Se evita mirar que toda decisión cuesta algo, y que el costo de no decidir suele ser el más alto.'
      ]
    }
  },

  {
    name:    'El Carro',
    number:  'VII',
    essence: 'Avanzar también es disciplina interna.',

    traditionalMeanings: ['Voluntad', 'Avance', 'Disciplina', 'Dominio de impulsos', 'Triunfo del enfoque', 'Movimiento dirigido'],
    archetypes: [
      'El que conduce su propia fuerza',
      'La voluntad que no se dispersa',
      'El movimiento que une fuerzas opuestas'
    ],
    emotionalThemes: [
      'Determinación',
      'Tensión productiva',
      'Sentido de propósito',
      'Resistencia activa',
      'Confianza en el rumbo'
    ],
    manifestations: [
      'Mantener una sonrisa profesional mientras se atraviesa un colapso personal',
      'Obligar a dos equipos rivales a trabajar juntos a la fuerza',
      'Avanzar en un proyecto por pura terquedad, sin disfrutarlo'
    ],
    shadows: [
      'Autocracia emocional, crueldad hacia uno mismo para no mostrar flaqueza.',
      'El riesgo es leerla como "Te vas a comprar un auto nuevo".',
      'Conviene no caer en "Vas a viajar con éxito".'
    ],
    visualSymbols: [
      'Las dos esfinges, blanca y negra — los impulsos opuestos que tira el mismo carro',
      'El dosel estrellado — el cielo que sigue, recordando que el camino tiene marco',
      'La armadura adornada — la firmeza que también es presencia',
      'La luna en los hombros — la sensibilidad que viaja con la voluntad',
      'La ciudad detrás — lo conocido, ya pequeño, que se va dejando atrás'
    ],

    reading: 'Hay un avance posible si sostienes el foco. Esta carta no te promete que el camino sea fácil: te muestra que tienes la fuerza necesaria si no te dispersas. El triunfo aquí no es sobre los otros, es sobre lo que en ti quería ir para todos lados.',
    synthesis: 'No siempre falta fuerza. A veces falta dirección.',
    extension: 'El Carro avanza con dos esfinges tirando en sentidos casi opuestos, y sin embargo se mueve: porque quien va arriba no las pelea, las sostiene. Esa es la verdadera fuerza de esta carta: no la del músculo, la de la dirección. Si aparece, probablemente lo que la situación pide no sea más empuje, sino más enfoque. La trampa es confundir avanzar con dominar; la sabiduría es saber que el carro no se mueve por gritar a las esfinges, sino por mantener firme la rienda y clara la mirada hacia adelante. Y un detalle importante: este avance también descansa, también pausa. La voluntad sin escucha del cuerpo se rompe.',
    prompt: '¿Qué fuerzas internas estás peleando que, en realidad, podrían tirar del mismo carro?',

    positions: {
      whatIs:      'Hay un avance, una dirección o un foco pidiendo sostenerse.',
      whatCrosses: 'La dispersión, la prisa o la dureza pueden agotar el movimiento.',
      whatOpens:   'Se abre un camino real cuando la voluntad se alinea con el cuidado.'
    },

    reversed: {
      essence: 'Las dos esfinges tiran cada una para su lado. El carro se atascó, o avanza a los tumbos atropellando lo que encuentra.',
      reading: 'El avance se descontroló: o no hay rumbo y empujas a ciegas, agotándote, o frenaste por dispersión y miedo y la voluntad se diluyó. La fuerza está. Lo que falta es la rienda — el foco que distingue urgencia de prioridad, esfuerzo de obstinación.',
      synthesis: 'Empujar sin dirección no es valor. Es desgaste vestido de coraje.',
      prompt: '¿Hacia dónde te estás moviendo, y cuándo fue la última vez que verificaste si ese rumbo todavía es el tuyo?',
      manifestations: [
        'Trabajar muchas horas en un proyecto sin parar a preguntar si todavía tiene sentido',
        'Sentirte parado en una intersección sin moverte, viendo pasar oportunidades porque no eliges ninguna',
        'Avanzar atropellando a quien tienes al lado para llegar primero a un lugar que después no sabes por qué querías'
      ],
      shadows: [
        'Se bloquea el alineamiento entre voluntad y rumbo — hay esfuerzo sin destino claro.',
        'Se exagera la prisa o la inercia; ambas vacían el viaje.',
        'Se evita mirar que liderarte a ti misma incluye saber cuándo parar y revisar la ruta.'
      ]
    }
  },

  {
    name:    'La Fuerza',
    number:  'VIII',
    essence: 'La suavidad también puede dominar.',

    traditionalMeanings: [
      'Coraje sereno',
      'Fuerza interior',
      'Dominio amable',
      'Paciencia',
      'Confianza tranquila',
      'Templanza del impulso'
    ],
    archetypes: [
      'La que abraza al león sin lastimarlo',
      'El coraje que no necesita gritar',
      'La fuerza que no es violencia'
    ],
    emotionalThemes: [
      'Paciencia',
      'Coraje silencioso',
      'Aceptación de lo intenso',
      'Dignidad serena',
      'Compasión hacia lo propio'
    ],
    manifestations: [
      'Morderse la lengua para no destruir a alguien con palabras hirientes',
      'Domesticar un ataque de pánico respirando profundamente',
      'Sostener la mirada ante una agresión sin retroceder ni atacar'
    ],
    shadows: [
      'Represión emocional que termina en resentimiento interno.',
      'El riesgo es leerla como "Eres una persona muy fuerte físicamente".',
      'Conviene no caer en "Vas a vencer a tus enemigos".'
    ],
    visualSymbols: [
      'La mujer y el león — instinto y conciencia, no enemigos',
      'La lemniscata sobre la cabeza — la energía que circula bien cuando hay calma',
      'Las flores en la corona — el coraje que también florece',
      'La mano sobre el hocico, sin guante — la firmeza desnuda, sin armadura',
      'El paisaje claro detrás — el escenario que confirma que esta fuerza no se esconde'
    ],

    reading: 'No siempre la fuerza se ve. A veces está en sostener algo difícil sin endurecerte. Esta carta te recuerda que tu coraje no necesita gritar para ser real: tu manera de cuidar lo intenso ya es una forma de poder.',
    synthesis: 'La fuerza también se llama paciencia con uno mismo.',
    extension: 'La Fuerza no domina al león con violencia: lo acompaña hasta calmarlo. Esa imagen es la clave de toda la carta. Lo más fuerte que tienes disponible casi nunca es el grito: es la presencia firme que no se desorganiza con lo intenso. Si esta carta aparece, probablemente haya algo de ti —una emoción, una situación, un vínculo— que te asusta por su intensidad y que no necesita ser reprimido sino acompañado. La trampa es confundir suavidad con debilidad; la sabiduría es entender que dominar lo propio sin lastimarlo es, quizás, la forma más madura de la fuerza humana.',
    prompt: '¿Qué emoción o situación intensa te está pidiendo más paciencia que dureza?',

    positions: {
      whatIs:      'Hay un momento que pide coraje sereno, no fuerza dura.',
      whatCrosses: 'Endurecerse o reprimir puede romper lo que pedía ser sostenido.',
      whatOpens:   'Se abre una manera más íntima y firme de habitar lo intenso.'
    },

    reversed: {
      essence: 'La mujer le grita al león o se aparta asustada. La lemniscata sobre su cabeza titila.',
      reading: 'La fuerza se desordenó. O reprimes lo que sientes hasta que estalla por otro lado, o te dejas arrastrar por la intensidad y después culpas al cuerpo. La firmeza serena se reemplazó por dureza con una misma o por entrega sin contención. Lo que pedía paciencia está recibiendo violencia o abandono.',
      synthesis: 'No es debilidad sentir mucho. Es debilidad pelear con eso que sientes en lugar de acompañarlo.',
      prompt: '¿A qué parte tuya le estás gritando para que se calle, cuando lo que necesita es ser escuchada?',
      manifestations: [
        'Aguantar todo durante semanas y explotar por una pavada con la persona equivocada',
        'Tratarte con una dureza interna que jamás aplicarías sobre alguien a quien quieres',
        'Ceder a un impulso —comer, gastar, decir, cortar— y después castigarte por haber cedido'
      ],
      shadows: [
        'Se bloquea la presencia firme — todo se vuelve represión o desborde.',
        'Se exagera la dureza con uno mismo o la rendición ante el impulso.',
        'Se evita mirar que la intensidad no necesita ser vencida, sino habitada.'
      ]
    }
  },

  {
    name:    'El Ermitaño',
    number:  'IX',
    essence: 'Detenerse también es avanzar.',

    traditionalMeanings: ['Introspección', 'Sabiduría interior', 'Pausa lúcida', 'Soledad elegida', 'Búsqueda silenciosa', 'Luz propia'],
    archetypes: [
      'El que se aparta para ver claro',
      'La luz que se carga adentro',
      'El maestro que también es alumno de su propio silencio'
    ],
    emotionalThemes: [
      'Soledad fértil',
      'Necesidad de pausa',
      'Búsqueda íntima',
      'Cansancio del ruido',
      'Reconciliación con uno mismo'
    ],
    manifestations: [
      'Aislarse voluntariamente un fin de semana para no lidiar con expectativas ajenas',
      'Reconocer con frustración que nadie más tiene la respuesta a tu problema',
      'Ahorrar energía negándose a entrar en una discusión estéril'
    ],
    shadows: [
      'Misanropía, aislamiento depresivo, paranoia.',
      'El riesgo es leerla como "Te vas a quedar solo para siempre".',
      'Conviene no caer en "Necesitas meditar".'
    ],
    visualSymbols: [
      'La lámpara con la estrella adentro — la luz propia, no prestada',
      'El bastón — el apoyo que se eligió, no que se impuso',
      'La capa gris larga — el recogimiento que cubre sin esconder',
      'La montaña nevada — la altura interior, fría pero clara',
      'La cabeza inclinada — la atención puesta hacia adentro, no hacia el público'
    ],

    reading: 'Hay una pausa que está pidiendo ser tomada. Esta carta no te aleja del mundo: te recuerda que algunas verdades solo aparecen cuando bajás el ruido. Lo que parece estar quieto, en realidad, está depurándose.',
    synthesis: 'A veces lo más sabio es no estar disponible para todos.',
    extension: 'El Ermitaño no se retira porque no le importe el mundo: se retira para volver a él con algo más claro adentro. Su lámpara no ilumina la montaña entera, ilumina el siguiente paso. Y eso es exactamente lo que sugiere esta carta: que no necesitas resolver todo de una vez, sino encender lo justo para no perder el rumbo. Si aparece, probablemente sea momento de retirarte un poco —de las redes, de las opiniones ajenas, del ruido emocional— y escuchar qué dice tu propia voz cuando deja de competir con todo lo demás. La trampa es confundir el retiro con la huida; la sabiduría es entender que la soledad bien elegida no aleja: te acerca a ti misma.',
    prompt: '¿Qué necesitas escuchar de ti misma que solo aparece en silencio?',

    positions: {
      whatIs:      'Hay una pausa, un retiro o una introspección pidiendo lugar.',
      whatCrosses: 'El ruido externo o la urgencia social pueden tapar lo que estás escuchando adentro.',
      whatOpens:   'Se abre una claridad propia cuando dejas de buscar afuera lo que ya estás iluminando.'
    },

    reversed: {
      essence: 'La lámpara está apagada o el ermitaño se quedó solo en la cumbre, sin pensar en bajar. La luz que tenía para sí mismo dejó de circular.',
      reading: 'El retiro perdió su sentido. O huyes del mundo y le llamas introspección, o te negaste tanto el silencio que estás reaccionando a todo en piel viva. Lo que pedía soledad amorosa se volvió aislamiento defensivo, o lo que pedía vínculo se volvió ruido constante para no quedarte sola contigo.',
      synthesis: 'No toda soledad es escucha. Algunas son escondite con buena estética.',
      prompt: '¿Te estás retirando para volver con algo, o para no volver nunca a algo que duele?',
      manifestations: [
        'No contestar mensajes durante semanas y llamarlo "tiempo para mí" cuando en realidad es esquiva',
        'Llenarte el día de tareas y compañía para no enfrentarte a la pregunta que aparece de madrugada',
        'Romantizar tu aislamiento como sabiduría mientras la vida se va angostando alrededor'
      ],
      shadows: [
        'Se bloquea el regreso — el retiro deja de ser pausa y se vuelve rutina sin retorno.',
        'Se exagera la huida (aislamiento defensivo) o el ruido (incapacidad de estar sola contigo).',
        'Se evita mirar que la luz se enciende para iluminar el siguiente paso, no para esconderte de él.'
      ]
    }
  },

  {
    name:    'La Rueda de la Fortuna',
    number:  'X',
    essence: 'Todo lo que gira también te incluye.',

    traditionalMeanings: ['Ciclos', 'Cambio inevitable', 'Movimiento', 'Adaptación', 'Suerte y momento', 'Repetición simbólica'],
    archetypes: [
      'El movimiento que no espera',
      'La rueda que no se detiene aunque tú la mires fijo',
      'El ciclo que enseña al volver'
    ],
    emotionalThemes: [
      'Aceptación',
      'Vértigo de lo no controlable',
      'Reconocimiento de patrones',
      'Apertura al cambio',
      'Confianza en el momento'
    ],
    manifestations: [
      'Sentir que todo el esfuerzo personal es inútil tras un evento fortuito',
      'Aprovechar una racha de suerte inmerecida pero oportuna',
      'Caer abruptamente de un estatus de privilegio sin culpa propia'
    ],
    shadows: [
      'Fatalismo, victimismo crónico, apostar sin medir riesgos.',
      'El riesgo es leerla como "Vas a ganar la lotería".',
      'Conviene no caer en "El karma te va a recompensar".'
    ],
    visualSymbols: [
      'La rueda con letras TARO / TORA — un mismo eje leído desde varias direcciones',
      'Las cuatro figuras aladas leyendo libros — los testigos fijos que sostienen el cambio',
      'La serpiente que baja — lo que se desprende en este giro',
      'Anubis que sube — lo que vuelve a aparecer en este giro',
      'La esfinge arriba con espada — el silencio que conoce el patrón completo'
    ],

    reading: 'Algo está girando y no necesita tu permiso. Esta carta no te dice si la rueda sube o baja: te recuerda que es rueda, y que tu trabajo es estar atenta al patrón, no detenerla. Lo que parecía azar suele ser, cuando lo miras de cerca, un ciclo que vuelve.',
    synthesis: 'No controlas la rueda. Sí eliges cómo te paras en ella.',
    extension: 'La Rueda de la Fortuna no es destino ni capricho: es la confirmación de que todo en la experiencia humana se mueve en ciclos, y que el patrón —no el suceso aislado— es lo que enseña. Las criaturas en las esquinas leen, fijas; lo que cambia es el centro. Si esta carta aparece, vale la pena preguntarse menos "¿por qué ahora?" y más "¿qué se está cerrando, qué se está abriendo, y dónde estuve antes en este mismo lugar?". La rueda no premia ni castiga; revela. Lo que se va, ya estaba aflojándose; lo que llega, ya venía circulando. Tu lugar en este momento es estar despierta al giro y no resistirlo desde la nostalgia de lo anterior.',
    prompt: '¿Qué patrón de tu vida está volviendo, y qué te pide hacer distinto esta vez?',

    positions: {
      whatIs:      'Hay un cambio cíclico, un giro de momento o una repetición pidiendo atención.',
      whatCrosses: 'Querer detener el movimiento o ignorar el patrón puede prolongar el desgaste.',
      whatOpens:   'Se abre la posibilidad de leer el ciclo y ubicarte distinto en él.'
    },

    reversed: {
      essence: 'La rueda gira y alguien intenta detenerla con las manos. Las criaturas en las esquinas dejaron de leer.',
      reading: 'El ciclo se está repitiendo y no quieres mirar el patrón. Llamas mala suerte a algo que ya tuvo ensayo, eliges la misma situación con distintos protagonistas, o te resignas a que "siempre te pasa lo mismo". El giro no te castiga: te muestra. Lo que falta no es suerte, es la pregunta sobre tu rol en la repetición.',
      synthesis: 'Si vuelve la misma escena con distinto reparto, deja de ser azar.',
      prompt: '¿Qué versión de esta misma situación ya viviste antes, y qué papel sigues haciendo?',
      manifestations: [
        'Quejarte de un jefe, una pareja o un amigo y darte cuenta de que es la misma queja con distinto nombre',
        'Esperar que esta vez la rueda gire a tu favor sin cambiar nada de lo que tú haces',
        'Acelerar para "salir" de algo y volver a aterrizar en el mismo punto unos meses después'
      ],
      shadows: [
        'Se bloquea la lectura del patrón — cada vuelta se vive como evento aislado.',
        'Se exagera la victimización ante la suerte o la obstinación contra el cambio.',
        'Se evita mirar que tu lugar en el giro también es elección.'
      ]
    }
  },

  {
    name:    'La Justicia',
    number:  'XI',
    essence: 'Lo que sembraste, también te ve.',

    traditionalMeanings: ['Coherencia', 'Consecuencia', 'Verdad', 'Equilibrio', 'Decisión justa', 'Honestidad'],
    archetypes: [
      'La que pesa sin emoción y corta sin venganza',
      'La voz interna que no permite mentirse más',
      'La verdad que no necesita gritarse'
    ],
    emotionalThemes: [
      'Honestidad incómoda',
      'Reconocimiento de la propia parte',
      'Necesidad de coherencia',
      'Calma firme',
      'Cierre limpio'
    ],
    manifestations: [
      'Asumir una consecuencia dura y merecida por un error pasado',
      'Separarse de alguien por incompatibilidad ética, a pesar del amor',
      'Buscar una objetividad hiriente en medio de una pelea pasional'
    ],
    shadows: [
      'Rigidez implacable, falta total de piedad o contexto humano.',
      'El riesgo es leerla como "Vas a firmar un contrato legal".',
      'Conviene no caer en "Se hará justicia divina y tus enemigos caerán".'
    ],
    visualSymbols: [
      'La balanza — el peso real, no el que querrías que tuviera',
      'La espada vertical — el corte que separa lo cierto de lo cómodo',
      'Las dos columnas — el equilibrio entre lo afectivo y lo racional',
      'La corona con un cuadrado — la mente firme, sin adornos',
      'El broche que cierra el manto — lo que se contiene para poder decidir bien'
    ],

    reading: 'Algo te está pidiendo coherencia: alinear lo que dices, lo que piensas y lo que haces. Esta carta no acusa; pesa. Y pesar no es castigarse: es mirar lo real con cuidado y elegir desde ahí, aunque la verdad implique un costo.',
    synthesis: 'La verdad no se discute. Se sostiene.',
    extension: 'La Justicia no es una corte: es una voz interna que te reconoce. Su balanza no decide a favor de nadie en particular; mide lo real, y lo real incluye también lo que tú hiciste o dejaste de hacer. La espada que sostiene es vertical, no apoyada: corta porque a veces eso es lo que cuida, no porque sea cruel. Si esta carta aparece, hay un punto donde la incoherencia ya no se sostiene sin costo. Eso no significa explotar ni confesar todo dramáticamente; significa ajustar, decir lo que faltaba decir, asumir lo que te corresponde. La paz que llega después no es alivio rápido; es la calma sólida de quien ya no carga lo que no era suyo —y ya no esquiva lo que sí—.',
    prompt: '¿Qué verdad estás postergando porque su consecuencia te incomoda?',

    positions: {
      whatIs:      'Hay una situación que pide honestidad y decisión coherente.',
      whatCrosses: 'Esperar justicia afuera sin asumir la propia parte puede frenar el proceso.',
      whatOpens:   'Se abre un cierre limpio cuando lo que piensas, dices y haces vuelven a alinearse.'
    },

    reversed: {
      essence: 'La balanza está descalibrada o cuelga torcida. Alguien sostiene la espada como si fuera arma personal, no medida.',
      reading: 'La justicia interna se distorsionó. O la usas para acusar a otros y limpiarte tú, o la usas para flagelarte mientras los demás siguen impunes. La coherencia que pedía la carta se reemplazó por discurso moral que no toca lo propio, o por culpa que no produce cambio.',
      synthesis: 'Apuntar el dedo afuera no es honestidad. Castigarte no es responsabilidad.',
      prompt: '¿De qué estás acusando al otro para no tener que mirar tu parte? ¿O qué te estás castigando para no tener que cambiarlo?',
      manifestations: [
        'Llevar registro mental detallado de lo que el otro hizo mal y olvidar todo lo que tú no hiciste bien',
        'Confesarte y pedir disculpas en bucle sin modificar el comportamiento que produjo el daño',
        'Buscar argumentos legales o morales para "tener razón" en una situación donde nadie gana así'
      ],
      shadows: [
        'Se bloquea la coherencia entre pensar, decir y hacer.',
        'Se exagera el juicio (a otros o a una misma) y se debilita el ajuste real.',
        'Se evita mirar que la verdad cuesta lo mismo decirla afuera que sostenerla por dentro.'
      ]
    }
  },

  {
    name:    'El Colgado',
    number:  'XII',
    essence: 'A veces ver distinto pide quedarse quieta.',

    traditionalMeanings: ['Pausa', 'Suspensión', 'Nueva perspectiva', 'Entrega', 'Sacrificio voluntario', 'Iniciación interna'],
    archetypes: [
      'El que detiene la acción para que aparezca el sentido',
      'La sabiduría de la inversión',
      'El silencio que enseña'
    ],
    emotionalThemes: ['Aceptación', 'Tregua interna', 'Resignación lúcida', 'Quietud activa', 'Entrega sin derrota'],
    manifestations: [
      'Quedarse atrapado en una situación burocrática sin poder hacer nada más que esperar',
      'Ceder el control tras una pelea porque resistirse duele más',
      'Entender de golpe a la otra persona al verse forzado a parar'
    ],
    shadows: [
      'Estancamiento crónico, martirio voluntario para manipular desde la pena.',
      'El riesgo es leerla como "Te han hecho un amarre o hechizo".',
      'Conviene no caer en "Las cosas se van a retrasar un poco".'
    ],
    visualSymbols: [
      'El árbol vivo — la pausa enraizada, no muerta',
      'El cuerpo invertido — lo que cambia al ver desde otro ángulo',
      'El halo dorado — la lucidez que aparece justo cuando se dejó de forzar',
      'La pierna cruzada en 4 — la quietud que también es forma',
      'Las manos atadas atrás — el "no actuar" elegido, no impuesto'
    ],

    reading: 'Hay un tiempo de espera que no es derrota: es necesidad. Esta carta te pide soltar el control por un rato y mirar la situación al revés, desde otro ángulo. Lo que parece estancamiento suele ser, en realidad, un cambio de perspectiva en proceso.',
    synthesis: 'No siempre hay que mover la situación. A veces hay que mover la mirada.',
    extension: 'El Colgado no está sufriendo: está suspendido. La Tau de la que cuelga no es cruz de castigo, es soporte vivo —el árbol todavía verde lo sostiene—. Lo que cambia desde su posición no es la realidad, sino su forma de leerla, y a veces eso alcanza para que algo se acomode adentro. Si esta carta aparece, probablemente lo que pide la situación no sea más esfuerzo, sino dejarla quieta el tiempo necesario para que asome el sentido. La trampa es confundir esta pausa con resignación; la sabiduría es entender que hay procesos que solo maduran si se los deja respirar. El halo dorado en su cabeza aparece precisamente cuando dejó de forzar.',
    prompt: '¿Qué situación estás tratando de mover cuando, en realidad, te pide ser mirada distinto?',

    positions: {
      whatIs:      'Hay una pausa, una suspensión o un punto donde forzar empeora.',
      whatCrosses: 'La impaciencia o la pasividad disfrazada de calma pueden alargar el proceso.',
      whatOpens:   'Se abre una nueva perspectiva al sostener la quietud el tiempo necesario.'
    },

    reversed: {
      essence: 'El árbol se secó o alguien forcejea por bajar a los gritos. El halo se apagó.',
      reading: 'La pausa se distorsionó. O empujas y arañas la situación —llamadas, mensajes, intentos— sin dar el tiempo que el proceso pide, o te quedaste suspendida tanto que la suspensión se volvió excusa para no actuar nunca. La perspectiva nueva que prometía esta carta no llega, porque o no la dejas asomar o la usaste para no responsabilizarte.',
      synthesis: 'Forzar lo que pide tiempo y abandonarse a la espera son la misma evasión por dos caminos.',
      prompt: '¿Estás esperando que algo madure, o estás llamando "espera" a tu miedo a moverte?',
      manifestations: [
        'Reescribir un mensaje quince veces y mandar el peor, porque no soportabas más estar quieta con la pregunta',
        'Llevar años "tomándote tu tiempo" para algo que sabes que ya pide acción',
        'Decir "voy a meditar sobre esto" cada vez que aparece una decisión incómoda'
      ],
      shadows: [
        'Se bloquea el ajuste real — ni la quietud madura, ni la acción se concreta.',
        'Se exagera la prisa o la pasividad; ambas evitan habitar el momento sin respuesta.',
        'Se evita mirar que la pausa lúcida pide presencia, no fuga.'
      ]
    }
  },

  {
    name:    'La Muerte',
    number:  'XIII',
    essence: 'Un esqueleto con armadura avanza despacio a caballo, sin saña.',

    traditionalMeanings: [
      'Transformación profunda',
      'Cierre irreversible',
      'Desprendimiento',
      'Transición',
      'Renacimiento',
      'Final como umbral'
    ],
    archetypes: [
      'La que cierra para que algo nuevo pueda empezar',
      'El umbral que no se discute',
      'La transformación que no negocia'
    ],
    emotionalThemes: ['Duelo', 'Aceptación lenta', 'Alivio escondido', 'Cansancio del cambio', 'Apertura al después'],
    manifestations: [
      'Cerrar con llave la casa de la infancia a la que no se volverá jamás',
      'Aceptar que una relación de años lleva meses muerta',
      'Sentir la amputación brusca tras un despido inesperado'
    ],
    shadows: [
      'Resistencia patológica al cambio, vivir en el pasado convertido en fantasma.',
      'El riesgo es leerla como "Alguien cercano a ti va a fallecer pronto".',
      'Conviene no caer en "Solo es un cambio de etapa positivo".'
    ],
    visualSymbols: [
      'Esqueleto blindado sobre caballo blanco — la transición avanza con armadura, no con saña',
      'La bandera negra con la Rosa Mística blanca — el final que también florece',
      'El rey caído al pie del caballo — la identidad anterior que ya no manda',
      'El obispo de pie y los niños arrodillados — los que aceptan el paso reciben distinto que los que lo niegan',
      'El sol entre dos torres en el horizonte — el día siguiente ya está, aunque todavía no se viva'
    ],

    reading: 'Algo en ti ya terminó. Pero le sigues hablando, vistiéndolo, defendiéndolo, como si estuviera vivo. La carta no anuncia un cambio — viene a confirmar uno que ya pasó por dentro y al que solo te falta firmar afuera.',
    synthesis: 'Lo que termina no se llevó la vida. Hizo lugar.',
    extension: 'La Muerte en el Tarot rara vez es muerte literal. Mira la imagen con cuidado: el esqueleto no corre, no ataca, no grita — avanza al paso de un caballo blanco con un estandarte donde florece una rosa mística. A sus pies, las figuras humanas reaccionan distinto: el rey cae, el obispo reza de pie, los niños se arrodillan tranquilos. La carta no juzga la postura — solo muestra que cada uno recibe el cierre según su propia disposición. La sensación que aterriza esta carta es muy concreta: ese vacío en el pecho cuando se firma un papel de divorcio, de despido, de venta de la casa de la infancia. Es el momento exacto en que un final que llevaba meses adentro encuentra su forma afuera. A diferencia del 10 de Espadas, que es dolor traicionero y golpe seco, La Muerte es un proceso orgánico que empezó hace tiempo. La pregunta no es si va a pasar. Es qué sigues cargando como si todavía estuviera vivo. Y al fondo, casi pintado, el sol amaneciendo entre dos torres recuerda que el día siguiente ya está. Distinto, pero está.',
    prompt: '¿Qué cadáver emocional sigues vistiendo como si estuviera vivo?',

    positions: {
      whatIs:      'Hay un cierre, una transformación o un desprendimiento ya en curso.',
      whatCrosses: 'La resistencia a aceptar el final puede prolongar el desgaste.',
      whatOpens:   'Se abre un después distinto cuando lo que terminó se deja ir con honestidad.'
    },

    reversed: {
      essence: 'El esqueleto avanza, pero alguien tira del estandarte hacia atrás. La rosa blanca sigue ahí, solo que nadie la mira.',
      reading: 'El cierre ya ocurrió por dentro y aun así sigues sosteniéndolo afuera. Vuelves a llamar, vuelves a justificar, vuelves a arreglar lo que ya no se puede arreglar — no porque creas que vive, sino porque dolería más firmar el final. La transformación no se detuvo: se quedó atascada en tu insistencia.',
      synthesis: 'Cargar un cadáver no lo trae de vuelta. Solo te cansa más.',
      prompt: '¿Qué estás manteniendo con vida artificial porque soltarlo se siente peor que sostenerlo?',
      manifestations: [
        'Volver a abrir conversaciones que ya tuvieron su última versión, esperando que esta vez salga distinto',
        'Conservar mensajes, llaves, fotos o rutinas de algo que ya terminó, como prueba de que todavía existe',
        'Rearmar una y otra vez lo que ya cerró —un trabajo, un vínculo, una etapa— en vez de hacer el duelo'
      ],
      shadows: [
        'Se bloquea el cierre real — todo queda en estado de despedida que nunca termina.',
        'Se exagera la fidelidad al pasado, hasta convertir el duelo en identidad.',
        'Se evita mirar el después: si lo que murió ya no manda, hay que decidir quién eres ahora.'
      ]
    }
  },

  {
    name:    'La Templanza',
    number:  'XIV',
    essence: 'La calma también se aprende mezclando.',

    traditionalMeanings: ['Integración', 'Armonía', 'Equilibrio en movimiento', 'Mezcla de opuestos', 'Regulación emocional', 'Mediación'],
    archetypes: [
      'El que sabe mezclar sin perder ninguno de los dos extremos',
      'La calma que se construye, no que llega',
      'La paciencia activa'
    ],
    emotionalThemes: [
      'Serenidad ganada',
      'Equilibrio inestable y real',
      'Paciencia contigo misma',
      'Dosis justa',
      'Síntesis emocional'
    ],
    manifestations: [
      'Tragar el orgullo para encontrar un punto medio con un compañero insufrible',
      'Rebajar el enojo extremo con empatía para no destruir una relación',
      'Combinar dos áreas de vida incompatibles hasta que funcionen temporalmente'
    ],
    shadows: [
      'Tibieza, falta de pasión, conformismo por miedo a los extremos.',
      'El riesgo es leerla como "Tienes que tener paciencia".',
      'Conviene no caer en "Es la carta de los ángeles que te cuidan".'
    ],
    visualSymbols: [
      'Las dos copas — los opuestos que pueden compartir el mismo flujo',
      'Un pie en tierra y otro en agua — lo concreto y lo emocional sostenidos a la vez',
      'El triángulo dentro del cuadrado en el pecho — el espíritu sostenido por la materia',
      'El sendero hacia las montañas — la integración como camino, no como llegada',
      'Las alas — la trascendencia que no escapa, integra'
    ],

    reading: 'Esta carta no te promete equilibrio total; te muestra que la calma se construye mezclando, no eliminando. Hay algo en ti que necesita combinar dos partes que parecen contradecirse y aprender a sostenerlas juntas. La paz que aparece después no es perfecta: es real.',
    synthesis: 'Equilibrio no es estar quieta. Es saber sostenerte mientras te mueves.',
    extension: 'La Templanza no llega cuando todo está en orden, llega cuando aprendiste a sostener lo desordenado con cuidado. La figura alada está vertiendo agua entre dos copas y no derrama una gota, no porque sea perfecta, sino porque está atenta. Un pie en la tierra, otro en el agua: ni se desborda en lo emocional ni se rigidiza en lo concreto. Si esta carta aparece, probablemente haya una mezcla que estás aprendiendo a hacer —entre dos deseos, entre dos personas, entre dos partes de ti misma— y la pregunta no es cuál elegir, sino cómo dosificar. La trampa es buscar paz negando el conflicto; la sabiduría es entender que la calma profunda solo se sostiene cuando se incluye lo que parecía contradictorio.',
    prompt: '¿Qué dos partes de ti estás tratando de elegir cuando, en realidad, podrían convivir?',

    positions: {
      whatIs:      'Hay un proceso de integración o de regulación emocional en curso.',
      whatCrosses: 'Querer eliminar lo incómodo en lugar de mezclarlo puede romper el equilibrio.',
      whatOpens:   'Se abre una calma más estable al sostener los opuestos a la vez.'
    },

    reversed: {
      essence: 'Una de las copas se vacía, la otra se desborda. Las alas perdieron equilibrio y los pies ya no encuentran orilla.',
      reading: 'La integración se rompió. Te volcaste a un solo lado —solo trabajo, solo afecto, solo control, solo entrega— y lo otro empezó a pasar factura. O cambias de extremo a extremo y le llamas vivir intensamente, cuando en realidad nunca estás del todo en ningún lugar. La calma no se construye eliminando una de las dos copas: se construye dosificando.',
      synthesis: 'Estar en uno solo de los polos también es estar fuera de ti.',
      prompt: '¿Qué parte tuya está tan ocupando la escena que la otra ya casi no aparece?',
      manifestations: [
        'Trabajar de lunes a domingo y descubrir que el cuerpo, el deseo y los vínculos se apagaron al mismo tiempo',
        'Pasar del control absoluto al descontrol absoluto sin un solo gesto medido en el medio',
        'Pedir paz a una situación mientras saboteas todas las formas de calma que aparecen'
      ],
      shadows: [
        'Se bloquea la dosificación — todo se vive como elección entre dos puros.',
        'Se exagera el sacrificio de un lado o el desborde del otro.',
        'Se evita mirar que la integración no es promedio, es atención sostenida.'
      ]
    }
  },

  {
    name:    'El Diablo',
    number:  'XV',
    essence: 'Lo que te ata también te conoce.',

    traditionalMeanings: ['Apego', 'Materialidad', 'Deseo intenso', 'Dependencia emocional', 'Pacto inconsciente', 'Sombra reconocida'],
    archetypes: [
      'El espejo que muestra lo que no quieres ver',
      'El pacto silencioso con la propia sombra',
      'El deseo que repite y no termina de decir su nombre'
    ],
    emotionalThemes: [
      'Atracción incómoda',
      'Repetición compulsiva',
      'Apego',
      'Vergüenza disimulada',
      'Lealtad mal puesta',
      'Hipnosis emocional'
    ],
    manifestations: [
      'Quedarse en un trabajo humillante solo por el estatus y el sueldo',
      'Ceder repetidamente a una adicción conociendo el daño exacto que causa',
      'Celar y asfixiar a una pareja por pura inseguridad enfermiza'
    ],
    shadows: [
      'Esclavitud voluntaria, degradación moral, ceguera por materialismo.',
      'El riesgo es leerla como "Te han hecho brujería o magia negra".',
      'Conviene no caer en "Alguien te tiene envidia".'
    ],
    visualSymbols: [
      'Las dos figuras encadenadas — cadenas anchas, podrían sacarse sin esfuerzo',
      'El pentagrama invertido sobre la frente — la mente quieta en el deseo',
      'La antorcha hacia abajo — la luz usada para sostener la ilusión, no para mostrar',
      'El altar bajo la figura — el pacto sostenido por uno mismo',
      'Las pequeñas alas de murciélago — un vuelo hecho de noche, no de aire'
    ],

    reading: 'Hay algo que vuelves a buscar aunque sepas cómo termina. La carta no te pide juzgarte, pero tampoco te ofrece coartada: lo que parece atadura, casi siempre, también es elección. Las cadenas están sueltas. La pregunta no es por qué no puedes salir — es qué obtienes cada vez que decides quedarte.',
    synthesis: 'No es el deseo el problema. Es no mirarlo a los ojos.',
    extension: 'El Diablo no llega a condenar; llega a nombrar lo que tú ya sabías. Las cadenas que sostienen a las dos figuras no están cerradas con candado: se ven, se reconocen, se podrían quitar. Si todavía no se quitan, es porque el vínculo —con esa persona, con ese hábito, con esa imagen tuya— da algo además de quitar. La sombra no se cura mirándola con horror, se cura mirándola con curiosidad. Esta carta te pregunta qué estás obteniendo de eso que dices querer dejar, y por qué ese intercambio sigue siendo, por ahora, más tolerable que el vacío que dejaría su ausencia. Reconocer eso no es debilidad: es el primer movimiento honesto.',
    prompt: '¿Qué obtienes de eso que sabes que no te conviene?',

    positions: {
      whatIs:      'Hay un apego, un deseo o una repetición que está pesando más de lo que parece.',
      whatCrosses: 'Confundir intensidad con verdad puede mantener atada una historia que ya pidió cambio.',
      whatOpens:   'Se abre la posibilidad de mirar sin juicio lo que te ata, y desde ahí elegir distinto.'
    },

    reversed: {
      essence: 'Las cadenas se aflojaron y las dos figuras siguen sin levantar la cabeza. O alguien se las quitó de un tirón violento y se cortó la piel en el intento.',
      reading: 'Sabes lo que te ata y la respuesta es heroísmo o autoengaño. O te juraste salir "ya mismo" y descubres una semana después que volviste por la puerta de atrás, o le llamas "ya no me afecta" a algo que sigue dirigiendo silenciosamente tus decisiones. Lo invertido del Diablo no es la liberación: es la pretensión de liberación sin haber mirado el deseo de fondo.',
      synthesis: 'Quitarse las cadenas a los gritos y disimular que nunca estuvieron es la misma evasión.',
      prompt: '¿Qué estás dejando "por convicción" mientras por dentro sigues yendo a buscarlo en otra forma?',
      manifestations: [
        'Cortar de tajo con un vínculo, una sustancia o una rutina, y reemplazarla por otra que cumple exactamente la misma función',
        'Anunciar tu liberación en redes y volver al patrón un mes después, esta vez en silencio',
        'Convencerte de que ya estás bien para no tener que hacer el trabajo lento de mirar qué buscabas ahí'
      ],
      shadows: [
        'Se bloquea el reconocimiento del intercambio — qué te daba eso que dejaste.',
        'Se exagera la ruptura heroica o la negación elegante; ambas saltan el paso de mirar de cerca.',
        'Se evita mirar que la libertad real pasa por entender el deseo, no por borrarlo.'
      ]
    }
  },

  {
    name:    'La Torre',
    number:  'XVI',
    essence: 'Un rayo parte la torre y dos figuras caen sin tiempo de prepararse.',

    traditionalMeanings: [
      'Libertad',
      'Ruptura',
      'Transformación abrupta',
      'Caída de estructuras falsas',
      'Liberación de cadenas',
      'Verdad ineludible'
    ],
    archetypes: [
      'La sacudida que revela lo que estaba mal sostenido',
      'El rayo que despierta',
      'La verdad que ya no se puede tapar'
    ],
    emotionalThemes: ['Quiebre', 'Alivio detrás del shock', 'Verdad incómoda', 'Caída del personaje', 'Liberación no buscada'],
    manifestations: [
      'Descubrir una infidelidad de años que destruye la identidad de la familia',
      'Recibir una crítica pública que aniquila la imagen profesional construida',
      'El colapso mental tras sostener una mentira por demasiado tiempo'
    ],
    shadows: [
      'Pánico destructivo, victimismo ante la ruina, pérdida de la cordura.',
      'El riesgo es leerla como "Vas a tener un accidente o mudanza física".',
      'Conviene no caer en "Cuidado con las caídas o los edificios altos".'
    ],
    visualSymbols: [
      'El rayo dorado partiendo la torre — la verdad atraviesa la estructura sin pedir permiso',
      'La corona cayendo del techo — la autoridad falsa, la coronación de algo que no estaba bien apoyado',
      'Las dos figuras cayendo de cabeza — el alivio disfrazado de catástrofe',
      'La torre construida sobre roca pero golpeada igual — lo que se sostenía solo en apariencia',
      'Las llamas saliendo por las ventanas — energía liberada, no destrucción gratuita'
    ],

    reading: 'Algo se cayó. No con elegancia — con el ruido y la humillación de un golpe seco que no esperabas. Y el alivio empieza después, cuando entiendes que lo que se vino abajo era la versión de ti que no se sostenía hace tiempo.',
    synthesis: 'No se cayó lo verdadero. Se cayó lo que ya no era cierto.',
    extension: 'La Torre es la única carta del Tarot donde el rayo viene del cielo, no del piso. La estructura está en llamas, la corona vuela por el aire, y dos figuras caen de cabeza con los brazos extendidos. No hay tiempo de prepararse. La sensación que aterriza esta carta es muy concreta: ese impacto del suelo cuando te caes hacia atrás de una silla y te falta un instante para procesar qué acaba de pasar. Una conversación que no tendrías que haber tenido. Un mail que no tendrías que haber leído. Algo dicho en voz alta que ya no se puede des-saber. A diferencia de La Muerte, que es un proceso orgánico y va dando tiempo, La Torre es súbita y humillante — rompe el ego de un golpe. Pero aquí está la trampa: lo que se cayó no era verdadero. Era una mentira que sostenías sobre ti misma —un trabajo que ya no te representaba, una imagen prestada, un acuerdo silencioso con alguien que ya no te servía. Y abajo, donde aterrizas de cabeza, el aire es más limpio que arriba.',
    prompt: '¿Qué mentira sobre ti acaba de saltar por los aires?',

    positions: {
      whatIs:      'Hay un cambio brusco o una ruptura redefiniendo el escenario actual.',
      whatCrosses: 'El apego a lo anterior puede intensificar el impacto del cambio.',
      whatOpens:   'Se abre un terreno nuevo, más auténtico aunque aún inestable.'
    },

    reversed: {
      essence: 'La torre cruje, llueven trozos de revoque, y alguien adentro pone otra mano de pintura sobre la pared agrietada.',
      reading: 'La sacudida ya empezó —llegan señales claras, dolores físicos, mensajes que no se pueden seguir ignorando— y la respuesta es tapar, justificar, posponer. La caída no se evitó: se administró. Y eso solo alarga el desgaste, vuelve crónico lo que pudo ser un golpe limpio.',
      synthesis: 'Frenar la caída no es quedarse en pie. Es vivir adentro de algo que cruje.',
      prompt: '¿Qué señal de alarma estás silenciando esta semana porque enfrentarla obligaría a cambiar todo?',
      manifestations: [
        'Saber que la relación, el trabajo o el cuerpo te están avisando, y responder con más rutina, más control, más explicaciones',
        'Negociar con la verdad para no tener que reorganizar la vida que armaste alrededor de ella',
        'Repetir "esto se va a acomodar" mientras todo lo que te rodea muestra que no'
      ],
      shadows: [
        'Se bloquea el quiebre limpio — el derrumbe se vuelve goteo lento.',
        'Se exagera el control y la negación; cada parche pesa más que la grieta original.',
        'Se evita mirar la pregunta de fondo: si esto cae, ¿quién soy sin esto?'
      ]
    }
  },

  {
    name:    'La Estrella',
    number:  'XVII',
    essence: 'Después de la tormenta, también hay agua para ti.',

    traditionalMeanings: ['Esperanza', 'Reparación', 'Calma', 'Inspiración', 'Confianza renovada', 'Curación lenta'],
    archetypes: [
      'La que se permite estar desnuda después del derrumbe',
      'La esperanza sin promesa',
      'La que repara sin apurar'
    ],
    emotionalThemes: [
      'Vulnerabilidad serena',
      'Confianza tenue',
      'Alivio después del quiebre',
      'Apertura suave',
      'Inspiración silenciosa'
    ],
    manifestations: [
      'Sentir paz física en el cuerpo tras haber llorado todo el resentimiento',
      'Mostrar los defectos y heridas en una primera cita sin sentir pudor',
      'Volver a tener una fe ciega y tranquila después de un trauma grave'
    ],
    shadows: [
      'Desconexión soñadora, falsa esperanza que inmoviliza la acción práctica.',
      'El riesgo es leerla como "Se van a cumplir todos tus deseos mágicamente".',
      'Conviene no caer en "Vas a ser muy famoso o la estrella del momento".'
    ],
    visualSymbols: [
      'El cuerpo desnudo — la verdad sin protección, ya sin armadura',
      'Las dos jarras vertiendo — lo que recibes se vuelve a dar, no se acumula',
      'El agua que vuelve al estanque — lo emocional que circula sin perderse',
      'La estrella mayor con siete satélites — el guía interno y los ciclos que lo acompañan',
      'El ibis en el árbol — el pensamiento sereno que observa sin urgencia'
    ],

    reading: 'Después de un tramo difícil, algo se está acomodando con suavidad. Esta carta no te empuja hacia adelante: te recuerda que ya estás recuperando, aunque no se note todavía. La esperanza que aparece es vulnerable, pero verdadera.',
    synthesis: 'Reparar no es volver a ser igual. Es volver a confiar.',
    extension: 'La Estrella aparece después de los grandes quiebres porque su trabajo es reparar lo que la urgencia ya no necesita romper. La figura está desnuda, no por exposición, sino porque ya no tiene que defenderse: lo difícil pasó, y lo que queda es la posibilidad de empezar a confiar de nuevo, sin garantías. Las dos jarras vierten al mismo tiempo: lo que recibe lo devuelve, lo emocional vuelve a circular. Si esta carta aparece, probablemente haya algo en ti pidiendo cuidado lento —no plan, no productividad, cuidado—. La esperanza aquí no promete que todo será fácil; promete que estás más entera de lo que sientes, y que la luz que te guía no necesita ser brillante: alcanza con ser constante.',
    prompt: '¿Dónde está empezando a volver tu confianza, aunque sea apenas?',

    positions: {
      whatIs:      'Hay un proceso de reparación, esperanza o calma volviendo después de algo difícil.',
      whatCrosses: 'Apurar la curación o desconfiar de la calma puede frenar la apertura.',
      whatOpens:   'Se abre una confianza nueva, suave y sostenida en el tiempo.'
    },

    reversed: {
      essence: 'La figura desnuda se cubrió otra vez, las jarras quedaron en la orilla. La estrella sigue arriba, pero alguien dejó de mirarla.',
      reading: 'La esperanza está y no le tienes confianza. Después del quiebre, la calma asusta más que la tormenta: si bajas la guardia y vuelve el dolor, esta vez te quiebra entera. Entonces te adelantas, te cubres, te ocupas, sospechas — y la reparación no termina de instalarse. O al revés: te aferras a una esperanza que aún no tiene base, sin hacer nada concreto para sostenerla.',
      synthesis: 'Desconfiar de la calma es seguir viviendo dentro del quiebre.',
      prompt: '¿De qué te estás protegiendo cuando rechazas la calma que ya está disponible?',
      manifestations: [
        'Sentir alivio y, en el mismo instante, escanear el horizonte buscando la próxima desgracia',
        'Volver a contarte las viejas heridas para "no olvidarte" de ellas, justo cuando el cuerpo había empezado a soltar',
        'Poner toda tu fe en una promesa, una persona o una idea, sin moverte un milímetro tú misma'
      ],
      shadows: [
        'Se bloquea la confianza vulnerable — toda calma se vuelve sospecha.',
        'Se exagera el escudo (cinismo defensivo) o la fe ciega (esperanza sin acción).',
        'Se evita mirar que la reparación pide entregarse a algo que aún no garantiza nada.'
      ]
    }
  },

  {
    name:    'La Luna',
    number:  'XVIII',
    essence: 'Un perro y un lobo aúllan a la luna, y un cangrejo asoma del agua oscura.',

    traditionalMeanings: [
      'Intuición',
      'Sueños y subconsciente',
      'Transformación cíclica',
      'Reconocimiento de la sombra',
      'Camino oscuro antes de la luz',
      'Energía femenina y ciclo lunar'
    ],
    archetypes: [
      'La noche del alma',
      'El sendero entre lo consciente y lo no consciente',
      'El miedo que enseña antes de irse'
    ],
    emotionalThemes: [
      'Niebla',
      'Ambigüedad',
      'Sospecha sutil',
      'Sensibilidad alta',
      'Sueños vívidos',
      'Información que llega por debajo de las palabras'
    ],
    manifestations: [
      'Caminar por una calle solitaria de noche sintiendo que las sombras observan',
      'Distorsionar completamente las intenciones de una pareja por miedos propios pasados',
      'Dudar de la propia cordura ante un recuerdo que no se sabe si es real o soñado'
    ],
    shadows: [
      'Paranoia, delirio, mentiras, autodesengaño patológico.',
      'El riesgo es leerla como "Te están mintiendo o engañando".',
      'Conviene no caer en "Tienes grandes poderes psíquicos y mágicos".'
    ],
    visualSymbols: [
      'Las dos torres a los costados del sendero — el umbral entre el mundo conocido y lo no consciente',
      'El perro y el lobo aullándole a la luna — lo doméstico y lo salvaje en ti respondiendo a lo mismo',
      'El cangrejo que asoma del agua — algo del subconsciente que pide aparecer, despacio',
      'El sendero serpenteante que se pierde entre montañas — el camino no es recto y eso es honesto',
      'La luna con cara melancólica goteando rocío — la verdad observada sin juicio'
    ],

    reading: 'Hay algo que estás percibiendo y todavía no puedes decidir si es intuición o paranoia. La cabeza dice una cosa y el cuerpo dice otra — y entre las dos, todo está más oscuro de lo que querrías. Avanzar despacio en la niebla es más sabio que correr para salir.',
    synthesis: 'La niebla no engaña. Te muestra que no puedes ver claro.',
    extension: 'La Luna es la carta más incómoda del Tarot porque no te miente: te muestra que no puedes ver claro. Mira la imagen con calma — la luna está de perfil, melancólica, dejando caer gotas que pueden ser rocío o pueden ser lágrimas. El sendero serpentea entre dos torres y se pierde entre montañas que no se distinguen. Un perro doméstico y un lobo salvaje le aúllan a la misma luna desde el mismo borde, y desde el agua sale un cangrejo —algo que ya estaba en lo profundo y pide aparecer un rato. La sensación que aterriza esta carta es ese sudor frío de despertarte a oscuras sin saber dónde estás ni qué hora es: el cuerpo registra peligro antes de que la cabeza lo nombre. A diferencia de La Sacerdotisa, que es el misterio asimilado y sereno, La Luna es el misterio que todavía da miedo, que todavía se confunde con la sombra que proyectamos sobre los demás para no verla en nosotras. Cuando esta carta aparece, lo más útil no es decidir: es no apurar la palabra. Lo que está confuso no es porque tú no entiendas; es porque todavía no terminó de mostrarse.',
    prompt: '¿Qué sombra tuya estás proyectando en los demás para no verla en ti?',

    positions: {
      whatIs:      'Hay confusión, sensibilidad o información no visible del todo.',
      whatCrosses: 'El miedo viejo puede disfrazarse de intuición y desorientar.',
      whatOpens:   'Se abre una comprensión más intuitiva si no apuras las respuestas.'
    },

    reversed: {
      essence: 'La luna sigue arriba, pero alguien encendió todas las luces de la casa para no verla. El cangrejo se quedó del otro lado del agua, sin asomar.',
      reading: 'Lo confuso pide ser sostenido sin nombre y la respuesta es nombrarlo demasiado rápido —explicar, diagnosticar, racionalizar— o esconderlo bajo capas de actividad. Lo que ya estaba bajando del subconsciente se queda atascado en la garganta. Y la sospecha que pedía atención sosegada se vuelve obsesión, paranoia o evitación pura.',
      synthesis: 'No toda niebla pide ser disipada. Algunas piden ser caminadas.',
      prompt: '¿Qué emoción confusa estás explicando con teoría para no tener que sentirla?',
      manifestations: [
        'Llenar el día de tareas y pantallas para no quedarte sola con eso que ronda hace semanas',
        'Convencerte de que un mal presentimiento "es solo ansiedad" y descartarlo, o convencerte de que es certeza y dispararte',
        'Acusar a alguien de algo concreto cuando lo que duele en realidad es algo viejo tuyo asomando'
      ],
      shadows: [
        'Se bloquea la escucha lenta — no hay tolerancia para no entender todavía.',
        'Se exagera el control mental (sobreinterpretación) o el escape (negación, distracción crónica).',
        'Se evita mirar la sombra propia: se vuelve más cómodo verla en el otro que reconocerla en una.'
      ]
    }
  },

  {
    name:    'El Sol',
    number:  'XIX',
    essence: 'La claridad simplifica.',

    traditionalMeanings: [
      'Felicidad',
      'Éxito',
      'Claridad',
      'Culminación de un viaje',
      'Luz propia tras la oscuridad',
      'Vitalidad y reconocimiento'
    ],
    archetypes: [
      'La claridad que llega después del trabajo interno',
      'El yo que ya no necesita esconderse',
      'La alegría tranquila, no eufórica'
    ],
    emotionalThemes: [
      'Alivio',
      'Plenitud sencilla',
      'Confianza tranquila',
      'Visibilidad sin máscara',
      'Alegría sin justificación'
    ],
    manifestations: [
      'Sentir la vitalidad física de un día de primavera tras semanas de enfermedad',
      'Exponer una obra en público con orgullo genuino y sin miedo a la crítica',
      'La claridad mental repentina que anula semanas de paranoia infundada'
    ],
    shadows: [
      'Exceso de confianza, quemarse por exposición constante, egocentrismo infantil.',
      'El riesgo es leerla como "Te vas a ir de vacaciones a la playa".',
      'Conviene no caer en "Todo en tu vida va a ser perfecto siempre".'
    ],
    visualSymbols: [
      'El niño desnudo sobre el caballo blanco — el yo sin disfraces, lo que queda cuando se cae el adorno',
      'El estandarte rojo en su mano — la vitalidad y el entusiasmo que se llevan al frente',
      'Los girasoles detrás del muro — los testigos que crecen al ritmo de su luz, no al revés',
      'La pared baja a sus pies — el límite entre lo conocido y lo nuevo, ya superable',
      'El sol con cara humana — la claridad que también te mira de vuelta'
    ],

    reading: 'Algo se está volviendo simple. No es euforia, es alivio. Lo que tienes enfrente probablemente sea más obvio de lo que estabas dispuesta a ver.',
    synthesis: 'La claridad no es premio. Es lo que queda cuando sueltas lo que la tapaba.',
    extension: 'El Sol no llega como recompensa por haber sufrido suficiente. Llega cuando algo en ti termina de ordenarse sin que te hubieras dado cuenta del último gesto. Mira la imagen: el niño está desnudo, sin armadura, sobre un caballo blanco — no actúa, no posa, no está demostrando nada. Está exactamente donde está, y eso es suficiente. El estandarte rojo en su mano dice que la alegría no es pasiva: lleva sangre, vitalidad. Los girasoles detrás del muro no compiten con él, crecen al ritmo de su luz. Si esta carta aparece, quizás haya menos para hacer y más para reconocer. Que llegaste. Que se simplificó algo. Que estás en un momento donde no necesitas tanto ruido como antes. La parte difícil no es disfrutarlo: es permitirte que sea esto, sin esperar que se complique para confirmar que es real.',
    prompt: '¿Qué se te volvió evidente cuando dejaste de complicarlo?',

    positions: {
      whatIs:      'Hay claridad, energía vital o comprensión directa apareciendo en escena.',
      whatCrosses: 'El exceso de exposición —o la exigencia de "estar bien"— puede desbalancear lo que ya estaba ordenado.',
      whatOpens:   'Se abre una etapa más liviana, donde lo importante se vuelve claro sin esfuerzo.'
    },

    reversed: {
      essence: 'El sol todavía está, pero el niño se cubrió con una manta. La claridad llegó y nadie sale a recibirla.',
      reading: 'La luz está disponible y no la dejas entrar. O te exiges una felicidad performada para mostrar que estás bien y la alegría real se queda pidiendo permiso, o no terminas de creerle a la calma porque "siempre que estoy bien pasa algo". La carta no se invirtió en oscuridad: se invirtió en simplicidad rechazada.',
      synthesis: 'Hay una alegría discreta que pide ser recibida. Negarla también es una forma de complicarlo todo.',
      prompt: '¿Qué cosa simple y buena estás complicando para no tener que aceptarla tal cual es?',
      manifestations: [
        'Estar en una situación luminosa y descubrirte buscando, sin querer, qué podría salir mal',
        'Posar una vida feliz para los demás mientras adentro te falta el placer básico de estar siendo tú',
        'Necesitar que algo sea complicado para sentir que vale la pena, y rechazar lo fácil aunque te haga bien'
      ],
      shadows: [
        'Se bloquea la recepción — la claridad llega y no se deja habitar.',
        'Se exagera la performance de bienestar o la sospecha hacia lo bueno.',
        'Se evita mirar que mereces lo simple, lo claro, lo sin disfraz.'
      ]
    }
  },

  {
    name:    'El Juicio',
    number:  'XX',
    essence: 'Algo en ti te está llamando.',

    traditionalMeanings: [
      'Despertar',
      'Reconocimiento',
      'Verdad interior',
      'Llamado profundo',
      'Renacimiento simbólico',
      'Síntesis del propio camino'
    ],
    archetypes: [
      'El despertar que no se puede ignorar',
      'La voz íntima que pide ser escuchada',
      'El reconocimiento de quién sos después de todo'
    ],
    emotionalThemes: [
      'Claridad emocional',
      'Reconocimiento sin máscara',
      'Llamado interno',
      'Necesidad de coherencia profunda',
      'Despertar gradual'
    ],
    manifestations: [
      'Darse cuenta súbitamente de una vocación reprimida que exige ser vivida',
      'Soltar la culpa por un error de juventud y sentir que el peso físico desaparece',
      'Aceptar de golpe una verdad incómoda que obliga a cambiar toda la vida'
    ],
    shadows: [
      'Fanatismo implacable, negarse a perdonar a los demás o a uno mismo.',
      'El riesgo es leerla como "Alguien te va a juzgar injustamente en tu entorno".',
      'Conviene no caer en "Vas a ganar un juicio en los tribunales".'
    ],
    visualSymbols: [
      'La trompeta del ángel — el llamado que viene de adentro y suena igual de claro afuera',
      'Las figuras saliendo de las tumbas — partes tuyas que vuelven a estar disponibles',
      'Los brazos abiertos — la entrega serena al reconocimiento',
      'La bandera con cruz roja — la unión de lo material y lo simbólico',
      'Las montañas nevadas al fondo — la altura interior, fría y clara'
    ],

    reading: 'Algo en ti está pidiendo ser reconocido. Esta carta no es premio ni castigo: es despertar. Hay una verdad propia, callada hace tiempo, que está empezando a hacer ruido, y lo que pide es ser escuchada sin negociarla más.',
    synthesis: 'El llamado no se inventa. Se reconoce.',
    extension: 'El Juicio no juzga en sentido moral: juzga en sentido de discernir, de ver con claridad. La trompeta del ángel no anuncia un veredicto; anuncia que algo dentro tuyo —una vocación, un valor, una verdad— está pidiendo salir a la superficie. Las figuras que se levantan de las tumbas no llegan rotas: llegan con los brazos abiertos, porque reconocer lo propio, aunque cueste, también libera. Si esta carta aparece, hay un llamado que ya no se puede silenciar sin costo. No tiene que ser grande ni dramático; muchas veces es íntimo, casi privado: una decisión que viene de más adentro que las anteriores, una claridad sobre quién eres cuando dejas de actuar para los demás. Y lo importante: este despertar no exige que cambies todo de golpe. Exige que dejes de fingir que no escuchaste.',
    prompt: '¿Qué llamado interno estás postergando reconocer?',

    positions: {
      whatIs:      'Hay un despertar interno o un reconocimiento que pide ser escuchado.',
      whatCrosses: 'Negar lo que ya sabes o esperar permiso externo puede frenar el proceso.',
      whatOpens:   'Se abre una etapa de coherencia profunda contigo misma.'
    },

    reversed: {
      essence: 'La trompeta sonó y nadie levantó la cabeza. Las tumbas siguen abiertas, pero las figuras se quedaron adentro.',
      reading: 'Escuchaste el llamado y bajaste el volumen. Pospones la decisión de fondo —la que cambia el rumbo, no las apariencias— y te ocupas de tareas más chicas para no enfrentarla. O al revés: reaccionaste con tanto fervor que el despertar se volvió fanatismo, una nueva máscara más alta que la anterior.',
      synthesis: 'Hacer oídos sordos también es una decisión. Una que cobra intereses.',
      prompt: '¿Qué llamado interno estás silenciando con qué tipo de ruido?',
      manifestations: [
        'Saber que algo profundo te pide cambiar y dedicarte a reorganizar el clóset',
        'Convertir tu despertar en una nueva identidad rígida que repite con dogma lo que antes era intuición',
        'Esperar el momento perfecto para responderle a algo que ya hace meses que te llama'
      ],
      shadows: [
        'Se bloquea el reconocimiento — hay alarma sin respuesta.',
        'Se exagera la postergación o el fanatismo recién convertido.',
        'Se evita mirar que el llamado pide gesto, no diagnóstico ni espectáculo.'
      ]
    }
  },

  {
    name:    'El Mundo',
    number:  'XXI',
    essence: 'Cerrar también es una forma de empezar.',

    traditionalMeanings: ['Integración', 'Cierre consciente', 'Totalidad', 'Culminación de ciclo', 'Plenitud', 'Realización'],
    archetypes: ['La que llegó y baila', 'El cierre que también es umbral', 'La totalidad sin idealismo'],
    emotionalThemes: [
      'Plenitud serena',
      'Sensación de haber recorrido',
      'Reconciliación con el propio camino',
      'Gozo silencioso',
      'Cierre limpio'
    ],
    manifestations: [
      'Terminar un proyecto de años y sentir que el círculo se cerró exactamente como tenía que cerrarse',
      'La sensación física de pertenecer y encajar en el lugar donde estás, sin tener que demostrar nada',
      'Bailar, moverte o caminar sintiendo la sincronía del cuerpo con lo que está pasando, sin la cabeza opinando'
    ],
    shadows: [
      'Quedarte atascada en un ciclo completado por miedo a iniciar la nada del siguiente Loco.',
      'El riesgo es leerla como "vas a viajar por todo el mundo".',
      'Conviene no caer en "eres el centro del universo de alguien".'
    ],
    visualSymbols: [
      'La mandorla de hojas — el espacio sagrado del cierre, sin ser fortaleza',
      'La figura desnuda danzando — la totalidad que no necesita disfraz',
      'Las dos varas — el equilibrio entre pasado y porvenir',
      'Las cuatro figuras en las esquinas — los testigos completos del recorrido',
      'El paño suave alrededor — la dignidad del momento, sin alarde'
    ],

    reading: 'Algo se está cerrando, y este cierre tiene la calma de lo que llegó a término. Esta carta no es final: es totalidad. Reconocer lo recorrido también es parte del próximo paso, y lo que se completa no se pierde, se integra.',
    synthesis: 'Lo que cierras bien, te acompaña distinto.',
    extension: 'El Mundo es la última carta del recorrido y, sin embargo, no se siente como llegada definitiva: se siente como cierre con dignidad. La figura adentro de la mandorla no levanta los brazos en triunfo: baila, suavemente, en un espacio que reconoce lo recorrido y, al mismo tiempo, deja la puerta abierta. Las cuatro figuras en las esquinas son las mismas que aparecieron en la Rueda: testigos del ciclo, ahora completos. Si esta carta aparece, probablemente algo en ti esté reconociendo que terminó un capítulo —un proyecto, una identidad, una forma de relacionarte, una etapa— y que el próximo no necesita inventarse desde cero: nace de lo que tú ya eres. La trampa es creer que llegar es quedarse; la sabiduría es entender que toda totalidad humana es siempre, también, el inicio del siguiente Loco.',
    prompt: '¿Qué estás llegando a cerrar y qué reconoces haber aprendido en el camino?',

    positions: {
      whatIs:      'Hay un cierre consciente, una integración o una culminación de un ciclo.',
      whatCrosses: 'Quedarte en el cierre sin preparar el próximo paso puede volverlo nostalgia.',
      whatOpens:   'Se abre un nuevo ciclo nacido de lo que ya integraste, no de lo que te falta.'
    },

    reversed: {
      essence: 'La figura ya no baila adentro de la mandorla. O se quedó posando como en una foto, o salió a empezar otra cosa sin haber terminado de cerrar la primera.',
      reading: 'El cierre quedó incompleto. O instalaste el final como identidad ("ya completé esto", como timbre de logro) y dejaste de moverte, o pasaste a lo siguiente sin honrar lo que terminó —y ese resto sin cerrar se cuela en el próximo capítulo. La integración no es trofeo ni fuga: es despedida con dignidad.',
      synthesis: 'Lo que no cierras bien, te acompaña distinto. Y casi nunca a tu favor.',
      prompt: '¿Qué ciclo estás dando por cerrado de la boca para afuera, y qué pieza de él sigues cargando sin nombre?',
      manifestations: [
        'Hablar con orgullo de "una etapa que ya cerré" mientras en la práctica sigues buscando aprobación de la persona que dejaste',
        'Empezar un proyecto, una mudanza o un vínculo nuevo sin haber siquiera dicho gracias o adiós a lo anterior',
        'Confundir la culminación con la cima: vivir como si ya no hubiera más nada, y dejar de crecer ahí'
      ],
      shadows: [
        'Se bloquea el cierre integrado — termina la forma sin terminar lo que la habitaba.',
        'Se exagera la pose de logro o la huida hacia lo nuevo.',
        'Se evita mirar que toda totalidad humana también es comienzo — y todo comienzo pide despedirse de quien no vuelve.'
      ]
    }
  }
]

/* =====================================================================
 * Helpers
 * ===================================================================*/

export function findSymbolicCard(name) {
  return majorArcanaSymbolic.find(c => c.name === name) || null
}

export const symbolicCardsCount = majorArcanaSymbolic.length
