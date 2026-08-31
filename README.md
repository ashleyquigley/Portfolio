# Ashley Quigley — Portfolio

A single-page portfolio built for the Fetch Front-end Engineer application:
a hero, a live component built from design tokens, three case studies
mapped to the job post, a "how I'd work" section, and contact links.

## Before you publish

1. **Replace the placeholders.** The pet photos and case-study screenshots
   are placeholder SVGs so the layout is easy to check before real images
   go in:
   - `public/images/pets/guide-dog.svg` → your guide-dog photo
   - `public/images/pets/foster-cat.svg` → your foster-cat photo
   - `public/images/case-studies/*.svg` → real screenshots for each case
     study

   Keep the same filenames (swap the file, or update the `src` in
   `src/data/caseStudies.ts` and `src/components/Footer.tsx` if you rename
   them). JPG or PNG work fine — just update the extension in both places.

2. **Check the GitHub link.** `src/components/Footer.tsx` currently points
   to `github.com/ashquigs` — confirm that's your actual GitHub username
   before publishing.

3. **Decide on the easter egg.** We talked about adding something built
   specifically for Fetch (per their "bonus points" application note) —
   still open, pick a spot once the rest looks right to you.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/portfolio/`.

## Deploying to GitHub Pages

This repo is set up to deploy automatically via GitHub Actions
(`.github/workflows/deploy.yml`) every time you push to `main`.

1. In GitHub Desktop, publish this repository to your account as
   **`portfolio`** (Settings → Options → Repository name should read
   `portfolio` to match `vite.config.ts`'s `base: '/portfolio/'` — if you
   name it something else, update that line to match).
2. On GitHub.com, go to the repo's **Settings → Pages** and set
   **Source** to **GitHub Actions** (one-time setup).
3. Push to `main` (or commit + sync in GitHub Desktop). The Actions tab
   will show the build running; once it's green, the site is live at:

   `https://<your-username>.github.io/portfolio/`

## Project structure

```
src/
├── components/     One component per section (Hero, TokenDemo, CaseStudies, HowIWork, Footer)
├── data/           caseStudies.ts — edit this to change case-study content without touching UI code
├── styles/         tokens.css — colour, type, spacing and radius tokens used everywhere
├── App.tsx         Page assembly
└── main.tsx        Entry point
```

## Stack

React 19, TypeScript, Vite. No UI framework — CSS Modules reading from
`src/styles/tokens.css`, matching the "components, tokens, accessibility
patterns" design-system language from the job post.
