import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

function buildSha(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return process.env.SOURCE_VERSION?.slice(0, 7) ?? 'dev'
  }
}

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha()),
  },
  // Removed `define: { 'process.env': process.env }`: it could inline every build-time env var
  // into the bundle. Client env goes through import.meta.env.VITE_* only.
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  }
})
