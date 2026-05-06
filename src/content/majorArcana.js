/* =====================================================================
 * Arcanos Mayores — voz Tarot Ade
 * Reflexión, no predicción. Una posibilidad, no un dictamen.
 *
 * Schema por carta:
 *   { name, number, essence, reading, prompt,
 *     positions: { whatIs, whatCrosses, whatOpens },
 *     extension?: string  ← opcional. Capa más profunda, íntima, atmosférica.
 *                            Aparece solo si la usuaria toca "Profundizar lectura". }
 * ===================================================================*/

export const spreadPositions = {
  whatIs:      'Lo que está',
  whatCrosses: 'Lo que cruza',
  whatOpens:   'Lo que se abre'
}

export const majorArcana = [
  {
    name: 'El Loco', number: '0',
    essence: 'Movimiento sin certezas.',
    reading: 'Hay algo en ti que quiere avanzar, aunque no tenga todas las respuestas. No es imprudencia, es apertura. A veces el primer paso no busca seguridad, sino experiencia.',
    prompt: '¿Qué pasaría si confías un poco más en lo que te mueve, aunque no lo entiendas del todo?',
    extension: 'El Loco no es ingenuo, aunque a veces lo parezca. Sabe algo que el resto olvidó: que toda transformación empieza por un acto que no puede explicarse del todo. Lo que aparece como impulso suele ser, en realidad, una forma vieja de saber. Dar el paso no es perder el equilibrio; es confiar en una lógica más antigua que la del miedo. La pregunta no es si vas a caer, sino si querés seguir parada en el mismo borde.',
    positions: {
      whatIs:      'Hay una energía de inicio, búsqueda o movimiento. Algo quiere salir de lo conocido.',
      whatCrosses: 'La falta de claridad puede confundirse con libertad. Conviene mirar si estás avanzando o escapando.',
      whatOpens:   'Se abre la posibilidad de probar, explorar y permitirte comenzar sin tener todo resuelto.'
    }
  },
  {
    name: 'El Mago', number: 'I',
    essence: 'Tienes con qué empezar.',
    reading: 'Lo que necesitas no está afuera. Ya tienes herramientas, incluso si no las reconoces del todo. Esta carta no habla de perfección, habla de intención y acción consciente.',
    prompt: '¿Qué parte de ti ya sabe cómo avanzar, aunque aún no la estés usando?',
    extension: 'El Mago no fabrica nada nuevo. Reordena lo que ya estaba. Las cuatro herramientas sobre su mesa —copa, espada, oro, basto— son tu vida cotidiana mirada de cerca. Lo que parece falta a veces es solo dispersión, atención que se fue a otra parte. La magia, en esta carta, es la coherencia entre lo que pensás, decís, sentís y hacés. Cuando esos cuatro vuelven a alinearse, lo que parecía imposible empieza a moverse solo.',
    positions: {
      whatIs:      'Hay recursos disponibles, habilidades concretas y una intención que puede tomar forma.',
      whatCrosses: 'Puede haber exceso de control o una tendencia a esperar condiciones perfectas antes de actuar.',
      whatOpens:   'Se abre una etapa donde usar bien lo que ya tienes puede ser más importante que buscar algo nuevo.'
    }
  },
  {
    name: 'La Sacerdotisa', number: 'II',
    essence: 'No todo se muestra de inmediato.',
    reading: 'Hay algo que necesita silencio antes de revelarse. No es bloqueo, es proceso. Esta carta no empuja, sostiene. Invita a mirar hacia adentro antes de actuar.',
    prompt: '¿Qué estás sintiendo que aún no has querido escuchar del todo?',
    extension: 'Hay un saber que no necesita ser nombrado para existir. La Sacerdotisa custodia ese umbral. Si te alcanza, probablemente ya percibís algo que todavía no podés articular. Esta carta no pide explicaciones, pide presencia. A veces la respuesta no llega como pensamiento sino como sensación corporal, sueño, demora. Lo que se sostiene en silencio puede madurar más que lo que se obliga a hablar antes de tiempo.',
    positions: {
      whatIs:      'Hay información sutil, intuición o una verdad que todavía no aparece de forma directa.',
      whatCrosses: 'El silencio puede volverse confusión si se usa para evitar una decisión necesaria.',
      whatOpens:   'Se abre una escucha más profunda, menos reactiva y más conectada con lo que ya sabes internamente.'
    }
  },
  {
    name: 'La Emperatriz', number: 'III',
    essence: 'Creación, nutrición, abundancia.',
    reading: 'Esta carta habla de fertilidad en todos los sentidos. Es el momento de cultivar ideas, proyectos o vínculos. Confía en tu capacidad de crear y de sostener lo que haces crecer.',
    prompt: '¿Qué puedes cultivar hoy que te acerque a tu abundancia?',
    extension: 'Hay algo en La Emperatriz que no se enseña, se reconoce. Una manera de estar con lo que crece sin medirlo, sin apurarlo. La fertilidad de la que habla esta carta no siempre es visible: a veces es la pausa que un proyecto necesita para tomar forma, o el silencio que un vínculo pide para volverse hondo. Si esta carta aparece, quizás no haga falta hacer más; tal vez baste con sostener lo que ya está naciendo.',
    positions: {
      whatIs:      'Hay una energía fértil, creativa y de expansión.',
      whatCrosses: 'Puede haber sobreprotección, comodidad excesiva o dificultad para poner límites.',
      whatOpens:   'Se abre una etapa de creación más amable, donde cuidar el proceso importa tanto como el resultado.'
    }
  },
  {
    name: 'El Emperador', number: 'IV',
    essence: 'Dar forma también es cuidar.',
    reading: 'Aquí aparece la estructura: límites, orden, decisión. No como rigidez vacía, sino como sostén. A veces avanzar requiere dejar claro qué se permite y qué ya no.',
    prompt: '¿Dónde necesitas poner un límite para recuperar dirección?',
    extension: 'El Emperador no es el poder que se impone, es el que sostiene. La estructura, en esta carta, no es jaula sino columna. Hay momentos donde lo más amoroso es decir basta, no más, hasta acá. Poner un límite no cierra al otro: te abre a ti. La firmeza de esta carta no excluye la ternura; la hace posible.',
    positions: {
      whatIs:      'Hay necesidad de orden, límites y una estructura que sostenga mejor lo que estás viviendo.',
      whatCrosses: 'La rigidez puede estar cerrando posibilidades o convirtiendo el control en defensa.',
      whatOpens:   'Se abre la posibilidad de construir una base más firme sin perder sensibilidad.'
    }
  },
  {
    name: 'El Hierofante', number: 'V',
    essence: 'Hay saberes que se reciben y otros que se cuestionan.',
    reading: 'Esta carta habla de aprendizaje, guía y tradición. Puede invitarte a revisar qué normas te sostienen y cuáles solo estás repitiendo por costumbre.',
    prompt: '¿Qué enseñanza estás lista para honrar, y cuál necesitas mirar de nuevo?',
    extension: 'Toda tradición empezó como un descubrimiento privado de alguien. El Hierofante recuerda eso. Las normas que recibimos no son cárceles ni verdades intocables: son herramientas que alguien usó antes para nombrar algo difícil. Tomar lo que sirve, soltar lo que ya no resuena, no es traición. Es aprender. La pregunta no es a qué obedecer sino qué saber pedir prestado un rato más.',
    positions: {
      whatIs:      'Hay una estructura de aprendizaje, guía o norma influyendo en la situación actual.',
      whatCrosses: 'Puede haber obediencia automática, miedo a salir del molde o dependencia de una validación externa.',
      whatOpens:   'Se abre la posibilidad de aprender sin perder criterio propio.'
    }
  },
  {
    name: 'Los Enamorados', number: 'VI',
    essence: 'Elegir también revela quién eres.',
    reading: 'Esta carta no habla solo de amor. Habla de vínculo, deseo y decisión. Puede sugerir un cruce donde no basta con agradar: hay que escuchar qué parte de ti quiere actuar con verdad.',
    prompt: '¿Qué elección se vuelve más clara cuando dejas de intentar quedar bien?',
    extension: 'Los Enamorados no hablan solo de quién amás. Hablan de qué versión tuya elige. Cada vínculo importante es, en el fondo, una declaración silenciosa: \'esto es lo que valoro, esto es lo que estoy dispuesta a sostener\'. Cuando esta carta aparece, conviene mirar la elección sin disfraces. Lo que decidís decir sí o no aquí, te define más de lo que parece.',
    positions: {
      whatIs:      'Hay una elección importante atravesada por deseo, vínculo o necesidad de coherencia.',
      whatCrosses: 'Puede haber confusión entre elegir desde la verdad o elegir para no incomodar.',
      whatOpens:   'Se abre la posibilidad de decidir con más honestidad afectiva.'
    }
  },
  {
    name: 'El Carro', number: 'VII',
    essence: 'Avanzar requiere dirección.',
    reading: 'Hay movimiento, pero también tensión. Esta carta aparece cuando distintas fuerzas tiran en sentidos opuestos y aun así necesitas conducir. No se trata de controlar todo, sino de no soltar el eje.',
    prompt: '¿Qué necesitas ordenar dentro de ti para avanzar sin dispersarte?',
    extension: 'El Carro no avanza porque las dos esfinges estén de acuerdo. Avanza porque el conductor las sostiene a las dos. La fuerza de esta carta no es eliminar la tensión, es habitarla con foco. Hay días donde una parte tuya quiere quedarse y otra quiere irse, y ambas tienen razón. La cuestión no es cuál gana sino qué dirección elegís darle al desacuerdo.',
    positions: {
      whatIs:      'Hay impulso, movimiento y necesidad de tomar el control de una dirección.',
      whatCrosses: 'Puede haber prisa, exceso de control o avance sin integración interna.',
      whatOpens:   'Se abre una etapa de conducción más consciente, con foco y voluntad.'
    }
  },
  {
    name: 'La Fuerza', number: 'VIII',
    essence: 'La suavidad también puede dominar.',
    reading: 'Esta carta habla de una potencia que no necesita imponerse. Invita a mirar el impulso, la rabia o el deseo sin negarlos, pero tampoco dejar que conduzcan por ti.',
    prompt: '¿Qué emoción necesita ser sostenida con firmeza, no reprimida?',
    extension: 'La Fuerza no doma al león; lo escucha. Si esta carta aparece, probablemente haya algo en vos que está rugiendo —rabia, deseo, agotamiento— y que pide ser reconocido antes que reprimido. La verdadera potencia es la capacidad de no tener miedo de lo que sentís, sin dejar que conduzca por vos. Suavidad no es debilidad: es el nivel más alto de fuerza posible.',
    positions: {
      whatIs:      'Hay una energía intensa que necesita ser reconocida y contenida con delicadeza.',
      whatCrosses: 'Puede haber lucha interna, represión o intento de controlar desde la dureza.',
      whatOpens:   'Se abre la posibilidad de transformar impulso en presencia.'
    }
  },
  {
    name: 'El Ermitaño', number: 'IX',
    essence: 'Detenerse también es avanzar.',
    reading: 'Hay momentos en que alejarse no es huir, sino escuchar con más claridad. Esta carta sugiere retiro consciente: menos ruido afuera para entender mejor lo que pasa dentro.',
    prompt: '¿Qué podrías ver si bajas el ritmo y te das un espacio real de silencio?',
    extension: 'El Ermitaño no se aleja para evitar el mundo. Se aleja para volver a oírse. La luz que lleva en la lámpara es pequeña: alcanza para iluminar el próximo paso, no todo el camino. Esta carta enseña que la claridad no se busca acumulando información, se gana quitando ruido. Si aparece, quizás haga falta apagar algo —una conversación, una pantalla, una urgencia— para escuchar lo que ya estaba diciéndose.',
    positions: {
      whatIs:      'Hay una necesidad de pausa, introspección o distancia para comprender mejor.',
      whatCrosses: 'El retiro puede volverse aislamiento si deja de abrir claridad y empieza a cerrar contacto.',
      whatOpens:   'Se abre una comprensión más serena, nacida del silencio y no de la urgencia.'
    }
  },
  {
    name: 'La Rueda de la Fortuna', number: 'X',
    essence: 'El cambio ya está en marcha.',
    reading: 'Hay movimientos que no dependen de ti, pero sí cómo te posicionas frente a ellos. Esta carta habla de ciclos que giran y de la necesidad de adaptarse sin perder el eje.',
    prompt: '¿Qué estás intentando controlar que en realidad te pide acompañar?',
    extension: 'La Rueda no premia ni castiga. Solo gira. Lo que estaba arriba baja, lo que estaba abajo sube, y eso no significa nada salvo que el tiempo sigue pasando. Esta carta libera de la ilusión de control absoluto: no podés evitar el ciclo, pero podés elegir cómo lo habitás. La sabiduría no es predecir el giro, es ablandarte mientras gira.',
    positions: {
      whatIs:      'Hay un cambio en curso, un giro que modifica el escenario actual.',
      whatCrosses: 'Resistir el movimiento puede generar más tensión que el cambio mismo.',
      whatOpens:   'Se abre la posibilidad de fluir con el ciclo y aprovechar el nuevo momento.'
    }
  },
  {
    name: 'La Justicia', number: 'XI',
    essence: 'Ver claro antes de decidir.',
    reading: 'Esta carta invita a ordenar, a observar sin distorsión. No desde el castigo, sino desde la coherencia. Lo que elijas ahora tiene peso porque nace de mayor conciencia.',
    prompt: '¿Qué decisión sería más honesta si dejas de evitar lo evidente?',
    extension: 'La Justicia no es la balanza del castigo, es la balanza de la coherencia interna. Esta carta aparece cuando algo en tu vida pide ser nombrado con honestidad —incluso si es incómodo, incluso si te implica. La verdad de la que habla no es absoluta ni externa: es la coherencia entre lo que sabés y lo que hacés. Cuando se rompe ese eje, todo lo demás se desordena, aunque no se note al principio.',
    positions: {
      whatIs:      'Hay una necesidad de claridad, equilibrio y toma de decisiones conscientes.',
      whatCrosses: 'Puede haber rigidez, juicio excesivo o dificultad para ver todos los matices.',
      whatOpens:   'Se abre una decisión más alineada con tu verdad y responsabilidad.'
    }
  },
  {
    name: 'El Colgado', number: 'XII',
    essence: 'Cambiar la mirada transforma.',
    reading: 'Forzar no ayuda ahora. Esta carta propone pausa consciente: mirar desde otro ángulo, soltar la urgencia y permitir que algo se reordene.',
    prompt: '¿Qué cambiaría si dejas de insistir y observas desde otro lugar?',
    extension: 'El Colgado no está atrapado: eligió quedarse así. Su quietud no es derrota, es renuncia activa. Esta carta llega cuando empujar deja de servir, cuando la solución más sabia es dejar de buscar solución. Mirar el mismo problema cabeza abajo a veces lo cambia todo. Lo que parecía obstáculo era solo el ángulo desde donde mirabas.',
    positions: {
      whatIs:      'Hay un momento de suspensión, pausa o cambio de perspectiva.',
      whatCrosses: 'La pausa puede sentirse estancamiento si no se comprende su sentido.',
      whatOpens:   'Se abre una comprensión distinta que solo aparece cuando sueltas el control.'
    }
  },
  {
    name: 'La Muerte', number: 'XIII',
    essence: 'Cerrar también es avanzar.',
    reading: 'Algo ya cumplió su ciclo. Esta carta no habla de pérdida, sino de transformación profunda. Soltar abre espacio a lo nuevo.',
    prompt: '¿Qué estás lista para dejar atrás, aunque aún te cueste?',
    extension: 'La Muerte rara vez es la que se teme. Casi nunca habla de un final externo; habla de un cierre interno. Algo en vos —una identidad, una expectativa, una manera de funcionar— ya cumplió. Quedarte ahí más tiempo no la mantiene viva, solo prolonga la despedida. Esta carta no pide valentía, pide honestidad para reconocer lo que ya pasó.',
    positions: {
      whatIs:      'Hay un cierre importante o transformación en curso.',
      whatCrosses: 'Algo se está transformando profundamente.',
      whatOpens:   'Se abre una renovación real, aunque implique atravesar un final.'
    }
  },
  {
    name: 'La Templanza', number: 'XIV',
    essence: 'El equilibrio se construye.',
    reading: 'No es perfección, es ajuste constante. Esta carta habla de integrar, de encontrar un ritmo propio entre lo que cambia.',
    prompt: '¿Qué parte de tu vida necesita más suavidad para ordenarse?',
    extension: 'La Templanza no es el equilibrio quieto, es el equilibrio en movimiento. Como un ángel que vierte agua entre dos copas sin derramar, esta carta enseña que la armonía es algo que se sostiene, no algo que se alcanza. La pregunta no es cuándo vas a llegar al equilibrio, es cómo lo vas a practicar hoy. Lo que se ajusta cada día rara vez se rompe.',
    positions: {
      whatIs:      'Hay una búsqueda de equilibrio, integración o sanación en proceso.',
      whatCrosses: 'La impaciencia o los extremos pueden dificultar el ajuste natural.',
      whatOpens:   'Se abre una armonía más estable, construida desde la práctica y la calma.'
    }
  },
  {
    name: 'El Diablo', number: 'XV',
    essence: 'Lo que te ata puede soltarse.',
    reading: 'Hay vínculos, hábitos o deseos que parecen inevitables, pero muchas veces se sostienen por costumbre o miedo. Esta carta no acusa: muestra. Y al mostrar, abre la posibilidad de elegir distinto.',
    prompt: '¿Qué estás sosteniendo que, en el fondo, sabes que podrías soltar?',
    extension: 'El Diablo de Rider-Waite tiene una particularidad: las cadenas que sostienen a las dos figuras al pie de su trono están sueltas. Podrían soltarse si quisieran. Esta carta no acusa de nada; muestra. Lo que parece atadura inevitable suele ser, en el fondo, algo elegido por costumbre. Lo difícil no es soltar; es darse cuenta de que se podía soltar.',
    positions: {
      whatIs:      'Hay una dinámica de apego, hábito o dependencia presente.',
      whatCrosses: 'La negación o la comodidad pueden estar manteniendo lo que ya incomoda.',
      whatOpens:   'Se abre la posibilidad de ver con claridad y empezar a soltar.'
    }
  },
  {
    name: 'La Torre', number: 'XVI',
    essence: 'Lo que cae, libera.',
    reading: 'Un quiebre puede sentirse abrupto, pero también es claridad en acción. Esta carta habla de estructuras que ya no se sostienen. Lo incómodo abre un espacio más honesto.',
    prompt: '¿Qué se está desarmando que, en el fondo, ya no tenía base?',
    extension: 'La Torre no destruye lo verdadero, destruye lo construido sobre falsedad. Si lo que cae es real, no se cae. Esta carta puede ser brutal en el momento, pero rara vez es injusta: lo que viene abajo había perdido su base mucho antes. Lo doloroso no es la caída en sí; es darse cuenta de cuánto tiempo se sostuvo algo que ya no era.',
    positions: {
      whatIs:      'Hay un cambio brusco o una ruptura que redefine la situación.',
      whatCrosses: 'El apego a lo anterior puede intensificar el impacto del cambio.',
      whatOpens:   'Se abre un terreno nuevo, más auténtico aunque aún inestable.'
    }
  },
  {
    name: 'La Estrella', number: 'XVII',
    essence: 'La calma vuelve de a poco.',
    reading: 'Después del quiebre aparece una sensación de alivio. No es euforia, es confianza suave. Algo empieza a ordenarse sin forzarlo.',
    prompt: '¿Dónde estás empezando a sentir alivio, aunque sea sutil?',
    extension: 'La Estrella aparece después del temblor, cuando ya pasó lo peor. Su agua se derrama generosa: una jarra a la tierra, otra al río. La esperanza de la que habla no es ingenua. Es la confianza que se gana después de haber visto caer la torre y seguir respirando. Lo que esta carta promete no es que todo salga bien; promete que vas a poder con lo que venga.',
    positions: {
      whatIs:      'Hay un proceso de sanación, calma o reconexión en curso.',
      whatCrosses: 'La duda puede impedir reconocer lo que ya está mejorando.',
      whatOpens:   'Se abre una etapa de mayor confianza y ligereza emocional.'
    }
  },
  {
    name: 'La Luna', number: 'XVIII',
    essence: 'No todo es claro, y está bien.',
    reading: 'Hay momentos en que la claridad no llega de inmediato. Esta carta habla de intuición, de atravesar lo incierto sin forzar respuestas.',
    prompt: '¿Qué estás sintiendo que aún no puedes explicar, pero sabes que es importante?',
    extension: 'La Luna no engaña, deforma. Lo que ves bajo su luz tiene contornos imprecisos, pero no por eso es falso. Esta carta enseña que la intuición y el miedo a veces hablan el mismo idioma, y diferenciarlos pide tiempo. No todo lo que sentís en la noche es verdad, pero tampoco es ruido. Caminar despacio en la niebla es más sabio que correr para salir de ella.',
    positions: {
      whatIs:      'Hay confusión, sensibilidad o información no visible del todo.',
      whatCrosses: 'El miedo o la inseguridad pueden distorsionar la percepción.',
      whatOpens:   'Se abre una comprensión más intuitiva si no apuras las respuestas.'
    }
  },
  {
    name: 'El Sol', number: 'XIX',
    essence: 'La claridad simplifica.',
    reading: 'Después de la confusión, aparece una certeza tranquila. Esta carta trae presencia, alivio y una sensación de verdad simple.',
    prompt: '¿Qué se vuelve evidente cuando dejas de complicarlo?',
    extension: 'El Sol no esconde nada porque no necesita esconder nada. Esta carta llega cuando algo en vos se simplifica, cuando dejás de complicar lo que era claro desde el principio. La alegría de la que habla no es euforia: es el alivio de no tener que actuar. La verdad simple, dicha sin adornos, es lo que esta carta celebra.',
    positions: {
      whatIs:      'Hay claridad, energía vital o comprensión directa.',
      whatCrosses: 'El exceso de confianza o exposición puede desbalancear.',
      whatOpens:   'Se acerca una etapa de claridad, alegría y vitalidad.'
    }
  },
  {
    name: 'El Juicio', number: 'XX',
    essence: 'Mirar con conciencia transforma.',
    reading: 'Algo en tu historia pide ser visto de otra manera. Esta carta no juzga: invita a comprender y resignificar.',
    prompt: '¿Qué parte de tu historia necesita ser revisada con más honestidad?',
    extension: 'El Juicio no es un tribunal externo, es una llamada interna. La trompeta del ángel suena hacia adentro: te invita a revisar tu propia historia con menos juicio y más comprensión. Esta carta aparece cuando llegó el momento de dejar de cargar lo que ya entendiste. No se trata de absolverte; se trata de seguir.',
    positions: {
      whatIs:      'Hay un momento de revisión, toma de conciencia o cierre de ciclo.',
      whatCrosses: 'La culpa o el autojuicio pueden bloquear la comprensión.',
      whatOpens:   'Se abre una nueva forma de entender tu proceso y seguir desde ahí.'
    }
  },
  {
    name: 'El Mundo', number: 'XXI',
    essence: 'Todo se integra.',
    reading: 'Hay una sensación de cierre y expansión al mismo tiempo. Esta carta habla de haber recorrido un proceso y poder habitarlo con mayor totalidad.',
    prompt: '¿Qué reconoces hoy en ti que antes no podías ver?',
    extension: 'El Mundo no es la meta, es el reconocimiento de que ya recorriste algo importante. La figura central baila adentro de una corona de laurel: no afuera, no por encima, dentro. Lo que esta carta señala no es un final, es una integración. Algo en vos cabe ahora donde antes no cabía. Y desde ahí, nuevamente, empieza algo.',
    positions: {
      whatIs:      'Hay integración, cierre de etapa o logro significativo.',
      whatCrosses: 'La dificultad puede estar en reconocer lo alcanzado.',
      whatOpens:   'Se abre una nueva etapa desde un lugar más completo.'
    }
  }
]

export function findArcanaContent(name) {
  return majorArcana.find(c => c.name === name) || null
}

export function findPositionReading(name, positionKey) {
  const c = findArcanaContent(name)
  return c?.positions?.[positionKey] ?? null
}
