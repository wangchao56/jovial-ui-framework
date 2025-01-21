import type { Meta, StoryObj } from '@storybook/vue3'
import JvTag from '../src/JvTag.vue'

const meta = {
  title: 'Components/Tag',
  component: JvTag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    closable: {
      control: 'boolean',
    },
    round: {
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
    template: '<jv-tag v-bind="args">标签</jv-tag>',
  }),
}

export const AllTypes: Story = {
  render: () => ({
    components: { JvTag },
    template: `
      <div style="display: flex; gap: 10px;">
        <jv-tag type="primary">主要标签</jv-tag>
        <jv-tag type="success">成功标签</jv-tag>
        <jv-tag type="warning">警告标签</jv-tag>
        <jv-tag type="danger">危险标签</jv-tag>
        <jv-tag type="info">信息标签</jv-tag>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { JvTag },
    template: `
      <div style="display: flex; gap: 10px; align-items: center;">
        <jv-tag size="small">小型标签</jv-tag>
        <jv-tag size="medium">中型标签</jv-tag>
        <jv-tag size="large">大型标签</jv-tag>
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
    template: '<jv-tag v-bind="args">可关闭标签</jv-tag>',
  }),
}

export const Round: Story = {
  args: {
    round: true,
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: '<jv-tag v-bind="args">圆角标签</jv-tag>',
  }),
}
