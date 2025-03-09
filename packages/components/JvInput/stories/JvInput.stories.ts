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
  // argTypes: {
  //   modelValue: { control: 'text' },
  //   placeholder: { control: 'text' },
  //   disabled: { control: 'boolean' },
  //   readonly: { control: 'boolean' },
  //   clearable: { control: 'boolean' },
  //   showPassword: { control: 'boolean' },
  //   showWordLimit: { control: 'boolean' },
  //   maxlength: { control: 'number' },
  //   minlength: { control: 'number' },
  //   autofocus: { control: 'boolean' },
  //   autosize: { control: 'object' },
  //   pair: { control: 'boolean' },
  //   rows: { control: 'number' },
  //   round: { control: 'boolean' },
  //   separator: { control: 'text' },
  //   showCount: { control: 'boolean' },
  //   size: { control: 'select', options: ['small', 'medium', 'large'] },
  //   status: { control: 'select', options: ['success', 'warning', 'error'] },
  //   type: { control: 'select', options: ['text', 'password', 'textarea'] },
  //   value: { control: 'text' },
  //   inputProps: { control: 'object' }
  // }

  args: {
    modelValue: '',
    placeholder: '请输入内容',
    disabled: false,
    readonly: false,
    clearable: false,
    showPassword: false,
    showWordLimit: false,
    maxlength: 100,
    minlength: 0,
    autofocus: false,
    autosize: false,
    pair: false,
    rows: 1,
    round: false,
    separator: '',
    showCount: false,
    size: 'medium',
    value: '',
    inputProps: {},
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
