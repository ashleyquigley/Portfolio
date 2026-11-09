import type { ReactNode } from 'react'
import styles from './SectionHead.module.css'

interface SectionHeadProps {
  /** e.g. "01" */
  index: string
  label: string
  id: string
  title: ReactNode
  body?: ReactNode
}

/** Shared section header: mono index + label, big display title, optional intro. */
export function SectionHead({ index, label, id, title, body }: SectionHeadProps) {
  return (
    <header className={styles.head}>
      <p className={styles.eyebrow}>
        <span className={styles.glyph} aria-hidden="true" />
        <span>{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {body && <p className={styles.body}>{body}</p>}
    </header>
  )
}
