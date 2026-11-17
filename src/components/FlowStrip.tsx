// A restrained, typographic workflow outline (not a screenshot): labelled nodes on a line.
type Step = { n: string; label: string; sub: string }

export default function FlowStrip({ steps, label }: { steps: Step[]; label: string }) {
  return (
    <figure className="strip" role="group" aria-label={label}>
      <ol className="strip__list">
        {steps.map((s, i) => (
          <li key={s.n} className="strip__step">
            <span className="strip__n mono">{s.n}</span>
            <span className="strip__node" aria-hidden="true" />
            <span className="strip__label">{s.label}</span>
            <span className="strip__sub mono">{s.sub}</span>
            {i < steps.length - 1 && <span className="strip__line" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <figcaption className="figcap strip__cap">Workflow outline drawn from the project description, not a screenshot.</figcaption>
    </figure>
  )
}
