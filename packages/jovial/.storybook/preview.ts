import type { Preview } from '@storybook/vue3'
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
        {
          name: 'black',
          value: '#000',
        },
        {
          name: 'white',
          value: '#fff',
        },
      ],
    },
  },
}

export default preview
