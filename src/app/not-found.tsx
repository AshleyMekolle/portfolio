import Link from 'next/link'
import Nav from '@/components/Nav'
import { Footer } from '@/components/Sections'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="wrap" style={{ padding: '160px var(--gutter) 120px' }}>
        <p className="mono eyebrow">404</p>
        <h1 className="display-l">That page isn’t part of the system.</h1>
        <p className="lead" style={{ margin: '24px 0 32px' }}>It may have moved, or the link may be mistyped.</p>
        <Link className="btn btn--solid" href="/">Back to the portfolio <span className="arrow" aria-hidden="true">→</span></Link>
      </main>
      <Footer />
    </>
  )
}
