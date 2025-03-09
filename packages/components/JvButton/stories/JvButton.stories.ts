import type { Variant } from '@jienix/typings'
import type { Meta, StoryObj } from '@storybook/vue3'
import { JvButton } from '@components/JvButton'
import JvSpace from '@components/JvSpace'
import { expect, fn, within } from '@storybook/test'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: '通用组件/JvButton',
  component: JvButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'x-large'],
    },
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
    },
    variant: {
      control: 'select',
      options: ['text', 'plain', 'tonal', 'elevated', 'outlined', 'flat'],
    },
    loading: {
      control: 'boolean',
      description: '加载状态插槽',
    },
  },
  args: {
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

export const DefaultButton: Story = {
  args: {
    default: 'Default Button',
  },
  render: args => ({
    components: { JvButton, JvSpace },
    setup() {
      return { args }
    },
    template: `
      <JvButton v-bind="args">
        {{ args.default }}
      </JvButton>
    `,
  }),
}

export const TypeButton: Story = {
  args: {
    default: 'Primary Button',
  },
  render: args => ({
    components: { JvButton, JvSpace },
    setup() {
      const typeOptions = ['primary', 'success', 'warning', 'error', 'info']

      return { args, typeOptions }
    },
    template: `
      <JvSpace direction="vertical">
        <JvButton v-for="type in typeOptions" :key="type" :type="type" v-bind="args">
          {{ type }}
        </JvButton>
      </JvSpace>
    `,
  }),
}
export const SizeButton: Story = {
  args: {
    size: 'large',
    default: 'Large Button',
  },
  render: args => ({
    components: { JvButton, JvSpace },
    setup() {
      const sizeOptions = ['tiny', 'small', 'medium', 'large', 'x-large']

      return { args, sizeOptions }
    },
    template: `
      <JvSpace direction="vertical">
        <JvButton v-for="size in sizeOptions" :key="size" :size="size">
          {{ size }}
        </JvButton>
      </JvSpace>
    `,
  }),
}

export const VariantButton: Story = {
  args: {
    variant: 'text',
    default: 'Text Button',
  },
  render: args => ({
    components: { JvButton, JvSpace },
    setup() {
      const variantOptions: Variant[] = [
        'text',
        'plain',
        'tonal',
        'elevated',
        'outlined',
        'flat',
      ]

      return { args, variantOptions }
    },
    template: `
      <JvSpace direction="horizontal" justify="start" align="center" :size="16">
        <JvButton v-for="variant in variantOptions" :key="variant" :variant="variant">
          {{ variant }}
        </JvButton>
      </JvSpace>
    `,
  }),
}

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing

export const TestButton: Story = {
  args: {},
  render: args => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButton v-bind="args">
        {{ args.default }}
      </JvButton>
    `,
  }),
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Primary Button/i })
    await expect(button).toBeInTheDocument()
  },
}
