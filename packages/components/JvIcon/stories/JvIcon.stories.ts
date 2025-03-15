import type { Meta, StoryObj } from '@storybook/vue3'
import JvIcon from '@components/JvIcon/src/JvIcon.vue'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: '通用组件/JvIcon',
  component: JvIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'x-large'],
      description: '图标的大小',
    },
    color: {
      control: 'color',
      description: '图标的颜色',
    },
  },
  args: {
    size: 'medium',
    color: '#000000',
  },
} satisfies Meta<typeof JvIcon>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    name: '$close',
  },
  render: args => ({
    components: { JvIcon },
    setup() {
      return { args }
    },
    template: `
      <JvIcon v-bind="args">
      </JvIcon>
    `,
  }),
}

export const Types: Story = {
  args: {
    size: 'x-large',
    name: '$alarmCheck',
  },
  render: args => ({
    components: { JvIcon },
    setup() {
      const typeOptions = [
        'default',
        'primary',
        'success',
        'warning',
        'error',
        'info',
      ]
      return { args, typeOptions }
    },
    template: `
    <JvSpace direction="vertical">
      <JvIcon v-for="type in typeOptions" v-bind="args" :type="type">
      </JvIcon>
    </JvSpace>
    `,
  }),
}

export const SizeIcon: Story = {
  args: {
    name: '$alarmCheck',
  },
  render: args => ({
    components: { JvIcon },
    setup() {
      const sizeOptions = ['tiny', 'small', 'medium', 'large', 'x-large']

      return { args, sizeOptions }
    },
    template: `
    <JvSpace direction="vertical">
      <JvIcon v-for="size in sizeOptions" v-bind="args" :size="size">
      </JvIcon>
    </JvSpace>
    `,
  }),
}
