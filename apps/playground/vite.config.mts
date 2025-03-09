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
      '@components': '../../packages/components',
    },
  },
  css: {
    postcss: '../../postcss.config.js'
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000 // 1秒
    }
  }
})
