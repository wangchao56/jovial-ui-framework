import type { Meta, StoryObj } from '@storybook/vue3'
import JvAffix from '@components/JvAffix/src/JvAffix.vue'
import JvButton from '@components/JvButton/src/JvButton.vue'

const meta: Meta<typeof JvAffix> = {
  title: '导航组件/JvAffix',
  component: JvAffix,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof JvAffix>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvAffix, JvButton },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <JvAffix :offset="80">
          <JvButton type="primary">固定在顶部</JvButton>
        </JvAffix>
      </div>
    `,
  }),
}

// 底部固定
export const FixedBottom: Story = {
  render: () => ({
    components: { JvAffix, JvButton },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <JvAffix position="bottom" :bottom-offset="20">
          <JvButton type="primary">固定在底部</JvButton>
        </JvAffix>
      </div>
    `,
  }),
}

// 自定义容器
export const CustomContainer: Story = {
  render: () => ({
    components: { JvAffix, JvButton },
    template: `
      <div 
        ref="container" 
        style="height: 200px; overflow: auto; border: 1px solid #ccc; padding: 20px;"
      >
        <div style="height: 400px; padding: 20px;">
          <JvAffix :target="getContainer" :offset="0">
            <JvButton type="primary">在容器内固定</JvButton>
          </JvAffix>
        </div>
      </div>
    `,
    methods: {
      getContainer() {
        return this.$refs.container as HTMLElement
      },
    },
  }),
}

// 监听事件
export const WithEvents: Story = {
  render: () => ({
    components: { JvAffix, JvButton },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <JvAffix 
          :offset="100"
          @change="onChange"
          @scroll="onScroll"
        >
          <JvButton type="primary">监听事件</JvButton>
        </JvAffix>
      </div>
    `,
    methods: {
      onChange(fixed: boolean) {
        console.log(`固定状态改变: ${fixed}`)
      },
      onScroll(data: { scrollTop: number, fixed: boolean }) {
        console.log(`滚动事件: ${data}`)
      },
    },
  }),
}

// 不同偏移距离
export const DifferentOffsets: Story = {
  render: () => ({
    components: { JvAffix, JvButton },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <div style="margin-bottom: 10px;">
          <JvAffix :offset="50">
            <JvButton type="primary">偏移 50px</JvButton>
          </JvAffix>
        </div>
        <div style="margin-bottom: 10px;">
          <JvAffix :offset="100">
            <JvButton type="primary">偏移 100px</JvButton>
          </JvAffix>
        </div>
        <div>
          <JvAffix :offset="150">
            <JvButton type="primary">偏移 150px</JvButton>
          </JvAffix>
        </div>
      </div>
    `,
  }),
}
