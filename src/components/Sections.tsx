import { cvs, education, experience, expertise, site } from '@/data/site'
import Reveal from './Reveal'
import Voronoi from './Voronoi'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="mono eyebrow">Experience</p>
          <h2 id="exp-h" className="display-l">Where I’ve worked</h2>
        </Reveal>
        <ol className="timeline">
          {experience.map((e) => (
            <Reveal as="li" key={e.company} className="timeline__item">
              <p className="mono timeline__period">{e.period}</p>
              <div>
                <h3 className="display-m timeline__role">{e.role}</h3>
                <p className="timeline__co">{e.company}</p>
                <ul className="timeline__points">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <ul className="taglist" aria-label="Technologies">
                  {e.stack.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
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
    <section id="expertise" className="section section--tint" aria-labelledby="exp2-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="mono eyebrow">Technical expertise</p>
          <h2 id="exp2-h" className="display-l">Disciplines, not a badge wall</h2>
          <p className="lead">
            Grouped by the kind of engineering they support. <strong>Demonstrated</strong> means it appears in the featured
            work above; <strong>working knowledge</strong> means I’ve used it in internships or smaller projects.
          </p>
        </Reveal>
        <div className="disc">
          {expertise.map((d) => (
            <Reveal as="article" key={d.title} className="disc__row">
              <div>
                <h3 className="display-m">{d.title}</h3>
                {d.blurb && <p className="muted disc__blurb">{d.blurb}</p>}
              </div>
              <div>
                <p className="mono disc__label">Demonstrated</p>
                <ul className="taglist disc__core">
                  {d.core.map((t) => <li key={t} className="tag tag--core">{t}</li>)}
                </ul>
                <p className="mono disc__label">Working knowledge</p>
                <ul className="taglist">
                  {d.working.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
                {d.proof.length > 0 && (
                  <p className="disc__proof muted">Seen in: {d.proof.join(' · ')}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="wrap about">
        <Reveal className="about__head">
          <p className="mono eyebrow">About</p>
          <h2 id="about-h" className="display-l">An engineer who likes the whole system.</h2>
        </Reveal>
        <Reveal className="about__body" delay={80}>
          <p>
            I’m a software engineer interested in practical systems and intelligent automation. I like working across the
            layers: understanding the problem, designing the solution, building the backend services, integrating APIs and
            AI capabilities, automating what is repetitive, and delivering something people can actually use.
          </p>
          <p>
            My experience spans a Laravel backend internship, automation engineering with n8n, Make and Zapier, and
            cross-platform app development in Flutter. My own projects put language models and machine learning behind
            real interfaces — an LLM that triages GitHub issues, a retrieval assistant that answers only from its
            documents, and an explainable risk model.
          </p>
          <p>
            I try to be exact about what a system does and what it does not. That is why each case study here lists its
            limitations and its unfinished work as plainly as its results.
          </p>
        </Reveal>

        <Reveal className="edu" delay={120}>
          <p className="mono eyebrow">Education &amp; recognition</p>
          <h3 className="edu__school">{education.school}</h3>
          <p>{education.degree}</p>
          <p className="mono muted">{education.period}</p>
          <ul className="edu__awards">
            {education.awards.map((a) => (
              <li key={a.name}>
                <span>{a.name}</span>
                <span className="mono muted">{a.detail}</span>
              </li>
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
        <Voronoi seed={5} count={28} width={900} height={700} tone="night" accent={[5, 17]} pulses={4} />
      </div>
      <div className="wrap contact__inner">
        <Reveal>
          <p className="mono eyebrow">Contact</p>
          <h2 id="contact-h" className="display-xl">Have a problem worth solving?</h2>
          <p className="lead contact__lead">
            I’m interested in opportunities where software engineering, applied AI and automation can make a practical difference.
          </p>
          <div className="contact__cta">
            <a className="btn btn--solid" href={`mailto:${site.email}`}>
              Email me <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href={site.cv} download>
              Download CV <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="contact__list" delay={100}>
          <dl>
            <div><dt className="mono">Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt className="mono">GitHub</dt><dd><a href={site.github} target="_blank" rel="noopener noreferrer">github.com/AshleyMekolle<span className="sr"> (opens in a new tab)</span></a></dd></div>
            <div><dt className="mono">LinkedIn</dt><dd><a href={site.linkedin} target="_blank" rel="noopener noreferrer">Ashley Mekolle<span className="sr"> (opens in a new tab)</span></a></dd></div>
          </dl>
          <div className="contact__cvs">
            <p className="mono">CV versions</p>
            <ul>
              {cvs.map((c) => (
                <li key={c.href}>
                  <a href={c.href} download>{c.label}</a>
                  <span>{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <p className="mono">© {new Date().getFullYear()} Mekolle Ashley</p>
        <p className="mono muted">AI · Automation · Software engineering</p>
        <p className="mono"><a href="#main">Back to top ↑</a></p>
      </div>
    </footer>
  )
}
