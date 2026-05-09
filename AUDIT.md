# Auditoría crítica de ADE — mayo 2026

Auditoría editorial-técnica del estado actual de Tarot Ade (https://tarot-zeta-eosin.vercel.app/), revisada contra el código de la rama `main` al commit `21f9d9f`.

Sin pitch. Sin suavizar. El proyecto ya está en refinamiento serio y el riesgo más grande no es construir poco — es construir más sobre fundamentos que conviene revisar antes.

---

## Resumen ejecutivo — los cinco hallazgos que importan

1. **El motor relacional emergente que acabamos de construir todavía no está cableado a la UI.** `ComposedReading` (App.jsx:2101) consume `relational.atmosphere`, `relational.movement` y `relational.suitVoice`, pero ignora los nuevos campos `crossing` y `detector`. La frase "Hay una desconfianza que cuesta nombrar" para Luna + 7 de Espadas existe en el motor y no llega a la pantalla. El primer trabajo de la próxima iteración no es escribir más cruces — es **verlos en producción**.
2. **Tres motores narrativos en paralelo, con detectores duplicados.** `relationalEngine.js`, `composeReading.js` y `celticReading.js` tienen sus propias implementaciones de "detectar dominancia de palo", "presencia de Mayores" y "temperatura". `celticReading.js` ni siquiera importa `iconicCrossings.js`. Cualquier mejora del motor hay que aplicarla en tres lugares o se desincroniza.
3. **Sobrecontenido por carta. Subuso en la UI.** Cada Mayor tiene 8 campos de texto (essence, traditionalMeanings, archetypes, emotionalThemes, manifestations, shadows, visualSymbols, reading, synthesis, extension, prompt, positions, reversed). El Detalle muestra 4. Es inventario textual sin curaduría editorial: el peso lo paga la mantenibilidad y la ambigüedad sobre qué contenido es canónico.
4. **Las cartas invertidas modifican el contenido pero no los atributos.** Cuando una carta cae invertida, `findContentByCard(card, true)` reemplaza `essence/reading/synthesis/...` pero no toca `attrs.shadowMode`, `attrs.relationalTags` ni `attrs.movementType`. Eso significa que el motor relacional sigue tratando a la Luna invertida como Luna derecha en cruces y detectores. La invertida no cambia la tensión narrativa relacional — solo la del texto plano.
5. **Hay una identidad clara pero todavía hay 30 % de prosa que sigue sonando a Instagram tarot-poético.** Frases como "el aire es tibio", "la cadencia es de invierno", "todo respira en un mismo tiempo" son atmósfera ornamental sin gesto humano. Conviven con líneas reales y específicas ("estás eligiendo, una y otra vez, una versión que ya sabes cómo termina"). Hay que decidir si Ade va a ser un sistema poético atmosférico o un sistema que confronta — hoy intenta ser ambos a la vez y eso es lo que produce la sensación GPT.

---

## 1. Arquitectura general del sistema

**Stack.** React 18 + Vite 5 + Tailwind 3 + Framer Motion. Sin backend, sin LLM en runtime, todo determinístico. Datos en JS estáticos importados al bundle.

**Componentes principales (App.jsx, 2.729 líneas).**
- Vista mazo / Tirada de tres / Cruz Celta / Detalle / ShareModal son funciones top-level dentro del mismo `App.jsx`. No hay router formal.
- `ComposedReading` y `CelticRevealStage` son las dos formas de lectura. La primera consume `relationalEngine`; la segunda, `celticReading.js`.
- `Detalle` es la vista profunda de una carta. Lee de `contentBridge.findContentByCard(card, reversed)`.

**Capas de contenido.**
1. `majorArcanaSymbolic.js` — 22 Mayores, ~50 líneas de texto cada una. Schema de 13 campos por carta.
2. `minorArcanaCards.js` — 56 Menores, ~30 líneas cada una. Schema de 8 campos.
3. `majorArcana.js` (legacy) — un dataset paralelo, parcial, que `App.jsx` ya no usa pero sigue commiteado (292 líneas muertas).
4. `contentBridge.js` — adapta el formato del deck (`{nombre, paloKey, romano, ...}`) al schema interno (`{name, suit, number, ...}`). Es el único punto donde se aplica `applyReversed()` para invertidas.

**Capas de motor (src/engine/).**
1. `cardEnergetics.js` — 4 atributos por carta (energyType, temperature, direction, rhythm).
2. `cardAttributes.js` — 7 atributos relacionales adicionales (emotionalAxis, tensionType, movementType, rhythm, visibility, shadowMode, relationalTags). Construido encima de cardEnergetics.
3. `iconicCrossings.js` — tabla de 40 pares de cartas con frase específica.
4. `relationalDetectors.js` — los 10 detectores.
5. `relationalEngine.js` — orquestador para tirada de 3.
6. `composeReading.js` — wrapper para tirada de 3 que la UI consume directamente.
7. `celticReading.js` — wrapper independiente para Cruz Celta.
8. `emotionalMemory.js` — persistencia local de la atmósfera de tiradas anteriores para detectar ecos.

**Cómo se genera una lectura.**

Tirada de 3: el usuario elige 3 cartas, cada una puede caer invertida. La UI llama a `composeReading(cards)` (composeReading.js) → adentro normaliza y delega en `composeRelationalReading(engineCards)` (relationalEngine.js) → este enriquece con `withAttrs` y corre `findCrossings` + `runAllDetectors`. Devuelve `{atmosphere, movement, suitVoice, crossing, detector, synthesis, ...}`.

Cruz Celta: el usuario revela 10 cartas en secuencia. La UI llama a `composeCelticReading(slots)` (celticReading.js) que tiene su propia lógica de detectores y bloques. **No usa** `iconicCrossings`, **no usa** `cardAttributes`, **no usa** `relationalDetectors`.

**Diagnóstico de arquitectura.** Hay un patrón de duplicación en los motores que está empezando a cobrar costo. `composeReading.js` ya es delgado (140 líneas) porque delega en `relationalEngine.js`. `celticReading.js` (567 líneas) sigue siendo monolítico y no comparte la nueva lógica relacional. Mantener las dos en paralelo va a multiplicar el esfuerzo de cada cambio futuro.

---

## 2. Motor narrativo

**Cómo se construyen las interpretaciones hoy.**

Para tirada de 3 (composición vía `composeRelationalReading`):
- **atmósfera**: `composeAtmosphere` arma una línea con `MAJOR_PRESENCE_VARIANTS[count]` + "Atmósfera: " + `TEMP_VARIANTS[temp]` + " y " + `RHYTHM_VARIANTS[rhythm]` + ".".
- **movimiento**: `composeMovementEnriched` elige entre detectores (suspended, mentalOverload, movementVsStillness) o cae a `composeMovement` legacy con `MOVEMENT_VARIANTS[narrativeMovement]` + contradicción.
- **suitVoice**: si hay 2-3 cartas del mismo palo, `SUIT_VOICE[suit][count]`.
- **synthesis**: concatenación cruda de los anteriores con `' '`.
- **crossing**: si hay un par en `iconicCrossings`, su frase con peso ≥ 0.85.
- **detector**: el detector más fuerte que no se haya usado en movimiento (bloques > amplificaciones > clarityVsFog > contradicciones).

Para Cruz Celta (composición vía `composeCelticReading`):
- **opening**: `CLIMATE_LINES[majorWeight]` + `TEMP_LINES[tempBalance]` + `DIRECTION_LINES[directionPull]`.
- **block1/2/3**: lógica tipo if/else con 4-6 ramas por bloque, basadas en temperatura/dirección de cartas en posiciones específicas. Inserta esencia con minúscula inicial vía `lowerFirst`.
- **closing**: `e10` + tensiones simbólicas + prompt de la carta 10.

**Estructura narrativa dominante.**

Las dos lecturas siguen el mismo patrón: una apertura atmosférica de 1-2 frases, un cuerpo que describe las posiciones, y un cierre con pregunta. Es competente pero altamente uniforme. El tono dominante es **declarativo-contemplativo**: "hay X, y Y, y eso pide Z". No hay variación de registro: ninguna lectura es seca, ninguna es directa, ninguna interrumpe.

**Qué tan relacional es realmente.**

Honestamente: la tirada de 3 sí lo es desde commit `21f9d9f` — los cruces icónicos son el único motor relacional verdadero del sistema, porque levantan una frase específica para un par específico. Los detectores son agregadores ("dos cartas comparten X") y leen el conjunto, no la relación entre dos cartas.

La Cruz Celta sigue siendo posicional, no relacional. Detecta cosas como "el palo del pasado vuelve en el horizonte" o "self vs environment difieren en dirección", pero no levanta la frase de Luna+7E porque no consulta la tabla.

**Variabilidad real.**

- Cada detector tiene 3-5 variantes elegidas con `seed % arr.length`. Para 3 cartas hay efectivamente ~470.000 combinaciones de cartas posibles, pero solo unas decenas de patrones agregados de detectores. El usuario que pruebe 5 tiradas seguidas con cartas distintas va a encontrar que la atmósfera repite frases.
- `MAJOR_PRESENCE_VARIANTS[1]` solo tiene 3 variantes. Si una de cada dos lecturas tiene 1 Mayor, en 6 tiradas el usuario ya leyó las tres.
- `TEMP_VARIANTS['mixed']` tiene 4 variantes. Un usuario que tire 10 veces y caiga 5 veces en mixed va a reconocer la repetición.

Este es un problema real de *cobertura de variantes*: el seed determinístico es bueno (mismas cartas → misma frase), pero la cantidad de variantes por bucket es chica para un usuario activo.

**Patrones repetitivos a vigilar.**

- "Hay X. Y." aparece como inicio en al menos 8 frases de detectores y 4 de iconicCrossings.
- "Lo que pide la situación / la lectura / la escena" aparece en 14 lugares distintos contando los reversed.
- "No es X — es Y" como construcción retórica aparece en 23 frases. Es una marca de Ade pero está sobreusada.

**Frases que siguen sonando a GPT.**

- "el aire es tibio", "la cadencia es de invierno" — atmósfera sin cuerpo. (`relationalEngine.js`, TEMP_VARIANTS).
- "todo respira en un mismo tiempo" — sintáctica genérica. (RHYTHM_VARIANTS.stable).
- "es de esos momentos donde lo que pasa ahora se nombra después como un antes y un después" — autocelebratoria, sin imagen anclada. (CLIMATE_LINES.overwhelming en celticReading).
- "esto sugiere — no determina" — disclaimer poético que el usuario ya leyó tres veces (aparece como pie en Detalle y en otros lugares).

**Diagnóstico narrativo.** Hay dos voces conviviendo: la voz **anclada** (cruces icónicos, manifestations de cartas, prompts puntuales) y la voz **atmosférica** (TEMP_VARIANTS, RHYTHM_VARIANTS, opening de Cruz Celta). La primera tiene gesto humano. La segunda es decorado. El motor priorizar la primera cuando puede, pero la segunda sigue rellenando el hueco cuando no hay cruce icónico — y ahí es donde reaparece el sabor GPT.

---

## 3. Sistema simbólico

**Cómo están representadas las cartas.**

Mayores (22) — schema en `majorArcanaSymbolic.js`:
```
{ name, number, essence, traditionalMeanings[], archetypes[],
  emotionalThemes[], manifestations[3-4], shadows[3], visualSymbols[5],
  reading, synthesis, extension, prompt, positions{whatIs, whatCrosses, whatOpens},
  reversed: { essence, reading, synthesis, prompt, manifestations[3], shadows[3] } }
```

Menores (56) — schema en `minorArcanaCards.js`:
```
{ suit, number, essence, reading, synthesis, prompt, themes[],
  manifestations[3-4], shadows[3],
  reversed: { essence, reading, synthesis, prompt, manifestations[3], shadows[3] } }
```

Atributos relacionales (`cardAttributes.js`): 7 campos derivados por palo+número (Menores) o tabla (Mayores). Energía de `cardEnergetics.js`: 4 campos (energyType, temperature, direction, rhythm).

**Profundidad simbólica.**

Cinco Mayores tienen el trabajo serio: El Loco, La Sacerdotisa, La Muerte, La Torre, La Luna. Las extensions son largas pero anclan iconografía Rider-Waite a escenas humanas concretas. Ejemplo, La Torre: "ese impacto del suelo cuando te caes hacia atrás de una silla y te falta un instante para procesar qué acaba de pasar. Una conversación que no tendrías que haber tenido. Un mail que no tendrías que haber leído". Eso funciona.

Las otras 17 Mayores tienen el contenido completo, pero la mayoría son refinements menos cuidadosos. El Mago, La Emperatriz, El Hierofante, La Justicia, La Templanza, El Sol — sus extensions son competentes pero más planas. El Hierofante por ejemplo se queda en abstracciones sobre "tradición y mandato" sin la microescena que tiene La Torre.

**Cartas que funcionan mejor.**
- Las 5 manifesto (Loco, Sacerdotisa, Muerte, Torre, Luna).
- El Diablo (gracias al detalle de "las cadenas están sueltas").
- 5 de Copas, 8 de Copas, 3 de Espadas, 9 de Espadas, 10 de Espadas — Menores con escenas humanas reconocibles.

**Cartas que se sienten más débiles.**
- El Mago, El Carro, La Templanza, La Estrella, El Sol, El Mundo — sus extensions giran sobre conceptos abstractos sin aterrizar.
- El 6 de Copas, 9 de Oros, Caballero de Oros — generic pero correctos.
- Toda la corte de Bastos (Sota/Caballero/Reina/Rey) — los 4 suenan parecidos entre sí: "fuego, presencia, sostener, dirigir".

**Fricción de schema.**

Hay redundancia entre `traditionalMeanings`, `archetypes` y `emotionalThemes` en Mayores. Son tres listas que dicen casi lo mismo con tres voces distintas. Probablemente una sola lista (o ninguna, dejar que el contenido salga del reading) sería más limpio.

`visualSymbols` (5 elementos por Mayor) es buen contenido pero la UI no lo muestra. 110 entradas escritas que no se renderizan.

`positions.{whatIs,whatCrosses,whatOpens}` tiene 3 frases por Mayor, lo que da 66 entradas. La UI las usa, pero suenan parecidas entre sí porque el formato es siempre "Hay X que Y" → "El Z puede A" → "Se abre B".

---

## 4. Contradicciones humanas

**Qué tan bien están integradas.**

La idea editorial central de Ade es que cada carta sostiene una contradicción humana real, no un "significado" abstracto. Eso se cumple parcialmente:

- En las 5 Mayores manifesto: muy bien. La Sacerdotisa: "hay silencios que protegen y hay silencios que castigan. Solo tú sabes cuál" — esa es contradicción genuina.
- En El Diablo: bien. "qué obtienes cada vez que lo eliges" abandona el tono moralista.
- En 9 de Copas: el reversed funciona — "tienes lo que pediste y, en privado, no te basta — y eso te avergüenza, así que sigues sosteniendo la sonrisa".
- En 5 de Pentáculos: "hay una luz cerca y la cabeza está mirando para otro lado" mantiene la contradicción.

**Qué cartas siguen demasiado genéricas.**

- El Carro: "no siempre falta fuerza. A veces falta dirección" es un aforismo, no una contradicción humana específica.
- La Estrella: "Reparar no es volver a ser igual. Es volver a confiar" suena a quote de feed.
- El Mago: "el poder no es tener: es elegir cómo se usa lo que ya tienes" — es coaching, no contradicción.
- La Templanza, El Sol, El Mundo — los tres tienen lecturas que podrían funcionar para mil situaciones. Eso no es bueno.

**Diagnóstico.** Las cartas que tienen contradicción real son las que tienen una microescena anclada en el extension o reading. Las que se quedan en el aforismo son las que se sienten genéricas. La diferencia está en si el texto pone al lector frente a un comportamiento reconocible. "Estás cocinando para todos y nadie te pregunta cómo estás" es contradicción humana. "El cuidado bien dado también pide recibir" no.

Recomendación editorial: hacer un pase por las 17 Mayores no-piloto y forzar al menos una microescena por reading.

---

## 5. Sistema relacional

**Lo nuevo: cruces icónicos + 10 detectores + atributos relacionales.** Construido en este sprint (commit `21f9d9f`). La idea está bien: emergencia desde reglas simples + tabla de pares fuertes escritos a mano para los casos donde la composición algorítmica falla.

**Combinaciones fuertes existentes (40 pares en `iconicCrossings.js`).**

- Luna + 7E, 9E, Diablo, Sol, 7C — buenos.
- Torre + 10E, 4Oros, Diablo, Estrella, 3E — buenos.
- Diablo + 7C, 8E, Enamorados, Templanza — buenos.
- Muerte + 6C, 8C, Mundo, 10B — buenos.

**Qué falta.**

1. **Cobertura.** 40 pares cubren ~5 % de los pares con peso simbólico relevante. Faltan: La Sacerdotisa con la mayoría de Espadas (silencio + mente), El Hierofante con cualquier Mayor (mandato + carta personal), El Ermitaño + Copas (aislamiento + afecto), Templanza con Bastos (regulación de fuego), Justicia con Oros (orden + materia). Hay al menos 80 pares más que merecen estar.
2. **Triángulos.** No hay detección de combinaciones de 3 cartas. Luna + 7E + Diablo es semánticamente más cargado que la suma de los dos pares. La arquitectura actual no lo contempla.
3. **Posicional.** En Cruz Celta, una carta en posición "lo que cruza" pesa distinto que la misma carta en "esperanzas/miedos". El motor actual ignora la posición al evaluar cruces.
4. **Cruces de invertidas.** `iconicCrossings` no diferencia derecho de invertido. Luna invertida + 7E invertido dispara la misma frase que las dos derechas, lo cual es semánticamente erróneo: Luna invertida es niebla negada, 7E invertido es reconocimiento de la jugada propia. La frase actual ("hay desconfianza que cuesta nombrar") es para las dos derechas.

**Comportamiento emergente vs ensamblado.**

El sistema **es híbrido**, no completamente emergente. La parte emergente:
- Atributos derivados por palo + número, no a mano.
- Detectores que aplican reglas simples al conjunto.

La parte ensamblada:
- Cruces icónicos: 40 frases escritas a mano.
- CONTRADICTION_LINES, RHYTHM_LINES, etc.: variantes manuales en buckets.
- buildBlock1/2/3 de Cruz Celta: ramas if/else con frases explícitas.

**El balance es razonable** para un sistema que tiene que ser determinístico y editorial al mismo tiempo. El riesgo está en el límite: cuando el cruce icónico no existe y los detectores tampoco se activan, la lectura cae en TEMP_VARIANTS + RHYTHM_VARIANTS, que son las atmósferas más genéricas. Ahí es donde se siente ensamblado.

**Punto crítico de bug ya identificado.** En `App.jsx:2101` (ComposedReading), no se está leyendo `relational.crossing` ni `relational.detector`. Hoy, en producción, **el cruce icónico no aparece en la pantalla**. Esto es lo primero que hay que arreglar porque toda la inversión en iconicCrossings + detectors está en `21f9d9f` y todavía no se ve.

---

## 6. Cartas invertidas

**Cómo funcionan actualmente.**

`contentBridge.findContentByCard(card, true)` aplica `applyReversed(base, base.reversed)`, que sobrescribe los siguientes campos si la carta los tiene en `reversed`:
- essence
- reading
- synthesis
- prompt
- extension (solo Mayores)
- manifestations
- shadows

Las 78 cartas tienen reversed completo (22 Mayores + 56 Menores, validado).

**Lo que sí funciona.**

- El texto cambia con coherencia. Cada reversed responde al marco de 6 preguntas (qué se bloquea, qué se exagera, qué se evita mirar, qué no fluye, qué tensión aparece, qué contradicción incomoda más).
- La Luna invertida ("la luna sigue arriba pero alguien encendió todas las luces") funciona como distorsión del símbolo, no como negación.
- Hay coherencia con el manifiesto editorial: "distorsiones humanas del símbolo, no versiones negativas".

**Problemas reales.**

1. **No tocan los atributos relacionales.** `attrs` se calcula sobre la carta, no sobre la versión invertida. Una Luna invertida y una Luna derecha tienen el mismo `shadowMode: 'proyección'`, las mismas `relationalTags: ['amplifica-niebla', ...]`, el mismo `visibility: 'borrosa'`. El motor relacional las ve como la misma carta. Esto es un bug semántico: la inversión debería poder apagar `'amplifica-niebla'` y encender `'niega-niebla'`.
2. **No tocan los cruces icónicos.** El par "Luna + 7E" dispara la misma frase ("desconfianza que cuesta nombrar") sea cual sea la orientación. Pero "Luna invertida + 7E invertido" debería ser otra frase: ya no es desconfianza difusa — es la sospecha admitida y la jugada nombrada.
3. **Visibilidad UX baja.** En `Detalle`, el indicador de invertida es una sola línea ("Carta invertida") en tipografía pequeña. La carta visualmente sí está rotada 180°, pero el cambio de contenido es silencioso — alguien que abra la carta sin haber estado en la tirada puede no notar que está leyendo el reversed.
4. **Compartir invertidas.** ShareModal ahora recibe `reversed`, pero no está claro si la imagen exportada muestra la rotación. Habría que verificar.

**Qué falta para que se sientan relevantes.**

- Que `getCardAttrs(card, reversed)` también acepte el parámetro y devuelva atributos invertidos cuando la carta está al revés. Esto es un día de trabajo.
- Que `iconicCrossings` indexe pares con tag de orientación (`Luna|Espadas/Siete|RR` para los dos derechas, `Luna|Espadas/Siete|II` para los dos invertidas, mixtos `RI`/`IR` aparte). Implica reescribir las 40 entradas para cubrir las 4 combinaciones por par o asumir que el cruce solo aplica con orientación específica. Es 1-2 semanas de trabajo editorial.
- Que el Detalle marque visualmente la inversión más allá del rótulo: borde distinto, color de tipografía, alguna huella consistente.

---

## 7. UX y experiencia

**Recorrido principal del usuario.**

1. Pantalla mazo (78 cartas con animación).
2. Elige modo: Tirada de 3 / Cruz Celta.
3. Tirada de 3: las 3 cartas aparecen, hay reading individual + ComposedReading abajo. Click en cada carta → Detalle.
4. Cruz Celta: revelado progresivo, 10 cartas, una por una. Después: 5 movimientos de lectura (opening + block1/2/3 + closing).
5. Detalle: essence + reading + microsituaciones + prompt + botón "Profundizar lectura" → extension expandible.
6. Compartir: ShareModal genera imagen.

**Momentos fuertes.**

- La animación inicial del mazo. Identidad visual fuerte.
- La progresividad de Cruz Celta: una carta por vez, con whisper de posición. Ritualidad real.
- El Detalle con extension oculta tras "Profundizar lectura" — buena decisión editorial: respeta al usuario casual y premia al curioso.
- Los prompts finales: típicamente bien escritos, dejan al usuario con algo concreto.

**Momentos confusos / problemas.**

1. **Sobreescritura de información en ComposedReading.** El usuario ve: atmósfera + movimiento (a veces) + 3 posiciones con essence + reading + suitVoice + echoLine + prompt. En total 5-7 bloques de texto. Mucho. La jerarquía visual ayuda pero el peso textual es alto.
2. **La extension de Mayores en Detalle.** Cuando se expande, son 200-300 palabras en serif italic. Para móvil es scroll largo. No hay subdivisión interna ni microheadings. Riesgo de fatiga.
3. **No hay diferencia visual entre carta derecha e invertida** más allá de rotación + un texto chico. Si el usuario hace scroll hasta el contenido sin mirar la imagen, puede leerlo sin saber que está en modo reversed.
4. **El indicador de "tres Mayores" en producción no aparece destacado.** El motor sabe que es un capítulo, pero la UI no lo señala visualmente: la frase queda mezclada con la atmósfera general.
5. **Cruz Celta "Anterior".** Existe `onUnreveal` pero la lógica de qué pasa con las posiciones ya leídas (¿las olvida? ¿las mantiene?) no está clara desde el código. Hay que probar.
6. **El botón Compartir** está al final de Detalle. Usable pero requiere scroll completo.

**Riesgos de fatiga.**

- Tirada de 3 promedio: 250 palabras de texto generado. Lectura razonable, ~2 min.
- Cruz Celta promedio: 600-800 palabras por las 5 secciones más los whispers. ~6-8 min de lectura. Es mucho.
- Si el usuario después abre Detalle de cada carta y hace "Profundizar", agrega 200-300 × 10 = 2.000-3.000 palabras adicionales. Total: 3.000-4.000 palabras por sesión Cruz Celta completa.

Esto rebasa la tolerancia de la mayoría de usuarios en una sesión. Hay que decidir si el caso de uso real es la sesión completa (rara, ritual) o sesiones cortas (frecuentes). Probablemente sean dos modos distintos y la UI no está optimizada para ninguno.

**Cosas que no son bugs pero pesan.**

- El pie "esto sugiere — no determina" aparece en demasiados lugares. Reduce el efecto cuando se repite.
- Las divisiones tipográficas (StarDivider, StarTiny) son consistentes pero el ojo se acostumbra y ya no marcan jerarquía.
- El Detalle no muestra el palo de manera prominente. La identidad de "esto es una Espada" se pierde.

---

## 8. Identidad de Ade

**Qué tipo de tarot está construyendo realmente.**

Un tarot **contemplativo, anti-predictivo y casi-terapéutico**. El manifiesto implícito en el código y los textos es: "no te digo lo que va a pasar, te muestro qué estás haciendo y te hago una pregunta". Es una postura editorial valiente porque elimina el principal motor de engagement de la mayoría de productos tarot (la curiosidad por el futuro) y lo reemplaza por la confrontación amorosa con uno mismo.

**Qué lo diferencia.**

- El sistema relacional (cuando se cablee a la UI). Pocos productos tarot tienen detección de cruces fuertes con frase específica. La mayoría son lookup por carta.
- La distinción derecho/invertido como "distorsión humana, no negación". Es un marco editorial limpio.
- La voz: cuando funciona, mezcla literatura corta con cuidado terapéutico. Frases tipo "qué obtienes cada vez que lo eliges" o "cargar un cadáver no lo trae de vuelta" son buenas.
- La identidad visual: serif italic + dorado discreto + ritmo de StarDivider. Coherente.

**Qué lo vuelve único.**

- La Cruz Celta progresiva con whispers por posición.
- La separación entre essence (1 línea) / reading (mediano) / extension (largo) / prompt (cierre). Es un sistema de jerarquía editorial real, no decorativo.
- El compromiso con español neutro y con no usar voseo (defendido por linter automático).
- El registro emocional: las cartas hablan al lector como si lo conocieran, sin caer en mística ni en coach.

**Qué lo puede volver genérico.**

- Las atmósferas de TEMP_VARIANTS y RHYTHM_VARIANTS. Son la voz menos identificada del producto. Se podrían reemplazar por algo más anclado o eliminar y dejar que el resto cargue el peso.
- Si se sigue agregando contenido (más cartas, más cruces) sin curaduría, el inventario crece y la identidad se diluye.
- Los "esto sugiere — no determina" repetidos vuelven al producto autoconsciente. Una sola vez en el primer uso es elegante; doce veces es defensiva.
- El aplauso a uno mismo en frases como "esta carta no romantiza la herida". El lector no necesita que le expliquen lo que la carta hace; necesita la carta haciéndolo.

---

## 9. Riesgos críticos

**Sobrepoetización.** Presente, ~30 % de la prosa atmosférica. Diagnóstico: las TEMP_VARIANTS y RHYTHM_VARIANTS son el peor caso. Las extensions de algunos Mayores también. Solución: cortar lo decorativo, mantener solo lo que ancla en imagen humana.

**Repetición narrativa.** Confirmada. Los detectores tienen 3-5 variantes por bucket; los iconicCrossings son únicos pero solo cubren 40 pares. Un usuario que tira 5 veces va a leer la misma frase de TEMP_VARIANTS al menos una vez. Solución: subir a 8-10 variantes por bucket en los detectores que se disparan más, o detectar bucket-poco-rico y caer a otro.

**Neutralidad excesiva.** Confirmada. El producto evita tomar posición casi siempre — "ambas tienen razón en distinto plano", "no es defecto, es información", "no se resuelve eligiendo". Es un patrón. A veces es la postura correcta. A veces es evasión. La diferencia: cuando una carta está señalando una repetición destructiva (Diablo, 5 Espadas, 9 Espadas), Ade no se anima a decir "esto te está costando". Suaviza con "esto pide ser mirado". Decisión editorial pendiente: ¿en qué casos Ade puede tomar posición?

**Falta de toma de posición.** Variante de la anterior. El producto siente que cuestiona pero raramente sentencia. Para algunos usuarios eso es exactamente lo que necesitan; para otros es frustrante.

**Sensación GPT.** Presente. Tres síntomas:
- Frases que terminan con "...y eso ya es información" / "...y ahí pasa otra cosa".
- Estructura "no es X, es Y" usada como tic.
- Rellenos atmosféricos sin imagen.

**Exceso de texto.** Diagnóstico anterior — Cruz Celta + Detalle expandido suma 3.000-4.000 palabras. Mucho.

**Falta de claridad.** En la UX, no es claridad de prosa — es claridad de jerarquía visual. El usuario en pantalla pequeña a veces no sabe qué es atmósfera, qué es la lectura por posición, qué es el cruce icónico. Cableado UI pendiente para diferenciarlos.

**Ausencia de validación con personas reales.** Riesgo metaproyecto. El producto está rico en contenido (8.891 líneas de código + texto) y vacío de feedback. Antes de seguir construyendo (más reversed para Menores con detectores invertidos, más cruces icónicos, sound, etc.) hay que tener 5-10 personas usando el producto y registrar qué leen, qué se saltan, dónde se aburren, dónde respiran. Sin eso, el proyecto va a seguir creciendo en la dirección que parece correcta a quien lo escribe — no necesariamente a quien lo usa.

---

## 10. Prioridades reales

Ordenadas según costo/beneficio. Los items de prioridad 1 son lo que conviene corregir antes de tocar cualquier otra cosa. Los items de prioridad 4 son cosas a no construir hoy.

**Prioridad 1 — esta semana.**

- **Cablear `relational.crossing` y `relational.detector` a la UI.** Es la única razón por la que el motor que se acaba de construir no se está viendo. ~2 horas. ComposedReading.jsx es el archivo. Probablemente vale la pena tipografía distinta para el cruce (italic + dorado más fuerte) y el detector (gris medio).
- **Probar la app con 5 personas.** No con 50. Con 5. Sesión de 20 minutos cada una. Pedirles tirada de 3 + Cruz Celta. Grabar qué leen, dónde scrollean, qué dicen al final. Sin esto, las prioridades 2-4 son adivinanza.
- **Decidir si la extension de Detalle se queda larga o se parte.** Si se queda, hay que asumir que solo el 10 % de usuarios la lee. Si se parte, hay que dividirla en 2-3 secciones con microheadings.

**Prioridad 2 — próximas dos semanas.**

- **Atributos de invertidas.** Que `getCardAttrs(card, reversed)` reciba flag y devuelva atributos modificados (al menos `relationalTags` y `shadowMode`). Esto desbloquea que los detectores y cruces respondan a invertidas.
- **iconicCrossings con orientación.** Reescribir los 40 cruces existentes con clave que incluya R/I por carta. O al menos los 10 más relevantes (Luna+7E, Torre+10E, Diablo+7C, Diablo+8E, Muerte+6C). El resto aplica solo en orientación derecha por defecto.
- **Cortar el decorado atmosférico.** Limpieza editorial de TEMP_VARIANTS y RHYTHM_VARIANTS — eliminar las frases tipo "es esa charla buena donde alguien dijo algo que no se va" y dejar las que tienen imagen ("la cuerda está corta — cualquier cosa que toques va a vibrar más de lo esperado"). Probablemente queden la mitad.
- **Refactorear la Cruz Celta para que use cardAttributes + iconicCrossings.** Hoy es paralelo. Si se unifica, cada cruce icónico que se escriba se aprovecha en las dos modalidades.

**Prioridad 3 — próximo mes.**

- **Pase editorial a las 17 Mayores no-piloto.** Forzar al menos una microescena por reading. El Mago, El Carro, La Templanza, El Sol, El Mundo son los más urgentes.
- **Subir variantes en los detectores de buckets dominantes.** TEMP_VARIANTS.mixed, RHYTHM_VARIANTS.stable, MAJOR_PRESENCE_VARIANTS[1] — cada uno necesita al menos 8 variantes para que un usuario activo no perciba repetición en la primera semana.
- **Borrar `majorArcana.js` (legacy).** 292 líneas de código muerto que confunden.
- **Eliminar redundancia entre `traditionalMeanings`, `archetypes`, `emotionalThemes` en Mayores.** Una sola lista.
- **Diferenciación visual de invertidas en Detalle.** Borde distinto, color de tipografía, alguna huella consistente más allá del rótulo.

**Prioridad 4 — pausar / no construir todavía.**

- **Más cruces icónicos.** 40 ya alcanzan para validar el patrón. No tiene sentido escribir 80 más antes de probar que los 40 actuales se ven y funcionan. Pausar hasta tener feedback de usuarios.
- **Triángulos icónicos** (combinaciones de 3 cartas). Compleja arquitecturalmente y baja cobertura. Posponer.
- **Sound** (mencionado en backlog). No hasta que el motor relacional esté cableado y validado.
- **Detector posicional en Cruz Celta** (que las posiciones específicas afecten cómo se interpreta una carta). Buena idea pero requiere refactor profundo. Dejar para después de la unificación de motores.
- **Más reversed para Menores con detectores nuevos.** Las 56 reversed ya están escritas; el siguiente paso natural es darles atributos invertidos, no más texto.

---

## Cierre

El sistema está en buen punto. La identidad editorial existe. El motor relacional emergente acaba de tomar forma. La cobertura de contenido es completa para las 78 cartas, derecho e invertido. El linter de voseo cuida el español neutro de manera automática.

Los problemas principales son **cableado pendiente** (cruces icónicos no aparecen en pantalla), **duplicación arquitectural** (tres motores que deberían ser uno), **falta de validación humana** (no hay feedback de usuarios reales), y **ruido editorial** (~30 % de prosa atmosférica que sigue sonando GPT y desdice el resto).

La pregunta abierta más importante no es técnica. Es editorial: **¿en qué casos Ade puede tomar posición y dejar de equilibrar todas las verdades?** Esa decisión va a definir el carácter del producto más que cualquier feature nueva.

— fin del informe.
