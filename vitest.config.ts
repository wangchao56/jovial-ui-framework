import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
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
      '@components': resolve(__dirname, 'packages/components'),
      '@jienix/typings': resolve(__dirname, 'packages/typings'),
      '@jienix/utils': resolve(__dirname, 'packages/utils'),
      '@jienix/jovial-theme': resolve(__dirname, 'packages/theme'),
      '@jienix/jovial-components': resolve(__dirname, 'packages/components'),
      '@jienix/jovial-composables': resolve(__dirname, 'packages/composables'),
      '@jienix/jovial-directives': resolve(__dirname, 'packages/directives'),
      '@jienix/jovial-locale': resolve(__dirname, 'packages/locale'),
    },
  },
})
