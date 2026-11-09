import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import styles from './CommandPalette.module.css'

interface Command {
  id: string
  label: string
  hint: string
  run: () => void
}

const EMAIL = 'ashleyquigley14@gmail.com'

/**
 * ⌘K / Ctrl+K command menu built on the native <dialog> element (free focus
 * trap, Esc to close, top-layer rendering) with the ARIA combobox/listbox
 * pattern for the filterable list.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const [toast, setToast] = useState('')
  const { theme, toggle } = useTheme()

  const go = useCallback(
    (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    [],
  )

  const commands: Command[] = useMemo(
    () => [
      { id: 'top', label: 'Go to top', hint: 'Navigate', run: go('top') },
      { id: 'work', label: 'Go to Work', hint: 'Navigate', run: go('work') },
      { id: 'skills', label: 'Go to Skills', hint: 'Navigate', run: go('skills') },
      { id: 'process', label: 'Go to How I work', hint: 'Navigate', run: go('how-i-work') },
      { id: 'lab', label: 'Open the Pattern Lab', hint: 'Navigate', run: go('lab') },
      { id: 'contact', label: 'Go to Contact', hint: 'Navigate', run: go('contact') },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        hint: 'Theme',
        run: () => toggle(),
      },
      {
        id: 'copy',
        label: `Copy email address`,
        hint: EMAIL,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).catch(() => {})
          setToast('Email copied')
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'External',
        run: () => window.open('https://www.linkedin.com/in/ashquigs/', '_blank', 'noreferrer'),
      },
      {
        id: 'github',
        label: 'View source on GitHub',
        hint: 'External',
        run: () => window.open('https://github.com/ashleyquigley/Portfolio', '_blank', 'noreferrer'),
      },
    ],
    [go, theme, toggle],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => (c.label + c.hint).toLowerCase().includes(q)) : commands
  }, [commands, query])

  // Sync <dialog> with `open`
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) {
      setQuery('')
      setCursor(0)
      setToast('')
      d.showModal()
      inputRef.current?.focus()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  function run(cmd?: Command) {
    if (!cmd) return
    onClose()
    // Let the dialog close first so smooth-scrolling isn't blocked by the modal.
    window.setTimeout(cmd.run, 50)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[cursor])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command menu"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose() // backdrop click
      }}
    >
      <div className={styles.panel}>
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          placeholder="Type a command or search…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
          aria-autocomplete="list"
          onChange={(e) => {
            setQuery(e.target.value)
            setCursor(0)
          }}
          onKeyDown={onKeyDown}
        />
        <ul className={styles.list} id="cmd-list" role="listbox" aria-label="Commands">
          {results.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === cursor}
              className={styles.item}
              onMouseMove={() => setCursor(i)}
              onClick={() => run(c)}
            >
              <span>{c.label}</span>
              <span className={styles.hint}>{c.hint}</span>
            </li>
          ))}
          {results.length === 0 && <li className={styles.empty}>No matches. Try “work” or “theme”.</li>}
        </ul>
        <p className={styles.foot} role="status">
          {toast || '↑↓ to move · ↵ to run · esc to close'}
        </p>
      </div>
    </dialog>
  )
}
