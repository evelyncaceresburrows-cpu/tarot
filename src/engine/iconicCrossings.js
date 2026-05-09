/* =====================================================================
 * iconicCrossings.js
 *
 * Cruces icónicos entre cartas. El usuario los pidió así:
 *   La Luna + 7 de Espadas → "desconfianza difícil de explicar"
 *   NO: "intuición + estrategia"
 *
 * No son combinaciones manuales 78x78 (eso son 3.003 pares).
 * Son cruces FUERTES escritos a mano: pares con resonancia simbólica
 * que el motor levanta cuando aparecen, antes de caer en lo atmosférico
 * genérico.
 *
 * Reglas:
 *   - Pares NO ordenados (Luna+7E === 7E+Luna).
 *   - Cada cruce trae:
 *       phrase   frase corta y específica para inyectar en la lectura
 *       kind     'amplifica' | 'bloquea' | 'contradice' | 'revela'
 *       weight   0.5–1.0 — qué tanto se prioriza sobre lo atmosférico
 *
 * Cuántos:
 *   ~40 pares fuertes. Suficiente para que las lecturas con cartas
 *   manifiesto (Luna, Torre, Diablo, Muerte, Espadas) tengan voz
 *   propia. El resto sigue cayendo en los detectores genéricos.
 *
 * Naming:
 *   Para Mayores se usa el nombre exacto.
 *   Para Menores se usa "Suit/Number" (ej. "Espadas/Siete").
 * ===================================================================*/


/** Crea una clave canónica no ordenada para un par de cartas. */
export function pairKey(a, b) {
  const ka = cardKey(a)
  const kb = cardKey(b)
  return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
}

export function cardKey(card) {
  if (!card) return ''
  if (card.name) return card.name
  if (card.suit && card.number) return `${card.suit}/${card.number}`
  return ''
}


/* =====================================================================
 *  CRUCES ICÓNICOS
 *
 *  Cada par lleva: phrase, kind, weight.
 *  Las frases son anclas humanas, no combinaciones tipo "X + Y".
 * ===================================================================*/
const CROSSINGS = {

  /* ---------- LUNA: niebla, distorsión, percepción ----------- */
  'La Luna|Espadas/Siete': {
    phrase: 'Hay una desconfianza que cuesta nombrar. Algo no termina de cuadrar y la cabeza ya empezó a armar pruebas que no se pueden mostrar.',
    kind: 'amplifica',
    weight: 0.95
  },
  'La Luna|Espadas/Nueve': {
    phrase: 'La angustia no falla en hacerte ver más de lo que hay. La señal que tu cuerpo registra es real; la película que arma tu cabeza, casi con seguridad no.',
    kind: 'amplifica',
    weight: 0.9
  },
  'Copas/Siete|La Luna': {
    phrase: 'Estás soñando despierta con varias versiones a la vez, y ninguna se está dejando aterrizar. La niebla ya no inspira: paraliza.',
    kind: 'amplifica',
    weight: 0.85
  },
  'El Diablo|La Luna': {
    phrase: 'Hay un deseo trabajando en lo no dicho — y cuanto menos se mira, más manda. Esto no se desarma con voluntad: se desarma con luz.',
    kind: 'amplifica',
    weight: 0.85
  },
  'El Sol|La Luna': {
    phrase: 'Una parte tuya pide simplificar y otra todavía no terminó de salir de la niebla. Ninguna de las dos miente: están en distintos compases del mismo proceso.',
    kind: 'contradice',
    weight: 0.8
  },

  /* ---------- TORRE: ruptura, verdad súbita ----------- */
  'La Torre|Espadas/Diez': {
    phrase: 'Lo que se está cayendo lleva tiempo cayéndose. Esto no es accidente: es el final de una pelea mental que ya no daba para más.',
    kind: 'amplifica',
    weight: 0.9
  },
  'La Torre|Oros/Cuatro': {
    phrase: 'Estabas sosteniéndolo cerrado y la sacudida vino justo por ahí. Lo que apretabas con miedo era exactamente lo que pedía moverse.',
    kind: 'revela',
    weight: 0.9
  },
  'La Torre|El Diablo': {
    phrase: 'Una atadura que llevaba años está siendo rota desde afuera. No la elegiste tú; te la sacudieron. El alivio aparece después del susto, no antes.',
    kind: 'amplifica',
    weight: 0.85
  },
  'La Torre|La Estrella': {
    phrase: 'Acaba de quebrarse algo y, del otro lado del derrumbe, ya hay agua. Esto no es castigo seguido de premio: es la misma escena en dos tiempos.',
    kind: 'revela',
    weight: 0.85
  },
  'Espadas/Tres|La Torre': {
    phrase: 'El golpe no llega de la nada — llega justo en la herida que ya estaba abierta. Lo único que cambia es que ahora no se puede tapar.',
    kind: 'amplifica',
    weight: 0.85
  },

  /* ---------- MUERTE: cierre orgánico ----------- */
  'La Muerte|Copas/Seis': {
    phrase: 'Algo del pasado terminó de hacer su tiempo. La nostalgia no es traición a lo que fue: es la forma en que un cierre se despide bien.',
    kind: 'revela',
    weight: 0.85
  },
  'La Muerte|Copas/Ocho': {
    phrase: 'Ya estabas yéndote. Esta carta solo confirma lo que el cuerpo viene avisando hace meses.',
    kind: 'amplifica',
    weight: 0.85
  },
  'La Muerte|El Mundo': {
    phrase: 'Un ciclo entero termina. Lo que se va no deja agujero: deja umbral. La pregunta no es qué perdiste, es qué empiezas recién ahora.',
    kind: 'revela',
    weight: 0.85
  },
  'Bastos/Diez|La Muerte': {
    phrase: 'Una carga que llevabas hace tiempo se está cayendo sola. No la sostengas un día más por costumbre.',
    kind: 'revela',
    weight: 0.8
  },

  /* ---------- DIABLO: deseo, atadura ----------- */
  'El Diablo|Copas/Siete': {
    phrase: 'Estás eligiendo, una y otra vez, una versión que ya sabes cómo termina. Lo difícil aquí no es soltar: es dejar de elegirla.',
    kind: 'amplifica',
    weight: 0.9
  },
  'El Diablo|Espadas/Ocho': {
    phrase: 'La cuerda ya está suelta. El relato que la sostiene no.',
    kind: 'revela',
    weight: 0.9
  },
  'El Diablo|Los Enamorados': {
    phrase: 'Hay un cruce entre vínculo y atadura, y los dos tienen tu cara. La pregunta no es de quién es la culpa: es qué obtienes cada vez que lo eliges.',
    kind: 'contradice',
    weight: 0.85
  },
  'El Diablo|La Templanza': {
    phrase: 'El extremo y la mezcla pelean en la misma escena. Ni la abstinencia heroica ni la entrega total te van a sacar — el camino pasa por dosis honestas.',
    kind: 'contradice',
    weight: 0.8
  },

  /* ---------- LUCIDEZ FRÍA + EMOCIÓN VIVA ----------- */
  'La Sacerdotisa|Copas/Tres': {
    phrase: 'Estás guardando algo que cambiaría la dinámica de un grupo. La fiesta sigue, y tu silencio empieza a pesar más que el secreto.',
    kind: 'contradice',
    weight: 0.8
  },
  'La Sacerdotisa|Espadas/As': {
    phrase: 'Ya viste algo con claridad. La pregunta es para qué lo vas a usar — y por qué hace tanto que lo guardas.',
    kind: 'amplifica',
    weight: 0.8
  },
  'La Justicia|Copas/Tres': {
    phrase: 'Hay una verdad emocional que está pidiendo decir, y la mesa va a quedar callada un rato cuando se diga. Eso no es señal de equivocación: es el peso real.',
    kind: 'contradice',
    weight: 0.75
  },
  'La Justicia|Espadas/Cinco': {
    phrase: 'Tener razón no es el final. Si la justicia que quieres exige humillar al otro, ya dejó de ser justicia.',
    kind: 'contradice',
    weight: 0.85
  },

  /* ---------- PARÁLISIS Y DECISIÓN ----------- */
  'El Colgado|Espadas/Dos': {
    phrase: 'No es momento de decidir y tampoco de seguir igual. Lo que pide la escena es soltar la pretensión de tener una respuesta hoy.',
    kind: 'amplifica',
    weight: 0.85
  },
  'Espadas/Dos|Los Enamorados': {
    phrase: 'Hay una decisión que llevas meses con los ojos cerrados. Mantenerla en pausa también es elegir, solo que en silencio.',
    kind: 'revela',
    weight: 0.85
  },
  'Bastos/Siete|El Colgado': {
    phrase: 'Estás defendiendo una posición que la situación ya no te pide defender. La firmeza aquí empezó a parecerse a la rigidez.',
    kind: 'bloquea',
    weight: 0.8
  },

  /* ---------- AVANCE Y FRENO ----------- */
  'El Carro|Espadas/Cuatro': {
    phrase: 'Una parte tuya quiere lanzarse y otra pide pausa. La que tiene razón hoy es la que pide pausa: avanzar sin descanso ya empezó a costar más de lo que rinde.',
    kind: 'contradice',
    weight: 0.85
  },
  'El Carro|Copas/Cuatro': {
    phrase: 'El impulso está, pero el ánimo está bajo. Avanzar sin chequear el cuerpo va a ser ruido — el carro pesa más cuando lo tira alguien sin ganas.',
    kind: 'bloquea',
    weight: 0.8
  },
  'Bastos/Caballero|Espadas/Cuatro': {
    phrase: 'El galope lleva días, y en algún momento alguien tiene que tenderse. La ventana de pausa es ahora; mañana se va a sentir más cara.',
    kind: 'contradice',
    weight: 0.75
  },

  /* ---------- AISLAMIENTO Y LLAMADO ----------- */
  'El Ermitaño|El Juicio': {
    phrase: 'Lo que descubriste en silencio ya pide volver al mundo. El retiro hizo su trabajo; lo que sigue no se puede hacer sola.',
    kind: 'revela',
    weight: 0.8
  },
  'El Ermitaño|Copas/Cinco': {
    phrase: 'El retiro no se eligió: se cayó encima. Hay duelo y aislamiento al mismo tiempo, y conviene no confundirlos con sabiduría.',
    kind: 'amplifica',
    weight: 0.8
  },
  'Oros/Cinco|La Estrella': {
    phrase: 'Hay una luz cerca que estás pasando de largo. La carencia es real, y aún así, hay agua puesta para ti.',
    kind: 'contradice',
    weight: 0.8
  },

  /* ---------- CONSTRUCCIÓN VS RUPTURA ----------- */
  'Oros/Diez|La Torre': {
    phrase: 'Una estructura familiar o material está temblando. Lo que parecía herencia firme está mostrando sus grietas viejas.',
    kind: 'revela',
    weight: 0.85
  },
  'Oros/Diez|La Muerte': {
    phrase: 'Algo del legado familiar está terminando contigo: una repetición, un patrón, una lealtad heredada. Cerrar aquí es decidir cómo seguir.',
    kind: 'revela',
    weight: 0.8
  },
  'El Mago|Oros/Ocho': {
    phrase: 'La intención y el oficio están alineados. Esto se construye con presencia, no con magia: tienes la herramienta y la repetición.',
    kind: 'amplifica',
    weight: 0.75
  },

  /* ---------- AMOR/VÍNCULO ----------- */
  'Los Enamorados|Copas/Dos': {
    phrase: 'Un vínculo está pidiendo ser nombrado en serio — no como flirteo ni como costumbre, como elección consciente.',
    kind: 'amplifica',
    weight: 0.85
  },
  'Los Enamorados|Copas/Tres': {
    phrase: 'Hay vínculo y comunidad en juego. Lo que decidas no afecta solo a una persona — afecta una mesa entera.',
    kind: 'amplifica',
    weight: 0.8
  },
  'Copas/Dos|La Torre': {
    phrase: 'Un vínculo recién formado está siendo sacudido por algo más grande que ambos. Aguantar la sacudida sin pretender que no pasó es la única honestidad disponible.',
    kind: 'revela',
    weight: 0.8
  },

  /* ---------- IMPULSO BLOQUEADO ----------- */
  'Bastos/As|Oros/Cuatro': {
    phrase: 'Hay una chispa nueva y un puño cerrado en el mismo lado. La idea pide aire; la mano todavía no lo está dando.',
    kind: 'bloquea',
    weight: 0.85
  },
  'Bastos/As|El Colgado': {
    phrase: 'Una chispa apareció justo en un tiempo de pausa obligatoria. No es contradicción: es la chispa avisando que el descanso también prepara.',
    kind: 'contradice',
    weight: 0.75
  },
  'Bastos/Diez|Oros/Cuatro': {
    phrase: 'Cargas mucho y te aferras a poco. El cuerpo ya no distingue entre lo que sostiene por amor y lo que sostiene por miedo a soltar.',
    kind: 'amplifica',
    weight: 0.8
  },

  /* ---------- CIERRES Y APERTURAS ----------- */
  'El Mundo|El Loco': {
    phrase: 'Un capítulo cierra y otro pide su primer paso, casi en el mismo gesto. Esto no es nostalgia: es continuidad con cara nueva.',
    kind: 'revela',
    weight: 0.85
  },
  'El Juicio|Copas/Ocho': {
    phrase: 'Un llamado interno llegó justo cuando ya estabas yéndote de algo. No fue casualidad: la salida era parte de oír el llamado.',
    kind: 'amplifica',
    weight: 0.8
  }
}


/* =====================================================================
 *  API
 * ===================================================================*/

/* Normalizamos la tabla a keys ordenadas alfabéticamente para que
   pairKey() siempre acierte sin importar en qué orden se escribieron. */
const CROSSINGS_NORMALIZED = (() => {
  const out = {}
  for (const [k, v] of Object.entries(CROSSINGS)) {
    const [a, b] = k.split('|')
    const norm = a < b ? `${a}|${b}` : `${b}|${a}`
    out[norm] = v
  }
  return out
})()

/**
 * Busca todos los cruces icónicos presentes entre las cartas dadas.
 * Devuelve array ordenado por weight desc, con { phrase, kind, weight,
 * pair: [keyA, keyB] }.
 */
export function findCrossings(cards) {
  const list = (cards || []).filter(Boolean)
  const found = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const key = pairKey(list[i], list[j])
      const c   = CROSSINGS_NORMALIZED[key]
      if (c) {
        found.push({
          ...c,
          pair: key.split('|')
        })
      }
    }
  }
  found.sort((a, b) => b.weight - a.weight)
  return found
}

/** Total de cruces escritos. Útil para debug/cobertura. */
export const CROSSING_COUNT = Object.keys(CROSSINGS).length
