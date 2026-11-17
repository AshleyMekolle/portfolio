import Image from 'next/image'
import Link from 'next/link'
import { archive, featured, furtherCases, getCase, mlProjects, type CaseStudy } from '@/data/projects'
import FlowStrip from './FlowStrip'
import Reveal from './Reveal'

type F = { s: CaseStudy; descriptor: string; notes: string[]; n: string }

function heroImg(s: CaseStudy) {
  if (s.hero.kind !== 'image') throw new Error(`${s.slug} needs an image hero`)
  return s.hero
}

function Notes({ notes }: { notes: string[] }) {
  return (
    <ul className="notes mono" aria-label="Technical notes">
      {notes.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function Links({ s, light = false }: { s: CaseStudy; light?: boolean }) {
  return (
    <div className="f__links">
      <Link className={`btn ${light ? '' : 'btn--solid'}`} href={`/work/${s.slug}`}>
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
  )
}

function Title({ s, n }: { s: CaseStudy; n: string }) {
  return (
    <>
      <p className="mono f__kind"><span>{n}</span> / {s.kind}</p>
      <h3 className="f__title">
        <Link href={`/work/${s.slug}`}>{s.name}</Link>
      </h3>
    </>
  )
}

function Status({ s }: { s: CaseStudy }) {
  return (
    <p className="f__status">
      <span className="tag tag--status">{s.status}</span>
      <span className="mono muted">Updated {s.updated}</span>
    </p>
  )
}

/* 01 — wide screenshot left, narrow column right, giant numeral behind */
function One({ s, descriptor, notes, n }: F) {
  const h = heroImg(s)
  return (
    <Reveal as="article" className="f f1">
      <span className="f__num" aria-hidden="true">{n}</span>
      <figure className="f1__media">
        <div className="shot"><Image src={h.src} alt={h.alt} width={h.w} height={h.h} priority sizes="(min-width: 1000px) 62vw, 100vw" /></div>
        <figcaption className="figcap">{h.caption}</figcaption>
      </figure>
      <div className="f1__text">
        <Title s={s} n={n} />
        <p className="f__desc">{descriptor}</p>
        <p className="muted f__sum">{s.tagline}</p>
        <Notes notes={notes} />
        <Status s={s} />
        <Links s={s} />
      </div>
    </Reveal>
  )
}

/* 02 — text left, screenshot right with a second, smaller frame overlapping it */
function Two({ s, descriptor, notes, n }: F) {
  const h = heroImg(s)
  return (
    <Reveal as="article" className="f f2">
      <div className="f2__text">
        <Title s={s} n={n} />
        <p className="f__desc">{descriptor}</p>
        <p className="muted f__sum">{s.tagline}</p>
        <Notes notes={notes} />
        <Status s={s} />
        <Links s={s} />
      </div>
      <div className="f2__media">
        <span className="f__num f__num--right" aria-hidden="true">{n}</span>
        <figure className="f2__main">
          <div className="shot"><Image src={h.src} alt={h.alt} width={h.w} height={h.h} sizes="(min-width: 1000px) 56vw, 100vw" /></div>
          <figcaption className="figcap">{h.caption}</figcaption>
        </figure>
        <figure className="f2__inset">
          <div className="shot">
            <Image src="/work/mboko/workflow-retrieval.png" alt="The n8n retrieval and answer workflow: chat trigger, vector search, grounded answer chain." width={1113} height={388} sizes="(min-width: 1000px) 30vw, 70vw" />
          </div>
          <figcaption className="figcap">Screenshot — the n8n retrieval workflow.</figcaption>
        </figure>
      </div>
    </Reveal>
  )
}

/* 03 — oversized title across the page, annotations in a margin column, diagram offset right */
function Three({ s, descriptor, notes, n }: F) {
  const h = heroImg(s)
  return (
    <Reveal as="article" className="f f3">
      <div className="f3__head">
        <p className="mono f__kind"><span>{n}</span> / {s.kind}</p>
        <h3 className="f3__title"><Link href={`/work/${s.slug}`}>{s.name}</Link></h3>
      </div>
      <aside className="f3__margin">
        <p className="f__desc">{descriptor}</p>
        <Notes notes={notes} />
        <Status s={s} />
      </aside>
      <figure className="f3__media">
        <div className="shot shot--paper"><Image src={h.src} alt={h.alt} width={h.w} height={h.h} sizes="(min-width: 1000px) 66vw, 100vw" /></div>
        <figcaption className="figcap">{h.caption}</figcaption>
      </figure>
      <div className="f3__text">
        <p className="muted f__sum">{s.tagline}</p>
        <Links s={s} />
      </div>
    </Reveal>
  )
}

/* 04 — inverted panel; a typographic workflow outline instead of a screenshot */
function Four({ s, descriptor, notes, n }: F) {
  return (
    <Reveal as="article" className="f f4 on-night">
      <div className="f4__top">
        <Title s={s} n={n} />
        <p className="f__desc">{descriptor}</p>
      </div>
      <FlowStrip
        label="Order management workflow outline"
        steps={[
          { n: '01', label: 'Jotform', sub: 'order intake' },
          { n: '02', label: 'Make', sub: 'scenarios' },
          { n: '03', label: 'Airtable', sub: 'orders · customers · stock' },
          { n: '04', label: 'Emails + dashboard', sub: 'confirm · alert · remind' },
        ]}
      />
      <div className="f4__bottom">
        <div>
          <p className="f__sum">{s.tagline}</p>
          <Notes notes={notes} />
        </div>
        <div>
          <Status s={s} />
          <Links s={s} light />
        </div>
      </div>
    </Reveal>
  )
}

export default function Work() {
  const items = featured.map((f, i) => ({ s: getCase(f.slug)!, descriptor: f.descriptor, notes: f.notes, n: String(i + 1).padStart(2, '0') }))
  const extra = furtherCases.length + mlProjects.length + archive.length
  return (
    <section id="work" className="section work" aria-labelledby="work-h">
      <div className="wrap">
        <Reveal className="work__head">
          <h2 id="work-h" className="work__h">Selected work</h2>
          <div className="work__aside">
            <p className="mono">(04)</p>
            <p className="lead">Systems I’ve designed, built and brought to life.</p>
            <p className="muted work__note">Each links to a full case study: architecture, my contribution, decisions, results and limits. Status labels are literal.</p>
          </div>
        </Reveal>

        <One {...items[0]} />
        <Two {...items[1]} />
        <Three {...items[2]} />
        <Four {...items[3]} />

        <Reveal className="work__more">
          <p className="display-m">
            {extra} more entries — further case studies, ML exercises and the development archive.
          </p>
          <Link className="btn" href="/archive">
            Open the archive <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
