import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvCarousel from '../src/JvCarousel.vue'

const meta = {
  title: 'Data Display/Carousel',
  component: JvCarousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '轮播图组件，用于循环播放图片、文字等内容。',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: '当前激活项',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    autoplay: {
      control: 'boolean',
      description: '是否自动播放',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    interval: {
      control: 'number',
      description: '自动播放间隔',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '轮播方向',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    effect: {
      control: 'select',
      options: ['slide', 'fade'],
      description: '切换动画',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"slide"' },
      },
    },
    indicatorPosition: {
      control: 'select',
      options: ['inside', 'outside', 'none'],
      description: '指示器位置',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"inside"' },
      },
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loop: {
      control: 'boolean',
      description: '是否循环播放',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
} satisfies Meta<typeof JvCarousel>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvCarousel },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div style="width: 600px; height: 300px;">
        <jv-carousel v-model="current">
          <div style="background: #364d79; color: #fff; text-align: center; line-height: 300px;">1</div>
          <div style="background: #64a19d; color: #fff; text-align: center; line-height: 300px;">2</div>
          <div style="background: #66bb6a; color: #fff; text-align: center; line-height: 300px;">3</div>
        </jv-carousel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的轮播图用法。',
      },
    },
  },
}

// 垂直方向
export const Vertical: Story = {
  render: () => ({
    components: { JvCarousel },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div style="width: 600px; height: 300px;">
        <jv-carousel
          v-model="current"
          direction="vertical"
        >
          <div style="background: #364d79; color: #fff; text-align: center; line-height: 300px;">1</div>
          <div style="background: #64a19d; color: #fff; text-align: center; line-height: 300px;">2</div>
          <div style="background: #66bb6a; color: #fff; text-align: center; line-height: 300px;">3</div>
        </jv-carousel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '垂直方向的轮播图。',
      },
    },
  },
}

// 淡入淡出
export const Fade: Story = {
  render: () => ({
    components: { JvCarousel },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div style="width: 600px; height: 300px;">
        <jv-carousel
          v-model="current"
          effect="fade"
        >
          <div style="background: #364d79; color: #fff; text-align: center; line-height: 300px;">1</div>
          <div style="background: #64a19d; color: #fff; text-align: center; line-height: 300px;">2</div>
          <div style="background: #66bb6a; color: #fff; text-align: center; line-height: 300px;">3</div>
        </jv-carousel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '使用淡入淡出效果。',
      },
    },
  },
}

// 自定义指示器
export const CustomIndicator: Story = {
  render: () => ({
    components: { JvCarousel },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div style="width: 600px; height: 300px;">
        <jv-carousel v-model="current">
          <div style="background: #364d79; color: #fff; text-align: center; line-height: 300px;">1</div>
          <div style="background: #64a19d; color: #fff; text-align: center; line-height: 300px;">2</div>
          <div style="background: #66bb6a; color: #fff; text-align: center; line-height: 300px;">3</div>
          <template #indicator="{ index, active }">
            <div :style="{
              width: '20px',
              height: '20px',
              background: '#fff',
              borderRadius: '50%',
              opacity: active ? 1 : 0.5,
              transform: active ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              margin: '0 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#666'
            }">
              {{ index + 1 }}
            </div>
          </template>
        </jv-carousel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '自定义指示器的样式。',
      },
    },
  },
}
