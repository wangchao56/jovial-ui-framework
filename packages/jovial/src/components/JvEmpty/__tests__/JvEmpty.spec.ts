import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvEmpty from '../src/JvEmpty.vue'

describe('jvEmpty', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvEmpty)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
