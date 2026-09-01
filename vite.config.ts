import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed as a GitHub Pages project site at https://<username>.github.io/Portfolio/
// GitHub Pages paths are case-sensitive — `base` must match the repo name's exact casing.
// If you rename the repo, update `base` to match: '/<repo-name>/'
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})
