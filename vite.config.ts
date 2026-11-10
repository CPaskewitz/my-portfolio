import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // Removed `define: { 'process.env': process.env }`: it could inline every build-time env var
  // into the bundle. Client env goes through import.meta.env.VITE_* only.
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  }
})
