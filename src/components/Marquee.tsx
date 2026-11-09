import { skillCategories } from '../data/skills'
import styles from './Marquee.module.css'

const SHAPES = ['◐', '●', '◑', '■', '◒']

const ROW_A = skillCategories.slice(0, 3).flatMap((c) => c.items)
const ROW_B = skillCategories.slice(2).flatMap((c) => c.items)

/** One seamless loop: the list is rendered twice and the track slides by exactly -50%. */
function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={styles.row} data-reverse={reverse}>
      <ul className={styles.track}>
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <li key={`${copy}-${i}`} aria-hidden={copy === 1}>
              <span className={styles.item}>{item}</span>
              <span className={styles.sep} aria-hidden="true">
                {SHAPES[i % SHAPES.length]}
              </span>
            </li>
          )),
        )}
      </ul>
    </div>
  )
}

export function Marquee() {
  return (
    <section className={styles.marquee} aria-label="Skills and tools">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </section>
  )
}
