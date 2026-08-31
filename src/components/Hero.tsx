import styles from './Hero.module.css'

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>🐾 Built for the Fetch Front-end Engineer role</span>
        <h1 className={styles.title}>Ashley Quigley — frontend engineer who ships the craft, not just the ticket</h1>
        <p className={styles.subtitle}>
          I build React and TypeScript interfaces with an eye for the last 10% — spacing, motion,
          and the details that make something feel done. This page is a working example: the
          tokens, components and interactions on it are real code, not a mockup.
        </p>
        <div className={styles.actions}>
          <a className={styles.ctaPrimary} href="#work">
            See the work ↓
          </a>
          <a className={styles.ctaSecondary} href="mailto:ashleyquigley14@gmail.com">
            Email me
          </a>
          <a
            className={styles.ctaSecondary}
            href="https://www.linkedin.com/in/ashquigs/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>10+ yrs</div>
            <div className={styles.statLabel}>shipping production frontend</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>18 sites</div>
            <div className={styles.statLabel}>10 languages, 7 currencies, one component system</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>~55%</div>
            <div className={styles.statLabel}>lift in net-new subscriptions from one redesigned flow</div>
          </div>
        </div>
      </div>
    </header>
  )
}
