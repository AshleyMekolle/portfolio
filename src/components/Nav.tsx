'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/data/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav__bar">
        <Link href="/" className="nav__brand" aria-label="Mekolle Ashley — home" onClick={() => setOpen(false)}>
          <span className="nav__mono" aria-hidden="true">MA</span>
          <span className="nav__name">Mekolle Ashley</span>
        </Link>

        <nav aria-label="Primary" className="nav__links">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <a className="nav__cv" href={site.cv} download>CV ↓</a>
        </nav>

        <button
          ref={btn}
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`burger ${open ? 'burger--x' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <div id="mobile-menu" className={`nav__sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile" className="wrap">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <a href={site.cv} download onClick={() => setOpen(false)}>Download CV ↓</a>
        </nav>
      </div>
    </header>
  )
}
