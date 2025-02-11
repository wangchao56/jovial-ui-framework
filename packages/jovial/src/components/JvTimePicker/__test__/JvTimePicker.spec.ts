import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvTimePicker from '../src/JvTimePicker.vue'

describe('jvTimePicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvTimePicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('should update model value', async () => {
    const wrapper = mount(JvTimePicker, {
      props: {
        'modelValue': '09:00',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })
    await wrapper.find('input').setValue('10:30')
    expect(wrapper.props('modelValue')).toBe('10:30')
  })

  it('disabled should work', () => {
    const wrapper = mount(JvTimePicker, {
      props: { disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('should validate time format', async () => {
    const wrapper = mount(JvTimePicker, {
      props: {
        'modelValue': '25:00',
        'onUpdate:modelValue': vi.fn(),
      },
    })
    expect(wrapper.find('.jv-timePicker__input').classes()).toContain('is-error')
  })

  it('should handle time selection', async () => {
    const wrapper = mount(JvTimePicker)
    await wrapper.find('.jv-timePicker__input').trigger('click')
    const firstHour = wrapper.findAll('.jv-timePicker__time-item')[0]
    await firstHour.trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['00:00'])
  })

  // 添加更多测试用例
})
