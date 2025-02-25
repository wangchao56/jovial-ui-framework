import * as stories from '@/components/JvButton/stories/JvButton.stories'
import { composeStories } from '@storybook/vue3'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvButton from '../src/JvButton.vue'

const { TestButton } = composeStories(stories)

describe('jvButton', async () => {
  it('renders  default props', async () => {
    await TestButton.run()
  })
  it('renders correctly with default props', () => {
    const wrapper = mount(JvButton)
    expect(wrapper.classes()).toContain('jv-button')
    expect(wrapper.text()).toBe('')
  })

  it('renders correctly with a label', () => {
    const wrapper = mount(JvButton, {
      slots: {
        default: 'Button Label',
      },
    })
    expect(wrapper.text()).toBe('Button Label')
  })

  it('applies the correct size class', () => {
    const wrapper = mount(JvButton, {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.classes()).toContain('jv-button--large')
  })

  it('applies the correct type class', () => {
    const wrapper = mount(JvButton, {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('jv-button--primary')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(JvButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(JvButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(JvButton, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.find('.jv-button__loader').exists()).toBe(true)
  })
})
