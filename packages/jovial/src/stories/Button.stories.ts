import JvButton from '@components/JvButton'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: JvButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] }
  },
  args: {
    type: 'primary',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn()
  }
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
    type: 'primary'
  }
}

// export const Secondary: Story = {
//   args: {
//     type: false,
//     label: 'Button'
//   }
// }

// export const Large: Story = {
//   args: {
//     label: 'Button',
//     size: 'large'
//   }
// }

// export const Small: Story = {
//   args: {
//     label: 'Button',
//     size: 'small'
//   }
// }
