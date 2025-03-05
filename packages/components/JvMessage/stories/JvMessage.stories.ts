import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/JvButton.vue'
import JvMessage from '@components/JvMessage/src/JvMessage.vue'

const template = ` 
      <JvMessage v-bind="args" />
     `
const meta = {
  title: '反馈组件/JvMessage',
  component: JvMessage,
  tags: ['autodocs'],
  args: {
    type: 'info',
    message: 'Hello Storybook!',
    closable: true,
    duration: 0,
    modelValue: true,
  },
} satisfies Meta<typeof JvMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
  },
  render: args => ({
    components: { JvButton, JvMessage },
    setup() {
      return { args }
    },
    template,
  }),
}
