import { skills, experience, resumes } from '@/data'
import styles from './Sections.module.css'

export function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.label}>// Capabilities</div>
      <h2 className={styles.title}>THE FULL <span className={styles.ac}>STACK</span></h2>
      <div className={styles.skillGrid}>
        {skills.map(g => (
          <div key={g.group} className={styles.skillGroup}>
            <div className={styles.groupTitle}>{g.group}</div>
            <div className={styles.skillList}>
              {g.items.map(i => <div key={i} className={styles.skillItem}>{i}</div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className={styles.expSection}>
      <div className={styles.label}>// Experience</div>
      <h2 className={styles.title}>WHERE I&apos;VE <span className={styles.ac}>WORKED</span></h2>
      <div className={styles.timeline}>
        {experience.map(e => (
          <>
            <div key={e.period + '-date'} className={`${styles.tlDate} reveal`}>{e.period}</div>
            <div key={e.period + '-body'} className={`${styles.tlBody} reveal`}>
              <div className={styles.tlRole}>{e.role}</div>
              <div className={styles.tlCompany}>{e.company}</div>
              <ul className={styles.tlBullets}>
                {e.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </>
        ))}
      </div>
    </section>
  )
}

export function Resumes() {
  return (
    <section id="resumes" className={styles.resumeSection}>
      <div className={styles.label}>// Downloads</div>
      <h2 className={styles.title}>RESUME FOR <span className={styles.ac}>EVERY TRACK</span></h2>
      <div className={styles.resumeGrid}>
        {resumes.map(r => (
          <a key={r.track} href={r.href} className={styles.resumeCard} download>
            <div className={styles.resumeDl}>↓</div>
            <div className={styles.resumeTrack}>{r.track}</div>
            <div className={styles.resumeTitle}>{r.title}</div>
            <div className={styles.resumeTags}>
              {r.tags.map(t => <span key={t} className={styles.resumeTag}>{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutLeft}>
        <div className={styles.label}>// About</div>
        <h2 className={styles.title}>WHO I <span className={styles.ac}>AM</span></h2>
        <p className={`${styles.aboutBody} reveal`}>
          I&apos;m <strong>Ashley Mekolle</strong>, a final-year Software Engineering student at the
          University of Buea, graduating December 2026. I build across the full stack — ML
          microservices, AI agents, mobile apps, and automation pipelines.
        </p>
        <p className={`${styles.aboutBody} reveal`}>
          4 internships completed. Strongest project: <strong>Noura</strong>, a near-production
          AI healthcare platform. Currently building <strong>Dispatch</strong>, an AI-powered
          automation agent for small businesses.
        </p>
        <div className={`${styles.aboutLinks} reveal`}>
          <a href="https://github.com/AshleyMekolle" className={styles.aLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ashley-mekolle-66136b256/" className={styles.aLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:Mekolleashleyam@gmail.com" className={styles.aLink}>Email</a>
        </div>
      </div>
      <div className={styles.aboutRight}>
        <div className={`${styles.eduList} reveal`}>
          <div className={styles.eduItem}>
            <div className={styles.eduSchool}>University of Buea</div>
            <div className={styles.eduDegree}>Bachelor of Engineering — Software Engineering</div>
            <div className={styles.eduYear}>2022 — 2026 · Dec graduation</div>
          </div>
          <div className={styles.eduItem}>
            <div className={styles.eduSchool}>Horizon Bilingual Educational Complex</div>
            <div className={styles.eduDegree}>High School — Advanced Level Certificate</div>
            <div className={styles.eduYear}>2020 — 2022 · Douala</div>
          </div>
          <div className={styles.awardsBox}>
            <div className={styles.awardsLabel}>Awards</div>
            <div className={styles.awardsText}>
              Two-time awardee of the <strong>Kate Kanyi-Tometi Scholarship Fund</strong><br />
              Two-time awardee of the <strong>Presidential Excellency Award</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`${styles.label} ${styles.labelCenter}`}>// Get in Touch</div>
      <h2 className={`${styles.contactHead} reveal`}>
        LET&apos;S BUILD<br /><span className={styles.ac}>SOMETHING REAL</span>
      </h2>
      <p className={`${styles.contactSub} reveal`}>
        Open to internships, graduate roles, freelance projects, and collaborations.
        Graduating December 2026.
      </p>
      <div className={`${styles.contactLinks} reveal`}>
        <a href="mailto:Mekolleashleyam@gmail.com" className={`${styles.cl} ${styles.clPrimary}`}>Send an Email</a>
        <a href="https://www.linkedin.com/in/ashley-mekolle-66136b256/" className={`${styles.cl} ${styles.clSecondary}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/AshleyMekolle" className={`${styles.cl} ${styles.clSecondary}`} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
      <div className={styles.contactFooter}>
        Ashley Mekolle · Buea, Cameroon · Mekolleashleyam@gmail.com
      </div>
    </section>
  )
}
