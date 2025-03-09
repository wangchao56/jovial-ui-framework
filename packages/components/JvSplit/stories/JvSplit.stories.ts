import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvSplit from '../index'

const meta: Meta<typeof JvSplit> = {
  title: '布局组件/JvSplit',
  component: JvSplit,
  tags: ['autodocs'],
  argTypes: {
    'direction': {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '分割方向',
      defaultValue: 'horizontal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    'triggerSize': {
      control: 'number',
      description: '分割条大小',
      defaultValue: 10,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: '是否禁用拖拽',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'defaultSize': {
      control: 'text',
      description: '默认尺寸，可以是百分比（如 "50%"）或像素值（如 "200px"）或 0-1 之间的数值',
      defaultValue: '50%',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '50%' },
      },
    },
    'size': {
      control: 'text',
      description: '受控尺寸，可以是百分比（如 "50%"）或像素值（如 "200px"）或 0-1 之间的数值',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    'min': {
      control: 'text',
      description: '最小尺寸，可以是百分比（如 "10%"）或像素值（如 "100px"）或 0-1 之间的数值',
      defaultValue: '0%',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '0%' },
      },
    },
    'max': {
      control: 'text',
      description: '最大尺寸，可以是百分比（如 "90%"）或像素值（如 "500px"）或 0-1 之间的数值',
      defaultValue: '100%',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '100%' },
      },
    },
    'paneOneClass': {
      control: 'text',
      description: '第一个面板的自定义类名',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'paneOneStyle': {
      control: 'object',
      description: '第一个面板的自定义样式',
      table: {
        type: { summary: 'string | Record<string, any>' },
        defaultValue: { summary: '' },
      },
    },
    'paneTwoClass': {
      control: 'text',
      description: '第二个面板的自定义类名',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'paneTwoStyle': {
      control: 'object',
      description: '第二个面板的自定义样式',
      table: {
        type: { summary: 'string | Record<string, any>' },
        defaultValue: { summary: '' },
      },
    },
    'onUpdate:size': {
      description: '拖拽时更新尺寸的事件',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    'onDragStart': {
      description: '拖拽开始事件',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    'onDragMove': {
      description: '拖拽移动事件',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    'onDragEnd': {
      description: '拖拽结束事件',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
JvSplit 组件用于创建可调整大小的分割面板。支持水平和垂直分割，可以通过拖拽分割条来调整两个面板的大小比例。

## 功能特点

- 支持水平和垂直分割
- 支持自定义分割条大小和样式
- 支持最小/最大尺寸限制
- 支持受控和非受控模式
- 支持自定义面板样式
- 提供拖拽相关事件

## 使用场景

- 代码编辑器的分割视图
- 文件管理器的预览区域
- 可调整大小的侧边栏
- 任何需要用户自定义布局的界面
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof JvSplit>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; border: 1px solid #ccc;">
        <JvSplit v-bind="args">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
          </template>
          <template #paneTwo>
            <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    defaultSize: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '基础的水平分割面板，默认左侧占30%宽度。',
      },
    },
  },
}

// 垂直分割
export const Vertical: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; border: 1px solid #ccc;">
        <JvSplit v-bind="args">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">上方面板</div>
          </template>
          <template #paneTwo>
            <div style="padding: 20px; height: 100%; background: #f0f0f0;">下方面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'vertical',
    defaultSize: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '垂直分割面板，默认上方占30%高度。',
      },
    },
  },
}

// 自定义分割条
export const CustomTrigger: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; border: 1px solid #ccc;">
        <JvSplit v-bind="args">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
          </template>
          <template #trigger>
            <div style="width: 100%; height: 100%; background: #1890ff; display: flex; align-items: center; justify-content: center;">
              <div style="width: 2px; height: 20px; background: #fff;"></div>
            </div>
          </template>
          <template #paneTwo>
            <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    triggerSize: 10,
    defaultSize: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '通过 trigger 插槽自定义分割条的样式。',
      },
    },
  },
}

// 禁用拖拽
export const Disabled: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; border: 1px solid #ccc;">
        <JvSplit v-bind="args">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
          </template>
          <template #paneTwo>
            <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    disabled: true,
    defaultSize: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '禁用拖拽功能，分割条将不会显示。',
      },
    },
  },
}

// 受控模式
export const Controlled: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      const currentSize = ref(args.size || 0.3)

      const updateSize = (size: string | number) => {
        currentSize.value = size
      }

      return { args, currentSize, updateSize }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <p>当前尺寸: {{ currentSize }}</p>
          <button @click="currentSize = '200px'" style="margin-right: 8px;">设置为 200px</button>
          <button @click="currentSize = 0.5" style="margin-right: 8px;">设置为 50%</button>
          <button @click="currentSize = '40%'" style="margin-right: 8px;">设置为 40%</button>
        </div>
        <div style="height: 300px; border: 1px solid #ccc;">
          <JvSplit 
            v-bind="args" 
            :size="currentSize" 
            @update:size="updateSize"
          >
            <template #paneOne>
              <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
            </template>
            <template #paneTwo>
              <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
            </template>
          </JvSplit>
        </div>
      </div>
    `,
  }),
  args: {
    size: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '受控模式下，通过 size 属性和 update:size 事件控制分割面板的大小。',
      },
    },
  },
}

// 尺寸限制
export const SizeLimit: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; border: 1px solid #ccc;">
        <JvSplit v-bind="args">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板 (最小 30%, 最大 70%)</div>
          </template>
          <template #paneTwo>
            <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    defaultSize: 0.5,
    min: 0.3,
    max: 0.7,
  },
  parameters: {
    docs: {
      description: {
        story: '通过 min 和 max 属性限制分割面板的大小范围。',
      },
    },
  },
}

// 嵌套分割面板
export const Nested: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 400px; border: 1px solid #ccc;">
        <JvSplit direction="horizontal" defaultSize="30%">
          <template #paneOne>
            <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
          </template>
          <template #paneTwo>
            <JvSplit direction="vertical" defaultSize="50%">
              <template #paneOne>
                <div style="padding: 20px; height: 100%; background: #f0f0f0;">右上方面板</div>
              </template>
              <template #paneTwo>
                <div style="padding: 20px; height: 100%; background: #e8e8e8;">右下方面板</div>
              </template>
            </JvSplit>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '嵌套使用分割面板，创建复杂的布局。',
      },
    },
  },
}

// 事件监听
export const Events: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      const eventLog = ref<string[]>([])

      const logEvent = (event: string, data: any) => {
        eventLog.value.unshift(`${event}: ${JSON.stringify(data)}`)
        if (eventLog.value.length > 5) {
          eventLog.value.pop()
        }
      }

      const onDragStart = (evt: MouseEvent) => {
        logEvent('dragStart', { x: evt.clientX, y: evt.clientY })
      }

      const onDragMove = (evt: MouseEvent) => {
        logEvent('dragMove', { x: evt.clientX, y: evt.clientY })
      }

      const onDragEnd = (evt: MouseEvent) => {
        logEvent('dragEnd', { x: evt.clientX, y: evt.clientY })
      }

      const onUpdateSize = (size: string | number) => {
        logEvent('update:size', size)
      }

      return {
        args,
        eventLog,
        onDragStart,
        onDragMove,
        onDragEnd,
        onUpdateSize,
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <h3>事件日志 (最近5条):</h3>
          <pre style="background: #f5f5f5; padding: 10px; max-height: 150px; overflow: auto;">{{ eventLog.join('\\n') }}</pre>
        </div>
        <div style="height: 300px; border: 1px solid #ccc;">
          <JvSplit 
            v-bind="args"
            @dragStart="onDragStart"
            @dragMove="onDragMove"
            @dragEnd="onDragEnd"
            @update:size="onUpdateSize"
          >
            <template #paneOne>
              <div style="padding: 20px; height: 100%; background: #f5f5f5;">左侧面板</div>
            </template>
            <template #paneTwo>
              <div style="padding: 20px; height: 100%; background: #f0f0f0;">右侧面板</div>
            </template>
          </JvSplit>
        </div>
      </div>
    `,
  }),
  args: {
    defaultSize: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story: '监听分割面板的拖拽事件，包括 dragStart、dragMove、dragEnd 和 update:size。',
      },
    },
  },
}
