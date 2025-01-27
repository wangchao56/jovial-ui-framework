import type { Meta, StoryObj } from '@storybook/vue3'
import JvRadio from '../src/JvRadio.vue'

const meta: Meta<typeof JvRadio> = {
  title: 'Components/JvRadio',
  component: JvRadio,
  tags: ['autodocs'],
  args: {
    label: 'Radio Label',
    value: 'radioValue',
    modelValue: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Radio component for selecting options.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Current value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: 'text',
      description: 'Value of the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof JvRadio>

// Basic usage
export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Radio Label',
    value: 'radioValue',
  },
  render: args => ({
    components: { JvRadio },
    setup() {
      return { args }
    },
    template: '<JvRadio v-bind="args" />',
  }),
}

export const Checked: Story = {
  args: {
    modelValue: true,
    label: 'Checked Radio',
    value: 'radioValue',
  },
  render: args => ({
    components: { JvRadio },
    setup() {
      return { args }
    },
    template: '<JvRadio v-bind="args" />',
  }),
}
