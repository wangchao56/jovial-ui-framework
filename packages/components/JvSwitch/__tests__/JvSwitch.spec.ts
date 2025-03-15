import type { Size } from '@jienix/typings'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { switchSize } from '../src/JvSwitch'
import JvSwitch from '../src/JvSwitch.vue'

describe('jvSwitch', () => {
  // 基础渲染测试
  it('应该正确渲染', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-switch')
  })

  // 默认值测试
  it('应该使用默认值', () => {
    const wrapper = mount(JvSwitch)
    expect(wrapper.classes()).not.toContain('is-checked')
    expect(wrapper.classes()).not.toContain('jv-switch__is-disabled')
    expect(wrapper.classes()).not.toContain('jv-switch__is-loading')
    expect(wrapper.classes()).toContain('jv-switch--medium') // 默认尺寸
  })

  // 属性测试
  it('应该根据props正确渲染', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: true,
        disabled: true,
        loading: true,
        size: 'large' as Size,
      },
    })
    expect(wrapper.classes()).toContain('is-checked')
    expect(wrapper.classes()).toContain('jv-switch__is-disabled')
    expect(wrapper.classes()).toContain('jv-switch__is-loading')
    expect(wrapper.classes()).toContain('jv-switch--large')
  })

  // 尺寸测试
  it('应该支持不同尺寸', () => {
    const sizes = switchSize

    sizes.forEach((size) => {
      const wrapper = mount(JvSwitch, {
        props: { size },
      })
      expect(wrapper.classes()).toContain(`jv-switch--${size}`)
    })
  })

  // 自定义颜色测试
  it('应该支持自定义颜色', () => {
    const color = '#ff0000'
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: true,
        color,
      },
    })

    expect(wrapper.attributes('style')).toContain('--jv-switch-custom-color: #ff0000')
  })

  // 点击事件测试
  it('点击时应该触发事件并更新状态', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.trigger('click')

    // 检查是否发出了正确的事件
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change[0]).toEqual([true])

    // 测试从true切换到false
    await wrapper.setProps({ modelValue: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false])
  })

  // 禁用状态测试
  it('禁用状态下不应该响应点击', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    await wrapper.trigger('click')

    // 检查是否没有发出事件
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).not.toHaveProperty('change')
  })

  // 加载状态测试
  it('加载状态下不应该响应点击', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        loading: true,
      },
    })

    await wrapper.trigger('click')

    // 检查是否没有发出事件
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).not.toHaveProperty('change')
  })

  // 加载图标测试
  it('加载状态下应该显示加载图标', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.find('.jv-switch__loading-icon').exists()).toBe(true)
  })

  // 键盘操作测试
  it('应该支持键盘操作', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
      attachTo: document.body, // 需要附加到DOM以测试键盘事件
    })

    // 模拟空格键按下
    await wrapper.trigger('keydown.space')

    // 检查是否发出了正确的事件
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])

    // 测试Enter键
    await wrapper.setProps({ modelValue: false })
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([true])

    // 测试禁用状态下的键盘操作
    await wrapper.setProps({ modelValue: false, disabled: true })
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted()['update:modelValue'].length).toBe(2) // 没有新的事件

    // 测试加载状态下的键盘操作
    await wrapper.setProps({ modelValue: false, disabled: false, loading: true })
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted()['update:modelValue'].length).toBe(2) // 没有新的事件
  })

  // v-model 双向绑定测试
  it('应该正确处理v-model双向绑定', async () => {
    const wrapper = mount({
      components: { JvSwitch },
      template: '<jv-switch v-model="value" />',
      data() {
        return {
          value: false,
        }
      },
    })

    const switchComponent = wrapper.findComponent(JvSwitch)

    // 点击开关
    await switchComponent.trigger('click')

    // 检查父组件的数据是否更新
    expect(wrapper.vm.value).toBe(true)

    // 检查开关的状态是否更新
    expect(switchComponent.classes()).toContain('is-checked')

    // 再次点击
    await switchComponent.trigger('click')
    expect(wrapper.vm.value).toBe(false)
    expect(switchComponent.classes()).not.toContain('is-checked')
  })

  // 手动更新v-model测试
  it('当v-model值变化时应该更新UI', async () => {
    const wrapper = mount({
      components: { JvSwitch },
      template: '<jv-switch v-model="value" />',
      data() {
        return {
          value: false,
        }
      },
    })

    const switchComponent = wrapper.findComponent(JvSwitch)

    // 手动更新值
    await wrapper.setData({ value: true })

    // 检查开关的状态是否更新
    expect(switchComponent.classes()).toContain('is-checked')

    // 再次更新
    await wrapper.setData({ value: false })
    expect(switchComponent.classes()).not.toContain('is-checked')
  })

  // 无障碍性测试
  it('应该有正确的ARIA属性', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.attributes('role')).toBe('switch')
    expect(wrapper.attributes('aria-checked')).toBe('false')

    // 更新为选中状态
    wrapper.setProps({ modelValue: true })

    expect(wrapper.attributes('aria-checked')).toBe('true')

    // 测试禁用状态的ARIA属性
    wrapper.setProps({ disabled: true })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  // 事件回调测试
  it('应该正确调用事件回调', async () => {
    const onChange = vi.fn()
    const onClick = vi.fn()

    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        onChange,
        onClick,
      },
    })

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(true)

    // 重置mock
    onChange.mockClear()
    onClick.mockClear()

    // 测试禁用状态下不调用回调
    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()

    // 测试加载状态下不调用回调
    await wrapper.setProps({ disabled: false, loading: true })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })

  // 测试input事件
  it('应该正确处理input事件', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setValue(true)
    await input.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change[0]).toEqual([true])
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
  })

  // 测试主题类
  it('应该应用主题类', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
      },
      global: {
        mocks: {
          useTheme: () => ({
            themeClasses: { value: ['theme-dark'] },
          }),
        },
      },
    })

    expect(wrapper.classes()).toContain('theme-dark')
  })
})
