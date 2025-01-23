import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import JvCalendar from '@components/JvCalendar/src/calendar.vue'

const meta: Meta = {
  title: 'Components/Calendar日历',
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
