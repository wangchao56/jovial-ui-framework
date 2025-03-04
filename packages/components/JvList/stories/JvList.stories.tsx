import type { ListItem } from '@components/JvList'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvList from '../src/JvList.setup'
import { basicListItems, treeData } from './mockData'

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
    variant: {
      control: 'select',
      options: ['text', 'flat', 'elevated', 'tonal', 'outlined', 'plain'],
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

// 分组和嵌套
export const GroupAndNested: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const expandedKeys = ref(['group1'])
      const items = [
        {
          type: 'group',
          key: 'group1',
          title: '分组 1',
          children: [
            { type: 'item', key: '1-1', title: '子项 1-1' },
            { type: 'item', key: '1-2', title: '子项 1-2' },
          ],
        },
        {
          type: 'group',
          key: 'group2',
          title: '分组 2',
          children: [
            { type: 'item', key: '2-1', title: '子项 2-1' },
            { type: 'item', key: '2-2', title: '子项 2-2' },
          ],
        },
      ]
      return { items, expandedKeys }
    },
    template: '<JvList :items="items" v-model:expanded-keys="expandedKeys" />',
  }),
}

// 带分割线和子标题
export const WithDividersAndSubheaders: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const items = [
        { type: 'subheader', key: 'sub1', title: '子标题 1' },
        { type: 'item', key: '1', title: '列表项 1' },
        { type: 'divider', key: 'div1' },
        { type: 'subheader', key: 'sub2', title: '子标题 2', sticky: true },
        { type: 'item', key: '2', title: '列表项 2' },
      ]
      return { items }
    },
    template: '<JvList :items="items" show-divider />',
  }),
}

// 可选择的列表
export const Selectable: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const selectedKeys = ref<string[]>([])
      return {
        items: basicListItems,
        selectedKeys,
        onSelect: (item: any) => {
          console.log('selected:', item)
        },
      }
    },
    template: `
      <JvList
        :items="items"
        v-model:selected-keys="selectedKeys"
        selectable
        hoverable
        @select-item="onSelect"
      />
    `,
  }),
}

// 虚拟列表
export const VirtualList: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const items = Array.from({ length: 1000 }, (_, i) => ({
        type: 'item',
        key: String(i),
        title: `列表项 ${i + 1}`,
      }))
      return { items }
    },
    template: '<JvList :items="items" virtual :item-height="40" style="height: 400px;" />',
  }),
}

// 带边框的列表
export const Bordered: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return {
        items: basicListItems,
      }
    },
    template: `
      <JvList :items="items" bordered />
    `,
  }),
}

// 可点击的列表
export const Clickable: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const handleClick = (item: ListItem) => {
        console.log('clicked:', item)
      }
      return {
        items: basicListItems,
        handleClick,
      }
    },
    template: `
      <JvList 
        :items="items" 
        clickable 
        @click-item="handleClick"
      />
    `,
  }),
}

// 带分割线的列表
export const WithDivider: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return {
        items: basicListItems,
      }
    },
    template: `
      <JvList :items="items" show-divider />
    `,
  }),
}

// 树形列表
export const TreeList: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const expandedKeys = ref<string[]>(['1'])
      return {
        items: treeData,
        expandedKeys,
        onExpand: (key: string, expanded: boolean) => {
          console.log('expand:', key, expanded)
        },
      }
    },
    template: `
      <JvList
        :items="items"
        v-model:expanded-keys="expandedKeys"
        :indent="24"
        @expand="onExpand"
      />
    `,
  }),
}

// 手风琴模式的树形列表
export const AccordionTreeList: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const expandedKeys = ref<string[]>([])
      return {
        items: treeData,
        expandedKeys,
      }
    },
    template: `
      <JvList 
        :items="items"
        v-model:expanded-keys="expandedKeys"
        accordion
      />
    `,
  }),
}

// 默认展开所有节点的树形列表
export const DefaultExpandAll: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return {
        items: treeData,
      }
    },
    template: `
      <JvList 
        :items="items"
        default-expand-all
      />
    `,
  }),
}

// 自定义列表项
export const CustomItem: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      const items: ListItem[] = [
        {
          key: '1',
          type: 'item',
          title: '自定义列表项 1',
          description: '这是一段描述文本',
          icon: '🌟',
        },
        {
          key: '2',
          type: 'item',
          title: '自定义列表项 2',
          description: '这是另一段描述文本',
          icon: '📌',
        },
      ]

      return {
        items,
      }
    },
    template: `
      <JvList :items="items">
        <template #item="{ item }">
          <div style="display: flex; align-items: center; padding: 12px;">
            <span style="margin-right: 8px;">{{ item.icon }}</span>
            <div>
              <div style="font-weight: bold;">{{ item.title }}</div>
              <div style="color: #666; font-size: 0.9em;">{{ item.description }}</div>
            </div>
          </div>
        </template>
      </JvList>
    `,
  }),
}

// 带边框和分割线
export const BorderedWithDivider: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return { items: basicListItems }
    },
    template: '<JvList :items="items" bordered show-divider />',
  }),
}

// 自定义渲染
export const CustomRender: Story = {
  render: () => ({
    components: { JvList },
    setup() {
      return { items: basicListItems }
    },
    template: `
      <JvList :items="items">
        <template #item="{ item }">
          <div style="padding: 12px;">
            <div style="font-weight: bold;">{{ item.title }}</div>
            <div style="color: #666;">{{ item.description }}</div>
          </div>
        </template>
      </JvList>
    `,
  }),
}
