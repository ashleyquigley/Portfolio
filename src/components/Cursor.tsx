import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

/**
 * Decorative cursor follower: a ring that eases toward the pointer (lerp in
 * a rAF loop), swells over links/buttons, and shows a short label over
 * elements tagged data-cursor="…". It supplements the native cursor rather
 * than replacing it, and only mounts for fine pointers without reduced-motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ring.current
    if (!fine || reduced || !el) return

    let tx = -100, ty = -100, x = -100, y = -100, raf = 0

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.dataset.visible = 'true'
      const target = (e.target as Element | null)?.closest<HTMLElement>('a, button, input, [data-cursor]')
      const text = target?.dataset.cursor ?? ''
      el.dataset.state = target ? (text ? 'label' : 'link') : 'idle'
      if (label.current && label.current.textContent !== text) label.current.textContent = text
    }
    const onLeave = () => (el.dataset.visible = 'false')

    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ring} className={styles.ring} data-state="idle" data-visible="false" aria-hidden="true">
      <span className={styles.inner}>
        <span ref={label} className={styles.label} />
      </span>
    </div>
  )
}
