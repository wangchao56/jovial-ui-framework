import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'histoire.setup.ts',
  theme: {
    title: 'Histoire Vue'
  },
  vite: {
    optimizeDeps: {
      include: ['@vicons/material'] // 显式列出需要优化的依赖
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1000 // 1秒
      }
    }
  }
})
