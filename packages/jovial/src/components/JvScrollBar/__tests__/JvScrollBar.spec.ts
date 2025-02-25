import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvScrollBar from '../src/JvScrollBar.vue'

describe('jvScrollBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvScrollBar)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
