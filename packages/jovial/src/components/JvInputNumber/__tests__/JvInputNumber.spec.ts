import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvInputNumber from '../src/JvInputNumber.vue'

describe('jvInputNumber', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvInputNumber)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
