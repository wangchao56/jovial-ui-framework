import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Inspector from 'vite-plugin-vue-inspector'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer(),
    Inspector(),
    AutoImport({
      imports: ['vue'],
      dts: './src/typings/auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../../packages/components'),
      '@jienix/jovial-theme': path.resolve(__dirname, '../../packages/theme'),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // 1秒
    },
  },
  css: {
    postcss: '../../postcss.config.js',
  },
})
