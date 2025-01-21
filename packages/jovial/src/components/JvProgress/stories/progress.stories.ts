import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvProgress from '../src/JvProgress.vue'

const meta: Meta<typeof JvProgress> = {
  title: 'Components/Progress 进度条',
  component: JvProgress,
  tags: ['autodocs'],
  render: args => ({
    components: { JvProgress },
    setup() {
      return { args }
    },
    template: '<jv-progress v-bind="args" />',
  }),
}

export default meta
type Story = StoryObj<typeof JvProgress>

// 基础用法
export const Basic: Story = {
  args: {
    percentage: 50,
  },
}

// 不同颜色
export const Colors: Story = {
  render: () => ({
    components: { JvProgress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-progress :percentage="20" color="#67c23a" />
        <jv-progress :percentage="40" color="#e6a23c" />
        <jv-progress :percentage="60" color="#f56c6c" />
        <jv-progress :percentage="80" color="#909399" />
      </div>
    `,
  }),
}

// 不同粗细
export const StrokeWidth: Story = {
  render: () => ({
    components: { JvProgress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-progress :percentage="50" :stroke-width="6" />
        <jv-progress :percentage="50" :stroke-width="12" />
        <jv-progress :percentage="50" :stroke-width="18" />
      </div>
    `,
  }),
}

// 文字内显
export const TextInside: Story = {
  render: () => ({
    components: { JvProgress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-progress :percentage="70" :text-inside="true" :stroke-width="18" />
        <jv-progress :percentage="80" :text-inside="true" :stroke-width="18" color="#67c23a" />
      </div>
    `,
  }),
}

// 动态进度
export const Dynamic: Story = {
  render: () => ({
    components: { JvProgress },
    setup() {
      const percentage = ref(0)

      const increase = () => {
        percentage.value += 10
        if (percentage.value > 100) {
          percentage.value = 100
        }
      }

      const decrease = () => {
        percentage.value -= 10
        if (percentage.value < 0) {
          percentage.value = 0
        }
      }

      return { percentage, increase, decrease }
    },
    template: `
      <div>
        <jv-progress :percentage="percentage" />
        <div style="margin-top: 20px;">
          <button @click="decrease">-</button>
          <button @click="increase">+</button>
        </div>
      </div>
    `,
  }),
}

// 隐藏文字
export const HideText: Story = {
  args: {
    percentage: 50,
    showText: false,
  },
}
