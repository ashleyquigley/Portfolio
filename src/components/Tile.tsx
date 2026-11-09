import type { CSSProperties } from 'react'
import { SHAPE_PATH, SWATCH_VAR, type TileData } from '../art/tiles'
import styles from './Tile.module.css'

/**
 * One square of the pattern. The background is static; only the shape
 * rotates, using a CSS transition on a cumulative `--rot` quarter-turn
 * count (so it always spins forward, with a springy overshoot).
 */
export function Tile({ tile }: { tile: TileData }) {
  const style = {
    background: SWATCH_VAR[tile.bg],
    '--rot': tile.rot,
  } as CSSProperties

  return (
    <div className={styles.tile} style={style}>
      <svg className={styles.shape} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path d={SHAPE_PATH[tile.shape]} style={{ fill: SWATCH_VAR[tile.fg] }} />
      </svg>
    </div>
  )
}
