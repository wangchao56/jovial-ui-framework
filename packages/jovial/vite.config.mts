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
      '@': '/src',
      '@components': '/src/components',
    },
  },
  css: {
    postcss: '../../postcss.config.js',
  },
  optimizeDeps: {
    include: ['@vicons/material'], // 显式列出需要优化的依赖
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // 1秒
    },
  },
  build: {
    lib: {
      entry: './src/components/index.ts', // 入口文件
      name: 'jovial-ui', // 库名称
      fileName: format => `jovial-ui.${format}.js`, // 输出文件名
      formats: ['es', 'umd', 'cjs'], // 输出格式
    },
    rollupOptions: {
      external: ['vue'], // 排除vue
      output: {
        globals: { vue: 'Vue' }, // 全局变量
        assetFileNames: 'index.css',
        manualChunks(id) {
          console.log(id)
        },
      },
    },
  },
})
