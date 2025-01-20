import type { Meta, StoryObj } from '@storybook/vue3'
import JvAlert from '@components/JvAlert'
import JvButton from '@components/JvButton/src/button.vue'

const template = ` 
      <JvAlert v-bind="args">
      </JvAlert>
     `
const meta = {
  title: 'Components/JvAlert',
  component: JvAlert,

  tags: ['autodocs'],
  args: {
    type: 'info',
    title: 'Alert title',
    description: 'This is an alert message.',
    closable: true,
    showIcon: true,
    closeText: '',
  },
} satisfies Meta<typeof JvAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    closeText: 'Close',
  },
  render: args => ({
    components: { JvButton, JvAlert },
    setup() {
      return { args }
    },
    template,
  }),
}
