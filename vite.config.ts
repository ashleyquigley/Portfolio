import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed as a GitHub Pages project site at https://<username>.github.io/portfolio/
// If you rename the repo, update `base` to match: '/<repo-name>/'
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
