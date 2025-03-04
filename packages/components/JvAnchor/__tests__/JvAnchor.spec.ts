import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvAnchor from '../src/JvAnchor.vue'

describe('jvAnchor', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvAnchor)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
