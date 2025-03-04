import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvVideo from '../src/JvVideo.vue'

describe('jvVideo', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvVideo)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
