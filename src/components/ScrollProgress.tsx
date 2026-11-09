import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

/**
 * A four-colour bar along the top edge that fills as you scroll. Progress is
 * written straight to a CSS variable (no React state → no re-renders on scroll).
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      ref.current?.style.setProperty('--progress', p.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className={styles.bar} aria-hidden="true" />
}
