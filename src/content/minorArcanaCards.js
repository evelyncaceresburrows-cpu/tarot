/* ====================================================================
 * minorArcanaCards.js
 *
 * Cartas de los Arcanos Menores — schema corto, lectura situacional.
 *
 * Schema por carta:
 *   {
 *     essence:        string     ← 1 frase ancla
 *     reading:        string     ← 2-3 oraciones, lectura humana
 *     synthesis:      string     ← 1 oración, eco emocional
 *     prompt:         string     ← 1 pregunta breve, sin respuesta
 *     themes:         string[]
 *     manifestations: string[]   ← 3-4 escenas cotidianas
 *     shadows:        string[]   ← 2-3 sombras concretas
 *   }
 *
 * Estado:
 *   ✓ Copas    (14/14)
 *   · Espadas  (pendiente)
 *   · Bastos   (pendiente)
 *   · Oros     (pendiente)
 *
 * Apoyado en suitSystem y numericSystem de minorArcanaSuitSystem.js.
 * Tono contemplativo/editorial, no predictivo.
 * ===================================================================*/

export const minorArcanaCards = {

  /* =================================================================
   * COPAS · agua, vínculos, emoción, intuición
   * ===============================================================*/
  Copas: {

    /* --------- AS DE COPAS · semilla afectiva ------------------ */
    As: {
      suit:    'Copas',
      number:  'As',
      essence: 'Algo nuevo se está abriendo en el pecho.',
      reading: 'Una emoción aparece y todavía no necesita explicarse. Lo que se está abriendo en tú es chico, tibio, recién llegado: pide ser recibido sin definirlo enseguida.',
      synthesis: 'Lo que recién empieza no se nombra: se cuida.',
      prompt: '¿Qué emoción nueva está pidiendo lugar sin que tengas que justificarla?',
      themes: ['Apertura emocional', 'Inicio afectivo', 'Don', 'Receptividad'],
      manifestations: [
        'Ganas inesperadas de acercarte a alguien',
        'Una emoción que aparece sin causa clara y te suaviza',
        'El comienzo tibio de un afecto, una intuición o una ternura propia',
        'Sentir que algo en tú se está abriendo de nuevo'
      ],
      shadows: [
        'Apurar la emoción para nombrarla',
        'Cerrar lo que recién se abrió por miedo a sentir',
        'Confundir un destello con destino'
      ]
    },

    /* --------- DOS DE COPAS · encuentro --------------------- */
    Dos: {
      suit:    'Copas',
      number:  'Dos',
      essence: 'Dos miradas que se reconocen sin esfuerzo.',
      reading: 'Hay un encuentro —con alguien o con una parte tuya— que no necesita ser explicado para entenderse. Lo que esta carta pide es presencia, no estrategia: estar ahí, mirar y dejarse mirar.',
      synthesis: 'Lo afectivo se encuentra cuando se reconoce, no cuando se conquista.',
      prompt: '¿Con quién —incluso tú misma— te estás encontrando sin tener que actuar?',
      themes: ['Vínculo', 'Reciprocidad', 'Reconocimiento mutuo', 'Encuentro afectivo'],
      manifestations: [
        'Una conversación donde no hace falta llenar los silencios',
        'Reconciliación silenciosa con alguien o con tú misma',
        'Sentir que en este vínculo no estás sosteniendo la balanza sola',
        'Un afecto que te calma sin pedirte nada'
      ],
      shadows: [
        'Confundir el encuentro con fusión',
        'Esperar de afuera lo que solo tú puedes darte',
        'Rendirte demasiado rápido a la química'
      ]
    },

    /* --------- TRES DE COPAS · celebración compartida ----------- */
    Tres: {
      suit:    'Copas',
      number:  'Tres',
      essence: 'El gozo también necesita ser compartido.',
      reading: 'Algo bueno está creciendo y se nota cuando lo compartes. Esta carta no es fiesta forzada: es ese momento donde el afecto entre varias personas se vuelve también una forma de descanso.',
      synthesis: 'La alegría sostenida también se cuida en compañía.',
      prompt: '¿Con quién quieres celebrar lo que está saliendo bien, antes de pasar a lo siguiente?',
      themes: ['Comunidad', 'Celebración', 'Afecto compartido', 'Gozo común'],
      manifestations: [
        'Un encuentro con amigas que repara más de lo esperado',
        'Compartir una buena noticia y notar que crece al decirla',
        'Sentirse parte de algo cálido sin esfuerzo',
        'Un brindis silencioso por algo personal'
      ],
      shadows: [
        'Performar alegría para no sentir lo que está debajo',
        'Diluir lo propio en el grupo',
        'Sostener vínculos solo en lo festivo y no en lo difícil'
      ]
    },

    /* --------- CUATRO DE COPAS · saturación, ofrenda no vista ---- */
    Cuatro: {
      suit:    'Copas',
      number:  'Cuatro',
      essence: 'Hay algo enfrente que todavía no estás viendo.',
      reading: 'Tienes más de lo que estás registrando. La saturación o la desgana están velando una posibilidad que ya está cerca: el problema no es lo que falta, es lo que no estás mirando.',
      synthesis: 'A veces lo que aburre, en realidad, no se está mirando.',
      prompt: '¿Qué te están ofreciendo que estás dejando pasar por costumbre?',
      themes: ['Saturación', 'Desinterés', 'Inercia emocional', 'Ofrenda no vista'],
      manifestations: [
        'Tener todo y aún así sentir que algo no encaja',
        'Rechazar oportunidades por agotamiento, no por convicción',
        'Encerrarte en la rutina afectiva y no notar lo nuevo',
        'Una propuesta que llega y no termina de aterrizar en tú'
      ],
      shadows: [
        'Confundir desinterés con sabiduría',
        'Quedarse en la queja como zona conocida',
        'Rechazar lo bueno por no querer cambiar'
      ]
    },

    /* --------- CINCO DE COPAS · pérdida, lo derramado ----------- */
    Cinco: {
      suit:    'Copas',
      number:  'Cinco',
      essence: 'Algo se derramó, y todavía hay copas en pie.',
      reading: 'Una pérdida está pesando, y conviene no apurarte a estar bien. Detrás del foco en lo que se cayó hay algo que sigue ahí, esperando que termines de mirarlo.',
      synthesis: 'El duelo no se acelera; tampoco te tapa todo.',
      prompt: '¿Qué quedó en pie de lo que creías haber perdido?',
      themes: ['Duelo', 'Pérdida', 'Foco en lo derramado', 'Resto que sostiene'],
      manifestations: [
        'Llorar algo que no te diste tiempo de soltar',
        'Pasar mucho tiempo mirando lo que se rompió',
        'Sentir que un vínculo no es lo que era, y que eso duele',
        'Reconocer que parte de la tristeza viene de hace rato'
      ],
      shadows: [
        'Quedarte solo con lo que se cayó',
        'Hacer del duelo una identidad',
        'Negar lo que aún tienes cerca'
      ]
    },

    /* --------- SEIS DE COPAS · memoria afectiva, gentileza ---- */
    Seis: {
      suit:    'Copas',
      number:  'Seis',
      essence: 'La ternura también vuelve.',
      reading: 'Algo del pasado afectivo está volviendo, no para repetirse sino para suavizar este momento. Esta carta es la memoria que cuida, el gesto chico que devuelve calor.',
      synthesis: 'Recordar también es una forma de cuidarte.',
      prompt: '¿Qué memoria afectiva está volviendo a tú para hacerte bien?',
      themes: ['Memoria', 'Inocencia recuperada', 'Gentileza', 'Vínculo del pasado'],
      manifestations: [
        'Acordarte de alguien que te cuidó y sentir gratitud sin nostalgia',
        'Volver a un lugar querido y notar lo que cambió en tú',
        'Una conversación tierna que repara algo viejo',
        'Hacer un gesto chico y noble por alguien sin esperar nada'
      ],
      shadows: [
        'Confundir nostalgia con presente',
        'Idealizar lo anterior',
        'Quedar atrapada en una versión vieja de tú misma'
      ]
    },

    /* --------- SIETE DE COPAS · fantasías, opciones ----------- */
    Siete: {
      suit:    'Copas',
      number:  'Siete',
      essence: 'No todo lo que imaginás es lo que quieres.',
      reading: 'Hay muchas opciones flotando y no todas son reales. Esta carta no te apura a elegir: te pide separar lo que de verdad te llama de lo que solo te entretiene.',
      synthesis: 'Imaginar es necesario; quedarse imaginando, no.',
      prompt: '¿Cuál de las opciones que estás sosteniendo es la única que te interesa de verdad?',
      themes: ['Imaginación', 'Opciones', 'Deseo confuso', 'Distracción'],
      manifestations: [
        'Tener varios deseos y postergarlos todos por no elegir',
        'Confundir lo deseable con lo verdaderamente tuyo',
        'Sentirte saturada por posibilidades que no terminas de aterrizar',
        'Soñar despierta una salida sin moverte hacia ella'
      ],
      shadows: [
        'Vivir en la fantasía como evitación',
        'Comparar opciones para no comprometerte con ninguna',
        'Llamar libertad a la indecisión'
      ]
    },

    /* --------- OCHO DE COPAS · partida afectiva ---------------- */
    Ocho: {
      suit:    'Copas',
      number:  'Ocho',
      essence: 'Irse también es una forma de cuidarte.',
      reading: 'Algo afectivo que llevas mucho tiempo sosteniendo ya no te alcanza. Esta carta no te apura a romper nada: te recuerda que quedarte por costumbre tampoco es lealtad.',
      synthesis: 'Lo que ya no nutre no se sostiene para no fallar.',
      prompt: '¿De qué situación afectiva ya partiste por dentro, aunque tu cuerpo siga ahí?',
      themes: ['Despedida', 'Madurez emocional', 'Soltar', 'Coraje afectivo'],
      manifestations: [
        'Reconocer que un vínculo te da menos de lo que te pide',
        'Tomar distancia de algo querido sin enojo',
        'Cambiar de etapa sin saber bien qué viene',
        'Aceptar que ya no sos quien empezó esta historia'
      ],
      shadows: [
        'Huir en lugar de despedirte',
        'Romantizar la distancia',
        'Confundir cansancio con vocación de irte'
      ]
    },

    /* --------- NUEVE DE COPAS · plenitud íntima ---------------- */
    Nueve: {
      suit:    'Copas',
      number:  'Nueve',
      essence: 'Algo te alcanza, y eso ya es mucho.',
      reading: 'Hay un momento de plenitud emocional propia que pide ser reconocido sin tener que mostrarlo. Esta carta es la satisfacción callada, el contento que no necesita aplausos.',
      synthesis: 'Estar bien también puede no notarse desde afuera.',
      prompt: '¿Qué tienes ahora que estás minimizando porque no se ve desde afuera?',
      themes: ['Plenitud íntima', 'Reconocimiento propio', 'Gratitud', 'Saciedad emocional'],
      manifestations: [
        'Notar que estás mejor de lo que creías',
        'Disfrutar algo cotidiano sin diluirlo en lo que falta',
        'Sentirte saciada afectivamente, aunque sea chiquito',
        'Reconocerte logros propios sin compararte'
      ],
      shadows: [
        'Confundir bienestar con tener todo bajo control',
        'Cerrarte en la propia satisfacción y dejar de mirar afuera',
        'Llamar plenitud a una comodidad que ya no te mueve'
      ]
    },

    /* --------- DIEZ DE COPAS · amor sostenido en el tiempo ----- */
    Diez: {
      suit:    'Copas',
      number:  'Diez',
      essence: 'El amor también se construye despacio.',
      reading: 'Algo afectivo se está completando: una familia elegida, un vínculo profundo, una etapa con quienes quieres. Esta carta no romantiza: te muestra que el amor sostenido es paciencia que floreció.',
      synthesis: 'Lo afectivo no llega: se construye.',
      prompt: '¿Qué relaciones de tu vida están en su mejor versión gracias a algo que sostuviste con cuidado?',
      themes: ['Amor sostenido', 'Familia elegida', 'Plenitud vincular', 'Cierre afectivo de un ciclo'],
      manifestations: [
        'Sentir que tu red afectiva está cuidada',
        'Una etapa donde tú y los tuyos están en buen lugar',
        'Reconciliación con una historia familiar',
        'Un sentimiento de hogar interno'
      ],
      shadows: [
        'Confundir armonía con perfección',
        'Postergarte por sostener al grupo',
        'Idealizar la vida vincular hasta no permitirte el conflicto'
      ]
    },

    /* --------- SOTA DE COPAS · curiosidad emocional ------------ */
    Sota: {
      suit:    'Copas',
      number:  'Sota',
      essence: 'Hay un asomo emocional pidiendo escucha.',
      reading: 'Una emoción nueva, un mensaje, una intuición chica está llamando puerta. Es delicada y no necesita respuestas inmediatas: pide curiosidad, no análisis.',
      synthesis: 'Lo afectivo nuevo entra suave: no lo apures.',
      prompt: '¿Qué emoción tenue estás por minimizar que merecería ser escuchada?',
      themes: ['Curiosidad afectiva', 'Mensaje emocional', 'Sensibilidad fresca', 'Intuición chica'],
      manifestations: [
        'Una sensación nueva que no sabes bien cómo nombrar',
        'Un gesto creativo o afectivo que aparece desde adentro',
        'Volver a permitirte una ternura que habías guardado',
        'Recibir una noticia chica que te cambia el clima del día'
      ],
      shadows: [
        'Reírte de tus emociones por considerarlas tontas',
        'Pedirle a una sensación nueva que se justifique',
        'Reaccionar antes de escuchar'
      ]
    },

    /* --------- CABALLERO DE COPAS · ofrenda, propuesta -------- */
    Caballero: {
      suit:    'Copas',
      number:  'Caballero',
      essence: 'Ofrecerse también es una forma de avanzar.',
      reading: 'Hay un movimiento afectivo en marcha: una propuesta, una declaración, un acercamiento. Esta carta avanza con copa en mano, no con espada: lo que mueve no se gana, se ofrece.',
      synthesis: 'Lo emocional no se conquista: se acerca.',
      prompt: '¿Qué propuesta afectiva —tuya o ajena— está esperando ser tomada en serio?',
      themes: ['Movimiento afectivo', 'Iniciativa emocional', 'Cortejo', 'Ofrenda'],
      manifestations: [
        'Hacer un primer gesto en un vínculo',
        'Decir lo que sientes sin garantías',
        'Ir hacia alguien o hacia un proyecto con el corazón delante',
        'Recibir una invitación afectiva clara'
      ],
      shadows: [
        'Romantizar el gesto y olvidar la consistencia',
        'Idealizar al que ofrece o al que recibe',
        'Confundir intensidad inicial con compromiso real'
      ]
    },

    /* --------- REINA DE COPAS · sabiduría sensible ------------- */
    Reina: {
      suit:    'Copas',
      number:  'Reina',
      essence: 'Sostener también es una forma de saber.',
      reading: 'Hay una sabiduría tuya que viene del sentir, no del análisis: la que cuida sin ahogar, la que escucha lo que no se dice. Esta carta te recuerda que esa forma de saber también es válida.',
      synthesis: 'Lo emocional bien cuidado se vuelve inteligencia.',
      prompt: '¿Qué cosa estás sabiendo desde el cuerpo y todavía no te animás a llamar saber?',
      themes: ['Sabiduría emocional', 'Sostén', 'Empatía madura', 'Escucha profunda'],
      manifestations: [
        'Acompañar a alguien sin querer arreglarlo',
        'Sostener un proyecto desde la sensibilidad y no desde la planificación',
        'Confiar en una intuición tuya que ya pasó la prueba antes',
        'Cuidar sin perder centro propio'
      ],
      shadows: [
        'Cuidar tanto a otros que te olvidas de tu copa',
        'Confundir empatía con cargar el peso ajeno',
        'Esconderte detrás de la sensibilidad para no decidir'
      ]
    },

    /* --------- REY DE COPAS · calma firme ---------------------- */
    Rey: {
      suit:    'Copas',
      number:  'Rey',
      essence: 'La calma profunda también dirige.',
      reading: 'Hay una serenidad que no es indiferencia: la del que conoce sus emociones y no se las niega ni se desborda. Esta carta es maestría afectiva: estar claro sin estar frío.',
      synthesis: 'Conducir desde la emoción sin ser conducida por ella.',
      prompt: '¿Dónde podrías sostener una decisión desde la calma —sin endurecerte, sin perderte en lo que sientes?',
      themes: ['Madurez afectiva', 'Calma firme', 'Liderazgo emocional', 'Integración'],
      manifestations: [
        'Tomar una decisión difícil sin perder ternura',
        'Acompañar a alguien sin diluirte',
        'Sostener una conversación intensa sin dispararte',
        'Reconocer y nombrar emociones sin que te dominen'
      ],
      shadows: [
        'Aplanar la emoción para parecer madura',
        'Confundir distancia con dominio',
        'Convertir la calma en máscara'
      ]
    }

  },

  /* =================================================================
   * ESPADAS · aire, pensamiento, conflicto, claridad incómoda
   * ===============================================================*/
  Espadas: {

    /* --------- AS DE ESPADAS · claridad que aparece ----------- */
    As: {
      suit:    'Espadas',
      number:  'As',
      essence: 'Una claridad acaba de cortar la niebla.',
      reading: 'Algo que estaba confuso se volvió, de pronto, nítido. Esta carta no celebra ese filo: te invita a usarlo bien, porque la verdad recién aparecida también puede cortar de más si no se toma con cuidado.',
      synthesis: 'Ver claro es un comienzo, no un veredicto.',
      prompt: '¿Qué viste hace poco que no puedes des-saber, y qué vas a hacer con esa claridad?',
      themes: ['Claridad nueva', 'Verdad que aparece', 'Discernimiento', 'Inicio mental'],
      manifestations: [
        'Una idea que ordena algo que venías masticando hace tiempo',
        'Decir en voz alta lo que ya sabías por dentro',
        'Una decisión que se vuelve obvia tras una conversación',
        'Captar lo que estaba detrás de un patrón repetido'
      ],
      shadows: [
        'Usar la claridad para humillar a alguien',
        'Confundir lucidez con dureza',
        'Cortar antes de tiempo'
      ]
    },

    /* --------- DOS DE ESPADAS · decisión postergada ----------- */
    Dos: {
      suit:    'Espadas',
      number:  'Dos',
      essence: 'Decidir también pide quitarse la venda.',
      reading: 'Hay algo que estás postergando porque elegir te enfrenta con una incomodidad. Esta carta no juzga la pausa, pero te recuerda que mantener el equilibrio con los ojos cerrados se vuelve costoso.',
      synthesis: 'Posponer la decisión también es una decisión.',
      prompt: '¿Qué estás eligiendo no ver para no tener que elegir?',
      themes: ['Decisión postergada', 'Tensión entre opciones', 'Negación funcional', 'Tregua frágil'],
      manifestations: [
        'Sostener una situación incómoda con tal de no nombrarla',
        'Hacer como si dos opciones pesaran igual cuando ya sabes cuál pesa más',
        'Mantener una calma aparente con tensión adentro',
        'Posponer una conversación que no se va a desarmar sola'
      ],
      shadows: [
        'Llamar prudencia a la evitación',
        'Quedarte en el medio para no asumir el costo',
        'Vivir con la venda puesta hasta que algo te obligue'
      ]
    },

    /* --------- TRES DE ESPADAS · verdad que duele ------------- */
    Tres: {
      suit:    'Espadas',
      number:  'Tres',
      essence: 'Algunas verdades llegan abriendo.',
      reading: 'Hubo una verdad emocional que dolió: una separación, una distancia, algo que se nombró y ya no se puede deshacer. Esta carta no romantiza la herida ni la dramatiza: la mira sin desviar la vista, porque mirarla bien es parte de lo que la cura.',
      synthesis: 'El corte limpio duele menos, a la larga, que la confusión sostenida.',
      prompt: '¿Qué verdad estás conociendo que duele, pero al mismo tiempo te ordena algo?',
      themes: ['Verdad emocional dolorosa', 'Separación', 'Herida que obliga a ver', 'Reconocimiento honesto'],
      manifestations: [
        'Una conversación que cambia algo para siempre',
        'Una despedida que estaba pendiente y por fin se nombra',
        'Reconocer que un vínculo no era lo que creías',
        'Aceptar que algo que doblaste mucho terminó por romperse'
      ],
      shadows: [
        'Quedarte en la herida sin moverte',
        'Volverla análisis para no sentirla',
        'Identificarte con el corte y olvidar lo demás'
      ]
    },

    /* --------- CUATRO DE ESPADAS · tregua mental -------------- */
    Cuatro: {
      suit:    'Espadas',
      number:  'Cuatro',
      essence: 'Bajar la espada también es estrategia.',
      reading: 'Hay un momento donde seguir pensando ya no produce. Esta carta te invita a una tregua honesta: silencio, descanso, una pausa que no es derrota sino recuperación de filo.',
      synthesis: 'La mente también se afila descansando.',
      prompt: '¿Qué pensamiento llevas dándole vueltas que se calmaría si lo dejaras quieto?',
      themes: ['Tregua', 'Recuperación mental', 'Silencio elegido', 'Convalecencia'],
      manifestations: [
        'Tomarte un día sin tomar decisiones',
        'Salir de una conversación que ya no avanza',
        'Dormir en lugar de seguir analizando',
        'Permitirte no responder enseguida'
      ],
      shadows: [
        'Confundir descanso con fuga',
        'Quedarte quieta para no enfrentar lo siguiente',
        'Romantizar la pausa indefinida'
      ]
    },

    /* --------- CINCO DE ESPADAS · victoria amarga ------------- */
    Cinco: {
      suit:    'Espadas',
      number:  'Cinco',
      essence: 'Tener razón no siempre te hace bien.',
      reading: 'Hubo un choque y, aunque algo se ganó, queda un sabor incómodo. Esta carta te pide mirar el costo: hay batallas que vale más no librar y verdades que se entregan mejor sin filo.',
      synthesis: 'Ganar también puede ser una forma de perder.',
      prompt: '¿Qué discusión estás por sostener donde lo que vas a perder pesa más que lo que vas a ganar?',
      themes: ['Conflicto', 'Costo oculto', 'Victoria incómoda', 'Orgullo herido'],
      manifestations: [
        'Ganar una discusión y sentir que algo se rompió',
        'Reaccionar con dureza a algo que pedía cuidado',
        'Quedarte con la última palabra y con un vacío después',
        'Notar que la razón te dejó más sola'
      ],
      shadows: [
        'Convertir la razón en arma',
        'Pelear por orgullo y llamarlo principio',
        'Confundir defenderte con humillar'
      ]
    },

    /* --------- SEIS DE ESPADAS · travesía hacia la calma ------ */
    Seis: {
      suit:    'Espadas',
      number:  'Seis',
      essence: 'Te estás moviendo hacia aguas más calmas.',
      reading: 'Algo que te tenía agotada está quedando atrás. El cruce todavía no terminó y conviene no apurar la llegada: lo importante ahora es no remar de más mientras la corriente te lleva.',
      synthesis: 'Salir de un lugar mental también es un viaje.',
      prompt: '¿De qué pensamiento o lugar interno te estás permitiendo, por fin, alejarte?',
      themes: ['Tránsito', 'Salida', 'Calma que se acerca', 'Despedida silenciosa'],
      manifestations: [
        'Sentir que un periodo difícil empieza a soltarte',
        'Un viaje literal o simbólico que te ordena',
        'Aceptar ayuda para cruzar algo que no podías sola',
        'Dejar atrás un círculo mental sin necesidad de explicarlo todo'
      ],
      shadows: [
        'Pedirte sentirte bien antes de tiempo',
        'Mirar hacia atrás más de lo necesario',
        'Confundir la salida con escape sin destino'
      ]
    },

    /* --------- SIETE DE ESPADAS · moverse a media luz --------- */
    Siete: {
      suit:    'Espadas',
      number:  'Siete',
      essence: 'Moverse sin mostrarse completa también es una elección.',
      reading: 'Hay un movimiento —tuyo o ajeno— sucediendo a media luz: lo que se hace no es exactamente lo que se dice. Esta carta no señala traición; te pide mirar qué se está reservando, qué se está protegiendo, y a qué costo.',
      synthesis: 'Lo que se hace en silencio también deja huella.',
      prompt: '¿Qué estás haciendo en privado que no termina de coincidir con lo que muestras?',
      themes: ['Evasión', 'Estrategia', 'Ocultamiento', 'Movimiento parcial'],
      manifestations: [
        'Hacer un cambio antes de avisarlo',
        'Reservarte una decisión hasta tenerla más cerrada',
        'Notar que alguien te muestra solo una parte de su jugada',
        'Sostener una salida lateral por si esta no funciona'
      ],
      shadows: [
        'Confundir cautela con doble vida',
        'Quedarte siempre con la última carta sin mostrar',
        'Llamar estrategia a la distancia que igual te aleja'
      ]
    },

    /* --------- OCHO DE ESPADAS · paredes hechas de palabras --- */
    Ocho: {
      suit:    'Espadas',
      number:  'Ocho',
      essence: 'Las paredes también pueden estar adentro.',
      reading: 'Hay una historia que te estás contando como si fuera la única posible. La sensación de encierro es real, pero las cuerdas que la sostienen son narrativas: cosas que pensás sobre tú que ya no necesitan ser ciertas.',
      synthesis: 'Lo que parece imposible, a veces, solo no se ha mirado dos veces.',
      prompt: '¿Qué te estás diciendo sobre tú misma como si fuera ley, y no es?',
      themes: ['Encierro mental', 'Narrativa interna', 'Imposibilidad percibida', 'Mirada estrecha'],
      manifestations: [
        'Repetirte que no puedes cuando todavía no probaste',
        'Sentir que no hay salida en una situación que tiene varias',
        'Pedir permiso para algo que ya puedes decidir sola',
        'Quedar inmovilizada por una versión vieja de tú misma'
      ],
      shadows: [
        'Identificarte con la víctima del propio relato',
        'Esperar que alguien te desate',
        'Confundir el pensamiento con la realidad'
      ]
    },

    /* --------- NUEVE DE ESPADAS · ansiedad nocturna ----------- */
    Nueve: {
      suit:    'Espadas',
      number:  'Nueve',
      essence: 'De noche, los pensamientos pesan más de lo real.',
      reading: 'Hay una preocupación que está creciendo más rápido que la situación. Esta carta no minimiza el miedo: te recuerda que en la cabeza, sin luz, todo se agranda, y que conviene no decidir nada importante adentro de esa hora.',
      synthesis: 'Lo que se piensa de noche, se revisa de día.',
      prompt: '¿Qué temor estás dándole tamaño de gigante cuando, mirado a la luz, vuelve a su escala?',
      themes: ['Angustia nocturna', 'Pensamiento intrusivo', 'Miedo agigantado', 'Insomnio mental'],
      manifestations: [
        'Dar vueltas a una preocupación a las 3 AM',
        'Anticipar el peor escenario y vivirlo antes de que ocurra',
        'Despertarte con una culpa que no encuentra causa concreta',
        'Sentir que todo se complica justo cuando intentás dormir'
      ],
      shadows: [
        'Tomar decisiones desde el miedo y no desde la realidad',
        'Llamar intuición al pensamiento ansioso',
        'Cargarte mentalmente con problemas que no te corresponden'
      ]
    },

    /* --------- DIEZ DE ESPADAS · punto de no retorno ---------- */
    Diez: {
      suit:    'Espadas',
      number:  'Diez',
      essence: 'Algo mental llegó a su punto de no retorno.',
      reading: 'Una manera de pensar se terminó de gastar. No es derrota ni catástrofe: es el momento donde algo que llevaste demasiado tiempo no puede sostenerse más, y por eso —y solo por eso— se vuelve posible soltarlo.',
      synthesis: 'Cuando ya no se puede más, también se puede empezar de cero.',
      prompt: '¿Qué pelea mental estás llegando, sin drama, al final?',
      themes: ['Agotamiento', 'Final mental', 'Punto de no retorno', 'Necesidad de soltar'],
      manifestations: [
        'Aceptar que una manera de explicar tu vida ya no te sirve',
        'Soltar una pelea interna que llevaba años',
        'Reconocer que algo en tu cabeza estaba consumiéndote',
        'Sentir, junto al cansancio, un alivio que no esperabas'
      ],
      shadows: [
        'Dramatizar el final',
        'Convertir el agotamiento en identidad',
        'Esperar que el "fondo" sea más fondo todavía'
      ]
    },

    /* --------- SOTA DE ESPADAS · curiosidad mental ------------ */
    Sota: {
      suit:    'Espadas',
      number:  'Sota',
      essence: 'Querer entender también es una forma de respeto.',
      reading: 'Hay una curiosidad afilada en tú que está observando más de lo que dice. Esta carta te invita a hacer preguntas con cuidado: la mente nueva todavía no domina su filo y conviene usarlo para abrir, no para herir.',
      synthesis: 'Preguntar bien es una manera de cuidar.',
      prompt: '¿Qué pregunta tienes rondando que merece ser hecha en voz alta, sin agresión y sin disculpas?',
      themes: ['Curiosidad mental', 'Vigilancia', 'Ganas de entender', 'Pregunta nueva'],
      manifestations: [
        'Notar un detalle que otros pasaron por alto',
        'Querer leer, investigar, entender un tema que apareció',
        'Hacer una pregunta directa y sentir el alivio que da',
        'Defender una idea propia con argumentos, sin gritar'
      ],
      shadows: [
        'Usar la curiosidad para vigilar al otro',
        'Hablar más rápido de lo que pensás',
        'Confundir desconfianza con análisis'
      ]
    },

    /* --------- CABALLERO DE ESPADAS · galope mental ----------- */
    Caballero: {
      suit:    'Espadas',
      number:  'Caballero',
      essence: 'Ir directo no siempre es ir bien.',
      reading: 'Hay un impulso de decir o resolver algo de una vez. La intención puede ser correcta, pero la velocidad no siempre acompaña: esta carta te pide bajar el galope unos pasos antes de cruzar lo que estás por cruzar.',
      synthesis: 'El filo también necesita tiempo.',
      prompt: '¿Qué estás por decir o hacer ya mismo que ganaría si esperaras un día?',
      themes: ['Impulso mental', 'Irrupción', 'Convicción rápida', 'Acción directa'],
      manifestations: [
        'Apurar una decisión que pedía conversación',
        'Decir una verdad sin medir el momento',
        'Ir de frente a un conflicto que se podría haber rodeado',
        'Defender algo con tanta convicción que olvidas escuchar'
      ],
      shadows: [
        'Confundir velocidad con coraje',
        'Atropellar al otro y llamarlo honestidad',
        'Cargar contra molinos de viento'
      ]
    },

    /* --------- REINA DE ESPADAS · lucidez serena -------------- */
    Reina: {
      suit:    'Espadas',
      number:  'Reina',
      essence: 'Ver claro y seguir cuidando es posible.',
      reading: 'Hay una lucidez tuya que no necesita ablandarse para ser cuidadosa. Esta carta es la inteligencia que mira de frente sin volverse fría: la que dice lo que ve, y aún así no lastima por gusto.',
      synthesis: 'La verdad bien dicha también es una manera de afecto.',
      prompt: '¿Qué estás viendo con claridad que ganaría si te animaras a decirlo con cuidado?',
      themes: ['Lucidez madura', 'Verdad cuidada', 'Independencia mental', 'Discernimiento sereno'],
      manifestations: [
        'Decir lo que pensás sin disculparte de más',
        'Sostener una posición propia frente a alguien querido',
        'Reconocer un patrón ajeno sin entrar a juzgarlo',
        'Cortar un vínculo con dignidad y sin escándalo'
      ],
      shadows: [
        'Endurecerte para no volver a sufrir',
        'Confundir distancia con autonomía',
        'Cortar lazos en silencio en lugar de hablar'
      ]
    },

    /* --------- REY DE ESPADAS · juicio firme ------------------ */
    Rey: {
      suit:    'Espadas',
      number:  'Rey',
      essence: 'Pensar con justicia también es una forma de autoridad.',
      reading: 'Hay una madurez mental disponible: la que sabe poner orden sin endurecer, decidir sin venganza, sostener una opinión sin necesidad de ganar. Esta carta te recuerda que tu juicio puede ser firme y, aún así, justo.',
      synthesis: 'El criterio firme no necesita levantar la voz.',
      prompt: '¿Qué decisión podrías tomar con criterio claro y sin necesidad de imponerte?',
      themes: ['Juicio claro', 'Ética', 'Autoridad mental', 'Decisión firme'],
      manifestations: [
        'Tomar una decisión difícil con cabeza fría y conciencia tranquila',
        'Mediar en un conflicto sin tomar partido prematuro',
        'Sostener una opinión propia frente a presiones del entorno',
        'Defender una causa con argumentos, no con golpes'
      ],
      shadows: [
        'Confundir orden con rigidez',
        'Usar la lógica para no sentir',
        'Volver el juicio sentencia'
      ]
    }

  },

  /* =================================================================
   * BASTOS · fuego, impulso, vocación, expansión
   * ===============================================================*/
  Bastos: {

    /* --------- AS DE BASTOS · chispa creadora ----------------- */
    As: {
      suit:    'Bastos',
      number:  'As',
      essence: 'Algo en tú quiere encenderse.',
      reading: 'Hay una idea, un deseo o una vocación nueva latiendo en el cuerpo. Esta carta no te pide certezas: te pide aceptar que algo quiere salir, y darle un primer gesto, aunque sea chico.',
      synthesis: 'El impulso recién llegado no se planea: se enciende.',
      prompt: '¿Qué chispa estás postergando porque todavía no tiene forma terminada?',
      themes: ['Impulso nuevo', 'Chispa creativa', 'Vocación que asoma', 'Vitalidad'],
      manifestations: [
        'Una idea que vuelves a pensar varias veces en el mismo día',
        'Ganas físicas de empezar algo',
        'Sentir un proyecto, un viaje o un cambio empujando desde adentro',
        'Una creatividad que vuelve después de mucho silencio'
      ],
      shadows: [
        'Quemarte rápido por entusiasmo sin foco',
        'Compartirla antes de tiempo y diluirla',
        'Esperar a que la idea sea perfecta antes de moverla'
      ]
    },

    /* --------- DOS DE BASTOS · horizonte, qué viene -------- */
    Dos: {
      suit:    'Bastos',
      number:  'Dos',
      essence: 'Tienes el mundo en la mano y todavía no sabes qué hacer con él.',
      reading: 'Hay un punto donde ya conseguiste lo conocido y se asoma una etapa más grande. Esta carta no te empuja a saltar: te pide mirar el horizonte y reconocer que ya superaste el territorio anterior.',
      synthesis: 'El próximo paso no se decide rápido: se elige con la mirada larga.',
      prompt: '¿Qué territorio nuevo estás mirando desde lejos sin animarte a pisar todavía?',
      themes: ['Decisión de expansión', 'Horizonte', 'Más allá de lo conocido', 'Visión inicial'],
      manifestations: [
        'Sentir que tu vida actual ya te queda chica',
        'Tener que elegir entre la seguridad y un proyecto más grande',
        'Un proyecto que crece y pide salir del cuarto donde nació',
        'Mirar lejos y empezar a planear algo importante'
      ],
      shadows: [
        'Quedarte en la planificación eterna',
        'Idealizar lo lejano y desvalorizar lo logrado',
        'Pedirle al futuro garantías que no puede dar'
      ]
    },

    /* --------- TRES DE BASTOS · espera activa ----------------- */
    Tres: {
      suit:    'Bastos',
      number:  'Tres',
      essence: 'Esperar también puede ser parte del movimiento.',
      reading: 'Algo que pusiste en marcha ya está afuera, en camino. Esta carta no te pide forzar más: te pide quedarte en la orilla, mirar el horizonte y confiar en lo que ya está rodando sin tu intervención.',
      synthesis: 'Una vez lanzado, el movimiento también necesita tiempo.',
      prompt: '¿Qué proyecto lanzaste que pide menos empuje y más paciencia?',
      themes: ['Espera activa', 'Visión amplia', 'Confianza en lo lanzado', 'Anticipación'],
      manifestations: [
        'Esperar la respuesta de algo importante que ya enviaste',
        'Confiar en un proyecto en marcha sin hostigarlo',
        'Mirar resultados de lejos sin perder la fe',
        'Sostener un plan grande mientras sus piezas se acomodan'
      ],
      shadows: [
        'Confundir paciencia con pasividad',
        'Revisar obsesivamente lo que pusiste a circular',
        'Cambiar el rumbo antes de tiempo por ansiedad'
      ]
    },

    /* --------- CUATRO DE BASTOS · llegada que merece pausa --- */
    Cuatro: {
      suit:    'Bastos',
      number:  'Cuatro',
      essence: 'Algo logrado merece pararse a mirar.',
      reading: 'Llegaste a un punto que pediste, y conviene reconocerlo antes de seguir corriendo. Esta carta te invita a un rato de fiesta interior: la próxima etapa empieza mejor desde un lugar agradecido.',
      synthesis: 'Avanzar también es marcar lo recorrido.',
      prompt: '¿Qué llegada chica o grande estás pasando por alto sin festejarla?',
      themes: ['Celebración', 'Llegada', 'Hogar provisorio', 'Comunidad cálida'],
      manifestations: [
        'Cerrar una etapa y querer brindarla con quienes te acompañaron',
        'Llegar a una mudanza, un cargo o un proyecto largo y poder respirar',
        'Sentir que tu casa o tu mesa se vuelven el centro por un momento',
        'Una pausa con calor y gente alrededor'
      ],
      shadows: [
        'Saltar al siguiente desafío sin saborear el actual',
        'Esperar permiso para celebrarte',
        'Confundir el hito con el final del camino'
      ]
    },

    /* --------- CINCO DE BASTOS · energías chocando ----------- */
    Cinco: {
      suit:    'Bastos',
      number:  'Cinco',
      essence: 'Demasiada energía en el mismo cuarto se choca.',
      reading: 'Hay una fricción —con otros o adentro tuyo— que no es batalla seria, pero gasta. Esta carta no te pide ganar: te pide ordenar el ruido, ver qué fuego es real y qué fuego es ego peleando con ego.',
      synthesis: 'No todo choque pide pelea; algunos solo piden pausa.',
      prompt: '¿Qué discusión estás sosteniendo donde nadie está escuchando, ni siquiera tú?',
      themes: ['Fricción', 'Competencia', 'Energía chocando', 'Exceso de impulso'],
      manifestations: [
        'Una conversación grupal donde todos quieren tener razón',
        'Demasiados proyectos compitiendo en tu cabeza al mismo tiempo',
        'Un ambiente con tensión chiquita pero constante',
        'Sentir que tus propias ideas se pelean adentro'
      ],
      shadows: [
        'Confundir competencia con motor',
        'Necesitar tener razón más que entender',
        'Avivar el conflicto para sentir que pasa algo'
      ]
    },

    /* --------- SEIS DE BASTOS · reconocimiento ---------------- */
    Seis: {
      suit:    'Bastos',
      number:  'Seis',
      essence: 'El brillo también se gana caminando.',
      reading: 'Hay un reconocimiento que llega después de algo bien hecho. Esta carta no te pide hacer ruido: te invita a recibir lo logrado con la cabeza alta, sabiendo que el aplauso de afuera funciona si adentro hay sostén.',
      synthesis: 'Lo que se reconoce afuera también se sostiene adentro.',
      prompt: '¿Qué logro estás minimizando cuando, en realidad, te está siendo devuelto con cariño?',
      themes: ['Reconocimiento', 'Visibilidad merecida', 'Liderazgo natural', 'Triunfo silencioso'],
      manifestations: [
        'Recibir un elogio que te cuesta aceptar',
        'Que un proyecto tuyo sea valorado públicamente',
        'Que alguien te diga "lo lograste" antes que tú',
        'Subir un peldaño y sentir que estaba ahí esperándote'
      ],
      shadows: [
        'Pedir el aplauso para sentirte real',
        'Hacerlo todo para el reconocimiento y olvidar el impulso original',
        'Minimizar el logro por miedo a la envidia ajena'
      ]
    },

    /* --------- SIETE DE BASTOS · plantarse, defender lo propio  */
    Siete: {
      suit:    'Bastos',
      number:  'Siete',
      essence: 'Sostener lo tuyo es parte de tenerlo.',
      reading: 'Hay algo que conseguiste y ahora te toca defenderlo: una posición, una idea, un terreno propio. Esta carta no te pide gritar: te pide pararte firme y no soltar lo que ya es tuyo por miedo a la fricción.',
      synthesis: 'Lo conseguido también pide que lo banques.',
      prompt: '¿Qué te ganaste y estás dejando que te discutan sin defenderlo?',
      themes: ['Defensa', 'Posición ganada', 'Coraje sostenido', 'Plantarse'],
      manifestations: [
        'Defender tu trabajo frente a críticas que no son justas',
        'Sostener un límite cuando alguien lo presiona',
        'No dejarte correr de un proyecto que te costó construir',
        'Mantener una opinión propia frente a una multitud que opina distinto'
      ],
      shadows: [
        'Confundir defenderte con desconfiar de todo',
        'Convertir la posición en castillo y aislarte',
        'Pelear cada batalla aunque ya no merezca pelearse'
      ]
    },

    /* --------- OCHO DE BASTOS · momentum --------------------- */
    Ocho: {
      suit:    'Bastos',
      number:  'Ocho',
      essence: 'Todo se está moviendo al mismo tiempo.',
      reading: 'Hay una velocidad nueva en tu vida y conviene cabalgar la ola sin tratar de frenarla. Esta carta no te pide controlar todo: te pide subirte al ritmo y dejar que algunas piezas lleguen sin tu intervención.',
      synthesis: 'Cuando el aire empuja, no hace falta remar.',
      prompt: '¿Qué está pasando rápido que estás intentando ralentizar por costumbre?',
      themes: ['Aceleración', 'Momentum', 'Sincronía', 'Movimiento simultáneo'],
      manifestations: [
        'Varias respuestas, llamados o noticias llegando juntas',
        'Un proyecto que de pronto avanza después de meses quieto',
        'Un viaje, una mudanza o un cambio que se mueven solos',
        'Mensajes y oportunidades alineándose en pocos días'
      ],
      shadows: [
        'Querer controlar el ritmo y entorpecerlo',
        'Confundir velocidad con dirección',
        'Decir sí a todo solo porque está pasando'
      ]
    },

    /* --------- NUEVE DE BASTOS · última guardia -------------- */
    Nueve: {
      suit:    'Bastos',
      number:  'Nueve',
      essence: 'Falta poco, y por eso cuesta más.',
      reading: 'Estás cansada y, aún así, todavía no es momento de soltar la guardia. Esta carta no romantiza el aguante: te recuerda que el último tramo pesa precisamente porque ya casi llegaste.',
      synthesis: 'El último esfuerzo también es resistencia.',
      prompt: '¿Qué esfuerzo estás por abandonar justo cuando ya casi llegás?',
      themes: ['Resistencia', 'Última guardia', 'Cansancio del que casi llegó', 'Persistencia'],
      manifestations: [
        'Sostener un proyecto en su tramo final cuando todo te pide soltar',
        'No bajar los brazos antes del cierre, aunque cueste',
        'Cuidarte de un estado vigilante que ya se volvió postura permanente',
        'Reconocer que llegar también pide aguantar'
      ],
      shadows: [
        'Convertir la guardia en desconfianza permanente',
        'Confundir resistencia con orgullo',
        'Cargar sola lo que se podría compartir'
      ]
    },

    /* --------- DIEZ DE BASTOS · sobrecarga ------------------- */
    Diez: {
      suit:    'Bastos',
      number:  'Diez',
      essence: 'Algunas responsabilidades pesan porque ya no son tuyas.',
      reading: 'Estás cargando mucho, y parte de eso ya no te corresponde. Esta carta no te pide soltarlo todo: te pide revisar bulto por bulto y devolver lo que estás llevando por costumbre, no por compromiso real.',
      synthesis: 'El compromiso bien puesto sostiene; el mal puesto consume.',
      prompt: '¿Qué estás cargando que ya no es tu responsabilidad?',
      themes: ['Sobrecarga', 'Peso del compromiso', 'Fuego que consume', 'Responsabilidad mal puesta'],
      manifestations: [
        'Sostener proyectos, vínculos o tareas que ya no te entusiasman',
        'Cumplir con todo y notar que el cuerpo se queja',
        'Decir sí por inercia y arrepentirte después',
        'Sentir que tu energía se va sin dejar huella en lo que importa'
      ],
      shadows: [
        'Confundir aguantar con valor',
        'Hacer del cansancio identidad',
        'Enorgullecerte de cargar más que el resto'
      ]
    },

    /* --------- SOTA DE BASTOS · curiosidad activa ------------ */
    Sota: {
      suit:    'Bastos',
      number:  'Sota',
      essence: 'Las ganas también te dicen por dónde.',
      reading: 'Hay un entusiasmo fresco en tú pidiendo movimiento. Esta carta no te apura a comprometerte: te invita a curiosear, probar, dejar que el cuerpo y el deseo te muestren un camino antes de decidir si quieres sostenerlo.',
      synthesis: 'El deseo nuevo merece curiosidad antes que plan.',
      prompt: '¿Qué te está convocando que merece, al menos, una primera vuelta de exploración?',
      themes: ['Curiosidad activa', 'Entusiasmo', 'Deseo de explorar', 'Mensajero del fuego'],
      manifestations: [
        'Apuntarte a algo que no sabes todavía si te va',
        'Una invitación inesperada que te tienta',
        'Un proyecto chiquito que te entusiasma desproporcionadamente',
        'Tener ganas de hacer y todavía no saber qué exactamente'
      ],
      shadows: [
        'Empezar muchas cosas y no profundizar ninguna',
        'Confundir entusiasmo con vocación a largo plazo',
        'Compartir el deseo nuevo antes de habitarlo'
      ]
    },

    /* --------- CABALLERO DE BASTOS · galope intenso ---------- */
    Caballero: {
      suit:    'Bastos',
      number:  'Caballero',
      essence: 'El fuego también necesita rumbo.',
      reading: 'Hay un impulso fuerte queriendo lanzarse hacia algo. La intensidad es real y vale, pero conviene que el galope tenga una dirección: la energía sin destino se gasta y deja al cuerpo agotado.',
      synthesis: 'Avanzar con pasión y aún así saber a dónde.',
      prompt: '¿A qué estás corriendo con tanta intensidad sin haber decidido del todo si era ahí?',
      themes: ['Impulso intenso', 'Búsqueda apasionada', 'Movimiento valiente', 'Aventura'],
      manifestations: [
        'Lanzarte a un proyecto sin esperar las condiciones perfectas',
        'Cambiar de país, de trabajo o de vínculo siguiendo un impulso',
        'Una iniciativa tomada con coraje y poco análisis',
        'Defender una causa con cuerpo, no solo con palabras'
      ],
      shadows: [
        'Confundir intensidad con autenticidad',
        'Quemarte rápido y abandonar',
        'Imponer tu velocidad y olvidar a los que avanzan distinto'
      ]
    },

    /* --------- REINA DE BASTOS · presencia magnética --------- */
    Reina: {
      suit:    'Bastos',
      number:  'Reina',
      essence: 'Hay calor que ilumina sin quemar.',
      reading: 'Hay una presencia tuya que no necesita levantar la voz: irradia. Esta carta es la energía que sostiene un proyecto, una mesa o un grupo simplemente estando, sin esfuerzo aparente y con una calidez firme.',
      synthesis: 'Ser fuego sin pedir permiso, y al mismo tiempo, no incendiar.',
      prompt: '¿Dónde podrías mostrarte entera —cálida y con criterio— sin diluirte para caer bien?',
      themes: ['Magnetismo', 'Presencia firme', 'Fuego contenido', 'Calidez con criterio'],
      manifestations: [
        'Liderar algo sin tener que mandar',
        'Convocar a otros sin estridencia',
        'Sostener tu propia luz frente a quien intenta opacarla',
        'Inspirar simplemente por estar presente'
      ],
      shadows: [
        'Sentir que tienes que brillar todo el tiempo',
        'Cuidar el fuego ajeno y olvidar el propio',
        'Confundir magnetismo con tener que agradar'
      ]
    },

    /* --------- REY DE BASTOS · visión sostenida -------------- */
    Rey: {
      suit:    'Bastos',
      number:  'Rey',
      essence: 'El fuego dirigido también construye.',
      reading: 'Hay una madurez creativa disponible: la del que ya conoce su pasión y sabe ponerla al servicio de algo más grande. Esta carta no te pide controlar el fuego: te invita a usarlo con visión, marcando rumbo sin apagar el entusiasmo.',
      synthesis: 'Liderar también es cuidar el fuego del que viene atrás.',
      prompt: '¿Qué visión propia ya está madura para que la sostengas con dirección, no solo con ganas?',
      themes: ['Dirección', 'Liderazgo vital', 'Visión sostenida', 'Madurez creativa'],
      manifestations: [
        'Tomar las riendas de un proyecto con criterio claro',
        'Acompañar a otros desde tu experiencia, sin imponer la tuya',
        'Sostener una visión a largo plazo cuando el resto pide resultados ya',
        'Decidir desde el oficio, no desde la urgencia'
      ],
      shadows: [
        'Confundir liderar con dominar',
        'Encender el fuego de otros y quedarte sin el tuyo',
        'Volver autoritaria la pasión'
      ]
    }

  },

  /* =================================================================
   * OROS · tierra, cuerpo, oficio, construcción
   * ===============================================================*/
  Oros: {

    /* --------- AS DE OROS · oferta concreta -------------------- */
    As: {
      suit:    'Oros',
      number:  'As',
      essence: 'Algo concreto se está ofreciendo y vale la pena recibirlo bien.',
      reading: 'Hay una posibilidad material o corporal entrando en escena: una propuesta, una herramienta, un recurso, un cuidado nuevo. Esta carta no te apura: te pide bajarla a tierra y ver qué se hace con ella.',
      synthesis: 'Los inicios sólidos también empiezan en la mano abierta.',
      prompt: '¿Qué oportunidad concreta está apareciendo que merece atención antes que cálculo?',
      themes: ['Oferta concreta', 'Recurso nuevo', 'Inicio material', 'Aterrizaje'],
      manifestations: [
        'Una propuesta de trabajo, un espacio o un recurso entrando en tu vida',
        'Sentir el cuerpo más despierto, con más ganas de cuidarse',
        'Una herramienta o materia prima que empieza a tomar forma de proyecto',
        'Recibir algo tangible que abre una puerta'
      ],
      shadows: [
        'Esperar lo grande y dejar pasar lo concreto',
        'Calcular tanto que no llegás a tomarlo',
        'Confundir una oferta con un destino'
      ]
    },

    /* --------- DOS DE OROS · malabarismo cotidiano ----------- */
    Dos: {
      suit:    'Oros',
      number:  'Dos',
      essence: 'Sostener dos cosas también es un oficio.',
      reading: 'Hay un equilibrio en juego entre dos demandas concretas y conviene encontrar un ritmo, no una solución definitiva. Esta carta no te pide ordenar todo: te pide jugar con lo que tienes sin perder pie.',
      synthesis: 'El equilibrio no se logra; se sostiene.',
      prompt: '¿En qué dos cosas estás haciendo malabarismo y dónde podrías aliviar el peso de alguna?',
      themes: ['Malabarismo cotidiano', 'Doble demanda', 'Ritmo', 'Adaptación práctica'],
      manifestations: [
        'Hacer rendir tiempo, dinero o energía entre dos compromisos',
        'Combinar trabajo y casa, descanso y proyecto, cuerpo y obligación',
        'Reorganizarte para que entre todo, aunque sea ajustado',
        'Encontrar un ritmo nuevo después de un cambio que pidió moverte'
      ],
      shadows: [
        'Sostener todo y olvidar revisar si hace falta',
        'Confundir agilidad con auto-exigencia',
        'Hacer del malabarismo identidad permanente'
      ]
    },

    /* --------- TRES DE OROS · oficio compartido -------------- */
    Tres: {
      suit:    'Oros',
      number:  'Tres',
      essence: 'Lo bien hecho también pide otras manos.',
      reading: 'Hay un trabajo en curso que está pasando del esfuerzo individual al esfuerzo compartido. Esta carta valora el oficio: lo que sabes hacer encuentra a otros que aportan lo que no sabes todavía, y juntos algo se construye distinto.',
      synthesis: 'Construir bien también es saber pedir.',
      prompt: '¿Con quién podrías construir lo que no estás logrando sola?',
      themes: ['Colaboración', 'Oficio compartido', 'Reconocimiento del trabajo', 'Saber pedir'],
      manifestations: [
        'Sumarte a un proyecto donde tu parte calza con la de otros',
        'Pedir ayuda concreta y notar que algo avanza más rápido',
        'Reconocer un saber tuyo que recién empieza a ser visto',
        'Trabajar codo a codo en algo que vale la pena'
      ],
      shadows: [
        'Querer hacerlo todo sola para no deber nada',
        'Esperar que se reconozca solo lo individual',
        'Confundir colaboración con depender'
      ]
    },

    /* --------- CUATRO DE OROS · puños cerrados ---------------- */
    Cuatro: {
      suit:    'Oros',
      number:  'Cuatro',
      essence: 'Lo que abrazás muy fuerte deja de respirar.',
      reading: 'Hay algo logrado que estás sosteniendo con demasiado puño. La estabilidad importa, pero apretada en exceso se convierte en miedo: lo que ya es tuyo no se cuida cerrándolo, se cuida usándolo bien.',
      synthesis: 'Cuidar no es retener; es dejar respirar lo que tienes.',
      prompt: '¿Qué estás apretando con miedo cuando, en realidad, ya es tuyo?',
      themes: ['Apego', 'Miedo a perder', 'Conservación rígida', 'Cerrazón'],
      manifestations: [
        'Postergar gastos, decisiones o gestos por miedo a quedarte sin recursos',
        'Sostener una rutina que ya no te calma, solo te da seguridad',
        'Defender una posición tuya con más rigidez de la necesaria',
        'Sentir que abrir lo conseguido es perderlo'
      ],
      shadows: [
        'Confundir prudencia con avaricia interna',
        'Aislarte para conservar',
        'Sostener todo cerrado y notar que igual se enfría'
      ]
    },

    /* --------- CINCO DE OROS · frío, exclusión --------------- */
    Cinco: {
      suit:    'Oros',
      number:  'Cinco',
      essence: 'Hay una luz cerca y la cabeza está mirando para otro lado.',
      reading: 'Estás pasando por un tramo donde algo escasea —recursos, afecto, sentido de pertenencia— y la sensación de quedar afuera se hace fuerte. Esta carta no minimiza el frío: te recuerda que muy cerca, a veces, hay un refugio que todavía no estás mirando.',
      synthesis: 'Lo que falta no siempre es lo que se necesita.',
      prompt: '¿Qué refugio cerca tuyo estás pasando de largo porque la cabeza está mirando lo que falta?',
      themes: ['Exclusión', 'Carencia', 'Frío emocional', 'Desconexión'],
      manifestations: [
        'Sentirte afuera de un grupo, una mesa o una conversación',
        'Una etapa de cansancio donde el cuerpo y el ánimo bajan a la vez',
        'Mirar lo que no tienes y olvidar lo que sí',
        'Pasar de largo una ayuda que tenías cerca por orgullo o agotamiento'
      ],
      shadows: [
        'Romantizar la carencia',
        'Rechazar ayuda y confundirlo con autosuficiencia',
        'Hacer de la exclusión identidad'
      ]
    },

    /* --------- SEIS DE OROS · intercambio --------------------- */
    Seis: {
      suit:    'Oros',
      number:  'Seis',
      essence: 'Recibir también es parte del oficio.',
      reading: 'Hay un intercambio en juego —tiempo, ayuda, recursos, atención— y conviene mirar de qué lado de la balanza estás esta vez. Esta carta no juzga: te pide reconocer si te toca dar, recibir o pedir más equilibrio.',
      synthesis: 'Dar bien también requiere saber recibir.',
      prompt: '¿Qué intercambio cotidiano está saliendo desigual sin que te animes a nombrarlo?',
      themes: ['Intercambio', 'Dar y recibir', 'Equilibrio práctico', 'Generosidad cuidada'],
      manifestations: [
        'Aceptar una ayuda concreta que necesitabas',
        'Ofrecer algo tuyo —tiempo, oficio, dinero— sin sacrificarte',
        'Notar que en una relación o trabajo das mucho más de lo que recibes',
        'Pedir lo que te corresponde con palabras claras'
      ],
      shadows: [
        'Dar para sentirte indispensable',
        'Recibir solo si lo puedes devolver enseguida',
        'Confundir generosidad con perderte de vista'
      ]
    },

    /* --------- SIETE DE OROS · cultivo lento ----------------- */
    Siete: {
      suit:    'Oros',
      number:  'Siete',
      essence: 'El cultivo también se hace mirando.',
      reading: 'Algo que sembraste hace rato pide tiempo para madurar. Esta carta no te pide más esfuerzo: te pide bajar las herramientas, mirar lo que crece y resistir el impulso de arrancar las raíces para revisar si están vivas.',
      synthesis: 'Algunos resultados solo llegan si los dejás crecer.',
      prompt: '¿Qué proyecto, vínculo o proceso estás por apurar cuando, en realidad, ya está madurando?',
      themes: ['Paciencia', 'Crecimiento lento', 'Espera fértil', 'Observar resultados'],
      manifestations: [
        'Mirar un proyecto a medio crecer y resistir la urgencia de cosechar',
        'Permitir que un cambio en tu cuerpo o en tu vida haga su tiempo',
        'Detenerte a evaluar antes de cambiar de rumbo',
        'Aceptar que algunos procesos no rinden este mes'
      ],
      shadows: [
        'Confundir paciencia con resignación',
        'Arrancar lo que crecía por miedo a esperar',
        'Medir constantemente y agotar la planta'
      ]
    },

    /* --------- OCHO DE OROS · taller, repetición ------------- */
    Ocho: {
      suit:    'Oros',
      number:  'Ocho',
      essence: 'Lo que se repite también afina.',
      reading: 'Hay una etapa de práctica, de hacer una y otra vez sin que se note el avance hacia afuera. Esta carta no busca brillo: pide entrar al oficio con paciencia, sabiendo que la maestría se construye sobre repeticiones honestas.',
      synthesis: 'Pulir también es avanzar.',
      prompt: '¿Qué práctica tuya merece más constancia y menos resultado inmediato?',
      themes: ['Oficio', 'Práctica', 'Repetición consciente', 'Dedicación'],
      manifestations: [
        'Sostener una rutina de aprendizaje, ejercicio o trabajo sin pedirle aplauso',
        'Hacer la misma tarea hasta que sale bien y luego un poco más',
        'Encontrar gusto en lo que antes era obligación',
        'Cuidar el detalle cuando nadie está mirando'
      ],
      shadows: [
        'Volver la disciplina rigidez',
        'Practicar sin pausa hasta romperte',
        'Confundir oficio con perfección'
      ]
    },

    /* --------- NUEVE DE OROS · jardín propio ----------------- */
    Nueve: {
      suit:    'Oros',
      number:  'Nueve',
      essence: 'Lo construido en silencio también es tuyo.',
      reading: 'Hay una autonomía concreta que ya conseguiste: tu espacio, tu ritmo, tu capacidad de sostenerte sola. Esta carta no es soledad triste: es el jardín propio donde finalmente te puedes mover sin pedir permiso.',
      synthesis: 'La independencia bien construida también es ternura.',
      prompt: '¿Qué estás disfrutando sola que merece reconocer como un logro tuyo?',
      themes: ['Autonomía', 'Jardín propio', 'Disfrute sereno', 'Suficiencia'],
      manifestations: [
        'Disfrutar tu casa, tu rutina o tu cuerpo sin necesitar audiencia',
        'Sentir que ya puedes sostenerte sola y eso te alivia',
        'Un momento de placer sensorial sin compañía y sin culpa',
        'Reconocer todo lo que armaste sin que nadie más lo sepa del todo'
      ],
      shadows: [
        'Confundir autonomía con cerrarse al vínculo',
        'Disfrutar y minimizarlo cuando alguien lo nota',
        'Volver la independencia trinchera'
      ]
    },

    /* --------- DIEZ DE OROS · raíces, legado ----------------- */
    Diez: {
      suit:    'Oros',
      number:  'Diez',
      essence: 'Algunas cosas se sienten heredadas y, sin embargo, son tuyas.',
      reading: 'Hay un sentido de pertenencia o de continuidad apareciendo: un hogar, un trabajo estable, un vínculo familiar largo, una tradición que se reordena. Esta carta no es perfección doméstica: es la sensación de pisar terreno propio.',
      synthesis: 'Lo construido despacio también deja huella en los que vienen después.',
      prompt: '¿Qué pertenencia o continuidad estás reconociendo recién ahora como parte de tu historia?',
      themes: ['Legado', 'Pertenencia', 'Continuidad', 'Estabilidad construida'],
      manifestations: [
        'Sentir que algo en tu vida ya tiene raíces firmes',
        'Un encuentro con la familia, biológica o elegida, que te ordena',
        'Reconocer un hilo que pasa de generación en generación —un oficio, una receta, un valor—',
        'Pisar tu casa y sentirla casa'
      ],
      shadows: [
        'Idealizar el legado y olvidar lo que pesa',
        'Confundir pertenencia con quedarse igual',
        'Sostener una tradición por inercia'
      ]
    },

    /* --------- SOTA DE OROS · aprendiz ----------------------- */
    Sota: {
      suit:    'Oros',
      number:  'Sota',
      essence: 'Aprender despacio también es empezar.',
      reading: 'Hay una curiosidad nueva que pide herramienta y paciencia, no fuegos artificiales. Esta carta te invita a estudiar, probar, leer, ensayar: avanzar con manos torpes y oído atento, como quien recién toma un oficio.',
      synthesis: 'Descubrir despacio también construye.',
      prompt: '¿Qué tema, oficio o cuidado estás recién descubriendo y merece tiempo de aprendiz?',
      themes: ['Curiosidad concreta', 'Aprendizaje material', 'Descubrimiento lento', 'Mente abierta'],
      manifestations: [
        'Anotarte a un curso, taller o lectura sobre algo que te llama',
        'Empezar a cuidar tu cuerpo o tu casa con más detalle',
        'Una idea que pide investigación, no anuncio',
        'Sentirte aprendiz sin pena'
      ],
      shadows: [
        'Coleccionar ideas sin practicar ninguna',
        'Quedarte en la teoría para no exponerte',
        'Confundir interés con vocación a primera vista'
      ]
    },

    /* --------- CABALLERO DE OROS · paso firme --------------- */
    Caballero: {
      suit:    'Oros',
      number:  'Caballero',
      essence: 'Avanzar despacio también es avanzar.',
      reading: 'Hay un trabajo que pide constancia, no chispa. Esta carta no te promete velocidad: valora el paso firme, el oficio diario, la confianza en un ritmo que no impresiona pero llega.',
      synthesis: 'El paso lento también talla la piedra.',
      prompt: '¿En qué proyecto te conviene bajar el ritmo y sostener el paso, en lugar de buscar un atajo?',
      themes: ['Constancia', 'Trabajo sostenido', 'Ritmo lento', 'Confiabilidad'],
      manifestations: [
        'Sostener un proyecto largo aunque no haya señales rápidas',
        'Cumplir con tu palabra incluso cuando nadie está mirando',
        'Hacer cada día un poco de algo que te importa',
        'Avanzar sin necesidad de mostrar cada paso'
      ],
      shadows: [
        'Confundir constancia con rigidez',
        'Quedarte en la rutina por costumbre y no por sentido',
        'Romantizar la lentitud para no asumir cambios necesarios'
      ]
    },

    /* --------- REINA DE OROS · cuidado encarnado ------------ */
    Reina: {
      suit:    'Oros',
      number:  'Reina',
      essence: 'Cuidar lo concreto también es un saber.',
      reading: 'Hay una presencia tuya que cuida sin discurso: cocina, ordena, abraza, agenda, sostiene cuerpos y casas. Esta carta valora ese saber hacer cotidiano que casi nunca se nombra y que, sin embargo, es lo que hace que el mundo no se caiga.',
      synthesis: 'Lo que se cuida bien tampoco hace ruido.',
      prompt: '¿Qué cuidado tuyo —hacia otros, hacia tu casa, hacia tu cuerpo— estás dando por descontado?',
      themes: ['Cuidado encarnado', 'Nutrición', 'Presencia corporal', 'Abundancia tranquila'],
      manifestations: [
        'Cocinar, recibir, organizar la casa con gusto y sin alarde',
        'Sostener un proceso ajeno con tu sola presencia',
        'Tener un huerto, una rutina o un ritual que te mantiene en eje',
        'Reconocer la abundancia chica y real de tu día'
      ],
      shadows: [
        'Cuidar a todos y dejar el cuerpo propio para el final',
        'Confundir abundancia con tener que rendirte al servicio',
        'Sostener la casa o el grupo y no permitirte recibir'
      ]
    },

    /* --------- REY DE OROS · construcción sólida ------------ */
    Rey: {
      suit:    'Oros',
      number:  'Rey',
      essence: 'Lo construido bien también enseña a otros a construir.',
      reading: 'Hay una madurez práctica disponible: la de quien conoce su oficio, sabe administrar lo que tiene y puede sostener una estructura sin temblar. Esta carta no idealiza la riqueza: valora el saber concreto que se gana con años.',
      synthesis: 'Lo realmente sólido se prueba en el tiempo.',
      prompt: '¿Qué saber práctico tuyo ya está maduro para ponerse al servicio de algo o de alguien?',
      themes: ['Estabilidad', 'Construcción sólida', 'Dominio práctico', 'Generosidad estructural'],
      manifestations: [
        'Manejar tu trabajo o tus recursos con criterio claro',
        'Sostener un proyecto que da fruto a otros, no solo a tú',
        'Compartir lo que sabes con quien recién empieza',
        'Tomar decisiones materiales con calma y visión'
      ],
      shadows: [
        'Confundir estabilidad con quietud',
        'Acumular sin compartir',
        'Volver el dominio en control rígido'
      ]
    }

  }

}


/* =====================================================================
 * Helpers
 * ===================================================================*/

/* Devuelve la carta { suit, number } o null si no existe / no escrita aún. */
export function findMinorCard({ suit, number }) {
  return minorArcanaCards?.[suit]?.[number] ?? null
}

/* Lista de palos ya escritos (útil para UI condicional). */
export function writtenSuits() {
  return Object.keys(minorArcanaCards)
}

/* Conteo total de cartas redactadas. */
export const minorCardsCount = Object.values(minorArcanaCards)
  .reduce((acc, suit) => acc + Object.keys(suit).length, 0)
