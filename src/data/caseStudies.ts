export interface CaseStudy {
  id: string
  eyebrow: string
  title: string
  summary: string
  highlights: string[]
  tags: string[]
  image: {
    src: string
    alt: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'pricing-cards',
    eyebrow: 'Intuit · QuickBooks',
    title: 'Pricing components built for a monorepo, not a page',
    summary:
      "Built the pricing card components used across QuickBooks' APAC and Rest-of-World marketing sites as isolated, independently-versioned pieces inside a monorepo, rather than one-off page code. The same components rendered correctly across 18 sites, 10 languages and 7 currencies.",
    highlights: [
      'Modular component architecture — isolated, testable, independently versioned',
      'Shared across 18 sites in 10 languages and 7 currencies',
      'Reduced duplicate implementation work across regional teams',
    ],
    tags: ['React', 'TypeScript', 'Monorepo', 'Component Architecture', 'i18n'],
    image: {
      src: `${import.meta.env.BASE_URL}images/case-studies/quickbooks-pricing-cards.svg`,
      alt: 'Placeholder — screenshot of the QuickBooks pricing card components',
    },
  },
  {
    id: 'experimentation',
    eyebrow: 'Intuit · QuickBooks',
    title: 'Personalisation and experimentation, market by market',
    summary:
      "Led the conversion-rate-optimisation program: staged, market-by-market A/B tests, backed by analytics and session recordings to work out where people dropped off. Replacing a redirect-based checkout with an embedded, personalised sign-up flow lifted net-new subscriptions ~55% and cut ~6 seconds from the purchase journey.",
    highlights: [
      'Built the experimentation tooling, not just the tests that ran on it',
      'Net-new subscriptions up ~55%, average revenue per customer up ~26%',
      '~6 seconds cut from the purchase journey',
    ],
    tags: ['A/B Testing', 'Personalisation', 'Experimentation', 'Analytics'],
    image: {
      src: `${import.meta.env.BASE_URL}images/case-studies/quickbooks-experimentation.svg`,
      alt: 'Placeholder — screenshot of the QuickBooks experimentation program',
    },
  },
  {
    id: 'bespoke-to-scalable',
    eyebrow: 'Freelance · Digital Strategy Agency',
    title: 'From one bespoke build per client to a system clients could run themselves',
    summary:
      "The agency's model was a fully custom WordPress build for every client. I pitched replacing that with a reusable, configurable template system, then taught clients to customise their own sites through courses and live sessions I ran. Same underlying system, no more rebuilding from scratch each time.",
    highlights: [
      'Pitched and built the reusable, configurable template system',
      'Designed and ran the courses and live sessions that taught clients to self-serve',
      'Traded one-off build time for a scalable, repeatable model',
    ],
    tags: ['WordPress', 'Product Thinking', 'Systems Design', 'Client Enablement'],
    image: {
      src: `${import.meta.env.BASE_URL}images/case-studies/bespoke-to-scalable.svg`,
      alt: 'Placeholder — screenshot of the reusable template system',
    },
  },
]
