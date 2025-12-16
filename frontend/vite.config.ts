import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(() => {
  const env = loadEnv('', process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: +env.PORT || 8000,
    },
    preview: {
      port: +env.PORT || 8000,
    },
  }
})
