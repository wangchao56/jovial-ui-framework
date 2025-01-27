import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvLoadingBar from '../src/JvLoadingBar.vue'

const meta = {
  title: 'Components/LoadingBar',
  component: JvLoadingBar,
  tags: ['autodocs'],
  argTypes: {
    percentage: {
      control: { type: 'number', min: 0, max: 100 },
      description: '加载进度百分比',
    },
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: '加载条类型',
    },
    height: {
      control: 'text',
      description: '加载条高度',
    },
    active: {
      control: 'boolean',
      description: '是否显示动画效果',
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10 },
      description: '进度条粗细',
    },
    shadow: {
      control: 'boolean',
      description: '是否显示阴影效果',
    },
  },
} satisfies Meta<typeof JvLoadingBar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: args => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(0)

      // 模拟加载进度
      const startLoading = () => {
        percentage.value = 0
        const timer = setInterval(() => {
          if (percentage.value < 100) {
            percentage.value += 10
          }
          else {
            clearInterval(timer)
          }
        }, 1000)
      }

      // 自动开始加载
      startLoading()

      return { args, percentage }
    },
    template: '<JvLoadingBar v-bind="args" :percentage="percentage" />',
  }),
  args: {
    type: 'primary',
    active: true,
  },
}

export const Types: Story = {
  render: () => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(70)
      return { percentage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvLoadingBar :percentage="percentage" type="primary" />
        <JvLoadingBar :percentage="percentage" type="success" />
        <JvLoadingBar :percentage="percentage" type="warning" />
        <JvLoadingBar :percentage="percentage" type="error" />
      </div>
    `,
  }),
}

export const WithAnimation: Story = {
  render: () => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(70)
      return { percentage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvLoadingBar :percentage="percentage" active />
        <JvLoadingBar :percentage="percentage" type="success" active />
      </div>
    `,
  }),
}

export const CustomHeight: Story = {
  render: () => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(70)
      return { percentage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvLoadingBar :percentage="percentage" height="2px" />
        <JvLoadingBar :percentage="percentage" height="4px" />
        <JvLoadingBar :percentage="percentage" height="8px" />
      </div>
    `,
  }),
}

export const CustomStrokeWidth: Story = {
  render: () => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(70)
      return { percentage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvLoadingBar :percentage="percentage" :stroke-width="1" />
        <JvLoadingBar :percentage="percentage" :stroke-width="2" />
        <JvLoadingBar :percentage="percentage" :stroke-width="4" />
        <JvLoadingBar :percentage="percentage" :stroke-width="6" />
      </div>
    `,
  }),
}

export const WithShadow: Story = {
  render: () => ({
    components: { JvLoadingBar },
    setup() {
      const percentage = ref(70)
      return { percentage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvLoadingBar :percentage="percentage" shadow />
        <JvLoadingBar :percentage="percentage" type="success" shadow />
        <JvLoadingBar :percentage="percentage" type="warning" shadow active />
        <JvLoadingBar :percentage="percentage" type="error" shadow />
      </div>
    `,
  }),
}
