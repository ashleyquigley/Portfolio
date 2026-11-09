import { useEffect, useState } from 'react'
import { HeroArt } from './HeroArt'
import { SplitText } from './SplitText'
import styles from './Hero.module.css'

const WORDS = ['scalable', 'accessible', 'fast', 'playful']

/** Cycles a word on a timer; the animated copy is hidden from AT and a static list is read instead. */
function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <span className="visually-hidden">{WORDS.slice(0, -1).join(', ')} and {WORDS.at(-1)}</span>
      <span className={styles.rotator} aria-hidden="true">
        <span className={styles.rotatorWord} key={WORDS[i]}>
          {WORDS[i]}
        </span>
      </span>
    </>
  )
}

export function Hero() {
  return (
    <header className={styles.hero} id="top">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            Frontend Software Engineer · Open to work
          </p>

          <h1 className={styles.title}>
            <SplitText text="Ashley" />
            <br />
            <SplitText text="Quigley" baseDelay={6} />
          </h1>

          <p className={styles.lede}>
            I build interfaces that are <RotatingWord /> — and take the time to make them a little bit
            beautiful.
          </p>

          <ul className={styles.facts}>
            <li>
              <span className={styles.factKey}>10+ yrs</span>
              <span>shipping web applications</span>
            </li>
            <li>
              <span className={styles.factKey}>Async</span>
              <span>collaborating with teams around the world</span>
            </li>
            <li>
              <span className={styles.factKey}>Scale</span>
              <span>an eye for growth and building to last</span>
            </li>
          </ul>

          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href="#work">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.ctaGhost} href="mailto:ashleyquigley14@gmail.com">
              Say hello
            </a>
          </div>
        </div>

        <div className={styles.artCol}>
          <HeroArt />
        </div>
      </div>
    </header>
  )
}
