'use client'
import { useState } from 'react'
import { projects } from '@/data'
import styles from './Projects.module.css'

const FILTERS = [
  { label: 'All',        value: 'all'  },
  { label: 'Full-Stack', value: 'fs'   },
  { label: 'Mobile',     value: 'mob'  },
  { label: 'AI / ML',    value: 'ai'   },
  { label: 'Automation', value: 'auto' },
]

const STATUS_CLASS: Record<string, string> = {
  live: styles.statusLive,
  wip:  styles.statusWip,
  near: styles.statusNear,
  done: styles.statusDone,
}

export default function Projects() {
  const [active, setActive] = useState('all')

  const visible = projects.filter(p =>
    active === 'all' || p.tags.includes(active)
  )

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.label}>// Selected Work</div>
      <h2 className={styles.title}>
        PROJECTS<br />
        <span className={styles.dim}>THAT</span>{' '}
        <span className={styles.ac}>SHIP</span>
      </h2>

      <div className={styles.filterBar}>
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${active === f.value ? styles.filterOn : ''}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map(p => (
          <article
            key={p.num}
            className={`${styles.card} ${p.featured ? styles.featured : ''} reveal`}
          >
            <div className={styles.cardNum}>
              {p.num}
              {p.featured ? ' — Featured' : ''}
              <span className={`${styles.status} ${STATUS_CLASS[p.status]}`}>
                {p.statusLabel}
              </span>
            </div>
            <div className={styles.roleTags}>
              {p.roles.map(r => (
                <span key={r.label} className={`${styles.roleTag} ${styles[r.cls.replace('role-','role')]}`}>
                  {r.label}
                </span>
              ))}
            </div>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.desc}</p>
            <div className={styles.techTags}>
              {p.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
            </div>
            <div className={styles.links}>
              {p.links.map(l => (
                <a key={l.label} href={l.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
