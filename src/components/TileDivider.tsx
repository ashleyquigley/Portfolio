import type { CSSProperties } from 'react'
import styles from './TileDivider.module.css'

const COLORS = ['var(--art-red)', 'var(--art-blue)', 'var(--art-amber)', 'var(--color-ink)']

/**
 * A row of quarter-discs that each rotate as the divider scrolls through the
 * viewport. Driven purely by CSS scroll-driven animations
 * (animation-timeline: view()) — no JS, runs off the main thread. Browsers
 * without support simply show the static row.
 */
export function TileDivider({ count = 14 }: { count?: number }) {
  return (
    <div className={styles.divider} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={styles.tile}
          style={{ '--c': COLORS[i % COLORS.length], '--i': i } as CSSProperties}
        />
      ))}
    </div>
  )
}
