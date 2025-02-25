import type { Meta, StoryObj } from '@storybook/vue3'
import { JvTitle } from '../index'

const meta = {
  title: 'Typography/Title',
  component: JvTitle,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    writingMode: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof JvTitle>

export default meta

export const Basic: StoryObj<typeof JvTitle> = {
  args: {
    level: 1,
  },
  render: args => ({
    components: { JvTitle },
    setup() {
      return { args }
    },
    template: '<JvTitle v-bind="args">标题示例</JvTitle>',
  }),
}
