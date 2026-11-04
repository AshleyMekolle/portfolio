import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mekolle Ashley — AI, Automation & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#f5f4ef', color: '#171717', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 3, textTransform: 'uppercase', color: '#66655e' }}>
          <span>Mekolle Ashley</span>
          <span>AI · Automation · Software</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, lineHeight: 1.02, letterSpacing: -3, fontFamily: 'serif' }}>
          <span>I build intelligent systems</span>
          <span style={{ color: '#b4441c' }}>that do useful work.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#3b3a36' }}>
          Applied AI · Intelligent automation · Backend engineering
        </div>
      </div>
    ),
    size
  )
}
