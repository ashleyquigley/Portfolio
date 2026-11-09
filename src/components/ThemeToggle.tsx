import { useTheme } from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

/** Sun/moon morph: one circle, with a second "bite" circle that slides in to make a crescent. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
    >
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <mask id="moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className={styles.bite} cx={dark ? 16 : 30} cy={dark ? 8 : 0} r="7" fill="#000" />
        </mask>
        <circle className={styles.body} cx="12" cy="12" r={dark ? 9 : 5} mask="url(#moon-mask)" />
        <g className={styles.rays} style={{ opacity: dark ? 0 : 1 }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  )
}
