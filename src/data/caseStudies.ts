export interface JobHistoryContentBlock {
  /** Optional label above the block, e.g. "Background". Omit for no heading. */
  heading?: string
  /** Optional paragraph text. */
  body?: string
  /** Optional bullet list — renders as its own 🐾 list when present. */
  list?: string[]
}

interface JobHistorySection {
  /** Optional heading for the whole section. Omit and no title renders. */
  title?: string
  blocks: JobHistoryContentBlock[]
  tags?: string[]
  /** Optional link to the live site/project. Omit and no link renders. */
  link?: {
    href: string
    /** Defaults to "Visit site" if omitted. */
    label?: string
  }
  image: {
    src: string
    alt: string
  }
}

export interface JobHistoryEntry {
  id: string
  role: string
  company: string
  location: string
  dates: string
  companyBlurb: string
  overview: JobHistorySection
  project: JobHistorySection
}

export const jobHistory: JobHistoryEntry[] = [
  {
    id: 'quickbooks',
    role: 'Senior Software Engineer',
    company: 'Intuit (QuickBooks)',
    location: 'Sydney, AU',
    dates: '2022 – 2026',
    companyBlurb:
      'Managed the QuickBooks APAC and Rest-of-World marketing sites and sign-up experience. That included 18 sites in 10 languages using 7 currencies across 150+ countries to bring in 7 million customers globally.',
    overview: {
      blocks: [
        {
          body: 'I worked in a team of 3 where I reported to the engineering manager. This role sat within the marketing org and was responsible for new customer acquisition through the sign-up experience. My primary stakeholders were the design and marketing teams.',
        },
        {
          heading: 'Biggest Hurdle',
          body: 'Rolling out changes happened across multiple markets and languages. Tech debt would increase exponentially if a campaign was not planned and executed in a way that was scalable and maintainable.',
        },
        {
          heading: "What I Learned",
          body: 'To avoid accumulating unneccessary tech debt I collaborated closely with design and marketing during campaign conception. I prioritised building architecture that was scalable and maintainable, and avoided one-off solutions that would only work for a single market where possible.',
        },
        {
          list: [
            'My primary focus was on the embedded sign-up component and architecture.',
            'I regularly consulted with the design and marketing teams to ensure proposed features met business needs while remaining scalable and maintainable.',
            'I managed an external team of 5 developers in the UK, assigned asynchronous tasks, and peer reviewed and upskilled team members.',
          ],
        },
      ],
      image: {
        src: `${import.meta.env.BASE_URL}images/case-studies/quickbooks-overview.png`,
        alt: 'Placeholder — screenshot to accompany the QuickBooks role overview',
      },
    },
    project: {
      title: 'Replaced flag-driven with composable pricing component built to scale across markets',
      link: { href: 'https://quickbooks.intuit.com/au/pricing/', label: 'Check it out' },
      blocks: [
        {
          heading: 'Background',
          body: "One centralised pricing component was used between international teams. The existing setup was one shared component with each market adding conditional flags to change text or subcomponent behavior. Meaning a change in one market could silently break another's cards, since no single team could see how every market was using the flags.",
        },
        {
          heading: 'Solution',
          body: "I separated the shared sign-up logic from the market-specific presentation creating a base component which owns the shared logic, and each market composes its own subcomponents into it rather than branching on flags inside a shared implementation. Devs could reorder subcomponents or set text declaratively, without touching the underlying logic.",
        },
        {
          list: [
            "Replaced a flag-driven shared component with a composable one: a base component for shared logic, market-owned subcomponents for local presentation",
            "Removed cross-market regression risk — a change in one market's cards can no longer break another's",
            'Gave markets a declarative way to reorder and configure subcomponents, no code changes required for layout or copy updates',
          ],
        },
      ],
      tags: ['React', 'TypeScript', 'Component Architecture', 'Monorepo', 'Design Systems'],
      image: {
        src: `${import.meta.env.BASE_URL}images/case-studies/quickbooks-pricing-cards.svg`,
        alt: 'Placeholder — screenshot of the QuickBooks pricing card architecture',
      },
    },
  },
  {
    id: 'freelance',
    role: 'Lead Developer',
    company: 'Whitney Bateson Digital Strategy',
    location: 'Remote',
    dates: '2019 – 2022',
    companyBlurb:
      'Delivered bespoke WordPress sites for clients in the health and wellness space. This was a full service agency responsible for building new sites and migrating existing sites. We focused on design, content strategy, and SEO to help clients grow their businesses.',
    overview: {
      blocks: [
        {
          body: 'I came into this role as a lead developer to implement process and architectural improvements to help the business grow. I was responsible for client scoping, website build strategy and upskilling the small team of developers.',
        },
        {
          heading: 'Biggest Hurdle',
          body: 'The biggest challenge was scaling our development process to meet the demands of growing client needs while maintaining quality and consistency. We needed to find a way to deliver high-quality websites efficiently without sacrificing the unique needs of each client.',
        },
        {
          heading: "What I Learned",
          body: 'Implementing a reusable, configurable template system, we could streamline our development process and empower clients to manage their own sites. This allowed us to focus on delivering high-quality work while also providing clients with the tools they needed to succeed.',
        },
        {
          list: ['Upskilled the small team of developers to improve efficiency and quality', 'Collaborated closely with designers and content strategists to ensure each site met client needs'],
        },
      ],
      image: {
        src: `${import.meta.env.BASE_URL}images/case-studies/whitney-bateson-overview.jpg`,
        alt: 'Placeholder — screenshot to accompany the freelance role overview',
      },
    },
    project: {
      title: 'From one bespoke build per client to a system clients could run themselves',
      link: { href: 'https://whitneybateson.com/waitlist/', label: 'Check it out' },
      blocks: [
        {
          heading: 'Background',
          body: "Each site was a one-off build, which meant we were constantly reinventing the wheel and spending a lot of time on repetitive tasks. This was not scalable and made it difficult to grow the business.",
        },
        {
          heading: 'Solution',
          body: 'I pitched replacing the bespoke build model with a reusable, configurable template system. This allowed us to create a set of templates that could be easily customized for each client, reducing development time and allowing clients to manage their own sites.',
        },
        {
          list: [
            'Replaced bespoke build model with a reusable, configurable template system',
            'Empowered clients to manage their own sites, reducing the need for ongoing support and maintenance',
            'Streamlined development process, allowing us to focus on delivering high-quality work and growing the business',
          ],
        },
      ],
      tags: ['WordPress', 'JavaScript', 'Web Development', 'Design Systems'],
      image: {
        src: `${import.meta.env.BASE_URL}images/case-studies/whitney-bateson-project-2.png`,
        alt: 'Placeholder — screenshot of the reusable template system',
      },
    },
  },
]
