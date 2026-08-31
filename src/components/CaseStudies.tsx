import { caseStudies } from '../data/caseStudies'
import styles from './CaseStudies.module.css'

export function CaseStudies() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={styles.inner}>
        <h2 className={styles.heading} id="work-heading">
          Work that maps to this role
        </h2>
        <p className={styles.body}>
          Three projects, picked because each one is the same tension Fetch is hiring for:
          building something that scales without losing the polish of something built by hand.
        </p>

        <div className={styles.grid}>
          {caseStudies.map((study, i) => (
            <article className={styles.card} data-reverse={i % 2 === 1} key={study.id}>
              <div className={styles.media}>
                <img className={styles.mediaImg} src={study.image.src} alt={study.image.alt} />
              </div>
              <div className={styles.content}>
                <p className={styles.eyebrow}>{study.eyebrow}</p>
                <h3 className={styles.title}>{study.title}</h3>
                <p className={styles.summary}>{study.summary}</p>
                <ul className={styles.highlights}>
                  {study.highlights.map((h) => (
                    <li className={styles.highlight} key={h}>
                      <span className={styles.highlightMark} aria-hidden="true">
                        →
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.tags}>
                  {study.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
