import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvCascader from '../src/JvCascader.vue'

describe('jvCascader', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvCascader)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
