import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
      entryRoot: './src',
      outDir: 'dist/types',
      staticImport: true,
    }),
  ],
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.ts',
      name: 'jovial-ui',
      fileName: format => `${format}/index.${format === 'iife' ? 'min' : format}.${format === 'cjs' || format === 'umd' ? 'cjs' : 'js'}`,
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
  resolve: {
    alias: {
      '@components': '@jienix/jovial-components',
    },
  },
})
