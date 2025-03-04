import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/JvButton/src/JvButton.vue'
import JvCalendar from '@/components/JvCalendar/src/JvCalendar.vue'

const meta: Meta = {
  title: '数据展示组件/JvCalendar',
  component: JvCalendar,
  tags: ['autodocs'],
  subcomponents: { JvButton },

  args: {
    modelValue: new Date(),
  },
} satisfies Meta<typeof JvCalendar>

export default meta
type Story = StoryObj<typeof meta>

// const Template: Story = (args) => ()
export const Default: Story = {
  args: { ...meta.args, title: '日历' },
  render: (args) => {
    return {
      components: { JvCalendar, JvButton },
      template: '<JvCalendar v-bind="args" />',
      setup() {
        return { args }
      },
    }
  },
}
