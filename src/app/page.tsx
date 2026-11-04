import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import { About, Contact, Experience, Expertise, Footer } from '@/components/Sections'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
