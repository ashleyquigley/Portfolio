import styles from './HowIWork.module.css'

const points = [
  {
    title: 'AI-assisted, every day',
    body: "This page was built working with Claude — I wrote the content and made the calls on structure, tone and what to cut; it helped move faster on the boilerplate. Same habit I'd bring to Cursor and Claude on your stack: use the tool for speed, keep the judgment.",
  },
  {
    title: 'Figma to production, both directions',
    body: "I work from Figma files directly and I push back in them too — flagging a spacing inconsistency or a state a design missed before it ships, not after.",
  },
  {
    title: 'Accessibility as a default, not a pass',
    body: 'Every interactive element on this page has a visible focus state and works from a keyboard. Reduced-motion preferences are respected. Semantic markup over div soup.',
  },
  {
    title: 'Small steps, then polish',
    body: "The QuickBooks experimentation program ran market by market, not all at once — ship a narrow version, watch what happens, adjust. I'd rather ship three small changes I can measure than one big one I can't.",
  },
]

export function HowIWork() {
  return (
    <section className={styles.section} id="how-i-work" aria-labelledby="how-i-work-heading">
      <div className={styles.inner}>
        <h2 className={styles.heading} id="how-i-work-heading">
          How I'd work on your team
        </h2>
        <div className={styles.grid}>
          {points.map((p) => (
            <div className={styles.card} key={p.title}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
