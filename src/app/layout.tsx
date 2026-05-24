import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Ashley Mekolle — Software Engineer',
  description: 'Full-Stack, Mobile, AI & Automation. Final-year Software Engineering student graduating December 2026.',
  openGraph: {
    title: 'Ashley Mekolle — Software Engineer',
    description: 'Full-Stack, Mobile, AI & Automation. Graduating December 2026.',
    url: 'https://ashleymekolle.vercel.app',
    siteName: 'Ashley Mekolle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashley Mekolle — Software Engineer',
    description: 'Full-Stack, Mobile, AI & Automation.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
