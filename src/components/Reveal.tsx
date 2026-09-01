import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
