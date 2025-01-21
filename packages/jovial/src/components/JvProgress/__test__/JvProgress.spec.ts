import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvProgress from '../src/JvProgress.vue'

describe('jvProgress', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvProgress)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
