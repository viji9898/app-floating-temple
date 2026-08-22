import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/audio': {
        target: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/audio/, '/app-floating-temple/sample_audio'),
      },
    },
  },
})
