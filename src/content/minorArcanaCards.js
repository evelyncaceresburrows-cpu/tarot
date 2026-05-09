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
      reading: 'Una emoción aparece y todavía no necesita explicarse. Lo que se está abriendo en ti es chico, tibio, recién llegado: pide ser recibido sin definirlo enseguida.',
      synthesis: 'Lo que recién empieza no se nombra: se cuida.',
      prompt: '¿Qué emoción nueva está pidiendo lugar sin que tengas que justificarla?',
      themes: ['Apertura emocional', 'Inicio afectivo', 'Don', 'Receptividad'],
      manifestations: [
        'Ganas inesperadas de acercarte a alguien',
        'Una emoción que aparece sin causa clara y te suaviza',
        'El comienzo tibio de un afecto, una intuición o una ternura propia',
        'Sentir que algo en ti se está abriendo de nuevo'
      ],
      shadows: [
        'Apurar la emoción para nombrarla',
        'Cerrar lo que recién se abrió por miedo a sentir',
        'Confundir un destello con destino'
      ],
      reversed: {
        essence:   "La copa quedó volcada. Lo que se abría se derramó sin recibirse.",
        reading:   "Algo emocional asomó y no le diste lugar — lo apuraste para nombrarlo, lo cerraste de un portazo, o te lo guardaste tan adentro que ya nadie lo nota. La apertura existió. Lo que falta es la recepción.",
        synthesis: "Lo nuevo que no se cuida no vuelve.",
        prompt:    "¿Qué emoción reciente cerraste antes de tiempo, y por qué te dio miedo dejarla respirar?",
        manifestations: [
          "Negar una ternura que apareció porque te complicaba el mapa",
          "Apurar a definir un afecto recién nacido y verlo apagarse en la definición",
          "Bloquear las ganas de acercarte a alguien usando como excusa la cabeza"
        ],
        shadows: [
          "Se bloquea la recepción — el don pasa de largo.",
          "Se exagera el control sobre lo afectivo o la indiferencia defensiva.",
          "Se evita mirar que sentir también es habilidad, no debilidad."
        ]
      }
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
        'Reconciliación silenciosa con alguien o contigo misma',
        'Sentir que en este vínculo no estás sosteniendo la balanza sola',
        'Un afecto que te calma sin pedirte nada'
      ],
      shadows: [
        'Confundir el encuentro con fusión',
        'Esperar de afuera lo que solo tú puedes darte',
        'Rendirte demasiado rápido a la química'
      ],
      reversed: {
        essence:   "Las dos copas se separaron sin haberse compartido. Las miradas no se alcanzan.",
        reading:   "El encuentro no terminó de armarse, o se rompió por desajuste. O hay desequilibrio (una entrega más que la otra), o hay dos personas tratando de encontrarse desde personajes en lugar de desde sí mismas. La conexión, si pide algo, pide honestidad pareja.",
        synthesis: "Encontrarse a medias también es no encontrarse.",
        prompt:    "¿Qué estás sosteniendo en este vínculo que no es recíproco, y cuánto hace que no lo nombras?",
        manifestations: [
          "Sentir que estás dando el doble en una conversación que debería ser de a dos",
          "Acercarte a alguien con tu mejor versión, no con la que en verdad llega ese día",
          "Confundir tensión sexual con encuentro real y descubrir, después, que no había mirada"
        ],
        shadows: [
          "Se bloquea la reciprocidad — uno carga la balanza completa.",
          "Se exagera la fusión o la distancia; ambas evitan el cara a cara.",
          "Se evita mirar que el vínculo pide presencia, no actuación."
        ]
      }
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
      ],
      reversed: {
        essence:   "Las tres figuras alzan la copa, pero ninguna se mira. La fiesta se volvió ruido.",
        reading:   "La alegría compartida se desfiguró en performance. O celebras hacia afuera mientras por dentro hay algo que no estás contando, o el grupo te diluye y volves a casa más sola que cuando saliste. El gozo común pide presencia real, no foto.",
        synthesis: "Festejar sin estar también es una forma de aislamiento.",
        prompt:    "¿Estás celebrando algo, o estás haciendo de cuenta que celebras para no quedarte sola con lo que no encaja?",
        manifestations: [
          "Salir con amigas y sentirte más sola al volver que cuando estabas sola en casa",
          "Postear felicidad y bloquear los mensajes de alguien que sí te conoce",
          "Brindar por algo bueno tuyo y darte cuenta de que nadie de la mesa registró por qué"
        ],
        shadows: [
          "Se bloquea el gozo real — la celebración pierde quien la celebra.",
          "Se exagera la performance social o el chisme como sustituto del afecto.",
          "Se evita mirar la diferencia entre estar acompañada y estar en compañía."
        ]
      }
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
        'Una propuesta que llega y no termina de aterrizar en ti'
      ],
      shadows: [
        'Confundir desinterés con sabiduría',
        'Quedarse en la queja como zona conocida',
        'Rechazar lo bueno por no querer cambiar'
      ],
      reversed: {
        essence:   "Tres copas alrededor, una tendida desde una nube. La figura cerró los ojos.",
        reading:   "Lo que tienes enfrente lo estás rechazando por agotamiento, no por convicción. Hay una ofrenda —un afecto, una propuesta, una posibilidad— que sigue ahí esperando, y tú decidiste cansarte preventivamente para no tener que verla.",
        synthesis: "La desgana también es una forma de no querer ver.",
        prompt:    "¿Qué te están ofreciendo que no estás recibiendo, y a qué le tienes miedo si lo aceptaras?",
        manifestations: [
          "Mirar el techo en lugar de mirar a quien te está hablando bien",
          "Decir que nada te entusiasma justo cuando varias cosas buenas están al alcance",
          "Quedarte en la queja como manera de no tener que comprometerte con lo nuevo"
        ],
        shadows: [
          "Se bloquea el registro de lo que sí está disponible.",
          "Se exagera la apatía como identidad o el rechazo como decisión madura.",
          "Se evita mirar que aceptar también pide energía."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura de capa negra mira las tres copas volcadas. Detrás, dos copas aún de pie no se ven.",
        reading:   "El duelo se convirtió en oficio. Lo perdido sigue pesando, y eso es real, pero la lectura se quedó atrás: solo estás viendo lo que se cayó y dejaste de registrar lo que sigue de pie. La pena no se discute. Lo que se discute es si ya se volvió postura.",
        synthesis: "Mirar solo lo perdido también es otra forma de seguirlo perdiendo.",
        prompt:    "¿Qué dos cosas siguen de pie atrás tuyo que ya no estás dispuesta a girarte para mirar?",
        manifestations: [
          "Volver a contarte la historia de lo que perdiste cada vez que asoma algo nuevo",
          "Rechazar una mano amiga porque ya decidiste que las personas decepcionan",
          "Quedarte mirando la silla vacía y no notar a quién entró por la puerta"
        ],
        shadows: [
          "Se bloquea la mirada periférica — solo entra lo que se rompió.",
          "Se exagera el dolor como identidad y se ningunea lo que aún sostiene.",
          "Se evita mirar que el duelo bien hecho también incluye girar la cabeza."
        ]
      }
    },

    /* --------- SEIS DE COPAS · memoria afectiva, gentileza ---- */
    Seis: {
      suit:    'Copas',
      number:  'Seis',
      essence: 'La ternura también vuelve.',
      reading: 'Algo del pasado afectivo está volviendo, no para repetirse sino para suavizar este momento. Esta carta es la memoria que cuida, el gesto chico que devuelve calor.',
      synthesis: 'Recordar también es una forma de cuidarte.',
      prompt: '¿Qué memoria afectiva está volviendo a ti para hacerte bien?',
      themes: ['Memoria', 'Inocencia recuperada', 'Gentileza', 'Vínculo del pasado'],
      manifestations: [
        'Acordarte de alguien que te cuidó y sentir gratitud sin nostalgia',
        'Volver a un lugar querido y notar lo que cambió en ti',
        'Una conversación tierna que repara algo viejo',
        'Hacer un gesto chico y noble por alguien sin esperar nada'
      ],
      shadows: [
        'Confundir nostalgia con presente',
        'Idealizar lo anterior',
        'Quedar atrapada en una versión vieja de ti misma'
      ],
      reversed: {
        essence:   "Los niños se quedaron en el patio. La memoria se volvió refugio en lugar de fuente.",
        reading:   "La nostalgia dejó de abrir y empezó a cerrar. Lo dulce de haber sido se transformó en excusa para no estar siendo. O idealizas un pasado que nunca fue así, o te aferras a quienes ya no están como manera de no comprometerte con quienes sí.",
        synthesis: "Recordar bonito no es lo mismo que vivir.",
        prompt:    "¿De qué te está protegiendo esta nostalgia que cargas hace tanto?",
        manifestations: [
          "Volver al barrio o a la persona del pasado cada vez que el presente pide decisión",
          "Mostrar fotos viejas y darte cuenta de que hablas de ti en pasado",
          "Romantizar una relación que terminó porque el presente todavía no encontró forma"
        ],
        shadows: [
          "Se bloquea el aterrizaje en el ahora.",
          "Se exagera el pasado y se subestima lo que está disponible hoy.",
          "Se evita mirar que la memoria nutre solo si vuelve, no si se queda."
        ]
      }
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
      ],
      reversed: {
        essence:   "Las siete copas siguen flotando. La figura ya no las mira con asombro: las mira con parálisis.",
        reading:   "La fantasía dejó de inspirar y empezó a paralizar. Tienes muchas ideas, muchas posibilidades, muchos vínculos imaginables — y ninguno aterrizado. El problema no es la imaginación. Es que la usas para no tener que elegir.",
        synthesis: "Soñarlo todo también es una manera elegante de no hacer nada.",
        prompt:    "¿Cuál de todas las copas de tu cabeza no estás bajando porque elegir significa renunciar al resto?",
        manifestations: [
          "Empezar tres proyectos en la cabeza el mismo día y no abrir un solo documento",
          "Idealizar un vínculo posible mientras descuidas el real que ya tienes",
          "Llenar el feed de inspiración y darte cuenta de que no hiciste nada en semanas"
        ],
        shadows: [
          "Se bloquea la concreción — todo queda en posibilidad.",
          "Se exagera la imaginación o la indecisión como zona segura.",
          "Se evita mirar que elegir también es construir."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura volvió a las copas o salió sin razón clara. La luna sigue ahí, mirando.",
        reading:   "La partida se descalibró. O te quedaste donde sabes que ya no perteneces, fingiendo que todavía puede funcionar, o saliste a las corridas sin haber entendido qué dejabas atrás. El movimiento honesto pide saber por qué te vas, no solo cuándo.",
        synthesis: "Irse sin saber por qué es seguir adentro con otra ropa.",
        prompt:    "¿De qué te estás yendo, y de qué no quieres irte aunque sepas que ya no es tuyo?",
        manifestations: [
          "Renunciar a un trabajo y aceptar otro idéntico la semana siguiente",
          "Cortar con alguien y volver a la otra semana sin que nada haya cambiado",
          "Quedarte en una situación que se acabó porque irte sería demasiado real"
        ],
        shadows: [
          "Se bloquea la salida consciente — o se demora, o se atropella.",
          "Se exagera el aguante o la huida; ambas evitan la pregunta de fondo.",
          "Se evita mirar que dejar algo también pide nombrarlo."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sigue sentada con los brazos cruzados, pero la sonrisa quedó hueca. Las copas atrás brillan sin que las mire.",
        reading:   "El placer se volvió pose. Tienes lo que pediste y, en privado, no te basta — y eso te avergüenza, así que sigues sosteniendo la sonrisa hacia afuera. O al revés: tienes mucho y eliges minimizarlo para no incomodar al que no tiene. El gozo bloqueado también pesa.",
        synthesis: "La satisfacción que se actúa para los demás es la única que sí puede vaciarse.",
        prompt:    "¿Qué deseo cumpliste y todavía no te permitiste habitar de verdad?",
        manifestations: [
          "Mostrarte feliz por algo que conseguiste mientras adentro no termina de aterrizar",
          "Negar lo que tienes para no incomodar a quien no, y descubrirte habitando una vida apocada",
          "Llenarte de placeres rápidos para tapar una insatisfacción que pide otra cosa"
        ],
        shadows: [
          "Se bloquea el goce honesto.",
          "Se exagera la celebración performada o la modestia falsa.",
          "Se evita mirar la diferencia entre tener y disfrutar."
        ]
      }
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
      ],
      reversed: {
        essence:   "El arcoíris sobre la familia perdió color. La figura adulta saluda al cielo y nadie levanta la cabeza.",
        reading:   "La plenitud familiar o vincular se distorsionó. O sostienes la postal de armonía mientras por dentro hay grietas que nadie nombra, o exiges una felicidad ideal que no tolera lo humano. La verdadera plenitud incluye lo difícil. La que no, es maquillaje.",
        synthesis: "La foto perfecta a veces es la prueba de que algo se está perdiendo.",
        prompt:    "¿Qué pieza de tu plenitud familiar o vincular sostienes para los demás aunque por dentro ya no te crees del todo?",
        manifestations: [
          "Pasar las fiestas haciendo el papel que toca y volver a casa con un vacío que no cuentas",
          "Defender a tu familia o pareja en público y no soportar estar con ellos en privado",
          "Confundir convivencia funcional con plenitud real"
        ],
        shadows: [
          "Se bloquea la pertenencia honesta.",
          "Se exagera la armonía aparente o la nostalgia de un modelo que ya no encaja.",
          "Se evita mirar que lo pleno también incluye conflicto y verdad."
        ]
      }
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
      ],
      reversed: {
        essence:   "La sota sigue mirando la copa, pero el pez se fue. La curiosidad se volvió capricho o miedo.",
        reading:   "La sensibilidad se desreguló. O reaccionas al menor estímulo como si todo te tocara fibras profundas, o te volviste sorda a lo que llega sutil. La curiosidad afectiva pidió presencia y respondiste con drama o con desconexión.",
        synthesis: "La sensibilidad sin contención se vuelve teatro o anestesia.",
        prompt:    "¿Estás dramatizando lo que llega para no tener que sentirlo, o lo estás bloqueando para no tener que notarlo?",
        manifestations: [
          "Tomar como personal cualquier comentario hasta agotar a quien quiere acercarse",
          "Aplanar emociones reales con frases tipo 'no es nada' y sentirte cada vez más lejos de ti",
          "Buscar emociones intensas en pantallas para no tener que sentir las propias, más chicas"
        ],
        shadows: [
          "Se bloquea la escucha sutil.",
          "Se exagera la reacción afectiva o la desconexión defensiva.",
          "Se evita mirar que lo afectivo pide cuidado, no espectáculo."
        ]
      }
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
      ],
      reversed: {
        essence:   "El caballero sigue ofreciendo la copa, pero el gesto se volvió ensayado. El caballo se quedó mirando para otro lado.",
        reading:   "La declaración perdió alma. O ofreces afecto con guion ajeno —decir lo que cae bien, hacer lo que toca— o te volviste cínico y ya nada de lo que prometes lo crees del todo. Lo afectivo pide veracidad, aunque sea torpe.",
        synthesis: "Un afecto bien dicho que no se siente vale menos que uno mal dicho que sí.",
        prompt:    "¿Qué afecto estás ofreciendo en automático que ya no representa lo que sientes?",
        manifestations: [
          "Mandar el mismo tipo de mensaje cariñoso a varias personas y darte cuenta de que ninguno te lo pidió así",
          "Hacer regalos elaborados y faltar al momento simple en el que el otro te necesitaba",
          "Decir 'te quiero' por compromiso y notar que te suena hueco a ti misma"
        ],
        shadows: [
          "Se bloquea la veracidad del gesto afectivo.",
          "Se exagera la performance romántica o el cinismo defensivo.",
          "Se evita mirar que lo torpe verdadero alimenta más que lo perfecto vacío."
        ]
      }
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
      ],
      reversed: {
        essence:   "La reina mira la copa cubierta y ya no recuerda qué guardaba. El mar atrás se volvió niebla.",
        reading:   "La intuición se confundió con susceptibilidad. O sientes tanto que ya no distingues qué es propio y qué tomaste de los demás, o te cerraste tanto que dejaste de percibir lo obvio. La sabiduría afectiva pide límite, no muro.",
        synthesis: "Sentirlo todo y no sentir nada son dos formas de la misma pérdida.",
        prompt:    "¿Qué emoción de los demás estás cargando como si fuera tuya, y qué emoción tuya no estás escuchando porque te invadiste de las ajenas?",
        manifestations: [
          "Llegar agotada de una reunión por sostener emocionalmente a tres personas que no preguntaron",
          "No saber si estás triste o si te contagiaste la tristeza de alguien cercano",
          "Bloquear todas las antenas para no sufrir y descubrir que tampoco percibes el cariño"
        ],
        shadows: [
          "Se bloquea el límite emocional — o no hay, o es muralla.",
          "Se exagera la fusión empática o la frialdad protectora.",
          "Se evita mirar que cuidar a otro empieza por distinguir."
        ]
      }
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
      ],
      reversed: {
        essence:   "El rey en su trono sostiene la copa, pero el mar bajo sus pies está turbulento. La calma exterior tapa una marea adentro.",
        reading:   "La madurez emocional se volvió fachada. O presentas una serenidad que no estás sintiendo —y esa contención sin elaboración se convierte en distancia—, o te fuiste al otro extremo y la marea te gobierna sin que medie reflexión. El rey de copas pide ambas: sentir y sostener.",
        synthesis: "La calma fingida es una marea más, solo que callada.",
        prompt:    "¿Qué estás conteniendo con cara de estar bien que en realidad pide ser nombrado?",
        manifestations: [
          "Mantener la cara de estar bien en una crisis y descubrirte explotando con quien no tiene nada que ver",
          "Ser el referente emocional de todos y no tener a quien decirle que tú también necesitas",
          "Tomar decisiones afectivas desde la marea oculta y disfrazarlas de criterio"
        ],
        shadows: [
          "Se bloquea la transparencia entre lo que se siente y lo que se muestra.",
          "Se exagera la contención fría o la reactividad enmascarada.",
          "Se evita mirar que liderar afectivamente incluye decir cuándo no puedes."
        ]
      }
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
      ],
      reversed: {
        essence:   "La espada se levantó pero ya nadie sabe contra qué. La corona que la rodea perdió hojas.",
        reading:   "La claridad se distorsionó. O usaste una verdad recién vista para ganar una pelea, en lugar de para ordenar lo tuyo, o sigues dando vueltas alrededor de algo que ya entendiste y no quieres decir. La lucidez sin gesto se pudre, y la lucidez como arma corta de más.",
        synthesis: "Una verdad que no se digiere se convierte en filo o en silencio.",
        prompt:    "¿Qué viste con claridad que estás usando para herir, o evitando para no tener que actuar?",
        manifestations: [
          "Citar una crítica precisa que tenías guardada hace meses, en el peor momento posible",
          "Sostener una intuición clara y, en lugar de actuar, llevarla a tres conversaciones más para que alguien decida por ti",
          "Volver una claridad reciente en martillo: explicarles a todos lo que les pasa"
        ],
        shadows: [
          "Se bloquea el aterrizaje de la claridad en gesto propio.",
          "Se exagera el filo (corregir al otro) o la postergación (analizar otra vuelta más).",
          "Se evita mirar que ver claro también obliga a moverse."
        ]
      }
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
      ],
      reversed: {
        essence:   "La venda se cayó y la figura siguió con los ojos cerrados. Las espadas le pesan en los brazos cruzados.",
        reading:   "La pausa se cronificó o se rompió por explosión. O sostienes el equilibrio de no decidir hasta que el cuerpo manda factura, o terminaste eligiendo desde el agotamiento, sin haber mirado nada. La incomodidad de elegir no desaparece tapándose los ojos: se acumula.",
        synthesis: "La tregua que no termina deja de ser tregua.",
        prompt:    "¿Cuánto hace que estás \"todavía pensándolo\", y qué parte de ti ya decidió sin haberte avisado?",
        manifestations: [
          "Mantener dos opciones abiertas durante meses y elegir, al final, la que se decidió sola",
          "Discutir lo mismo en círculo cada domingo mientras la situación se va pudriendo en silencio",
          "Estallar por una pavada porque la decisión real lleva tres meses guardada"
        ],
        shadows: [
          "Se bloquea la elección consciente.",
          "Se exagera la negación o la explosión final, y se pierde el rango medio.",
          "Se evita mirar que el costo de no decidir también lo paga alguien — usualmente, tú."
        ]
      }
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
      ],
      reversed: {
        essence:   "Las tres espadas siguen clavadas en el corazón, pero alguien colgó una guirnalda alrededor para tapar la sangre.",
        reading:   "El dolor se desfiguró. O lo intelectualizaste tanto que ya hablas de él como si fuera de otra persona, o lo dramatizaste tanto que se volvió postura, una identidad de la que ya no se baja. La herida no se cura con análisis ni con espectáculo. Se cura mirándola, llorándola y dejándola cerrarse.",
        synthesis: "Convertir el dolor en discurso es otra forma de no atravesarlo.",
        prompt:    "¿Estás analizando lo que duele para no llorarlo, o estás performando lo que duele para no soltarlo?",
        manifestations: [
          "Contar tu ruptura como si fuera un caso de estudio y darte cuenta de que no soltaste una lágrima",
          "Quedarte tres años en el papel de \"la que sufrió\" porque dejarlo es más vacío que sostenerlo",
          "Volver al detalle exacto de la traición cada vez que aparece la posibilidad de calma"
        ],
        shadows: [
          "Se bloquea el cierre orgánico de la herida.",
          "Se exagera la teoría o el drama; ambas evitan el sentir simple.",
          "Se evita mirar que sanar también es dejar de identificarte con la herida."
        ]
      }
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
      ],
      reversed: {
        essence:   "El caballero sigue tendido, pero ya no descansa: se quedó. La capilla se cerró desde adentro.",
        reading:   "La tregua se volvió fuga. O confundiste descanso con escape y llevas meses de \"pausa\" mientras lo importante se acumula afuera, o nunca te diste la pausa real y ahora colapsa el cuerpo sin tu permiso. Recuperar el filo pide silencio elegido, no parálisis.",
        synthesis: "Quedarse en la pausa es seguir cansada con otra ropa.",
        prompt:    "¿Llevas en pausa lo que ya pide acción, o estás postergando una pausa real que el cuerpo ya te exige?",
        manifestations: [
          "Decir \"estoy descansando\" mientras llevas seis meses sin abrir el correo importante",
          "Llenar la \"pausa\" de scroll, series y ruido para no quedarte realmente quieta",
          "Llegar al fin de semana, no descansar nada, y volver el lunes peor que el viernes"
        ],
        shadows: [
          "Se bloquea el descanso real — o se elude, o se simula.",
          "Se exagera la inmovilidad o la falsa actividad; ambas drenan en lugar de recuperar.",
          "Se evita mirar que descansar también es decisión, y pide acción para protegerlo."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura recoge las espadas con sonrisa torcida. Las dos personas que se alejan no van a volver.",
        reading:   "Ganaste y eso te dejó más sola. O te aferraste a tener razón y perdiste el vínculo que estaba en juego, o cediste todo para que no haya conflicto y descubres, después, que también eso fue una derrota. El choque pidió mirada larga, y ofreciste reflejo corto.",
        synthesis: "La razón que se queda sin nadie que escuche es ruido caro.",
        prompt:    "¿En qué pelea reciente ganaste algo que perdió más de lo que ganó?",
        manifestations: [
          "Cerrar una discusión con la frase definitiva y descubrir que esa fue la última conversación",
          "Tener razón sobre algo y perder al amigo, la pareja o al vínculo familiar que sostenía la conversación",
          "Ceder por completo para mantener la paz y descubrir que la paz también se sostiene mintiendo"
        ],
        shadows: [
          "Se bloquea la mirada larga sobre el costo del conflicto.",
          "Se exagera la razón o la cesión; ambas evitan el cuidado real del vínculo.",
          "Se evita mirar que algunos triunfos solo se cobran con soledad."
        ]
      }
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
      ],
      reversed: {
        essence:   "El bote sigue en la mitad del río. La figura encapuchada se quedó mirando atrás demasiado tiempo.",
        reading:   "El cruce se atascó. O sigues en la orilla anterior pretendiendo haberte ido, o te subiste al bote sin destino y ahora flotas sin saber adónde ibas. Salir de un lugar mental también pide una imagen del lugar al que vas — aunque sea borrosa, aunque sea apenas.",
        synthesis: "Irse sin saber adónde es seguir clavada con otro paisaje.",
        prompt:    "¿Te estás yendo o te estás moviendo para no estar quieta? Y si te estás yendo, ¿hacia qué?",
        manifestations: [
          "Mudarte de ciudad y descubrir, dos meses después, que llevaste la misma ansiedad en la mochila",
          "Cortar de tajo y enseguida llenar el espacio con cualquier otra cosa para no sentir el cruce",
          "Volver mentalmente al lugar que dejaste cada vez que el nuevo se vuelve incómodo"
        ],
        shadows: [
          "Se bloquea el aterrizaje en la nueva orilla.",
          "Se exagera el escape o la nostalgia del lugar que ya no es.",
          "Se evita mirar que cruzar también pide imaginar dónde se llega."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura se aleja con cinco espadas y dejó dos clavadas. Camina mirando atrás, no por nostalgia: por miedo a ser vista.",
        reading:   "La estrategia se volvió doble vida o paranoia. O sostienes movimientos ocultos que ya pesan más que la intención original, o te volviste tan suspicaz que ves traición donde solo hay distancia. La cautela honesta pide que un día se muestre la jugada — y la tuya se quedó en sombra hace tiempo.",
        synthesis: "Lo que se hace sin nombre, después no encuentra cómo volver a tenerlo.",
        prompt:    "¿Qué estás haciendo en silencio que ya pide ser dicho, y a quién le tienes miedo si lo dijeras?",
        manifestations: [
          "Buscar trabajo, hablar con un terapeuta o ir a ver a alguien sin que nadie cercano se entere durante meses",
          "Sostener una mentira chica que se volvió arquitectura: ya no se puede sacar sin que algo se caiga",
          "Sospechar de cada gesto del otro y armar pruebas en tu cabeza sin verificar nada"
        ],
        shadows: [
          "Se bloquea la transparencia.",
          "Se exagera el ocultamiento estratégico o la sospecha sistémica.",
          "Se evita mirar que la libertad real exige, en algún momento, mostrar la cara."
        ]
      }
    },

    /* --------- OCHO DE ESPADAS · paredes hechas de palabras --- */
    Ocho: {
      suit:    'Espadas',
      number:  'Ocho',
      essence: 'Las paredes también pueden estar adentro.',
      reading: 'Hay una historia que te estás contando como si fuera la única posible. La sensación de encierro es real, pero las cuerdas que la sostienen son narrativas: cosas que piensas sobre ti que ya no necesitan ser ciertas.',
      synthesis: 'Lo que parece imposible, a veces, solo no se ha mirado dos veces.',
      prompt: '¿Qué te estás diciendo sobre ti misma como si fuera ley, y no es?',
      themes: ['Encierro mental', 'Narrativa interna', 'Imposibilidad percibida', 'Mirada estrecha'],
      manifestations: [
        'Repetirte que no puedes cuando todavía no probaste',
        'Sentir que no hay salida en una situación que tiene varias',
        'Pedir permiso para algo que ya puedes decidir sola',
        'Quedar inmovilizada por una versión vieja de ti misma'
      ],
      shadows: [
        'Identificarte con la víctima del propio relato',
        'Esperar que alguien te desate',
        'Confundir el pensamiento con la realidad'
      ],
      reversed: {
        essence:   "Las cuerdas se aflojaron y la figura se quedó adentro. La venda se la puso ella.",
        reading:   "El encierro mental se volvió hogar. O ya nadie te ata más que tu propio relato y aún así no saliste, o te volviste tan crítica del relato que dejaste de habitarlo sin construir otro. Lo que pedía narrativa nueva se quedó suspendido entre la queja y el desencanto.",
        synthesis: "Saber que estás encerrada no es lo mismo que salir.",
        prompt:    "¿Cuál de las cuerdas que te describen ya está desatada y aún así sigues haciendo de cuenta que tira?",
        manifestations: [
          "Repetir desde hace años \"yo soy así\" sobre algo que en privado dejó de ser cierto",
          "Diagnosticarte tus patrones a la perfección y no mover ni un gesto",
          "Esperar permiso de alguien para hacer algo que ya puedes decidir tú sola"
        ],
        shadows: [
          "Se bloquea el paso del relato a la acción.",
          "Se exagera la identificación con el encierro o la lucidez sin acto.",
          "Se evita mirar que liberarse también pide construir lo que viene después."
        ]
      }
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
        'Sentir que todo se complica justo cuando intentas dormir'
      ],
      shadows: [
        'Tomar decisiones desde el miedo y no desde la realidad',
        'Llamar intuición al pensamiento ansioso',
        'Cargarte mentalmente con problemas que no te corresponden'
      ],
      reversed: {
        essence:   "La figura sigue sentada en la cama con la cara entre las manos, pero el sol ya entró por la ventana hace rato. Las espadas en la pared no se mueven.",
        reading:   "La angustia nocturna se volvió vivienda. O hiciste de la rumiación un oficio nocturno que ya invade el día, o disimulaste tanto el miedo que el cuerpo te lo cobra en otro lado: contracturas, panza, insomnio que no se nombra. La cabeza no se calma sola: pide límite, pide día, pide ayuda.",
        synthesis: "El sufrimiento mental sostenido sin sostén afuera deja de ser pasaje y pasa a ser dirección.",
        prompt:    "¿A quién no le estás contando lo que te pasa de noche, y qué cambiaría si lo dijeras una sola vez en voz alta?",
        manifestations: [
          "Despertarte antes que el despertador todos los días con el mismo nudo en la garganta y normalizarlo",
          "Negar la ansiedad delante de los demás y vivirla en privado a los gritos silenciosos",
          "Tener una agenda de psicólogo abierta hace meses y no llamar"
        ],
        shadows: [
          "Se bloquea la posibilidad de pedir ayuda.",
          "Se exagera la rumiación o la ocultación; ambas dejan a una sola con la mente.",
          "Se evita mirar que algunas tormentas mentales no se cruzan sin compañía."
        ]
      }
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
      ],
      reversed: {
        essence:   "Las diez espadas siguen clavadas y la figura no termina de morir, pero tampoco de levantarse. El amanecer al fondo está, pero nadie lo está mirando.",
        reading:   "El final se cronificó. O te quedaste en el rol de víctima absoluta del propio agotamiento y ya no avanza nada, o saltaste de inmediato a una nueva pelea sin haber dejado morir la anterior. Lo que pedía el fondo era soltar — no quedarse ahí, no negarlo.",
        synthesis: "Hacer del agotamiento un trono también es una manera de no terminar.",
        prompt:    "¿Qué cierre mental llevas semanas postergando porque mientras dure la agonía no hay que decidir el después?",
        manifestations: [
          "Llamar a contar una y otra vez la misma desgracia y descubrir que ya nadie sabe cómo ayudarte",
          "Anunciar tu final dramático y, dos días después, seguir igual, esperando otro fondo",
          "Saltar a un nuevo trabajo, vínculo o ciudad sin haber soltado la pelea anterior, que ahora se cuela en la nueva"
        ],
        shadows: [
          "Se bloquea el cierre verdadero.",
          "Se exagera la postura final o la huida hacia adelante.",
          "Se evita mirar que el amanecer pide que te incorpores, no solo que sobrevivas."
        ]
      }
    },

    /* --------- SOTA DE ESPADAS · curiosidad mental ------------ */
    Sota: {
      suit:    'Espadas',
      number:  'Sota',
      essence: 'Querer entender también es una forma de respeto.',
      reading: 'Hay una curiosidad afilada en ti que está observando más de lo que dice. Esta carta te invita a hacer preguntas con cuidado: la mente nueva todavía no domina su filo y conviene usarlo para abrir, no para herir.',
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
        'Hablar más rápido de lo que piensas',
        'Confundir desconfianza con análisis'
      ],
      reversed: {
        essence:   "La sota mira el horizonte ventoso y el filo se le volvió hacia adentro. La curiosidad se convirtió en vigilancia.",
        reading:   "La curiosidad mental se desfiguró en chisme, suspicacia o autoexigencia. O escaneas a los demás buscando errores que confirmen tu sospecha, o te volviste auditora interna implacable y ya no se puede pensar en paz. La pregunta original —querer entender— quedó sepultada bajo el escrutinio.",
        synthesis: "Vigilar todo el tiempo es una forma cara de no entender nada.",
        prompt:    "¿A quién o a qué estás vigilando hace tiempo en lugar de simplemente preguntar?",
        manifestations: [
          "Releer mensajes viejos buscando una contradicción para tener razón",
          "Hacer preguntas que parecen curiosidad y son trampa: ya tienes la conclusión",
          "Auditarte cada gesto durante el día y llegar a la noche exhausta sin haber decidido nada"
        ],
        shadows: [
          "Se bloquea la curiosidad limpia.",
          "Se exagera el control sobre los demás o sobre una misma.",
          "Se evita mirar que entender pide humildad, no patrullaje."
        ]
      }
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
      ],
      reversed: {
        essence:   "El caballero galopa hacia la ventisca con la espada al frente. La armadura suena, pero hace tiempo que nadie está al otro lado.",
        reading:   "El impulso se volvió atropello o se desinfló en arenga. O dijiste todo de golpe y dejaste a alguien tirado en la conversación, o llevas días arengando hacia adentro sin dar el paso afuera. La velocidad mental no se confunde con coraje: muchas veces es miedo bien disfrazado.",
        synthesis: "Cargar contra todo es otra forma de no cargar contra lo que importa.",
        prompt:    "¿A quién atropellaste con tu honestidad esta semana, o a quién no se la dijiste por miedo a herir?",
        manifestations: [
          "Mandar un mensaje filoso y arrepentirte cinco minutos después, pero sin volver a escribir",
          "Discutir un tema con cinco personas distintas la misma semana y no hablarlo con la persona implicada",
          "Convencer al equipo de hacer algo en velocidad y darse cuenta tarde de que no era el rumbo"
        ],
        shadows: [
          "Se bloquea la pausa antes del filo.",
          "Se exagera la velocidad o la arenga interna que no llega afuera.",
          "Se evita mirar que la convicción rápida también necesita ser revisada."
        ]
      }
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
        'Decir lo que piensas sin disculparte de más',
        'Sostener una posición propia frente a alguien querido',
        'Reconocer un patrón ajeno sin entrar a juzgarlo',
        'Cortar un vínculo con dignidad y sin escándalo'
      ],
      shadows: [
        'Endurecerte para no volver a sufrir',
        'Confundir distancia con autonomía',
        'Cortar lazos en silencio en lugar de hablar'
      ],
      reversed: {
        essence:   "La reina mira hacia el horizonte con la espada quieta. El gesto es el mismo, pero la mirada se volvió hielo.",
        reading:   "La lucidez se endureció. O usas tu claridad para mantener a todos a distancia y ya nadie sabe cómo acercarse, o te identificaste con \"la que vio demasiado\" y dejaste de permitirte la torpeza humana. La verdad bien dicha se reemplazó por verdad cortante.",
        synthesis: "Volverse invulnerable también es una forma de quedarse sola.",
        prompt:    "¿De qué te estás defendiendo con tu lucidez, y qué cosa simple no estás dejando entrar?",
        manifestations: [
          "Despachar a alguien con una observación precisa y sentir, después, un silencio incómodo dentro tuyo",
          "Construirte una identidad de \"yo me banco sola\" que ya no admite recibir cuidado",
          "Cortar lazos con un análisis impecable y descubrir, meses después, que no fue exactamente eso"
        ],
        shadows: [
          "Se bloquea la ternura disponible.",
          "Se exagera la dureza o la independencia como armadura.",
          "Se evita mirar que ver claro y dejarte querer no son contradictorios."
        ]
      }
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
      ],
      reversed: {
        essence:   "El rey sigue en su trono con la espada vertical, pero la mirada se volvió tribunal. Las nubes detrás se le metieron en los ojos.",
        reading:   "El juicio firme se volvió juicio sin cuidado. O dictaminas con autoridad sobre los demás sin haberte mirado en los mismos parámetros, o usas la lógica como blindaje contra cualquier emoción propia o ajena. La autoridad mental sin afecto se convierte en sentencia.",
        synthesis: "Decidir bien y decidir solo no son la misma cosa.",
        prompt:    "¿A quién juzgaste esta semana con criterios que no te aplicas a ti mismo? ¿Y qué emoción tuya estás aplastando con argumento?",
        manifestations: [
          "Resolver un conflicto en el trabajo con criterio impecable y volver a casa sintiéndote vacío",
          "Pronunciarte con seguridad sobre la vida ajena mientras la propia está sin mirar",
          "Usar la frase \"hay que ser objetivo\" para descartar emociones legítimas en una conversación"
        ],
        shadows: [
          "Se bloquea la inclusión del afecto en la decisión.",
          "Se exagera el rigor o la distancia analítica.",
          "Se evita mirar que la justicia sin cuidado se acerca peligrosamente al castigo."
        ]
      }
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
      essence: 'Algo en ti quiere encenderse.',
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
      ],
      reversed: {
        essence:   "La antorcha sigue encendida en la mano, pero alguien la cubre con el manto. La hoja apenas brotada se queda sin aire.",
        reading:   "La chispa apareció y la apagaste para no comprometerte, o la sostuviste tan apretada que se volvió obsesión sin gesto. El impulso recién llegado pidió un primer paso chico y le respondiste con plan eterno, con miedo a equivocarte, o con una intensidad que ya no escucha al cuerpo.",
        synthesis: "Lo que se enciende sin gesto se vuelve fiebre o se apaga.",
        prompt:    "¿Qué chispa estás cuidando tan adentro que ya no respira, o tan afuera que ya nadie cree?",
        manifestations: [
          "Anunciar el proyecto en redes y no abrir un solo documento en dos meses",
          "Vivir de la idea brillante mientras el resto de tu vida se queda sin atención",
          "Apagar tu propia chispa porque te dio vergüenza la torpeza del primer intento"
        ],
        shadows: [
          "Se bloquea el paso de la chispa al gesto.",
          "Se exagera el anuncio o el ocultamiento; ambas formas de no empezar.",
          "Se evita mirar que el deseo nuevo se cuida usándolo, no protegiéndolo de todo."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sostiene el globo y se quedó mirando el horizonte hace meses. Los bastos siguen apoyados en el muro.",
        reading:   "El horizonte se volvió pantalla. O planeas el salto eternamente y eso ya es una forma de no saltar, o lo idealizaste tanto que nada de lo cercano te parece suficiente. La expansión real pide pisar territorio nuevo, aunque sea un metro — no contemplarlo durante años.",
        synthesis: "Mirar el mundo en la mano y no usarlo es una manera elegante de quedarse.",
        prompt:    "¿Hace cuánto estás \"pensando si lanzarte\" a lo mismo, y qué está costando esa quietud aunque no se vea?",
        manifestations: [
          "Tener tres planes de cambio de vida abiertos en pestañas y no haber dado el primer paso de ninguno",
          "Desvalorizar lo que ya construiste mientras esperas el salto perfecto",
          "Pedirle al futuro garantías que ningún futuro te puede dar"
        ],
        shadows: [
          "Se bloquea el aterrizaje del horizonte en gesto concreto.",
          "Se exagera la planificación o la idealización del afuera.",
          "Se evita mirar que toda expansión empieza con un paso menor que la visión."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sigue de espaldas mirando el mar. Los barcos zarparon y ella no termina de soltar la mirada.",
        reading:   "Lanzaste algo y no puedes parar de revisar. La espera activa se volvió hostigamiento — al proyecto, al otro, a ti misma. O al revés: te quedaste tan mirando el horizonte que no notaste que algunos barcos ya volvieron y nadie está atendiendo el puerto.",
        synthesis: "Mirar todo el tiempo lo lanzado es otra manera de no soltarlo.",
        prompt:    "¿Cuántas veces al día revisas algo que decidiste \"dejar circular\", y qué te dice ese gesto sobre tu confianza real?",
        manifestations: [
          "Refrescar el mail veinte veces esperando una respuesta y no avanzar en nada más",
          "Mandar tres seguimientos en una semana a alguien que dijo \"te respondo cuando pueda\"",
          "Esperar tanto el resultado del barco lanzado que olvidaste qué ibas a hacer mientras tanto"
        ],
        shadows: [
          "Se bloquea la confianza en lo lanzado.",
          "Se exagera el control o la pasividad de la espera.",
          "Se evita mirar que la espera activa pide presencia en otra cosa, no en la misma."
        ]
      }
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
      ],
      reversed: {
        essence:   "La guirnalda sigue colgada, los bastos firmes. Pero adentro de la fiesta nadie se mira y la pareja del centro ya no se toca.",
        reading:   "La celebración se volvió postal o se evitó del todo. O sostienes una llegada hacia afuera mientras por dentro hay vacío que no contás, o pasas a la siguiente etapa sin haberte dado el rato de respirar lo conseguido. Lo que pedía pausa cálida quedó en foto o quedó en huida hacia adelante.",
        synthesis: "Festejar afuera lo que no se festeja adentro es otra forma de no llegar.",
        prompt:    "¿Qué llegada estás performando o saltando, en lugar de habitarla unos días?",
        manifestations: [
          "Hacer la fiesta de inauguración y volver al proyecto siguiente al día siguiente",
          "Anunciar tu logro en redes y sentir, en privado, un vacío que no terminas de explicar",
          "Comprar la casa o cerrar el ciclo importante y no detenerte ni una hora a registrarlo"
        ],
        shadows: [
          "Se bloquea el goce de la pausa.",
          "Se exagera la performance o la huida hacia el próximo objetivo.",
          "Se evita mirar que celebrar también es decisión de quedarte un rato."
        ]
      }
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
      ],
      reversed: {
        essence:   "Cinco figuras agitan los bastos, pero ya nadie sabe contra qué. El choque se volvió ritual.",
        reading:   "El conflicto perdió su motivo y se volvió costumbre. O peleas por inercia con la misma persona o el mismo grupo, o aviva el ruido tu cabeza —proyectos chocando, opiniones enfrentadas— porque la calma te asusta más. La fricción dejó de servir y empezó a desgastar.",
        synthesis: "El ruido por costumbre también es una forma de no estar.",
        prompt:    "¿Qué pelea sostienes esta semana que ya no recuerdas cómo empezó, y a qué te estás escapando con ella?",
        manifestations: [
          "Discutir con tu pareja, hermano o amigo el mismo tema con distinto disfraz cada quince días",
          "Llenar tu agenda de proyectos que compiten entre sí para no quedarte quieta con tu deseo real",
          "Avivar la tensión en un grupo solo porque aburre no estar en algo intenso"
        ],
        shadows: [
          "Se bloquea la salida del conflicto.",
          "Se exagera la competencia o la dispersión interna.",
          "Se evita mirar que sin ruido habría que escuchar otra cosa."
        ]
      }
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
      ],
      reversed: {
        essence:   "El que cabalga delante levantó el palo con corona, pero la mirada se volvió hambre. Detrás, los demás caminan con la cabeza baja.",
        reading:   "El reconocimiento se volvió necesidad. O dependes del aplauso para sentir que algo es real, o te volviste tan ruidosa con tus logros que la gente alrededor empezó a alejarse. Lo que pedía un brillo merecido quedó en performance hambrienta o en evitación humilde de cualquier visibilidad.",
        synthesis: "Necesitar el aplauso para existir es entregar el escenario al público.",
        prompt:    "¿Qué logro estás contando una y otra vez porque adentro todavía no terminó de aterrizar como real?",
        manifestations: [
          "Repetir tu logro en cada conversación buscando algo que el aplauso no termina de darte",
          "Esconder lo que conseguiste para no incomodar y vivir una visibilidad apocada",
          "Confundir likes, métricas o validación pública con sostén interno"
        ],
        shadows: [
          "Se bloquea el sostén interno del logro.",
          "Se exagera la búsqueda de aplauso o la modestia evasiva.",
          "Se evita mirar que el reconocimiento honesto se recibe, no se mendiga."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sigue en la cima sosteniendo el basto, pero ya nadie ataca abajo. Sigue defendiéndose contra el viento.",
        reading:   "La defensa se volvió postura permanente. O ves enemigos donde solo hay distancia, o sigues peleando una batalla que ya ganaste hace tiempo y no te diste cuenta. La firmeza necesaria del Siete se transformó en rigidez paranoica.",
        synthesis: "Defenderse de fantasmas también deja al cuerpo agotado.",
        prompt:    "¿De qué te estás protegiendo que hace meses no te ataca, y a qué te tendrías que dedicar si bajaras la guardia?",
        manifestations: [
          "Discutir cada idea en el trabajo como si fuera atentado, hasta que el equipo deja de proponer",
          "Sostener un límite contra alguien que ya ni siquiera te lo pidió",
          "Defender una opinión tuya en la cabeza durante semanas sin que nadie la haya cuestionado"
        ],
        shadows: [
          "Se bloquea la salida del modo defensivo.",
          "Se exagera la suspicacia o la rigidez identitaria.",
          "Se evita mirar que algunas posiciones ya no piden defensa: piden vivirlas."
        ]
      }
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
      ],
      reversed: {
        essence:   "Los ocho bastos siguen volando por el aire, pero ya nadie los está esperando del otro lado. Caen al suelo sin objetivo.",
        reading:   "La velocidad se descontroló. O dijiste sí a todo lo que llegó al mismo tiempo y ahora estás corriendo sin saber a dónde, o frenaste por miedo justo cuando todo pedía aceleración honesta. El momentum no es bendición ni maldición — depende de qué hagas con él.",
        synthesis: "Ir rápido sin destino es ir perdida más rápido.",
        prompt:    "¿En qué de todas las cosas que se aceleraron deberías frenar — y en cuál estás frenando solo por miedo?",
        manifestations: [
          "Aceptar tres oportunidades el mismo mes y darte cuenta de que no tienes tiempo para sostener ninguna",
          "Sentir que tu vida se mueve sola y que estás corriendo detrás de tu propia agenda",
          "Pisar el freno justo cuando el aire empujaba — y arrepentirte tres meses después"
        ],
        shadows: [
          "Se bloquea el discernimiento dentro de la velocidad.",
          "Se exagera el sí compulsivo o el freno por miedo.",
          "Se evita mirar que la sincronía pide elegir, no abrazarlo todo."
        ]
      }
    },

    /* --------- NUEVE DE BASTOS · última guardia -------------- */
    Nueve: {
      suit:    'Bastos',
      number:  'Nueve',
      essence: 'Falta poco, y por eso cuesta más.',
      reading: 'Estás cansada y, aún así, todavía no es momento de soltar la guardia. Esta carta no romantiza el aguante: te recuerda que el último tramo pesa precisamente porque ya casi llegaste.',
      synthesis: 'El último esfuerzo también es resistencia.',
      prompt: '¿Qué esfuerzo estás por abandonar justo cuando ya casi llegas?',
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
      ],
      reversed: {
        essence:   "La figura sigue apoyada en el basto con la venda en la cabeza. Los otros ocho bastos forman un cerco, pero ya nadie los toca.",
        reading:   "La guardia se volvió desconfianza permanente. O sostienes un estado vigilante hace tantos meses que ya no distingues amenaza real de imaginada, o aguantas hasta el fin sin pedir ayuda y llegas roto, no entero. La resistencia honesta pide tregua estratégica, no postura inquebrantable.",
        synthesis: "El cuerpo en guardia todo el tiempo deja de servir como guardia.",
        prompt:    "¿Cuántos meses llevas en alerta, y a quién no le estás pidiendo el relevo que ya necesitas?",
        manifestations: [
          "Llegar al final del proyecto entera por fuera y vacía por dentro, sin haber dejado entrar a nadie",
          "Sospechar de cada gesto amable como si tuviera doble intención",
          "Confundir aguante con dignidad y romperte antes de pedir ayuda"
        ],
        shadows: [
          "Se bloquea el descanso real y la confianza.",
          "Se exagera la resistencia o la suspicacia.",
          "Se evita mirar que llegar acompañada también es llegar."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura camina hacia la casa con los diez bastos al frente, pero ya no ve por dónde pisa. La carga tapó la visión.",
        reading:   "La sobrecarga se cronificó. O cargas todo y te quejas todo, sin soltar nada de lo que llevas, o sigues sumando responsabilidades para sentirte indispensable. El compromiso real pide elegir; cargarlo todo es otra forma de no comprometerse con nada.",
        synthesis: "Llevar mucho no es sinónimo de ser muchas cosas.",
        prompt:    "¿Qué de lo que cargas estás sosteniendo porque te da miedo descubrir quién eres si lo soltaras?",
        manifestations: [
          "Sostener proyectos viejos, vínculos cumplidores y tareas heredadas sin revisar uno solo",
          "Quejarte de la carga en cada conversación y rechazar toda ayuda concreta",
          "Hacer del cansancio una identidad que ya nadie se atreve a cuestionar"
        ],
        shadows: [
          "Se bloquea la revisión de la carga.",
          "Se exagera el aguante o la queja sin gesto.",
          "Se evita mirar que devolver bultos también es liderazgo personal."
        ]
      }
    },

    /* --------- SOTA DE BASTOS · curiosidad activa ------------ */
    Sota: {
      suit:    'Bastos',
      number:  'Sota',
      essence: 'Las ganas también te dicen por dónde.',
      reading: 'Hay un entusiasmo fresco en ti pidiendo movimiento. Esta carta no te apura a comprometerte: te invita a curiosear, probar, dejar que el cuerpo y el deseo te muestren un camino antes de decidir si quieres sostenerlo.',
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
      ],
      reversed: {
        essence:   "La sota sigue mirando el basto que floreció, pero el desierto detrás se hizo más grande. La curiosidad se volvió capricho corto.",
        reading:   "El entusiasmo se volvió fuegos artificiales. O empiezas algo nuevo cada semana y no sostienes ninguno más de un mes, o te entusiasmas tanto en la cabeza que jamás llega a la mano. Lo que pedía exploración seria se quedó en chispa que no calienta a nadie.",
        synthesis: "Encenderse por todo es otra manera de no comprometerte con nada.",
        prompt:    "¿Qué deseo nuevo abandonaste antes del primer obstáculo, y qué patrón se repite entre los anteriores?",
        manifestations: [
          "Comprar el equipo para empezar y abandonar antes de la segunda semana",
          "Anunciar a todo el mundo tu nuevo entusiasmo y descubrirte aburriéndote del tema",
          "Tener cinco intereses paralelos en la cabeza y ningún paso firme en ninguno"
        ],
        shadows: [
          "Se bloquea la profundización del deseo.",
          "Se exagera la dispersión o la comunicación prematura.",
          "Se evita mirar que el deseo verdadero pide quedarse aunque deje de ser excitante."
        ]
      }
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
      ],
      reversed: {
        essence:   "El caballero galopa con el basto en alto, pero la armadura tiene quemaduras. Detrás, deja un campo en llamas.",
        reading:   "El fuego se volvió incendiario. O arrasaste con un proyecto, un vínculo o una decisión sin medir consecuencias y ahora hay daño que no querías hacer, o no te lanzas nunca y descargas el fuego internamente, en discusiones que no tienen nada que ver. El coraje pidió rumbo y ofreciste velocidad.",
        synthesis: "Avanzar quemándolo todo no es coraje. Es huida con olor a humo.",
        prompt:    "¿A quién o a qué dejaste atrás chamuscado en tu último impulso, y volviste a mirarlo o sigues cabalgando?",
        manifestations: [
          "Cortar con la pareja, el trabajo o la ciudad de un día para otro y enterarte después de qué se rompió",
          "Defender una causa con tanto fuego que terminaste agrediendo a quienes estaban de tu lado",
          "Reprimir el impulso durante meses y descargarlo todo en una discusión doméstica que no merecía esa intensidad"
        ],
        shadows: [
          "Se bloquea la dirección lúcida del impulso.",
          "Se exagera la velocidad descontrolada o la represión que después estalla.",
          "Se evita mirar que el fuego cuidado también puede sostener, no solo quemar."
        ]
      }
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
      ],
      reversed: {
        essence:   "La reina sigue en su trono con el basto y el girasol, pero la sonrisa se volvió cálculo. El gato negro a sus pies cambió de mirada.",
        reading:   "La presencia magnética se volvió actuación. O sostienes una performance constante de calidez y carisma porque temes que sin eso no te elijan, o te volviste tan dueña de la escena que ya nadie a tu alrededor se anima a brillar. El fuego firme se distorsionó: hacia un lado, complacencia; hacia el otro, autoritarismo simpático.",
        synthesis: "Brillar para ser elegida es otra forma de no estar realmente.",
        prompt:    "¿Cuándo fue la última vez que estuviste en un lugar sin tener que ser cálida, encantadora o central?",
        manifestations: [
          "Iluminar cada conversación y volver a casa drenada sin que nadie haya preguntado por ti",
          "Sostener una calidez performada con quien ya no te interesa, porque no soportarías que se aleje",
          "Eclipsar sin querer a alguien cercano que también necesita su brillo"
        ],
        shadows: [
          "Se bloquea la presencia honesta sin performance.",
          "Se exagera la calidez como obligación o el centralismo de escena.",
          "Se evita mirar que el magnetismo verdadero también admite no brillar."
        ]
      }
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
      ],
      reversed: {
        essence:   "El rey sigue en su trono con el basto y la salamandra, pero la mirada se volvió mando seco. El león tallado dejó de respirar.",
        reading:   "El liderazgo creativo se volvió autoritarismo. O impones tu visión sin escuchar a nadie y rodeas de gente que solo asiente, o abandonaste el rumbo y dejaste a otros liderar tu propia vida porque sostener pesa. La pasión madura pidió dirección, y ofreciste o despotismo o abdicación.",
        synthesis: "Liderar imponiendo o no liderar son dos formas de no acompañar.",
        prompt:    "¿A quién en tu equipo, casa o vida estás silenciando con tu \"experiencia\", o a quién le delegaste la dirección de algo que era tuyo?",
        manifestations: [
          "Tener razón sistemáticamente con tu equipo y descubrir que ya nadie te trae ideas frescas",
          "Renunciar a tomar las riendas de un proyecto propio y verlo derivar a algo que no es lo que querías",
          "Confundir tu visión con verdad y descalificar las dudas legítimas de los demás"
        ],
        shadows: [
          "Se bloquea la escucha dentro del liderazgo.",
          "Se exagera la imposición o la abdicación.",
          "Se evita mirar que sostener una visión también incluye dejar que otros la enriquezcan."
        ]
      }
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
        'Calcular tanto que no llegas a tomarlo',
        'Confundir una oferta con un destino'
      ],
      reversed: {
        essence:   "La mano sigue extendida con la moneda, pero alguien cerró el puño antes de tomarla. La oferta queda colgando en el aire.",
        reading:   "La oportunidad concreta apareció y la dejaste pasar, o la calculaste tanto que cuando moviste la mano ya no estaba. O al revés: la tomaste sin mirarla bien y ahora cargas algo que no querías. Lo material pidió aterrizaje sereno y obtuvo desconfianza o impulso.",
        synthesis: "Lo concreto no espera para siempre.",
        prompt:    "¿Qué oferta tangible —de trabajo, recurso, cuerpo, vínculo— estás demorando porque calcular cuesta menos que decidir?",
        manifestations: [
          "Recibir una propuesta laboral sólida y postergar la respuesta hasta que el otro busca a alguien más",
          "Aceptar un recurso o trabajo sin mirarlo bien y descubrir, después, que no era lo que decías querer",
          "Dejar pasar el cuidado del cuerpo —turno, rutina, descanso— por estar esperando el momento ideal"
        ],
        shadows: [
          "Se bloquea la recepción concreta.",
          "Se exagera el cálculo o la aceptación apurada.",
          "Se evita mirar que lo material también pide gesto en tiempo real."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sigue haciendo malabarismo con las dos monedas, pero la sonrisa se borró. Los barcos detrás se balancean cada vez más fuerte.",
        reading:   "El malabarismo se volvió oficio sin pausa. O sostienes diez cosas a la vez por costumbre y ya no sabes cuál es la que importa, o caíste en el otro extremo: tiraste todo al piso porque no soportabas seguir y ahora no estás cumpliendo con nada. El ritmo pidió revisión, no más virtuosismo.",
        synthesis: "Sostenerlo todo todo el tiempo es una forma de no sostener nada.",
        prompt:    "¿Qué pelota podrías dejar caer esta semana sin que el mundo se acabe, y a qué te asusta descubrir si lo hicieras?",
        manifestations: [
          "Llevar trabajo, casa, hijos, estudios y rutina física al mismo tiempo y descubrirte llorando en el baño un martes cualquiera",
          "Hacer del \"yo puedo con todo\" identidad y notar que ya nadie te ofrece ayuda",
          "Soltar todo de golpe en un colapso porque no había forma de soltar de a poco"
        ],
        shadows: [
          "Se bloquea la priorización honesta.",
          "Se exagera el aguante o el colapso final.",
          "Se evita mirar que la agilidad también pide saber qué no sostener."
        ]
      }
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
      ],
      reversed: {
        essence:   "Los tres trabajadores siguen en la catedral, pero ya no se hablan. El plano del arquitecto cambió y nadie lo dijo en voz alta.",
        reading:   "La colaboración se rompió o se evita. O quisiste hacerlo todo sola para no deber nada y descubriste que tu parte no calzaba con nada, o aceptaste un \"trabajo en equipo\" en el que nadie tiene claro su rol y todos hacen como que. El oficio compartido pide pedir, decir y revisar — no asumir.",
        synthesis: "Construir en silencio paralelo no es construir juntos.",
        prompt:    "¿Qué pieza no estás pidiendo —ayuda, claridad, reconocimiento— que está frenando lo que se podría construir mejor entre varios?",
        manifestations: [
          "Sostener tu parte de un proyecto en perfecto silencio y descubrir, al entregar, que el otro hizo otra cosa",
          "Aceptar un equipo donde no se decide nada y notar que cada quien va tirando para su lado",
          "Cargar sola lo que era de varios para no tener que pedir, y volver a casa agotada"
        ],
        shadows: [
          "Se bloquea la comunicación dentro del oficio compartido.",
          "Se exagera la autosuficiencia o la falsa colaboración.",
          "Se evita mirar que pedir también es trabajo."
        ]
      }
    },

    /* --------- CUATRO DE OROS · puños cerrados ---------------- */
    Cuatro: {
      suit:    'Oros',
      number:  'Cuatro',
      essence: 'Lo que abrazas muy fuerte deja de respirar.',
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
      ],
      reversed: {
        essence:   "La figura sigue sentada en su trono con las cuatro monedas, pero las manos se volvieron piedra. La ciudad atrás se ve cada vez más lejos.",
        reading:   "Lo conseguido se volvió rehén. O aprietas tanto los recursos —dinero, tiempo, afecto, posición— que la propia vida se vuelve estrecha, o lo abriste todo de golpe por miedo a parecer avara y ahora estás en otra forma de exposición. La estabilidad pide mano abierta sin perder firmeza.",
        synthesis: "Cuidarlo cerrando es otra forma de perderlo.",
        prompt:    "¿Qué estás reteniendo con miedo cuando, en realidad, ya es tuyo y solo pide ser usado?",
        manifestations: [
          "Postergar una compra que necesitas hace meses para \"sentirte segura\" y notar que la sensación de inseguridad sigue igual",
          "Defender una rutina, un cargo o una posición con tanta rigidez que ya nadie se atreve a sugerir cambios",
          "Abrir todo de golpe por miedo a quedar como controladora y arrepentirte después"
        ],
        shadows: [
          "Se bloquea la circulación de lo que se tiene.",
          "Se exagera el control o el desprendimiento performativo.",
          "Se evita mirar que la seguridad real no se construye apretando."
        ]
      }
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
      ],
      reversed: {
        essence:   "Las dos figuras siguen caminando por la nieve. La luz de la iglesia detrás está, pero ninguno la mira ya.",
        reading:   "La carencia se volvió identidad. O te quedaste afuera tanto tiempo que ya no quieres entrar aunque te abran la puerta, o niegas la dificultad real y te exiges felicidad performada cuando lo que necesitas es decir \"no estoy bien\". El frío pidió ser nombrado, no romantizado ni tapado.",
        synthesis: "Vivir afuera del refugio porque entrar duele orgullo es otra forma de seguir afuera.",
        prompt:    "¿Qué ayuda concreta estás rechazando esta semana, y qué prefieres no admitir si la aceptaras?",
        manifestations: [
          "Pasar un mal momento económico, afectivo o de salud y rechazar a quienes ofrecen ayuda real",
          "Decir \"todo bien\" en automático cuando todo no está bien, y descubrir que ya nadie te pregunta dos veces",
          "Hacer de la dificultad una historia de identidad en lugar de un tramo a cruzar"
        ],
        shadows: [
          "Se bloquea la posibilidad de pedir y recibir.",
          "Se exagera el orgullo defensivo o la negación performada.",
          "Se evita mirar que estar mal es información, no fracaso."
        ]
      }
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
      ],
      reversed: {
        essence:   "La figura sigue pesando las monedas en la balanza, pero ya no mira a quién le da. Los pobres a sus pies se volvieron pose.",
        reading:   "El intercambio se desbalanceó. O das para sentirte indispensable y después te resientes porque \"nadie te lo agradece\", o recibes y te sientes en deuda perpetua aunque el otro no haya pedido devolución. La generosidad cuidada pide claridad sobre el motivo, no solo sobre la cifra.",
        synthesis: "Dar para tener autoridad o recibir para deberse no es intercambio: es contrato disfrazado.",
        prompt:    "¿Por qué exactamente estás dando lo que estás dando, y por qué te cuesta recibir lo que estás recibiendo?",
        manifestations: [
          "Prestar dinero, tiempo o atención y llevarlo en la cabeza como crédito hasta que alguien te falle y exploten cinco años de cuentas",
          "Recibir una ayuda chica y sentirte tan en deuda que ya no te animas a estar cerca de quien te la dio",
          "Confundir generosidad con tener algo que el otro no, y ubicarte arriba sin querer"
        ],
        shadows: [
          "Se bloquea el intercambio honesto.",
          "Se exagera la donación con costo emocional o la deuda invisible.",
          "Se evita mirar que dar y recibir no son favores: son lengua común."
        ]
      }
    },

    /* --------- SIETE DE OROS · cultivo lento ----------------- */
    Siete: {
      suit:    'Oros',
      number:  'Siete',
      essence: 'El cultivo también se hace mirando.',
      reading: 'Algo que sembraste hace rato pide tiempo para madurar. Esta carta no te pide más esfuerzo: te pide bajar las herramientas, mirar lo que crece y resistir el impulso de arrancar las raíces para revisar si están vivas.',
      synthesis: 'Algunos resultados solo llegan si los dejas crecer.',
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
      ],
      reversed: {
        essence:   "La figura sigue apoyada en la herramienta mirando la planta. Pero ahora mira el reloj cada dos minutos. Las monedas que ya cuelgan dejaron de contarse.",
        reading:   "La paciencia se volvió impaciencia disfrazada de meditación, o se cronificó en resignación. O arrancas las raíces porque no soportas no ver progreso, o llevas años contemplando un proyecto que ya no crece y al que ya no estás cuidando. El cultivo pide presencia activa, no vigilancia ni abandono romántico.",
        synthesis: "Esperar sin atender es otra forma de no esperar.",
        prompt:    "¿Qué proyecto, vínculo o proceso llevas \"madurando\" tanto que ya empezó a secarse sin que lo notaras?",
        manifestations: [
          "Mirar las métricas de tu emprendimiento todos los días buscando una señal de cambio que no llega",
          "Quedarte en una etapa estancada y llamar paciencia a lo que ya es resignación",
          "Arrancar el proyecto justo antes de que diera fruto porque no soportabas no saber"
        ],
        shadows: [
          "Se bloquea la presencia activa en la espera.",
          "Se exagera la impaciencia o la resignación romántica.",
          "Se evita mirar que esperar bien también pide mantener el riego."
        ]
      }
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
      ],
      reversed: {
        essence:   "El artesano sigue sentado golpeando la moneda, pero ya no mira lo que hace. La ciudad detrás cerró las puertas.",
        reading:   "La práctica se volvió rutina sin alma. O repites el oficio en piloto automático y la maestría se volvió producción mecánica, o saltas de técnica en técnica buscando \"perfeccionarte\" sin profundizar ninguna. El taller pidió constancia con mirada despierta, no autoexplotación ni colección de cursos.",
        synthesis: "Repetir sin presencia no afina: solo gasta.",
        prompt:    "¿Qué estás haciendo en piloto automático que merecería diez minutos de mirada nueva — o qué estás aprendiendo en serie sin practicar ninguna?",
        manifestations: [
          "Llevar años en el mismo oficio y no recordar la última vez que aprendiste algo nuevo",
          "Anotarte a tres cursos de algo y abandonarlos a la mitad porque ya \"sabes lo básico\"",
          "Practicar diez horas al día y romperte el cuerpo en nombre de un dominio que ya no estás disfrutando"
        ],
        shadows: [
          "Se bloquea la presencia dentro de la repetición.",
          "Se exagera la mecánica o la dispersión teórica.",
          "Se evita mirar que el oficio también pide cuidar al que lo ejerce."
        ]
      }
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
      ],
      reversed: {
        essence:   "La mujer sigue en su jardín con el halcón en la mano, pero el guante se le quedó pegado a la piel. Las uvas detrás están maduras y nadie las come.",
        reading:   "La autonomía se volvió aislamiento. O construiste un jardín tan tuyo que ya no entra nadie y empezó a quedarte chico, o lo abriste por desgaste y te disolviste en lo de los demás sin haberte dado el rato de habitarlo sola. La suficiencia pide ser jardín, no fortaleza ni puerta abierta sin filtro.",
        synthesis: "Estar bien sola no significa quedarse sola para siempre.",
        prompt:    "¿Qué estás disfrutando sola por convicción y qué por miedo a que alguien lo arruine si lo compartieras?",
        manifestations: [
          "Tener la vida que querías y darte cuenta de que rechazas, sin pensarlo, casi cada invitación",
          "Confundir tu independencia con \"no necesito a nadie\" hasta que pasa algo y no sabes a quién llamar",
          "Abrir tu jardín a alguien apurada y descubrir, después, que no querías compartirlo así"
        ],
        shadows: [
          "Se bloquea la flexibilidad entre estar sola y estar con otros.",
          "Se exagera la autosuficiencia o la fusión por agotamiento.",
          "Se evita mirar que el jardín bien construido también puede recibir."
        ]
      }
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
      ],
      reversed: {
        essence:   "La familia sigue bajo el arco, pero el viejo del fondo ya no sabe quién es quién. Los perros guardan algo que nadie nombra.",
        reading:   "El legado se volvió peso o se volvió postal. O sostenes una pertenencia familiar o de tradición que ya no te representa, por culpa o por costumbre, o renegaste de todo lo heredado y descubres, después, que estás repitiendo los mismos patrones con otro decorado. Las raíces piden revisión consciente, no sumisión ni ruptura ciega.",
        synthesis: "Heredar sin elegir y romper sin entender son la misma trampa con dirección opuesta.",
        prompt:    "¿Qué tradición, regla o lealtad familiar estás sosteniendo que ya no es tuya — o cuál estás repitiendo creyendo que la rompiste?",
        manifestations: [
          "Pasar Navidad cumpliendo el mismo ritual incómodo durante años sin animarte a sugerir un cambio",
          "Romper con tu familia o con tu cultura y descubrir que armaste otra estructura igual de rígida",
          "Confundir pertenencia con obligación y vivir cumpliendo papeles que ya no eliges"
        ],
        shadows: [
          "Se bloquea la elección consciente sobre lo recibido.",
          "Se exagera la sumisión a la herencia o la ruptura con todo.",
          "Se evita mirar que las raíces también se podan y se cuidan."
        ]
      }
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
      ],
      reversed: {
        essence:   "La sota sigue sosteniendo la moneda, pero la mira como objeto, no como puerta. El campo detrás se quedó sin labrar.",
        reading:   "La curiosidad concreta se volvió consumo. O coleccionas cursos, libros, podcasts e ideas sin practicar ninguna, o te enredaste tanto en la teoría que perdiste el cuerpo. El aprendiz honesto pide manos sucias y errores reales, no biblioteca creciente ni resúmenes de fin de semana.",
        synthesis: "Saber sin probar no es saber: es esperar el momento que no llega.",
        prompt:    "¿Cuántas cosas que dijiste \"voy a aprender\" siguen sin un solo intento real, y qué te sostiene en la teoría?",
        manifestations: [
          "Tener una biblioteca llena de libros sobre algo que jamás practicaste un solo día",
          "Llevar dos años \"investigando\" un cambio de carrera y no haber hablado nunca con nadie del rubro",
          "Resumir el tema con autoridad delante de otros y no haber tocado la materia con las manos"
        ],
        shadows: [
          "Se bloquea el paso del estudio a la práctica.",
          "Se exagera la teoría o el coleccionismo de información.",
          "Se evita mirar que aprender también incluye exponerse a hacerlo mal."
        ]
      }
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
      ],
      reversed: {
        essence:   "El caballero sigue sobre el caballo quieto, pero ya no avanza. La moneda en su mano se enfrió y el campo no se ara solo.",
        reading:   "La constancia se volvió rutina muerta. O sostienes lo mismo durante años sin preguntarte si todavía tiene sentido, o saltaste de un \"paso firme\" a otro buscando seguridad y nunca avanzas en serio. La confiabilidad pide presencia despierta, no piloto automático ni fuga prolija.",
        synthesis: "Hacer todos los días lo mismo sin mirarlo es otra forma de no estar haciendo nada.",
        prompt:    "¿Qué rutina llevas meses sosteniendo por costumbre que ya no te conduce a ningún lado?",
        manifestations: [
          "Cumplir con tu trabajo, tu rutina o tu pareja durante años sin volver a preguntarte si todavía lo eliges",
          "Cambiar de empleo \"estable\" cada dos años buscando una seguridad que se mueve contigo",
          "Hacer las mismas tareas semana tras semana y no saber cuándo fue la última vez que decidiste hacerlas"
        ],
        shadows: [
          "Se bloquea la revisión consciente del rumbo.",
          "Se exagera la rutina sin sentido o el cambio compulsivo entre rutinas.",
          "Se evita mirar que la constancia honesta también incluye preguntar si todavía vale."
        ]
      }
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
      ],
      reversed: {
        essence:   "La reina sigue en su trono rodeada de plantas y el conejo en el pasto. Pero la mano sobre la moneda perdió calor y ella misma no comió hace días.",
        reading:   "El cuidado encarnado se volvió servicio sin pausa. O atendés la casa, los hijos, el equipo o el círculo durante años olvidándote del propio cuerpo, o te volviste tan exigente con tu auto-cuidado que se transformó en otra obligación más. La nutrición pide circulación, no martirio ni perfeccionismo.",
        synthesis: "Cuidar a todos menos al cuerpo que cuida es otra forma de no cuidar.",
        prompt:    "¿Cuándo fue la última vez que comiste sentada, dormiste sin alarma, o te dejaste atender sin sentir culpa?",
        manifestations: [
          "Cocinar para los demás cinco días seguidos y darte cuenta de que tú comiste apurada de pie",
          "Sostener a tres personas en crisis y desplomarte en cama el domingo sin que nadie pregunte",
          "Convertir el auto-cuidado en un check-list tan estricto que cuidarte se volvió tarea más"
        ],
        shadows: [
          "Se bloquea la recepción del propio cuidado.",
          "Se exagera el servicio a otros o el rigor sobre una misma.",
          "Se evita mirar que sostener a otros pide, primero, sostenerte."
        ]
      }
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
        'Sostener un proyecto que da fruto a otros, no solo a ti',
        'Compartir lo que sabes con quien recién empieza',
        'Tomar decisiones materiales con calma y visión'
      ],
      shadows: [
        'Confundir estabilidad con quietud',
        'Acumular sin compartir',
        'Volver el dominio en control rígido'
      ],
      reversed: {
        essence:   "El rey sigue en su trono entre las uvas, pero el cetro se le volvió cómodo. El castillo atrás está, pero hace tiempo nadie hace nada nuevo.",
        reading:   "La estabilidad se volvió quietud. O acumulaste recursos, prestigio o estructura y dejaste de mover nada, o sigues construyendo por costumbre sin compartir lo que ya sabes. El dominio práctico pide ser puesto al servicio: si no circula, se vuelve trono solitario.",
        synthesis: "Tener mucho y no compartir nada es otra forma de no tener.",
        prompt:    "¿Qué saber, recurso o posición tuya está sin circular hace meses, y a quién le serviría si lo compartieras?",
        manifestations: [
          "Llevar años en un cargo de autoridad y no haber formado a nadie que pueda continuarlo",
          "Acumular recursos materiales y vivir como si todavía estuvieras juntando para una emergencia que ya pasó",
          "Tener la experiencia para guiar a otros y no ofrecerla porque \"que se las arreglen como yo me las arreglé\""
        ],
        shadows: [
          "Se bloquea la circulación de lo construido.",
          "Se exagera la acumulación o el control sobre lo estable.",
          "Se evita mirar que la madurez práctica pide enseñar, no solo poseer."
        ]
      }
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
