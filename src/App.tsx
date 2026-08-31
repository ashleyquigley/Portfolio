import { CaseStudies } from './components/CaseStudies'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { TokenDemo } from './components/TokenDemo'

function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Hero />
      <TokenDemo />
      <CaseStudies />
      <HowIWork />
      <Footer />
    </>
  )
}

export default App
