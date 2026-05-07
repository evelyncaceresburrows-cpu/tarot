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
    essence: 'Movimiento sin certezas.',

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
      'Ganas de empezar algo sin tener todas las respuestas',
      'Un gesto que parece imprudente y sin embargo es honesto',
      'Soltar una etapa antes de saber bien qué viene',
      'Una decisión que viene del cuerpo, no del cálculo'
    ],
    shadows: [
      'Confundir impulso con destino',
      'Saltar para no quedarte sintiendo lo anterior',
      'Idealizar lo nuevo como huida de lo viejo',
      'Negar el miedo en lugar de moverte con él'
    ],
    visualSymbols: [
      'El precipicio a sus pies — el riesgo asumido con liviandad',
      'El perro blanco — instinto que avisa, no que detiene',
      'El bolso pequeño — la experiencia previa, llevada con humildad',
      'La rosa blanca — la pureza del deseo de empezar',
      'El sol detrás — la energía vital que sostiene el salto'
    ],

    reading: 'Hay un movimiento queriendo empezar y no tiene todavía un nombre claro. Esta carta no te empuja: te recuerda que avanzar también puede ser un acto de confianza, no de plan. Lo nuevo asusta porque es nuevo, no porque esté mal.',
    synthesis: 'No siempre hay que entender antes de moverse. A veces se entiende moviéndose.',
    extension: 'El Loco no salta porque sea valiente: salta porque algo dentro suyo ya no cabe en lo anterior. La rosa blanca en su mano y el perro a sus pies dicen lo mismo desde lados distintos: este movimiento es honesto, aunque parezca desordenado. Si esta carta aparece, probablemente lo que pide la situación no sea más certeza, sino más permiso. La trampa de El Loco es confundir el salto con la huida; su sabiduría es saber que algunas decisiones solo se entienden después de haberlas tomado.',
    prompt: '¿Qué movimiento estás postergando para tener una certeza que probablemente nunca llegue?',

    positions: {
      whatIs:      'Hay un comienzo, un impulso o una apertura pidiendo lugar.',
      whatCrosses: 'La exigencia de tenerlo todo claro antes de moverse puede paralizar.',
      whatOpens:   'Se abre un terreno nuevo si te permitís entrar sin saberlo todo.'
    }
  },

  {
    name:    'El Mago',
    number:  'I',
    essence: 'Tenés más herramientas de las que estás usando.',

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
      'El cruce entre lo que pensás y lo que hacés'
    ],
    emotionalThemes: [
      'Foco',
      'Determinación tranquila',
      'Confianza en lo que sabés hacer',
      'Energía disponible',
      'Claridad de propósito'
    ],
    manifestations: [
      'Algo que venías pensando empieza a tomar forma cuando dejás de esperar las condiciones perfectas',
      'Una conversación, un proyecto, una decisión: tenés todo lo necesario para iniciarlo',
      'Una habilidad tuya vuelve a ser útil después de un tiempo guardada',
      'Te das cuenta de que el siguiente paso depende menos de afuera y más de vos'
    ],
    shadows: [
      'Manipular en lugar de manifestar: usar el saber para forzar y no para construir',
      'Dispersar la energía en muchos frentes y no concretar ninguno',
      'Confundir poder con mostrarse',
      'Esperar el "permiso" antes de mover lo que ya está listo'
    ],
    visualSymbols: [
      'La lemniscata sobre la cabeza — energía infinita disponible si se canaliza',
      'Los cuatro elementos sobre la mesa — todo lo necesario ya está al alcance',
      'Una mano hacia arriba, otra hacia abajo — recibir y entregar al mismo tiempo',
      'La banda blanca ceñida pero suelta — disciplina sin opresión',
      'Las rosas y los lirios — deseo y pureza creciendo en el mismo jardín'
    ],

    reading: 'Tenés a mano más de lo que estás usando. Esta carta no te empuja; te recuerda que el punto de partida ya está acá, esperando un gesto consciente. No es momento de planificar más: es momento de poner la mano sobre algo concreto y empezar.',
    synthesis: 'El poder no es tener: es elegir cómo se usa lo que ya tenés.',
    extension: 'El Mago no inventa nada: ordena lo que ya está. Sobre su mesa están los cuatro elementos —pensamiento, emoción, cuerpo, materia— y su trabajo no es traer más, sino elegir con qué empezar. La lemniscata sobre su cabeza no es magia exterior: es la confirmación de que la energía circula cuando hay un canal claro. Si esta carta aparece, probablemente no te falte nada esencial; lo que falta es el gesto que une intención y acción. La trampa de El Mago es creer que el poder está en demostrar; su sabiduría es saber que el poder está en concretar, aunque nadie esté mirando.',
    prompt: '¿Qué herramienta tuya está sin usar, esperando que la elijas?',

    positions: {
      whatIs:      'Hay voluntad disponible y herramientas concretas para iniciar algo.',
      whatCrosses: 'La dispersión o la búsqueda de aprobación pueden frenar el movimiento.',
      whatOpens:   'Se abre un terreno donde lo intencional puede tomar forma real.'
    }
  },

  {
    name:    'La Sacerdotisa',
    number:  'II',
    essence: 'Hay verdades que solo se ven en silencio.',

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
      'Una sensación que sabés que es cierta aunque no puedas explicarla',
      'Necesidad de estar más adentro que afuera por un tiempo',
      'Una pausa antes de responder que cambia toda la conversación',
      'Recordar algo importante justo cuando dejás de buscarlo'
    ],
    shadows: [
      'Esconderse detrás del silencio para no decir lo que hay que decir',
      'Confundir cautela con miedo a mostrarse',
      'Romantizar el misterio como excusa para no actuar',
      'Negar lo que ya intuís porque pedirlo en voz alta cuesta'
    ],
    visualSymbols: [
      'Las dos columnas, blanca y negra — los opuestos que ella sostiene sin elegir uno',
      'El velo bordado con granadas — lo oculto, no lo prohibido',
      'La luna creciente a sus pies — lo cíclico, lo intuitivo, lo emocional',
      'El rollo en su regazo — el saber que no se exhibe',
      'La cruz sobre el pecho — el cruce entre cuerpo y misterio'
    ],

    reading: 'Algo en vos ya sabe. No hace falta forzarlo. Si te quedás un rato sin pedirle la respuesta, llega.',
    synthesis: 'A veces saber es esperar.',
    extension: 'Está sentada entre dos columnas porque su sabiduría no elige. Sostiene los opuestos sin reducirlos a uno. El velo a su espalda está bordado, no cerrado: lo que guarda no está prohibido, está esperando. Si esta carta aparece, hay algo que ya percibís y todavía no encontró cómo nombrarse. No conviene apurarlo. Lo que se obliga a decir antes de tiempo se distorsiona. Lo que se sostiene en silencio madura. La trampa de esta carta es confundir el silencio con esconderse; su sabiduría, entender que ciertas verdades sólo emergen cuando se las deja respirar.',
    prompt: '¿Qué sabés que todavía no dijiste en voz alta?',

    positions: {
      whatIs:      'Hay una intuición o saber interior pidiendo espacio para escucharse.',
      whatCrosses: 'La urgencia de respuestas o la necesidad de explicar pueden tapar lo que sabés.',
      whatOpens:   'Se abre una comprensión más serena, nacida del silencio y no de la urgencia.'
    }
  },

  {
    name:    'La Emperatriz',
    number:  'III',
    essence: 'Lo que cuidás, crece.',

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
      'Una etapa donde algo —un vínculo, un proyecto, una idea— pide cuidado más que decisiones',
      'Volver a habitar el cuerpo después de un tiempo de cabeza',
      'Crear algo sin medirlo todavía con ojos de productividad',
      'Encontrar placer en lo cotidiano: la comida, el tacto, una textura, una luz'
    ],
    shadows: [
      'Cuidar a otros y olvidar el propio cuerpo',
      'Confundir abundancia con saturación',
      'Dar de más para sentirse necesaria',
      'Negarse el placer porque "todavía no te lo merecés"'
    ],
    visualSymbols: [
      'El trono entre la vegetación — el poder que reposa en lo vivo',
      'La corona de doce estrellas — lo cíclico y femenino, no lo brillante',
      'Las granadas en el vestido — la fertilidad como abundancia interior',
      'El campo de trigo a sus pies — lo que está madurando sin que ella tenga que apurarlo',
      'El símbolo de Venus apoyado, no exhibido — el deseo sereno de crear'
    ],

    reading: 'Hay algo en vos que quiere crear, sostener o cuidar, y lo que pide no es más esfuerzo: pide presencia. Esta carta te invita a habitar el cuerpo, los sentidos, el tiempo lento. Lo que cultivás con cariño, sin medirlo todo el tiempo, está creciendo más de lo que parece.',
    synthesis: 'Crear también es esperar.',
    extension: 'La Emperatriz no produce: gestiona la vida desde adentro. Su trono no está en un palacio, está en medio del bosque, porque el lugar de la creación es el lugar donde algo crece a su propio ritmo. La corona de estrellas y el manto con granadas dicen lo mismo desde dos lados: lo fértil no se decreta, se acompaña. Si esta carta aparece, lo más útil quizás no sea hacer más, sino estar presente con más cariño en lo que ya está siendo. Cuidá lo que cuidás también con vos adentro: la maternidad simbólica no es solo hacia afuera. Y permitite el placer de los sentidos: la Emperatriz sabe que sin gozo, lo que se crea se vuelve obligación.',
    prompt: '¿Qué está creciendo en tu vida que solo necesita ser cuidado, no apurado?',

    positions: {
      whatIs:      'Hay un proceso creativo o afectivo que pide cuidado, presencia y tiempo lento.',
      whatCrosses: 'La urgencia o la auto-exigencia pueden bloquear la fertilidad de lo que está naciendo.',
      whatOpens:   'Se abre una etapa más sensorial, donde habitar el cuerpo y el placer es parte del crecimiento.'
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
      'Un momento donde poner reglas claras alivia más que aflojar todo',
      'Asumir el rol de quien organiza y sostener sin disculparse',
      'Tomar una decisión que no se discute más, simplemente se sostiene',
      'Necesitar estructura externa cuando lo interno está desordenado'
    ],
    shadows: [
      'Confundir control con cuidado',
      'Volver rígido lo que pedía firmeza, pero también flexibilidad',
      'Sostener todo solo porque no se confía en nadie más',
      'Pedir orden afuera para no mirar el desorden adentro'
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
    extension: 'El Emperador parece distante, pero su trabajo es serio: hace que las cosas se mantengan. La piedra debajo suyo no es frío, es base; los carneros tallados no son agresivos, son la voluntad firme que no se mueve cuando todo alrededor pide cambios bruscos. Si esta carta aparece, probablemente algo en vos esté pidiendo estructura: un horario, un límite con alguien, una decisión que ya no merece más vueltas. La trampa del Emperador es endurecerse cuando podría simplemente sostener; su sabiduría es entender que el orden no se opone al afecto, lo posibilita. Sin marco, el cuidado se vuelve caos; con demasiado marco, se vuelve ahogo. Esta carta te invita a encontrar el punto donde la firmeza protege en lugar de aprisionar.',
    prompt: '¿Dónde te falta estructura, y dónde te sobra?',

    positions: {
      whatIs:      'Hay una situación que pide orden, decisión clara o límites firmes.',
      whatCrosses: 'El control rígido puede confundirse con cuidado y ahogar lo vivo.',
      whatOpens:   'Se abre la posibilidad de sostener desde la firmeza serena, no desde el miedo.'
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
      'Una decisión donde tenés que elegir entre lo aprendido en casa y lo que vos pensás',
      'Buscar un consejo, un mentor, un marco —y notar cuánto de eso ya tenés',
      'Sentir el peso de "lo que se hace" frente a lo que querrías hacer',
      'Reconectar con un valor heredado que sí te representa'
    ],
    shadows: [
      'Repetir mandatos sin revisarlos',
      'Rebelarse por inercia contra todo lo recibido sin discernir qué sí servía',
      'Pedir permiso a una autoridad que ya no es tu autoridad',
      'Confundir tradición con verdad incuestionable'
    ],
    visualSymbols: [
      'Las dos llaves cruzadas a sus pies — lo que abre y lo que cierra del saber recibido',
      'Los dos discípulos arrodillados — la transmisión, el pasaje de generación',
      'El báculo triple — los planos de lo material, lo emocional y lo simbólico',
      'La corona de tres niveles — la jerarquía interna del saber',
      'Las columnas grises — el marco institucional, sólido pero no eterno'
    ],

    reading: 'Hay una tensión entre lo que aprendiste y lo que sentís ahora. Esta carta no te dice que rompas con la tradición: te invita a discernir qué de todo lo recibido todavía te sostiene y qué pide ser revisado. Pertenecer y pensar por una misma no son opuestos.',
    synthesis: 'Heredar no es destino. Es punto de partida.',
    extension: 'El Hierofante guarda algo importante: la memoria de que nadie aprende de cero, que toda búsqueda interior se apoya en saberes anteriores aunque después los reformule. Las dos llaves a sus pies dicen que el saber abre y también cierra: depende de cómo se use. Si esta carta aparece, probablemente haya un cruce entre lo que te enseñaron —en tu familia, en tu profesión, en tu cultura— y lo que estás empezando a sentir como propio. El trabajo no es destruir lo recibido ni acatarlo en bloque: es separar con cuidado, quedarte con lo que te representa y dejar ir lo que ya no. Pertenecer a algo más grande que vos misma no es debilidad; pertenecer sin discernir, sí.',
    prompt: '¿Qué creencia heredada estás sosteniendo por costumbre y no por convicción?',

    positions: {
      whatIs:      'Hay una situación atravesada por la tradición, los mandatos o el saber recibido.',
      whatCrosses: 'Aceptar sin cuestionar —o rebelarse sin discernir— puede simplificar de menos.',
      whatOpens:   'Se abre la posibilidad de elegir, dentro de lo recibido, qué hacés tuyo y qué soltás.'
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
      'Una decisión vincular que pide honestidad, no estrategia',
      'Sentir que dos caminos te tironean y que ninguno es del todo cómodo',
      'Una conversación donde lo que decidís cambia lo que sigue',
      'Reconocer en alguien algo que te invita a definirte'
    ],
    shadows: [
      'Esperar que afuera elijan por vos para no asumir el costo',
      'Confundir intensidad con destino',
      'Idealizar al otro hasta perder de vista lo propio',
      'Postergar la decisión hasta que las opciones se cierren solas'
    ],
    visualSymbols: [
      'El ángel sobre las dos figuras — la mirada que sostiene la decisión sin imponerla',
      'El sol detrás del ángel — la conciencia plena de lo que se está eligiendo',
      'El árbol con frutos detrás de la mujer — el deseo y sus consecuencias',
      'El árbol con llamas detrás del hombre — la voluntad y su riesgo',
      'La montaña entre ambos — el eje vertical, la propia conciencia que decide'
    ],

    reading: 'Hay una decisión que ya no es solo sobre lo que querés, sino sobre quién querés ser. Esta carta no romantiza el amor ni obliga a elegir rápido: te muestra que toda elección significativa también te define. La pregunta no es solo "qué elijo", sino "desde dónde elijo".',
    synthesis: 'Elegís dos veces: una con lo que decís, otra con lo que dejás de hacer.',
    extension: 'Los Enamorados no son solo una carta de amor: son una carta de coherencia. El ángel que sostiene la escena no decide por las figuras, las observa: lo que se está poniendo en juego no es solo el vínculo, es la propia honestidad. Si esta carta aparece, hay una decisión —vincular, vital, ética— que ya no se puede postergar sin costo. La trampa es esperar que las cosas se acomoden solas o que alguien decida por vos; la sabiduría es entender que toda elección importante también es una declaración sobre quién sos. La paz que viene después no depende de haber acertado; depende de haber elegido despierta.',
    prompt: '¿Qué te pide elegir esta situación, no solo a nivel de afuera, sino a nivel de quién sos?',

    positions: {
      whatIs:      'Hay una elección significativa, vincular o existencial pidiendo definición.',
      whatCrosses: 'Querer evitar el costo de elegir puede prolongar la confusión.',
      whatOpens:   'Se abre una claridad propia cuando elegís desde lo que sos, no desde lo que conviene.'
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
      'Un proyecto o decisión que requiere foco sostenido',
      'Sostener un rumbo aunque alrededor todo invite a dispersarte',
      'Manejar dos fuerzas internas que tiraban para lados distintos y empezar a alinearlas',
      'Avanzar sin esperar que las condiciones sean ideales'
    ],
    shadows: [
      'Confundir avanzar con escapar',
      'Imponer la voluntad por encima de los demás',
      'Llevar las riendas tan tensas que el cuerpo se cansa',
      'Llegar primero y olvidarse de por qué se quería llegar'
    ],
    visualSymbols: [
      'Las dos esfinges, blanca y negra — los impulsos opuestos que tira el mismo carro',
      'El dosel estrellado — el cielo que sigue, recordando que el camino tiene marco',
      'La armadura adornada — la firmeza que también es presencia',
      'La luna en los hombros — la sensibilidad que viaja con la voluntad',
      'La ciudad detrás — lo conocido, ya pequeño, que se va dejando atrás'
    ],

    reading: 'Hay un avance posible si sostenés el foco. Esta carta no te promete que el camino sea fácil: te muestra que tenés la fuerza necesaria si no te dispersás. El triunfo acá no es sobre los otros, es sobre lo que en vos quería ir para todos lados.',
    synthesis: 'No siempre falta fuerza. A veces falta dirección.',
    extension: 'El Carro avanza con dos esfinges tirando en sentidos casi opuestos, y sin embargo se mueve: porque quien va arriba no las pelea, las sostiene. Esa es la verdadera fuerza de esta carta: no la del músculo, la de la dirección. Si aparece, probablemente lo que la situación pide no sea más empuje, sino más enfoque. La trampa es confundir avanzar con dominar; la sabiduría es saber que el carro no se mueve por gritar a las esfinges, sino por mantener firme la rienda y clara la mirada hacia adelante. Y un detalle importante: este avance también descansa, también pausa. La voluntad sin escucha del cuerpo se rompe.',
    prompt: '¿Qué fuerzas internas estás peleando que, en realidad, podrían tirar del mismo carro?',

    positions: {
      whatIs:      'Hay un avance, una dirección o un foco pidiendo sostenerse.',
      whatCrosses: 'La dispersión, la prisa o la dureza pueden agotar el movimiento.',
      whatOpens:   'Se abre un camino real cuando la voluntad se alinea con el cuidado.'
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
      'Sostener un momento difícil sin endurecerte',
      'Hablar firme sin levantar la voz',
      'Acompañar una emoción tuya intensa sin pelearla',
      'Tomar una decisión necesaria con calma, no con dureza'
    ],
    shadows: [
      'Confundir suavidad con sumisión',
      'Reprimir lo que sentís en nombre de "ser buena"',
      'Apretar los dientes y llamarlo "fuerza"',
      'Subestimar el coraje que ya estás teniendo en silencio'
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
    extension: 'La Fuerza no domina al león con violencia: lo acompaña hasta calmarlo. Esa imagen es la clave de toda la carta. Lo más fuerte que tenés disponible casi nunca es el grito: es la presencia firme que no se desorganiza con lo intenso. Si esta carta aparece, probablemente haya algo de vos —una emoción, una situación, un vínculo— que te asusta por su intensidad y que no necesita ser reprimido sino acompañado. La trampa es confundir suavidad con debilidad; la sabiduría es entender que dominar lo propio sin lastimarlo es, quizás, la forma más madura de la fuerza humana.',
    prompt: '¿Qué emoción o situación intensa te está pidiendo más paciencia que dureza?',

    positions: {
      whatIs:      'Hay un momento que pide coraje sereno, no fuerza dura.',
      whatCrosses: 'Endurecerse o reprimir puede romper lo que pedía ser sostenido.',
      whatOpens:   'Se abre una manera más íntima y firme de habitar lo intenso.'
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
      'Una etapa donde necesitás estar más con vos misma que con nadie',
      'Una decisión que solo se entiende cuando bajás el ritmo',
      'Volver a leer, escribir, caminar —algo a solas— y notar que ahí pasa lo importante',
      'Decidir no responder enseguida y darte tiempo'
    ],
    shadows: [
      'Confundir soledad con aislamiento',
      'Quedarse en la pausa para no enfrentar lo siguiente',
      'Iluminar a otros y olvidarte de mirar tu propia oscuridad',
      'Convertir el retiro en evitación crónica'
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
    extension: 'El Ermitaño no se retira porque no le importe el mundo: se retira para volver a él con algo más claro adentro. Su lámpara no ilumina la montaña entera, ilumina el siguiente paso. Y eso es exactamente lo que sugiere esta carta: que no necesitás resolver todo de una vez, sino encender lo justo para no perder el rumbo. Si aparece, probablemente sea momento de retirarte un poco —de las redes, de las opiniones ajenas, del ruido emocional— y escuchar qué dice tu propia voz cuando deja de competir con todo lo demás. La trampa es confundir el retiro con la huida; la sabiduría es entender que la soledad bien elegida no aleja: te acerca a vos misma.',
    prompt: '¿Qué necesitás escuchar de vos misma que solo aparece en silencio?',

    positions: {
      whatIs:      'Hay una pausa, un retiro o una introspección pidiendo lugar.',
      whatCrosses: 'El ruido externo o la urgencia social pueden tapar lo que estás escuchando adentro.',
      whatOpens:   'Se abre una claridad propia cuando dejás de buscar afuera lo que ya estás iluminando.'
    }
  },

  {
    name:    'La Rueda de la Fortuna',
    number:  'X',
    essence: 'Todo lo que gira también te incluye.',

    traditionalMeanings: ['Ciclos', 'Cambio inevitable', 'Movimiento', 'Adaptación', 'Suerte y momento', 'Repetición simbólica'],
    archetypes: [
      'El movimiento que no espera',
      'La rueda que no se detiene aunque vos la mires fijo',
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
      'Algo que parecía estable empieza a moverse —para bien o para mal— sin tu intervención',
      'Una situación que ya viviste vuelve, pero con un matiz distinto',
      'Una oportunidad llega justo cuando parecía cerrada otra puerta',
      'Un cambio externo que te obliga a soltar la planificación'
    ],
    shadows: [
      'Querer parar la rueda para que no cambie lo que estaba bien',
      'Confundir mala suerte con merecimiento',
      'No ver el patrón que se repite porque cada vez parece distinto',
      'Esperar pasivamente que "el momento" haga lo que vos podrías mover'
    ],
    visualSymbols: [
      'La rueda con letras TARO / TORA — un mismo eje leído desde varias direcciones',
      'Las cuatro figuras aladas leyendo libros — los testigos fijos que sostienen el cambio',
      'La serpiente que baja — lo que se desprende en este giro',
      'Anubis que sube — lo que vuelve a aparecer en este giro',
      'La esfinge arriba con espada — el silencio que conoce el patrón completo'
    ],

    reading: 'Algo está girando y no necesita tu permiso. Esta carta no te dice si la rueda sube o baja: te recuerda que es rueda, y que tu trabajo es estar atenta al patrón, no detenerla. Lo que parecía azar suele ser, cuando lo mirás de cerca, un ciclo que vuelve.',
    synthesis: 'No controlás la rueda. Sí elegís cómo te parás en ella.',
    extension: 'La Rueda de la Fortuna no es destino ni capricho: es la confirmación de que todo en la experiencia humana se mueve en ciclos, y que el patrón —no el suceso aislado— es lo que enseña. Las criaturas en las esquinas leen, fijas; lo que cambia es el centro. Si esta carta aparece, vale la pena preguntarse menos "¿por qué ahora?" y más "¿qué se está cerrando, qué se está abriendo, y dónde estuve antes en este mismo lugar?". La rueda no premia ni castiga; revela. Lo que se va, ya estaba aflojándose; lo que llega, ya venía circulando. Tu lugar en este momento es estar despierta al giro y no resistirlo desde la nostalgia de lo anterior.',
    prompt: '¿Qué patrón de tu vida está volviendo, y qué te pide hacer distinto esta vez?',

    positions: {
      whatIs:      'Hay un cambio cíclico, un giro de momento o una repetición pidiendo atención.',
      whatCrosses: 'Querer detener el movimiento o ignorar el patrón puede prolongar el desgaste.',
      whatOpens:   'Se abre la posibilidad de leer el ciclo y ubicarte distinto en él.'
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
      'Una decisión que pide pensar en frío, no en caliente',
      'Asumir tu parte en algo que querías leer solo desde afuera',
      'Una conversación pendiente que ya no se puede postergar',
      'Sentir el peso real de algo que dijiste o hiciste, sin victimizarte ni castigarte'
    ],
    shadows: [
      'Confundir justicia con venganza',
      'Esperar que afuera te devuelvan lo que vos no estás dando adentro',
      'Sostener una mentira chiquita por miedo a la verdad grande',
      'Castigarse en lugar de corregirse'
    ],
    visualSymbols: [
      'La balanza — el peso real, no el que querrías que tuviera',
      'La espada vertical — el corte que separa lo cierto de lo cómodo',
      'Las dos columnas — el equilibrio entre lo afectivo y lo racional',
      'La corona con un cuadrado — la mente firme, sin adornos',
      'El broche que cierra el manto — lo que se contiene para poder decidir bien'
    ],

    reading: 'Algo te está pidiendo coherencia: alinear lo que decís, lo que pensás y lo que hacés. Esta carta no acusa; pesa. Y pesar no es castigarse: es mirar lo real con cuidado y elegir desde ahí, aunque la verdad implique un costo.',
    synthesis: 'La verdad no se discute. Se sostiene.',
    extension: 'La Justicia no es una corte: es una voz interna que te reconoce. Su balanza no decide a favor de nadie en particular; mide lo real, y lo real incluye también lo que vos hiciste o dejaste de hacer. La espada que sostiene es vertical, no apoyada: corta porque a veces eso es lo que cuida, no porque sea cruel. Si esta carta aparece, hay un punto donde la incoherencia ya no se sostiene sin costo. Eso no significa explotar ni confesar todo dramáticamente; significa ajustar, decir lo que faltaba decir, asumir lo que te corresponde. La paz que llega después no es alivio rápido; es la calma sólida de quien ya no carga lo que no era suyo —y ya no esquiva lo que sí—.',
    prompt: '¿Qué verdad estás postergando porque su consecuencia te incomoda?',

    positions: {
      whatIs:      'Hay una situación que pide honestidad y decisión coherente.',
      whatCrosses: 'Esperar justicia afuera sin asumir la propia parte puede frenar el proceso.',
      whatOpens:   'Se abre un cierre limpio cuando lo que pensás, decís y hacés vuelven a alinearse.'
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
      'Una etapa donde no podés avanzar y, si insistís, empeora',
      'Sentir que estás "en pausa" mientras alrededor todos se mueven',
      'Mirar una situación familiar y verla, de pronto, completamente distinta',
      'Soltar una manera tuya de hacer las cosas, sin saber todavía cuál la reemplaza'
    ],
    shadows: [
      'Pasividad disfrazada de espiritualidad',
      'Aceptar lo inaceptable y llamarlo "entrega"',
      'Dramatizar el sacrificio',
      'Quedarse colgada sin sacar lecturas, esperando que algo afuera se mueva'
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
    }
  },

  {
    name:    'La Muerte',
    number:  'XIII',
    essence: 'Lo que termina, libera.',

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
      'Algo se está terminando y vos lo sabés antes de poder admitirlo',
      'Un vínculo, una etapa, una identidad o una rutina que ya no encaja',
      'Una pérdida que también deja espacio',
      'Sentir que no podés volver a ser quien eras antes de esto, aunque lo intentes'
    ],
    shadows: [
      'Sostener artificialmente lo que ya terminó por miedo al vacío',
      'Hacer de la transformación una identidad permanente',
      'Romantizar el final como castigo o como heroísmo',
      'Negar el duelo y saltar al "renacimiento" antes de tiempo'
    ],
    visualSymbols: [
      'El caballo blanco — la transición lúcida, no oscura',
      'La bandera negra con rosa blanca — el final que también florece',
      'La figura caída con corona — la identidad anterior que ya no manda',
      'El niño que recibe sin miedo — la inocencia que sabe rendirse al cambio',
      'El sol entre dos torres — el horizonte después del paso, ya visible'
    ],

    reading: 'Algo está terminando. No con violencia, con lucidez. La transformación ya empezó por dentro, mucho antes de esta carta.',
    synthesis: 'Lo que termina no se llevó la vida. Hizo lugar.',
    extension: 'Casi nunca es muerte literal. Es una identidad, una etapa, un vínculo, una manera de estar que ya no encaja. Su caballo es blanco —no oscuro—, porque la transición no viene a romper, viene a ordenar lo que ya estaba aflojándose. La rosa blanca en la bandera negra lo dice sin discurso: incluso este final tiene su forma de florecer. Si esta carta aparece, probablemente algo en vos lo sepa antes de poder admitirlo. No es la pérdida lo que duele; es la fuerza que estás haciendo para que la rueda gire hacia atrás. El duelo lleva su tiempo. Conviene dejarlo que dure. Y al fondo, casi pintado, se ve el sol entre dos torres: el horizonte ya está. Distinto, pero está.',
    prompt: '¿Qué estás sosteniendo que ya terminó?',

    positions: {
      whatIs:      'Hay un cierre, una transformación o un desprendimiento ya en curso.',
      whatCrosses: 'La resistencia a aceptar el final puede prolongar el desgaste.',
      whatOpens:   'Se abre un después distinto cuando lo que terminó se deja ir con honestidad.'
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
      'Paciencia con vos misma',
      'Dosis justa',
      'Síntesis emocional'
    ],
    manifestations: [
      'Dejar de elegir entre dos extremos y empezar a mezclarlos en su justa medida',
      'Volver a un estado interno tranquilo después de un tiempo agitado',
      'Una decisión que pide combinar deseo y prudencia, sin sacrificar ninguno',
      'Recuperar tu propio ritmo después de adaptarte demasiado al de otros'
    ],
    shadows: [
      'Buscar paz reprimiendo el conflicto en lugar de integrarlo',
      'Templanza como anestesia: aplanar todo para no sentir nada',
      'Diluir tu posición para evitar la fricción',
      'Confundir equilibrio con quedarse en el medio sin elegir'
    ],
    visualSymbols: [
      'Las dos copas — los opuestos que pueden compartir el mismo flujo',
      'Un pie en tierra y otro en agua — lo concreto y lo emocional sostenidos a la vez',
      'El triángulo dentro del cuadrado en el pecho — el espíritu sostenido por la materia',
      'El sendero hacia las montañas — la integración como camino, no como llegada',
      'Las alas — la trascendencia que no escapa, integra'
    ],

    reading: 'Esta carta no te promete equilibrio total; te muestra que la calma se construye mezclando, no eliminando. Hay algo en vos que necesita combinar dos partes que parecen contradecirse y aprender a sostenerlas juntas. La paz que aparece después no es perfecta: es real.',
    synthesis: 'Equilibrio no es estar quieta. Es saber sostenerte mientras te movés.',
    extension: 'La Templanza no llega cuando todo está en orden, llega cuando aprendiste a sostener lo desordenado con cuidado. La figura alada está vertiendo agua entre dos copas y no derrama una gota, no porque sea perfecta, sino porque está atenta. Un pie en la tierra, otro en el agua: ni se desborda en lo emocional ni se rigidiza en lo concreto. Si esta carta aparece, probablemente haya una mezcla que estás aprendiendo a hacer —entre dos deseos, entre dos personas, entre dos partes de vos misma— y la pregunta no es cuál elegir, sino cómo dosificar. La trampa es buscar paz negando el conflicto; la sabiduría es entender que la calma profunda solo se sostiene cuando se incluye lo que parecía contradictorio.',
    prompt: '¿Qué dos partes de vos estás tratando de elegir cuando, en realidad, podrían convivir?',

    positions: {
      whatIs:      'Hay un proceso de integración o de regulación emocional en curso.',
      whatCrosses: 'Querer eliminar lo incómodo en lugar de mezclarlo puede romper el equilibrio.',
      whatOpens:   'Se abre una calma más estable al sostener los opuestos a la vez.'
    }
  },

  {
    name:    'El Diablo',
    number:  'XV',
    essence: 'Lo que te ata también te conoce.',

    traditionalMeanings: ['Apego', 'Materialidad', 'Deseo intenso', 'Dependencia emocional', 'Pacto inconsciente', 'Sombra reconocida'],
    archetypes: [
      'El espejo que muestra lo que no querés ver',
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
      'Volver a una persona, una conversación o una costumbre que ya sabés cómo termina',
      'Confundir intensidad con verdad',
      'Sostener un vínculo o una rutina por miedo al vacío que dejaría su ausencia',
      'Una atracción que te incomoda porque te conoce más de lo que te gustaría'
    ],
    shadows: [
      'Llamar destino a lo que es repetición',
      'Convertir el deseo en juez moral en lugar de información',
      'Pelear con la sombra en lugar de mirarla',
      'Quedarte porque irte implica admitir que sabías'
    ],
    visualSymbols: [
      'Las dos figuras encadenadas — cadenas anchas, podrían sacarse sin esfuerzo',
      'El pentagrama invertido sobre la frente — la mente quieta en el deseo',
      'La antorcha hacia abajo — la luz usada para sostener la ilusión, no para mostrar',
      'El altar bajo la figura — el pacto sostenido por uno mismo',
      'Las pequeñas alas de murciélago — un vuelo hecho de noche, no de aire'
    ],

    reading: 'Hay algo que volvés a buscar aunque sepas cómo termina. No te pide juzgarte; te pide mirar de cerca qué te da, qué te quita, y por qué seguís yendo. Las cadenas en esta carta están sueltas: lo que parece atadura, casi siempre, también es elección.',
    synthesis: 'No es el deseo el problema. Es no mirarlo a los ojos.',
    extension: 'El Diablo no llega a condenar; llega a nombrar lo que vos ya sabías. Las cadenas que sostienen a las dos figuras no están cerradas con candado: se ven, se reconocen, se podrían quitar. Si todavía no se quitan, es porque el vínculo —con esa persona, con ese hábito, con esa imagen tuya— da algo además de quitar. La sombra no se cura mirándola con horror, se cura mirándola con curiosidad. Esta carta te pregunta qué estás obteniendo de eso que decís querer dejar, y por qué ese intercambio sigue siendo, por ahora, más tolerable que el vacío que dejaría su ausencia. Reconocer eso no es debilidad: es el primer movimiento honesto.',
    prompt: '¿Qué obtenés de eso que sabés que no te conviene?',

    positions: {
      whatIs:      'Hay un apego, un deseo o una repetición que está pesando más de lo que parece.',
      whatCrosses: 'Confundir intensidad con verdad puede mantener atada una historia que ya pidió cambio.',
      whatOpens:   'Se abre la posibilidad de mirar sin juicio lo que te ata, y desde ahí elegir distinto.'
    }
  },

  {
    name:    'La Torre',
    number:  'XVI',
    essence: 'Lo que cae, libera.',

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
      'Una conversación que cambia algo para siempre',
      'Un proyecto que se cae solo y al caer muestra que era hueco',
      'Un quiebre afectivo que estaba anunciándose hace tiempo',
      'Darte cuenta de algo que no podés des-saber'
    ],
    shadows: [
      'Sostener lo que ya cayó por miedo a aceptar el cambio',
      'Vivir la ruptura como castigo personal y no como ajuste',
      'Buscar reconstruir igual antes de entender qué se cayó',
      'Quedarte mirando los escombros sin permitirte el alivio'
    ],
    visualSymbols: [
      'El rayo dorado — la verdad atravesando una estructura',
      'La corona cayendo — la autoridad falsa que se suelta',
      'Las dos figuras cayendo — el alivio disfrazado de catástrofe',
      'La torre sobre la roca — lo construido sin base honesta',
      'Las llamas — energía liberada, no destrucción gratuita'
    ],

    reading: 'Algo se cayó. Y vas a estar bien, aunque ahora no lo parezca. Lo que parece ruptura, casi siempre, es alivio.',
    synthesis: 'No se cayó lo verdadero. Se cayó lo que ya no era cierto.',
    extension: 'La Torre no destruye al azar. Destruye lo que estaba apoyado en algo que no era real: una expectativa, una idea sobre vos, una identidad prestada, un acuerdo silencioso que ya no servía. El rayo que parece venir del cielo casi siempre es algo que vos ya sabías y que finalmente encontró cómo salir. No te pide estar bien con la caída. Te pide no ponerle obstáculos al alivio que viene después. Lo nuevo todavía no se ve. Pero ya empezó. Y lo que se cae acá no se cae para siempre: se cae para que puedas construir lo siguiente sobre algo que sí te aguante.',
    prompt: '¿Qué se desarmó que, en el fondo, ya sabías que no iba a aguantar más?',

    positions: {
      whatIs:      'Hay un cambio brusco o una ruptura redefiniendo el escenario actual.',
      whatCrosses: 'El apego a lo anterior puede intensificar el impacto del cambio.',
      whatOpens:   'Se abre un terreno nuevo, más auténtico aunque aún inestable.'
    }
  },

  {
    name:    'La Estrella',
    number:  'XVII',
    essence: 'Después de la tormenta, también hay agua para vos.',

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
      'Sentir, después de un tramo difícil, que algo adentro vuelve a respirar',
      'Una creatividad o un proyecto que vuelve sin estridencia',
      'Confiar de nuevo en vos misma o en alguien, lentamente',
      'Una conversación, una caminata o un silencio que repara más de lo esperado'
    ],
    shadows: [
      'Confundir esperanza con ilusión vacía',
      'Negar el cansancio de lo que pasó para "seguir adelante"',
      'Esperar reparación afuera sin abrirte a recibirla',
      'Idealizar la calma y exigirse no volver a estar mal'
    ],
    visualSymbols: [
      'El cuerpo desnudo — la verdad sin protección, ya sin armadura',
      'Las dos jarras vertiendo — lo que recibís se vuelve a dar, no se acumula',
      'El agua que vuelve al estanque — lo emocional que circula sin perderse',
      'La estrella mayor con siete satélites — el guía interno y los ciclos que lo acompañan',
      'El ibis en el árbol — el pensamiento sereno que observa sin urgencia'
    ],

    reading: 'Después de un tramo difícil, algo se está acomodando con suavidad. Esta carta no te empuja hacia adelante: te recuerda que ya estás recuperando, aunque no se note todavía. La esperanza que aparece es vulnerable, pero verdadera.',
    synthesis: 'Reparar no es volver a ser igual. Es volver a confiar.',
    extension: 'La Estrella aparece después de los grandes quiebres porque su trabajo es reparar lo que la urgencia ya no necesita romper. La figura está desnuda, no por exposición, sino porque ya no tiene que defenderse: lo difícil pasó, y lo que queda es la posibilidad de empezar a confiar de nuevo, sin garantías. Las dos jarras vierten al mismo tiempo: lo que recibe lo devuelve, lo emocional vuelve a circular. Si esta carta aparece, probablemente haya algo en vos pidiendo cuidado lento —no plan, no productividad, cuidado—. La esperanza acá no promete que todo será fácil; promete que estás más entera de lo que sentís, y que la luz que te guía no necesita ser brillante: alcanza con ser constante.',
    prompt: '¿Dónde está empezando a volver tu confianza, aunque sea apenas?',

    positions: {
      whatIs:      'Hay un proceso de reparación, esperanza o calma volviendo después de algo difícil.',
      whatCrosses: 'Apurar la curación o desconfiar de la calma puede frenar la apertura.',
      whatOpens:   'Se abre una confianza nueva, suave y sostenida en el tiempo.'
    }
  },

  {
    name:    'La Luna',
    number:  'XVIII',
    essence: 'No todo es claro, y está bien.',

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
      'Una sensación incómoda que no termina de ponerse en palabras',
      'Sueños vívidos que dicen algo que el día borró',
      'Dudar de lo que ves porque algo en vos sospecha de la versión oficial',
      'Una etapa donde todo parece ambiguo y eso, en sí, es información'
    ],
    shadows: [
      'Confundir intuición con miedo viejo disfrazado',
      'Quedarte en la niebla porque salir implica decidir',
      'Creer que la oscuridad es enemiga cuando es maestra',
      'Negar lo que el cuerpo ya está nombrando en silencio'
    ],
    visualSymbols: [
      'Las dos torres a los costados — los límites entre dos mundos',
      'El perro y el lobo aullando — lo doméstico y lo salvaje en vos',
      'El cangrejo saliendo del agua — algo del subconsciente que asoma',
      'El sendero serpenteante — el camino no es recto y eso es honesto',
      'La cara melancólica de la luna — la verdad observada sin juicio'
    ],

    reading: 'No está todo claro. Y eso, ahora, también es una respuesta. La intuición trabaja despacio cuando lo que está en juego importa.',
    synthesis: 'La niebla no engaña. Pide caminar más despacio.',
    extension: 'La Luna no es enemiga de la verdad. Es la forma que tiene la verdad de llegar cuando todavía no estamos listas para verla a pleno sol. El sendero serpentea no porque esté mal trazado: algunos procesos se piensan caminando, no antes de caminar. El cangrejo que asoma del agua es eso que sabías y habías guardado, y que ahora pide aparecer un rato. No tenés que entenderlo todo enseguida. Lo que está confuso no es porque vos no entiendas; es porque todavía no terminó de mostrarse. Avanzar despacio en la niebla es más sabio que correr para salir de ella. Y a veces lo que parece miedo es solo el cuerpo nombrando algo antes que la cabeza.',
    prompt: '¿Qué estás percibiendo que todavía no querés nombrar?',

    positions: {
      whatIs:      'Hay confusión, sensibilidad o información no visible del todo.',
      whatCrosses: 'El miedo viejo puede disfrazarse de intuición y desorientar.',
      whatOpens:   'Se abre una comprensión más intuitiva si no apurás las respuestas.'
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
      'Algo se vuelve obvio justo cuando dejás de complicarlo',
      'Sentirte vista o reconocida sin tener que explicarte',
      'Recuperar ganas de cosas simples',
      'Un momento donde lo que sos y lo que hacés coinciden sin esfuerzo'
    ],
    shadows: [
      'Confundir brillar con tener que rendir',
      'Performar alegría cuando todavía estás cansada',
      'Asumir que estar bien tiene que verse perfecto',
      'La soledad sutil de los momentos buenos no compartidos'
    ],
    visualSymbols: [
      'El niño desnudo sobre el caballo blanco — quien sos sin disfraces',
      'Los girasoles detrás del muro — testigos que crecen al ritmo de tu luz',
      'La pared baja — lo que separa lo conocido de lo nuevo, ya superable',
      'La pluma roja — la vitalidad joven, la sangre del entusiasmo',
      'El sol con cara humana — la claridad que también te mira'
    ],

    reading: 'Algo se está volviendo simple. No es euforia, es alivio. Lo que tenés enfrente, probablemente, es más obvio de lo que estabas dispuesta a ver.',
    synthesis: 'La claridad no es premio. Es lo que queda cuando soltás lo que la tapaba.',
    extension: 'El Sol no llega como recompensa por haber sufrido suficiente. Llega cuando algo en vos termina de ordenarse sin que te dieras cuenta del último gesto. El niño en el caballo blanco no está actuando: está exactamente donde está, y eso es suficiente. Los girasoles, detrás del muro, no compiten; crecen al ritmo de su luz. Si esta carta aparece, quizás haya menos para hacer y más para reconocer. Que llegaste. Que se simplificó algo. Que estás en un momento donde no necesitás tanto ruido como antes. La parte difícil ahora no es disfrutarlo: es permitirte que sea esto, sin esperar que se complique para confirmar que es real.',
    prompt: '¿Qué se vuelve evidente cuando dejás de complicarlo?',

    positions: {
      whatIs:      'Hay claridad, energía vital o comprensión directa apareciendo en escena.',
      whatCrosses: 'El exceso de exposición —o la exigencia de "estar bien"— puede desbalancear lo que ya estaba ordenado.',
      whatOpens:   'Se abre una etapa más liviana, donde lo importante se vuelve claro sin esfuerzo.'
    }
  },

  {
    name:    'El Juicio',
    number:  'XX',
    essence: 'Algo en vos te está llamando.',

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
      'Sentir un llamado interno que no podés seguir ignorando',
      'Reconocer algo de vos que venías evitando ver',
      'Una decisión que ya no es de la cabeza: viene de un lugar más adentro',
      'Volver a una vocación, un valor o una verdad que habías dejado de lado'
    ],
    shadows: [
      'Convertir el despertar en performance espiritual',
      'Esperar señales externas para confirmar lo que ya sabés',
      'Confundir llamado con presión social',
      'Castigarse por no haber escuchado antes'
    ],
    visualSymbols: [
      'La trompeta del ángel — el llamado que viene de adentro y suena igual de claro afuera',
      'Las figuras saliendo de las tumbas — partes tuyas que vuelven a estar disponibles',
      'Los brazos abiertos — la entrega serena al reconocimiento',
      'La bandera con cruz roja — la unión de lo material y lo simbólico',
      'Las montañas nevadas al fondo — la altura interior, fría y clara'
    ],

    reading: 'Algo en vos está pidiendo ser reconocido. Esta carta no es premio ni castigo: es despertar. Hay una verdad propia, callada hace tiempo, que está empezando a hacer ruido, y lo que pide es ser escuchada sin negociarla más.',
    synthesis: 'El llamado no se inventa. Se reconoce.',
    extension: 'El Juicio no juzga en sentido moral: juzga en sentido de discernir, de ver con claridad. La trompeta del ángel no anuncia un veredicto; anuncia que algo dentro tuyo —una vocación, un valor, una verdad— está pidiendo salir a la superficie. Las figuras que se levantan de las tumbas no llegan rotas: llegan con los brazos abiertos, porque reconocer lo propio, aunque cueste, también libera. Si esta carta aparece, hay un llamado que ya no se puede silenciar sin costo. No tiene que ser grande ni dramático; muchas veces es íntimo, casi privado: una decisión que viene de más adentro que las anteriores, una claridad sobre quién sos cuando dejás de actuar para los demás. Y lo importante: este despertar no exige que cambies todo de golpe. Exige que dejes de fingir que no escuchaste.',
    prompt: '¿Qué llamado interno estás postergando reconocer?',

    positions: {
      whatIs:      'Hay un despertar interno o un reconocimiento que pide ser escuchado.',
      whatCrosses: 'Negar lo que ya sabés o esperar permiso externo puede frenar el proceso.',
      whatOpens:   'Se abre una etapa de coherencia profunda con vos misma.'
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
      'Una etapa, un proyecto o un proceso que se está cerrando con sentido',
      'Sentir que algo encajó después de un tramo largo de no entender',
      'Un agradecimiento sereno hacia tu propio recorrido',
      'La sensación de estar lista para algo nuevo, sin urgencia de empezarlo ya'
    ],
    shadows: [
      'Pensar que "ya está" y dejar de moverte',
      'Romantizar el cierre sin asumir lo que falta soltar',
      'Confundir plenitud con perfección',
      'Resistirse al próximo ciclo por nostalgia del que termina'
    ],
    visualSymbols: [
      'La mandorla de hojas — el espacio sagrado del cierre, sin ser fortaleza',
      'La figura desnuda danzando — la totalidad que no necesita disfraz',
      'Las dos varas — el equilibrio entre pasado y porvenir',
      'Las cuatro figuras en las esquinas — los testigos completos del recorrido',
      'El paño suave alrededor — la dignidad del momento, sin alarde'
    ],

    reading: 'Algo se está cerrando, y este cierre tiene la calma de lo que llegó a término. Esta carta no es final: es totalidad. Reconocer lo recorrido también es parte del próximo paso, y lo que se completa no se pierde, se integra.',
    synthesis: 'Lo que cerrás bien, te acompaña distinto.',
    extension: 'El Mundo es la última carta del recorrido y, sin embargo, no se siente como llegada definitiva: se siente como cierre con dignidad. La figura adentro de la mandorla no levanta los brazos en triunfo: baila, suavemente, en un espacio que reconoce lo recorrido y, al mismo tiempo, deja la puerta abierta. Las cuatro figuras en las esquinas son las mismas que aparecieron en la Rueda: testigos del ciclo, ahora completos. Si esta carta aparece, probablemente algo en vos esté reconociendo que terminó un capítulo —un proyecto, una identidad, una forma de relacionarte, una etapa— y que el próximo no necesita inventarse desde cero: nace de lo que vos ya sos. La trampa es creer que llegar es quedarse; la sabiduría es entender que toda totalidad humana es siempre, también, el inicio del siguiente Loco.',
    prompt: '¿Qué estás llegando a cerrar y qué reconocés haber aprendido en el camino?',

    positions: {
      whatIs:      'Hay un cierre consciente, una integración o una culminación de un ciclo.',
      whatCrosses: 'Quedarte en el cierre sin preparar el próximo paso puede volverlo nostalgia.',
      whatOpens:   'Se abre un nuevo ciclo nacido de lo que ya integraste, no de lo que te falta.'
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
