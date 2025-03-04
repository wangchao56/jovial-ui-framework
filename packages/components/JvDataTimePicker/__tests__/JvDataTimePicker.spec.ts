import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvDataTimePicker from '../src/JvDataTimePicker.vue'

describe('jvDataTimePicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvDataTimePicker)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
