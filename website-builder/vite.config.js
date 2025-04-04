import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  optimizeDeps: {
    include: [
      'react-dnd',
      'react-dnd-html5-backend',
      'react-dnd-touch-backend'
    ]
  }
})
