import { useEffect, useRef, type ReactNode } from 'react'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  strength?: number
}

/** An anchor that drifts toward the cursor when it's nearby, then springs back. */
export function MagneticLink({ children, strength = 0.35, style, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9
      el.style.transition = near ? 'transform 150ms ease-out' : 'transform 600ms var(--ease-spring)'
      el.style.transform = near ? `translate(${dx * strength}px, ${dy * strength}px)` : ''
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [strength])

  return (
    <a ref={ref} style={style} {...rest}>
      {children}
    </a>
  )
}
