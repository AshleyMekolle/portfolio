'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    const enter = () => el.classList.add('hover')
    const leave = () => el.classList.remove('hover')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(node => {
      node.addEventListener('mouseenter', enter)
      node.addEventListener('mouseleave', leave)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button').forEach(node => {
        node.removeEventListener('mouseenter', enter)
        node.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}
