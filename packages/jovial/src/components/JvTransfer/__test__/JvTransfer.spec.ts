import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTransfer from '../src/JvTransfer.vue'

describe('jvTransfer', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTransfer)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
