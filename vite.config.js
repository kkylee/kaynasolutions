import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { seo } from './build/seo-plugin.js'
import { stableFontDisplay } from './build/stable-font-display.js'

export default defineConfig({
  plugins: [stableFontDisplay(), vue(), tailwindcss(), seo()],
  server: {
    proxy: {
      '/api/send': {
        target: 'https://kaynasolutions.com',
        changeOrigin: true,
        headers: { Origin: 'https://kaynasolutions.com' },
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        services: 'services/index.html',
        solutions: 'solutions/index.html',
        about: 'about/index.html',
        portfolio: 'portfolio/index.html',
        insights: 'insights/index.html',
        contact: 'contact/index.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.js'],
  },
})
