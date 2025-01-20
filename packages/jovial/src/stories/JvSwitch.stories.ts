import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import JvSwitch from '@components/JvSwitch/src/JvSwitch.vue'

const template = ` 
      <JvSwitch v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </JvSwitch>
     `
const meta = {
  title: 'Components/JvSwitch',
  component: JvSwitch,

  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof JvSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
  },
  render: args => ({
    components: { JvButton, JvSwitch },
    setup() {
      return { args }
    },
    template,
  }),
}
