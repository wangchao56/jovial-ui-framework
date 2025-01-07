import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: './src/auto-import.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  css: {
    postcss: '../../postcss.config.js'
  },
  optimizeDeps: {
    include: ['@vicons/material'] // 显式列出需要优化的依赖
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000 // 1秒
    }
  }
})
