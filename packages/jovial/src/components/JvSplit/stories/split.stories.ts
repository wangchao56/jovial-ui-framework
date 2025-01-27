import type { Meta, StoryObj } from '@storybook/vue3'
import JvSplit from '../index'

const meta: Meta<typeof JvSplit> = {
  title: 'Components/Split',
  component: JvSplit,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '分割方向',
      defaultValue: 'horizontal',
    },
    triggerSize: {
      control: 'number',
      description: '分割条大小',
      defaultValue: 3,
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用拖拽',
      defaultValue: false,
    },
    defaultSize: {
      control: 'text',
      description: '默认尺寸',
      defaultValue: '0.5',
    },
    size: {
      control: 'text',
      description: '受控尺寸',
    },
    min: {
      control: 'text',
      description: '最小尺寸',
      defaultValue: '0',
    },
    max: {
      control: 'text',
      description: '最大尺寸',
      defaultValue: '1',
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
          <template #pane-1>
            <div style="padding: 20px;">左侧面板</div>
          </template>
          <template #pane-2>
            <div style="padding: 20px;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    defaultSize: 0.3,
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
          <template #pane-1>
            <div style="padding: 20px;">上方面板</div>
          </template>
          <template #pane-2>
            <div style="padding: 20px;">下方面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    direction: 'vertical',
    defaultSize: 0.3,
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
          <template #pane-1>
            <div style="padding: 20px;">左侧面板</div>
          </template>
          <template #trigger>
            <div style="width: 100%; height: 100%; background: #1890ff; display: flex; align-items: center; justify-content: center;">
              <div style="width: 2px; height: 20px; background: #fff;"></div>
            </div>
          </template>
          <template #pane-2>
            <div style="padding: 20px;">右侧面板</div>
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
          <template #pane-1>
            <div style="padding: 20px;">左侧面板</div>
          </template>
          <template #pane-2>
            <div style="padding: 20px;">右侧面板</div>
          </template>
        </JvSplit>
      </div>
    `,
  }),
  args: {
    disabled: true,
    defaultSize: 0.3,
  },
}

// 受控模式
export const Controlled: Story = {
  render: args => ({
    components: { JvSplit },
    setup() {
      return { args }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <button @click="args.size = '200px'">设置为 200px</button>
          <button @click="args.size = 0.5" style="margin-left: 8px;">设置为 50%</button>
        </div>
        <div style="height: 300px; border: 1px solid #ccc;">
          <JvSplit v-bind="args">
            <template #pane-1>
              <div style="padding: 20px;">左侧面板</div>
            </template>
            <template #pane-2>
              <div style="padding: 20px;">右侧面板</div>
            </template>
          </JvSplit>
        </div>
      </div>
    `,
  }),
  args: {
    size: 0.3,
  },
}
