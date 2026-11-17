import Link from 'next/link'
import { cvs, education, experience, expertise, site, tools } from '@/data/site'
import Reveal from './Reveal'
import Voronoi from './Voronoi'

export function Experience() {
  return (
    <section id="experience" className="section sec" aria-labelledby="exp-h">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="mono sec__idx">02</p>
          <h2 id="exp-h" className="sec__title">Experience</h2>
        </Reveal>
        <ol className="tl">
          {experience.map((e) => (
            <Reveal as="li" key={e.company} className="tl__row">
              <p className="mono tl__period">{e.period}</p>
              <div className="tl__who">
                <h3 className="tl__co">{e.company}</h3>
                <p className="tl__role">{e.role}</p>
              </div>
              <div className="tl__what">
                <p>{e.line}</p>
                <p className="mono muted tl__stack">{e.stack}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section id="expertise" className="section sec sec--tint" aria-labelledby="exp2-h">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="mono sec__idx">03</p>
          <h2 id="exp2-h" className="sec__title">Expertise</h2>
          <p className="sec__note muted">
            <strong>Bold</strong> is shown in the featured work. The rest I have used in internships or smaller projects.
          </p>
        </Reveal>
        <div className="disc">
          {expertise.map((d, i) => (
            <Reveal as="article" key={d.title} className="disc__col" delay={i * 60}>
              <p className="mono disc__n">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="disc__title">{d.title}</h3>
              <p className="muted disc__line">{d.line}</p>
              <p className="disc__tech">
                {d.core.map((t) => (
                  <strong key={t}>{t}</strong>
                ))}
                {d.also.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
              <p className="mono disc__cases">
                {d.cases.map((c) => (
                  <Link key={c.slug} href={`/work/${c.slug}`}>{c.label} →</Link>
                ))}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mono muted disc__tools">Tools: {tools}</Reveal>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section sec" aria-labelledby="about-h">
      <div className="wrap about">
        <Reveal className="sec__head">
          <p className="mono sec__idx">04</p>
          <h2 id="about-h" className="sec__title">About</h2>
        </Reveal>
        <Reveal className="about__body" delay={60}>
          <p className="about__lead">
            I like working on the whole system: understanding the problem, designing the solution, building the backend,
            wiring in APIs and AI, and automating what is repetitive.
          </p>
          <p className="muted">
            I have worked on a Laravel backend, built automation in n8n, Make and Zapier, and shipped mobile features in
            Flutter. My own projects put language models and machine learning behind real interfaces. I write down what
            each one does and what it doesn’t.
          </p>
        </Reveal>
        <Reveal as="aside" className="edu" delay={120} aria-label="Education and recognition">
          <p className="mono edu__label">Education</p>
          <p className="edu__school">{education.school}</p>
          <p>{education.degree}</p>
          <p className="mono muted">{education.period}</p>
          <p className="mono edu__label edu__label--2">Recognition</p>
          <ul>
            {education.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact on-night" aria-labelledby="contact-h">
      <div className="contact__art" aria-hidden="true">
        <Voronoi seed={5} count={24} width={1000} height={700} tone="night" plain accent={[5]} pulses={3} />
      </div>
      <div className="wrap contact__inner">
        <Reveal>
          <p className="mono contact__idx">05 / Contact</p>
          <h2 id="contact-h" className="contact__title">
            Have a problem <em className="accent">worth solving?</em>
          </h2>
          <p className="lead contact__lead">
            I’m looking for a junior role in software engineering, applied AI or automation. If you have a problem like that, email me.
          </p>
          <a className="contact__mail" href={`mailto:${site.email}`}>{site.email}</a>
        </Reveal>

        <Reveal className="contact__grid" delay={80}>
          <ul className="contact__links">
            <li><a href={`mailto:${site.email}`}>Email <span aria-hidden="true">→</span></a></li>
            <li><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr"> (opens in a new tab)</span></a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr"> (opens in a new tab)</span></a></li>
            <li><a href={site.cv} download>Curriculum vitae <span aria-hidden="true">↓</span></a></li>
          </ul>
          <p className="mono contact__cvs">
            Other CVs:{' '}
            {cvs.slice(1).map((c, i) => (
              <span key={c.href}>{i > 0 && ' · '}<a href={c.href} download>{c.label}</a></span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <p className="mono">© {new Date().getFullYear()} Mekolle Ashley · Kigali, Rwanda</p>
        <p className="mono"><Link href="/archive">Archive</Link></p>
        <p className="mono"><a href="#main">Back to top ↑</a></p>
      </div>
    </footer>
  )
}
