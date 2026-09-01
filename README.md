# Ashley Quigley — Portfolio

A single-page portfolio site: a hero, job history with nested case studies,
a skills accordion, a "how I'd work" section, and contact links. It's built
as working code — a real, running React app — rather than a static design
mockup.

## Structure

**Stack:** React 19 + TypeScript + Vite. No UI framework — styling is CSS
Modules reading from one shared design-token file.

```
src/
├── main.tsx              Entry point
├── App.tsx                Page assembly — imports and orders each section
├── index.css               Global reset, fonts, focus states
├── styles/
│   └── tokens.css          Design tokens: colour, type, spacing, radius, motion
├── components/
│   ├── Hero.tsx             Landing header
│   ├── CaseStudies.tsx      Job history — role/company header, then flexible content blocks per job
│   ├── Skills.tsx            Accordion of skill categories
│   ├── HowIWork.tsx          "How I'd work on your team" cards
│   ├── Footer.tsx             Contact links + photos
│   ├── Reveal.tsx             Scroll-triggered fade-in wrapper
│   └── PawAccent.tsx          Decorative floating paw-print accent
├── data/
│   ├── caseStudies.ts        Job history content — edit this, not the components, to change copy
│   └── skills.ts               Skill category content
└── hooks/
    └── useReveal.ts           IntersectionObserver hook powering Reveal

public/
├── favicon.svg
└── images/                  Case-study screenshots and photos
```

Content lives in `src/data/`, separate from the components that render it —
job history and skill sections can be edited or extended there without
touching any component code.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/Portfolio/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages at
`https://ashleyquigley.github.io/Portfolio/`.
