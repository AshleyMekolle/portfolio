'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="#hero" className={styles.logo}>
        Ashley<span>.</span>
      </Link>
      <ul className={styles.links}>
        <li><Link href="#projects">Work</Link></li>
        <li><Link href="#skills">Skills</Link></li>
        <li><Link href="#experience">Experience</Link></li>
        <li><Link href="#resumes">Resumes</Link></li>
        <li><Link href="#contact" className={styles.cta}>Contact</Link></li>
      </ul>
    </nav>
  )
}
