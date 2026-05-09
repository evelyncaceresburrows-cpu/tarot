# Protocolo de testing humano · Tarot Ade

5 personas. 25-30 min cada una. Sin grupo focal — sesiones individuales.
El objetivo NO es saber si "les gustó". Es saber **qué frase recuerdan, qué les pareció vacío, dónde dejaron de leer**.

---

## Quién testea

Buscar mezcla:
- 1 persona que conozca tarot
- 2 personas que nunca hayan tirado cartas pero estén abiertas
- 1 persona escéptica del tarot (no hostil, solo no creyente)
- 1 persona que use otras apps de tarot (Co-Star tipo)

No usar amigos cercanos del proyecto. Sí amigos lejanos o conocidos. Idealmente edades entre 25 y 50.

---

## Setup

- App en producción (https://tarot-zeta-eosin.vercel.app/), no localhost.
- Móvil + escritorio: pedirles que abran en uno y luego en el otro.
- Audio grabado con su consentimiento. O captura escrita en tiempo real.
- No explicarles cómo funciona la app. Que la abran y exploren.

---

## Estructura de la sesión

### Bloque 1 — Llegada (5 min)

> "Te paso un link. Abrilo, mirá lo que aparece, y contame qué crees que es esto antes de hacer cualquier cosa."

Anotar:
- Cuánto tarda en hacer el primer click.
- Qué describe (¿"es tarot"? ¿"es una app contemplativa"?).
- Qué intuye que va a hacer.

### Bloque 2 — Tirada de 3 (10 min)

> "Hacé una tirada de 3 cartas. Lee todo lo que quieras. Cuando termines, contame."

Anotar SIN INTERRUMPIR:
- Cuánto tiempo lee cada bloque (essence, posición, cruce, detector, prompt).
- Dónde scrollea rápido sin leer.
- Qué partes vuelve a leer.
- Si abre el detalle de alguna carta o no.

Después preguntar — exactamente estas preguntas, en este orden:

1. **¿Cuál fue la primera frase que te llamó la atención?** (la que recuerdan)
2. **¿Hubo alguna parte que te pareció vacía o que sintieras que servía para cualquier persona?** (humo)
3. **¿Hubo alguna que sintieras que estaba escrita sobre vos en particular?** (resonancia)
4. **¿Qué te quedó dando vueltas después de cerrar la app?** (lo que persiste)

### Bloque 3 — Cruz Celta (15 min)

> "Ahora hacé una Cruz Celta. Tarda más. Hacela completa."

Mismo método de observación. Después:

1. **¿En qué carta dejaste de leer atentamente?**
2. **¿Cuál fue el momento más fuerte de la lectura completa?**
3. **¿La síntesis al final te aportó algo, o ya había sido dicho?**
4. **Si tuvieras que recomendarle esto a alguien, ¿qué dirías?**

---

## Lo que NO hay que preguntar

- "¿Te gustó?"
- "¿Cuántas estrellas le pondrías?"
- "¿Lo recomendarías?"
- "¿Es bonito?"
- Cualquier pregunta cerrada con sí/no.

---

## Métricas a capturar (planilla)

Por persona:

| campo | medición |
|-------|----------|
| Frase recordada (verbatim) | texto exacto que cita |
| Frase que sintió falsa | texto que cita |
| Tiempo total tirada de 3 | minutos |
| Tiempo total Cruz Celta | minutos |
| Cartas con detalle abierto | cuántas de 3 / cuántas de 10 |
| Botón "Profundizar lectura" usado | sí/no |
| Punto de abandono Cruz Celta | nunca / carta X / final |
| Compartió la lectura | sí/no |
| Carta que recordó después | nombre |
| Sensación general (3 palabras) | qué dice cuando le pedís resumir |

---

## Casos a forzar si no salen solos

Si las tiradas aleatorias no incluyen estos cruces, pedirle a la persona que vuelva a tirar hasta que aparezcan al menos 2 de estos. Son los cruces que el motor levanta y son los que más necesitan validación:

- La Luna + cualquier Espadas
- La Torre con cualquier carta
- El Diablo con cualquier Copas
- 9 de Espadas en cualquier posición
- 3 cartas del mismo palo
- 3 Mayores juntos
- 2 cartas invertidas o más

Si esto no sucede en 3 tiradas, avisar y pasar al siguiente bloque.

---

## Señales de alarma a registrar

Cualquiera de estas obliga a marcar la sesión como "lectura no funcionó":

- La persona dice "esto podría ser de cualquiera".
- La persona se aburre antes de terminar la Cruz Celta.
- La persona no recuerda ninguna frase específica al cerrar.
- La persona dice "es bonito pero no me dice nada".
- La persona dice que "suena escrito por inteligencia artificial".

---

## Lo que esperamos confirmar (hipótesis)

Antes de testear, escribir las hipótesis. Después comparar.

1. **Hipótesis del cruce icónico:** las 5 personas van a recordar el cruce mejor que la atmósfera. Si NO es así → el cableado UI o el peso visual del cruce está mal.
2. **Hipótesis de la prosa atmosférica:** al menos 2 personas van a marcar como "vacía" alguna frase de TEMP_VARIANTS o RHYTHM_VARIANTS. Si nadie las marca como vacías → o estuvieron muy podadas y funciona, o las personas no están leyendo con suficiente atención (chequear con frases recordadas).
3. **Hipótesis de la fatiga Cruz Celta:** al menos 3 personas van a abandonar antes del cierre o leerán saltando. Si todos llegan al final → la profundidad sí se sostiene; si todos abandonan → hay que cortar.
4. **Hipótesis de la inversión:** si una persona tira al menos una carta invertida, al menos 1 va a notar la diferencia entre el reading derecho y el invertido. Si nadie nota → hay que reforzar la marca visual.
5. **Hipótesis del prompt final:** las personas que recuerdan algo, recuerdan el prompt o la essence más que la prosa larga. Si no es así → la jerarquía editorial está mal calibrada.

---

## Después de las 5 sesiones

Reunir hallazgos en una sola grilla:

| frase | la mencionaron como recordada | la mencionaron como vacía |
|-------|-------------------------------|---------------------------|
| (frase 1) | persona 2, 4 | — |
| (frase 2) | — | persona 1, 3, 5 |
| ... | | |

Toda frase que aparezca como "vacía" en 2+ personas: borrar de inmediato.
Toda frase que aparezca como "recordada" en 2+ personas: marcarla como ancla — esa es la voz de Ade funcionando.

---

## Tiempo total

5 sesiones × 30 min = 2,5 horas de testing.
Análisis de hallazgos: 1,5 horas.
Total: 4 horas. **Mucho menos que escribir un cruce icónico más.**

Hacerlo antes de cualquier nueva feature.
