import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvResult from '../src/JvResult.vue'

describe('jvResult', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvResult)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
