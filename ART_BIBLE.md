# Art Bible — Tarot Ade

Documento normativo de dirección visual. Toda decisión estética de la app
se mide contra este documento.

---

## Dirección estética general

La app es:

- un manuscrito nocturno interactivo
- una edición de lujo de tarot
- una interfaz editorial ceremonial
- una experiencia contemplativa y cinematográfica

La app no es:

- SaaS
- app espiritual genérica
- fantasy game
- UI moderna estándar
- witchtok aesthetic

---

## Paleta

**Base** (variables Tailwind):

| token | hex | uso |
|-------|-----|-----|
| `noche`     | `#0D1B2A` | fondo principal nocturno |
| `nocheAlt`  | `#13243A` | fondo secundario, capas |
| `carbon`    | `#1A1A1A` | negro cálido, divisores |
| `marfil`    | `#F4F1E6` | tipografía sobre claro, papel de cartas |
| `pergamino` | `#EAE6DC` | tipografía cuerpo |

**Acentos**:

| token | hex | uso |
|-------|-----|-----|
| `dorado`    | `#C6A85A` | títulos, dividers, halos, hairlines |
| `doradoAlt` | `#A88B45` | dorado más profundo, manos rituales |
| `vino`      | `#7A1E2C` | botones primarios, acento profundo |
| `vinoAlt`   | `#5C1620` | sombras de botones, profundidad |

**Prohibido**:

- dorado amarillo brillante (`#FFD700`, `#FFC107`)
- violeta neon
- cyan
- magenta
- verde lima
- gradients modernos saturados (Stripe, Linear)
- glow exagerado (`box-shadow` con blur > 30px sobre colores saturados)
- gradients tipo "instagram"

---

## Iluminación

Toda la app debe sentirse:

- iluminación tenue
- glow cálido mínimo
- sensación de vela distante
- sombras suaves
- contraste cinematográfico

Implementaciones disponibles en `src/index.css`:

| clase | función |
|-------|---------|
| `.ritual-bg`       | fondo principal nocturno con vignette + grano |
| `.ritual-bg-light` | fondo claro para Detalle |
| `.constellation`   | puntos dorados tenues sobre fondo |
| `.candle-glow`     | halo cálido detrás de la carta destacada |
| `.card-halo`       | halo cinematográfico para carta principal en home/detalle |
| `.atmo-haze`       | niebla cálida casi imperceptible |
| `.atmo-dust`       | polvo lumínico ascendente, partículas lentas |
| `.atmo-star`       | estrellas tenues que parpadean (delay configurable) |
| `.ritual-breath`   | pulso muy lento de 7s para halos |
| `.shadow-ritual`   | sombra cálida cinematográfica para cartas |
| `.paper-texture`   | textura de papel antiguo sutil (blend multiply) |
| `.btn-ritual`      | botón primario editorial |
| `.btn-ghost-ritual`| botón secundario translúcido |
| `.card-tilt`       | tilt 3D sutil en hover (perspectiva 900px) |

**Nunca**: pantallas planas, luz uniforme, glow exagerado.

---

## Tipografía

**Títulos** — serif elegante de lujo:

- Cormorant Garamond (en uso)
- Espaciado amplio: `tracking-[0.22em]` mínimo, `tracking-[0.38em]` en titulares.
- Mayúsculas con tracking grande.
- Peso: `font-light` para títulos grandes; `font-medium` solo para microcaps editoriales.

**Texto secundario** — sans limpia editorial:

- Inter (recomendado)
- Tono silencioso, peso bajo (`font-light` por defecto, `font-medium` solo cuando hace falta jerarquía).

**Patrón editorial** estándar para encabezados pequeños tipo "lo que se abre":

```
text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium
```

**Patrón** para tipografía de cuerpo:

```
font-light text-pergamino/85 text-[0.94rem] leading-[1.95]
```

**Patrón** para frases tipo tesis / cierre — italic dorado fuerte:

```
font-serif italic text-dorado/95 text-[1.06rem] leading-[1.7]
```

---

## Composición

La UI respira.

- Mucho espacio negativo. `max-w-[32rem]` a `max-w-[40rem]` para cuerpos textuales.
- Centrado: `mx-auto` con `text-center` solo en aperturas y cierres; el cuerpo respira mejor con left-align.
- Composición vertical ceremonial: encabezados pequeños sobre el bloque, no a la izquierda.
- Ritmo lento: `space-y-7` a `space-y-9` entre secciones.
- Simetría imperfecta: el `card-tilt` rompe levemente la simetría perfecta y hace que el ojo no se aburra.

**No llenar la pantalla.** Si una sección no tiene contenido propio (núcleo, tensión, invertidas), se omite. El silencio es preferible al relleno.

---

## Texturas

Sutiles, multiply, opacidad baja. Implementadas como pseudo-elementos para no inflar el DOM.

| efecto | implementación |
|--------|----------------|
| Papel antiguo | `.paper-texture` — fractalNoise SVG con blend multiply, opacity 0.55 |
| Grano cinematográfico | `.ritual-bg::after` — fractalNoise sobre fondo, mix-blend-mode: overlay |
| Polvo lumínico | `.atmo-dust` — box-shadow múltiple animado verticalmente |
| Niebla cálida | `.atmo-haze` — radial-gradient con filter: blur(20px) |

**Nunca**: texturas pesadas, fantasy recargado, patrones repetitivos visibles.

---

## Elementos decorativos

Toda decoración es **discreta y refinada**:

| componente | propósito |
|-----------|-----------|
| `<StarTiny />`         | estrella de 4 puntas, pequeña, para viñetas |
| `<StarDivider />`      | divisor editorial línea — estrella — línea |
| `<LunarPhasesRow />`   | fases lunares horizontales sobre títulos |
| `<ConstellationPatch />` | puntos dorados casi invisibles |
| `<GlyphCopa />` etc.   | símbolos de palo en esquinas, opacity 0.04-0.07 |
| `<CompassStar />`      | rosa de vientos editorial |
| `<AdeGlyph />`         | el familiar ritual, oriental shorthair en cobre |

Todos los elementos decorativos tienen **opacidad baja** (entre `0.04` y `0.28`) y se sienten parte del fondo, no del primer plano.

---

## Cartas

Las cartas NO son imágenes UI. Son **objetos sagrados digitales**.

Cada carta debe sentirse: física, pesada, iluminada, importante, táctil.

Implementación actual (`CartaMarco`):

- `shadow-ritual` — sombra cinematográfica cálida con leve vino inset
- `paper-texture` — fractal noise multiply sobre toda la carta
- Gradiente cálido superior dentro de la carta (luz cayendo sobre el papel)
- Sombra inferior interna (la carta proyecta sombra sobre lo que tiene debajo)
- `card-halo` + `card-tilt` opcional para la carta destacada en home/detalle

`CardBackTile` durante el barajado:

- Sombra entre cartas calculada según `stackIndex` y `stackTotal`
- Brillo cálido superior más fuerte en cartas de arriba del stack
- Sombra interna lateral mayor en cartas comprimidas del centro
- Borde dorado tenue (inset 0.5px), no ring uniforme

`DeckStack` (mazo durante el barajado):

- 14 cartas con jitter determinístico por índice
- Microvariaciones de rotación (-2.1° a +2.1°)
- Offset lateral y vertical determinístico
- Presión del centro: gap variable según distancia al centro
- Respiración del conjunto (`scale` 0.997 ↔ 1.002 cada 7s)
- Timing diferenciado entre cartas

---

## Referencias visuales

La referencia visual mezcla:

- tarot Rider-Waite
- manuscritos alquímicos
- diseño editorial de lujo
- cine contemplativo
- interfaces atmosféricas (bibliotecas antiguas, objetos rituales)

Referencias emocionales: *The Green Knight*, *Nine Sols*, *Scavengers Reign*, libros de Jung, códices antiguos, tarot ceremonial europeo.

---

## Voz y tono

Aunque no es estrictamente "visual", el tono editorial es parte de la dirección:

- Sin frases genéricas tipo "descubre tu destino", "el universo tiene un mensaje", "conócete".
- Frases contemplativas, ambiguas, poéticas, silenciosas.
- "Las cartas no adivinan. Revelan."
- Comportamientos humanos concretos, no abstracciones.

Linter automático en `scripts/check_voseo.py` — español neutro siempre (tú/ti, no vos).

---

## Patrones que están prohibidos por defecto

Quedan vetados sin discusión previa:

- `linear-gradient` con > 3 stops y colores saturados
- `box-shadow` con `blur > 30px` sobre colores no-noche/dorado/vino
- `text-shadow` con glow
- `backdrop-filter: blur(20px)+` (glassmorphism agresivo)
- emojis en UI principal
- iconos cartoony o con outline grueso
- bordes con `border-radius > 12px` salvo en cartas (5px) y modals (8px)
- bg con `from-X to-Y` arcoíris

---

## Objetivo emocional

La app debe generar sensación de:
**silencio + misterio + contemplación + intimidad + ritual**.

El usuario debe sentir: *"entré a un espacio distinto"*.

— fin del documento.
