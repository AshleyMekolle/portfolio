import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/components.css'
import { site } from '@/data/site'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
  display: 'swap',
})
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const title = `${site.name} — AI, Automation & Software Engineer`
const description =
  'I build intelligent applications, backend systems and automated workflows. Selected work, architecture write-ups and case studies in applied AI, automation and software engineering.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  keywords: [
    'AI engineer', 'automation engineer', 'software engineer', 'backend developer', 'Python developer',
    'applied AI', 'n8n', 'FastAPI', 'Django', 'Laravel', 'Cameroon',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f5f4ef',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'AI, Automation & Software Engineer',
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Buea' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
