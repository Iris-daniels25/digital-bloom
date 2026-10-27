import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const codespacePreviewHosts =
  process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? [5173, 5174].map(
        (port) => `${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
      )
    : []

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    allowedHosts: codespacePreviewHosts,
  },
})
