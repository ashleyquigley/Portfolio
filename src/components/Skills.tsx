import { useState } from 'react'
import { skillCategories } from '../data/skills'
import { Reveal } from './Reveal'
import styles from './Skills.module.css'

export function Skills() {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(skillCategories.map((category) => category.id)),
  )

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-heading">
      <div className={styles.inner}>
        <span className={styles.sectionPill}>🧰 Languages & Tools</span>
        <h2 className={styles.heading} id="skills-heading">
          What I build with
        </h2>

        <div className={styles.list}>
          {skillCategories.map((category, i) => {
            const isOpen = openIds.has(category.id)
            return (
              <Reveal key={category.id} delay={i * 60}>
                <div className={styles.row} data-open={isOpen}>
                  <button
                    type="button"
                    className={styles.rowButton}
                    aria-expanded={isOpen}
                    aria-controls={`skill-panel-${category.id}`}
                    id={`skill-trigger-${category.id}`}
                    onClick={() => toggle(category.id)}
                  >
                    <span className={styles.rowLabel}>
                      <span aria-hidden="true">{category.emoji}</span> {category.title}
                    </span>
                    <span className={styles.chevron} aria-hidden="true">
                      ⌄
                    </span>
                  </button>
                  <div
                    className={styles.panelWrap}
                    id={`skill-panel-${category.id}`}
                    role="region"
                    aria-labelledby={`skill-trigger-${category.id}`}
                  >
                    <div className={styles.panelInner}>
                      <ul className={styles.chips}>
                        {category.items.map((item) => (
                          <li className={styles.chip} key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
