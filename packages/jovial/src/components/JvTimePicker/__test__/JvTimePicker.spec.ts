import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTimePicker from '../src/JvTimePicker.vue'

describe('jvTimePicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTimePicker)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
