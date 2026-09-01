export interface SkillCategory {
  id: string
  emoji: string
  title: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    emoji: '💻',
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS'],
  },
  {
    id: 'frameworks',
    emoji: '⚛️',
    title: 'Frameworks & Libraries',
    items: ['React', 'Node.js', 'Express', 'Angular'],
  },
  {
    id: 'architecture',
    emoji: '🏗️',
    title: 'Frontend Architecture',
    items: [
      'Scalable component & content platforms',
      'Design systems',
      'Design patterns',
      'Responsive design',
      'Internationalisation (i18n)',
    ],
  },
  {
    id: 'performance',
    emoji: '⚡',
    title: 'Performance & Quality',
    items: [
      'Frontend performance optimisation',
      'Core Web Vitals',
      'A/B testing & experimentation',
      'Accessibility',
    ],
  },
  {
    id: 'tooling',
    emoji: '🛠️',
    title: 'Tooling & Practices',
    items: [
      'Git',
      'JIRA',
      'REST APIs',
      'CI/CD & release management',
      'Google Analytics & Tag Manager',
      'WordPress (CMS)',
    ],
  },
]
