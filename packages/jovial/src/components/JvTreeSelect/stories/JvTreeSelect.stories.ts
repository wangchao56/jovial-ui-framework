import type { Meta, StoryObj } from '@storybook/vue3'
import JvTreeSelect from '@components/JvTreeSelect/src/JvTreeSelect.vue'

// 示例数据
const treeData = [
  {
    id: '1',
    label: '一级 1',
    children: [
      {
        id: '1-1',
        label: '二级 1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级 1-1-1',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      {
        id: '2-1',
        label: '二级 2-1',
      },
      {
        id: '2-2',
        label: '二级 2-2',
      },
    ],
  },
]

const meta = {
  title: '数据录入组件/JvTreeSelect',
  component: JvTreeSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '选中的值',
    },
    data: {
      control: 'object',
      description: '树形数据',
    },
    multiple: {
      control: 'boolean',
      description: '是否多选',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    clearable: {
      control: 'boolean',
      description: '是否可清空',
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
    },
    valueKey: {
      control: 'text',
      description: '值字段名',
    },
    labelKey: {
      control: 'text',
      description: '标签字段名',
    },
    childrenKey: {
      control: 'text',
      description: '子节点字段名',
    },
  },
} satisfies Meta<typeof JvTreeSelect>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    data: treeData,
    valueKey: 'id',
    labelKey: 'label',
    childrenKey: 'children',
    placeholder: '请选择',
    clearable: true,
  },
}

// 多选用法
export const Multiple: Story = {
  args: {
    ...Basic.args,
    multiple: true,
    modelValue: [],
  },
}

// 禁用状态
export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
}
