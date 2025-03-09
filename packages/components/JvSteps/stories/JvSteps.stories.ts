import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvSteps from '../src/JvSteps.vue'
/**
 * Steps 组件实现了以下功能：
 * 1. 水平和垂直两种布局
 * 2. 支持自定义图标
 * 3. 支持点击切换步骤
 * 4. 支持显示/隐藏序号和连接线
 * 5. 支持多种状态展示
 * 6. 支持自定义内容
 * 7. 完整的禁用状态
 */
const meta = {
  title: '导航组件/Steps',
  component: JvSteps,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '步骤条组件，引导用户按照流程完成任务。',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: '当前步骤',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '步骤条方向',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    clickable: {
      control: 'boolean',
      description: '是否启用点击切换',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIndex: {
      control: 'boolean',
      description: '是否显示序号',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showLine: {
      control: 'boolean',
      description: '是否显示连接线',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof JvSteps>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvSteps },
    setup() {
      const current = ref(1)
      const items = [
        {
          title: '步骤一',
          description: '这是步骤一的描述',
        },
        {
          title: '步骤二',
          description: '这是步骤二的描述',
        },
        {
          title: '步骤三',
          description: '这是步骤三的描述',
        },
      ]
      return { current, items }
    },
    template: `
      <jv-steps
        v-model="current"
        :items="items"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的步骤条用法。',
      },
    },
  },
}

// 垂直方向
export const Vertical: Story = {
  render: () => ({
    components: { JvSteps },
    setup() {
      const current = ref(1)
      const items = [
        {
          title: '步骤一',
          description: '这是步骤一的描述',
        },
        {
          title: '步骤二',
          description: '这是步骤二的描述',
        },
        {
          title: '步骤三',
          description: '这是步骤三的描述',
        },
      ]
      return { current, items }
    },
    template: `
      <jv-steps
        v-model="current"
        :items="items"
        direction="vertical"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '垂直方向的步骤条。',
      },
    },
  },
}

// 带图标
export const WithIcon: Story = {
  render: () => ({
    components: { JvSteps },
    setup() {
      const current = ref(1)
      const items = [
        {
          title: '登录',
          icon: 'user',
        },
        {
          title: '验证',
          icon: 'shield-check',
        },
        {
          title: '完成',
          icon: 'check-circle',
        },
      ]
      return { current, items }
    },
    template: `
      <jv-steps
        v-model="current"
        :items="items"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以设置自定义图标。',
      },
    },
  },
}

// 可点击
export const Clickable: Story = {
  render: () => ({
    components: { JvSteps },
    setup() {
      const current = ref(1)
      const items = [
        {
          title: '步骤一',
          description: '这是步骤一的描述',
        },
        {
          title: '步骤二',
          description: '这是步骤二的描述',
        },
        {
          title: '步骤三',
          description: '这是步骤三的描述',
        },
      ]

      const handleClick = (_index: number) => {
      }

      return { current, items, handleClick }
    },
    template: `
      <jv-steps
        v-model="current"
        :items="items"
        :clickable="true"
        @click="handleClick"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '设置可点击切换步骤。',
      },
    },
  },
}

// 自定义内容
export const CustomContent: Story = {
  render: () => ({
    components: { JvSteps },
    setup() {
      const current = ref(1)
      const items = [
        {
          title: '步骤一',
          description: '这是步骤一的描述',
        },
        {
          title: '步骤二',
          description: '这是步骤二的描述',
        },
        {
          title: '步骤三',
          description: '这是步骤三的描述',
        },
      ]
      return { current, items }
    },
    template: `
      <jv-steps
        v-model="current"
        :items="items"
      >
        <template #title="{ item, active }">
          <span :style="{ color: active ? '#1976D2' : '' }">
            {{ item.title }}
          </span>
        </template>
        <template #description="{ item, active }">
          <span :style="{ color: active ? '#1976D2' : '' }">
            {{ item.description }}
          </span>
        </template>
      </jv-steps>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以自定义步骤的标题和描述内容。',
      },
    },
  },
}
