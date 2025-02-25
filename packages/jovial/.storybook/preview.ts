import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { registerPlugins } from '../src/plugins'
import { withJovialTheme } from './withJovialTheme.decorator'
import '@jovial/theme-chalk/src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ddd',
        },
        {
          name: 'dark',
          value: '#222',
        },
      ],
    },
  },
  tags: ['autodocs'],
}
setup((app) => {
  // Registers your app's plugins into Storybook
  registerPlugins(app)
})
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
}
export const decorators = [withJovialTheme]
export default preview
