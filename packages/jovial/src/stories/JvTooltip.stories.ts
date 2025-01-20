import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import JvTooltip from '@components/JvTooltip/src/JvTooltip.vue'

const template = `
      <JvTooltip v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </JvTooltip>
    `

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/JvTooltip',
  component: JvTooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  },
} satisfies Meta<typeof JvTooltip>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    content: 'Default Tooltip',
    trigger: 'hover',
  },

  render: args => ({
    components: { JvButton, JvTooltip },
    setup() {
      return { args }
    },
    template,
  }),
}

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing

// export const TestButton: Story = {
//   args: {
//     default: 'Primary Button',
//   },
//   render: args => ({
//     components: { JvTooltip },
//     setup() {
//       return { args }
//     },
//     template,
//   }),
//   play: async ({ canvasElement }: any) => {
//     const canvas = within(canvasElement)
//     const button = canvas.getByRole('button', { name: /Primary Button/i })
//     await expect(button).toBeInTheDocument()
//   },
// }
