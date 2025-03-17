import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvAffix from '../src/JvAffix.vue'

// 元数据配置
const meta = {
  title: '导航组件/JvAffix',
  component: JvAffix,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: '固定的位置',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    offset: {
      control: { type: 'number' },
      description: '距离窗口顶部或底部的偏移量',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    zIndex: {
      control: { type: 'number' },
      description: 'z-index 值',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    enabled: {
      control: { type: 'boolean' },
      description: '是否启用固钉功能',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    customClass: {
      control: { type: 'text' },
      description: '自定义类名',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    targetMargin: {
      control: { type: 'number' },
      description: '滚动容器的外边距，影响固钉触发条件',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '主题',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    target: {
      description: '设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => window' },
      },
    },
    onChange: {
      action: 'change',
      description: '固定状态改变时触发',
      table: {
        type: { summary: '(fixed: boolean) => void' },
      },
    },
    onScroll: {
      action: 'scroll',
      description: '滚动时触发',
      table: {
        type: { summary: '(data: { scrollTop: number, fixed: boolean }) => void' },
      },
    },
    onReady: {
      action: 'ready',
      description: '组件初始化完成时触发',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof JvAffix>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    position: 'top',
    offset: 0,
    zIndex: 100,
  },
  render: args => ({
    components: { JvAffix },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 50vh; padding-top: 100px;">
        <JvAffix v-bind="args" @change="args.onChange" @scroll="args.onScroll" @ready="args.onReady">
          <div style="padding: 10px; background-color: #1976d2; color: white; width: 200px; text-align: center;">
            基础用法
          </div>
        </JvAffix>
      </div>
    `,
  }),
}

// 底部固定
export const Bottom: Story = {
  args: {
    position: 'bottom',
    offset: 20,
    zIndex: 100,
  },
  render: args => ({
    components: { JvAffix },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 50vh; padding-top: 100px;">
        <JvAffix v-bind="args" @change="args.onChange" @scroll="args.onScroll" @ready="args.onReady">
          <div style="padding: 10px; background-color: #ff5722; color: white; width: 200px; text-align: center;">
            底部固定
          </div>
        </JvAffix>
      </div>
    `,
  }),
}

// 自定义目标容器
export const CustomTarget: Story = {
  render: () => ({
    components: { JvAffix },
    setup() {
      const containerRef = ref<HTMLElement | null>(null)
      const getTarget = () => containerRef.value
      const fixed = ref(false)

      const handleChange = (value: boolean) => {
        fixed.value = value
      }

      return { containerRef, getTarget, fixed, handleChange }
    },
    template: `
      <div style="height: 400px; overflow: auto; border: 1px solid #ccc; position: relative;" ref="containerRef">
        <div style="height: 800px; padding-top: 100px;">
          <JvAffix :target="getTarget" @change="handleChange">
            <div style="padding: 10px; background-color: #4caf50; color: white; width: 200px; text-align: center;">
              {{ fixed ? '已固定' : '未固定' }} (在容器内滚动)
            </div>
          </JvAffix>
        </div>
      </div>
    `,
  }),
}

// 动态控制
export const DynamicControl: Story = {
  render: () => ({
    components: { JvAffix },
    setup() {
      const enabled = ref(true)
      const fixed = ref(false)
      const affixRef = ref(null)

      const toggleEnabled = () => {
        enabled.value = !enabled.value
      }

      const handleChange = (value: boolean) => {
        fixed.value = value
      }

      const manualSetFixed = () => {
        if (affixRef.value) {
          (affixRef.value as any).setFixed(!fixed.value)
        }
      }

      return { enabled, fixed, affixRef, toggleEnabled, handleChange, manualSetFixed }
    },
    template: `
      <div style="height: 50vh; padding-top: 100px;">
        <div style="margin-bottom: 20px;">
          <button @click="toggleEnabled" style="margin-right: 10px;">
            {{ enabled ? '禁用' : '启用' }}
          </button>
          <button @click="manualSetFixed">
            手动{{ fixed ? '取消固定' : '固定' }}
          </button>
          <span style="margin-left: 10px;">状态: {{ fixed ? '已固定' : '未固定' }}</span>
        </div>
        <JvAffix 
          ref="affixRef"
          :enabled="enabled" 
          @change="handleChange"
          :custom-class="fixed ? 'fixed-class' : ''"
        >
          <div style="padding: 10px; background-color: #9c27b0; color: white; width: 200px; text-align: center;">
            动态控制
          </div>
        </JvAffix>
      </div>
    `,
  }),
}

// 不同主题
export const Themes: Story = {
  render: () => ({
    components: { JvAffix },
    setup() {
      const theme = ref<'light' | 'dark'>('light')

      const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
      }

      return { theme, toggleTheme }
    },
    template: `
      <div style="height: 100vh; padding-top: 100px;">
        <button @click="toggleTheme" style="margin-bottom: 20px;">
          切换主题: {{ theme }}
        </button>
        <JvAffix :theme="theme">
          <div style="padding: 10px; background-color: #2196f3; color: white; width: 200px; text-align: center;">
            {{ theme }} 主题
          </div>
        </JvAffix>
      </div>
    `,
  }),
}
