import type { Meta, StoryObj } from '@storybook/vue3'
import JvLoading from '@components/JvLoading/src/JvLoading.vue'

const meta = {
  title: 'Components/JvLoading',
  component: JvLoading,
  tags: ['autodocs'],

  args: {
    size: 40,
    color: '#333',
    count: 8,
    speed: 1.2,
  },

  argTypes: {
    size: {
      description: '加载动画大小(px)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 40 },
      },
    },
    color: {
      description: '点的颜色',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#333' },
      },
    },
    count: {
      description: '点的数量',
      control: { type: 'number', min: 4, max: 12 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 8 },
      },
    },
    speed: {
      description: '动画速度(秒)',
      control: { type: 'number', min: 0.5, max: 3, step: 0.1 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1.2 },
      },
    },
  },
} satisfies Meta<typeof JvLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}

export const CustomColors: Story = {
  render: () => ({
    components: { JvLoading },
    template: `
      <div style="display: flex; gap: 20px;">
        <JvLoading color="#409EFF" />
        <JvLoading color="#67C23A" />
        <JvLoading color="#E6A23C" />
        <JvLoading color="#F56C6C" />
      </div>
    `,
  }),
}

export const Speeds: Story = {
  render: () => ({
    components: { JvLoading },
    template: `
      <div style="display: flex; gap: 20px;">
        <JvLoading :speed="0.8" />
        <JvLoading :speed="1.2" />
        <JvLoading :speed="1.6" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { JvLoading },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <JvLoading :size="20" />
        <JvLoading :size="30" />
        <JvLoading :size="40" />
        <JvLoading :size="50" />
      </div>
    `,
  }),
}
