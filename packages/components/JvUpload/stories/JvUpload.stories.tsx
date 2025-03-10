import type { Meta, StoryObj } from '@storybook/vue3'
import JvUpload from '@components/JvUpload'

const meta = {
  title: '数据录入组件/JvUpload',
  component: JvUpload,
  tags: ['autodocs'],
  args: {
    multiple: true,
    accept: 'image/*',
    maxSize: 1024 * 1024 * 5,
    maxCount: 5,
  },
} satisfies Meta<typeof JvUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    multiple: true,
    accept: 'image/*',
    maxSize: 1024 * 1024 * 5,
    maxCount: 5,
  },
  render: args => ({
    components: { JvUpload },
    setup() {
      return { args }
    },
    template: <JvUpload v-bind="args" />,
  }),
}
