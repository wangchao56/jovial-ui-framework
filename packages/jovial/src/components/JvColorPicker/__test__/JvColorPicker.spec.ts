import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvColorPicker from '../src/JvColorPicker.vue'

describe('jvColorPicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvColorPicker)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
