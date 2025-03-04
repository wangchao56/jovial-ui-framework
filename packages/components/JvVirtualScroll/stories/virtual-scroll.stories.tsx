import type { Meta, StoryObj } from '@storybook/vue3'
import JvVirtualScroll from '../src/virtual-scroll'

const meta = {
  title: '高级组件/JvVirtualScroll',
  component: JvVirtualScroll,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    itemHeight: { control: 'number' },
    remain: { control: 'number' },
    size: { control: 'number' },
  },
} satisfies Meta<typeof JvVirtualScroll>

export default meta
type Story = StoryObj<typeof meta>

// 生成测试数据
function generateItems(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
  }))
}

export const Basic: Story = {
  args: {
    items: generateItems(1000),
    itemHeight: 40,
    remain: 10,
    size: 40,
  },
  render: args => ({
    components: { JvVirtualScroll },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 400px;">
        <JvVirtualScroll v-bind="args">
          <template #default="{ node }">
            <div style="height: 40px; line-height: 40px; padding: 0 16px; border-bottom: 1px solid #eee;">
              {{ node.text }}
            </div>
          </template>
        </JvVirtualScroll>
      </div>
    `,
  }),
}

export const LargeDataset: Story = {
  args: {
    items: generateItems(10000),
    itemHeight: 40,
    remain: 10,
    size: 40,
  },
  render: args => ({
    components: { JvVirtualScroll },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 400px;">
        <JvVirtualScroll v-bind="args">
          <template #default="{ node }">
            <div style="height: 40px; line-height: 40px; padding: 0 16px; border-bottom: 1px solid #eee;">
              {{ node.text }}
            </div>
          </template>
        </JvVirtualScroll>
      </div>
    `,
  }),
}
