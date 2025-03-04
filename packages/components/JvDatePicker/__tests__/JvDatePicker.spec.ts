import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvDatePicker from '../src/JvDatePicker.vue'

describe('jvDatePicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvDatePicker)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
