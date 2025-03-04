import type { Meta, StoryObj } from '@storybook/vue3'
import JvTag from '@/components/JvTag/src/JvTag.vue'
import { JvCol, JvColSpace, JvRow } from '@/components/Layout'
import { ref } from 'vue'
import JvProgress from '../src/JvProgress.vue'

const meta: Meta<typeof JvProgress> = {
  title: '数据展示组件/JvProgress',
  component: JvProgress,
  tags: ['autodocs'],
  args: {
    percentage: 50,
    type: 'line',
    strokeWidth: 10,
    showText: true,
    textInside: false,
    textPosition: 'right',
    width: 350,
    strokeRadius: 15,
    bgColor: '#f5f5f5',
    valueColor: '#409eff',
    size: 'medium',
  },
  argTypes: {
  },
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
        <jv-progress :percentage="20" value-color="#67c23a" />
        <jv-progress :percentage="40" value-color="#e6a23c" bg-color="#f5f5f5" />
        <jv-progress :percentage="60" value-color="#f56c6c" bg-color="#f5f5f5" />
        <jv-progress :percentage="80" value-color="#909399" bg-color="#f5f5f5" />
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
        <jv-progress :percentage="50" :stroke-width="6"  />
        <jv-progress :percentage="50" :stroke-width="12" />
        <jv-progress :percentage="50" :stroke-width="18" />
      </div>
    `,
  }),
}

// 文字内显
export const TextInside: Story = {
  args: {
    percentage: 50,
    textInside: true,
    strokeWidth: 18,
  },
  render: args => ({
    components: { JvProgress, JvCol, JvRow, JvColSpace, JvTag },
    setup() {
      return { args }
    },
    template: `
      <jv-row :gutter="[20,20]" no-wrap>
        <jv-col-space :span="12" space-align="start" space-justify="start" space-direction="vertical">
          <jv-tag type="info">left</jv-tag>
          <jv-progress :percentage="30" v-bind="args"  :text-inside="args.textInside" :stroke-width="args.strokeWidth" text-position="left" />
          <jv-tag type="info">center</jv-tag>
          <jv-progress :percentage="60" v-bind="args"  :text-inside="args.textInside" :stroke-width="args.strokeWidth" color="#67c23a" text-position="center"  />
          <jv-tag type="info">right</jv-tag>
          <jv-progress :percentage="80" v-bind="args"  :text-inside="args.textInside" :stroke-width="args.strokeWidth" color="#67c23a" text-position="right"  />
        </jv-col-space>
      </jv-row>
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

// 文字位置
export const TextPosition: Story = {
  args: {
    showText: true,
    textInside: false,
    percentage: 50,
    textPosition: 'bottom',
  },
  render: args => ({
    setup() {
      return { args }
    },
    components: { JvProgress, JvTag, JvRow, JvCol, JvColSpace },
    template: `
    <jv-row :gutter="[20,20]" no-wrap>
      <jv-col-space :span="12"  space-align="start" space-justify="start" space-direction="vertical">
      <jv-tag type="info">top</jv-tag>
      <jv-progress :percentage="20" color="#67c23a" text-position="top" />  
      <jv-tag type="info">bottom</jv-tag>
      <jv-progress :percentage="40" color="#e6a23c" text-position="bottom" />
      <jv-tag type="info">left</jv-tag>
      <jv-progress :percentage="60" color="#f56c6c" text-position="left" />
      <jv-tag type="info">right</jv-tag>
      <jv-progress :percentage="80" color="#909399" text-position="right" />
      </jv-col-space>
      <jv-col :span="12">
      <jv-tag type="info">top-left</jv-tag>
      <jv-progress :percentage="20" color="#67c23a" text-position="top-left" />
      <jv-tag type="info">bottom-left</jv-tag>
      <jv-progress :percentage="40" color="#e6a23c" text-position="bottom-left" />
      <jv-tag type="info">top-right</jv-tag>
      <jv-progress :percentage="20" color="#67c23a" text-position="top-right" />
      <jv-tag type="info">bottom-right</jv-tag>
      <jv-progress :percentage="40" color="#e6a23c" text-position="bottom-right" />
      </jv-col>
    </jv-row>
    `,
  }),
}

// 圆形进度条
export const Circle: Story = {
  args: {
    percentage: 50,
    type: 'circle',
    strokeWidth: 10,
    width: 120,
  },
}

// 自定义文字
export const CustomText: Story = {
  args: {
    percentage: 50,
    type: 'line',
    showText: true,
  },
  render: args => ({
    components: { JvProgress },
    setup() {
      return { args }
    },
    template: `
      <jv-progress v-bind="args">
        <template #text="{ percentage }">
          {{ percentage + '自定' }}
        </template>
      </jv-progress>
    `,
  }),
}
// 尺寸
export const Size: Story = {
  render: () => ({
    components: { JvProgress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-progress :percentage="50" :size="small" />  
        <jv-progress :percentage="50" :size="medium" />  
        <jv-progress :percentage="50" :size="large" />  
      </div>
    `,
  }),
}
