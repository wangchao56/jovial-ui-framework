import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvInfiniteScroll from '../src/JvInfiniteScroll.vue'

describe('jvInfiniteScroll', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvInfiniteScroll)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
