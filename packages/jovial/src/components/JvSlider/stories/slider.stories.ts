import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvSlider from '../src/JvSlider.vue'

const meta: Meta<typeof JvSlider> = {
  title: 'Components/Slider',
  component: JvSlider,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'number',
      description: '滑块的值',
    },
    min: {
      control: 'number',
      description: '最小值',
    },
    max: {
      control: 'number',
      description: '最大值',
    },
    step: {
      control: 'number',
      description: '步长',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '滑块方向',
    },
    showInput: {
      control: 'boolean',
      description: '是否显示输入框',
    },
    showTooltip: {
      control: 'boolean',
      description: '是否显示提示框',
    },
    showTicks: {
      control: 'boolean',
      description: '是否显示刻度',
    },
    marks: {
      control: 'object',
      description: '刻度标记',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvSlider>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider v-model="value" />
      </div>
    `,
  }),
}

// 显示输入框
export const WithInput: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider v-model="value" show-input />
      </div>
    `,
  }),
}

// 显示刻度
export const WithTicks: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider 
          v-model="value" 
          :step="10"
          show-ticks
        />
      </div>
    `,
  }),
}

// 带标记的刻度
export const WithMarks: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(25)
      const marks = {
        0: '很冷！',
        25: '凉爽',
        50: '适中',
        75: '暖和',
        100: '很热！',
      }
      return { value, marks }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider 
          v-model="value" 
          :step="25"
          :marks="marks"
          show-ticks
        />
      </div>
    `,
  }),
}

// 垂直方向
export const Vertical: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div style="height: 300px; padding: 20px;">
        <jv-slider 
          v-model="value" 
          orientation="vertical"
          show-tooltip
        />
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(30)
      return { value }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider v-model="value" disabled />
      </div>
    `,
  }),
}

// 完整功能展示
export const FullFeatured: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(25)
      const marks = {
        0: '很冷！',
        25: '凉爽',
        50: '适中',
        75: '暖和',
        100: '很热！',
      }
      return { value, marks }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider 
          v-model="value" 
          :step="25"
          :marks="marks"
          show-ticks
          show-input
          show-tooltip
        >
          <template #tooltip="{ value }">
            当前温度: {{ value }}°C
          </template>
        </jv-slider>
      </div>
    `,
  }),
}

// 自定义范围
export const CustomRange: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(0)
      return { value }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider 
          v-model="value" 
          :min="-20"
          :max="40"
          :step="5"
          show-ticks
          show-tooltip
        />
      </div>
    `,
  }),
}

// 事件处理
export const WithEvents: Story = {
  render: () => ({
    components: { JvSlider },
    setup() {
      const value = ref(50)
      const handleChange = (val: number) => {
        console.log('值改变:', val)
      }
      const handleInput = (val: number) => {
        console.log('输入中:', val)
      }
      return { value, handleChange, handleInput }
    },
    template: `
      <div style="width: 300px; padding: 20px;">
        <jv-slider 
          v-model="value"
          show-tooltip
          @change="handleChange"
          @input="handleInput"
        />
      </div>
    `,
  }),
}
