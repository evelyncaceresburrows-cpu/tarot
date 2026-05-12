# -*- coding: utf-8 -*-
"""Diversifica la sintaxis 'X no es Y — es Z' en las tesis.

No elimina la fórmula entera (es útil), solo baja su frecuencia para
que no aparezca en cada tirada. ~10 reformulaciones puntuales.
"""

PATHS_FIXES = {
    'src/engine/narrativeComposer.js': [
        # L56 — agotamiento + dificultad cerrar
        ('Lo que pesa no es lo que está pasando — es que llevas demasiado tiempo cargándolo sin soltarlo.',
         'El peso no es la situación. Es el tiempo que llevas cargándola sin soltarla.'),

        # L101 — agotamiento sostenido (single)
        ('Lo que aparece no es crisis — es cansancio acumulado. La situación pide pausa real, no más esfuerzo.',
         'Lo que aparece tiene cara de crisis. Por dentro es cansancio acumulado, y pide pausa real más que esfuerzo.'),

        # L78 — ruptura + mental
        ('Algo está cediendo y el cuerpo lo sabe antes que la cabeza. La tensión que sientes no es paranoia: es lectura precisa.',
         'Algo está cediendo y el cuerpo lo sabe antes que la cabeza. La tensión que sientes está leyendo bien, aunque la cabeza todavía no quiera firmarla.'),

        # L109 — deseo bloqueado (single)
        ('Hay un querer vivo y una parte tuya conteniéndolo. La pelea no es con afuera, es entre dos partes tuyas.',
         'Hay un querer vivo y una parte tuya conteniéndolo. Afuera no hay con quién pelear: la disputa es interna.'),

        # L266 — buildAttempt ruptura-en-curso
        ('Algo está intentando romperse para que pueda salir lo siguiente. No es decisión consciente: ya está pasando.',
         'Algo está intentando romperse para que pueda salir lo siguiente. No hace falta decidirlo — ya está pasando.'),

        # L344 — synthesis mental
        ('La tirada pide salir de la cabeza. No es decidir más rápido — es decidir con el cuerpo en la conversación.',
         'La tirada pide salir de la cabeza. Decidir más rápido no aclara: lo que falta es traer el cuerpo a la conversación.'),

        # L140 — bastos 3-mismo-palo
        ('Tres Bastos. Hay deseo, hay impulso, hay fuego. La pregunta no es si hay energía: es hacia dónde.',
         'Tres Bastos. Hay deseo, hay impulso, hay fuego. La pregunta no se trata de la energía, sino de su dirección.'),
    ],

    'src/engine/celticNarrative.js': [
        # L73 — desgaste-cronico tesis
        ('Esta lectura no habla de conflicto: habla de demora. Hay varias cartas tratando de sostener algo que ya perdió estabilidad, y la pregunta no es qué hacer — es cuánto más estás dispuesta a sostenerlo así.',
         'Esta lectura no habla de conflicto: habla de demora. Hay varias cartas tratando de sostener algo que ya perdió estabilidad. La pregunta no es qué hacer ahora — es cuánto más vale la pena sostenerlo así.'),

        # L77 — comprension-sin-movimiento
        ('Aquí está casi todo entendido. Lo que falta no es claridad — es la decisión de actuar sobre lo que ya se vio.',
         'Aquí está casi todo entendido. La claridad ya está. Lo que falta es la decisión de actuar sobre lo que ya se vio.'),

        # L91 — patron-cierra-ciclo
        ('Lo que aparece no es escena nueva: es la última escena de un patrón viejo. La lectura no muestra crisis — muestra el final de algo que llevaba más años de lo que parecía.',
         'Lo que aparece se siente como escena nueva. Es la última escena de un patrón viejo: la lectura describe un final que llevaba más años de lo que parecía.'),

        # L195 — núcleo acelera
        ('La fricción no es entre dos verdades: es entre dos tiempos.',
         'La fricción está entre dos tiempos, no entre dos verdades.'),

        # L197 — núcleo frena
        ('Lo que se cruza no es obstáculo: es el cuerpo pidiendo pausa.',
         'Lo que se cruza ahí no es obstáculo. Es el cuerpo pidiendo pausa.'),

        # L199 — núcleo corta-afecto
        ('El choque no es de quién tiene razón: es de qué órgano está al mando hoy.',
         'El choque no se trata de quién tiene razón. Se trata de qué órgano está al mando hoy.'),

        # L274 — fuerzas push tres mentales
        ('Las tres son cartas mentales: lo que empuja no es ola, es discurso interno.',
         'Las tres son cartas mentales: lo que empuja no es marea. Es discurso interno repitiéndose.'),

        # L379 — palo dominante bastos
        ('Hay {count} cartas de Bastos. La lectura late en el deseo y el impulso — y el problema no es si hay energía, es hacia dónde apunta.',
         'Hay {count} cartas de Bastos. La lectura late en el deseo y el impulso. El problema no es la energía disponible — es hacia dónde está apuntando.'),
    ],
}

total = 0
for path, fixes in PATHS_FIXES.items():
    with open(path, encoding='utf-8') as f:
        s = f.read()
    n = 0
    for a, b in fixes:
        if a in s:
            s = s.replace(a, b)
            n += 1
        else:
            print(f'  WARN {path}: no encontró:\n    "{a[:60]}..."')
    if n > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        print(f'{path}: {n} reescrituras')
        total += n
print(f'TOTAL: {total}')
