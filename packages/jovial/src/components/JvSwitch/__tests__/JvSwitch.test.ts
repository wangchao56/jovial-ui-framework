import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvSwitch from '../src/JvSwitch.vue'

describe('jvSwitch 组件', () => {
  // 基础渲染测试
  it('应该正确渲染开关组件', () => {
    const wrapper = mount(JvSwitch)
    expect(wrapper.find('.jv-switch').exists()).toBe(true)
    expect(wrapper.find('.jv-switch__core').exists()).toBe(true)
  })

  // 默认值测试
  it('应该使用默认值', () => {
    const wrapper = mount(JvSwitch)
    expect(wrapper.classes()).not.toContain('jv-switch--checked')
    expect(wrapper.classes()).not.toContain('jv-switch--disabled')
    expect(wrapper.classes()).not.toContain('jv-switch--loading')
  })

  // 值绑定测试
  it('应该正确响应v-model绑定', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        'modelValue': true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.classes()).toContain('jv-switch--checked')

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false])
  })

  // 禁用状态测试
  it('在禁用状态下不应该响应点击', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        disabled: true,
        modelValue: false,
      },
    })

    expect(wrapper.classes()).toContain('jv-switch--disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })

  // 尺寸测试
  it('应该正确渲染不同尺寸', () => {
    const sizes = ['small', 'default', 'large']
    sizes.forEach((size) => {
      const wrapper = mount(JvSwitch, {
        props: {
          'size': size as 'default' | 'small' | 'large',
          'modelValue': false,
          'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e }),
        },
      })
      expect(wrapper.classes()).toContain(`jv-switch--${size}`)
    })
  })

  // 手动加载状态测试
  it('应该正确处理手动加载状态', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        manual: true,
        loading: false,
      },
    })

    // 点击触发loading
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()

    // 设置loading状态
    await wrapper.setProps({ loading: true })
    expect(wrapper.classes()).toContain('jv-switch--loading')

    // loading结束后应该更新状态
    await wrapper.setProps({ loading: false })
    expect(wrapper.classes()).not.toContain('jv-switch--loading')
  })

  // 自动加载状态测试
  it('应该正确处理自动加载状态', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        loading: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-switch--loading')

    // loading状态下不应该响应点击
    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()

    // loading结束后可以正常点击
    await wrapper.setProps({ loading: false })
    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
  })

  // change事件测试
  it('应该正确触发change事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        onChange,
      },
    })

    await wrapper.trigger('click')
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
