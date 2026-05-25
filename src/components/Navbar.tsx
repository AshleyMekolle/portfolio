'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="#hero" className={styles.logo}>
        Ashley<span>.</span>
      </Link>
      <button className={styles.menuBtn} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        <li><Link href="#projects" onClick={close}>Work</Link></li>
        <li><Link href="#skills" onClick={close}>Skills</Link></li>
        <li><Link href="#experience" onClick={close}>Experience</Link></li>
        <li><Link href="#resumes" onClick={close}>Resumes</Link></li>
        <li><Link href="#contact" className={styles.cta} onClick={close}>Contact</Link></li>
      </ul>
    </nav>
  )
}
