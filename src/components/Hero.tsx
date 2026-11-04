import Voronoi from './Voronoi'
import { site } from '@/data/site'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="mono eyebrow">AI &amp; Automation / Software Engineering</p>
          <h1 id="hero-h" className="display-xl">
            I build intelligent systems that do <em className="accent">useful work.</em>
          </h1>
          <p className="lead hero__lead">
            I design and build intelligent applications, backend systems and automated workflows — connecting software,
            APIs and AI to turn complex processes into working solutions.
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#work">
              Explore my work <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href={site.cv} download>
              Download CV <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__plate">
            <Voronoi seed={11} count={34} width={760} height={860} accent={[4, 13, 22]} dark={[8, 19, 27]} pulses={6} />
          </div>
          <p className="hero__legend mono">
            <span>Fig. 1</span> A system as cells and connections — original graphic
          </p>
        </div>
      </div>

      <div className="wrap">
        <dl className="hero__facts">
          <div><dt className="mono">Focus</dt><dd>Applied AI · Automation · Backend</dd></div>
          <div><dt className="mono">Based in</dt><dd>Buea, Cameroon</dd></div>
          <div><dt className="mono">Studying</dt><dd>University of Buea, graduating Dec 2026</dd></div>
          <div><dt className="mono">Open to</dt><dd>Junior &amp; graduate engineering roles</dd></div>
        </dl>
      </div>
    </section>
  )
}
