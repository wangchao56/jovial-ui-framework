import type { Meta, StoryObj } from '@storybook/vue3'
import { JvList } from '@components/JvList'
import { basicListItems } from './mockData'

const meta = {
  title: '数据展示组件/JvList',
  component: JvList,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: '自定义根标签',
    },
    items: {
      control: 'object',
      description: '列表数据',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    hoverable: {
      control: 'boolean',
      description: '列表项是否有悬浮样式',
    },
    selectable: {
      control: 'boolean',
      description: '列表项是否可选',
    },
    showDivider: {
      control: 'boolean',
      description: '是否显示分割线',
    },
    indent: {
      control: 'number',
      description: '列表项的缩进',
    },
  },
} satisfies Meta<typeof JvList>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return { items: basicListItems }
    },
    template: '<JvList :items="items" />',
  }),
}

// 带图标和头像
export const WithIcons: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const items = [
        {
          type: 'item',
          key: '1',
          title: '带图标的列表项',
          prependIcon: 'star',
          appendIcon: 'chevron-right',
        },
        {
          type: 'item',
          key: '2',
          title: '带头像的列表项',
          prependAvatar: 'https://picsum.photos/40',
        },
      ]
      return { items }
    },
    template: '<JvList :items="items" />',
  }),
}
