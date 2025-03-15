import type { Meta, StoryObj } from '@storybook/vue3'
import JvIcon from '@components/JvIcon'
import JvInput from '@components/JvInput'

const meta: Meta = {
  title: '数据录入组件/JvInput',
  component: JvInput,
  tags: ['autodocs'],
  subcomponents: {
    JvIcon,
  },
  args: {
    modelValue: '',
    placeholder: '请输入内容',
    disabled: false,
    readonly: false,
    clearable: false,
    maxlength: 100,
  },
} satisfies Meta<typeof JvInput>

export default meta
type Story = StoryObj<typeof meta>

// const Template: Story = (args) => ()
export const Default: Story = {
  args: { ...meta.args, type: 'text', clearable: true },
  render: (args) => {
    return {
      components: { JvInput },
      template: '<JvInput v-bind="args" />',
      setup() {
        return { args }
      },
    }
  },
}

// 密码输入框
export const Password: Story = {
  args: { ...meta.args, type: 'password', clearable: true },
  render: (args) => {
    return {
      components: { JvInput },
      template: '<JvInput v-bind="args"  />',
      setup() {
        return { args }
      },
    }
  },
}

// textarea输入框
export const Textarea: Story = {
  args: { ...meta.args, type: 'textarea' },
  render: (args) => {
    return {
      components: { JvInput },
      template: '<JvInput v-bind="args" />',
      setup() {
        return { args }
      },
    }
  },
}
