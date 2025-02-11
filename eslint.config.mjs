import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    '**/node_modules/**',
    'dist',
    '**/dist/**',
    '*.css',
    '**/*.css/**',
    '*.jpg',
    '*.spec.tsx',
    '**/*.jpg/**',
    'build',
    '**/build/**',
    'scripts',
    '**/scripts/**',
    'public',
    '**/public',
    '**/components-old/**',
    '**/storybook-static',
  ],
  formatters: true,
  vue: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: {
    overrides: {
      '@typescript-eslint/no-empty-object-type': ['off'],
      '@typescript-eslint/no-unsafe-function-type': ['off'],
      'n/prefer-global/process': ['warn'],
      'ts/no-redeclare': ['off'],
      'style/indent-binary-ops': ['off'],
      '@stylistic/indent-binary-ops': ['off'],
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
    },
  },
})
