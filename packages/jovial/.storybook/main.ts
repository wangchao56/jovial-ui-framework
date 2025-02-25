import type { StorybookConfig } from '@storybook/vue3-vite'

import { dirname, join } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // getAbsolutePath('@storybook/addon-onboarding'),
    // getAbsolutePath('@storybook/addon-essentials'),
    // getAbsolutePath('@storybook/addon-interactions'),
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    },
  },
  docs: {
    defaultName: 'Documentation',
  },
  viteFinal: (config) => {
    return config
  },
}
export default config
