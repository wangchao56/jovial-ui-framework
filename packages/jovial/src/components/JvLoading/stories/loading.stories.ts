import type { Meta, StoryObj } from '@storybook/vue3'
import JvLoading from '../src/JvLoading.vue'

const meta: Meta<typeof JvLoading> = {
  title: 'Components/Loading',
  component: JvLoading,
  tags: ['autodocs'],
  argTypes: {
    showStopButton: {
      control: 'boolean',
      description: '是否显示停止按钮',
      defaultValue: true,
    },
    onStop: {
      description: '点击停止按钮时触发',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvLoading>

export const Default: Story = {
  render: args => ({
    components: { JvLoading },
    setup() {
      return { args }
    },
    template: '<JvLoading v-bind="args" />',
  }),
  args: {
    showStopButton: true,
  },
}

export const CustomContent: Story = {
  render: args => ({
    components: { JvLoading },
    setup() {
      return { args }
    },
    template: `
      <JvLoading v-bind="args">
        <div style="color: #1890ff">加载中...</div>
      </JvLoading>
    `,
  }),
  args: {
    showStopButton: true,
  },
}
