import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/JvButton.vue'
import JvCard from '@components/JvCard/src/JvCard.vue'

const template = ` 
      <JvCard v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </JvCard>
     `
const meta = {
  title: '数据展示组件/JvCard',
  component: JvCard,

  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof JvCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
  },
  render: args => ({
    components: { JvButton, JvCard },
    setup() {
      return { args }
    },
    template,
  }),
}
