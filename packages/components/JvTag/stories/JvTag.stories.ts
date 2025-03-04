import type { Meta, StoryObj } from '@storybook/vue3'
import JvTag from '../src/JvTag.vue'

const meta = {
  title: '数据展示组件/JvTag',
  component: JvTag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    closable: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof JvTag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'primary',
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: '<JvTag v-bind="args">标签</JvTag>',
  }),
}

export const AllTypes: Story = {
  render: () => ({
    components: { JvTag },
    template: `
      <div style="display: flex; gap: 10px;">
        <JvTag type="primary">主要标签</JvTag>
        <JvTag type="success">成功标签</JvTag>
        <JvTag type="warning">警告标签</JvTag>
        <JvTag type="error">危险标签</JvTag>
        <JvTag type="info">信息标签</JvTag>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { JvTag },
    template: `
      <div style="display: flex; gap: 10px; align-items: center;">
        <JvTag size="small">小型标签</JvTag>
        <JvTag size="medium">中型标签</JvTag>
        <JvTag size="large">大型标签</JvTag>
      </div>
    `,
  }),
}

export const Closable: Story = {
  args: {
    closable: true,
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: '<JvTag v-bind="args">可关闭标签</JvTag>',
  }),
}

export const Round: Story = {
  args: {
    rounded: true,
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: '<JvTag v-bind="args">圆角标签</JvTag>',
  }),
}
