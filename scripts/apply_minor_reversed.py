# -*- coding: utf-8 -*-
"""
Inyecta el bloque `reversed: { ... }` dentro de cada carta de minorArcanaCards.js
a partir de un JSON de datos.

Lee:  scripts/reversed_minors_data.json
Edita: src/content/minorArcanaCards.js  (en el lugar)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JS_PATH = ROOT / "src" / "content" / "minorArcanaCards.js"
DATA_PATH = ROOT / "scripts" / "reversed_minors_data.json"

def js_quote(s):
    """Comillas dobles seguras para JS, escapando \\ y \" """
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

def build_reversed_block(rev):
    manifs = ",\n        ".join(js_quote(x) for x in rev["manifestations"])
    shads  = ",\n        ".join(js_quote(x) for x in rev["shadows"])
    return (
        "      reversed: {\n"
        f"        essence:   {js_quote(rev['essence'])},\n"
        f"        reading:   {js_quote(rev['reading'])},\n"
        f"        synthesis: {js_quote(rev['synthesis'])},\n"
        f"        prompt:    {js_quote(rev['prompt'])},\n"
        "        manifestations: [\n"
        f"          {manifs.replace(chr(10) + '        ', chr(10) + '          ')}\n"
        "        ],\n"
        "        shadows: [\n"
        f"          {shads.replace(chr(10) + '        ', chr(10) + '          ')}\n"
        "        ]\n"
        "      }"
    )

def find_card_block(src, suit, number):
    """
    Encuentra inicio y fin del bloque `Number: { ... }` dentro del palo Suit.
    Devuelve (start_idx, end_idx_inclusive_of_closing_brace).
    """
    # Localizar el palo
    suit_match = re.search(rf"^\s*{suit}: \{{", src, re.M)
    if not suit_match:
        raise RuntimeError(f"No se encontró palo {suit}")
    suit_start = suit_match.end()

    # Encontrar el final del palo (cerrar { ... })
    depth = 1
    i = suit_start
    while i < len(src) and depth > 0:
        c = src[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                suit_end = i
                break
        i += 1
    else:
        raise RuntimeError(f"No se cerró el palo {suit}")

    # Buscar dentro del palo el inicio de la carta `    Number: {`
    suit_body = src[suit_start:suit_end]
    card_match = re.search(rf"\n    {number}: \{{", suit_body)
    if not card_match:
        raise RuntimeError(f"No se encontró carta {suit}.{number}")
    card_start_in_body = card_match.start()
    card_open_brace = card_match.end() - 1  # posición del `{`

    # Walk braces para encontrar `}` de cierre de la carta
    depth = 1
    j = card_open_brace + 1
    while j < len(suit_body) and depth > 0:
        c = suit_body[j]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                card_close = j
                break
        j += 1
    else:
        raise RuntimeError(f"No se cerró la carta {suit}.{number}")

    card_global_start = suit_start + card_start_in_body  # comienza con \n
    card_global_close = suit_start + card_close          # posición del `}`
    return card_global_start, card_global_close

def insert_reversed(src, suit, number, rev):
    start, close_brace_idx = find_card_block(src, suit, number)
    block = build_reversed_block(rev)
    # Insertar antes del `}`. Necesitamos coma después del último campo y la indentación correcta.
    # Encontramos el último carácter no-blanco antes del `}`
    k = close_brace_idx - 1
    while k > start and src[k] in " \t\r\n":
        k -= 1
    # src[k] es el último char (probablemente `]` de shadows)
    # Insertamos: ",\n" + block + "\n    " antes del `}`
    insertion = ",\n" + block + "\n    "
    new_src = src[:k+1] + insertion + src[close_brace_idx:]
    return new_src

def main():
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    src = JS_PATH.read_text(encoding="utf-8")

    inserted = 0
    skipped = 0
    for suit, cards in data.items():
        for number, rev in cards.items():
            # Si ya tiene reversed, saltar
            try:
                start, close = find_card_block(src, suit, number)
            except RuntimeError as e:
                print(f"WARN: {e}")
                skipped += 1
                continue
            block = src[start:close+1]
            if "reversed:" in block:
                print(f"SKIP {suit}.{number} (ya tiene reversed)")
                skipped += 1
                continue
            src = insert_reversed(src, suit, number, rev)
            inserted += 1
            print(f"OK   {suit}.{number}")

    JS_PATH.write_text(src, encoding="utf-8")
    print(f"\nDONE · insertadas {inserted} · saltadas {skipped}")

if __name__ == "__main__":
    main()
