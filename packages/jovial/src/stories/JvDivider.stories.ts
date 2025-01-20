import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import JvDivider from '@components/JvDivider/src/JvDivider.vue'

const template = ` 
      <JvDivider v-bind="args" />
     `
const meta = {
  title: 'Components/JvDivider',
  component: JvDivider,

  tags: ['autodocs'],
  args: {

    titlePosition: 'center',
    dashed: false,

  },

  argTypes: {
    title: {
      control: 'text',
    },
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' },
    },
    titlePosition: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
    },
    length: {
      control: 'text',
    },
  },

} satisfies Meta<typeof JvDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'default title',
    direction: 'horizontal',
    length: 'full',
    color: 'primary',
    dashed: true,
  },
  render: args => ({
    components: { JvButton, JvDivider },
    setup() {
      return { args }
    },
    template,
  }),
}

export const Vertiacl: Story = {
  args: {
    // direction: 'vertical',
    length: 50,
    color: 'primary',

  },
  render: args => ({
    components: { JvButton, JvDivider },
    setup() {
      return { args }
    },
    template: `
    <div style="width:max-content;height:max-content;border:1px solid gray">
    <JvDivider v-bind="args" />
    </div>
    `,
  }),
}
