import type { Meta, StoryObj } from '@storybook/vue3'
import JvMenu from '@components/JvMenu'
import { ref } from 'vue'
import { ItemType } from '../src/types'

const meta: Meta<typeof JvMenu> = {
  title: 'Components/Navigation/Menu',
  component: JvMenu,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: '菜单模式',
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    trigger: {
      description: '子菜单打开的触发方式',
      control: 'select',
      options: ['hover', 'click'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hover' },
      },
    },
    theme: {
      description: '主题',
      control: 'select',
      options: ['light', 'dark'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    defaultOpenKeys: {
      description: '默认展开的子菜单 keys',
      control: 'array',
    },
    defaultSelectedKeys: {
      description: '默认选中的菜单项 keys',
      control: 'array',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvMenu>

// 基础菜单
export const Basic: Story = {
  args: {
    items: [
      {
        type: ItemType.Item,
        key: '1',
        label: '菜单项 1',
        icon: 'home',
      },
      {
        type: ItemType.Item,
        key: '2',
        label: '菜单项 2',
        icon: 'user',
      },
      {
        type: ItemType.Divider,
        key: 'divider-1',
      },
      {
        type: ItemType.Item,
        key: '3',
        label: '菜单项 3',
        icon: 'setting',
        disabled: true,
      },
    ],
  },
  render: args => ({
    components: { JvMenu },
    setup() {
      const selectedKeys = ref<string[]>([])
      return { args, selectedKeys }
    },
    template: `
      <JvMenu
        v-model:selectedKeys="selectedKeys"
        v-bind="args"
        @select="(key, item) => console.log('selected:', key, item)"
      />
    `,
  }),
}

// 子菜单
export const SubMenu: Story = {
  args: {
    defaultOpenKeys: ['sub1'],
    items: [
      {
        type: ItemType.Item,
        key: '1',
        label: '导航 1',
        icon: 'home',
      },
      {
        type: ItemType.SubMenu,
        key: 'sub1',
        label: '导航 2',
        icon: 'appstore',
        children: [
          {
            type: ItemType.Item,
            key: '2-1',
            label: '选项 1',
          },
          {
            type: ItemType.Item,
            key: '2-2',
            label: '选项 2',
          },
        ],
      },
      {
        type: ItemType.SubMenu,
        key: 'sub2',
        label: '导航 3',
        icon: 'setting',
        disabled: true,
        children: [
          {
            type: ItemType.Item,
            key: '3-1',
            label: '选项 1',
          },
        ],
      },
    ],
  },
  render: args => ({
    components: { JvMenu },
    setup() {
      const selectedKeys = ref<string[]>([])
      return { args, selectedKeys }
    },
    template: `
      <JvMenu
        v-model:selectedKeys="selectedKeys"
        v-bind="args"
        @openChange="keys => console.log('openChange:', keys)"
      />
    `,
  }),
}

// 菜单组
export const MenuGroup: Story = {
  args: {
    items: [
      {
        type: ItemType.Group,
        key: 'g1',
        label: '组 1',
        children: [
          {
            type: ItemType.Item,
            key: '1-1',
            label: '选项 1',
          },
          {
            type: ItemType.Item,
            key: '1-2',
            label: '选项 2',
          },
        ],
      },
      {
        type: ItemType.Group,
        key: 'g2',
        label: '组 2',
        children: [
          {
            type: ItemType.Item,
            key: '2-1',
            label: '选项 1',
          },
          {
            type: ItemType.Item,
            key: '2-2',
            label: '选项 2',
          },
        ],
      },
    ],
  },
}

// 水平菜单
export const Horizontal: Story = {
  args: {
    mode: 'horizontal',
    defaultOpenKeys: ['sub1'],
    items: [
      {
        type: ItemType.Item,
        key: '1',
        label: '导航 1',
        icon: 'home',
      },
      {
        type: ItemType.SubMenu,
        key: 'sub1',
        label: '导航 2',
        icon: 'appstore',
        children: [
          {
            type: ItemType.Item,
            key: '2-1',
            label: '选项 1',
          },
          {
            type: ItemType.Item,
            key: '2-2',
            label: '选项 2',
          },
        ],
      },
    ],
  },
}

// 主题
export const Theme: Story = {
  args: {
    theme: 'dark',
    items: [
      {
        type: ItemType.Item,
        key: '1',
        label: '菜单项 1',
        icon: 'home',
      },
      {
        type: ItemType.SubMenu,
        key: 'sub1',
        label: '子菜单',
        icon: 'appstore',
        children: [
          {
            type: ItemType.Item,
            key: '2-1',
            label: '选项 1',
          },
        ],
      },
    ],
  },
}

// 自定义图标和内容
export const CustomContent: Story = {
  render: args => ({
    components: { JvMenu },
    setup() {
      const selectedKeys = ref<string[]>([])
      const items = [
        {
          type: ItemType.Item,
          key: '1',
          label: (_item: any) => h('span', { style: { color: 'red' } }, '自定义文本'),
          icon: (_item: any) => h('div', { class: 'custom-icon' }, '🎉'),
        },
        {
          type: ItemType.SubMenu,
          key: 'sub1',
          label: '子菜单',
          children: [
            {
              type: ItemType.Item,
              key: '2-1',
              label: '选项 1',
            },
          ],
        },
      ]
      return { args, items, selectedKeys }
    },
    template: `
      <JvMenu
        v-model:selectedKeys="selectedKeys"
        :items="items"
        v-bind="args"
      />
    `,
  }),
}
