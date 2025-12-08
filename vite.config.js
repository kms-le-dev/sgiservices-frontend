import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour permettre l'accès réseau depuis d'autres appareils
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: '172.20.10.11',
    },
  },
})
