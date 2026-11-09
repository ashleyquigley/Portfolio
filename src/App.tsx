import { useEffect, useState } from 'react'
import { CaseStudies } from './components/CaseStudies'
import { CommandPalette } from './components/CommandPalette'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { PatternLab } from './components/PatternLab'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { TileDivider } from './components/TileDivider'

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  // ⌘K / Ctrl+K toggles the command menu from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <ScrollProgress />
      <Cursor />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <CaseStudies />
        <TileDivider />
        <Skills />
        <HowIWork />
        <PatternLab />
      </main>
      <Footer />
    </>
  )
}

export default App
