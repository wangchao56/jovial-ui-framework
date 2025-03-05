import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/JvButton.vue'
import JvEditor from '@components/JvEditor'

const template = ` 
      <JvEditor v-bind="args" />
   
     `
const meta = {
  title: '数据录入组件/JvEditor',
  component: JvEditor,

  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof JvEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
  },
  render: args => ({
    components: { JvButton, JvEditor },
    setup() {
      return { args }
    },
    template,
  }),
}
