import type { Meta, StoryObj } from '@storybook/vue3'
import JvAlert from '@components/JvAlert'
import { JvButton } from '@components/JvButton'
import JvIcon from '@components/JvIcon'
import { ref } from 'vue'

const meta = {
  title: '反馈组件/JvAlert',
  component: JvAlert,
  tags: ['autodocs'],
  args: {
    type: 'info',
    variant: 'filled',
    title: 'Alert title',
    message: 'This is an alert message.',
    dismissible: true,
    icon: '',
    showIcon: true,
    closeText: '',
    visible: true,
    dense: false,
  },
  argTypes: {
    type: {
      description: '警告框类型',
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
    },
    variant: {
      description: '警告框样式变体',
      control: { type: 'select' },
      options: ['filled', 'outlined', 'border-left'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
      },
    },
    title: {
      description: '警告框标题',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    message: {
      description: '警告框内容',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    dismissible: {
      description: '是否可关闭',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      description: '自定义图标名称',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showIcon: {
      description: '是否显示图标',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeText: {
      description: '关闭按钮文本',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    dense: {
      description: '是否使用紧凑模式',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    visible: {
      description: '是否显示警告框',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
} satisfies Meta<typeof JvAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    visible: true,
  },
  render: args => ({
    components: { JvButton, JvAlert },
    setup() {
      const visible = ref(true)
      const handleToggle = () => {
        visible.value = !visible.value
      }
      return { args, visible, handleToggle }
    },
    template: `
      <div>
        <JvButton @click="handleToggle" type="primary" style="margin-bottom: 16px;">{{ visible ? '隐藏' : '显示' }}</JvButton>
        <JvAlert v-model:visible="visible" v-bind="args" />
      </div>
    `,
  }),
}

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '展示不同类型的警告框，包括信息（info）、成功（success）、警告（warning）和错误（error）。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvAlert type="info" title="信息提示" message="这是一条信息提示，用于展示一般性信息。" />
        <JvAlert type="success" title="成功提示" message="这是一条成功提示，用于展示操作成功的反馈。" />
        <JvAlert type="warning" title="警告提示" message="这是一条警告提示，用于展示需要注意的信息。" />
        <JvAlert type="error" title="错误提示" message="这是一条错误提示，用于展示操作失败或错误信息。" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '展示不同样式变体的警告框，包括填充（filled）、轮廓（outlined）和左边框（border-left）。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvAlert type="info" variant="filled" title="填充样式" message="这是填充样式的提示，背景色为主题色，文字为对比色。" />
        <JvAlert type="success" variant="outlined" title="轮廓样式" message="这是轮廓样式的提示，有边框但背景透明。" />
        <JvAlert type="warning" variant="border-left" title="左边框样式" message="这是左边框样式的提示，只有左侧有边框。" />
        
        <JvAlert type="error" variant="filled" title="错误填充样式" message="不同类型的填充样式。" />
        <JvAlert type="info" variant="outlined" title="信息轮廓样式" message="不同类型的轮廓样式。" />
        <JvAlert type="success" variant="border-left" title="成功左边框样式" message="不同类型的左边框样式。" />
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示带图标的警告框，可以使用默认图标、自定义图标或不显示图标。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvAlert type="info" title="默认图标" message="根据类型自动显示对应的默认图标。" showIcon />
        <JvAlert type="success" title="默认成功图标" message="成功类型的默认图标。" showIcon />
        <JvAlert type="warning" title="默认警告图标" message="警告类型的默认图标。" showIcon />
        <JvAlert type="error" title="默认错误图标" message="错误类型的默认图标。" showIcon />
        
        <JvAlert type="info" title="自定义图标" message="使用自定义图标替代默认图标。" icon="jv-icon-star" />
        <JvAlert type="success" title="无图标" message="不显示任何图标。" :showIcon="false" />
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示可关闭的警告框，点击关闭按钮可以隐藏警告框。',
      },
    },
  },
  render: () => ({
    components: { JvAlert, JvButton },
    setup() {
      const visible1 = ref(true)
      const visible2 = ref(true)
      const visible3 = ref(true)

      const handleClose = (type: string) => {
        console.log(`${type} alert closed`)
      }

      const resetAll = () => {
        visible1.value = true
        visible2.value = true
        visible3.value = true
      }

      return { visible1, visible2, visible3, handleClose, resetAll }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvButton @click="resetAll" type="primary" style="align-self: flex-start; margin-bottom: 8px;">重置所有警告框</JvButton>
        
        <JvAlert 
          v-model:visible="visible1" 
          type="info" 
          title="可关闭" 
          message="点击右侧关闭按钮关闭此警告框。" 
          dismissible 
          @close="handleClose('info')" 
        />
        
        <JvAlert 
          v-model:visible="visible2" 
          type="success" 
          title="自定义关闭文本" 
          message="使用文本替代关闭图标。" 
          dismissible 
          closeText="关闭" 
          @close="handleClose('success')" 
        />
        
        <JvAlert 
          v-model:visible="visible3" 
          type="error" 
          title="关闭事件" 
          message="关闭时触发close事件，可在控制台查看日志。" 
          dismissible 
          @close="handleClose('error')" 
        />
      </div>
    `,
  }),
}

export const Dense: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示紧凑模式的警告框，适用于空间有限的场景。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvAlert type="info" title="标准尺寸" message="这是标准尺寸的警告框，提供正常的内边距和字体大小。" showIcon />
        <JvAlert type="info" title="紧凑尺寸" message="这是紧凑尺寸的警告框，内边距和字体大小更小，适合空间有限的场景。" dense showIcon />
        
        <JvAlert type="success" variant="outlined" title="标准轮廓样式" message="标准尺寸的轮廓样式。" showIcon />
        <JvAlert type="success" variant="outlined" title="紧凑轮廓样式" message="紧凑尺寸的轮廓样式。" dense showIcon />
        
        <JvAlert type="warning" variant="border-left" title="标准左边框样式" message="标准尺寸的左边框样式。" showIcon />
        <JvAlert type="warning" variant="border-left" title="紧凑左边框样式" message="紧凑尺寸的左边框样式。" dense showIcon />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示如何使用插槽自定义警告框的内容，包括标题、内容和图标。',
      },
    },
  },
  render: () => ({
    components: { JvAlert, JvButton, JvIcon },
    setup() {
      const visible = ref(true)
      const resetAlert = () => {
        visible.value = true
      }
      return { visible, resetAlert }
    },
    template: `
      <div>
        <JvButton @click="resetAlert" type="primary" style="margin-bottom: 16px;" v-if="!visible">重新显示警告框</JvButton>
        
        <JvAlert v-model:visible="visible" type="info" dismissible>
          <template #title>
            <div style="display: flex; align-items: center; gap: 8px;">
              <JvIcon name="jv-icon-star" style="color: #FFD700;" />
              <span style="color: #1976d2; font-weight: bold;">自定义标题</span>
            </div>
          </template>
          
          <template #message>
            <div>
              <p>这是自定义内容，可以包含<strong>HTML</strong>元素。</p>
              <p>甚至可以包含多个段落和其他组件。</p>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <JvButton size="small" type="primary">确认</JvButton>
                <JvButton size="small">取消</JvButton>
              </div>
            </div>
          </template>
          
          <template #icon>
            <div style="font-size: 24px; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background-color: #E3F2FD; border-radius: 50%;">
              🚀
            </div>
          </template>
        </JvAlert>
        
        <JvAlert type="success" style="margin-top: 16px;">
          <template #default>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <div>
                <div style="font-weight: bold; margin-bottom: 4px;">完全自定义布局</div>
                <div>使用默认插槽可以完全自定义警告框的内容和布局。</div>
              </div>
              <JvButton size="small" type="success">操作</JvButton>
            </div>
          </template>
        </JvAlert>
      </div>
    `,
  }),
}

export const WithoutTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示没有标题的警告框，只显示消息内容。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvAlert type="info" message="这是一条没有标题的信息提示，只显示消息内容。" showIcon />
        <JvAlert type="success" message="这是一条没有标题的成功提示，只显示消息内容。" showIcon />
        <JvAlert type="warning" message="这是一条没有标题的警告提示，只显示消息内容。" showIcon />
        <JvAlert type="error" message="这是一条没有标题的错误提示，只显示消息内容。" showIcon />
      </div>
    `,
  }),
}

export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story: '展示在不同屏幕尺寸下的警告框响应式布局。',
      },
    },
  },
  render: () => ({
    components: { JvAlert },
    template: `
      <div>
        <p style="margin-bottom: 16px;">尝试调整浏览器窗口大小，查看警告框的响应式布局：</p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <JvAlert 
            type="info" 
            title="响应式警告框" 
            message="在小屏幕上，警告框会自动调整布局以适应屏幕宽度。文字较长时会自动换行，确保内容完整显示。" 
            showIcon 
          />
          <JvAlert 
            type="warning" 
            title="长文本内容" 
            message="这是一段较长的文本内容，用于测试警告框在不同屏幕宽度下的表现。当屏幕宽度较小时，文本会自动换行，确保用户可以阅读完整内容。警告框的宽度会自动适应父容器的宽度。" 
            showIcon 
            dismissible
          />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '交互式演示，可以调整各种属性查看效果。',
      },
    },
  },
  args: {
    type: 'info',
    variant: 'filled',
    title: 'Playground',
    message:
      '您可以在这里调整各种属性，查看效果变化。尝试更改类型、变体、是否显示图标等属性。',
    dismissible: true,
    showIcon: true,
    dense: false,
    closeText: '',
  },
  render: args => ({
    components: { JvAlert, JvButton },
    setup() {
      const visible = ref(true)
      const handleReset = () => {
        visible.value = true
      }
      return { args, visible, handleReset }
    },
    template: `
      <div>
        <JvButton @click="handleReset" type="primary" style="margin-bottom: 16px;" v-if="!visible">重置显示</JvButton>
        <JvAlert  v-bind="args" />
      </div>
    `,
  }),
}
