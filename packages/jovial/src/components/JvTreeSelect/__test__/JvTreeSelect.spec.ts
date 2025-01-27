import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTreeSelect from '../src/JvTreeSelect.vue'

describe('jvTreeSelect', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTreeSelect)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
