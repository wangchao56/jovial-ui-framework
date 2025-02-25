import type { Meta, StoryObj } from '@storybook/vue3'
import JvBreadcrumb from '@components/JvBreadcrumb/src/JvBreadcrumb.vue'

const meta = {
  title: '导航组件/JvBreadcrumb',
  component: JvBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '面包屑导航组件，用于显示当前页面在系统层级结构中的位置。',
      },
    },
  },
  argTypes: {
    separator: {
      control: 'text',
      description: '分隔符',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    separatorIcon: {
      control: 'text',
      description: '分隔符图标',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof JvBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvBreadcrumb },
    setup() {
      const items = [
        {
          key: '1',
          label: '首页',
          icon: 'home',
          to: '/',
        },
        {
          key: '2',
          label: '组件',
          to: '/components',
        },
        {
          key: '3',
          label: '面包屑',
          disabled: true,
        },
      ]

      const handleClick = (item: any) => {
        console.log('clicked:', item)
      }

      return { items, handleClick }
    },
    template: `
      <jv-breadcrumb
        :items="items"
        @click="handleClick"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的面包屑用法。',
      },
    },
  },
}

// 自定义分隔符
export const CustomSeparator: Story = {
  render: () => ({
    components: { JvBreadcrumb },
    setup() {
      const items = [
        {
          key: '1',
          label: '首页',
        },
        {
          key: '2',
          label: '组件',
        },
        {
          key: '3',
          label: '面包屑',
        },
      ]

      return { items }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <jv-breadcrumb
          :items="items"
          separator=">"
        />
        <jv-breadcrumb
          :items="items"
          separator-icon="chevron-right"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以自定义分隔符文本或图标。',
      },
    },
  },
}

// 自定义内容
export const CustomContent: Story = {
  render: () => ({
    components: { JvBreadcrumb },
    setup() {
      const items = [
        {
          key: '1',
          label: '首页',
          icon: 'home',
        },
        {
          key: '2',
          label: '组件',
        },
        {
          key: '3',
          label: '面包屑',
        },
      ]

      return { items }
    },
    template: `
      <jv-breadcrumb :items="items">
        <template #item="{ item }">
          <span style="color: #1976D2;">{{ item.label }}</span>
        </template>
        <template #separator>
          <span style="color: #FF4081;">|</span>
        </template>
      </jv-breadcrumb>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过插槽自定义面包屑项和分隔符的内容。',
      },
    },
  },
}
