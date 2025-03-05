import type { Meta, StoryObj } from '@storybook/vue3'
import JvBadge from '@components/JvBadge/src/JvBadge.vue'
import JvButton from '@components/JvButton/src/JvButton.vue'

const template = ` 
      <JvBadge v-bind="args">
        <JvButton variant='toanl'>Hover me</JvButton>
      </JvBadge>
     `
const meta = {
  title: '反馈组件/JvBadge',
  component: JvBadge,
  tags: ['autodocs'],
  args: {
    count: 10,
    max: 99,
    dot: true,
    position: 'top-right',
    color: 'red',
    size: 'small',
    rounded: true,
  },
} satisfies Meta<typeof JvBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 10,
  },
  render: args => ({
    components: { JvButton, JvBadge },
    setup() {
      return { args }
    },
    template,
  }),
}
