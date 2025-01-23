import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvContainer from '../src/JvContainer.vue'

describe('jvContainer', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvContainer)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
