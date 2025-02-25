import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvLayout from '../src/JvLayout.vue'

describe('jvLayout', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvLayout)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
