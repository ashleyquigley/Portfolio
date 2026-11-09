import { useActiveSection } from '../hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'
import styles from './Nav.module.css'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'how-i-work', label: 'Process' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
]
const IDS = LINKS.map((l) => l.id)

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(IDS)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <nav className={styles.nav} aria-label="Primary">
      <a className={styles.logo} href="#top" aria-label="Ashley Quigley — back to top">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="16" height="16" fill="var(--art-cream)" />
          <path d="M0 0H16A16 16 0 0 1 0 16Z" fill="var(--art-ink)" />
          <rect x="16" width="16" height="16" fill="var(--art-ink)" />
          <path d="M16 16V0A16 16 0 0 1 32 16Z" fill="var(--art-red)" />
          <rect y="16" width="16" height="16" fill="var(--art-ink)" />
          <path d="M16 16V32A16 16 0 0 1 0 16Z" fill="var(--art-blue)" />
          <rect x="16" y="16" width="16" height="16" fill="var(--art-cream)" />
          <path d="M16 16H32A16 16 0 0 1 16 32Z" fill="var(--art-amber)" />
        </svg>
        <span className={styles.logoText}>AQ</span>
      </a>

      <ul className={styles.links}>
        {LINKS.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className={styles.link} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.tools}>
        <button type="button" className={styles.palette} onClick={onOpenPalette} aria-label="Open command menu">
          <span>Jump to</span>
          <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  )
}
