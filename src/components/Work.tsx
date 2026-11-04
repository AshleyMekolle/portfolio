import Link from 'next/link'
import { archive, categories, caseStudies, mlProjects, type CaseStudy, type Compact } from '@/data/projects'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'

function Feature({ s, flip, first }: { s: CaseStudy; flip: boolean; first: boolean }) {
  return (
    <Reveal as="article" className={`feature ${flip ? 'feature--flip' : ''}`}>
      <div className="feature__visual">
        <ProjectVisual study={s} priority={first} sizes="(min-width: 1000px) 55vw, 100vw" />
      </div>
      <div className="feature__text">
        <p className="mono feature__num">
          <span>{s.num}</span> <span aria-hidden="true">/</span> {s.kind}
        </p>
        <h3 className="display-m feature__title">
          <Link href={`/work/${s.slug}`}>{s.name}</Link>
        </h3>
        <p className="feature__tag">{s.tagline}</p>
        <p className="muted feature__sum">{s.summary}</p>
        <p className="feature__status">
          <span className="tag tag--status">{s.status}</span>
          <span className="mono muted">Updated {s.updated}</span>
        </p>
        <ul className="taglist" aria-label="Technology">
          {s.tech.slice(0, 7).map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
        <div className="feature__links">
          <Link className="btn btn--solid" href={`/work/${s.slug}`}>
            View case study <span className="arrow" aria-hidden="true">→</span>
          </Link>
          {s.links.repo && (
            <a className="tlink" href={s.links.repo} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr"> (opens in a new tab)</span> ↗
            </a>
          )}
          {s.links.demo && (
            <a className="tlink" href={s.links.demo} target="_blank" rel="noopener noreferrer">
              {s.category === 'automation' ? 'Live workflow' : 'Live demo'}<span className="sr"> (opens in a new tab)</span> ↗
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function CompactCard({ p }: { p: Compact }) {
  return (
    <li className="compact">
      <div className="compact__head">
        <h4 className="compact__name">{p.name}</h4>
        <span className="tag">{p.status}</span>
      </div>
      <p className="muted compact__blurb">{p.blurb}</p>
      {p.note && <p className="compact__note mono">{p.note}</p>}
      <ul className="taglist" aria-label="Technology">
        {p.tech.map((t) => (
          <li key={t} className="tag">{t}</li>
        ))}
      </ul>
      <div className="compact__links">
        {p.repo && (
          <a className="tlink" href={p.repo} target="_blank" rel="noopener noreferrer">
            Source<span className="sr"> for {p.name} (opens in a new tab)</span> ↗
          </a>
        )}
        {p.demo && (
          <a className="tlink" href={p.demo} target="_blank" rel="noopener noreferrer">
            Live<span className="sr"> {p.name} (opens in a new tab)</span> ↗
          </a>
        )}
      </div>
    </li>
  )
}

export default function Work() {
  let i = 0
  return (
    <section id="work" className="section work" aria-labelledby="work-h">
      <div className="wrap">
        <Reveal className="work__head">
          <p className="mono eyebrow">Work · 7 case studies</p>
          <h2 id="work-h" className="display-l">Selected work</h2>
          <p className="lead">Systems I’ve designed, built and brought to life.</p>
          <p className="muted work__note">
            Each project has a case study with the architecture, what I built, the engineering decisions and the limits.
            Statuses are literal: an MVP is described as an MVP.
          </p>
        </Reveal>

        {(['ai', 'automation', 'software'] as const).map((cid) => {
          const cat = categories.find((c) => c.id === cid)!
          const list = caseStudies.filter((c) => c.category === cid)
          return (
            <div key={cid} className="work__group" aria-labelledby={`cat-${cid}`}>
              <Reveal className="work__cat">
                <h3 id={`cat-${cid}`} className="mono">{cat.title}</h3>
                <p className="muted">{cat.blurb}</p>
              </Reveal>
              {list.map((s) => {
                const idx = i++
                return <Feature key={s.slug} s={s} flip={idx % 2 === 1} first={idx === 0} />
              })}
            </div>
          )
        })}

        <div className="work__group" aria-labelledby="cat-ml">
          <Reveal className="work__cat">
            <h3 id="cat-ml" className="mono">Machine Learning</h3>
            <p className="muted">
              Four small projects from one repository. Each is described by what its code actually does — two of them are
              less complete than the repository README suggests, and are labelled accordingly.
            </p>
          </Reveal>
          <ul className="compact-grid">{mlProjects.map((p) => <CompactCard key={p.name} p={p} />)}</ul>
        </div>

        <div className="work__group" aria-labelledby="cat-archive">
          <Reveal className="work__cat">
            <h3 id="cat-archive" className="mono">Development Archive</h3>
            <p className="muted">Smaller projects and exercises, kept for completeness. No case studies.</p>
          </Reveal>
          <ul className="compact-grid">{archive.map((p) => <CompactCard key={p.name} p={p} />)}</ul>
        </div>
      </div>
    </section>
  )
}
