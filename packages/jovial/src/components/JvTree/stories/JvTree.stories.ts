import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTree from '../index'

const meta: Meta<typeof JvTree> = {
  title: '数据展示组件/JvTree',
  component: JvTree,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof JvTree>

// 基础数据
const treeData = [
  {
    key: '1',
    label: '节点1',
    children: [
      {
        key: '1-1',
        label: '节点1-1',
      },
      {
        key: '1-2',
        label: '节点1-2',
      },
    ],
  },
  {
    key: '2',
    label: '节点2',
    children: [
      {
        key: '2-1',
        label: '节点2-1',
      },
    ],
  },
]

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvTree },
    setup() {
      return { treeData }
    },
    template: '<JvTree :data="treeData" />',
  }),
}

// 可选择
export const Selectable: Story = {
  render: () => ({
    components: { JvTree },
    setup() {
      const selectedKeys = ref(['1'])
      return { treeData, selectedKeys }
    },
    template: '<JvTree :data="treeData" v-model:selectedKeys="selectedKeys" selectable />',
  }),
}

// 多选
export const Multiple: Story = {
  render: () => ({
    components: { JvTree },
    setup() {
      const selectedKeys = ref(['1', '2'])
      return { treeData, selectedKeys }
    },
    template: '<JvTree :data="treeData" v-model:selectedKeys="selectedKeys" selectable multiple />',
  }),
}

// 复选框
export const Checkbox: Story = {
  render: () => ({
    components: { JvTree },
    setup() {
      return {
        treeData,
        defaultCheckedKeys: ['1-1', '2-1'],
      }
    },
    template: '<JvTree :data="treeData" :default-checked-keys="defaultCheckedKeys" show-checkbox />',
  }),
}

// 虚拟滚动
export const VirtualScroll: Story = {
  render: () => ({
    components: { JvTree },
    setup() {
      // 生成大量数据
      const bigData = Array.from({ length: 1000 }).map((_, index) => ({
        key: String(index),
        label: `节点${index}`,
        children: [
          {
            key: `${index}-1`,
            label: `节点${index}-1`,
          },
        ],
      }))
      return { bigData }
    },
    template: '<JvTree :data="bigData" virtual-scroll style="height: 300px" />',
  }),
}
