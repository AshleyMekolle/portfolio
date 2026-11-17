import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { Footer } from '@/components/Sections'
import { archive, furtherCases, mlProjects, type Compact } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Further case studies, smaller machine-learning projects and the development archive.',
  alternates: { canonical: '/archive' },
}

function Row({ p, i }: { p: Compact; i: number }) {
  return (
    <li className="ix__row">
      <span className="mono ix__n">{String(i + 1).padStart(2, '0')}</span>
      <div className="ix__main">
        <h3 className="ix__name">{p.name}</h3>
        <p className="muted ix__blurb">{p.blurb}</p>
        {p.note && <p className="mono ix__note">{p.note}</p>}
      </div>
      <div className="ix__meta">
        <p className="mono ix__status">{p.status}</p>
        <p className="mono muted ix__tech">{p.tech.join(' · ')}</p>
        <p className="ix__links">
          {p.repo && <a className="tlink" href={p.repo} target="_blank" rel="noopener noreferrer">Source<span className="sr"> for {p.name} (opens in a new tab)</span> ↗</a>}
          {p.demo && <a className="tlink" href={p.demo} target="_blank" rel="noopener noreferrer">Live<span className="sr"> {p.name} (opens in a new tab)</span> ↗</a>}
        </p>
      </div>
    </li>
  )
}

export default function ArchivePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <header className="wrap arch__head">
          <p className="mono case__crumb"><Link href="/#work">← Selected work</Link></p>
          <h1 className="arch__title">Archive</h1>
          <p className="lead">
            Everything that isn’t on the front page: further case studies, smaller machine-learning projects, exercises and
            courses. Each entry is described by what its code actually does.
          </p>
        </header>

        <section className="wrap arch__sec" aria-labelledby="a-cases">
          <h2 id="a-cases" className="mono arch__h">Further case studies</h2>
          <ul className="ix">
            {furtherCases.map((c, i) => (
              <li key={c.slug} className="ix__row">
                <span className="mono ix__n">{String(i + 1).padStart(2, '0')}</span>
                <div className="ix__main">
                  <h3 className="ix__name"><Link href={`/work/${c.slug}`}>{c.name}</Link></h3>
                  <p className="muted ix__blurb">{c.tagline}</p>
                </div>
                <div className="ix__meta">
                  <p className="mono ix__status">{c.status}</p>
                  <p className="mono muted ix__tech">{c.tech.slice(0, 4).join(' · ')}</p>
                  <p className="ix__links"><Link className="tlink" href={`/work/${c.slug}`}>Case study →</Link></p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap arch__sec" aria-labelledby="a-ml">
          <h2 id="a-ml" className="mono arch__h">Machine learning projects</h2>
          <p className="muted arch__intro">Four small projects from one repository. Two are less complete than the repository README suggests, and are labelled accordingly.</p>
          <ul className="ix">{mlProjects.map((p, i) => <Row key={p.name} p={p} i={i} />)}</ul>
        </section>

        <section className="wrap arch__sec" aria-labelledby="a-dev">
          <h2 id="a-dev" className="mono arch__h">Development archive</h2>
          <ul className="ix">{archive.map((p, i) => <Row key={p.name} p={p} i={i} />)}</ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
