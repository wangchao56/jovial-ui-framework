import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTimeline from '../src/JvTimeline.vue'

describe('jvTimeline', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTimeline)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
