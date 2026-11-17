// Original graphic language: a deterministic Voronoi tessellation with a sparse
// node-and-edge overlay. Generated at build time (no client JS, no libraries).

type Pt = [number, number]

function rng(seed: number) {
  let s = seed >>> 0 || 1
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Clip polygon to the half-plane of points closer to `a` than to `b`.
function clip(poly: Pt[], a: Pt, b: Pt): Pt[] {
  const mx = (a[0] + b[0]) / 2
  const my = (a[1] + b[1]) / 2
  const nx = b[0] - a[0]
  const ny = b[1] - a[1]
  const side = (p: Pt) => (p[0] - mx) * nx + (p[1] - my) * ny // <0 is on a's side
  const out: Pt[] = []
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i]
    const q = poly[(i + 1) % poly.length]
    const sp = side(p)
    const sq = side(q)
    if (sp <= 0) out.push(p)
    if ((sp < 0 && sq > 0) || (sp > 0 && sq < 0)) {
      const t = sp / (sp - sq)
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t])
    }
  }
  return out
}

function cells(points: Pt[], w: number, h: number): Pt[][] {
  const box: Pt[] = [[0, 0], [w, 0], [w, h], [0, h]]
  return points.map((p, i) => {
    let poly = box
    for (let j = 0; j < points.length && poly.length; j++) if (j !== i) poly = clip(poly, p, points[j])
    return poly
  })
}

function centroid(poly: Pt[]): Pt {
  let x = 0, y = 0
  for (const p of poly) { x += p[0]; y += p[1] }
  return poly.length ? [x / poly.length, y / poly.length] : [0, 0]
}

export function buildVoronoi(seed: number, count: number, w: number, h: number) {
  const r = rng(seed)
  let pts: Pt[] = Array.from({ length: count }, () => [r() * w, r() * h] as Pt)
  for (let k = 0; k < 2; k++) {
    // Lloyd relaxation → calmer, organic cells
    pts = cells(pts, w, h).map((c, i) => (c.length ? centroid(c) : pts[i]))
  }
  const polys = cells(pts, w, h)
  const edges: [number, number][] = []
  const seen = new Set<string>()
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => ({ j, d: (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    near.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) { seen.add(key); edges.push([i, j]) }
    })
  })
  return { pts, polys, edges }
}

type Props = {
  seed?: number
  count?: number
  width?: number
  height?: number
  accent?: number[] // indices of cells filled with accent
  dark?: number[] // indices filled with ink
  tone?: 'light' | 'night'
  pulses?: number // animated data pulses along edges
  nodes?: boolean
  plain?: boolean // outline only, no cell fills
  label?: string
  className?: string
}

export default function Voronoi({
  seed = 7, count = 30, width = 800, height = 800,
  accent = [], dark = [], tone = 'light', pulses = 0, nodes = true, plain = false, label, className,
}: Props) {
  const { pts, polys, edges } = buildVoronoi(seed, count, width, height)
  const line = tone === 'night' ? '#3a463b' : '#c3c1b6'
  const fillBase = plain ? 'none' : tone === 'night' ? '#171c17' : '#ecebe4'
  const nodeFill = tone === 'night' ? '#e9ece3' : '#141513'
  const accentFill = tone === 'night' ? '#6f9a7d' : '#3d5a47'
  const darkFill = tone === 'night' ? '#222a22' : '#141513'
  const pulsePaths = edges.slice(0, pulses).map(([a, b]) => `M${pts[a][0].toFixed(1)} ${pts[a][1].toFixed(1)} L${pts[b][0].toFixed(1)} ${pts[b][1].toFixed(1)}`)

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      {polys.map((poly, i) => {
        if (poly.length < 3) return null
        const fill = accent.includes(i) ? accentFill : dark.includes(i) ? darkFill : fillBase
        return (
          <polygon
            key={i}
            points={poly.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ')}
            fill={fill}
            stroke={line}
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
        )
      })}
      {nodes &&
        edges.map(([a, b], i) => (
          <line
            key={i}
            x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]}
            stroke={nodeFill} strokeWidth={0.9} opacity={0.55}
          />
        ))}
      {nodes &&
        pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i % 5 === 0 ? 4.2 : 2.6} fill={accent.includes(i) ? '#fff' : nodeFill} />
        ))}
      {pulsePaths.map((d, i) => (
        <circle
          key={i}
          r={3.4}
          fill={accentFill}
          style={{
            offsetPath: `path("${d}")`,
            animation: `pulse-path ${4 + (i % 4)}s linear ${i * 0.9}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}
