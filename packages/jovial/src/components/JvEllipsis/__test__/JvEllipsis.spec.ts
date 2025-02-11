import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvEllipsis from '../src/JvEllipsis.vue'

describe('jvEllipsis', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvEllipsis)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
