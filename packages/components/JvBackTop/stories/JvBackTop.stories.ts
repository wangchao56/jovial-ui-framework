import type { Meta, StoryObj } from '@storybook/vue3'
import JvBacktop from '@components/JvBacktop'

const meta: Meta<typeof JvBacktop> = {
  title: '导航组件/JvBacktop',
  component: JvBacktop,
  tags: ['autodocs'],
  argTypes: {
    visibilityHeight: {
      description: '滚动高度达到此参数值才出现',
      control: { type: 'number' },
    },
    target: {
      description: '回到顶部的目标元素',
      control: { type: 'text' },
    },
    duration: {
      description: '滚动动画持续时间（毫秒）',
      control: { type: 'number' },
    },
    right: {
      description: '距离右侧距离（像素）',
      control: { type: 'number' },
    },
    bottom: {
      description: '距离底部距离（像素）',
      control: { type: 'number' },
    },
    onClick: { action: 'click' },
    onScroll: { action: 'scroll' },
  },
}

export default meta
type Story = StoryObj<typeof JvBacktop>

// 创建一个长内容的容器用于演示
function LongContent() {
  const content = Array.from({ length: 20 }).fill(0).map((_, index) => `
    <div style="padding: 20px; background: #f5f5f5; margin: 20px 0;">
      这是第 ${index + 1} 段内容
    </div>
  `).join('')

  return `
    <div style="height: 1300px; overflow: auto;" id="container">
      ${content}
    </div>
  `
}

export const Default: Story = {
  render: () => ({
    components: { JvBacktop },
    template: `
      <div  style="height: 50vh; overflow: auto;">
        ${LongContent()}
        <JvBacktop :visibility-height="100" target="#container" />
      </div>
    `,
  }),
}

export const CustomStyle: Story = {
  render: () => ({
    components: { JvBacktop },
    template: `
      <div  style="height: 50vh; overflow: auto;">
        ${LongContent()}
        <JvBacktop :right="100" :bottom="100" target="#container" >
          <div style="
            background-color: #409eff;
            color: white;
            padding: 10px 16px;
            border-radius: 4px;
          ">
            返回顶部
          </div>
        </JvBacktop>
      </div>
    `,
  }),
}

export const CustomTarget: Story = {
  render: () => ({
    components: { JvBacktop },
    template: `
      <div>
        <div style="height: 300px; overflow: auto;" id="custom-container">
          ${LongContent()}
        </div>
        <JvBacktop target="#custom-container" :visibilityHeight="200"  />
      </div>
    `,
  }),
}
