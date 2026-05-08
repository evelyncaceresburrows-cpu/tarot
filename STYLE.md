# Reglas de estilo · Tarot ADE

## Idioma: español neutro (no rioplatense)

Evelyn vive en Chile. La app habla a un público hispanohablante general.
Todo el contenido —datasets, motores, UI— debe usar **español neutro**.

### Prohibido

| Categoría             | Mal (voseo)                                | Bien (neutro)                       |
| --------------------- | ------------------------------------------ | ----------------------------------- |
| Pronombre             | vos                                        | tú                                  |
| Tras preposición      | para vos / en vos / con vos                | para ti / en ti / contigo           |
| Verbos 2ª persona     | tenés, querés, podés, sabés, sentís, decís | tienes, quieres, puedes, sabes, sientes, dices |
| Verbos -ar            | mirás, dejás, soltás, llegás               | miras, dejas, sueltas, llegas       |
| Verbos -er            | hacés, perdés, leés                        | haces, pierdes, lees                |
| Imperativos           | mirá, soltá, dejá, vení, andá              | mira, suelta, deja, ven, ve         |
| Imperativos enclíticos| fijate, animate, cuidate, permitite        | fíjate, anímate, cuídate, permítete |
| Adverbio              | acá                                        | aquí                                |

### Permitido (no es voseo)

- Posesivos: **tu / tuyo / tuya / tuyas / tuyos** son neutros y se usan igual
- "tuya" en *"esa parte tuya"*, *"esta versión tuya"* — válido
- Léxico común no marcado regionalmente

### Cómo verificarlo

```bash
python scripts/check_voseo.py
```

El script recorre `src/`, lista cualquier voseo restante por archivo y línea, y devuelve código de salida ≠ 0 si encuentra alguno.

Recomendado correrlo antes de cada commit que toque contenido escrito.

### Si necesitas convertir un texto entero

```bash
python scripts/to_neutral_spanish.py
```

Aplica reemplazos masivos. **Cuidado:** revisa el output con el linter después; algunas conjugaciones especiales pueden requerir mano humana.

---

## Otros lineamientos rápidos

- **No frases vacías**: prohibidas frases como *"hay cambios"*, *"una parte de ti"*, *"energías"*, *"procesos internos"*, *"algo se está transformando"*. Si una frase puede aplicar a cualquier carta, reescribirla.
- **Microescenas concretas**: las `manifestations` deben ser situaciones reconocibles (*"renunciar a un trabajo sin tener plan B"*), no abstractas.
- **Imagen visual primero**: cada `essence` debería arrancar de un detalle concreto de la lámina Rider-Waite.
- **Prompt abierto, no cerrado**: las preguntas finales sugieren, no diagnostican.
