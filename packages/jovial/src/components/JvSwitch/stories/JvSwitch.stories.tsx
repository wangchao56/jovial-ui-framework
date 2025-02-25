import type { Meta, StoryObj } from '@storybook/vue3'
import JvSwitch from '@components/JvSwitch/src/JvSwitch.vue'

const meta = {
  title: '数据录入组件/JvSwitch',
  component: JvSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '开关状态',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '开关大小',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
  },
  args: {
    modelValue: false,
    size: 'default',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof JvSwitch>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      const modelValue = ref(false)
      return { args, modelValue }
    },
    template: '<jv-switch v-model="modelValue" v-bind="args" />',
  }),
  args: {
    modelValue: false,
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      return {
        args: {
          size: 'small',
          modelValue: false,
        },
      }
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <jv-switch v-bind="args" />
        <jv-switch v-bind="args" />
        <jv-switch v-bind="args" />
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvSwitch },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <jv-switch :model-value="false" disabled />
        <jv-switch :model-value="true" disabled />
      </div>
    `,
  }),
}

// 加载状态
export const Loading: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const loading = ref(false)
      const value = ref(false)

      // 模拟异步操作
      const handleClick = async () => {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 5000))
        loading.value = false
      }

      return {
        value,
        loading,
        handleClick,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- 受控的loading状态 -->
        <div style="display: flex; gap: 20px; align-items: center;">
          <span>受控loading:</span>
          <jv-switch 
            v-model="value"
            :loading="loading"
            @click="handleClick"
            manual
          />
          <span>value: {{ value }}</span>
        </div>

        <!-- 不同状态组合 -->
        <div style="display: flex; gap: 20px; align-items: center;">
          <jv-switch :model-value="false" loading />
          <jv-switch :model-value="true" loading />
          <jv-switch :model-value="false" loading disabled />
          <jv-switch :model-value="true" loading disabled />
        </div>

        <!-- 不同尺寸 -->
        <div style="display: flex; gap: 20px; align-items: center;">
          <jv-switch size="small" loading />
          <jv-switch loading />
          <jv-switch size="large" loading />
        </div>
      </div>
    `,
  }),
}
