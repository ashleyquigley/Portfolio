import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import styles from './HowIWork.module.css'

const points = [
  {
    title: 'AI-assisted',
    body: "I use AI to help me write code, but I don't let it write code for me. I use it to generate ideas, find bugs, and speed up repetitive tasks, but I always review and understand the code before shipping it.",
  },
  {
    title: 'Figma to production',
    body: "I can take a Figma design and turn it into a production-ready React component, with responsive styles, accessibility, and performance in mind. I can also work with designers to iterate on designs and provide feedback.",
  },
  {
    title: 'Accessibility as a default',
    body: 'I follow accessibility best practices and use tools like Lighthouse and axe to test my code. I also stay up to date with the latest accessibility guidelines and techniques, and I advocate for accessibility in my team and community.',
  },
  {
    title: 'Small steps, then polish',
    body: "I follow a test-driven development approach, writing tests before code and refactoring as I go. I also use feature flags and A/B testing to ship small changes and gather feedback before investing in polish.",
  },
]

const TONES = ['red', 'blue', 'amber', 'ink'] as const

export function HowIWork() {
  return (
    <section className={styles.section} id="how-i-work" aria-labelledby="how-i-work-heading">
      <div className={styles.inner}>
        <SectionHead index="03" label="How I work" id="how-i-work-heading" title="How I'd work on your team." />
        <div className={styles.grid}>
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className={styles.revealCard}>
              <div className={styles.card} data-tone={TONES[i % TONES.length]}>
                <span className={styles.shape} aria-hidden="true" />
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
