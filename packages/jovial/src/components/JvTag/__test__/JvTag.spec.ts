import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTag from '../src/JvTag.vue'

describe('jvTag', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTag)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-tag')
  })

  it('renders different types correctly', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(JvTag, {
        props: { type },
      })
      expect(wrapper.classes()).toContain(`jv-tag--${type}`)
    })
  })

  it('renders different sizes correctly', () => {
    const sizes = ['small', 'medium', 'large']
    sizes.forEach((size) => {
      const wrapper = mount(JvTag, {
        props: { size },
      })
      expect(wrapper.classes()).toContain(`jv-tag--${size}`)
    })
  })

  it('renders round tag when round prop is true', () => {
    const wrapper = mount(JvTag, {
      props: { round: true },
    })
    expect(wrapper.classes()).toContain('jv-tag--round')
  })

  it('renders close button when closable is true', () => {
    const wrapper = mount(JvTag, {
      props: { closable: true },
    })
    expect(wrapper.find('.jv-tag__close').exists()).toBe(true)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(JvTag, {
      props: { closable: true },
    })
    await wrapper.find('.jv-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renders default slot content', () => {
    const wrapper = mount(JvTag, {
      slots: {
        default: 'Tag Content',
      },
    })
    expect(wrapper.text()).toContain('Tag Content')
  })
})
