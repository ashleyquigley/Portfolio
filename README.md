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
├── main.tsx / App.tsx      Entry + page assembly, global ⌘K shortcut
├── index.css               Reset, focus states, view-transition rules
├── styles/tokens.css       Tokens: palette (light-dark()), type, spacing, motion
├── art/tiles.ts            Tile engine: shapes, palette, random + SVG export
├── hooks/                  useTheme (external store), usePointerFx, useReveal, useActiveSection
├── components/             Hero/HeroArt, Nav, ThemeToggle, CommandPalette, Cursor,
│                           Marquee, Stats, CaseStudies, Skills, HowIWork, PatternLab, Footer…
└── data/                   Copy lives here (caseStudies.ts, skills.ts)
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

## Technical notes

- **Light/dark**: tokens use CSS `light-dark()`; an inline script sets `data-theme` before first paint; the toggle animates via the View Transitions API (circular reveal).
- **Generative art**: patterns are arrays of `{shape, fg, bg, rot}` rendered as SVG and exportable (Pattern Lab).
- **Motion**: pointer tilt/spotlight write CSS variables directly (no re-renders); scroll-driven animations (`animation-timeline: view()`) for the tile divider; everything respects `prefers-reduced-motion`.
- **Accessibility**: native `<dialog>` + ARIA combobox for ⌘K, keyboard-operable lab, decorative layers `aria-hidden`.
