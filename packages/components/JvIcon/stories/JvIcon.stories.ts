import type { Meta, StoryObj } from '@storybook/vue3'
import JvIcon from '@/components/JvIcon/src/JvIcon.vue'
import { ZoomOutTwotone } from '@vicons/material'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: '通用组件/JvIcon',
  component: JvIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'x-large'],
      description: '图标的大小',
    },
    color: {
      control: 'color',
      description: '图标的颜色',
    },
  },
  args: {
    size: 'medium',
    color: '#000000',
  },
} satisfies Meta<typeof JvIcon>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: args => ({
    components: { JvIcon, ZoomOutTwotone },
    setup() {
      return { args }
    },
    template: `
      <JvIcon v-bind="args">
        <ZoomOutTwotone />
      </JvIcon>
    `,
  }),
}

export const Colored: Story = {
  args: {
    color: '#1ea7fd',
  },
  render: args => ({
    components: { JvIcon, ZoomOutTwotone },
    setup() {
      return { args }
    },
    template: `
      <JvIcon v-bind="args">
              <ZoomOutTwotone />
      </JvIcon>
    `,
  }),
}

export const SizeIcon: Story = {
  args: {
  },
  render: args => ({
    components: { JvIcon, ZoomOutTwotone },
    setup() {
      const sizeOptions = ['tiny', 'small', 'medium', 'large', 'x-large']

      return { args, sizeOptions }
    },
    template: `
    <JvSpace direction="vertical">
      <JvIcon v-for="size in sizeOptions" v-bind="args" :size="size">
         <ZoomOutTwotone />
      </JvIcon>
    </JvSpace>
    `,
  }),
}
