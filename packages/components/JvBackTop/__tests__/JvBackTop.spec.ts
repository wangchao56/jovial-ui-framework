import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvBackTop from '../src/JvBackTop.vue'

describe('jvBackTop', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvBackTop)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
