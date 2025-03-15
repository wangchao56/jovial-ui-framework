import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'istanbul', // 或者使用 'c8'
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/stories/**',
        '**/mock/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../packages/components'),
      '@jienix/typings': resolve(__dirname, './packages/typings'),
      '@jienix/utils': resolve(__dirname, './packages/utils'),
      '@jienix/jovial-theme': resolve(__dirname, './packages/theme'),
    },
  },
})
