import type { DiagramEdge, DiagramNode } from '@/data/projects'

const W = 184
const H = 84
const GX = 56
const GY = 30
const PAD = 16

const palette: Record<NonNullable<DiagramNode['kind']>, { fill: string; stroke: string }> = {
  source: { fill: '#f4f3ee', stroke: '#141513' },
  process: { fill: '#ffffff', stroke: '#141513' },
  ai: { fill: '#dde6de', stroke: '#3d5a47' },
  store: { fill: '#e6e5dc', stroke: '#141513' },
  out: { fill: '#ffffff', stroke: '#77766f' },
  ui: { fill: '#141513', stroke: '#141513' },
  aux: { fill: '#f4f3ee', stroke: '#77766f' },
}

function wrap(text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w } else cur = (cur + ' ' + w).trim()
  }
  if (cur) lines.push(cur)
  return lines
}

export default function Diagram({ nodes, edges, title, caption }: { nodes: DiagramNode[]; edges: DiagramEdge[]; title: string; caption: string }) {
  const cols = Math.max(...nodes.map((n) => n.col)) + 1
  const rows = Math.max(...nodes.map((n) => n.row)) + 1
  const width = PAD * 2 + cols * W + (cols - 1) * GX
  const height = PAD * 2 + rows * H + (rows - 1) * GY
  const pos = (n: DiagramNode) => ({ x: PAD + n.col * (W + GX), y: PAD + n.row * (H + GY) })
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  const paths = edges.map((e, i) => {
    const a = byId[e.from]
    const b = byId[e.to]
    const pa = pos(a)
    const pb = pos(b)
    let d: string
    let lx: number
    let ly: number
    if (b.col > a.col) {
      const x1 = pa.x + W, y1 = pa.y + H / 2, x2 = pb.x, y2 = pb.y + H / 2
      const mx = (x1 + x2) / 2
      d = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
      lx = mx; ly = (y1 + y2) / 2
    } else if (b.col < a.col) {
      const x1 = pa.x, y1 = pa.y + H / 2, x2 = pb.x + W, y2 = pb.y + H / 2
      const mx = (x1 + x2) / 2
      d = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
      lx = mx; ly = (y1 + y2) / 2
    } else {
      const down = b.row > a.row
      const x = pa.x + W / 2
      const y1 = down ? pa.y + H : pa.y
      const y2 = down ? pb.y : pb.y + H
      d = `M${x} ${y1} L${x} ${y2}`
      lx = x; ly = (y1 + y2) / 2
    }
    return { d, lx, ly, e, i }
  })

  return (
    <figure style={{ margin: 0 }}>
      <div className="diagram" role="group" aria-label={title}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ minWidth: Math.round(width * 0.8) }} role="img" aria-label={`${title}. ${nodes.map((n) => n.label).join(', ')}.`}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill="#141513" />
            </marker>
          </defs>
          {paths.map(({ d, e, i }) => (
            <path key={i} d={d} fill="none" stroke="#141513" strokeWidth={1.4} strokeDasharray={e.dashed ? '5 5' : undefined} markerEnd="url(#arrow)" opacity={0.8} />
          ))}
          {nodes.map((n) => {
            const p = pos(n)
            const c = palette[n.kind ?? 'process']
            const ink = n.kind === 'ui' ? '#f4f3ee' : '#141513'
            const sub = n.kind === 'ui' ? '#cfccc2' : '#55544e'
            return (
              <g key={n.id}>
                <rect x={p.x} y={p.y} width={W} height={H} rx={4} fill={c.fill} stroke={c.stroke} strokeWidth={1.4} strokeDasharray={n.kind === 'aux' ? '4 4' : undefined} />
                {(() => {
                  const ll = wrap(n.label, 22)
                  const sl = n.sub ? wrap(n.sub, 26) : []
                  const total = ll.length * 16 + (sl.length ? 4 + sl.length * 13 : 0)
                  let y = (H - total) / 2 + 12
                  return (
                    <>
                      {ll.map((t, k) => (
                        <text key={`a${k}`} x={p.x + 12} y={p.y + y + k * 16} fontSize={13} fontWeight={600} fill={ink} fontFamily="var(--f-body)">{t}</text>
                      ))}
                      {sl.map((t, k) => (
                        <text key={`b${k}`} x={p.x + 12} y={p.y + y + ll.length * 16 + 4 + k * 13 - 1} fontSize={10} fill={sub} fontFamily="var(--f-mono)">{t}</text>
                      ))}
                    </>
                  )
                })()}
              </g>
            )
          })}
          {paths.map(({ lx, ly, e, i }) =>
            e.label ? (
              <g key={`l${i}`}>
                <rect x={lx - e.label.length * 3.1 - 5} y={ly - 9} width={e.label.length * 6.2 + 10} height={17} fill="#f4f3ee" opacity={0.95} rx={2} />
                <text x={lx} y={ly + 3.5} fontSize={10.5} textAnchor="middle" fill="#3b3a36" fontFamily="var(--f-mono)">
                  {e.label}
                </text>
              </g>
            ) : null
          )}
        </svg>
      </div>
      <figcaption className="figcap">{caption}</figcaption>
      <details className="diagram-text">
        <summary>Text alternative</summary>
        <ul>
          {edges.map((e, i) => (
            <li key={i}>
              {byId[e.from].label} → {byId[e.to].label}
              {e.label ? ` (${e.label})` : ''}
            </li>
          ))}
        </ul>
      </details>
    </figure>
  )
}
