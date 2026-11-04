import Image from 'next/image'
import type { CaseStudy } from '@/data/projects'
import Voronoi from './Voronoi'

// Real screenshots/diagrams are shown as images with an honest caption.
// Where none exist, a conceptual composition is shown and labelled as such.
export default function ProjectVisual({ study, priority = false, sizes }: { study: CaseStudy; priority?: boolean; sizes?: string }) {
  const h = study.hero
  if (h.kind === 'image') {
    return (
      <figure className="pv pv--image">
        <div className="pv__frame">
          <Image src={h.src} alt={h.alt} width={h.w} height={h.h} priority={priority} sizes={sizes ?? '(min-width: 1000px) 58vw, 100vw'} />
        </div>
        <figcaption className="figcap">{h.caption}</figcaption>
      </figure>
    )
  }
  return (
    <figure className="pv pv--concept">
      <div className="pv__frame pv__frame--concept">
        <Voronoi seed={h.seed} count={26} width={900} height={560} accent={[3, 11, 17]} dark={[6, 20]} pulses={3} />
        <ul className="pv__chips" aria-label="Systems involved">
          {h.chips.map((c) => (
            <li key={c} className="mono">{c}</li>
          ))}
        </ul>
      </div>
      <figcaption className="figcap">Conceptual composition — not a screenshot of the product.</figcaption>
    </figure>
  )
}
