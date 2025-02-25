import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTextarea from '../src/JvTextarea.vue'

describe('jv-textarea', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTextarea)
    expect(wrapper.exists()).toBe(true)
  })

  it('emits update:modelValue event when input', async () => {
    const wrapper = mount(JvTextarea)
    const textarea = wrapper.find('textarea')
    await textarea.setValue('test')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('respects disabled prop', () => {
    const wrapper = mount(JvTextarea, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.find('textarea').element.disabled).toBe(true)
  })

  // 添加更多测试用例
})
