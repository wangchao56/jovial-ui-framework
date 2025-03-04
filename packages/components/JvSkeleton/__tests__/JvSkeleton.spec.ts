import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSkeleton from '../src/JvSkeleton.vue'

describe('jvSkeleton', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvSkeleton)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
