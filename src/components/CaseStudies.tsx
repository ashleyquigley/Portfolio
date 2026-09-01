import { jobHistory } from '../data/caseStudies'
import { PawAccent } from './PawAccent'
import { Reveal } from './Reveal'
import styles from './CaseStudies.module.css'

export function CaseStudies() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={styles.inner}>
        <span className={styles.sectionPill}>💼  My work</span>
        <h2 className={styles.heading} id="work-heading">
          Meaningful Impact
        </h2>
        <p className={styles.body}>
          Over the years I've progressed from a WordPress web developer to a lead developer to a senior software engineer. 
          I've mainly worked in marketing collborating closely with designers, product managers, and other engineers.
        </p>

        <div className={styles.grid}>
          {jobHistory.map((job, i) => {
            const sections = [
              { key: 'overview', emoji: '🗂️', label: 'Overview', data: job.overview },
              { key: 'project', emoji: '🐾', label: 'Featured project', data: job.project },
            ]

            return (
              <Reveal key={job.id} delay={i * 80}>
                <article className={styles.card}>
                  <div className={styles.jobHeader}>
                    <div className={styles.jobHeaderTop}>
                      <div className={styles.jobHeaderMain}>
                        <h3 className={styles.jobRole}>{job.role}</h3>
                        <p className={styles.jobCompany}>
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span className={styles.jobDates}>{job.dates}</span>
                    </div>
                    <p className={styles.jobBlurb}>{job.companyBlurb}</p>
                  </div>

                  {sections.map((section) => (
                    <div key={section.key}>
                      <p className={styles.projectDivider}>
                        <span aria-hidden="true">{section.emoji}</span> {section.label}
                      </p>

                      <div className={styles.projectSplit} data-reverse={i % 2 === 1}>
                        <div className={styles.media}>
                          <PawAccent size={36} color="var(--color-surface)" top="8%" right="10%" rotate={12} />
                          <img className={styles.mediaImg} src={section.data.image.src} alt={section.data.image.alt} />
                        </div>
                        <div className={styles.content}>
                          {section.data.title && <h4 className={styles.title}>{section.data.title}</h4>}
                          {section.data.link && (
                            <a
                              className={styles.link}
                              href={section.data.link.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {section.data.link.label ?? 'Visit site'} <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {section.data.blocks.map((block, bi) =>
                            block.list ? (
                              <ul className={styles.highlights} key={`${section.key}-block-${bi}`}>
                                {block.list.map((h, hi) => (
                                  <li className={styles.highlight} key={`${section.key}-block-${bi}-${hi}`}>
                                    <span className={styles.highlightMark} aria-hidden="true">
                                      ✅
                                    </span>
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className={styles.field} key={`${section.key}-block-${bi}`}>
                                {block.heading && <p className={styles.fieldLabel}>{block.heading}</p>}
                                {block.body && <p className={styles.summary}>{block.body}</p>}
                              </div>
                            ),
                          )}
                          {section.data.tags && section.data.tags.length > 0 && (
                            <div className={styles.tags}>
                              {section.data.tags.map((tag, ti) => (
                                <span className={styles.tag} key={`${section.key}-tag-${ti}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
