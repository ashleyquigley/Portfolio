import { useEffect, useRef } from 'react'

interface Options {
  /** Max tilt in degrees. 0 disables the 3D tilt (spotlight vars still update). */
  tilt?: number
}

/**
 * Pointer-reactive effects with zero React re-renders: writes CSS custom
 * properties (--rx, --ry, --mx, --my) straight onto the element, throttled
 * through requestAnimationFrame. CSS decides what to do with them (3D tilt,
 * a spotlight gradient that follows the cursor, …).
 *
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export function usePointerFx<T extends HTMLElement>({ tilt = 6 }: Options = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    let frame = 0
    let last: PointerEvent | null = null

    const paint = () => {
      frame = 0
      if (!last) return
      const r = el.getBoundingClientRect()
      const px = (last.clientX - r.left) / r.width
      const py = (last.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
      el.style.setProperty('--ry', `${((px - 0.5) * tilt * 2).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${((0.5 - py) * tilt * 2).toFixed(2)}deg`)
    }

    const onMove = (e: PointerEvent) => {
      last = e
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onLeave = () => {
      last = null
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.removeAttribute('data-active')
    }

    const onEnter = () => el.setAttribute('data-active', 'true')

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [tilt])

  return ref
}
