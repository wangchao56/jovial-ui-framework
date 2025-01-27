import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSplit from '../src/JvSplit.vue'

describe('jvSplit', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvSplit)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
