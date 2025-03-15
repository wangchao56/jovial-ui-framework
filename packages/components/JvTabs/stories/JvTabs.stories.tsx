import type { Meta, StoryObj } from '@storybook/vue3'
import JvSpace from '@components/JvSpace'
import { JvTabPanel, JvTabs } from '@components/JvTabs'
import { ref } from 'vue'

const meta = {
  title: '导航组件/Tabs',
  component: JvTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '标签页组件，用于在不同的内容区域间进行切换。',
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '标签页位置',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    type: {
      control: 'select',
      options: ['line', 'card', 'segment'],
      description: '标签页类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'line' },
      },
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭标签页',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    addable: {
      control: 'boolean',
      description: '是否显示添加按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof JvTabs>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvTabs },
    setup() {
      const activeKey = ref('1')
      const items = [
        {
          key: '1',
          label: '标签一',
          content: '标签一的内容',
        },
        {
          key: '2',
          label: '标签二',
          content: '标签二的内容',
        },
        {
          key: '3',
          label: '标签三',
          content: '标签三的内容',
        },
      ]

      return { activeKey, items }
    },
    template: `
      <jv-tabs
        v-model:active-key="activeKey"
        :tabs="items"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的标签页用法。',
      },
    },
  },
}

// 不同位置
export const Positions: Story = {
  render: () => ({
    components: { JvTabs, JvSpace },
    setup() {
      const activeKey = ref('1')
      const items = [
        {
          key: '1',
          label: '标签一',
          content: '标签一的内容',
        },
        {
          key: '2',
          label: '标签二',
          content: '标签二的内容',
        },
      ]

      return { activeKey, items }
    },
    template: `
      <JvSpace direction="vertical" :gap="32">
        <jv-tabs v-model:active-key="activeKey" :tabs="items" position="top" />
        <jv-tabs v-model:active-key="activeKey" :tabs="items" position="right" />
        <jv-tabs v-model:active-key="activeKey" :tabs="items" position="bottom" />
        <jv-tabs v-model:active-key="activeKey" :tabs="items" position="left" />
      </JvSpace>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '标签页可以在上、右、下、左四个方向。',
      },
    },
  },
}

// 不同类型
export const Types: Story = {
  render: () => ({
    components: { JvTabs, JvSpace },
    setup() {
      const activeKey = ref('1')
      const items = [
        {
          key: '1',
          label: '标签一',
          content: '标签一的内容',
        },
        {
          key: '2',
          label: '标签二',
          content: '标签二的内容',
        },
      ]

      return { activeKey, items }
    },
    template: `
      <JvSpace direction="vertical" :gap="32">
        <jv-tabs v-model:active-key="activeKey" :tabs="items" type="line" />
        <jv-tabs v-model:active-key="activeKey" :tabs="items" type="card" />
        <jv-tabs v-model:active-key="activeKey" :tabs="items" type="segment" />
      </JvSpace>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '标签页支持线条、卡片、分段三种类型。',
      },
    },
  },
}

// // 带图标
// export const WithIcons: Story = {
//   render: () => ({
//     components: { JvTabs },
//     setup() {
//       const activeKey = ref('1')
//       const items = [
//         {
//           key: '1',
//           label: '首页',
//           icon: 'home',
//           content: '首页内容',
//         },
//         {
//           key: '2',
//           label: '用户',
//           icon: 'user',
//           content: '用户内容',
//         },
//         {
//           key: '3',
//           label: '设置',
//           icon: 'setting',
//           content: '设置内容',
//         },
//       ]

//       return { activeKey, items }
//     },
//     template: `
//       <jv-tabs
//         v-model="activeKey"
//         :items="items"
//       />
//     `,
//   }),
//   parameters: {
//     docs: {
//       description: {
//         story: '标签可以配置图标。',
//       },
//     },
//   },
// }

// // 可关闭和新增
// export const DynamicTabs: Story = {
//   render: () => ({
//     components: { JvTabs },
//     setup() {
//       const activeKey = ref('1')
//       const items = ref([
//         {
//           key: '1',
//           label: '标签一',
//           content: '标签一的内容',
//           closable: true,
//         },
//         {
//           key: '2',
//           label: '标签二',
//           content: '标签二的内容',
//           closable: true,
//         },
//       ])

//       const handleClose = (key: string) => {
//         const index = items.value.findIndex(item => item.key === key)
//         if (index > -1) {
//           items.value.splice(index, 1)
//         }
//       }

//       const handleAdd = () => {
//         const newKey = String(items.value.length + 1)
//         items.value.push({
//           key: newKey,
//           label: `新标签${newKey}`,
//           content: `新标签${newKey}的内容`,
//           closable: true,
//         })
//         activeKey.value = newKey
//       }

//       return { activeKey, items, handleClose, handleAdd }
//     },
//     template: `
//       <jv-tabs
//         v-model="activeKey"
//         :items="items"
//         :closable="true"
//         :addable="true"
//         @close="handleClose"
//         @add="handleAdd"
//       />
//     `,
//   }),
//   parameters: {
//     docs: {
//       description: {
//         story: '支持动态增加和关闭标签页。',
//       },
//     },
//   },
// }

// 禁用状态
// export const Disabled: Story = {
//   render: () => ({
//     components: { JvTabs },
//     setup() {
//       const activeKey = ref('1')
//       const items = [
//         {
//           key: '1',
//           label: '标签一',
//           content: '标签一的内容',
//         },
//         {
//           key: '2',
//           label: '标签二',
//           disabled: true,
//           content: '标签二的内容',
//         },
//         {
//           key: '3',
//           label: '标签三',
//           content: '标签三的内容',
//         },
//       ]

//       return { activeKey, items }
//     },
//     template: `
//       <jv-tabs
//         v-model="activeKey"
//         :items="items"
//       />
//     `,
//   }),
//   parameters: {
//     docs: {
//       description: {
//         story: '禁用某些标签页。',
//       },
//     },
//   },
// }

// 自定义标签页内容
export const CustomContent: Story = {
  render: () => ({
    components: { JvTabs, JvTabPanel },
    setup() {
      const activeKey = ref('1')
      const items = [
        {
          key: '1',
          label: '标签一',
          content: () => (
            '自定义渲染的内容'
          ),
        },
        {
          key: '2',
          label: '标签二',
          content: '普通文本内容',
        },
      ]

      return { activeKey, items }
    },
    template: `
      <jv-tabs
        v-model:active-key="activeKey"
      >
        <jv-tab-panel name="1" label="标签一" content="自定义渲染的内容" />
        <jv-tab-panel name="2" label="标签二" content="普通文本内容" />
        <jv-tab-panel name="3" label="标签三" content="普通文本内容" />
      </jv-tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过函数自定义标签页内容。',
      },
    },
  },
}
