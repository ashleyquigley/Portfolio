import { useMemo, useState } from 'react'
import {
  SHAPES,
  SHAPE_LABEL,
  SWATCHES,
  SWATCH_HEX,
  SWATCH_VAR,
  gridToSvg,
  randomGrid,
  type Swatch,
  type TileData,
} from '../art/tiles'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { Tile } from './Tile'
import styles from './PatternLab.module.css'

const COLS = 5
const ROWS = 5

type Tool = 'rotate' | 'shape' | 'fg' | 'bg'

const TOOLS: { id: Tool; label: string; hint: string }[] = [
  { id: 'rotate', label: 'Rotate', hint: 'Click a tile to turn it a quarter.' },
  { id: 'shape', label: 'Shape', hint: 'Click a tile to cycle through shapes.' },
  { id: 'fg', label: 'Shape colour', hint: 'Pick a swatch, then click tiles to repaint the shape.' },
  { id: 'bg', label: 'Background', hint: 'Pick a swatch, then click tiles to repaint the background.' },
]

const initial = (): TileData[] =>
  Array.from({ length: COLS * ROWS }, (_, i): TileData => {
    const swatches: Swatch[] = ['ink', 'cream', 'red', 'blue', 'amber']
    return {
      shape: i % 7 === 3 ? 'inverse' : i % 5 === 0 ? 'half' : 'quarter',
      fg: swatches[(i * 3 + Math.floor(i / COLS)) % 5],
      bg: i % 2 ? 'ink' : 'cream',
      rot: i % 4,
    }
  }).map((t): TileData => (t.fg === t.bg ? { ...t, fg: 'red' } : t))

/**
 * Pattern Lab — a tiny generative-design tool. Every tile is a real
 * <button> (keyboard + screen-reader operable); state is a plain array of
 * data that renders to both the DOM and an exportable SVG.
 */
export function PatternLab() {
  const [tiles, setTiles] = useState<TileData[]>(initial)
  const [tool, setTool] = useState<Tool>('rotate')
  const [paint, setPaint] = useState<Swatch>('red')
  const [status, setStatus] = useState('')

  const hint = useMemo(() => TOOLS.find((t) => t.id === tool)!.hint, [tool])

  function apply(i: number) {
    setTiles((prev) =>
      prev.map((t, idx) => {
        if (idx !== i) return t
        switch (tool) {
          case 'rotate':
            return { ...t, rot: t.rot + 1 }
          case 'shape':
            return { ...t, shape: SHAPES[(SHAPES.indexOf(t.shape) + 1) % SHAPES.length] }
          case 'fg':
            return { ...t, fg: paint }
          case 'bg':
            return { ...t, bg: paint }
        }
      }),
    )
  }

  function download() {
    const blob = new Blob([gridToSvg(tiles, COLS)], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pattern.svg'
    a.click()
    URL.revokeObjectURL(url)
    setStatus('Downloaded pattern.svg')
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(gridToSvg(tiles, COLS))
      setStatus('SVG copied to clipboard')
    } catch {
      setStatus('Copy blocked by the browser — try Download instead')
    }
  }

  const describe = (t: TileData, i: number) =>
    `Row ${Math.floor(i / COLS) + 1}, column ${(i % COLS) + 1}: ${SHAPE_LABEL[t.shape]}, ${t.fg} on ${t.bg}, rotated ${(t.rot % 4) * 90} degrees`

  return (
    <section className={styles.section} id="lab" aria-labelledby="lab-heading">
      <div className={styles.inner}>
        <SectionHead
          index="04"
          label="Pattern Lab"
          id="lab-heading"
          title="Make your own."
          body="This site's artwork is just data: a grid of { shape, colours, rotation } objects rendered as SVG. Here's the same engine, handed to you. Compose something, then export it as a real SVG file."
        />

        <Reveal>
          <div className={styles.lab}>
            <div
              className={styles.canvas}
              style={{ '--cols': COLS, '--rows': ROWS } as React.CSSProperties}
              role="group"
              aria-label="Pattern canvas"
            >
              {tiles.map((t, i) => (
                <button
                  type="button"
                  key={i}
                  className={styles.cell}
                  onClick={() => apply(i)}
                  aria-label={describe(t, i)}
                >
                  <Tile tile={t} />
                </button>
              ))}
            </div>

            <div className={styles.panel}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Tool</legend>
                <div className={styles.tools}>
                  {TOOLS.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      className={styles.toolBtn}
                      aria-pressed={tool === t.id}
                      onClick={() => setTool(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className={styles.hint}>{hint}</p>
              </fieldset>

              <fieldset className={styles.fieldset} disabled={tool === 'rotate' || tool === 'shape'}>
                <legend className={styles.legend}>Swatch</legend>
                <div className={styles.swatches}>
                  {SWATCHES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={styles.swatch}
                      style={{ background: SWATCH_VAR[s] }}
                      aria-pressed={paint === s}
                      aria-label={`${s} ${SWATCH_HEX[s]}`}
                      title={`${s} · ${SWATCH_HEX[s]}`}
                      onClick={() => setPaint(s)}
                    />
                  ))}
                </div>
              </fieldset>

              <div className={styles.actions}>
                <button type="button" className={styles.action} onClick={() => setTiles(randomGrid(COLS * ROWS))}>
                  ↻ Randomise
                </button>
                <button type="button" className={styles.action} onClick={() => setTiles(initial())}>
                  Reset
                </button>
                <button type="button" className={styles.actionPrimary} onClick={download}>
                  Download SVG
                </button>
                <button type="button" className={styles.action} onClick={copy}>
                  Copy SVG
                </button>
              </div>
              <p className={styles.status} role="status" aria-live="polite">
                {status}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
