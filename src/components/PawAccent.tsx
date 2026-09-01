import type { CSSProperties } from 'react'
import styles from './PawAccent.module.css'

interface PawAccentProps {
  size?: number
  color?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate?: number
  delay?: number
}

/**
 * Small original paw-print SVG accent — not Fetch's artwork, just a nod
 * to the same playful-pet-brand register, animated with a gentle float.
 */
export function PawAccent({
  size = 48,
  color = 'var(--color-pink-pop)',
  top,
  left,
  right,
  bottom,
  rotate = -12,
  delay = 0,
}: PawAccentProps) {
  const style = {
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    '--paw-rotate': `${rotate}deg`,
    '--paw-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <svg
      className={styles.paw}
      style={style}
      viewBox="0 0 64 64"
      fill={color}
      aria-hidden="true"
    >
      <ellipse cx="32" cy="42" rx="16" ry="13" />
      <ellipse cx="12" cy="24" rx="7" ry="9" />
      <ellipse cx="27" cy="14" rx="7" ry="9" />
      <ellipse cx="45" cy="14" rx="7" ry="9" />
      <ellipse cx="58" cy="26" rx="6.5" ry="8.5" />
    </svg>
  )
}
