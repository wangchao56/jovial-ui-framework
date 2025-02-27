import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './index.ts',
      name: 'JienixUtils',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
    // 确保产物清晰可读
    minify: false,
  },
  plugins: [
    dts({
      // 生成类型声明文件
      include: ['./**/*.ts', './**/*.tsx', './**/*.vue', './*.ts'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
})
