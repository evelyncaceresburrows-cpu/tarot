# -*- coding: utf-8 -*-
"""Neutraliza 'ti misma' / 'tú misma' / 'contigo misma' a formas neutras."""
import os

PATHS = [
    'src/content/minorArcanaCards.js',
    'src/content/majorArcanaSymbolic.js',
    'src/engine/relationalEngine.js',
    'src/engine/narrativeComposer.js',
    'src/engine/celticReading.js',
]

# Reglas ordenadas: las más específicas (frases largas) primero.
FIXES = [
    ('¿Con quién —incluso tú misma—', '¿Con quién, incluso contigo,'),
    ('alguien o contigo misma', 'alguien o contigo'),
    ('Quedar atrapada en una versión vieja de ti misma', 'Volver a una versión vieja tuya'),
    ('Quedar inmovilizada por una versión vieja de ti misma', 'Volver, sin querer, a una versión vieja tuya'),
    ('hostigamiento — al proyecto, al otro, a ti misma', 'hostigamiento — al proyecto, al otro, a ti'),
    ('una conversación tuya con ti misma', 'una conversación contigo'),
    ('conversación tuya con ti misma', 'conversación contigo'),
    ('peleando contigo misma', 'peleando contigo'),
    ('encerraste en ti misma', 'encerraste en ti'),
    ('liderarte a ti misma', 'liderarte'),
    ('escuchar de ti misma', 'escuchar de ti'),
    ('Paciencia contigo misma', 'Paciencia con uno mismo'),
    ('sin moverte un milímetro tú misma', 'sin moverte un milímetro'),
    ('coherencia profunda contigo misma', 'coherencia profunda contigo'),
    ('hueco a ti misma', 'hueco a ti'),
    ('sobre ti misma', 'sobre ti'),
    ('a ti misma', 'a ti'),
    ('en ti misma', 'en ti'),
    ('tú misma', 'tú'),
    ('contigo misma', 'contigo'),
    ('consigo misma', 'consigo'),
]

total = 0
for p in PATHS:
    with open(p, encoding='utf-8') as f:
        s = f.read()
    n = 0
    for a, b in FIXES:
        if a in s:
            cnt = s.count(a)
            s = s.replace(a, b)
            n += cnt
    if n > 0:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(s)
        print(f'{p}: {n} reemplazos')
        total += n
print(f'TOTAL: {total}')
