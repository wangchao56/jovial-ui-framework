import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvRate from '../src/JvRate.vue'

const meta = {
  title: 'Form/Rate',
  component: JvRate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '评分组件，用于对事物进行评级。',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: '当前值',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '最大值',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    allowHalf: {
      control: 'boolean',
      description: '是否允许半选',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: '是否只读',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    size: {
      control: 'number',
      description: '图标大小',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '20' },
      },
    },
    gap: {
      control: 'number',
      description: '图标间距',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '4' },
      },
    },
    color: {
      control: 'color',
      description: '选中颜色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#fadb14' },
      },
    },
    voidColor: {
      control: 'color',
      description: '未选中颜色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#c0c4cc' },
      },
    },
    showText: {
      control: 'boolean',
      description: '是否显示提示文字',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof JvRate>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(3)
      return { value }
    },
    template: `
      <jv-rate v-model="value" />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的评分用法。',
      },
    },
  },
}

// 半选模式
export const AllowHalf: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(2.5)
      return { value }
    },
    template: `
      <jv-rate
        v-model="value"
        :allow-half="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '支持选择半星。',
      },
    },
  },
}

// 自定义图标
export const CustomIcon: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(3)
      return { value }
    },
    template: `
      <jv-rate
        v-model="value"
        icon="heart"
        void-icon="heart-outline"
        color="#ff4081"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以自定义图标和颜色。',
      },
    },
  },
}

// 提示文字
export const ShowText: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(3)
      return { value }
    },
    template: `
      <jv-rate
        v-model="value"
        :show-text="true"
        :texts="['极差', '失望', '一般', '满意', '惊喜']"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '显示提示文字。',
      },
    },
  },
}

// 只读状态
export const Readonly: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(3)
      return { value }
    },
    template: `
      <jv-rate
        v-model="value"
        :readonly="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '只读状态，无法进行鼠标交互。',
      },
    },
  },
}

// 自定义样式
export const CustomStyle: Story = {
  render: () => ({
    components: { JvRate },
    setup() {
      const value = ref(3)
      return { value }
    },
    template: `
      <jv-rate
        v-model="value"
        :size="30"
        :gap="8"
        color="#1976D2"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '自定义图标大小和间距。',
      },
    },
  },
}
