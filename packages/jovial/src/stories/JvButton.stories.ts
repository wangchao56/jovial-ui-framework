import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import { expect, fn, within } from '@storybook/test'

const template = `
      <JvButton v-bind="args">
        <template v-if="args.prepend" #prepend>{{ args.prepend }}</template>
        <template v-if="args.append" #append>{{ args.append }}</template>
        <template v-if="args.loading" #loading>Loading...</template>
        {{ args.default }}
      </JvButton>
    `

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: JvButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'x-large'],
    },
    default: {
      control: 'text',
      description: '默认插槽内容',
    },
    prepend: {
      control: 'text',
      description: '前置插槽内容',
    },
    append: {
      control: 'text',
      description: '后置插槽内容',
    },
    loading: {
      control: 'boolean',
      description: '加载状态插槽',
    },
  },
  args: {
    type: 'primary',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
} satisfies Meta<typeof JvButton>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    type: 'primary',
    default: 'Primary Button',
  },
  render: args => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template,
  }),
}
export const Large: Story = {
  args: {
    size: 'large',
    default: 'Large Button',
  },
  render: args => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template,
  }),
}

export const Small: Story = {
  args: {
    size: 'small',
    default: 'Small Button',
  },
  render: args => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template,
  }),
}

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing

export const TestButton: Story = {
  args: {
    default: 'Primary Button',
  },
  render: args => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template,
  }),
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Primary Button/i })
    await expect(button).toBeInTheDocument()
  },
}
