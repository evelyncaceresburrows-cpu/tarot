# -*- coding: utf-8 -*-
"""
Convierte el contenido de ADE de español rioplatense (vos) a español
neutro (tú). Aplica reemplazos por palabra completa con boundaries
para no romper código (variables, keys, etc).

Archivos procesados:
  - src/content/majorArcanaSymbolic.js
  - src/content/minorArcanaCards.js
  - src/content/minorArcanaSuitSystem.js
  - src/content/contentBridge.js  (ojo: tiene verbMap, lo regeneramos)
  - src/engine/relationalEngine.js
  - src/engine/celticReading.js
  - src/engine/emotionalMemory.js
  - src/engine/composeReading.js
  - src/App.jsx
"""

import re
import sys
import os

# Mapa de reemplazos { palabra_origen: palabra_destino }.
# Aplicado con \b...\b para no tocar substrings de variables.
REPLACEMENTS = {
    # Pronombre
    'vos': 'tú',

    # Verbos vos → tú (presente indicativo)
    'tenés': 'tienes',
    'querés': 'quieres',
    'podés': 'puedes',
    'sabés': 'sabes',
    'sentís': 'sientes',
    'decís': 'dices',
    'elegís': 'eliges',
    'sostenés': 'sostienes',
    'reconocés': 'reconoces',
    'aceptás': 'aceptas',
    'cuidás': 'cuidas',
    'aprendés': 'aprendes',
    'llorás': 'lloras',
    'asumís': 'asumes',
    'comprendés': 'comprendes',
    'compartís': 'compartes',
    'escuchás': 'escuchas',
    'pedís': 'pides',
    'ofrecés': 'ofreces',
    'cerrás': 'cierras',
    'abrís': 'abres',
    'perdés': 'pierdes',
    'ganás': 'ganas',
    'buscás': 'buscas',
    'esperás': 'esperas',
    'tomás': 'tomas',
    'seguís': 'sigues',
    'empezás': 'empiezas',
    'terminás': 'terminas',
    'recibís': 'recibes',
    'permitís': 'permites',
    'recordás': 'recuerdas',
    'olvidás': 'olvidas',
    'pisás': 'pisas',
    'cocinás': 'cocinas',
    'cumplís': 'cumples',
    'manejás': 'manejas',
    'sumás': 'sumas',
    'lanzás': 'lanzas',
    'apuntás': 'apuntas',
    'anotás': 'anotas',
    'anticipás': 'anticipas',
    'mediás': 'medias',
    'cargás': 'cargas',
    'editás': 'editas',
    'peleás': 'peleas',
    'rechazás': 'rechazas',
    'apagás': 'apagas',
    'reducís': 'reduces',
    'planeás': 'planeas',
    'avanzás': 'avanzas',
    'recuperás': 'recuperas',
    'defendés': 'defiendes',
    'liderás': 'lideras',
    'inspirás': 'inspiras',
    'subís': 'subes',
    'mostrás': 'muestras',
    'celebrás': 'celebras',
    'confiás': 'confías',
    'pasás': 'pasas',
    'notás': 'notas',
    'caés': 'caes',
    'jugás': 'juegas',
    'encontrás': 'encuentras',
    'cambiás': 'cambias',
    'hacés': 'haces',
    'despertás': 'despiertas',
    'creés': 'crees',
    'leés': 'lees',
    'venís': 'vienes',
    'llevás': 'llevas',
    'durás': 'duras',
    'movés': 'mueves',
    'crecés': 'creces',
    'florecés': 'floreces',
    'caminás': 'caminas',
    'cruzás': 'cruzas',
    'salís': 'sales',
    'entrás': 'entras',
    'apretás': 'aprietas',
    'fingís': 'finges',

    # Imperativos vos → tú
    'mirá': 'mira',
    'soltá': 'suelta',
    'dejá': 'deja',
    'tomá': 'toma',
    'vení': 'ven',
    'andá': 've',
    'cuidá': 'cuida',
    'hacé': 'haz',
    'pensá': 'piensa',
    'decí': 'di',
    'respirá': 'respira',
    'escribí': 'escribe',
    'leé': 'lee',
    'pedí': 'pide',
    'recordá': 'recuerda',
    'tocá': 'toca',
    'sentí': 'siente',

    # Imperativos enclíticos vos → tú
    'recordate': 'acuérdate',
    'fijate': 'fíjate',
    'animate': 'anímate',
    'cuidate': 'cuídate',
    'permitite': 'permítete',
    'metete': 'métete',
    'apoyate': 'apóyate',
    'tratate': 'trátate',

    # "vos misma/o"
    'vos misma': 'tú misma',
    'vos mismo': 'tú mismo',

    # Adverbios
    'acá': 'aquí',
}

# Reemplazos en mayúsculas: solo aquellos que probablemente aparezcan
# al inicio de oración. Se generan automáticamente.
def with_capitalized(rep_map):
    out = dict(rep_map)
    for k, v in list(rep_map.items()):
        if k and k[0].isalpha():
            out[k.capitalize()] = v.capitalize()
    return out

REPLACEMENTS = with_capitalized(REPLACEMENTS)


def apply_replacements(text):
    """Aplica todos los reemplazos respetando boundaries de palabra
    para no romper código fuente."""
    # Procesamos los más largos primero para evitar conflictos
    # ('vos misma' antes de 'vos').
    keys = sorted(REPLACEMENTS.keys(), key=len, reverse=True)
    for k in keys:
        v = REPLACEMENTS[k]
        # \b funciona en general; para palabras que contienen tildes, usamos
        # un patrón más conservador con lookbehind/lookahead negados de letra.
        # Con \b en regex de Python las tildes funcionan correctamente con re.UNICODE
        # (default en Python 3).
        pattern = r'\b' + re.escape(k) + r'\b'
        text = re.sub(pattern, v, text, flags=re.UNICODE)
    return text


# El verbMap del bridge necesita regenerarse con conjugaciones a tú.
NEW_VERB_MAP_JS = """  const verbMap = {
    'soltar':       'sueltas',
    'sentir':       'sientes',
    'sentirte':     'te sientes',
    'sentirse':     'te sientes',
    'reconocer':    'reconoces',
    'reconocerte':  'te reconoces',
    'aceptar':      'aceptas',
    'aceptarte':    'te aceptas',
    'volver':       'vuelves',
    'volverte':     'te vuelves',
    'decir':        'dices',
    'hacer':        'haces',
    'mirar':        'miras',
    'mirarte':      'te miras',
    'elegir':       'eliges',
    'cambiar':      'cambias',
    'encontrar':    'encuentras',
    'encontrarte':  'te encuentras',
    'aprender':     'aprendes',
    'llorar':       'lloras',
    'asumir':       'asumes',
    'comprender':   'comprendes',
    'compartir':    'compartes',
    'escuchar':     'escuchas',
    'sostener':     'sostienes',
    'sostenerte':   'te sostienes',
    'pedir':        'pides',
    'ofrecer':      'ofreces',
    'cuidar':       'cuidas',
    'cuidarte':     'te cuidas',
    'cerrar':       'cierras',
    'abrir':        'abres',
    'perder':       'pierdes',
    'ganar':        'ganas',
    'buscar':       'buscas',
    'esperar':      'esperas',
    'tomar':        'tomas',
    'tomarte':      'te tomas',
    'tomarse':      'te tomas',
    'dar':          'das',
    'darte':        'te das',
    'vivir':        'vives',
    'seguir':       'sigues',
    'empezar':      'empiezas',
    'terminar':     'terminas',
    'aparecer':     'aparece',
    'salir':        'sales',
    'entrar':       'entras',
    'tener':        'tienes',
    'recibir':      'recibes',
    'permitir':     'permites',
    'permitirte':   'te permites',
    'permitirse':   'te permites',
    'recordar':     'recuerdas',
    'olvidar':      'olvidas',
    'pisar':        'pisas',
    'cocinar':      'cocinas',
    'cumplir':      'cumples',
    'manejar':      'manejas',
    'sumar':        'sumas',
    'sumarte':      'te sumas',
    'lanzar':       'lanzas',
    'lanzarte':     'te lanzas',
    'apuntar':      'apuntas',
    'apuntarte':    'te apuntas',
    'reorganizar':  'reorganizas',
    'reorganizarte':'te reorganizas',
    'anotar':       'anotas',
    'anotarte':     'te anotas',
    'anticipar':    'anticipas',
    'mediar':       'medias',
    'reconciliarse':'te reconcilias',
    'cargar':       'cargas',
    'cargarte':     'te cargas',
    'reservarte':   'te reservas',
    'editar':       'editas',
    'ahorrarse':    'te ahorras',
    'pelear':       'peleas',
    'pelearte':     'te peleas',
    'identificarte':'te identificas',
    'rechazar':     'rechazas',
    'apagar':       'apagas',
    'reducir':      'reduces',
    'planear':      'planeas',
    'avanzar':      'avanzas',
    'mantener':     'mantienes',
    'mantenerte':   'te mantienes',
    'recuperar':    'recuperas',
    'recuperarte':  'te recuperas',
    'defender':     'defiendes',
    'defenderte':   'te defiendes',
    'liderar':      'lideras',
    'inspirar':     'inspiras',
    'subirte':      'te subes',
    'bajar':        'bajas',
    'enviar':       'envías',
    'cabalgar':     'cabalgas',
    'mostrar':      'muestras',
    'mostrarte':    'te muestras',
    'celebrar':     'celebras',
    'confiar':      'confías',
    'pasar':        'pasas',
    'notar':        'notas',
    'levantar':     'levantas',
    'caer':         'caes',
    'jugar':        'juegas',
    'despertarte':  'te despiertas',
    'despertarse':  'te despiertas',
    'darse':        'te das',
    'organizar':    'organizas',
    'organizarte':  'te organizas',
    'reservar':     'reservas',
    'detenerte':    'te detienes',
    'detenerse':    'te detienes',
    'animarte':     'te animas',
    'mover':        'mueves',
    'moverte':      'te mueves',
    'moverse':      'te mueves',
    'crecer':       'creces',
    'florecer':     'floreces',
    'caminar':      'caminas',
    'subir':        'subes',
    'cruzar':       'cruzas',
    'cruzarte':     'te cruzas'
  }"""


FILES = [
    'src/content/majorArcanaSymbolic.js',
    'src/content/minorArcanaCards.js',
    'src/content/minorArcanaSuitSystem.js',
    'src/content/contentBridge.js',
    'src/engine/relationalEngine.js',
    'src/engine/celticReading.js',
    'src/engine/emotionalMemory.js',
    'src/engine/composeReading.js',
    'src/App.jsx',
]


def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if not os.path.exists(os.path.join(base, 'src')):
        # called from repo root
        base = os.path.abspath('.')

    total_changes = 0
    for rel in FILES:
        path = os.path.join(base, rel)
        if not os.path.exists(path):
            print(f'SKIP (no existe): {rel}')
            continue
        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()

        text = apply_replacements(original)

        # Reemplazar el verbMap del bridge específicamente
        if 'contentBridge.js' in rel:
            text = re.sub(
                r"  const verbMap = \{[^}]+\}",
                NEW_VERB_MAP_JS,
                text,
                count=1,
                flags=re.DOTALL
            )

        if text != original:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            # Reportar cambios aproximados (líneas distintas)
            diffs = sum(1 for a, b in zip(original.splitlines(), text.splitlines()) if a != b)
            total_changes += diffs
            print(f'{rel}: ~{diffs} líneas modificadas')
        else:
            print(f'{rel}: sin cambios')

    print(f'\nTOTAL líneas modificadas: ~{total_changes}')


if __name__ == '__main__':
    main()
