import type { Meta, StoryObj } from '@storybook/vue3'
import JvCascader from '../src/JvCascader.vue'

const meta: Meta<typeof JvCascader> = {
  title: '数据录入组件/JvCascader',
  component: JvCascader,
  tags: ['autodocs'],
  args: {
    options: [
      {
        value: 'guide',
        label: '指南',
        children: [
          {
            value: 'disciplines',
            label: '规范',
            children: [
              {
                value: 'consistency',
                label: '一致性',
              },
              {
                value: 'feedback',
                label: '反馈',
              },
            ],
          },
        ],
      },
      {
        value: 'resource',
        label: '资源',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          },
          {
            value: 'sketch',
            label: 'Sketch Templates',
          },
        ],
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof JvCascader>

export const Basic: Story = {
  args: {
    placeholder: '请选择',
  },

}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Clearable: Story = {
  args: {
    clearable: true,
  },
}

export const Filterable: Story = {
  args: {
    filterable: true,
  },
}
