import { useCallback, useEffect, useRef, useState } from 'react'
import { randomGrid, type TileData } from '../art/tiles'
import { usePointerFx } from '../hooks/usePointerFx'
import { Tile } from './Tile'
import styles from './HeroArt.module.css'

const COLS = 4

// Art-directed starting layout, after the reference print.
const t = (shape: TileData['shape'], fg: TileData['fg'], bg: TileData['bg'], rot: number): TileData => ({
  shape,
  fg,
  bg,
  rot,
})
const INITIAL: TileData[] = [
  t('quarter', 'ink', 'cream', 1), t('quarter', 'red', 'ink', 0), t('inverse', 'amber', 'ink', 0), t('quarter', 'cream', 'ink', 2),
  t('quarter', 'ink', 'cream', 2), t('quarter', 'blue', 'ink', 2), t('quarter', 'ink', 'cream', 1), t('quarter', 'blue', 'ink', 1),
  t('square', 'red', 'red', 0), t('quarter', 'blue', 'ink', 3), t('quarter', 'ink', 'blue', 0), t('quarter', 'amber', 'ink', 2),
  t('quarter', 'cream', 'ink', 3), t('inverse', 'amber', 'ink', 3), t('quarter', 'cream', 'ink', 1), t('quarter', 'cream', 'ink', 0),
]

/**
 * Interactive hero artwork. Sweep the cursor across it and each tile you
 * cross turns a quarter-turn; the whole board also tilts in 3D toward the
 * pointer. When nobody's touching it, a random tile turns every ~1.4s so it
 * always feels alive.
 */
export function HeroArt() {
  const [tiles, setTiles] = useState<TileData[]>(INITIAL)
  const boardRef = usePointerFx<HTMLDivElement>({ tilt: 7 })
  const lastIndex = useRef(-1)
  const hovering = useRef(false)

  const turn = useCallback((i: number) => {
    setTiles((prev) => prev.map((tile, idx) => (idx === i ? { ...tile, rot: tile.rot + 1 } : tile)))
  }, [])

  // Ambient motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (!hovering.current && !document.hidden) turn(Math.floor(Math.random() * INITIAL.length))
    }, 1400)
    return () => window.clearInterval(id)
  }, [turn])

  function indexAt(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const col = Math.min(COLS - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * COLS)))
    const row = Math.min(COLS - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * COLS)))
    return row * COLS + col
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return
    const i = indexAt(e)
    if (i !== lastIndex.current) {
      lastIndex.current = i
      turn(i)
    }
  }

  return (
    <div className={styles.wrap}>
      <div
        ref={boardRef}
        className={styles.board}
        role="img"
        aria-label="Interactive geometric artwork: a grid of quarter-circle tiles in charcoal, cream, vermilion, blue and amber. Move your cursor over it to turn the tiles."
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => {
          hovering.current = false
          lastIndex.current = -1
        }}
        onPointerMove={onMove}
        onClick={(e) => turn(indexAt(e))}
        data-cursor="Turn"
      >
        {tiles.map((tile, i) => (
          <div className={styles.cell} key={i}>
            <Tile tile={tile} />
          </div>
        ))}
        <div className={styles.sheen} aria-hidden="true" />
      </div>

      <button type="button" className={styles.shuffle} onClick={() => setTiles(randomGrid(INITIAL.length))}>
        <span aria-hidden="true">↻</span> Shuffle pattern
      </button>
    </div>
  )
}
