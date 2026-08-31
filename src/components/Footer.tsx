import styles from './Footer.module.css'

const BASE = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div>
            <h2 className={styles.heading} id="contact-heading">
              Let's talk
            </h2>
            <p className={styles.body}>
              Sydney-based, hybrid-ready. Happy to walk through any of the work above in more
              detail, or take a crack at something specific to Fetch.
            </p>
            <div className={styles.links}>
              <a className={styles.link} href="mailto:ashleyquigley14@gmail.com">
                Email
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
                href="https://github.com/ashquigs"
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
                src={`${BASE}images/pets/guide-dog.svg`}
                alt="Placeholder — photo of the guide dog Ashley trained"
              />
              <p className={styles.petCaption}>A guide dog I trained 🐾</p>
            </div>
            <div className={styles.petCard}>
              <img
                className={styles.petImg}
                src={`${BASE}images/pets/foster-cat.svg`}
                alt="Placeholder — photo of Ashley's foster cat"
              />
              <p className={styles.petCaption}>My current foster cat 🐱</p>
            </div>
          </div>
        </div>

        <p className={styles.meta}>Built with React, TypeScript and Vite. Source on GitHub.</p>
      </div>
    </footer>
  )
}
