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
    outDir: 'dist/esm',
    lib: {
      entry: './src/index.ts',
      name: 'jovial-ui',
      fileName: () => 'index.esm.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@components': '@jienix/jovial-components',
    },
  },
})
