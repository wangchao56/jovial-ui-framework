import type { StorybookConfig } from '@storybook/vue3-vite'

import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: [
    '../../../packages/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/experimental-addon-test')
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {}
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        '@components': getAbsolutePath('@jienix/jovial-components'),
        '@jienix/jovial-theme': getAbsolutePath('@jienix/jovial-theme'),
        '@jienix/utils': getAbsolutePath('@jienix/utils'),
        '@jienix/jovial-composables': getAbsolutePath(
          '@jienix/jovial-composables'
        ),
        '@jienix/jovial-directives': getAbsolutePath(
          '@jienix/jovial-directives'
        ),
        '@jienix/jovial-locale': getAbsolutePath('@jienix/jovial-locale'),
        '@jienix/jovial-ui': getAbsolutePath('@jienix/jovial-ui'),
        '@jienix/typings': getAbsolutePath('@jienix/typings')
      }
    }
    config.css = {
      postcss: require.resolve('../../../postcss.config.js'),
    }
    console.log(config)
    return config
  }
}
export default config
