import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvMenu from '../src/JvMenu.vue'

const meta = {
  title: 'Navigation/Menu',
  component: JvMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '导航菜单组件，支持垂直和水平两种模式，可展开、折叠、多级嵌套。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '菜单模式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
      description: '子菜单触发方式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hover' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: '是否折叠（仅垂直模式有效）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof JvMenu>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvMenu },
    setup() {
      const selectedKey = ref('1')
      const items = [
        {
          key: '1',
          label: '导航一',
          icon: 'home',
        },
        {
          key: '2',
          label: '导航二',
          icon: 'user',
        },
        {
          key: '3',
          label: '导航三',
          icon: 'setting',
          disabled: true,
        },
      ]

      return { selectedKey, items }
    },
    template: `
      <jv-menu
        v-model="selectedKey"
        :items="items"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的垂直菜单用法。',
      },
    },
  },
}

// 子菜单
export const SubMenu: Story = {
  render: () => ({
    components: { JvMenu },
    setup() {
      const selectedKey = ref('1-1')
      const items = [
        {
          key: '1',
          label: '导航一',
          icon: 'home',
          children: [
            {
              key: '1-1',
              label: '选项1',
            },
            {
              key: '1-2',
              label: '选项2',
            },
          ],
        },
        {
          key: '2',
          label: '导航二',
          icon: 'user',
          children: [
            {
              key: '2-1',
              label: '选项3',
            },
            {
              key: '2-2',
              label: '选项4',
              children: [
                {
                  key: '2-2-1',
                  label: '选项5',
                },
                {
                  key: '2-2-2',
                  label: '选项6',
                },
              ],
            },
          ],
        },
      ]

      return { selectedKey, items }
    },
    template: `
      <jv-menu
        v-model="selectedKey"
        :items="items"
        :default-open-keys="['1', '2', '2-2']"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '带有子菜单的导航菜单，支持多级嵌套。',
      },
    },
  },
}

// 水平模式
export const Horizontal: Story = {
  render: () => ({
    components: { JvMenu },
    setup() {
      const selectedKey = ref('1')
      const items = [
        {
          key: '1',
          label: '导航一',
          icon: 'home',
          children: [
            {
              key: '1-1',
              label: '选项1',
            },
            {
              key: '1-2',
              label: '选项2',
            },
          ],
        },
        {
          key: '2',
          label: '导航二',
          icon: 'user',
        },
        {
          key: '3',
          label: '导航三',
          icon: 'setting',
        },
      ]

      return { selectedKey, items }
    },
    template: `
      <jv-menu
        v-model="selectedKey"
        :items="items"
        mode="horizontal"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '水平的顶部导航菜单。',
      },
    },
  },
}

// 可折叠
export const Collapsible: Story = {
  render: () => ({
    components: { JvMenu },
    setup() {
      const selectedKey = ref('1')
      const collapsed = ref(false)
      const items = [
        {
          key: '1',
          label: '导航一',
          icon: 'home',
          children: [
            {
              key: '1-1',
              label: '选项1',
            },
            {
              key: '1-2',
              label: '选项2',
            },
          ],
        },
        {
          key: '2',
          label: '导航二',
          icon: 'user',
        },
        {
          key: '3',
          label: '导航三',
          icon: 'setting',
        },
      ]

      return { selectedKey, collapsed, items }
    },
    template: `
      <div>
        <button @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '折叠' }}
        </button>
        <jv-menu
          v-model="selectedKey"
          :items="items"
          :collapsed="collapsed"
          style="margin-top: 16px;"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以被折叠/展开的垂直导航菜单。',
      },
    },
  },
}

// 自定义触发方式
export const CustomTrigger: Story = {
  render: () => ({
    components: { JvMenu },
    setup() {
      const selectedKey = ref('1')
      const items = [
        {
          key: '1',
          label: '导航一',
          icon: 'home',
          children: [
            {
              key: '1-1',
              label: '选项1',
            },
            {
              key: '1-2',
              label: '选项2',
            },
          ],
        },
        {
          key: '2',
          label: '导航二',
          icon: 'user',
          children: [
            {
              key: '2-1',
              label: '选项3',
            },
            {
              key: '2-2',
              label: '选项4',
            },
          ],
        },
      ]

      return { selectedKey, items }
    },
    template: `
      <jv-menu
        v-model="selectedKey"
        :items="items"
        trigger="click"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '子菜单可以设置为点击触发。',
      },
    },
  },
}
