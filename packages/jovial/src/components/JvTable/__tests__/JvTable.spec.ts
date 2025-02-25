import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTable from '../src/JvTable.vue'

describe('jvTable', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTable)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
