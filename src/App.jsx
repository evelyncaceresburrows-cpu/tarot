import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, RotateCcw, Sun, Sparkles, Bookmark, Share2, Copy, Check, X } from 'lucide-react'
import {
  findContentByCard,
  findPositionByCard,
  toEngineCard,
  spreadPositions,
  composeSituations
} from './content/contentBridge.js'
import { composeRelationalReading } from './engine/relationalEngine.js'
import { saveAtmosphere, composeEchoLine } from './engine/emotionalMemory.js'
import {
  CELTIC_POSITIONS,
  CELTIC_POSITION_COUNT,
  composeCardWhisper,
  composeCelticReading
} from './engine/celticReading.js'

const ARCANOS_MAYORES = [
  { num: 0,  romano: '0',     nombre: 'El Loco',                 file: '00-el-loco.png',
    keywords: ['salto', 'inocencia', 'comienzo'],
    derecho: 'Una invitación al primer paso, sin garantías. La fe que no necesita conocer el camino.',
    invertido: 'Quizá un salto sin pausa, o el miedo a saltar. Conviene mirar el borde antes de avanzar.' },
  { num: 1,  romano: 'I',     nombre: 'El Mago',                 file: '01-el-mago.png',
    keywords: ['intención', 'voluntad', 'inicio'],
    derecho: 'Las herramientas ya están sobre la mesa. Lo que falta es decisión y voluntad concreta.',
    invertido: 'Podría señalar dispersión, intenciones poco claras, o un poder ejercido sin propósito.' },
  { num: 2,  romano: 'II',    nombre: 'La Sacerdotisa',          file: '02-la-sacerdotisa.png',
    keywords: ['silencio', 'intuición', 'misterio'],
    derecho: 'Un saber que no se enuncia. Escuchar adentro antes de pedir respuestas afuera.',
    invertido: 'Sugiere una intuición silenciada, secretos que pesan, o un alejamiento del propio centro.' },
  { num: 3,  romano: 'III',   nombre: 'La Emperatriz',           file: '03-la-emperatriz.png',
    keywords: ['fertilidad', 'cuidado', 'creación'],
    derecho: 'Una abundancia tranquila. Crear, cuidar, dejar madurar lo que ya está sembrado.',
    invertido: 'Cuidado convertido en sobrecarga, o una creatividad bloqueada que pide aire.' },
  { num: 4,  romano: 'IV',    nombre: 'El Emperador',            file: '04-el-emperador.png',
    keywords: ['estructura', 'autoridad', 'orden'],
    derecho: 'Estructura como cobijo. Sostener un orden que permita a otras cosas florecer.',
    invertido: 'Rigidez, control que asfixia, o autoridad que ya no resuena con el momento presente.' },
  { num: 5,  romano: 'V',     nombre: 'El Hierofante',           file: '05-el-hierofante.png',
    keywords: ['tradición', 'enseñanza', 'marco'],
    derecho: 'Las tradiciones recibidas, los marcos heredados. Algo se aprende mejor con un guía.',
    invertido: 'Una norma que ya no cabe, o un deseo legítimo de pensar fuera de lo enseñado.' },
  { num: 6,  romano: 'VI',    nombre: 'Los Enamorados',          file: '06-los-enamorados.png',
    keywords: ['elección', 'vínculo', 'sí íntimo'],
    derecho: 'Una elección que define. No solo un vínculo: un sí íntimo a una manera de habitar.',
    invertido: 'Indecisión, vínculos que no se nombran, o una tentación que pide ser escuchada despacio.' },
  { num: 7,  romano: 'VII',   nombre: 'El Carro',                file: '07-el-carro.png',
    keywords: ['dirección', 'voluntad', 'avance'],
    derecho: 'Avanzar reuniendo fuerzas opuestas. Una dirección clara aunque el viento sople de costado.',
    invertido: 'Empuje sin timón, o una voluntad gastada en luchas que ya no hace falta sostener.' },
  { num: 8,  romano: 'VIII',  nombre: 'La Fuerza',               file: '08-la-fuerza.png',
    keywords: ['ternura', 'coraje', 'paciencia'],
    derecho: 'Una potencia serena. Domar la impaciencia con ternura más que con dureza.',
    invertido: 'Quizá un cansancio profundo, dudas sobre la propia capacidad, o reacciones desbordadas.' },
  { num: 9,  romano: 'IX',    nombre: 'El Ermitaño',             file: '09-el-ermitano.png',
    keywords: ['retiro', 'lámpara', 'pausa'],
    derecho: 'Pausa, retiro, lámpara propia. Un tiempo necesario lejos del ruido para volver a oírse.',
    invertido: 'Soledad que se vuelve aislamiento, o una resistencia a pedir compañía cuando hace falta.' },
  { num: 10, romano: 'X',     nombre: 'La Rueda de la Fortuna',  file: '10-la-rueda-fortuna.png',
    keywords: ['ciclo', 'giro', 'azar'],
    derecho: 'Algo gira. Lo que parecía fijo cambia de lugar y abre una posibilidad inesperada.',
    invertido: 'Una resistencia al ciclo. Insistir en lo que termina puede demorar lo que ya quiere venir.' },
  { num: 11, romano: 'XI',    nombre: 'La Justicia',             file: '11-la-justicia.png',
    keywords: ['balance', 'verdad', 'consecuencia'],
    derecho: 'Una mirada equilibrada. Reconocer consecuencias, asumir lo propio, ajustar la balanza.',
    invertido: 'Sesgo, postergación de una decisión justa, o un trato consigo mismo más severo de lo necesario.' },
  { num: 12, romano: 'XII',   nombre: 'El Colgado',              file: '12-el-colgado.png',
    keywords: ['pausa', 'perspectiva', 'rendición'],
    derecho: 'Una pausa invertida. Mirar lo mismo desde otro ángulo cambia lo que parecía evidente.',
    invertido: 'Suspensión que se alarga, sacrificios que ya no enseñan, o miedo a soltar lo conocido.' },
  { num: 13, romano: 'XIII',  nombre: 'La Muerte',               file: '13-la-muerte.png',
    keywords: ['umbral', 'fin', 'transformación'],
    derecho: 'Un final que es también umbral. Lo que termina hace lugar para lo que aún no tiene nombre.',
    invertido: 'Una transición demorada, o un duelo que pide ser nombrado para empezar a moverse.' },
  { num: 14, romano: 'XIV',   nombre: 'La Templanza',            file: '14-la-templanza.png',
    keywords: ['mezcla', 'medida', 'paciencia'],
    derecho: 'Una mezcla justa. Combinar elementos opuestos a fuego lento hasta que encuentren su medida.',
    invertido: 'Excesos, prisas, o una falta de paciencia con procesos que necesitan más tiempo del esperado.' },
  { num: 15, romano: 'XV',    nombre: 'El Diablo',               file: '15-el-diablo.png',
    keywords: ['cadena', 'apego', 'sombra'],
    derecho: 'Aquello que ata por costumbre. Las cadenas que ya están abiertas si se mira de cerca.',
    invertido: 'Un primer movimiento de liberación. Un patrón empieza a aflojarse, aunque todavía pese.' },
  { num: 16, romano: 'XVI',   nombre: 'La Torre',                file: '16-la-torre.png',
    keywords: ['ruptura', 'verdad', 'sacudida'],
    derecho: 'Una estructura que cae sola para mostrar lo que estaba debajo. Una verdad que no se evita más.',
    invertido: 'Un derrumbe contenido, una crisis aplazada, o una grieta que pide ser nombrada antes de crecer.' },
  { num: 17, romano: 'XVII',  nombre: 'La Estrella',             file: '17-la-estrella.png',
    keywords: ['esperanza', 'calma', 'fe'],
    derecho: 'Una calma después del temblor. Esperanza tranquila, no garantizada, pero suficiente.',
    invertido: 'Desánimo, fe que titubea, o una desconexión con aquello que antes orientaba.' },
  { num: 18, romano: 'XVIII', nombre: 'La Luna',                 file: '18-la-luna.png',
    keywords: ['niebla', 'sueño', 'intuición'],
    derecho: 'Niebla y sueño. Lo que se intuye pero todavía no se ve. Conviene avanzar despacio.',
    invertido: 'Confusiones que se aclaran, o miedos antiguos que pierden el peso que tenían.' },
  { num: 19, romano: 'XIX',   nombre: 'El Sol',                  file: '19-el-sol.png',
    keywords: ['claridad', 'alegría', 'evidencia'],
    derecho: 'Una claridad simple. Algo se nombra sin sombra, con la alegría que da lo evidente.',
    invertido: 'Una luz parcial, optimismo forzado, o una postergación de algo bueno por dudar de merecerlo.' },
  { num: 20, romano: 'XX',    nombre: 'El Juicio',               file: '20-el-juicio.png',
    keywords: ['llamada', 'revisión', 'renacer'],
    derecho: 'Un llamado interior. Algo en una vida pide ser revisado y, tal vez, vuelto a empezar.',
    invertido: 'Resistencia al cambio, una autocrítica que no enseña, o un perdón pendiente.' },
  { num: 21, romano: 'XXI',   nombre: 'El Mundo',                file: '21-el-mundo.png',
    keywords: ['cierre', 'integración', 'plenitud'],
    derecho: 'Un cierre integrado. Lo aprendido se vuelve cuerpo. Un ciclo se completa con calma.',
    invertido: 'Algo casi listo. Falta un gesto pequeño para que el ciclo se cierre del todo.' }
].map(c => ({
  ...c,
  id: `M${String(c.num).padStart(2, '0')}`,
  arcano: 'mayor',
  paloKey: 'arcanos',
  paloLabel: 'Arcanos Mayores',
  src: `/cards/ArcanosMayores/${c.file}`
}))

const PALOS = [
  { key: 'copas',   label: 'Copas',   folder: 'Copas',   tema: 'lo emocional, las relaciones, lo que se siente' },
  { key: 'oros',    label: 'Oros',    folder: 'Oros',    tema: 'lo material, el cuerpo, lo concreto' },
  { key: 'espadas', label: 'Espadas', folder: 'Espadas', tema: 'el pensamiento, la palabra, las decisiones' },
  { key: 'bastos',  label: 'Bastos',  folder: 'Bastos',  tema: 'la acción, la voluntad, lo creativo' }
]

const VALORES = [
  { num: 1,  romano: 'I',    slug: '01-as',     nombre: 'As',         keywords: ['semilla', 'comienzo', 'potencia'],
    derecho: 'una semilla, un comienzo silencioso en {tema}',
    invertido: 'un comienzo postergado o una intuición que aún no encuentra forma' },
  { num: 2,  romano: 'II',   slug: '02',        nombre: 'Dos',        keywords: ['pausa', 'duda', 'elección'],
    derecho: 'dos posibilidades en {tema}, una pausa antes de elegir',
    invertido: 'una indecisión que se alarga o un equilibrio fingido' },
  { num: 3,  romano: 'III',  slug: '03',        nombre: 'Tres',       keywords: ['encuentro', 'expansión', 'fertilidad'],
    derecho: 'una primera floración en {tema}, un encuentro fértil',
    invertido: 'una expansión que se desarma o un trabajo aún sin frutos visibles' },
  { num: 4,  romano: 'IV',   slug: '04',        nombre: 'Cuatro',     keywords: ['estructura', 'pausa', 'estabilidad'],
    derecho: 'una estructura, una pausa para descansar en {tema}',
    invertido: 'rigidez, refugio que se vuelve trampa, o pereza disfrazada de calma' },
  { num: 5,  romano: 'V',    slug: '05',        nombre: 'Cinco',      keywords: ['grieta', 'tensión', 'desorden'],
    derecho: 'una grieta, un desorden necesario en {tema}',
    invertido: 'el final del conflicto, o una dificultad que se enquista' },
  { num: 6,  romano: 'VI',   slug: '06',        nombre: 'Seis',       keywords: ['armonía', 'reciprocidad', 'flujo'],
    derecho: 'una armonía sencilla, dar y recibir en {tema}',
    invertido: 'un equilibrio frágil, gestos que se quedan sin retorno' },
  { num: 7,  romano: 'VII',  slug: '07',        nombre: 'Siete',      keywords: ['prueba', 'reflexión', 'honestidad'],
    derecho: 'una prueba interna en {tema}, mirar con honestidad lo propio',
    invertido: 'fantasía, evasión, o una verdad que se evita por incomodidad' },
  { num: 8,  romano: 'VIII', slug: '08',        nombre: 'Ocho',       keywords: ['ritmo', 'oficio', 'cadencia'],
    derecho: 'una cadencia, un ritmo que se afina en {tema}',
    invertido: 'movimiento mecánico, repetición sin sentido, o un freno súbito' },
  { num: 9,  romano: 'IX',   slug: '09',        nombre: 'Nueve',      keywords: ['integración', 'cuerpo', 'saber'],
    derecho: 'una integración casi completa de {tema}, un saber ya hecho cuerpo',
    invertido: 'soledad, satisfacción aplazada, o un cierre que pide aire' },
  { num: 10, romano: 'X',    slug: '10',        nombre: 'Diez',       keywords: ['cierre', 'umbral', 'plenitud'],
    derecho: 'un cierre, un umbral en {tema}, plenitud y peso a la vez',
    invertido: 'un final demorado o una carga que ya no corresponde llevar' },
  { num: 11, romano: 'XI',   slug: 'sota',      nombre: 'Sota',       keywords: ['mensaje', 'curiosidad', 'aprendizaje'],
    derecho: 'una mensajera joven en {tema}, una curiosidad que recién despierta',
    invertido: 'distracción, inmadurez, o una noticia que se demora' },
  { num: 12, romano: 'XII',  slug: 'caballero', nombre: 'Caballero',  keywords: ['movimiento', 'impulso', 'búsqueda'],
    derecho: 'un movimiento decidido en {tema}, una fuerza que ya está en marcha',
    invertido: 'impulsividad, prisa que tropieza, o una intensidad sin destino' },
  { num: 13, romano: 'XIII', slug: 'reina',     nombre: 'Reina',      keywords: ['profundidad', 'escucha', 'madurez'],
    derecho: 'una madurez interior en {tema}, escucha y profundidad',
    invertido: 'una desconexión con el propio centro, o un cuidado que se vuelve control' },
  { num: 14, romano: 'XIV',  slug: 'rey',       nombre: 'Rey',        keywords: ['autoridad', 'claridad', 'dominio'],
    derecho: 'una autoridad serena en {tema}, claridad sobre el propio dominio',
    invertido: 'autoridad que se impone o se ha vaciado, o una visión cansada' }
]

function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

const MENORES = PALOS.flatMap(p =>
  VALORES.map(v => ({
    id: `${p.key.toUpperCase()}-${String(v.num).padStart(2, '0')}`,
    arcano: 'menor',
    paloKey: p.key,
    paloLabel: p.label,
    num: v.num,
    romano: v.romano,
    nombre: `${v.nombre} de ${p.label}`,
    keywords: v.keywords,
    src: `/cards/${p.folder}/${p.key}-${v.slug}.png`,
    derecho: capFirst(v.derecho.replace('{tema}', p.tema)) + '.',
    invertido: capFirst(v.invertido) + '.'
  }))
)

const DECK = [...ARCANOS_MAYORES, ...MENORES]

const FILTROS = [
  { key: 'todos',   label: 'Todas' },
  { key: 'arcanos', label: 'Mayores' },
  { key: 'copas',   label: 'Copas' },
  { key: 'bastos',  label: 'Bastos' },
  { key: 'espadas', label: 'Espadas' },
  { key: 'oros',    label: 'Oros' }
]

const POSICIONES_TIRADA = [
  { key: 'whatIs',      titulo: spreadPositions.whatIs },
  { key: 'whatCrosses', titulo: spreadPositions.whatCrosses },
  { key: 'whatOpens',   titulo: spreadPositions.whatOpens }
]

function pickRandomCards(deck, count) {
  const pool = [...deck]
  const out = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const card = pool.splice(idx, 1)[0]
    out.push({ card, reversed: Math.random() < 0.28 })
  }
  return out
}

/* =====================================================================
 * COMPONENTES VISUALES
 * ===================================================================*/

/** Logo brújula-estrella (rosa de los vientos) */
function CompassStar({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="0.9">
        {/* Rayos largos diagonales */}
        <line x1="40" y1="6"  x2="40" y2="74" />
        <line x1="6"  y1="40" x2="74" y2="40" />
        <line x1="16" y1="16" x2="64" y2="64" />
        <line x1="64" y1="16" x2="16" y2="64" />
        {/* Rayos cortos intermedios */}
        <line x1="40" y1="16" x2="40" y2="22" />
        <line x1="40" y1="58" x2="40" y2="64" />
        <line x1="16" y1="40" x2="22" y2="40" />
        <line x1="58" y1="40" x2="64" y2="40" />
        {/* Puntas mayores */}
        <path d="M40 6 L43 22 L40 24 L37 22 Z" fill="currentColor" fillOpacity="0.85" />
        <path d="M40 74 L43 58 L40 56 L37 58 Z" fill="currentColor" fillOpacity="0.85" />
        <path d="M6 40 L22 43 L24 40 L22 37 Z" fill="currentColor" fillOpacity="0.85" />
        <path d="M74 40 L58 43 L56 40 L58 37 Z" fill="currentColor" fillOpacity="0.85" />
        {/* Centro */}
        <circle cx="40" cy="40" r="3.5" fill="currentColor" />
        <circle cx="40" cy="40" r="9.5" />
      </g>
    </svg>
  )
}

/** Ade — el familiar ritual.
 *  PNG transparente (oriental shorthair cobre con flora, luna y estrella).
 *  Asset en /public/ade.png. El tamaño se controla por className. */
function AdeGlyph({ className = '' }) {
  return (
    <img
      src="/ade.png"
      alt="Ade"
      draggable="false"
      className={`select-none h-auto ${className}`}
    />
  )
}

/** AdePresence — aparición ritual de Ade en momentos específicos.
 *  No es logo. Es entidad que cruza la pantalla brevemente cuando la
 *  lectura toca un umbral: revelación completa, fin de tirada.
 *
 *  Patrón: fade-in lateral lento → permanencia 2.5s → fade-out.
 *  Se renderiza dentro de AnimatePresence con `key` único para que
 *  cada gesto sea una aparición.
 *
 *  Posiciones:
 *    side='bottom-left'  — Ade entra desde abajo a la izquierda
 *    side='bottom-right' — Ade entra desde abajo a la derecha
 *    side='top-right'    — Ade asoma arriba a la derecha (más raro)
 */
function AdePresence({ side = 'bottom-left', size = 90, opacity = 0.5 }) {
  const positions = {
    'bottom-left':  { left:  '8px',  bottom: '12px', enterX: -20 },
    'bottom-right': { right: '8px',  bottom: '12px', enterX: 20  },
    'top-right':    { right: '8px',  top:    '64px', enterX: 20  }
  }
  const pos = positions[side] || positions['bottom-left']
  return (
    <motion.div
      className="pointer-events-none absolute z-[7] select-none"
      style={{
        left:   pos.left,
        right:  pos.right,
        top:    pos.top,
        bottom: pos.bottom,
        width:  `${size}px`
      }}
      initial={{ opacity: 0, x: pos.enterX, y: 4 }}
      animate={{ opacity, x: 0, y: 0 }}
      exit={{ opacity: 0, x: pos.enterX * 0.5, y: 0 }}
      transition={{ duration: 1.4, ease: [0.32, 0.72, 0.24, 1] }}
    >
      <AdeGlyph className="w-full" />
    </motion.div>
  )
}

/** Estrella decorativa pequeña (4 puntas) */
function StarTiny({ size = 10, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" />
    </svg>
  )
}

/** Menú ritual superior — editorial, no tabs SaaS.
 *  Tres entradas separadas por puntos dorados. Estado activo con
 *  punto mínimo bajo el texto + tipografía dorada. Vive en el flujo,
 *  no es nav fija. */
function TopRitualNav({ active = 'home', onGo }) {
  const items = [
    { key: 'home',     label: 'Inicio' },
    { key: 'selector', label: 'Tirada' },
    { key: 'explorar', label: 'Mazo'   }
  ]
  const isItemActive = (k) =>
    active === k ||
    (k === 'selector' && ['intention','shuffle','cut','tirada1','tirada3','celtic'].includes(active))

  // Intercalamos separadores · entre items sin Fragment
  const nodes = []
  items.forEach((it, i) => {
    if (i > 0) {
      nodes.push(
        <span key={`sep-${i}`} className="text-dorado/30 select-none" aria-hidden="true">·</span>
      )
    }
    const isActive = isItemActive(it.key)
    nodes.push(
      <button
        key={it.key}
        onClick={() => onGo(it.key)}
        className={`relative px-1 py-1 text-[0.58rem] md:text-[0.6rem] tracking-[0.32em] uppercase font-light transition-colors duration-500 ${
          isActive ? 'text-dorado' : 'text-pergamino/50 hover:text-dorado/85'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {it.label}
        {isActive && (
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-1 h-1 rounded-full bg-dorado/75"
            aria-hidden="true"
          />
        )}
      </button>
    )
  })

  return (
    <nav
      className="w-full max-w-[360px] mx-auto flex items-center justify-center gap-3 md:gap-4"
      aria-label="Menú principal"
    >
      {nodes}
    </nav>
  )
}

/** Divisor editorial: línea — estrella — línea */
function StarDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-dorado/40" />
      <span className="text-dorado/70"><StarTiny size={9} /></span>
      <span className="h-px w-16 bg-dorado/40" />
    </div>
  )
}

/** Geometría ritual — círculo astral + marcas alquímicas + 12 divisiones
 *  zodiacales. Va detrás de cartas destacadas con opacidad muy baja.
 *  Construye un motivo visual repetido propio del sistema. */
function RitualGeometry({ size = 320, className = '', opacity = 0.18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      stroke="currentColor"
    >
      {/* Anillo principal — círculo zodiacal */}
      <circle cx="100" cy="100" r="92" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="84" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="62" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="42" strokeWidth="0.25" strokeDasharray="1 2" />

      {/* 12 divisiones — marcas pequeñas en el anillo exterior */}
      <g strokeWidth="0.5">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180
          const x1 = 100 + Math.cos(angle) * 84
          const y1 = 100 + Math.sin(angle) * 84
          const x2 = 100 + Math.cos(angle) * 92
          const y2 = 100 + Math.sin(angle) * 92
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>

      {/* 4 ejes cardinales — más densos en N/S/E/W */}
      <g strokeWidth="0.35" strokeDasharray="2 3" opacity="0.6">
        <line x1="100" y1="8"  x2="100" y2="42" />
        <line x1="100" y1="158" x2="100" y2="192" />
        <line x1="8"   y1="100" x2="42"  y2="100" />
        <line x1="158" y1="100" x2="192" y2="100" />
      </g>

      {/* Estrella central — 8 puntas, símbolo de orientación */}
      <g strokeWidth="0.3" opacity="0.7">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const x = 100 + Math.cos(angle) * 32
          const y = 100 + Math.sin(angle) * 32
          return <line key={i} x1="100" y1="100" x2={x} y2={y} />
        })}
      </g>

      {/* Marcas alquímicas — sol, luna, mercurio sutiles */}
      <g strokeWidth="0.4" opacity="0.55">
        {/* Sol arriba */}
        <circle cx="100" cy="22" r="3" />
        <circle cx="100" cy="22" r="0.6" fill="currentColor" stroke="none" />
        {/* Luna abajo */}
        <path d="M 96 178 a 4 4 0 0 0 8 0 a 3 3 0 0 1 -8 0 Z" />
        {/* Cruz a la izquierda */}
        <line x1="18" y1="100" x2="26" y2="100" />
        <line x1="22" y1="96"  x2="22" y2="104" />
        {/* Diamante a la derecha */}
        <path d="M 178 100 L 174 96 L 170 100 L 174 104 Z" />
      </g>

      {/* Pequeñas estrellas en los entremedios — orientación de constelación */}
      <g fill="currentColor" stroke="none" opacity="0.5">
        <circle cx="58"  cy="40"  r="0.7" />
        <circle cx="142" cy="40"  r="0.7" />
        <circle cx="58"  cy="160" r="0.7" />
        <circle cx="142" cy="160" r="0.7" />
        <circle cx="40"  cy="58"  r="0.5" />
        <circle cx="160" cy="58"  r="0.5" />
        <circle cx="40"  cy="142" r="0.5" />
        <circle cx="160" cy="142" r="0.5" />
      </g>
    </svg>
  )
}

/** Reverso del mazo — patrón repetido tipo brocado alquímico antiguo.
 *
 *  Antes: sigilo central tipo logo (rosa de los vientos compleja). Era
 *  demasiado distintivo — cualquier persona con cultura tarot pensaba
 *  "esto no es un Rider-Waite genuino".
 *
 *  Ahora: red de rombos cruzados (diamond grid) con pequeños puntos
 *  dorados en las intersecciones, sin centro narrativo. Es un fondo
 *  ornamental honesto, como los reversos clásicos de mazos europeos
 *  antiguos (Marsella, Camoin, IJJ Swiss): patrón repetido + viñeta de
 *  borde + degradado central. No grita "logo".
 */
function Reverso() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{
      background: 'radial-gradient(ellipse at 50% 50%, #16273c 0%, #0d1b2a 55%, #050a12 100%)'
    }}>
      {/* Marco doble dorado fino — borde editorial clásico */}
      <div className="absolute inset-2 border border-dorado/30 pointer-events-none" />
      <div className="absolute inset-[8px] border border-dorado/12 pointer-events-none" />

      {/* PATRÓN REPETIDO — red de rombos finos.
          Definimos un tile de 20x20 con dos líneas diagonales que se
          cruzan en el centro. SVG con <pattern> de tamaño chico,
          repetido. Sin centro narrativo, sin sigilo distintivo. */}
      <svg
        className="absolute inset-[12px] w-[calc(100%-24px)] h-[calc(100%-24px)] pointer-events-none"
        viewBox="0 0 100 145"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="brocade" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            {/* Cruz diagonal del tile */}
            <line x1="0"  y1="0"  x2="14" y2="14" stroke="#C6A85A" strokeOpacity="0.22" strokeWidth="0.35" />
            <line x1="14" y1="0"  x2="0"  y2="14" stroke="#C6A85A" strokeOpacity="0.22" strokeWidth="0.35" />
            {/* Punto dorado en intersección */}
            <circle cx="7" cy="7" r="0.6" fill="#C6A85A" fillOpacity="0.55" />
          </pattern>

          {/* Viñeta central — el patrón se atenúa en el centro, da volumen */}
          <radialGradient id="reversoVignette" cx="50%" cy="50%" r="58%">
            <stop offset="0%"  stopColor="#0d1b2a" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#0d1b2a" stopOpacity="0" />
            <stop offset="100%" stopColor="#050a12" stopOpacity="0.65" />
          </radialGradient>
        </defs>

        {/* Fondo del patrón */}
        <rect width="100" height="145" fill="url(#brocade)" />
        {/* Viñeta encima — atenúa centro y bordes */}
        <rect width="100" height="145" fill="url(#reversoVignette)" />
      </svg>

      {/* Cuatro estrellas mínimas en las esquinas interiores —
          recurso ornamental editorial, no logo */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 145" preserveAspectRatio="none">
        <g fill="#C6A85A" fillOpacity="0.45">
          <circle cx="10" cy="14" r="0.7" />
          <circle cx="90" cy="14" r="0.7" />
          <circle cx="10" cy="131" r="0.7" />
          <circle cx="90" cy="131" r="0.7" />
        </g>
      </svg>
    </div>
  )
}

/** Halo cálido sutil bajo una carta — efecto vela cinematográfica */
function CandleHalo({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        inset: '-28% -32% -8% -32%',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(198,168,90,0.22) 0%, rgba(198,168,90,0.08) 35%, transparent 72%)',
        filter: 'blur(3px)',
        zIndex: -1
      }}
    />
  )
}

/** Marco de carta. Sin bordes pesados, sólo sombra suave. */
function CartaMarco({ card, reversed = false, showLabel = true, className = '' }) {
  return (
    <div
      className={`relative w-full aspect-[2/3] bg-marfil overflow-hidden flex flex-col rounded-[5px] shadow-ritual paper-texture ${className}`}
      style={reversed ? {
        // Borde vino sutil + sombra interna roja MUY tenue indican estado invertido.
        // No grita: el ojo entrenado lo nota, el casual no se confunde.
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.30), ' +
          '0 14px 32px rgba(0, 0, 0, 0.55), ' +
          '0 4px 16px rgba(122, 30, 44, 0.22), ' +
          'inset 0 0 0 1px rgba(122, 30, 44, 0.45), ' +
          'inset 0 0 14px rgba(122, 30, 44, 0.08)'
      } : undefined}
    >
      <div className="relative flex-1 bg-gradient-to-br from-[#e8dcc4] to-[#d4c5a8] flex items-center justify-center overflow-hidden">
        <img
          src={card.src}
          alt={card.nombre}
          loading="lazy"
          className="relative z-[2] w-full h-full object-contain"
          style={{ transform: reversed ? 'rotate(180deg)' : 'none' }}
        />
        {/* Sombra interna superior — luz cálida cinematográfica */}
        <div className="pointer-events-none absolute inset-0 z-[3]"
             style={{ background: 'linear-gradient(180deg, rgba(255,235,200,0.10) 0%, transparent 18%, transparent 80%, rgba(60,30,20,0.18) 100%)' }} />

        {/* Marca de invertida — punto vino en esquina superior-izq.
            Cuando la carta está rotada 180°, esa esquina aparece visualmente
            en la inferior-derecha del lado que ve el lector. Es una marca
            sutil que confirma el estado sin tapar la ilustración. */}
        {reversed && (
          <span
            className="absolute top-1.5 left-1.5 z-[4] w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              background: 'rgba(122, 30, 44, 0.85)',
              boxShadow: '0 0 4px rgba(122, 30, 44, 0.55)'
            }}
            aria-hidden="true"
          />
        )}
      </div>
      {showLabel && (
        <div className={`relative z-[2] px-2 py-1.5 bg-marfil text-center border-t ${reversed ? 'border-vino/35' : 'border-noche/10'}`}>
          <p className={`font-serif text-[0.66rem] font-medium uppercase tracking-[0.08em] leading-tight ${reversed ? 'text-vino/85' : 'text-noche/80'}`}>
            {card.nombre}{reversed ? ' ↻' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

/** Slot de tirada: marco con borde dorado fino para alojar la carta */
function SlotMarco({ children }) {
  return (
    <div className="w-full aspect-[2/3] p-[3px] rounded-[6px] ring-1 ring-dorado/35 bg-noche/30">
      {children}
    </div>
  )
}

function CartaFlippable({ card, reversed, revealed, onFlip }) {
  /* Jitter determinístico por carta: cada una flipea en duración ligeramente
     distinta. Rango ~0.48s..0.58s para que no se sientan idénticas. */
  const idHash = ((card?.id || card?.nombre || '').split('').reduce(
    (acc, ch) => acc + ch.charCodeAt(0), 0
  )) % 100
  const flipDuration = 0.48 + (idHash / 100) * 0.10
  /* También una micro-amplitud que pasa el rotateY de 180° a 178°-182°
     para que la carta no quede perfectamente plana — humanidad sutil. */
  const overshoot = 178 + (idHash % 5)

  return (
    <button
      type="button"
      onClick={onFlip}
      className="relative w-full aspect-[2/3] select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-dorado/60 active:scale-[0.985] transition-transform"
      style={{ perspective: '1200px' }}
      aria-label={revealed ? card.nombre : 'Carta boca abajo. Toca para revelar.'}
    >
      <motion.div
        className="absolute inset-0 preserve-3d"
        animate={{ rotateY: revealed ? overshoot : 0 }}
        transition={{ duration: flipDuration, ease: [0.32, 0.72, 0.24, 1] }}
      >
        {/* Reverso con respiración sutil cuando todavía no se reveló */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-[5px] overflow-hidden"
          animate={revealed ? { scale: 1 } : { scale: [1, 1.006, 1] }}
          transition={revealed ? { duration: 0 } : {
            duration: 4.6 + (idHash % 7) * 0.12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Reverso />
        </motion.div>
        <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <CartaMarco card={card} reversed={reversed} />
        </div>
      </motion.div>
    </button>
  )
}

/* Ícono carta minimal para nav (estilo grabado) */
function CardIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <circle cx="12" cy="13" r="2" />
    </svg>
  )
}

/** Una carta con el reverso compass-rose (tamaño contenedor padre) */
function CardBackTile({ className = '', stackIndex = 0, stackTotal = 1 }) {
  // Las cartas inferiores del mazo proyectan sombras más densas; las
  // superiores reciben más luz cálida en el borde superior. Las del
  // medio quedan presionadas (menos halo). Esto simula presión física.
  const depthRatio   = stackTotal > 1 ? stackIndex / (stackTotal - 1) : 0  // 0 abajo, 1 arriba
  const fromMidNorm  = Math.abs(depthRatio - 0.5) * 2                       // 0 centro, 1 borde

  // Sombra: las cartas más arriba en el stack proyectan sombra MÁS suave
  // hacia las de abajo (las inferiores ya están comprimidas y reciben).
  const shadowAlpha  = 0.18 + depthRatio * 0.22
  const shadowBlur   = 6 + depthRatio * 14
  const shadowY      = 2 + depthRatio * 4

  // Brillo en el borde superior — más visible en las cartas de arriba del stack
  const topGlowAlpha = 0.10 + depthRatio * 0.18
  // Sombra interna lateral — más densa en las cartas comprimidas del centro
  const innerShadow  = 0.12 + (1 - fromMidNorm) * 0.10

  return (
    <div
      className={`relative w-full h-full rounded-[5px] overflow-hidden ${className}`}
      style={{
        boxShadow: `
          0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}),
          0 1px 2px rgba(0, 0, 0, 0.35),
          inset 0 0 0 0.5px rgba(198, 168, 90, 0.22),
          inset 0 1px 0 rgba(255, 230, 180, ${topGlowAlpha}),
          inset 0 -1px 0 rgba(40, 18, 10, ${innerShadow}),
          inset 0 0 8px rgba(40, 18, 10, ${innerShadow * 0.5})
        `
      }}
    >
      <Reverso />
      {/* Brillo cálido tenue sobre el borde superior — luz cinematográfica */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[20%]"
        style={{
          background: `linear-gradient(180deg, rgba(255, 235, 190, ${topGlowAlpha * 0.55}) 0%, transparent 100%)`
        }}
      />
      {/* Sombra inferior interna — la carta de abajo recibe sombra de la de arriba */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%]"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, ${innerShadow * 1.4}) 0%, transparent 100%)`
        }}
      />
    </div>
  )
}

/* =====================================================================
 * BOOK OPENING — apertura editorial inicial (1.5–2.5 s)
 * Fase 1: portada visible (1.1 s)
 * Fase 2: dos mitades se abren hacia los costados (1.1 s)
 * Fase 3: overlay desaparece — Home queda visible
 * ===================================================================*/

function BookOpening({ onExit }) {
  const [phase, setPhase] = useState('closed')

  useEffect(() => {
    // Apertura ritual — pausa larga para respirar
    const t1 = setTimeout(() => setPhase('opening'), 2400)   // portada visible 2.4 s
    const t2 = setTimeout(() => onExit(), 4400)              // apertura completa ~2.0 s
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onExit])

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      style={{ perspective: '2200px' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'opening' ? 1 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // intercepta clicks durante la apertura para que no lleguen al Home detrás
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sombra interior tenue para dar profundidad de "libro" */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.45)_100%)] pointer-events-none z-10" />

      {/* Mitad izquierda */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          transformOrigin: 'left center',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(105deg, #0a131e 0%, #0d1b2a 50%, #0a1422 100%)',
          boxShadow: 'inset -14px 0 36px rgba(0,0,0,0.55)'
        }}
        animate={
          phase === 'opening'
            ? { rotateY: -92, opacity: 0 }
            : { rotateY: 0, opacity: 1 }
        }
        transition={{ duration: 1.8, ease: [0.32, 0.72, 0.24, 1] }}
      />

      {/* Mitad derecha */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          transformOrigin: 'right center',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(255deg, #0a131e 0%, #0d1b2a 50%, #0a1422 100%)',
          boxShadow: 'inset 14px 0 36px rgba(0,0,0,0.55)'
        }}
        animate={
          phase === 'opening'
            ? { rotateY: 92, opacity: 0 }
            : { rotateY: 0, opacity: 1 }
        }
        transition={{ duration: 1.8, ease: [0.32, 0.72, 0.24, 1] }}
      />

      {/* Línea central — costura del libro */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-px bg-dorado/25 z-20"
        animate={{ opacity: phase === 'opening' ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Contenido de la portada (encima de las mitades) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'opening' ? 0 : 1 }}
        transition={{
          duration: phase === 'opening' ? 0.7 : 1.4,
          ease: 'easeOut'
        }}
      >
        <div className="text-dorado/85 mb-4 md:mb-5">
          <AdeGlyph className="w-[140px] md:w-[170px]" />
        </div>
        <h1 className="font-serif text-[1.8rem] md:text-[2.2rem] font-light text-dorado uppercase tracking-[0.36em] md:tracking-[0.42em]">
          Tarot Ade
        </h1>
        <p className="mt-4 font-serif italic text-dorado/55 text-[0.95rem] md:text-[1rem] tracking-[0.04em]">
          las cartas no adivinan. revelan.
        </p>
        {/* Filete editorial fino debajo del título */}
        <div className="mt-8 h-px w-12 bg-dorado/35" />
      </motion.div>
    </motion.div>
  )
}


/* =====================================================================
 * SÍMBOLOS RITUALES — line art tipo Pamela Colman Smith
 * Opacidad 5–10% máx. Atmosféricos, no decorativos.
 * ===================================================================*/

/** Símbolo de Copa (Cups) */
function GlyphCopa({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M 18 18 Q 18 36 30 38 Q 42 36 42 18 Z" />
      <line x1="30" y1="38" x2="30" y2="48" />
      <ellipse cx="30" cy="49" rx="8" ry="2" />
      <path d="M 24 22 Q 30 26 36 22" strokeOpacity="0.6" />
      <circle cx="30" cy="22" r="1.2" fill="currentColor" />
    </svg>
  )
}

/** Símbolo de Espada (Swords) */
function GlyphEspada({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="30" y1="6" x2="30" y2="44" />
      <line x1="22" y1="40" x2="38" y2="40" />
      <line x1="30" y1="44" x2="30" y2="52" />
      <line x1="26" y1="48" x2="34" y2="48" strokeOpacity="0.7" />
      <path d="M 30 6 L 28 10 L 32 10 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
    </svg>
  )
}

/** Símbolo de Oro (Pentacles) */
function GlyphOro({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="30" cy="30" r="20" />
      <circle cx="30" cy="30" r="14" strokeOpacity="0.6" />
      <path d="M 30 16 L 33.3 26.4 L 44 26.4 L 35.4 32.7 L 38.7 43.1 L 30 36.7 L 21.3 43.1 L 24.6 32.7 L 16 26.4 L 26.7 26.4 Z" />
    </svg>
  )
}

/** Símbolo de Basto (Wands) */
function GlyphBasto({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="14" y1="50" x2="46" y2="10" />
      <path d="M 16 8 Q 22 10 22 4 M 16 8 Q 14 14 20 14 M 16 8 Q 12 6 14 2" strokeOpacity="0.55" />
      <ellipse cx="20" cy="44" rx="3" ry="1.5" transform="rotate(-50 20 44)" strokeOpacity="0.7" />
      <ellipse cx="40" cy="16" rx="3" ry="1.5" transform="rotate(-50 40 16)" strokeOpacity="0.7" />
    </svg>
  )
}

/** Fase lunar individual */
function MoonPhase({ size = 22, phase = 'full', className = '' }) {
  // phase: 'new', 'waxingCrescent', 'firstQuarter', 'waxingGibbous', 'full',
  //        'waningGibbous', 'lastQuarter', 'waningCrescent'
  const r = 9
  const cx = 12, cy = 12
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" className={className}>
      <circle cx={cx} cy={cy} r={r} strokeOpacity="0.85" />
      {phase === 'new' && (
        <circle cx={cx} cy={cy} r={r - 0.2} fill="currentColor" fillOpacity="0.05" stroke="none" />
      )}
      {phase === 'waxingCrescent' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${r * 0.45} ${r} 0 0 0 ${cx} ${cy - r} Z`} fill="currentColor" fillOpacity="0.45" stroke="none" />
      )}
      {phase === 'firstQuarter' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`} fill="currentColor" fillOpacity="0.5" stroke="none" />
      )}
      {phase === 'waxingGibbous' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${r * 0.5} ${r} 0 0 1 ${cx} ${cy - r} Z`} fill="currentColor" fillOpacity="0.55" stroke="none" />
      )}
      {phase === 'full' && (
        <circle cx={cx} cy={cy} r={r - 0.6} fill="currentColor" fillOpacity="0.55" stroke="none" />
      )}
      {phase === 'waningGibbous' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${r * 0.5} ${r} 0 0 0 ${cx} ${cy - r} Z`} fill="currentColor" fillOpacity="0.55" stroke="none" />
      )}
      {phase === 'lastQuarter' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill="currentColor" fillOpacity="0.5" stroke="none" />
      )}
      {phase === 'waningCrescent' && (
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${r * 0.45} ${r} 0 0 1 ${cx} ${cy - r} Z`} fill="currentColor" fillOpacity="0.45" stroke="none" />
      )}
    </svg>
  )
}

/** Línea horizontal con las 5 fases lunares principales */
function LunarPhasesRow({ className = '' }) {
  const phases = ['waxingCrescent', 'firstQuarter', 'full', 'lastQuarter', 'waningCrescent']
  return (
    <div className={`flex items-center justify-center gap-6 text-dorado/60 ${className}`}>
      {phases.map((p, i) => (
        <MoonPhase key={i} phase={p} size={18} />
      ))}
    </div>
  )
}

/** Constelación abstracta — dots + líneas finas */
function ConstellationPatch({ seed = 0, w = 120, h = 80, className = '' }) {
  const rand = (i) => {
    const x = Math.sin(seed * 31 + i * 7) * 1000
    return x - Math.floor(x)
  }
  const points = Array.from({ length: 5 }, (_, i) => ({
    x: rand(i * 2)     * w,
    y: rand(i * 2 + 1) * h
  }))
  // conectar puntos consecutivos
  const lines = points.slice(0, -1).map((p, i) => ({
    x1: p.x, y1: p.y, x2: points[i + 1].x, y2: points[i + 1].y
  }))
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
      <g strokeOpacity="0.5">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === 0 || i === points.length - 1 ? 1.6 : 1.1} fill="currentColor" fillOpacity="0.7" />
      ))}
    </svg>
  )
}

/** Capa atmosférica de símbolos para el fondo de cada pantalla */
function AtmosphereLayer({ scene = 'default' }) {
  if (scene === 'home') {
    return (
      <>
        {/* Niebla cálida ambiental */}
        <div className="atmo-haze" />
        {/* Polvo lumínico ascendente — partículas muy lentas */}
        <div className="atmo-dust" />
        <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden text-dorado">
          {/* Fila de fases lunares — arriba, muy tenue */}
          <div className="absolute left-0 right-0 top-[20%] opacity-[0.07]">
            <LunarPhasesRow />
          </div>
          {/* Símbolos de los 4 palos — esquinas, casi invisibles */}
          <div className="absolute top-[8%]    left-[6%]   opacity-[0.05]"><GlyphCopa    size={42} /></div>
          <div className="absolute top-[8%]    right-[6%]  opacity-[0.05]"><GlyphEspada  size={42} /></div>
          <div className="absolute bottom-[14%] left-[6%]  opacity-[0.05]"><GlyphOro     size={42} /></div>
          <div className="absolute bottom-[14%] right-[6%] opacity-[0.05]"><GlyphBasto   size={42} /></div>
          {/* Estrellas tenues que parpadean — muy poco frecuentes */}
          <span className="atmo-star" style={{ top: '28%', left: '18%' }} />
          <span className="atmo-star" style={{ top: '38%', right: '22%', animationDelay: '2s' }} />
          <span className="atmo-star" style={{ top: '62%', left: '76%', animationDelay: '4s' }} />
          <span className="atmo-star" style={{ top: '72%', left: '24%', animationDelay: '1s' }} />
        </div>
      </>
    )
  }
  if (scene === 'intention') {
    return (
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden text-dorado">
        {/* Constelaciones mínimas dispersas */}
        <div className="absolute top-[12%]  left-[8%]   opacity-[0.08]"><ConstellationPatch seed={1} w={100} h={70} /></div>
        <div className="absolute top-[18%]  right-[10%] opacity-[0.07]"><ConstellationPatch seed={5} w={120} h={60} /></div>
        <div className="absolute bottom-[20%] left-[14%] opacity-[0.06]"><ConstellationPatch seed={9} w={90}  h={60} /></div>
      </div>
    )
  }
  if (scene === 'shuffle' || scene === 'cut') {
    return (
      <>
        {/* Niebla ambiental */}
        <div className="atmo-haze" />
        {/* Polvo lumínico — más denso durante el shuffle */}
        <div className="atmo-dust" />
        <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden text-dorado">
          {/* Símbolos rituales muy suaves en el fondo */}
          <div className="absolute top-[6%]   left-[10%]  opacity-[0.04]"><GlyphCopa    size={48} /></div>
          <div className="absolute top-[8%]   right-[12%] opacity-[0.04]"><GlyphEspada  size={48} /></div>
          <div className="absolute bottom-[28%] left-[8%]  opacity-[0.04]"><GlyphOro     size={50} /></div>
          <div className="absolute bottom-[26%] right-[8%] opacity-[0.04]"><GlyphBasto   size={50} /></div>
          {/* Pequeña constelación arriba */}
          <div className="absolute top-[22%]  left-1/2 -translate-x-1/2 opacity-[0.06]">
            <ConstellationPatch seed={3} w={140} h={50} />
          </div>
          {/* Estrellas que parpadean — vibración ceremonial */}
          <span className="atmo-star" style={{ top: '16%', left: '32%' }} />
          <span className="atmo-star" style={{ top: '34%', right: '36%', animationDelay: '1.5s' }} />
          <span className="atmo-star" style={{ top: '58%', left: '14%', animationDelay: '3s' }} />
          <span className="atmo-star" style={{ top: '74%', right: '20%', animationDelay: '0.5s' }} />
        </div>
      </>
    )
  }
  if (scene === 'reading') {
    // Casi limpio
    return (
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden text-dorado">
        <div className="absolute top-[10%]  right-[10%] opacity-[0.04]"><ConstellationPatch seed={7} w={100} h={50} /></div>
      </div>
    )
  }
  if (scene === 'selector') {
    return (
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden text-dorado">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 opacity-[0.06]">
          <LunarPhasesRow />
        </div>
      </div>
    )
  }
  return null
}

/* =====================================================================
 * ONBOARDING — 3 pantallas mínimas para primera visita.
 *
 *  Se muestra solo cuando localStorage 'ade.onboarded' no existe. Tras
 *  completar (o cerrar) se marca como visto. Es skipable desde el primer
 *  momento.
 *
 *  Las 3 pantallas siguen el espíritu editorial: imagen mínima, una idea,
 *  espacio para respirar, sin coaching motivacional.
 * ===================================================================*/

const ONBOARDING_STEPS = [
  {
    eyebrow: 'Bienvenida',
    title:   'Tarot Ade',
    body:    'Esto no predice. Revela. Cada lectura es una manera de mirar lo que ya está en movimiento.',
    cta:     'Seguir'
  },
  {
    eyebrow: 'Cómo se usa',
    title:   'Tres gestos',
    body:    'Una pregunta interna — sin necesidad de respuesta clara. Las cartas se barajan. Lo que aparezca, se mira despacio.',
    cta:     'Seguir'
  },
  {
    eyebrow: 'Lo que no es',
    title:   'No es un veredicto',
    body:    'Las cartas no juzgan ni deciden. Son un reflejo simbólico que devuelve la pregunta más afilada de lo que llegó.',
    cta:     'Empezar'
  }
]

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const isLast = step >= ONBOARDING_STEPS.length - 1
  const current = ONBOARDING_STEPS[step]

  const advance = () => {
    if (isLast) {
      try { window.localStorage.setItem('ade.onboarded', '1') } catch (_) {}
      onComplete()
    } else {
      setStep(s => s + 1)
    }
  }
  const skip = () => {
    try { window.localStorage.setItem('ade.onboarded', '1') } catch (_) {}
    onComplete()
  }

  return (
    <motion.section
      key="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[60] ritual-bg text-pergamino page-frame"
    >
      <AtmosphereLayer scene="home" />
      <div
        className="relative z-10 max-w-[440px] mx-auto px-7 flex flex-col items-center min-h-[100svh] justify-center text-center"
        style={{
          paddingTop: 'calc(2.5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))'
        }}
      >
        {/* Skip discreto arriba a la derecha */}
        <button
          onClick={skip}
          className="absolute right-6 text-[0.56rem] tracking-[0.30em] uppercase text-pergamino/35 hover:text-dorado/80 font-light transition-colors"
          style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
        >
          Saltar
        </button>

        {/* Ade como acompañante silencioso, no protagonista */}
        <div className="relative mb-8">
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-[55%] h-[10px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168,139,69,0.28) 0%, transparent 75%)',
              filter: 'blur(6px)'
            }}
          />
          <AdeGlyph className="w-[88px] md:w-[110px]" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`onb-${step}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <p className="text-[0.56rem] tracking-[0.32em] uppercase text-dorado/55 font-light mb-4">
              {current.eyebrow}
            </p>
            <h2 className="font-serif text-[1.5rem] md:text-[1.85rem] font-light text-dorado uppercase tracking-[0.28em] md:tracking-[0.34em] mb-6">
              {current.title}
            </h2>
            <p className="font-serif italic text-pergamino/75 text-[1rem] md:text-[1.05rem] leading-[1.75] max-w-[26rem] mb-12">
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de progreso — tres puntos dorados */}
        <div className="flex items-center gap-2 mb-10">
          {ONBOARDING_STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-px rounded-full transition-all duration-500 ${
                i === step ? 'w-6 bg-dorado' : i < step ? 'w-3 bg-dorado/60' : 'w-3 bg-pergamino/15'
              }`}
            />
          ))}
        </div>

        <button
          onClick={advance}
          className="w-full max-w-[260px] py-3.5 btn-threshold-primary text-[0.62rem] tracking-[0.36em] uppercase font-light rounded-[2px] active:scale-[0.985]"
        >
          <span>{current.cta}</span>
        </button>
      </div>
    </motion.section>
  )
}

/* =====================================================================
 * VISTAS
 * ===================================================================*/

function Home({ destacada, onTirada, onExplorar, onCarta, onNav }) {
  // Pool ampliado de frases contemplativas — 28 entradas para que la
  // rotación no se vuelva semanal predecible. La elección depende de
  // (año + mes + día), distribuida con hash, así no hay días fijos.
  const dailyPhrases = [
    'las cartas no adivinan. revelan.',
    'hay símbolos que vuelven.',
    'respira antes de elegir.',
    'algunas respuestas llegan de lado.',
    'todo aparece por algo.',
    'lo que insiste también habla.',
    'no preguntes rápido. mira primero.',
    'lo que se repite tiene algo que decir.',
    'no toda pregunta pide respuesta.',
    'la lectura no se controla — se escucha.',
    'lo que vuelve, vuelve por algo.',
    'los símbolos no apuran.',
    'una carta no es un veredicto.',
    'lo que no se nombra igual ocupa lugar.',
    'el silencio también es lectura.',
    'no todo lo que pasa está pidiendo ser resuelto.',
    'mirar de cerca es la primera respuesta.',
    'lo importante rara vez se ve primero.',
    'lo difícil no siempre es lo urgente.',
    'algo está pasando antes de que te enteres.',
    'la pregunta correcta no siempre es la que trajiste.',
    'ver es decisión.',
    'el cuerpo sabe antes.',
    'lo que se postpone también deja huella.',
    'algunas cartas piden volver más tarde.',
    'no toda señal es para hoy.',
    'lo claro a veces tarda en ser dicho.',
    'el deseo también es información.'
  ]
  const dayIndex = (() => {
    const d = new Date()
    const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    let hash = 0
    for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) | 0
    return Math.abs(hash) % dailyPhrases.length
  })()

  return (
    <motion.section
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[100svh] ritual-bg text-pergamino page-frame"
    >
      <AtmosphereLayer scene="home" />

      {/* MENÚ RITUAL SUPERIOR — fijo arriba con safe-area-inset.
          Vive sobre el filete editorial; navega entre Inicio/Tirada/Mazo. */}
      <div
        className="absolute inset-x-0 z-20"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1.65rem)' }}
      >
        <TopRitualNav active="home" onGo={onNav} />
      </div>

      <div
        className="relative z-10 max-w-[440px] mx-auto px-7 flex flex-col items-center min-h-[100svh] justify-center gap-5 md:gap-8"
        style={{
          paddingTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))'
        }}
      >

        {/* ADE COMO PRESENCIA — sobre el título, centrado, con sombra
            propia y flotación lenta. Tamaño compacto para mobile. */}
        <motion.div
          className="relative flex justify-center select-none"
          animate={{ y: [0, -3, 0, 3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-[55%] h-[10px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168,139,69,0.28) 0%, rgba(168,139,69,0.08) 45%, transparent 75%)',
              filter: 'blur(6px)'
            }}
          />
          <AdeGlyph className="w-[88px] md:w-[130px] relative z-10" />
        </motion.div>

        {/* TÍTULO — sin filetes redundantes, más compacto.
            El menú superior ya marca el inicio de la página. */}
        <header className="text-center relative">
          <h1 className="font-serif text-[1.65rem] md:text-[2.2rem] font-light text-dorado uppercase tracking-[0.32em] md:tracking-[0.42em] mb-2.5 md:mb-3">
            Tarot Ade
          </h1>
          <p className="font-serif italic text-[0.85rem] md:text-[0.95rem] text-dorado/65 tracking-[0.02em] max-w-[24rem] mx-auto leading-relaxed">
            {dailyPhrases[dayIndex]}
          </p>
        </header>

        {/* CARTA INVOCADA — el corazón de la pantalla. */}
        <div className="flex flex-col items-center gap-3 relative">
          <p className="text-[0.55rem] tracking-[0.30em] uppercase text-dorado/55 font-light">
            Carta del día
          </p>

          <div className="relative w-[160px] md:w-[230px] flex items-center justify-center pt-1 pb-5">
            <div className="absolute inset-0 -inset-x-14 -inset-y-14 md:-inset-x-22 md:-inset-y-22 flex items-center justify-center pointer-events-none text-dorado">
              <RitualGeometry size={320} opacity={0.16} className="ritual-breath" />
            </div>

            <div
              className="absolute inset-0 -inset-x-9 -inset-y-7 pointer-events-none ritual-breath"
              style={{
                background: 'radial-gradient(ellipse 55% 65% at 50% 48%, rgba(198,168,90,0.26) 0%, rgba(198,168,90,0.08) 38%, transparent 70%)',
                filter: 'blur(10px)'
              }}
            />

            <motion.button
              onClick={() => onCarta(destacada)}
              className="relative w-[160px] md:w-[230px] active:scale-[0.99] card-invoked card-pedestal"
              aria-label={`Carta del día: ${destacada.nombre}. Toca para leer.`}
              animate={{ scale: [1, 1.003, 1, 0.997, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              whileTap={{ scale: 0.985 }}
              whileHover={{ rotateX: 2, rotateY: -2, translateY: -2 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <CartaMarco card={destacada} />
            </motion.button>
          </div>

        </div>

        {/* UMBRAL ÚNICO — "Iniciar Tirada".
            El acceso a "Explorar Mazo" vive ahora en el menú superior.
            Una sola acción primaria en la home: tirar. */}
        <div className="w-full max-w-[280px]">
          <button
            onClick={onTirada}
            className="w-full py-4 btn-threshold-primary text-[0.62rem] tracking-[0.36em] uppercase font-light rounded-[2px] active:scale-[0.985]"
          >
            <span>Iniciar Tirada</span>
          </button>
        </div>
      </div>
    </motion.section>
  )
}

function SelectorTirada({ onPick, onHome }) {
  return (
    <motion.section
      key="selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[100svh] noise-dark bg-noche text-pergamino"
    >
      <AtmosphereLayer scene="selector" />
      <div className="relative z-10 max-w-[440px] mx-auto px-7 pt-10 pb-12 flex flex-col items-center min-h-[100svh]">
        <header className="w-full grid grid-cols-3 items-center mb-12">
          <button onClick={onHome} className="text-pergamino/80 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Volver">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.9rem] uppercase tracking-[0.28em] text-dorado text-center">
            Elige tu Tirada
          </h2>
          <span />
        </header>

        <StarDivider className="mb-10" />

        <p className="font-serif italic text-pergamino/55 text-[0.92rem] leading-relaxed text-center max-w-[26rem] mb-12">
          Respira. Siente cuál se acerca a lo que estás necesitando hoy.
        </p>

        <div className="w-full flex flex-col gap-5">
          <button
            onClick={() => onPick(1)}
            className="w-full bg-transparent border border-dorado/35 hover:border-dorado/75 rounded-[4px] px-7 py-7 text-left transition-colors active:scale-[0.99]"
          >
            <p className="text-[0.6rem] tracking-[0.26em] uppercase text-dorado/80 mb-3">una carta</p>
            <p className="font-serif text-pergamino text-[1.4rem] leading-tight mb-2">Carta del momento</p>
            <p className="font-light text-pergamino/55 text-[0.82rem] leading-[1.75]">
              Un mensaje breve para mirar lo que está hoy en ti.
            </p>
          </button>

          <button
            onClick={() => onPick(3)}
            className="w-full bg-transparent border border-dorado/35 hover:border-dorado/75 rounded-[4px] px-7 py-7 text-left transition-colors active:scale-[0.99]"
          >
            <p className="text-[0.6rem] tracking-[0.26em] uppercase text-dorado/80 mb-3">tres cartas</p>
            <p className="font-serif text-pergamino text-[1.4rem] leading-tight mb-2">Tirada de tres</p>
            <p className="font-light text-pergamino/55 text-[0.82rem] leading-[1.75]">
              Lo que está · lo que cruza · lo que se abre.
            </p>
          </button>

          <button
            onClick={() => onPick(10)}
            className="w-full bg-transparent border border-dorado/55 hover:border-dorado/85 rounded-[4px] px-7 py-7 text-left transition-colors active:scale-[0.99] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(122,30,44,0.08) 0%, rgba(13,27,42,0) 60%)'
            }}
          >
            <p className="text-[0.6rem] tracking-[0.26em] uppercase text-dorado/85 mb-3">diez cartas · ritual largo</p>
            <p className="font-serif text-pergamino text-[1.4rem] leading-tight mb-2">Cruz Celta</p>
            <p className="font-light text-pergamino/55 text-[0.82rem] leading-[1.75]">
              Una lectura larga, ceremonial, que se construye carta por carta. No es para todos los días.
            </p>
          </button>
        </div>
      </div>
    </motion.section>
  )
}

function Explorar({ onCarta, onHome }) {
  const [filtro, setFiltro] = useState('todos')
  const cartas = useMemo(() => {
    if (filtro === 'todos')   return DECK
    if (filtro === 'arcanos') return DECK.filter(c => c.arcano === 'mayor')
    return DECK.filter(c => c.paloKey === filtro)
  }, [filtro])

  return (
    <motion.section
      key="explorar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative min-h-[100svh] ritual-bg constellation text-pergamino"
    >
      <div className="relative z-10 max-w-[640px] mx-auto px-6 pt-10 pb-12">
        <header className="grid grid-cols-3 items-center mb-8">
          <button onClick={onHome} className="text-pergamino/85 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Volver al inicio">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.9rem] uppercase tracking-[0.28em] text-dorado text-center">Explorar Mazo</h2>
          <Bookmark className="w-5 h-5 text-dorado/65 justify-self-end" strokeWidth={1.3} />
        </header>

        <StarDivider className="mb-10" />

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 -mx-1 px-1">
          {FILTROS.map(f => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`shrink-0 px-5 py-2 rounded-full text-[0.66rem] tracking-[0.22em] uppercase font-light whitespace-nowrap transition-colors duration-300 border ${
                filtro === f.key
                  ? 'border-vino/65 text-pergamino bg-vino/15'
                  : 'border-dorado/30 text-pergamino/65 hover:border-dorado/60 hover:text-pergamino/90'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 md:gap-8">
          {cartas.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onCarta(c)}
              className="text-left active:scale-[0.99] transition-transform"
            >
              <CartaMarco card={c} />
            </button>
          ))}
        </div>

        {cartas.length === 0 && (
          <p className="text-center text-pergamino/40 text-sm py-16">No hay cartas en esta categoría.</p>
        )}
      </div>
    </motion.section>
  )
}

/* =====================================================================
 * MANOS SUTILES — silhouette editorial para ShuffleScreen
 * ===================================================================*/

/** Silueta de una mano abierta — line art con sombra + relleno tenue */
function HandOutline() {
  return (
    <svg
      viewBox="0 0 260 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      {/* Relleno tenue para dar cuerpo (no solo línea) */}
      <g fill="currentColor" fillOpacity="0.18" stroke="none">
        <path d="M 30 320 L 30 220 Q 30 200 55 200 L 215 200 Q 240 200 240 220 L 240 320 Z" />
        <ellipse cx="74"  cy="125" rx="13" ry="80" />
        <ellipse cx="108" cy="95"  rx="14" ry="105" />
        <ellipse cx="143" cy="75"  rx="15" ry="125" />
        <ellipse cx="180" cy="100" rx="14" ry="100" />
        <ellipse cx="225" cy="170" rx="14" ry="55" transform="rotate(20 225 170)" />
      </g>

      {/* Outline (line art) */}
      {/* Palma + muñeca */}
      <path d="M 30 320 L 30 220 Q 30 200 55 200 L 215 200 Q 240 200 240 220 L 240 320" />
      {/* Meñique */}
      <path d="M 60 200 L 60 110 Q 60 92 74 92 Q 88 92 88 110 L 88 200" />
      {/* Anular */}
      <path d="M 94 200 L 94 65 Q 94 48 108 48 Q 122 48 122 65 L 122 200" />
      {/* Medio */}
      <path d="M 128 200 L 128 38 Q 128 22 143 22 Q 158 22 158 38 L 158 200" />
      {/* Índice */}
      <path d="M 165 200 L 165 70 Q 165 54 180 54 Q 195 54 195 70 L 195 200" />
      {/* Pulgar saliendo del costado, angulado */}
      <path d="M 215 210 Q 245 205 248 230 Q 244 252 220 250 Q 210 246 210 235" />
    </svg>
  )
}

/** Dos manos cinematográficas que se mueven lento durante el barajado */
function ShufflingHands() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]" aria-hidden="true">
      {/* Lavado cálido tenue, sugiere luz de hogar */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(198,168,90,0.14) 0%, transparent 65%)'
        }}
      />

      {/* Mano izquierda — emerge desde abajo-izquierda */}
      <motion.div
        className="absolute text-doradoAlt"
        style={{
          left:   '-40px',
          bottom: '-80px',
          width:  '260px',
          height: '320px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0.32, 0.55, 0.6, 0.5, 0.42],
          x:       [0, 10, 4, -3, 0],
          y:       [14, -2, -10, -5, 14],
          rotate:  [-4, 1, -1, -2, -4]
        }}
        transition={{
          duration: 7.5,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      >
        <HandOutline />
      </motion.div>

      {/* Mano derecha — espejada, en counterpoint */}
      <motion.div
        className="absolute text-doradoAlt"
        style={{
          right:  '-40px',
          bottom: '-80px',
          width:  '260px',
          height: '320px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0.32, 0.55, 0.6, 0.5, 0.42],
          x:       [0, -10, -4, 3, 0],
          y:       [14, -4, -10, -3, 14],
          rotate:  [4, -1, 1, 2, 4]
        }}
        transition={{
          duration: 7.5,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          delay: 0.6,
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      >
        <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }}>
          <HandOutline />
        </div>
      </motion.div>
    </div>
  )
}

/* =====================================================================
 * SHUFFLE — momento ritual antes de la lectura
 * ===================================================================*/

/* =====================================================================
 * INTENTION — pregunta opcional antes de barajar
 * ===================================================================*/

function IntentionScreen({ initialIntention, onContinue, onBack }) {
  const [text, setText] = useState(initialIntention || '')

  const handleContinue = () => onContinue(text.trim())

  return (
    <motion.section
      key="intention"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[100svh] noise-dark bg-noche text-pergamino"
    >
      <AtmosphereLayer scene="intention" />
      <div className="relative z-10 max-w-[460px] mx-auto px-7 pt-10 pb-12 flex flex-col min-h-[100svh]">
        <header className="w-full grid grid-cols-3 items-center mb-16">
          <button
            onClick={onBack}
            className="text-pergamino/70 hover:text-dorado active:scale-[0.96] transition justify-self-start"
            aria-label="Volver"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <div className="text-dorado/60 mx-auto"><CompassStar size={28} /></div>
          <span />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="font-serif text-[1.6rem] md:text-[1.85rem] text-pergamino leading-[1.45] mb-6">
            Tómate un momento.
          </p>
          <p className="font-serif italic text-pergamino/55 text-[0.98rem] md:text-[1rem] leading-[1.7] max-w-[24rem] mb-14">
            Si quieres, puedes escribir lo que te trae aquí.
          </p>

          {/* Input editorial — solo línea inferior */}
          <div className="w-full max-w-[26rem] mb-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleContinue() }}
              placeholder="Estoy pensando en…"
              maxLength={140}
              autoFocus
              className="w-full bg-transparent border-0 border-b border-dorado/30 focus:border-dorado/70 outline-none text-pergamino text-center font-serif italic text-[1.05rem] leading-[1.7] py-3 placeholder:text-pergamino/30 placeholder:font-serif placeholder:italic transition-colors"
            />
          </div>

          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-pergamino/30 font-light mb-14">
            Opcional
          </p>

          <button
            onClick={handleContinue}
            className="px-10 py-3.5 btn-ritual text-pergamino text-[0.66rem] tracking-[0.30em] uppercase font-light rounded-[3px] active:scale-[0.985]"
          >
            Barajar cartas
          </button>
        </div>
      </div>
    </motion.section>
  )
}

function DeckStack({ phase }) {
  // 14 cartas. Más cartas = sensación de mazo real, no de 3-4 tiles flotando.
  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  /* JITTER DETERMINÍSTICO POR CARTA — cada índice tiene su propia
     "personalidad" de carta física: rotación, x/y, escala mínimas.
     Determinístico porque depende del índice; orgánico porque no es
     una progresión lineal. Genera la sensación de que cada carta es
     una pieza con leve uso, no UI clonado. */
  const jitter = (i) => {
    const r1 = Math.sin(i * 12.9898) * 43758.5453
    const r2 = Math.sin(i * 78.233)  * 12345.678
    const r3 = Math.sin(i * 39.421)  * 23456.789
    return {
      rot:  ((r1 - Math.floor(r1)) - 0.5) * 4.2,   // -2.1° a +2.1°
      x:    ((r2 - Math.floor(r2)) - 0.5) * 5.0,   // -2.5px a +2.5px lateral
      yJit: ((r3 - Math.floor(r3)) - 0.5) * 2.0    // -1px a +1px vertical
    }
  }

  /* PRESIÓN DEL CENTRO — las cartas del medio del stack están más
     comprimidas, los bordes ligeramente más abiertos. Crea sensación
     de presión física, no de espaciado matemático. */
  const compression = (i) => {
    const mid    = (cards.length - 1) / 2
    const fromMid = Math.abs(i - mid)
    // Centro: gap chico (0.6px). Bordes: gap mayor (1.5px)
    return 0.6 + (fromMid / mid) * 0.9
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: '142px', height: '212px' }}
        /* Respiración del conjunto entero — muy lenta, casi imperceptible */
        animate={{ scale: [1, 0.997, 1, 1.002, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {cards.map((i) => {
          const isLeft = i % 2 === 0
          const j      = jitter(i)
          // Acumulación de gaps en y: cada carta se apila pero con
          // gap variable según la compresión local.
          let yStackAccum = 0
          for (let k = 0; k <= i; k++) yStackAccum -= compression(k)
          const yStack = yStackAccum + j.yJit

          const baseRotate = (i - (cards.length - 1) / 2) * 0.35 + j.rot

          // microvariación por carta para que los timings no sean idénticos
          const cardDelay = (i % 5) * 0.08

          let target = { x: j.x, y: yStack, rotate: baseRotate }
          let trans  = { duration: 1.0, ease: [0.32, 0.72, 0.24, 1], delay: cardDelay * 0.4 }

          if (phase === 'split') {
            target = {
              x: (isLeft ? -54 : 54) + j.x,
              y: yStack,
              rotate: (isLeft ? -3.5 : 3.5) + j.rot * 0.5
            }
            trans  = { duration: 1.1, ease: [0.32, 0.72, 0.24, 1], delay: cardDelay * 0.5 }
          } else if (phase === 'shuffle') {
            // Vaivén lateral con leve jitter por carta — no idéntico para
            // cada una, las del medio se mueven menos, las de los bordes más.
            const swayAmp = 4 + (i % 3) * 1.5   // 4-7px de variación
            const baseX   = isLeft ? -54 : 54
            target = {
              x: isLeft
                ? [baseX + j.x, baseX + swayAmp + j.x, baseX - 2 + j.x, baseX + swayAmp - 1 + j.x, baseX + j.x]
                : [baseX + j.x, baseX - swayAmp + j.x, baseX + 2 + j.x, baseX - swayAmp + 1 + j.x, baseX + j.x],
              y: [yStack, yStack - 1 - (i % 2), yStack, yStack - 0.5, yStack],
              rotate: [
                (isLeft ? -3.5 : 3.5) + j.rot * 0.5,
                (isLeft ? -4.5 : 4.5) + j.rot * 0.5,
                (isLeft ? -3.0 : 3.0) + j.rot * 0.5,
                (isLeft ? -4.2 : 4.2) + j.rot * 0.5,
                (isLeft ? -3.5 : 3.5) + j.rot * 0.5
              ]
            }
            trans = {
              duration: 3.0 + cardDelay * 0.3,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
              delay: cardDelay * 0.25
            }
          } else if (phase === 'reunite' || phase === 'settle' || phase === 'exit') {
            target = { x: j.x, y: yStack, rotate: baseRotate }
            trans  = { duration: 1.1, ease: [0.32, 0.72, 0.24, 1], delay: cardDelay * 0.3 }
          }

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={target}
              transition={trans}
              style={{ zIndex: i + 1 }}
            >
              <CardBackTile stackIndex={i} stackTotal={cards.length} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

function ChoreographedHand({ side, phase }) {
  let target = { y: 220, opacity: 0, x: 0 }
  let trans  = { duration: 1.6, ease: [0.32, 0.72, 0.24, 1] }

  if (phase === 'enter' || phase === 'split') {
    target = { y: 0, opacity: 0.6, x: 0 }
    trans  = { duration: 1.7, ease: [0.32, 0.72, 0.24, 1] }
  } else if (phase === 'shuffle') {
    target = {
      y: 0,
      opacity: 0.6,
      x: side === 'left' ? [0, 4, -1, 3, -2, 2, 0] : [0, -4, 1, -3, 2, -2, 0]
    }
    trans = {
      duration: 3.0,
      ease: 'easeInOut',
      times: [0, 0.16, 0.32, 0.48, 0.66, 0.82, 1]
    }
  } else if (phase === 'reunite') {
    target = { y: 2, opacity: 0.55, x: 0 }
    trans  = { duration: 1.0, ease: 'easeInOut' }
  } else if (phase === 'settle') {
    target = { y: 6, opacity: 0.5, x: 0 }
    trans  = { duration: 0.8, ease: 'easeInOut' }
  } else if (phase === 'exit') {
    target = { y: 240, opacity: 0, x: 0 }
    trans  = { duration: 1.7, ease: [0.7, 0, 0.84, 0] }
  }

  const positionStyle = side === 'left'
    ? { left:  '4%',  bottom: '-30px', width: '190px', height: '240px' }
    : { right: '4%',  bottom: '-30px', width: '190px', height: '240px' }

  return (
    <motion.div
      className="absolute pointer-events-none text-doradoAlt"
      style={positionStyle}
      initial={{ y: 220, opacity: 0 }}
      animate={target}
      transition={trans}
    >
      <div style={{
        transform: side === 'right' ? 'scaleX(-1)' : 'none',
        width: '100%',
        height: '100%'
      }}>
        <HandOutline />
      </div>
    </motion.div>
  )
}

function ShuffleScreen({ onContinue, onBack }) {
  const [phase, setPhase] = useState('idle')
  // Skip habilitado desde el segundo 1 — quien ya conoce el flujo no
  // debe quedar 5+ segundos esperando. La ritualidad sigue siendo la
  // default (animación completa de ~10.5s); el skip es escape, no atajo
  // que se promueva.
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    // Coreografía cinematográfica — total ~10.3 s
    const timers = []
    timers.push(setTimeout(() => setPhase('enter'),    1000))   // mazo quieto + manos entran
    timers.push(setTimeout(() => setCanSkip(true),     1200))   // skip disponible casi inmediato
    timers.push(setTimeout(() => setPhase('split'),    2700))   // manos toman las dos mitades
    timers.push(setTimeout(() => setPhase('shuffle'),  3700))   // mezcla suave (3 s)
    timers.push(setTimeout(() => setPhase('reunite'),  6700))   // mazo se reúne
    timers.push(setTimeout(() => setPhase('settle'),   7700))   // ajuste final
    timers.push(setTimeout(() => setPhase('exit'),     8500))   // manos salen
    timers.push(setTimeout(() => onContinue(),        10500))   // fade hacia "Cortar el mazo"
    return () => timers.forEach(clearTimeout)
  }, [onContinue])

  /* Mensajes que mudan con el ritual — no explicativos, ambientales */
  const message = (() => {
    if (phase === 'idle')    return 'Las cartas todavía no saben.'
    if (phase === 'enter')   return 'Algo está empezando a moverse.'
    if (phase === 'split')   return 'El mazo se abre.'
    if (phase === 'shuffle') return 'Deja que encuentren su lugar.'
    if (phase === 'reunite') return 'Lo que tenía que pasar, pasó.'
    if (phase === 'settle')  return 'El silencio vuelve.'
    return 'El silencio vuelve.'
  })()

  return (
    <motion.section
      key="shuffle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100svh] ritual-bg constellation text-pergamino overflow-hidden"
    >
      <AtmosphereLayer scene="shuffle" />
      <div className="relative z-10 max-w-[440px] mx-auto px-7 pt-10 pb-12 flex flex-col items-center min-h-[100svh]">
        <header className="w-full grid grid-cols-3 items-center mb-10">
          <button onClick={onBack} className="text-pergamino/70 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Volver">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.9rem] uppercase tracking-[0.28em] text-dorado text-center">
            Barajando
          </h2>
          <span />
        </header>

        <StarDivider className="mb-10" />

        {/* Escena: mesa + manos + mazo */}
        <div className="relative w-full mt-4" style={{ height: '360px', perspective: '1400px' }}>
          {/* Halo lumínico que pulsa durante el shuffle — sugiere ritual */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={
              phase === 'shuffle'
                ? { opacity: [0.18, 0.34, 0.18] }
                : phase === 'reunite' || phase === 'settle'
                  ? { opacity: 0.42 }
                  : { opacity: 0.12 }
            }
            transition={{
              duration: phase === 'shuffle' ? 2.2 : 1.0,
              repeat: phase === 'shuffle' ? Infinity : 0,
              ease: 'easeInOut'
            }}
            style={{
              background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(198,168,90,0.45) 0%, transparent 70%)'
            }}
          />

          {/* Lavado cálido (mesa con luz tenue) */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(198,168,90,0.12) 0%, transparent 65%)'
            }}
          />

          {/* Mazo */}
          <DeckStack phase={phase} />

          {/* Manos cinematográficas */}
          <ChoreographedHand side="left"  phase={phase} />
          <ChoreographedHand side="right" phase={phase} />
        </div>

        {/* Mensaje narrativo que muda con la fase */}
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-serif italic text-pergamino/60 text-center mt-10 text-[1rem] md:text-[1.05rem] leading-[1.7] max-w-[24rem]"
          >
            {message}
          </motion.p>
        </AnimatePresence>

        {/* Skip discreto — aparece sólo después de la mitad del shuffle */}
        <AnimatePresence>
          {canSkip && (
            <motion.button
              key="skip"
              onClick={onContinue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-[0.6rem] tracking-[0.28em] uppercase text-dorado/55 hover:text-dorado/85 font-medium border-b border-dorado/30 hover:border-dorado/60 pb-1 transition-colors"
            >
              Continuar
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

/* =====================================================================
 * CUT DECK — el usuario elige uno de tres montones
 * ===================================================================*/

function CutDeckScreen({ onContinue, onBack }) {
  const [chosen, setChosen] = useState(null)

  const handleSelect = (idx) => {
    if (chosen !== null) return
    setChosen(idx)
    setTimeout(onContinue, 1200)
  }

  return (
    <motion.section
      key="cut"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[100svh] ritual-bg constellation text-pergamino"
    >
      <AtmosphereLayer scene="cut" />
      <div className="relative z-10 max-w-[640px] mx-auto px-6 pt-10 pb-12 flex flex-col items-center min-h-[100svh]">
        <header className="w-full grid grid-cols-3 items-center mb-10">
          <button onClick={onBack} className="text-pergamino/70 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Volver">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.9rem] uppercase tracking-[0.28em] text-dorado text-center">
            Corta el Mazo
          </h2>
          <span />
        </header>

        <StarDivider className="mb-12" />

        <p className="font-serif italic text-pergamino/55 text-[0.98rem] leading-[1.7] text-center max-w-[26rem] mb-14">
          Elige el grupo que más te atraiga. No pienses demasiado.
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-[520px]">
          {[0, 1, 2].map((idx) => {
            const isChosen   = chosen === idx
            const isFaded    = chosen !== null && chosen !== idx
            return (
              <motion.button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={chosen !== null}
                className="relative aspect-[2/3] focus:outline-none"
                animate={{
                  y: isChosen ? -22 : 0,
                  opacity: isFaded ? 0.18 : 1,
                  scale: isChosen ? 1.04 : 1
                }}
                whileHover={chosen === null ? { y: -6 } : {}}
                whileTap={chosen === null ? { scale: 0.98 } : {}}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0.24, 1] }}
              >
                <DeckPile seed={idx} chosen={isChosen} />
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {chosen !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-12 text-[0.62rem] tracking-[0.28em] uppercase text-dorado/80 font-light"
            >
              Mazo elegido
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

/** Pila pequeña de 5 reversos con leve desorden — usada en CutDeckScreen */
function DeckPile({ seed = 0, chosen = false }) {
  // Offsets pseudoaleatorios pero deterministas según seed
  const rand = (i) => {
    const x = Math.sin(seed * 13 + i * 7) * 1000
    return x - Math.floor(x) // 0-1
  }

  return (
    <div className="absolute inset-0">
      {[0, 1, 2, 3, 4].map((i) => {
        const dx = (rand(i) - 0.5) * 6        // -3..3 px
        const dy = -i * 1.6                    // se apilan hacia arriba
        const rot = (rand(i + 9) - 0.5) * 6   // -3..3 deg
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
              zIndex: i + 1,
              filter: chosen ? 'drop-shadow(0 0 18px rgba(198,168,90,0.18))' : 'none'
            }}
          >
            <CardBackTile />
          </div>
        )
      })}
    </div>
  )
}

function Tirada({ count, intention, onCarta, onHome }) {
  const [tirada,   setTirada]   = useState(() => pickRandomCards(DECK, count))
  const [revealed, setRevealed] = useState(() => Array(count).fill(false))

  const reset = () => {
    setRevealed(Array(count).fill(false))
    setTimeout(() => setTirada(pickRandomCards(DECK, count)), 380)
  }

  const flip = (idx) => {
    setRevealed(prev => prev.map((v, i) => (i === idx ? !v : v)))
  }

  /* Stagger irregular para que no se sienta sincronizado.
     En tirada de 3, las cartas voltean con microdesfases humanos. */
  const revealAll = () => {
    if (count === 1) {
      setRevealed([true])
      return
    }
    const staggers = [0, 280, 520]   // ms — irregular, no uniforme
    staggers.forEach((delay, i) => {
      setTimeout(() => {
        setRevealed(prev => prev.map((v, idx) => idx === i ? true : v))
      }, delay)
    })
  }

  const allRevealed = revealed.every(Boolean)
  const isThree = count === 3
  const someRevealed = revealed.some(Boolean)

  return (
    <motion.section
      key={`tirada-${count}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[100svh] ritual-bg constellation text-pergamino"
    >
      <AtmosphereLayer scene="reading" />
      <div className="relative z-10 max-w-[700px] mx-auto px-6 pt-10 pb-12 flex flex-col">
        <header className="grid grid-cols-3 items-center mb-6">
          <button onClick={onHome} className="text-pergamino/85 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Volver">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.9rem] uppercase tracking-[0.28em] text-dorado text-center">
            {isThree ? 'Tirada de 3 Cartas' : 'Carta del Momento'}
          </h2>
          <span />
        </header>

        {!allRevealed && (
          <p className="text-center font-light text-pergamino/65 text-[0.78rem] tracking-[0.02em] mt-3 mb-10">
            Toca {isThree ? 'las cartas' : 'la carta'} para revelarlas
          </p>
        )}

        {allRevealed && <StarDivider className="mt-3 mb-10" />}

        {isThree ? (
          <div className="grid grid-cols-3 gap-4 md:gap-7 px-2 mb-8">
            {tirada.map((slot, idx) => (
              <div key={`${slot.card.id}-${idx}`} className="flex flex-col items-center">
                <SlotMarco>
                  <CartaFlippable
                    card={slot.card}
                    reversed={slot.reversed}
                    revealed={revealed[idx]}
                    onFlip={() => flip(idx)}
                  />
                </SlotMarco>
                <p className="mt-4 text-[0.7rem] font-serif italic text-dorado/75 text-center min-h-[1rem]">
                  {POSICIONES_TIRADA[idx].titulo}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center mb-10">
            <div className="w-[230px] md:w-[280px]">
              <SlotMarco>
                <CartaFlippable
                  card={tirada[0].card}
                  reversed={tirada[0].reversed}
                  revealed={revealed[0]}
                  onFlip={() => flip(0)}
                />
              </SlotMarco>
            </div>
          </div>
        )}

        {/* Botón "REVELAR CARTAS" — visible mientras no estén todas reveladas */}
        {!allRevealed && (
          <>
            <StarDivider className="my-8" />
            <button
              onClick={revealAll}
              className="mx-auto inline-flex items-center justify-center gap-3 btn-ritual text-pergamino px-10 py-3 rounded-[3px] text-[0.66rem] tracking-[0.30em] uppercase font-light active:scale-[0.985]"
            >
              <span>{isThree ? 'Revelar cartas' : 'Revelar carta'}</span>
            </button>
          </>
        )}

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              {/* Pregunta/intención escrita por la usuaria — arriba, sutil */}
              {intention && intention.length > 0 && (
                <div className="text-center mb-10 px-4">
                  <p className="text-[0.58rem] tracking-[0.28em] uppercase text-pergamino/35 font-light mb-3">
                    Sobre
                  </p>
                  <p className="font-serif italic text-pergamino/45 text-[0.95rem] md:text-[1rem] leading-[1.7] max-w-[28rem] mx-auto">
                    «{intention}»
                  </p>
                </div>
              )}

              {isThree ? (
                <ComposedReading tirada={tirada} onCarta={onCarta} />
              ) : (
                <div className="space-y-7 px-2 max-w-[40rem] mx-auto">
                  {tirada.map((slot, idx) => {
                    const content = findContentByCard(slot.card, slot.reversed)
                    return (
                      <button
                        key={`int-${slot.card.id}-${idx}`}
                        onClick={() => onCarta(slot.card, slot.reversed)}
                        className="block w-full text-left active:scale-[0.995] transition-transform"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-dorado/80 mt-1 shrink-0"><StarTiny size={10} /></span>
                          <div className="flex-1">
                            {slot.reversed && (
                              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-vino/85 font-medium mb-2">invertida</p>
                            )}
                            <p className="font-serif text-pergamino text-[1.05rem] mb-2">{slot.card.nombre}</p>
                            {content ? (
                              <>
                                <p className="font-serif italic text-dorado/85 text-[0.95rem] mb-3">{content.essence}</p>
                                <p className="font-light text-pergamino/80 text-[0.92rem] leading-[1.85] mb-3">
                                  {content.reading}
                                  {(() => {
                                    const sit = composeSituations(content.manifestations)
                                    return sit ? ' ' + sit : ''
                                  })()}
                                </p>
                                <p className="font-serif italic text-pergamino/75 text-[0.9rem] leading-[1.7] pt-3 border-t border-dorado/15">
                                  <span className="text-dorado font-sans not-italic mr-2">→</span>
                                  {content.prompt}
                                </p>
                              </>
                            ) : (
                              <p className="font-light text-pergamino/75 text-[0.92rem] leading-[1.85]">
                                {slot.reversed ? slot.card.invertido : slot.card.derecho}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              <button
                onClick={reset}
                className="mx-auto mt-12 flex items-center justify-center gap-3 btn-ghost-ritual text-pergamino px-10 py-3 rounded-[3px] text-[0.66rem] tracking-[0.30em] uppercase font-light active:scale-[0.985]"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.3} />
                <span>Nueva tirada</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

/* =====================================================================
 * CRUZ CELTA — la experiencia profunda
 *
 *  Flujo:
 *    intro    → mensaje de apertura, fade lento
 *    reveal   → carta por carta, una a la vez, con whisper adaptativo
 *    reading  → layout cross+staff + síntesis larga
 *
 *  Cada carta se revela manualmente con tap (control + ritual).
 *  La síntesis final viene de composeCelticReading.
 * ===================================================================*/

/* Wrapper que selecciona 10 cartas una sola vez al montar y se las
 * entrega a CruzCeltica. Aísla el azar del re-render. */
function CruzCelticaWrapper({ intention, onCarta, onHome }) {
  const [cards] = useState(() => pickRandomCards(DECK, CELTIC_POSITION_COUNT))
  return (
    <CruzCeltica
      cards={cards}
      intention={intention}
      onCarta={onCarta}
      onHome={onHome}
    />
  )
}


function CruzCeltica({ cards, intention, onCarta, onHome }) {
  const [phase, setPhase]                 = useState('intro')
  const [revealedCount, setRevealedCount] = useState(0)

  /* Auto-fade del intro (3.5s) */
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(() => setPhase('reveal'), 3500)
    return () => clearTimeout(t)
  }, [phase])

  /* Cuando todas las cartas están reveladas, pausa breve y entrar en reading */
  useEffect(() => {
    if (revealedCount < CELTIC_POSITION_COUNT) return
    const t = setTimeout(() => setPhase('reading'), 1400)
    return () => clearTimeout(t)
  }, [revealedCount])

  const revealNext = () => {
    setRevealedCount(c => Math.min(c + 1, CELTIC_POSITION_COUNT))
  }
  const revealPrev = () => {
    setRevealedCount(c => Math.max(c - 1, 0))
  }

  /* Contenido por carta — usado tanto en reveal como en reading */
  const slots = cards.map((slot, i) => ({
    slot,
    pos:     CELTIC_POSITIONS[i],
    content: findContentByCard(slot.card, slot.reversed)
  }))

  /* === RENDER === */
  return (
    <motion.section
      key="cruzceltica"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative min-h-[100svh] bg-noche text-pergamino overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #0c1827 0%, #060c14 70%)'
      }}
    >
      <AtmosphereLayer scene="tirada" />

      <div className="relative z-10 max-w-[700px] mx-auto px-6 pt-8 pb-12 flex flex-col items-center min-h-[100svh]">
        {/* Header */}
        <header className="w-full grid grid-cols-3 items-center mb-6">
          <button onClick={onHome} className="text-pergamino/70 hover:text-dorado active:scale-[0.96] transition justify-self-start" aria-label="Salir del ritual">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[0.85rem] uppercase tracking-[0.28em] text-dorado/85 text-center">
            Cruz Celta
          </h2>
          <span />
        </header>

        {/* PHASE 1 — INTRO */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-[28rem]"
            >
              <div className="text-dorado/60 mb-8"><CompassStar size={56} /></div>
              <p className="font-serif italic text-pergamino/75 text-[1.05rem] leading-[1.85] mb-6">
                Diez cartas se acomodan en silencio sobre la mesa.
              </p>
              <p className="font-serif italic text-pergamino/55 text-[0.95rem] leading-[1.85]">
                Vas a ver una por vez. Cada una pesa.
              </p>
              {intention && (
                <p className="mt-10 font-serif italic text-dorado/55 text-[0.92rem] leading-[1.7] max-w-[24rem]">
                  «{intention}»
                </p>
              )}
            </motion.div>
          )}

          {/* PHASE 2 — REVEAL UNO A UNO */}
          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="flex-1 w-full flex flex-col items-center"
            >
              {/* Intención persistente — header sutil arriba de la
                  pantalla de revelación. No grita, pero el usuario sabe
                  que su pregunta sigue acompañando la lectura. */}
              {intention && intention.length > 0 && (
                <div className="text-center mb-6 px-4 max-w-[32rem]">
                  <p className="font-serif italic text-dorado/45 text-[0.85rem] md:text-[0.9rem] leading-[1.7]">
                    «{intention}»
                  </p>
                </div>
              )}
              <CelticRevealStage
                slots={slots}
                revealedCount={revealedCount}
                onReveal={revealNext}
                onUnreveal={revealPrev}
                onCarta={onCarta}
              />
            </motion.div>
          )}

          {/* PHASE 3 — LECTURA COMPLETA */}
          {phase === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
              className="w-full"
            >
              {/* Intención persistente — header de la lectura completa.
                  La pregunta que el usuario trajo sigue siendo el eje. */}
              {intention && intention.length > 0 && (
                <div className="text-center mb-8 px-6 max-w-[34rem] mx-auto">
                  <p className="text-[0.56rem] tracking-[0.30em] uppercase text-dorado/55 font-light mb-3">
                    La pregunta
                  </p>
                  <p className="font-serif italic text-pergamino/70 text-[0.95rem] md:text-[1rem] leading-[1.75]">
                    «{intention}»
                  </p>
                  <div className="mx-auto w-8 h-px bg-dorado/30 mt-4" />
                </div>
              )}
              <CelticFullReading
                slots={slots}
                cards={cards}
                onCarta={onCarta}
                onReset={onHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}


/* ---------- REVEAL STAGE — carta por carta ---------- */
function CelticRevealStage({ slots, revealedCount, onReveal, onUnreveal, onCarta }) {
  const isComplete       = revealedCount >= CELTIC_POSITION_COUNT
  const nextIdx          = Math.min(revealedCount, CELTIC_POSITION_COUNT - 1)
  const nextSlot         = slots[nextIdx]
  const lastRevealedIdx  = revealedCount - 1
  const lastRevealedSlot = lastRevealedIdx >= 0 ? slots[lastRevealedIdx] : null

  /* La posición que se está mostrando (la última revelada si hay,
     si no la próxima a revelar). Esto da contexto SIEMPRE. */
  const focusSlot = lastRevealedSlot || nextSlot
  const focusIdx  = lastRevealedSlot ? lastRevealedIdx : nextIdx

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* === ENCABEZADO DE POSICIÓN — siempre visible === */}
      <div className="text-center mb-5 px-4 max-w-[30rem]">
        <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/55 font-medium mb-2">
          Carta {Math.min(revealedCount + 1, CELTIC_POSITION_COUNT)} de {CELTIC_POSITION_COUNT}
          {focusSlot && (
            <span className="text-pergamino/35 mx-2">·</span>
          )}
          {focusSlot && (
            <span className="text-dorado/75">{focusSlot.pos.role}</span>
          )}
        </p>
        <p className="font-serif text-pergamino text-[1.05rem] md:text-[1.15rem] leading-[1.5] mb-1">
          {focusSlot?.pos.label}
        </p>
        <p className="text-[0.6rem] tracking-[0.18em] text-pergamino/40 italic font-serif">
          ({focusSlot?.pos.classical})
        </p>
      </div>

      {/* === Barra de progreso visual === */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: CELTIC_POSITION_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === focusIdx
                ? 'bg-dorado w-5'
                : i < revealedCount
                  ? 'bg-dorado/65 w-3'
                  : 'bg-pergamino/15 w-3'
            }`}
          />
        ))}
      </div>

      {/* === Carta actual o reverso esperando tap === */}
      <div className="w-[210px] md:w-[230px] mb-6">
        {!isComplete && (
          <button
            onClick={onReveal}
            className="block w-full active:scale-[0.985] transition-transform"
            aria-label={`Revelar carta ${revealedCount + 1} de ${CELTIC_POSITION_COUNT}: ${nextSlot.pos.label}`}
          >
            <SlotMarco>
              {revealedCount === 0 || !lastRevealedSlot ? (
                <CardBackTile />
              ) : (
                <CartaMarco card={lastRevealedSlot.slot.card} reversed={lastRevealedSlot.slot.reversed} />
              )}
            </SlotMarco>
          </button>
        )}
        {isComplete && lastRevealedSlot && (
          <SlotMarco>
            <CartaMarco card={lastRevealedSlot.slot.card} reversed={lastRevealedSlot.slot.reversed} />
          </SlotMarco>
        )}
      </div>

      {/* === Contenido de la carta revelada === */}
      <AnimatePresence mode="wait">
        {lastRevealedSlot && (
          <motion.div
            key={`whisper-${lastRevealedIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-[28rem] px-4 mb-6"
          >
            <p className="font-serif italic text-pergamino text-[1.05rem] leading-[1.7] mb-3">
              {lastRevealedSlot.slot.card.nombre}
            </p>
            {lastRevealedSlot.content?.essence && (
              <p className="font-serif italic text-dorado/80 text-[0.9rem] mb-3">
                {lastRevealedSlot.content.essence}
              </p>
            )}
            <p className="font-light text-pergamino/65 text-[0.88rem] leading-[1.85]">
              {composeCardWhisper(lastRevealedIdx, lastRevealedSlot.content)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Controles: volver / siguiente === */}
      <div className="flex items-center gap-6 mt-2">
        {revealedCount > 0 && !isComplete && (
          <button
            onClick={onUnreveal}
            className="text-[0.58rem] tracking-[0.26em] uppercase text-pergamino/45 hover:text-dorado/75 font-medium transition-colors flex items-center gap-1.5"
            aria-label="Volver a la carta anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Anterior</span>
          </button>
        )}

        {!isComplete && (
          <button
            onClick={onReveal}
            className="text-[0.62rem] tracking-[0.28em] uppercase text-dorado/85 hover:text-dorado font-medium border-b border-dorado/40 hover:border-dorado/85 pb-1 transition-colors"
          >
            {revealedCount === 0
              ? 'Revelar primera carta'
              : revealedCount < CELTIC_POSITION_COUNT - 1
                ? 'Revelar siguiente'
                : 'Revelar última'}
          </button>
        )}
      </div>

      {isComplete && (
        <p className="font-serif italic text-dorado/65 text-[0.95rem] mt-4 text-center max-w-[24rem]">
          Todo está sobre la mesa. Espera un momento.
        </p>
      )}

      {/* GESTO DE ADE — aparece solo cuando todas las cartas están
          reveladas, al pie izquierdo. Acompaña el "Todo está sobre la
          mesa". Es la única vez que Ade aparece en esta pantalla. */}
      <AnimatePresence>
        {isComplete && (
          <AdePresence
            key="ade-celtic-complete"
            side="bottom-left"
            size={72}
            opacity={0.45}
          />
        )}
      </AnimatePresence>
    </div>
  )
}


/* ---------- LECTURA COMPLETA — INFORME SIMBÓLICO en 8 capas + layout ----------
 *
 * Esta vista NO es una tirada corta expandida — es un informe denso que
 * trata las 10 cartas como un sistema de fuerzas, no como suma. Cada
 * capa tiene microheading y voz editorial distinta:
 *
 *   1. tesis        — hipótesis específica de la tirada
 *   2. macros       — predominancia de patrones humanos
 *   3. layout       — visual cruz+staff
 *   4. núcleo       — carta 1 + carta 2 como relación
 *   5. fuerzas push — pasado + corona + futuro próximo
 *   6. fuerzas hold — base + entorno + interno
 *   7. dominantes   — qué carta o palo reconfigura la lectura
 *   8. invertidas   — qué se distorsiona, modifica hipótesis
 *   9. escenas      — situaciones humanas observables
 *  10. cierre       — eco + dirección posible
 *
 * Cada sección solo se renderiza si tiene contenido — si el informe no
 * detectó X, X no aparece en pantalla.
 * ------------------------------------------------------------------- */
function CelticFullReading({ slots, cards, onCarta, onReset }) {
  /* Compose la lectura larga con todas las cartas */
  const reading = useMemo(() => composeCelticReading(slots), [slots])
  if (!reading) return null

  // El informe denso (8 capas). Si por algún motivo no existe, caemos
  // al compositor reducido (narrative) que es más corto.
  const r = reading.report
  const n = reading.narrative

  return (
    <div className="px-1 max-w-[640px] mx-auto">
      {/* TESIS — hipótesis específica de esta tirada. */}
      {r?.thesis && (
        <div className="text-center max-w-[34rem] mx-auto mb-7">
          <div className="flex items-center justify-center gap-3 mb-4 text-dorado/65">
            <span className="h-px w-8 bg-dorado/35" />
            <StarTiny size={9} />
            <span className="h-px w-8 bg-dorado/35" />
          </div>
          <p className="font-serif italic text-dorado/95 text-[1.12rem] md:text-[1.20rem] leading-[1.68]">
            {r.thesis}
          </p>
        </div>
      )}

      {/* MACROS — patrones detectados sobre las 10 cartas. */}
      {r?.macros && r.macros.length >= 2 && (
        <p className="text-center text-[0.58rem] tracking-[0.28em] uppercase text-pergamino/45 font-medium mb-8">
          Predomina: {r.macros.slice(0, 4).map(m => m.label).join(' · ')}
        </p>
      )}

      {/* Layout cross+staff — visual del recorrido */}
      <CelticLayout slots={slots} onCarta={onCarta} />

      <StarDivider className="my-10" />

      {/* DESARROLLO — 8 capas con microheadings.
          Cada sección solo aparece si tiene contenido propio. */}
      <div className="max-w-[34rem] mx-auto space-y-9">
        {/* NÚCLEO — relación entre carta 1 (presente) y carta 2 (cruce) */}
        {r?.core && (
          <section>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-3">
              Núcleo
            </p>
            <p className="font-light text-pergamino/85 text-[0.95rem] leading-[1.95]">
              {r.core}
            </p>
          </section>
        )}

        {/* FUERZAS QUE EMPUJAN — pasado + corona + futuro próximo */}
        {r?.pushing && (
          <section>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-3">
              Fuerzas que empujan
            </p>
            <p className="font-light text-pergamino/85 text-[0.94rem] leading-[1.95]">
              {r.pushing}
            </p>
          </section>
        )}

        {/* FUERZAS QUE RETIENEN — base + entorno + interno */}
        {r?.holding && (
          <section>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-3">
              Fuerzas que retienen
            </p>
            <p className="font-light text-pergamino/85 text-[0.94rem] leading-[1.95]">
              {r.holding}
            </p>
          </section>
        )}

        {/* CARTAS DOMINANTES — qué reconfigura la lectura */}
        {r?.dominants && (
          <section className="pl-3 border-l border-dorado/40">
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/85 font-medium mb-3">
              Lo que reconfigura la lectura
            </p>
            <p className="font-light text-pergamino/85 text-[0.94rem] leading-[1.95]">
              {r.dominants}
            </p>
          </section>
        )}

        {/* SISTEMA DE INVERTIDAS — modifica la hipótesis principal */}
        {r?.inversions && (
          <section className="pl-3 border-l border-vino/45">
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-vino/75 font-medium mb-3">
              Cómo cambia con las invertidas
            </p>
            <p className="font-light text-pergamino/80 text-[0.93rem] leading-[1.9]">
              {r.inversions}
            </p>
          </section>
        )}

        {/* SITUACIONES HUMANAS — escenas observables, no símbolo */}
        {r?.scenes && r.scenes.length >= 1 && (
          <section>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-3">
              Cómo se nota esto en lo cotidiano
            </p>
            <ul className="space-y-2.5">
              {r.scenes.map((scene, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-dorado/55 mt-2 shrink-0"><StarTiny size={6} /></span>
                  <span className="font-light text-pergamino/80 text-[0.92rem] leading-[1.85]">
                    {scene}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <StarDivider className="my-10" />

      {/* CIERRE NARRATIVO — eco + dirección posible, sin moraleja */}
      {r?.closing && (
        <div className="text-center max-w-[34rem] mx-auto mb-8">
          <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-4">
            Cierre
          </p>
          <p className="font-serif italic text-pergamino/90 text-[1.06rem] md:text-[1.10rem] leading-[1.7]">
            {r.closing}
          </p>
        </div>
      )}

      {/* Pregunta de cierre — viene de la carta 10 (horizonte). */}
      <div className="text-center max-w-[28rem] mx-auto mb-10 mt-8">
        <p className="text-[0.6rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-5">
          Para mirar después
        </p>
        <p className="font-serif italic text-pergamino text-[1.08rem] leading-[1.7]">
          <span className="text-dorado font-sans not-italic mr-2">→</span>
          {reading.closing}
        </p>
      </div>

      {/* Volver */}
      <div className="flex justify-center mt-12">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-3 btn-ghost-ritual text-pergamino px-8 py-3 rounded-[3px] text-[0.66rem] tracking-[0.30em] uppercase font-light active:scale-[0.985]"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.3} />
          <span>Volver al inicio</span>
        </button>
      </div>
    </div>
  )
}


/* ---------- LAYOUT CROSS + STAFF ---------- */
function CelticLayout({ slots, onCarta }) {
  /* DISPOSICIÓN RITUAL — no es "cruz a la izquierda + staff a la derecha"
     como dashboard. Es UNA composición unificada sobre una superficie
     ritual: cruz central + staff lateral conectados por líneas alquímicas
     casi invisibles. Cada carta tiene tilt orgánico determinístico para
     que no parezcan grids. */
  const [present, crossing, crown, foundation, past, future, ...staff] = slots

  /* Tilt orgánico determinístico por posición — cartas no idénticas, cada
     una con leve personalidad. El usuario no nota la rotación individual,
     pero registra que las cartas no están alineadas como grid. */
  const tilt = (i) => {
    const r = Math.sin(i * 12.9898 + 78.233) * 43758.5453
    return ((r - Math.floor(r)) - 0.5) * 2.4  // -1.2° a +1.2°
  }

  /* Renderiza una carta sobre la mesa ritual — sombra suave entre cartas,
     ring dorado tenue, tilt orgánico, hover sutil. */
  const card = (s, idx) => (
    <motion.button
      onClick={() => onCarta(s.slot.card, s.slot.reversed)}
      className="block w-full active:scale-[0.985] group text-left"
      style={{ transform: `rotate(${tilt(idx)}deg)` }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0.24, 1] }}
      aria-label={`${s.pos.label}: ${s.slot.card.nombre}`}
    >
      <div className="aspect-[2/3] w-full rounded-[4px] overflow-hidden ring-1 ring-dorado/30 group-hover:ring-dorado/65 shadow-ritual transition-shadow">
        <CartaMarco card={s.slot.card} reversed={s.slot.reversed} showLabel={false} />
      </div>
      <p className="mt-1.5 text-[0.48rem] tracking-[0.22em] uppercase text-dorado/55 text-center leading-tight font-light">
        {s.pos.label}
      </p>
    </motion.button>
  )

  return (
    <div className="relative max-w-[640px] mx-auto">

      {/* CAPA 1 — SUPERFICIE RITUAL DE FONDO.
          Geometría alquímica grande detrás de toda la disposición.
          Opacidad muy baja: existe, no protagoniza. */}
      <div className="absolute inset-x-0 top-[5%] bottom-[5%] flex items-start justify-center pointer-events-none text-dorado">
        <div className="relative w-[460px] h-[460px] md:w-[520px] md:h-[520px]">
          <RitualGeometry size={520} opacity={0.07} className="absolute inset-0 ritual-breath" />
        </div>
      </div>

      {/* CAPA 2 — POLVO DORADO MÍNIMO sobre la mesa ritual.
          Partículas tenues que sugieren que el aire tiene materia. */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="atmo-star" style={{ top: '18%', left: '20%' }} />
        <span className="atmo-star" style={{ top: '8%',  right: '24%', animationDelay: '2.5s' }} />
        <span className="atmo-star" style={{ top: '48%', left: '8%',  animationDelay: '1.2s' }} />
        <span className="atmo-star" style={{ top: '70%', right: '18%', animationDelay: '3.4s' }} />
        <span className="atmo-star" style={{ bottom: '12%', left: '36%', animationDelay: '0.8s' }} />
      </div>

      {/* CAPA 3 — DISPOSICIÓN DE LAS CARTAS.
          flex-row en escritorio (cruz + staff lado a lado, conectados);
          flex-col en mobile (cruz arriba, staff abajo) sin separación. */}
      <div className="relative flex flex-col md:flex-row gap-6 md:gap-5 items-center md:items-center justify-center px-4 py-6">

        {/* CRUZ — composición compacta. Gap reducido (gap-1 móvil, gap-1.5
            escritorio) para que las cartas se sientan agrupadas, no
            espaciadas. */}
        <div className="relative grid grid-cols-3 gap-1 md:gap-1.5 w-full max-w-[320px] md:max-w-[340px]">

          {/* Glow cálido que envuelve la cruz — la disposición tiene una
              "luz central" sobre la carta del presente. */}
          <div
            className="absolute inset-0 -inset-x-4 -inset-y-4 pointer-events-none ritual-breath"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(198,168,90,0.10) 0%, rgba(198,168,90,0.04) 40%, transparent 70%)',
              filter: 'blur(6px)',
              zIndex: 0
            }}
          />

          <div />
          <div className="relative z-[2]">{card(crown, 2)}</div>
          <div />

          <div className="relative z-[2]">{card(past, 4)}</div>

          {/* Núcleo: presente + cruce superpuesto. La carta del cruce está
              rotada 90° y semi-transparente, como en la cruz celta tradicional. */}
          <div className="relative z-[3]">
            {card(present, 0)}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div style={{ transform: 'rotate(90deg)', width: '100%' }}>
                <motion.button
                  onClick={() => onCarta(crossing.slot.card, crossing.slot.reversed)}
                  className="block w-full pointer-events-auto active:scale-[0.985]"
                  aria-label={`${crossing.pos.label}: ${crossing.slot.card.nombre}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0.24, 1] }}
                >
                  <div
                    className="aspect-[2/3] w-full rounded-[4px] overflow-hidden ring-1 ring-vino/55 shadow-ritual"
                    style={{ opacity: 0.93 }}
                  >
                    <CartaMarco card={crossing.slot.card} reversed={crossing.slot.reversed} showLabel={false} />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="relative z-[2]">{card(future, 5)}</div>

          <div />
          <div className="relative z-[2]">{card(foundation, 3)}</div>
          <div />
        </div>

        {/* CONECTOR — línea fina dorada que une la cruz con el staff.
            Solo visible en escritorio. Funciona como hilo alquímico
            que sostiene la disposición como una sola pieza. */}
        <div className="hidden md:flex flex-col items-center justify-center self-stretch px-1">
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-dorado/25 to-transparent" />
          <span className="my-2 text-dorado/40"><StarTiny size={6} /></span>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-dorado/25 to-transparent" />
        </div>

        {/* STAFF — columna vertical en escritorio, fila compacta en mobile.
            Orden tradicional Rider-Waite: de abajo hacia arriba viene self,
            environment, inner, horizon. En la columna desktop el horizonte
            (carta 10) corona la pila; self (carta 7) queda al pie.
            Por eso usamos md:flex-col-reverse — el array sigue siendo
            [self, env, inner, horizon] pero visualmente se invierte. */}
        <div className="relative flex md:flex-col-reverse gap-1.5 md:gap-2 w-full max-w-[320px] md:w-[88px]">
          {staff.map((s, i) => (
            <div key={i} className="flex-1 md:w-full relative z-[2]">
              {card(s, 6 + i)}
            </div>
          ))}
        </div>
      </div>

      {/* CAPA 4 — Ade observador en esquina inferior izquierda.
          Muy tenue, casi una silueta. Sugiere que la disposición está
          siendo mirada por una presencia. */}
      <div className="hidden md:block absolute -bottom-2 left-2 pointer-events-none opacity-25 z-[1]">
        <AdeGlyph className="w-[64px]" />
      </div>
    </div>
  )
}


/**
 * ComposedReading — sintetiza una tirada de 3 cartas usando:
 *   · contentBridge       → contenido por carta (Mayor o Menor)
 *   · relationalEngine    → atmósfera + movimiento + síntesis relacional
 *
 * La síntesis NO es una suma de cartas individuales: surge de la
 * INTERACCIÓN entre las tres (temperatura, dirección, contradicciones,
 * concentración de palos, presencia de Mayores, ritmo).
 */
function ComposedReading({ tirada, onCarta }) {
  // 1. Contenido por carta — viene de los datasets simbólicos.
  //    Si la carta está invertida, traemos la versión invertida (si existe).
  const slots = tirada.map(slot => ({
    slot,
    content: findContentByCard(slot.card, slot.reversed)
  }))

  // 2. Cards mínimas para el motor relacional (name / suit+number),
  //    cargando el flag `reversed` para que los atributos relacionales
  //    se inviertan si la carta cayó al revés.
  const engineCards = tirada.map(s => ({ ...toEngineCard(s.card), reversed: s.reversed }))

  // 3. Composición relacional — atmósfera, movimiento, síntesis.
  const relational = composeRelationalReading(engineCards)

  // 4. Memoria emocional — eco con tiradas anteriores, si aplica.
  //    Se calcula ANTES de guardar la atmósfera actual, así no se
  //    compara consigo misma. Después se persiste para la próxima.
  const echoLine = useMemo(() => {
    const line = composeEchoLine(relational.diagnosis)
    saveAtmosphere(relational.diagnosis)
    return line
  // Sólo se calcula al montar la lectura; eslint queda contento.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 5. Pregunta de cierre — viene de la 3ra carta (whatOpens) si tiene
  //    prompt; si no, fallback honesto.
  const closingPrompt =
    slots[2]?.content?.prompt ||
    'Si dejaras que esta tirada respire un poco más, ¿qué cambiaría?'

  // ARQUITECTURA NUEVA — lectura como informe interpretativo.
  // La tirada parte de una TESIS y las cartas justifican esa tesis.
  // Las secciones que no tienen contenido no se renderizan.
  const n = relational.narrative

  return (
    <div className="px-2 max-w-[40rem] mx-auto">
      {/* TESIS — apertura. Es la observación de la lectura, no atmósfera.
          Tipografía más grande, italic, dorado fuerte. Acompañada de
          divisor para marcar que es el centro de gravedad textual. */}
      {n?.thesis && (
        <div className="text-center max-w-[34rem] mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 text-dorado/65">
            <span className="h-px w-8 bg-dorado/35" />
            <StarTiny size={9} />
            <span className="h-px w-8 bg-dorado/35" />
          </div>
          <p className="font-serif italic text-dorado/95 text-[1.08rem] md:text-[1.12rem] leading-[1.7]">
            {n.thesis}
          </p>
        </div>
      )}

      {/* MACROS — lista corta de patrones detectados. "Predomina: X · Y · Z".
          Solo visible si hay 2+ macros, en tipografía pequeña uppercase. */}
      {n?.macros && n.macros.length >= 2 && (
        <p className="text-center text-[0.58rem] tracking-[0.28em] uppercase text-pergamino/45 font-medium mb-8">
          Predomina: {n.macros.slice(0, 3).map(m => m.label).join(' · ')}
        </p>
      )}

      {/* NÚCLEO — qué pasa en el centro (cartas 1 y 2) */}
      {n?.core && (
        <p className="font-light text-pergamino/85 text-[0.95rem] leading-[1.95] max-w-[32rem] mx-auto mb-6">
          {n.core}
        </p>
      )}

      {/* TENSIÓN — qué sostiene el conflicto */}
      {n?.tension && (
        <p className="font-light text-pergamino/80 text-[0.92rem] leading-[1.9] max-w-[32rem] mx-auto mb-6">
          {n.tension}
        </p>
      )}

      {/* INVERTIDAS — solo si hay 2+ cartas al revés y cambian el tono */}
      {n?.inversions && (
        <div className="max-w-[32rem] mx-auto mb-8 pl-3 border-l border-vino/35">
          <p className="text-[0.58rem] tracking-[0.28em] uppercase text-vino/75 font-medium mb-2">
            Sobre las invertidas
          </p>
          <p className="font-light text-pergamino/75 text-[0.9rem] leading-[1.85]">
            {n.inversions}
          </p>
        </div>
      )}

      <StarDivider className="my-8" />

      {/* 3 POSICIONES — las cartas como evidencia.
          Microheading "La evidencia" para que se lea como sostén de la tesis,
          no como suma de significados. */}
      <p className="text-center text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-7">
        La evidencia
      </p>
      <div className="space-y-7 mb-10">
        {slots.map(({ slot, content }, idx) => {
          const positionKey   = ['whatIs', 'whatCrosses', 'whatOpens'][idx]
          const positionLabel = ['Lo que está', 'Lo que cruza', 'Lo que se abre'][idx]
          const positionText  = content?.positions?.[positionKey] || content?.reading || ''
          return (
            <button
              key={`pos-${idx}`}
              onClick={() => onCarta(slot.card, slot.reversed)}
              className="block w-full text-left active:scale-[0.995] transition-transform"
            >
              <div className="flex items-start gap-3">
                <span className="text-dorado/80 mt-1 shrink-0"><StarTiny size={10} /></span>
                <div className="flex-1">
                  <p className="text-[0.62rem] tracking-[0.26em] uppercase text-dorado/85 font-medium mb-2">
                    {positionLabel}
                    {slot.reversed && (
                      <span className="ml-3 text-vino/85">· invertida</span>
                    )}
                  </p>
                  <p className="font-serif text-pergamino text-[1rem] mb-1.5">{slot.card.nombre}</p>
                  {content?.essence && (
                    <p className="font-serif italic text-dorado/75 text-[0.85rem] mb-2">
                      {content.essence}
                    </p>
                  )}
                  <p className="font-light text-pergamino/80 text-[0.92rem] leading-[1.85]">
                    {positionText}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* SÍNTESIS — qué pide la lectura. */}
      {n?.synthesis && (
        <>
          <StarDivider className="my-8" />
          <div className="text-center max-w-[32rem] mx-auto mb-2">
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-dorado/65 font-medium mb-4">
              Lo que pide la lectura
            </p>
            <p className="font-serif italic text-pergamino/90 text-[1rem] leading-[1.75]">
              {n.synthesis}
            </p>
          </div>
        </>
      )}

      {/* Memoria emocional — eco con tiradas anteriores. Solo si existe. */}
      {echoLine && (
        <p className="font-serif italic text-dorado/55 text-[0.8rem] md:text-[0.85rem] leading-[1.7] text-center max-w-[30rem] mx-auto mt-6 mb-2">
          {echoLine}
        </p>
      )}

      {/* Pregunta final — viene de la carta de cierre (lo que se abre) */}
      <StarDivider className="my-8" />
      <div className="text-center max-w-[28rem] mx-auto">
        <p className="text-[0.6rem] tracking-[0.28em] uppercase text-dorado/70 font-medium mb-5">
          Para mirar hoy
        </p>
        <p className="font-serif italic text-pergamino text-[1.08rem] md:text-[1.15rem] leading-[1.7]">
          <span className="text-dorado font-sans not-italic mr-2">→</span>
          {closingPrompt}
        </p>
      </div>
    </div>
  )
}


/* =====================================================================
 * SHARE — modal contemplativo para compartir lectura
 * ===================================================================*/

const APP_URL = 'https://tarot-zeta-eosin.vercel.app/'

function ShareModal({ open, onClose, card, reversed = false, intention, kind = 'card' }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => { if (!open) setCopied(false) }, [open])

  if (!card) return null

  const content = findContentByCard(card, reversed)
  const cardName = card.nombre

  // Texto compuesto para compartir
  const composeShareText = () => {
    const lines = []
    if (intention) lines.push(`«${intention}»\n`)
    lines.push(`${cardName}`)
    if (content?.essence) lines.push(content.essence)
    if (content?.prompt) lines.push(`\n${content.prompt}`)
    lines.push(`\n— Tarot Ade · ${APP_URL}`)
    return lines.join('\n')
  }

  const shareText = composeShareText()
  const shareUrl  = APP_URL

  const tryNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tarot Ade · ${cardName}`,
          text:  shareText,
          url:   shareUrl
        })
      } catch (err) { /* usuaria canceló, ignorar */ }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText + '\n' + shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* fallback */ }
  }

  const encoded = encodeURIComponent(shareText + '\n' + shareUrl)
  const xUrl       = `https://twitter.com/intent/tweet?text=${encoded}`
  const waUrl      = `https://wa.me/?text=${encoded}`
  const tgUrl      = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="share-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          onClick={onClose}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

          {/* modal */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] bg-noche border border-dorado/35 rounded-[8px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, #16263c 0%, #0d1b2a 50%, #0a131e 100%)'
            }}
          >
            {/* close */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-10 text-pergamino/60 hover:text-pergamino active:scale-[0.95] transition"
            >
              <X className="w-5 h-5" strokeWidth={1.4} />
            </button>

            <div className="px-7 pt-10 pb-8 text-center">
              <p className="text-[0.6rem] tracking-[0.28em] uppercase text-dorado/75 font-medium mb-3">
                Compartir esta lectura
              </p>

              {/* Mini preview de la carta */}
              <div className="my-5 mx-auto w-[110px]">
                <div className="aspect-[2/3] bg-marfil rounded-[5px] overflow-hidden ring-1 ring-dorado/40 shadow-[0_8px_22px_rgba(0,0,0,0.45)]">
                  <div className="w-full h-full bg-gradient-to-br from-[#e8dcc4] to-[#d4c5a8] flex items-center justify-center">
                    <img src={card.src} alt={cardName} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-pergamino text-[1.2rem] mb-2 tracking-[0.04em]">
                {cardName}
              </h3>
              {content?.essence && (
                <p className="font-serif italic text-dorado/85 text-[0.92rem] leading-snug max-w-[20rem] mx-auto mb-7">
                  {content.essence}
                </p>
              )}

              <div className="h-px w-12 bg-dorado/35 mx-auto mb-7" />

              {/* Botón principal — share nativo */}
              <button
                onClick={tryNativeShare}
                className="w-full py-3.5 mb-3 btn-ritual text-pergamino text-[0.66rem] tracking-[0.30em] uppercase font-light rounded-[3px] active:scale-[0.985] flex items-center justify-center gap-3"
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Compartir</span>
              </button>

              {/* Copy link */}
              <button
                onClick={copyToClipboard}
                className="w-full py-3 mb-5 bg-transparent text-pergamino/85 border border-dorado/40 text-[0.7rem] tracking-[0.26em] uppercase font-light rounded-[4px] hover:border-dorado/75 hover:text-pergamino active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-dorado" strokeWidth={1.6} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.4} />}
                <span>{copied ? 'Copiado' : 'Copiar texto'}</span>
              </button>

              {/* Redes específicas */}
              <p className="text-[0.58rem] tracking-[0.28em] uppercase text-pergamino/40 font-light mb-3">
                O directamente en
              </p>
              <div className="flex items-center justify-center gap-3">
                <a href={xUrl} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 border border-dorado/30 hover:border-dorado/65 text-pergamino/80 hover:text-pergamino text-[0.62rem] tracking-[0.26em] uppercase font-light rounded-[3px] transition-colors">
                  X / Twitter
                </a>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 border border-dorado/30 hover:border-dorado/65 text-pergamino/80 hover:text-pergamino text-[0.62rem] tracking-[0.26em] uppercase font-light rounded-[3px] transition-colors">
                  WhatsApp
                </a>
                <a href={tgUrl} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 border border-dorado/30 hover:border-dorado/65 text-pergamino/80 hover:text-pergamino text-[0.62rem] tracking-[0.26em] uppercase font-light rounded-[3px] transition-colors">
                  Telegram
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Detalle({ card, reversed, onBack }) {
  const content = findContentByCard(card, reversed)
  const hasNewVoice = !!content
  const titulo = (content?.name ?? card.nombre).toUpperCase()
  const [expanded, setExpanded] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  // Reset expansión cuando cambia la carta
  useEffect(() => { setExpanded(false) }, [card?.id])

  return (
    <motion.section
      key={`detalle-${card.id}-${reversed}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[100svh] ritual-bg-light text-carbon"
    >
      <div className="relative z-10 max-w-[520px] mx-auto px-6 pt-10 pb-20">
        <header className="grid grid-cols-3 items-center mb-10">
          <button onClick={onBack} className="text-vino hover:text-vinoAlt active:scale-[0.96] transition justify-self-start" aria-label="Volver">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
          </button>
          <h2 className="font-serif text-[1rem] md:text-[1.05rem] uppercase tracking-[0.22em] text-carbon text-center font-light">
            {titulo}
          </h2>
          <Bookmark className="w-5 h-5 text-dorado/85 justify-self-end" strokeWidth={1.3} />
        </header>

        <div className="w-[240px] md:w-[280px] mx-auto card-halo card-tilt">
          <div className="aspect-[2/3] bg-white rounded-[5px] overflow-hidden flex shadow-ritual paper-texture ring-1 ring-dorado/40 relative">
            <div className="flex-1 bg-gradient-to-br from-[#e8dcc4] to-[#d4c5a8] flex items-center justify-center overflow-hidden relative">
              <img
                src={card.src}
                alt={card.nombre}
                className="w-full h-full object-contain"
                style={{ transform: reversed ? 'rotate(180deg)' : 'none' }}
              />
            </div>
          </div>
          <p className="mt-5 text-center font-serif text-[1.4rem] text-vino tracking-[0.22em]">
            {content?.number ?? card.romano ?? ''}
          </p>
          {reversed && (
            <p className="mt-2 text-center text-[0.6rem] tracking-[0.26em] uppercase text-vino font-medium">
              Carta invertida
            </p>
          )}
        </div>

        <StarDivider className="my-10" />

        {hasNewVoice ? (
          <div className="max-w-[28rem] mx-auto space-y-8">
            <section>
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-vino font-semibold mb-3">
                Esencia
              </p>
              <p className="font-light text-carbon/90 text-[1rem] leading-[1.85]">
                {content.essence}
              </p>
            </section>

            <section>
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-vino font-semibold mb-3">
                Interpretación
              </p>
              <p className="font-light text-carbon/85 text-[0.95rem] leading-[1.95]">
                {content.reading}
                {(() => {
                  const sit = composeSituations(content.manifestations)
                  return sit ? ' ' + sit : ''
                })()}
              </p>
            </section>

            <section>
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-vino font-semibold mb-3">
                Pregunta para ti
              </p>
              <p className="font-serif italic text-carbon/85 text-[1rem] leading-[1.7]">
                {content.prompt}
              </p>
            </section>

            {/* Botón "Profundizar lectura" — discreto, solo si hay extensión y no está abierta */}
            <AnimatePresence>
              {content.extension && !expanded && (
                <motion.div
                  key="expand-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center pt-4"
                >
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-[0.62rem] tracking-[0.28em] uppercase text-vino/85 hover:text-vino font-medium border-b border-dorado/40 hover:border-dorado/75 pb-1.5 transition-colors active:scale-[0.98]"
                  >
                    Profundizar lectura
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Extensión — capa más íntima, atmosférica */}
            <AnimatePresence initial={false}>
              {content.extension && expanded && (
                <motion.section
                  key="extension"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    height:  { duration: 1.0, ease: [0.32, 0.72, 0.24, 1] },
                    opacity: { duration: 0.9, delay: 0.25, ease: 'easeOut' }
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    {/* Marca editorial — pequeña constelación + filete */}
                    <div className="flex items-center justify-center gap-3 mb-7 text-vino/55">
                      <span className="h-px w-10 bg-vino/30" />
                      <StarTiny size={9} />
                      <span className="h-px w-10 bg-vino/30" />
                    </div>

                    <div className="max-w-[24rem] mx-auto px-2">
                      <p className="text-[0.6rem] tracking-[0.28em] uppercase text-vino/75 font-medium text-center mb-6">
                        Más adentro
                      </p>
                      <p className="font-serif text-carbon/80 text-[0.92rem] md:text-[0.95rem] leading-[2] text-left">
                        {content.extension}
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <p className="pt-6 text-[0.58rem] tracking-[0.28em] uppercase text-carbon/35 font-light text-center">
              esto sugiere — no determina
            </p>
          </div>
        ) : (
          <div className="max-w-[28rem] mx-auto">
            <p className="font-light text-carbon/80 text-[0.95rem] leading-[1.95] text-center mb-8">
              {reversed ? card.invertido : card.derecho}
            </p>
            <p className="text-center text-[0.58rem] tracking-[0.26em] uppercase text-carbon/40 font-light">
              · lectura provisoria — esta carta aún no fue escrita en la voz definitiva ·
            </p>
          </div>
        )}

        <p className="mt-12 text-center text-[0.58rem] tracking-[0.28em] uppercase text-carbon/30 font-light">
          {card.paloLabel}
        </p>

        {/* Compartir */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center justify-center gap-3 px-7 py-3 bg-transparent text-vino border border-dorado/40 hover:border-vino/65 text-[0.66rem] tracking-[0.28em] uppercase font-medium rounded-[4px] hover:bg-vino/5 active:scale-[0.98] transition-all duration-300"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Compartir</span>
          </button>
        </div>
      </div>
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        card={card}
        reversed={reversed}
        kind="card"
      />
    </motion.section>
  )
}

/* =====================================================================
 * NAV INFERIOR — íconos dorados + texto, estilo grabado
 * ===================================================================*/

function BottomNav({ view, onGo }) {
  const items = [
    { key: 'home',     label: 'Inicio', icon: Sun },
    { key: 'explorar', label: 'Mazo',   icon: CardIcon },
    { key: 'selector', label: 'Tirada', icon: Sparkles }
  ]
  const isActive = (k) => view === k || (k === 'selector' && (view === 'tirada1' || view === 'tirada3'))

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-dorado/15"
      style={{
        /* Fondo más integrado con la atmósfera — gradiente que conecta con
           el fondo nocturno en lugar de pegarse encima como una barra UI. */
        background: 'linear-gradient(180deg, rgba(13, 27, 42, 0.55) 0%, rgba(13, 27, 42, 0.92) 40%, rgba(6, 12, 20, 0.96) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      {/* Línea dorada superior ultra fina — separa sin cortar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dorado/25 to-transparent" />

      <div className="relative max-w-[440px] mx-auto px-6 py-3 flex items-stretch justify-around">
        {items.map(it => {
          const Icon = it.icon
          const active = isActive(it.key)
          return (
            <button
              key={it.key}
              onClick={() => onGo(it.key)}
              className={`relative flex flex-col items-center gap-1.5 px-3 py-1 transition-all duration-500 active:scale-[0.96] ${
                active ? 'text-dorado' : 'text-dorado/40 hover:text-dorado/75'
              }`}
              aria-label={it.label}
            >
              {/* Halo ceremonial detrás del ícono activo — glow mínimo cálido */}
              {active && (
                <span
                  className="pointer-events-none absolute left-1/2 top-[2px] -translate-x-1/2 w-[34px] h-[34px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(198, 168, 90, 0.20) 0%, transparent 70%)',
                    filter: 'blur(2px)'
                  }}
                />
              )}
              <Icon
                className="relative z-10 w-[22px] h-[22px]"
                strokeWidth={active ? 1.4 : 1.1}
                size={22}
              />
              <span className={`relative z-10 text-[0.58rem] tracking-[0.30em] uppercase font-light ${active ? 'text-dorado' : ''}`}>
                {it.label}
              </span>
              {/* Punto dorado ultra fino debajo del activo — marca ceremonial */}
              {active && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-dorado/70" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* =====================================================================
 * APP
 * ===================================================================*/

export default function App() {
  const [view, setView]                 = useState('home')
  const [previousView, setPreviousView] = useState('home')
  const [cardActiva, setCardActiva]     = useState(null)
  const [cardReversed, setCardReversed] = useState(false)
  const [pendingCount, setPendingCount] = useState(3)
  const [intention, setIntention]       = useState('')
  const [opening, setOpening]           = useState(true)

  /* ONBOARDING — se muestra solo en la primera visita.
     Flag ade.onboarded en localStorage. Si falla (modo privado), se
     muestra cada vez — preferimos eso a saltarlo siempre. */
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return !window.localStorage.getItem('ade.onboarded')
      }
    } catch (_) {}
    return false
  })
  /* CARTA DEL DÍA — determinística por fecha local del usuario.
   *
   * Garantías:
   *   1. La misma carta para todo el día (no cambia al refrescar).
   *   2. Cambia automáticamente al cruzar medianoche local.
   *   3. Distinta entre usuarios en la misma fecha (semilla incluye
   *      una clave anónima por dispositivo, persistida en localStorage).
   *   4. Si fallara localStorage (modo privado, SSR), cae a un seed
   *      basado solo en la fecha local — la carta del día sigue siendo
   *      estable durante la sesión.
   */
  const [destacada] = useState(() => {
    const today = new Date()
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    let userSalt = '0'
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        userSalt = window.localStorage.getItem('ade.userSalt')
        if (!userSalt) {
          userSalt = Math.random().toString(36).slice(2, 10)
          window.localStorage.setItem('ade.userSalt', userSalt)
        }
      }
    } catch (_) { /* modo privado: usamos salt fija */ }

    const seedStr = `${dateKey}|${userSalt}`
    let hash = 0
    for (let i = 0; i < seedStr.length; i++) hash = (hash * 31 + seedStr.charCodeAt(i)) | 0

    // Solo Arcanos Mayores para la carta del día. Decisión editorial:
    // un tarot serio reserva la carta diaria a símbolos de peso pleno.
    // El 3 de Bastos como guía del día es flaco; El Hierofante denso.
    const mayores = DECK.filter(c => c.arcano === 'mayor' || c.paloKey === 'arcanos')
    const pool = mayores.length > 0 ? mayores : DECK
    const idx = Math.abs(hash) % pool.length
    return pool[idx]
  })

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const goDetail = (card, reversed = false) => {
    setPreviousView(view)
    setCardActiva(card)
    setCardReversed(reversed)
    setView('detalle')
  }

  const back = () => setView(previousView)

  const goNav = (target) => {
    if (target === 'home') setView('home')
    else if (target === 'explorar') setView('explorar')
    else if (target === 'selector') setView('selector')
  }

  return (
    <main className="min-h-[100svh] bg-noche text-pergamino overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <Home
            key="home"
            destacada={destacada}
            onTirada={() => setView('selector')}
            onExplorar={() => setView('explorar')}
            onCarta={(c) => goDetail(c)}
            onNav={goNav}
          />
        )}
        {view === 'selector' && (
          <SelectorTirada
            key="selector"
            onPick={(n) => { setPendingCount(n); setView('intention') }}
            onHome={() => setView('home')}
          />
        )}
        {view === 'intention' && (
          <IntentionScreen
            key="intention"
            initialIntention={intention}
            onContinue={(text) => { setIntention(text); setView('shuffle') }}
            onBack={() => setView('selector')}
          />
        )}
        {view === 'shuffle' && (
          <ShuffleScreen
            key="shuffle"
            onContinue={() => setView('cut')}
            onBack={() => setView('intention')}
          />
        )}
        {view === 'cut' && (
          <CutDeckScreen
            key="cut"
            onContinue={() => {
              if (pendingCount === 1) setView('tirada1')
              else if (pendingCount === 10) setView('cruzceltica')
              else setView('tirada3')
            }}
            onBack={() => setView('shuffle')}
          />
        )}
        {view === 'explorar' && (
          <Explorar
            key="explorar"
            onCarta={(c) => goDetail(c)}
            onHome={() => setView('home')}
          />
        )}
        {view === 'tirada1' && (
          <Tirada
            key="tirada1"
            count={1}
            intention={intention}
            onCarta={(c, r) => goDetail(c, r)}
            onHome={() => setView('selector')}
          />
        )}
        {view === 'tirada3' && (
          <Tirada
            key="tirada3"
            count={3}
            intention={intention}
            onCarta={(c, r) => goDetail(c, r)}
            onHome={() => setView('selector')}
          />
        )}
        {view === 'cruzceltica' && (
          <CruzCelticaWrapper
            key="cruzceltica"
            intention={intention}
            onCarta={(c, r) => goDetail(c, r)}
            onHome={() => setView('home')}
          />
        )}
        {view === 'detalle' && cardActiva && (
          <Detalle
            key="detalle"
            card={cardActiva}
            reversed={cardReversed}
            onBack={back}
          />
        )}
      </AnimatePresence>

      {/* BottomNav removido — el flujo único es: Home → tirada → detalle.
         La nav redundante (Inicio / Mazo / Tirada) ya estaba cubierta por
         los botones del Home y el back de cada vista. */}

      <AnimatePresence>
        {opening && <BookOpening key="book-opening" onExit={() => setOpening(false)} />}
      </AnimatePresence>

      {/* Onboarding — primera visita, sobre el book-opening si ambos
          coinciden; el book termina rápido y deja paso al onboarding. */}
      <AnimatePresence>
        {!opening && showOnboarding && (
          <Onboarding key="onboarding" onComplete={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </main>
  )
}
