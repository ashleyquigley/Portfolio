import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.css'

interface Stat {
  to: number
  suffix?: string
  label: string
  tone: 'red' | 'blue' | 'amber' | 'cream'
}

const STATS: Stat[] = [
  { to: 10, suffix: '+', label: 'years shipping to production', tone: 'red' },
  { to: 18, label: 'marketing sites managed', tone: 'blue' },
  { to: 10, label: 'languages supported', tone: 'amber' },
  { to: 7, suffix: 'M', label: 'customers acquired globally', tone: 'cream' },
]

/** Counts 0 → target once, easing out, the first time it scrolls into view. */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }

    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1600
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          setValue(Math.round(to * (1 - Math.pow(1 - p, 4)))) // easeOutQuart
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className={styles.stats} aria-label="Career in numbers">
      <dl className={styles.grid}>
        {STATS.map((s) => (
          <div className={styles.stat} data-tone={s.tone} key={s.label}>
            <dd className={styles.value}>
              <CountUp to={s.to} suffix={s.suffix} />
            </dd>
            <dt className={styles.label}>{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
