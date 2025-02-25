import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSelect from '../src/JvSelect.vue'

describe('jvSelect', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvSelect)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
