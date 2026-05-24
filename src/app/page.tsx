import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import { Skills, Experience, Resumes, About, Contact } from '@/components/Sections'
import ClientShell from '@/components/ClientShell'

export default function Home() {
  return (
    <ClientShell>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Skills />
        <Experience />
        <div className="divider" />
        <Resumes />
        <About />
        <Contact />
      </main>
    </ClientShell>
  )
}
