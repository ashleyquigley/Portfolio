import type { CSSProperties } from 'react'
import styles from './SplitText.module.css'

/**
 * Splits text into per-letter spans that rise out of a clipping mask on a
 * stagger. The visual spans are aria-hidden; the full string is exposed
 * once via aria-label, so screen readers hear a normal heading.
 */
export function SplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  let n = 0
  return (
    <span className={styles.split} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span className={styles.word} key={wi} aria-hidden="true">
          {[...word].map((ch, ci) => (
            <span className={styles.maskLetter} key={ci}>
              <span className={styles.letter} style={{ '--i': baseDelay + n++ } as CSSProperties}>
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
