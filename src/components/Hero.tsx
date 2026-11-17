import Voronoi from './Voronoi'
import { site } from '@/data/site'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="hero__art" aria-hidden="true">
        <Voronoi seed={23} count={22} width={1000} height={760} plain accent={[6, 15]} pulses={5} />
      </div>

      <div className="wrap hero__inner">
        <div className="hero__meta mono">
          <span>Mekolle Ashley</span>
          <span className="hero__avail">
            <i className="hero__dot" aria-hidden="true" />
            Open to junior engineering roles · Kigali, Rwanda
          </span>
        </div>

        <h1 id="hero-h" className="hero__title">
          <span className="hero__l1">I build systems</span>
          <span className="hero__l2">that make work</span>
          <span className="hero__l3"><em className="accent">happen.</em></span>
        </h1>

        <div className="hero__foot">
          <p className="mono hero__label">
            <span>AI &amp; Automation</span>
            <span aria-hidden="true">/</span>
            <span>Software Engineering</span>
          </p>
          <div className="hero__body">
            <p className="lead">
              I build apps, backend services and automated workflows that connect software, APIs and AI. Most of my
              projects start with a process that was slow or manual and end with something that runs on its own.
            </p>
            <div className="hero__cta">
              <a className="btn btn--solid" href="#work">
                Selected work <span className="arrow" aria-hidden="true">↓</span>
              </a>
              <a className="btn" href={site.cv} download>
                Curriculum vitae <span className="arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
