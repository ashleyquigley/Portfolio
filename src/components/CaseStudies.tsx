import { jobHistory } from '../data/caseStudies'
import { usePointerFx } from '../hooks/usePointerFx'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import styles from './CaseStudies.module.css'

const TONES = ['red', 'blue', 'amber'] as const

/** Screenshot frame: tilts in 3D toward the cursor with a moving spotlight (see usePointerFx). */
function Media({ src, alt }: { src: string; alt: string }) {
  const ref = usePointerFx<HTMLDivElement>({ tilt: 5 })
  return (
    <div className={styles.media}>
      <div ref={ref} className={styles.frame}>
        <img className={styles.mediaImg} src={src} alt={alt} loading="lazy" />
        <span className={styles.spotlight} aria-hidden="true" />
      </div>
    </div>
  )
}

export function CaseStudies() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={styles.inner}>
        <SectionHead
          index="01"
          label="Work"
          id="work-heading"
          title="Meaningful impact."
          body="Over the years I've progressed from a WordPress web developer to a lead developer to a senior software engineer. I've mainly worked in marketing, collaborating closely with designers, product managers, and other engineers."
        />

        <div className={styles.grid}>
          {jobHistory.map((job, i) => {
            const sections = [
              { key: 'overview', label: 'Overview', data: job.overview },
              { key: 'project', label: 'Featured project', data: job.project },
            ]

            return (
              <Reveal key={job.id}>
                <article className={styles.card} data-tone={TONES[i % TONES.length]}>
                  <div className={styles.jobHeader}>
                    <span className={styles.jobIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
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
                      <p className={styles.projectDivider}>{section.label}</p>

                      <div className={styles.projectSplit} data-reverse={i % 2 === 1}>
                        <Media src={section.data.image.src} alt={section.data.image.alt} />
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
                                    <span className={styles.highlightMark} aria-hidden="true" />
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
