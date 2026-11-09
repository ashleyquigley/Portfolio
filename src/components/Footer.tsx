import { MagneticLink } from './MagneticLink'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import styles from './Footer.module.css'

const BASE = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <SectionHead
          index="05"
          label="Say hi"
          id="contact-heading"
          title="Let's talk."
          body="I'm currently open to new opportunities. If you want to work together, have a question, or just want to say hi, my inbox is always open."
        />

        <Reveal>
          <div className={styles.card}>
            <div className={styles.links}>
              <MagneticLink className={styles.link} href="mailto:ashleyquigley14@gmail.com" data-cursor="Email">
                ashleyquigley14@gmail.com <span aria-hidden="true">↗</span>
              </MagneticLink>
              <div className={styles.secondary}>
                <MagneticLink
                  className={styles.linkSecondary}
                  href="https://www.linkedin.com/in/ashquigs/"
                  target="_blank"
                  rel="noreferrer"
                  strength={0.5}
                >
                  LinkedIn
                </MagneticLink>
                <MagneticLink
                  className={styles.linkSecondary}
                  href="https://github.com/ashleyquigley/Portfolio"
                  target="_blank"
                  rel="noreferrer"
                  strength={0.5}
                >
                  GitHub
                </MagneticLink>
              </div>
            </div>

            <div className={styles.pets}>
              <figure className={styles.petCard}>
                <img
                  className={styles.petImg}
                  src={`${BASE}images/pets/rocco.png`}
                  alt="A guide dog Ashley trained"
                  loading="lazy"
                />
                <figcaption className={styles.petCaption}>The first guide dog I trained</figcaption>
              </figure>
              <figure className={styles.petCard}>
                <img
                  className={styles.petImg}
                  src={`${BASE}images/pets/maisie.JPG`}
                  alt="Ashley's foster-fail cat"
                  loading="lazy"
                />
                <figcaption className={styles.petCaption}>My foster fail</figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        <p className={styles.meta}>
          Designed &amp; built by hand with React, TypeScript and Vite — no UI or animation libraries. Try{' '}
          <kbd>⌘ K</kbd>, the theme toggle, and the Pattern Lab.
        </p>
      </div>
    </footer>
  )
}
