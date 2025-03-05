import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/JvButton.vue'
import JvDialog from '@components/JvDialog/src/JvDialog.vue'

const template = ` 
      <JvDialog v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </JvDialog>
     `
const meta = {
  title: '反馈组件/JvDialog',
  component: JvDialog,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '是否显示对话框',
    },
    title: {
      control: 'text',
      description: '对话框标题',
    },
  },
  args: {
    modelValue: true,
    title: 'Hello',
  },
} satisfies Meta<typeof JvDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Hello',
    modelValue: true,
  },
  render: args => ({
    components: { JvButton, JvDialog },
    setup() {
      return { args }
    },
    template,
  }),
}

export const DialogWithCustomTitle: Story = {
  args: {
    title: '自定义标题',
    modelValue: true,
  },
  render: args => ({
    components: { JvButton, JvDialog },
    setup() {
      return { args }
    },
    template,
  }),
}

export const DialogWithContent: Story = {
  args: {
    title: '带内容的对话框',
    modelValue: true,
  },
  render: args => ({
    components: { JvButton, JvDialog },
    setup() {
      return { args }
    },
    template: `
      <JvDialog v-bind="args">
        <template #default>
          <div style="padding: 20px">
            <p>这是对话框的内容区域</p>
            <p>可以放置任何自定义内容</p>
          </div>
        </template>
      </JvDialog>
    `,
  }),
}

export const DialogWithFooter: Story = {
  args: {
    title: '带底部按钮的对话框',
    modelValue: true,
  },
  render: args => ({
    components: { JvButton, JvDialog },
    setup() {
      return { args }
    },
    template: `
      <JvDialog v-bind="args">
        <template #default>
          <div style="padding: 20px">
            <p>这是对话框的内容</p>
          </div>
        </template>
        <template #footer>
          <div style="text-align: right">
            <JvButton variant="text">取消</JvButton>
            <JvButton>确定</JvButton>
          </div>
        </template>
      </JvDialog>
    `,
  }),
}
