import type { Meta, StoryObj } from '@storybook/vue3'
import JvTransfer from '@components/JvTransfer'
import { ref } from 'vue'

const meta: Meta<typeof JvTransfer> = {
  title: '数据录入组件/JvTransfer',
  component: JvTransfer,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '穿梭框数据源',
      control: 'object',
    },
    modelValue: {
      description: '选中项绑定值',
      control: 'object',
    },
    titles: {
      description: '自定义列表标题',
      control: 'object',
    },
    filterable: {
      description: '是否可搜索',
      control: 'boolean',
    },
    filterPlaceholder: {
      description: '搜索框占位符',
      control: 'text',
    },
    disabled: {
      description: '是否禁用',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvTransfer>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvTransfer },
    setup() {
      const transferData = [
        { key: '1', label: '选项1' },
        { key: '2', label: '选项2' },
        { key: '3', label: '选项3' },
        { key: '4', label: '选项4' },
        { key: '5', label: '选项5' },
      ]

      const value = ref(['1', '4'])

      return { args, transferData, value }
    },
    template: `
      <JvTransfer
        v-model="value"
        :data="transferData"
        v-bind="args"
      />
    `,
  }),
}

// 可搜索
export const Filterable: Story = {
  render: args => ({
    components: { JvTransfer },
    setup() {
      const transferData = [
        { key: '1', label: '选项1' },
        { key: '2', label: '选项2' },
        { key: '3', label: '选项3' },
        { key: '4', label: '选项4' },
        { key: '5', label: '选项5' },
      ]

      const value = ref(['1'])

      return { args, transferData, value }
    },
    template: `
      <JvTransfer
        v-model="value"
        :data="transferData"
        filterable
        filter-placeholder="请输入搜索内容"
        v-bind="args"
      />
    `,
  }),
}

// 禁用选项
export const WithDisabled: Story = {
  render: args => ({
    components: { JvTransfer },
    setup() {
      const transferData = [
        { key: '1', label: '选项1' },
        { key: '2', label: '选项2', disabled: true },
        { key: '3', label: '选项3' },
        { key: '4', label: '选项4', disabled: true },
        { key: '5', label: '选项5' },
      ]

      const value = ref(['1'])

      return { args, transferData, value }
    },
    template: `
      <JvTransfer
        v-model="value"
        :data="transferData"
        v-bind="args"
      />
    `,
  }),
}
