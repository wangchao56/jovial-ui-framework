import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import JvDialog from '@components/JvDialog/src/JvDialog.vue'

const template = ` 
      <JvDialog v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </JvDialog>
     `
const meta = {
  title: 'Components/JvDialog',
  component: JvDialog,

  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof JvDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Hello',
    modelValue: true,
  },
  render: args => ({
    components: { JvButton, JvDialog },
    setup() {
      return { args }
    },
    template,
  }),
}
