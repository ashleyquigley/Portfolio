import { PawAccent } from './PawAccent'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.card}>
        <PawAccent size={44} color="var(--color-pink-pop)" top="6%" right="4%" rotate={18} />
        <PawAccent size={28} color="var(--color-lilac)" bottom="8%" left="3%" rotate={-24} delay={800} />

        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Frontend Software Engineer</span>
          <h1 className={styles.title}>
            Hello, I'm Ashley
          </h1>

          <ul className={styles.bullets}>
            <li>
              🚀 <strong>10+ years</strong> of experience shipping web applications
            </li>
            <li>
              🌏 <strong>Timezone ninja</strong> - experience collaborating async with teams around the world
            </li>
            <li>
              📈 <strong>Eye for growth</strong> and the need to build for scale
            </li>
          </ul>

          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href="#work">
              See the work <span aria-hidden="true">👇</span>
            </a>
          </div>

          <div className={styles.badges}>
            <a className={styles.badge} href="mailto:ashleyquigley14@gmail.com">
              📧 ashleyquigley14@gmail.com
            </a>
            <a
              className={styles.badge}
              href="https://www.linkedin.com/in/ashquigs/"
              target="_blank"
              rel="noreferrer"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.visualCol}>
          <div className={styles.phone} aria-hidden="true">
            <div className={styles.phoneNotch} />
            <div className={styles.phoneStatus}>9:41</div>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneAvatar}>AQ</div>
              <p className={styles.phoneName}>Ashley Quigley</p>
              <div className={styles.phoneTabs}>
                <span className={styles.phoneTabActive}>Work</span>
                <span className={styles.phoneTab}>Skills</span>
                <span className={styles.phoneTab}>Contact</span>
              </div>
              <div className={styles.phoneCard}>
                <div>
                  <p className={styles.phoneCardTitle}>QuickBooks experimentation</p>
                  <p className={styles.phoneCardMeta}>Intuit · APAC</p>
                </div>
                <span className={styles.phonePill}>+55%</span>
              </div>
              <div className={styles.phoneCard}>
                <div>
                  <p className={styles.phoneCardTitle}>Pricing components</p>
                  <p className={styles.phoneCardMeta}>18 sites · 10 languages</p>
                </div>
                <span className={styles.phonePill}>Shipped</span>
              </div>
              <div className={styles.phoneCard}>
                <div>
                  <p className={styles.phoneCardTitle}>Template system</p>
                  <p className={styles.phoneCardMeta}>Freelance agency</p>
                </div>
                <span className={styles.phonePill}>Scaled</span>
              </div>
            </div>
            <div className={styles.phoneHomeBar} />
          </div>
        </div>
      </div>
    </header>
  )
}
