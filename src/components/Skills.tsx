import { useState } from 'react'
import { skillCategories } from '../data/skills'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import styles from './Skills.module.css'

const TONES = ['red', 'blue', 'amber', 'ink', 'red'] as const

export function Skills() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([skillCategories[0].id]))

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-heading">
      <div className={styles.inner}>
        <SectionHead index="02" label="Languages & tools" id="skills-heading" title="What I build with." />

        <div className={styles.list}>
          {skillCategories.map((category, i) => {
            const isOpen = openIds.has(category.id)
            return (
              <Reveal key={category.id} delay={i * 60}>
                <div className={styles.row} data-open={isOpen} data-tone={TONES[i % TONES.length]}>
                  <button
                    type="button"
                    className={styles.rowButton}
                    aria-expanded={isOpen}
                    aria-controls={`skill-panel-${category.id}`}
                    id={`skill-trigger-${category.id}`}
                    onClick={() => toggle(category.id)}
                  >
                    <span className={styles.rowIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.rowLabel}>{category.title}</span>
                    <span className={styles.rowCount} aria-hidden="true">
                      {category.items.length}
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                  </button>
                  <div
                    className={styles.panelWrap}
                    id={`skill-panel-${category.id}`}
                    role="region"
                    aria-labelledby={`skill-trigger-${category.id}`}
                  >
                    <div className={styles.panelInner}>
                      <ul className={styles.chips}>
                        {category.items.map((item, ci) => (
                          <li className={styles.chip} key={item} style={{ '--n': ci } as React.CSSProperties}>
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
