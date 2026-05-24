import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.tag}>
          <span className={styles.tagLine}></span>
          Software Engineer · Buea, Cameroon
        </div>
        <h1 className={styles.name}>
          MEKOLLE
          <br/>
          <span className={styles.accent}>ASHLEY</span>
        </h1>
        <p className={styles.role}>Full-Stack · Mobile · AI &amp; Automation</p>
        <p className={styles.desc}>
          Final-year Software Engineering student building production-grade systems —
          from ML-powered healthcare platforms to AI automation agents.
          Graduating December 2026.
        </p>
        <div className={styles.actions}>
          <Link href="#projects" className="btn-primary">View Work</Link>
          <Link href="#resumes" className="btn-ghost">Download Resume</Link>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.statsGrid}>
          {[
            { n: '4+',  l: 'Internships'       },
            { n: '8+',  l: 'Projects Shipped'  },
            { n: '4',   l: 'Engineering Tracks' },
            { n: "'26", l: 'Graduating'         },
          ].map(s => (
            <div key={s.l} className={styles.statBox}>
              <div className={styles.statNum}>{s.n}</div>
              <div className={styles.statLabel}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className={styles.available}>
          <div className={styles.dot} />
          <span className={styles.availText}>Available for opportunities</span>
        </div>
      </div>
    </section>
  )
}
