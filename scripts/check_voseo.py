# -*- coding: utf-8 -*-
"""Linter de voseo · Tarot ADE.

Recorre src/ buscando marcas rioplatenses (voseo verbal, pronombre 'vos',
'acá', construcciones tipo 'para tú') y las reporta con archivo + línea.

Devuelve código de salida 0 si está limpio, 1 si encontró algo.

Uso:
    python scripts/check_voseo.py            # reporta y devuelve código
    python scripts/check_voseo.py --quiet    # solo código de salida

Recomendado correr antes de cada commit que toque contenido escrito.
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC  = os.path.join(ROOT, 'src')

# Patrones que indican voseo o regionalismos
VOSEO_PATTERNS = [
    # Pronombre y construcciones de pronombre
    (r'\bvos\b',                              'pronombre vos → tú'),
    (r'\bpara tú\b',                          'para tú → para ti'),
    (r'\ben tú\b',                            'en tú → en ti'),
    (r'\bcon tú\b',                           'con tú → contigo'),
    (r'\ba tú\b',                             'a tú → a ti'),
    (r'\bde tú\b',                            'de tú → de ti'),
    (r'\bpor tú\b',                           'por tú → por ti'),
    (r'\bsobre tú\b',                         'sobre tú → sobre ti'),
    (r'\bhacia tú\b',                         'hacia tú → hacia ti'),
    (r'\bsin tú\b',                           'sin tú → sin ti'),
    (r'\bdesde tú\b',                         'desde tú → desde ti'),
    (r'\bcontra tú\b',                        'contra tú → contra ti'),

    # Verbos voseados típicos (-és, -ás, -ís final acentuado)
    (r'\b(tenés|querés|podés|sabés|sentís|decís|elegís|sostenés|reconocés|aceptás|cuidás|aprendés|llorás|asumís|comprendés|compartís|escuchás|pedís|ofrecés|cerrás|abrís|perdés|ganás|buscás|esperás|tomás|seguís|empezás|terminás|recibís|permitís|recordás|olvidás|llegás|hacés|encontrás|cambiás|despertás|creés|leés|venís|llevás|movés|crecés|caminás|cruzás|salís|entrás|volvés|obtenés|defendés|liderás|peleás|notás|pasás|jugás|caés|llamás|frenás|firmás|mostrás|temés|vivís)\b',
        'verbo voseado'),

    # Imperativos típicos
    (r'\b(mirá|soltá|dejá|tomá|vení|andá|cuidá|hacé|pensá|decí|respirá|escribí|leé|tocá|sentí|pedí|recordá)\b',
        'imperativo voseado'),

    # Imperativos enclíticos voseados — sin tilde (los tildados son neutro)
    # NOTA: 'animate' SIN tilde es prop de framer-motion (no voseo). Sólo
    # marcamos los que aparecen dentro de string literal de prosa.
    # Heurística: detectar 'fijate', 'recordate', 'cuidate', 'permitite',
    # 'metete', 'apoyate', 'tratate' (todos sin tilde) — esos son voseo.
    # 'animate' lo excluimos del set por colisión con la prop.
    (r'\b(fijate|recordate|cuidate|permitite|metete|apoyate|tratate)\b',
        'imperativo enclítico voseado'),

    # Adverbio
    (r'\bacá\b',                              'acá → aquí'),
]

# Archivos / extensiones a inspeccionar
SCAN_EXTENSIONS = ('.js', '.jsx', '.json', '.md')

# Excluir
SKIP_DIRS  = {'node_modules', 'dist', 'dist-preview', '.vercel', '.git'}
SKIP_FILES = {
    # archivos donde voseo es válido (mapas de origen → destino)
    'to_neutral_spanish.py',
    'check_voseo.py',
    'STYLE.md',
    # archivo legacy reemplazado por majorArcanaSymbolic.js — ya no se importa
    'majorArcana.js',
}


def scan_file(path):
    """Devuelve lista de (linea, columna, snippet, descripción)."""
    findings = []
    try:
        with open(path, 'r', encoding='utf-8') as f:
            for lineno, line in enumerate(f, start=1):
                for pat, desc in VOSEO_PATTERNS:
                    for m in re.finditer(pat, line):
                        findings.append((lineno, m.start() + 1, line.rstrip(), desc, m.group(0)))
    except Exception as e:
        print(f'  ERR leyendo {path}: {e}', file=sys.stderr)
    return findings


def main():
    quiet = '--quiet' in sys.argv

    total = 0
    files_with_issues = 0

    for root, dirs, files in os.walk(SRC):
        # podar carpetas
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fname in files:
            if fname in SKIP_FILES:
                continue
            if not fname.endswith(SCAN_EXTENSIONS):
                continue
            path = os.path.join(root, fname)
            findings = scan_file(path)
            if not findings:
                continue
            files_with_issues += 1
            total += len(findings)
            if not quiet:
                rel = os.path.relpath(path, ROOT)
                print(f'\n{rel}:')
                for lineno, col, snippet, desc, match in findings:
                    print(f'  L{lineno}:{col}  [{match}]  {desc}')

    if total == 0:
        if not quiet:
            print('OK · sin voseo detectado en src/')
        return 0
    else:
        if not quiet:
            print(f'\nFALLO · {total} ocurrencias de voseo en {files_with_issues} archivos.')
            print('   Corrige antes de commit.  Ver STYLE.md para la tabla completa.')
        return 1


if __name__ == '__main__':
    sys.exit(main())
