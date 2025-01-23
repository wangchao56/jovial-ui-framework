import type { Meta, StoryObj } from '@storybook/vue3'
import JvSwitch from '../src/JvSwitch.vue'

const meta = {
  title: 'Components/Switch',
  component: JvSwitch,
  tags: ['autodocs'],
  argTypes: {
    'modelValue': {
      control: 'boolean',
      description: '开关状态',
    },
    'disabled': {
      control: 'boolean',
      description: '是否禁用',
    },
    'size': {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '开关大小',
    },
    'loading': {
      control: 'boolean',
      description: '加载状态',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
    },
    'onChange': {
      action: 'change',
    },
  },
} satisfies Meta<typeof JvSwitch>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: '<jv-switch v-bind="args" />',
  }),
  args: {
    modelValue: false,
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvSwitch },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <jv-switch size="small" />
        <jv-switch size="default" />
        <jv-switch size="large" />
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvSwitch },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <jv-switch :model-value="false" disabled />
        <jv-switch :model-value="true" disabled />
      </div>
    `,
  }),
}

// 加载状态
export const Loading: Story = {
  render: () => ({
    components: { JvSwitch },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <jv-switch :model-value="false" loading />
        <jv-switch :model-value="true" loading />
      </div>
    `,
  }),
}
