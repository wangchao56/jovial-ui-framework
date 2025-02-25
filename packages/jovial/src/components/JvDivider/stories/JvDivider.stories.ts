import type { Meta, StoryObj } from '@storybook/vue3'
import JvDivider from '@components/JvDivider/src/JvDivider.vue'

const template = ` 
      <JvDivider v-bind="args" />
     `
const meta = {
  title: '布局组件/JvDivider',
  component: JvDivider,

  tags: ['autodocs'],
  args: {
    titlePosition: 'center',
    dashed: false,
    strokeWidth: 1,
    margin: 16,
    direction: 'horizontal',
    length: 'full',
  },

  argTypes: {
    title: {
      description: '分割线标题',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    direction: {
      description: '分割线方向',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    color: {
      description: '分割线颜色',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#c8c8c8' },
      },
    },
    titlePosition: {
      description: '标题位置',
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' },
      },
    },
    length: {
      description: '分割线长度，可以是数字(px)或"full"',
      control: 'text',
      table: {
        type: { summary: 'number | "full"' },
        defaultValue: { summary: 'full' },
      },
    },
    strokeWidth: {
      description: '线条宽度(px)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    dashed: {
      description: '是否虚线',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    margin: {
      description: '上下间距(px)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    titleBackground: {
      description: '标题背景色',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#ffffff' },
      },
    },
  },

} satisfies Meta<typeof JvDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template,
  }),
}

export const WithTitle: Story = {
  args: {
    title: '标题文本',
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <JvDivider v-bind="args" />
      <JvDivider title="左对齐" titlePosition="left" />
      <JvDivider title="居中对齐" titlePosition="center" />
      <JvDivider title="右对齐" titlePosition="right" />
    `,
  }),
}

export const CustomStyle: Story = {
  args: {
    title: '自定义样式',
    color: '#409EFF',
    strokeWidth: 2,
    dashed: true,
    titleBackground: '#f0f0f0',
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template,
  }),
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    length: 50,
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 100px; display: flex; align-items: center;">
        <span>文本</span>
        <JvDivider v-bind="args" />
        <span>文本</span>
        <JvDivider v-bind="args" />
        <span>文本</span>
      </div>
    `,
  }),
}

export const DifferentLengths: Story = {
  render: () => ({
    components: { JvDivider },
    template: `
      <JvDivider length="full" title="full width" />
      <JvDivider :length="300" title="300px" />
      <JvDivider :length="200" title="200px" />
    `,
  }),
}
