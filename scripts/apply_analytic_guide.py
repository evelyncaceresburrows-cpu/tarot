# -*- coding: utf-8 -*-
"""Aplica la Guía Analítica a majorArcanaSymbolic.js.

Para cada carta en el JSON de la guía, encuentra su bloque en el JS
y reemplaza los campos `manifestations` y `shadows` por contenido
mucho más concreto (microescenas humanas + sombra concreta).

Mantiene: essence, reading, synthesis, prompt, extension, positions,
visualSymbols, traditionalMeanings, archetypes, emotionalThemes.

Razón: estos otros campos ya fueron afinados en pasadas anteriores.
manifestations y shadows son los puntos donde el feedback fue más
crítico (frases vacías, abstracción).
"""
import json
import re
import os

JSON_PATH = r'E:\CARTAS\src\content\analyticGuide.json'
JS_PATH   = r'E:\CARTAS\src\content\majorArcanaSymbolic.js'

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    guide = json.load(f)['cards']

# Index por nombre normalizado
by_name = {}
for c in guide:
    n = c.get('name', '').strip()
    if n:
        by_name[n] = c

with open(JS_PATH, 'r', encoding='utf-8') as f:
    src = f.read()

def js_array(items):
    """Renderiza un array JS con strings entre comillas simples,
    cuidando escapes."""
    if not items:
        return '[]'
    body = ',\n      '.join("'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'" for s in items)
    return '[\n      ' + body + '\n    ]'

def build_shadow(card_data):
    """La sombra del JSON ya es muy concreta. Componemos 3 frases
    a partir de:
      - la sombra concreta principal
      - el riesgo de cliché (qué interpretación apresurada hay que evitar)
      - lo que NO debería decir una interpretación superficial
    Cada una se redacta como observación humana, no como advertencia."""
    out = []
    s = card_data.get('shadow', '').strip().rstrip('.')
    if s:
        # Convertir "Negligencia pura..." en "Cuando aparece como negligencia..."
        out.append(s.capitalize() + '.')
    cl = card_data.get('clicheRisk', '').strip().rstrip('.')
    if cl:
        out.append('El riesgo es leerla como ' + cl[0].lower() + cl[1:] + '.')
    nodecir = card_data.get('whatNotToSay', '').strip().rstrip('.')
    if nodecir:
        # Las frases en whatNotToSay vienen entre comillas, las dejamos como están
        out.append('Conviene no caer en ' + nodecir + '.')
    return out

def replace_block(src, card_name, new_manifs, new_shadows):
    """Encuentra el bloque de una carta por su nombre y reemplaza
    los arrays `manifestations` y `shadows` dentro de ese bloque."""
    # Patrón para empezar bloque
    name_pat = re.escape(card_name)
    # Buscar el bloque desde "name: 'X'" hasta el siguiente "name: '" o end
    block_match = re.search(
        r"name:\s*'" + name_pat + r"'.*?(?=\n  \{|\n\]\s*$)",
        src, re.DOTALL
    )
    if not block_match:
        print(f'NOT FOUND: {card_name}')
        return src

    block = block_match.group(0)
    block_start = block_match.start()
    block_end   = block_match.end()

    # Reemplazar manifestations
    manifs_str = 'manifestations: ' + js_array(new_manifs)
    new_block = re.sub(
        r"manifestations:\s*\[[^\]]*\]",
        lambda m: manifs_str,
        block,
        count=1,
        flags=re.DOTALL
    )

    # Reemplazar shadows
    shadows_str = 'shadows: ' + js_array(new_shadows)
    new_block = re.sub(
        r"shadows:\s*\[[^\]]*\]",
        lambda m: shadows_str,
        new_block,
        count=1,
        flags=re.DOTALL
    )

    return src[:block_start] + new_block + src[block_end:]


changed = 0
skipped = []
for name, data in by_name.items():
    sits = data.get('humanSituations', [])
    if len(sits) < 2:
        skipped.append((name, 'pocas situaciones'))
        continue
    new_shadows = build_shadow(data)
    if not new_shadows:
        skipped.append((name, 'sin sombra'))
        continue

    new_src = replace_block(src, name, sits, new_shadows)
    if new_src != src:
        src = new_src
        changed += 1
        print(f'OK  {name}: {len(sits)} manifestations + {len(new_shadows)} shadows')
    else:
        skipped.append((name, 'no aplicó'))

with open(JS_PATH, 'w', encoding='utf-8') as f:
    f.write(src)

print(f'\nTotal cambiadas: {changed}')
if skipped:
    print('Skipped:')
    for n, r in skipped:
        print(f'  - {n}: {r}')
