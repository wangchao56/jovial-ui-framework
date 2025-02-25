import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvColorPicker from '../src/JvColorPicker.vue'

describe('jvColorPicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvColorPicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('shows default color value', () => {
    const wrapper = mount(JvColorPicker)
    const preview = wrapper.find('.jv-color-picker__color-preview')
    expect(preview.attributes('style')).toContain('background-color: #000000')
  })

  it('emits update:modelValue when color changes', async () => {
    const wrapper = mount(JvColorPicker)
    const input = wrapper.find('input[type="color"]')
    await input.setValue('#ff0000')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#ff0000'])
  })

  it('respects disabled prop', async () => {
    const wrapper = mount(JvColorPicker, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-color-picker--disabled')
    await wrapper.find('.jv-color-picker__trigger').trigger('click')
    expect(wrapper.find('.jv-color-picker__dropdown').exists()).toBe(false)
  })
})
