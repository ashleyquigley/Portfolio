import { PawAccent } from './PawAccent'
import { Reveal } from './Reveal'
import styles from './Footer.module.css'

const BASE = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className={styles.section} id="contact" aria-labelledby="contact-heading">
      <PawAccent size={40} top="6%" left="8%" rotate={-16} />
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.card}>
            <div>
              <span className={styles.sectionPill}>👋 Say hi</span>
              <h2 className={styles.heading} id="contact-heading">
                Let's talk
              </h2>
              <p className={styles.body}>
                I'm currently open to new opportunities. If you want to work together, have a question, or just want to say hi, my inbox is always open.
              </p>
              <div className={styles.links}>
                <a className={styles.link} href="mailto:ashleyquigley14@gmail.com">
                  📧 Email
                </a>
                <a
                  className={styles.linkSecondary}
                  href="https://www.linkedin.com/in/ashquigs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className={styles.linkSecondary}
                  href="https://github.com/ashleyquigley/Portfolio"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className={styles.pets}>
              <div className={styles.petCard}>
                <img
                  className={styles.petImg}
                  src={`${BASE}images/pets/rocco.png`}
                  alt="Placeholder — photo of the guide dog Ashley trained"
                />
                <p className={styles.petCaption}>My first guide dog I trained 🐾</p>
              </div>
              <div className={styles.petCard}>
                <img
                  className={styles.petImg}
                  src={`${BASE}images/pets/maisie.JPG`}
                  alt="Placeholder — photo of Ashley's foster cat"
                />
                <p className={styles.petCaption}>My foster fail 🐱</p>
              </div>
            </div>
          </div>
        </Reveal>

        <p className={styles.meta}>Built with React, TypeScript and Vite. Source on GitHub.</p>
      </div>
    </footer>
  )
}
