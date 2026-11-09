import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

/*
  The <html data-theme> attribute is the single source of truth (set before
  first paint by the inline script in index.html). This module is a tiny
  external store around it, so any component — the toggle button, the command
  palette — can read and change the theme without prop drilling or context.
*/

const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  const apply = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage blocked — the choice just won't persist */
    }
    listeners.forEach((l) => l())
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) {
    apply()
    return
  }

  // View Transitions API: snapshot old UI, apply the change, then reveal the
  // new snapshot through a circle growing from where the user clicked.
  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  document.startViewTransition(apply).ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)
  return {
    theme,
    toggle: (origin?: { x: number; y: number }) => setTheme(theme === 'dark' ? 'light' : 'dark', origin),
  }
}
