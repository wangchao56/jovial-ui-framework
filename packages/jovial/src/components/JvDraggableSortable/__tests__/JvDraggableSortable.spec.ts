import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvDraggableSortable from '../src/JvDraggableSortable.vue'

describe('jvDraggableSortable', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvDraggableSortable)
    expect(wrapper.exists()).toBe(true)
  })

  // 添加更多测试用例
})
