import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import { Footer } from '@/components/Sections'
import Diagram from '@/components/Diagram'
import ProjectVisual from '@/components/ProjectVisual'
import Reveal from '@/components/Reveal'
import { caseStudies, categories, getCase, type Evidence } from '@/data/projects'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCase(params.slug)
  if (!c) return {}
  return {
    title: `${c.name}: case study`,
    description: `${c.tagline} ${c.summary}`.slice(0, 280),
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: `${c.name}: case study`, description: c.tagline, type: 'article', url: `/work/${c.slug}` },
    twitter: { card: 'summary_large_image', title: `${c.name}: case study`, description: c.tagline },
  }
}

const toc = [
  ['overview', 'Overview'],
  ['problem', 'The problem'],
  ['solution', 'The solution'],
  ['architecture', 'System architecture'],
  ['contribution', 'My contribution'],
  ['decisions', 'Technical decisions'],
  ['evidence', 'Evidence & implementation'],
  ['status', 'Project status'],
  ['lessons', 'Lessons & next steps'],
] as const

function EvidenceItem({ e }: { e: Evidence }) {
  switch (e.type) {
    case 'image':
      return (
        <figure className={`ev ev--image ${e.wide ? 'ev--wide' : ''}`}>
          <div className="ev__img">
            <Image src={e.src} alt={e.alt} width={e.w} height={e.h} sizes={e.wide ? '(min-width: 1000px) 780px, 100vw' : '(min-width: 1000px) 380px, 100vw'} />
          </div>
          <figcaption className="figcap">{e.caption}</figcaption>
        </figure>
      )
    case 'code':
      return (
        <figure className="ev ev--wide">
          <figcaption className="ev__title mono">{e.title}</figcaption>
          <pre className="code" tabIndex={0} aria-label={e.title}><code>{e.code}</code></pre>
          <p className="figcap">Source: <code>{e.source}</code></p>
        </figure>
      )
    case 'table':
      return (
        <figure className="ev ev--wide">
          <figcaption className="ev__title mono">{e.title}</figcaption>
          <div className="tablewrap" tabIndex={0} role="region" aria-label={e.title}>
            <table className="table">
              <thead><tr>{e.headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {e.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="figcap">Source: {e.source}</p>
        </figure>
      )
    case 'link':
      return (
        <div className="ev ev--link">
          <a className="tlink" href={e.href} target="_blank" rel="noopener noreferrer">{e.label}<span className="sr"> (opens in a new tab)</span> ↗</a>
          <p className="muted">{e.note}</p>
        </div>
      )
    case 'missing':
      return (
        <div className="ev ev--missing" role="note">
          <p className="mono">To add</p>
          <p>{e.text}</p>
        </div>
      )
  }
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug)
  if (!c) notFound()
  const idx = caseStudies.findIndex((x) => x.slug === c.slug)
  const next = caseStudies[(idx + 1) % caseStudies.length]
  const cat = categories.find((x) => x.id === c.category)!
  const images = c.evidence.filter((e) => e.type === 'image' && !e.wide)
  const rest = c.evidence.filter((e) => !(e.type === 'image' && !e.wide))

  return (
    <>
      <Nav />
      <main id="main" className="case">
        <header className="wrap case__head">
          <p className="mono case__crumb">
            <Link href="/#work">← Selected work</Link> <span aria-hidden="true">/</span> {cat.title}
          </p>
          <p className="mono case__num">Case study {c.num}</p>
          <h1 className="display-xl case__title">{c.name}</h1>
          <p className="lead case__tag">{c.tagline}</p>
        </header>

        <div className="wrap">
          <ProjectVisual study={c} priority sizes="(min-width: 1000px) 1200px, 100vw" />
        </div>

        <div className="wrap case__layout">
          <aside className="case__toc" aria-label="On this page">
            <p className="mono">Contents</p>
            <ol>
              {toc.map(([id, label], i) => (
                <li key={id}><a href={`#${id}`}><span className="mono">{String(i + 1).padStart(2, '0')}</span> {label}</a></li>
              ))}
            </ol>
          </aside>

          <div className="case__body">
            <section id="overview" aria-labelledby="h-overview" className="cs">
              <h2 id="h-overview" className="cs__h"><span className="mono">01</span> Project overview</h2>
              <p className="cs__lead">{c.summary}</p>
              <dl className="facts">
                <div><dt className="mono">Project</dt><dd>{c.name}</dd></div>
                <div><dt className="mono">Problem domain</dt><dd>{c.domain}</dd></div>
                <div><dt className="mono">Category</dt><dd>{cat.title}</dd></div>
                <div><dt className="mono">Status</dt><dd><span className="tag tag--status">{c.status}</span></dd></div>
                <div><dt className="mono">Last updated</dt><dd>{c.updated}</dd></div>
                <div className="facts__wide">
                  <dt className="mono">Technologies</dt>
                  <dd><ul className="taglist">{c.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul></dd>
                </div>
                <div className="facts__wide">
                  <dt className="mono">Links</dt>
                  <dd className="facts__links">
                    {c.links.repo ? <a className="tlink" href={c.links.repo} target="_blank" rel="noopener noreferrer">Repository<span className="sr"> (opens in a new tab)</span> ↗</a> : <span className="muted">Repository: not public / not applicable</span>}
                    {c.links.demo ? <a className="tlink" href={c.links.demo} target="_blank" rel="noopener noreferrer">{c.category === 'automation' ? 'Live workflow / dashboard' : 'Live demo'}<span className="sr"> (opens in a new tab)</span> ↗</a> : <span className="muted">Live demo: none verified</span>}
                    {c.links.extra?.map((l) => <a key={l.href} className="tlink" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<span className="sr"> (opens in a new tab)</span> ↗</a>)}
                  </dd>
                </div>
              </dl>
            </section>

            <section id="problem" aria-labelledby="h-problem" className="cs">
              <h2 id="h-problem" className="cs__h"><span className="mono">02</span> The problem</h2>
              {c.problem.map((p, i) => <p key={i}>{p}</p>)}
            </section>

            <section id="solution" aria-labelledby="h-solution" className="cs">
              <h2 id="h-solution" className="cs__h"><span className="mono">03</span> The solution</h2>
              <p>{c.solution.intro}</p>
              <div className="split">
                <div>
                  <h3 className="mono split__h">Implemented</h3>
                  <ul className="ticks">{c.solution.implemented.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div>
                  <h3 className="mono split__h">Planned / not implemented</h3>
                  <ul className="ticks ticks--open">{c.solution.planned.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
            </section>

            <section id="architecture" aria-labelledby="h-arch" className="cs cs--wide">
              <h2 id="h-arch" className="cs__h"><span className="mono">04</span> System architecture</h2>
              <Diagram nodes={c.architecture.nodes} edges={c.architecture.edges} title={`${c.name} architecture`} caption={c.architecture.caption} />
            </section>

            <section id="contribution" aria-labelledby="h-contrib" className="cs">
              <h2 id="h-contrib" className="cs__h"><span className="mono">05</span> My contribution</h2>
              <dl className="contrib">
                {c.contribution.map((x) => (
                  <div key={x.area}><dt className="mono">{x.area}</dt><dd>{x.text}</dd></div>
                ))}
              </dl>
            </section>

            <section id="decisions" aria-labelledby="h-dec" className="cs">
              <h2 id="h-dec" className="cs__h"><span className="mono">06</span> Technical decisions</h2>
              <ol className="decisions">
                {c.decisions.map((d) => (
                  <li key={d.title}><h3>{d.title}</h3><p>{d.body}</p></li>
                ))}
              </ol>
            </section>

            <section id="evidence" aria-labelledby="h-ev" className="cs cs--wide">
              <h2 id="h-ev" className="cs__h"><span className="mono">07</span> Evidence &amp; implementation</h2>
              {images.length > 0 && (
                <div className="ev-grid">
                  {images.map((e, i) => <EvidenceItem key={i} e={e} />)}
                </div>
              )}
              {rest.map((e, i) => <EvidenceItem key={i} e={e} />)}
            </section>

            <section id="status" aria-labelledby="h-status" className="cs">
              <h2 id="h-status" className="cs__h"><span className="mono">08</span> Project status</h2>
              <p className="status-line"><span className="tag tag--status">{c.status}</span> <span className="mono muted">Last updated {c.updated}</span></p>
              <p>{c.statusNote}</p>
            </section>

            <section id="lessons" aria-labelledby="h-less" className="cs">
              <h2 id="h-less" className="cs__h"><span className="mono">09</span> Lessons &amp; future improvements</h2>
              <div className="split split--4">
                <div><h3 className="mono split__h">Engineering challenges</h3><ul className="bul">{c.lessons.challenges.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div><h3 className="mono split__h">What I learned</h3><ul className="bul">{c.lessons.learned.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div><h3 className="mono split__h">Limitations</h3><ul className="bul">{c.lessons.limitations.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div><h3 className="mono split__h">Next improvements</h3><ul className="bul">{c.lessons.next.map((x) => <li key={x}>{x}</li>)}</ul></div>
              </div>
            </section>
          </div>
        </div>

        <Reveal className="wrap case__next">
          <p className="mono">Next case study</p>
          <Link href={`/work/${next.slug}`} className="display-l case__nextlink">{next.name} <span aria-hidden="true">→</span></Link>
          <Link href="/#work" className="tlink">All work</Link>
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
