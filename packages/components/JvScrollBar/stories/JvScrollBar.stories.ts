import type { Meta, StoryObj } from '@storybook/vue3'
import JvScrollBar from '@components/JvScrollBar/src/JvScrollBar.vue'

const meta: Meta<typeof JvScrollBar> = {
  title: '通用组件/JvScrollBar',
  component: JvScrollBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof JvScrollBar>

export const Basic: Story = {
  render: () => ({
    components: { JvScrollBar },
    template: `
      <JvScrollBar style="height: 300px">
        <div style="height: 1000px">
          <p v-for="i in 20" :key="i">Scroll Content {{ i }}</p>
        </div>
      </JvScrollBar>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { JvScrollBar },
    template: `
      <JvScrollBar>
        <div style="width: 1000px; white-space: nowrap">
          <span v-for="i in 20" :key="i" style="margin-right: 20px">
            Horizontal Content {{ i }}
          </span>
        </div>
      </JvScrollBar>
    `,
  }),
}

export const AlwaysVisible: Story = {
  render: () => ({
    components: { JvScrollBar },
    template: `
      <JvScrollBar :always="true" style="height: 300px">
        <div style="height: 1000px">
          <p v-for="i in 20" :key="i">Always Visible {{ i }}</p>
        </div>
      </JvScrollBar>
    `,
  }),
}
