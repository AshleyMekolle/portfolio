'use client'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

// Gentle entrance. Content is visible by default if JS or IntersectionObserver is
// unavailable, and reduced-motion users get no transition (see globals.css).
export default function Reveal({
  children, as: Tag = 'div', className = '', delay = 0,
}: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<'idle' | 'hidden' | 'in'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) return // already on screen: leave visible
    setState('hidden')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState('in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = state === 'idle' ? className : `${className} reveal ${state === 'in' ? 'in' : ''}`
  return (
    <Tag ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}
