import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

function buildSha(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return process.env.SOURCE_VERSION?.slice(0, 7) ?? 'dev'
  }
}

// Production security headers live in vercel.json. `vite preview` serves the same set so CSP
// problems show up in the browser console before a deploy.
type HeaderRule = { source: string; headers: { key: string; value: string }[] }
function productionHeaders(): Record<string, string> {
  const { headers } = JSON.parse(readFileSync('vercel.json', 'utf8')) as { headers: HeaderRule[] }
  return Object.fromEntries(headers.flatMap((rule) => rule.headers.map((h) => [h.key, h.value])))
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
  // Dev and preview listen on localhost only. To test on a phone on the same network, run
  // `npm run dev -- --host` for that session rather than exposing the dev server by default.
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  },
  preview: {
    headers: productionHeaders(),
  },
})
