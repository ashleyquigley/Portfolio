import { CaseStudies } from './components/CaseStudies'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { Skills } from './components/Skills'

function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Hero />
      <CaseStudies />
      <Skills />
      <HowIWork />
      <Footer />
    </>
  )
}

export default App
