import { Reveal } from './Reveal'
import styles from './HowIWork.module.css'

const points = [
  {
    emoji: '🤖',
    title: 'AI-assisted',
    body: "I use AI to help me write code, but I don't let it write code for me. I use it to generate ideas, find bugs, and speed up repetitive tasks, but I always review and understand the code before shipping it.",
  },
  {
    emoji: '🎨',
    title: 'Figma to production',
    body: "I can take a Figma design and turn it into a production-ready React component, with responsive styles, accessibility, and performance in mind. I can also work with designers to iterate on designs and provide feedback.",
  },
  {
    emoji: '♿',
    title: 'Accessibility as a default',
    body: 'I follow accessibility best practices and use tools like Lighthouse and axe to test my code. I also stay up to date with the latest accessibility guidelines and techniques, and I advocate for accessibility in my team and community.',
  },
  {
    emoji: '🧪',
    title: 'Small steps, then polish',
    body: "I follow a test-driven development approach, writing tests before code and refactoring as I go. I also use feature flags and A/B testing to ship small changes and gather feedback before investing in polish.",
  },
]

export function HowIWork() {
  return (
    <section className={styles.section} id="how-i-work" aria-labelledby="how-i-work-heading">
      <div className={styles.inner}>
        <span className={styles.sectionPill}>🐾 How I work</span>
        <h2 className={styles.heading} id="how-i-work-heading">
          How I'd work on your team
        </h2>
        <div className={styles.grid}>
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className={styles.revealCard}>
              <div className={styles.card}>
                <span className={styles.cardEmoji} aria-hidden="true">
                  {p.emoji}
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
