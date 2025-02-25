import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvSkeleton from '../index'

const meta: Meta<typeof JvSkeleton> = {
  title: '反馈组件/JvSkeleton(骨架屏)',
  component: JvSkeleton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'avatar', 'button', 'image', 'card', 'list'],
      description: '骨架屏类型',
    },
    loading: {
      control: 'boolean',
      description: '是否显示骨架屏',
    },
    rows: {
      control: 'number',
      description: '行数',
    },
    animated: {
      control: 'boolean',
      description: '是否启用动画',
    },
    width: {
      control: 'text',
      description: '宽度',
    },
    height: {
      control: 'text',
      description: '高度',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvSkeleton>

// 基础文本骨架屏
export const Basic: Story = {
  render: () => ({
    components: { JvSkeleton },
    template: `
      <jv-skeleton type="text" :rows="3" style="width: 400px" />
    `,
  }),
}

// 不同类型的骨架屏
export const Types: Story = {
  render: () => ({
    components: { JvSkeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3>文本骨架屏</h3>
          <jv-skeleton type="text" :rows="3" style="width: 400px" />
        </div>
        
        <div>
          <h3>头像骨架屏</h3>
          <jv-skeleton type="avatar" />
        </div>
        
        <div>
          <h3>按钮骨架屏</h3>
          <jv-skeleton type="button" />
        </div>
        
        <div>
          <h3>图片骨架屏</h3>
          <jv-skeleton type="image" style="width: 400px" />
        </div>
        
        <div>
          <h3>卡片骨架屏</h3>
          <jv-skeleton type="card" style="width: 400px" />
        </div>
        
        <div>
          <h3>列表骨架屏</h3>
          <jv-skeleton type="list" :rows="3" style="width: 400px" />
        </div>
      </div>
    `,
  }),
}

// 动画效果
export const Animated: Story = {
  render: () => ({
    components: { JvSkeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3>有动画</h3>
          <jv-skeleton type="card" style="width: 400px" :animated="true" />
        </div>
        
        <div>
          <h3>无动画</h3>
          <jv-skeleton type="card" style="width: 400px" :animated="false" />
        </div>
      </div>
    `,
  }),
}

// 切换显示
export const SwitchContent: Story = {
  render: () => ({
    components: { JvSkeleton },
    setup() {
      const loading = ref(true)
      const toggleLoading = () => {
        loading.value = !loading.value
      }
      return { loading, toggleLoading }
    },
    template: `
      <div>
        <div class="demo-skeleton-switch">
          <jv-skeleton type="card" style="width: 400px" :loading="loading">
            <div class="demo-skeleton-content">
              <h3>这是实际内容</h3>
              <p>当 loading 结束时会显示这里的内容，并且会有平滑的过渡动画</p>
            </div>
          </jv-skeleton>
        </div>
        <button 
          @click="toggleLoading" 
          style="margin-top: 16px; padding: 8px 16px;"
        >
          {{ loading ? '显示内容' : '显示骨架屏' }}
        </button>
      </div>
    `,
  }),
}

// 自定义尺寸
export const CustomSize: Story = {
  render: () => ({
    components: { JvSkeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-skeleton 
          type="text" 
          width="200px"
          height="30px"
        />
        
        <jv-skeleton 
          type="avatar" 
          width="60px"
          height="60px"
        />
      </div>
    `,
  }),
}
