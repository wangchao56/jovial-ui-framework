import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: './src',
      outDir: './types',
      staticImport: true,
    }),
  ],
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.ts',
      name: 'jovial-ui',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'umd', 'cjs', 'iife'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'jovial-ui.[ext]',
      },
    },
    minify: 'terser',
    sourcemap: true,
  },

})
