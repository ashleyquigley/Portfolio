import { useRef, useState } from 'react'
import styles from './TokenDemo.module.css'

const swatches = [
  { name: 'Ink', varName: '--color-ink', hex: '#0A0A0A' },
  { name: 'Mint', varName: '--color-mint', hex: '#B1FF9E' },
  { name: 'Pink', varName: '--color-pink', hex: '#F4C9F3' },
  { name: 'Lavender', varName: '--color-lavender', hex: '#D9DEFF' },
  { name: 'Lilac', varName: '--color-lilac', hex: '#E7C7EE' },
]

type Density = 'compact' | 'comfortable'

/**
 * A small, real interactive component — not a screenshot — built entirely
 * from the tokens in styles/tokens.css. Click a swatch to copy its hex;
 * toggle density to see the same component reflow using --space-3 vs
 * --space-6 from the spacing scale.
 */
export function TokenDemo() {
  const [copied, setCopied] = useState<string | null>(null)
  const [density, setDensity] = useState<Density>('comfortable')
  const clearTimer = useRef<number | undefined>(undefined)

  async function handleCopy(hex: string, name: string) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(`Copied ${name}: ${hex}`)
    } catch {
      setCopied(`${name} is ${hex}`)
    }
    window.clearTimeout(clearTimer.current)
    clearTimer.current = window.setTimeout(() => setCopied(null), 2200)
  }

  return (
    <section className={styles.section} id="tokens" aria-labelledby="tokens-heading">
      <div className={styles.inner}>
        <h2 className={styles.heading} id="tokens-heading">
          A design system starts with tokens
        </h2>
        <p className={styles.body}>
          The job post calls out evolving a design system — components, tokens, accessibility
          patterns. Here's what that looks like in practice: this whole page reads its colours,
          spacing and radii from one token file. Try it.
        </p>

        <div className={styles.panel}>
          <div className={styles.swatchRow} role="list" aria-label="Colour tokens, click to copy">
            {swatches.map((s) => (
              <button
                key={s.varName}
                type="button"
                className={styles.swatch}
                onClick={() => handleCopy(s.hex, s.name)}
                aria-label={`Copy ${s.name} colour token, ${s.hex}`}
              >
                <span className={styles.swatchColor} style={{ background: `var(${s.varName})` }} />
                <span className={styles.swatchLabel}>{s.name}</span>
                <span className={styles.swatchValue}>{s.varName}</span>
              </button>
            ))}
          </div>
          <p className={styles.copiedHint} role="status" aria-live="polite">
            {copied ?? ' '}
          </p>

          <div className={styles.divider} />

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Spacing token, applied live</span>
            <div className={styles.toggleGroup} role="group" aria-label="Density">
              {(['compact', 'comfortable'] as Density[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.toggleButton} ${density === d ? styles.toggleButtonActive : ''}`}
                  aria-pressed={density === d}
                  onClick={() => setDensity(d)}
                >
                  {d === 'compact' ? 'Compact' : 'Comfortable'}
                </button>
              ))}
            </div>
          </div>

          <div
            className={styles.previewCard}
            style={{
              padding: density === 'compact' ? 'var(--space-3)' : 'var(--space-6)',
              gap: density === 'compact' ? 'var(--space-2)' : 'var(--space-4)',
            }}
          >
            <span className={styles.previewDot} />
            <span className={styles.previewText}>
              Same component, {density} density — driven by{' '}
              {density === 'compact' ? '--space-3' : '--space-6'}, no duplicated styles.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
