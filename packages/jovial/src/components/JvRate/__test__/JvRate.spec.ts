import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import JvRate from '../src/JvRate.vue'

describe('jvRate', () => {
  // 基础功能测试
  it('基础功能', async () => {
    const wrapper = mount(JvRate, {
      props: {
        modelValue: 0,
      },
    })

    // 检查默认值
    expect(wrapper.vm.currentValue).toBe(0)
    expect(wrapper.findAll('.jv-rate__icon').length).toBe(5)

    // 点击评分
    await wrapper.findAll('.jv-rate__icon')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
    expect(wrapper.emitted('change')?.[0]).toEqual([3])
  })

  // 自定义最大值
  it('自定义最大值', () => {
    const wrapper = mount(JvRate, {
      props: {
        max: 10,
      },
    })

    expect(wrapper.findAll('.jv-rate__icon').length).toBe(10)
  })

  // 半选模式
  it('半选模式', async () => {
    const wrapper = mount(JvRate, {
      props: {
        allowHalf: true,
      },
    })

    const icon = wrapper.findAll('.jv-rate__icon')[0]
    const rect = { left: 0, width: 20 } as DOMRect
    vi.spyOn(icon.element, 'getBoundingClientRect').mockReturnValue(rect)

    // 鼠标移入左半部分
    await icon.trigger('mousemove', {
      clientX: 5,
    })
    expect(wrapper.emitted('hover')?.[0]).toEqual([0.5])

    // 鼠标移入右半部分
    await icon.trigger('mousemove', {
      clientX: 15,
    })
    expect(wrapper.emitted('hover')?.[1]).toEqual([1])
  })

  // 只读状态
  it('只读状态', async () => {
    const wrapper = mount(JvRate, {
      props: {
        readonly: true,
        modelValue: 3,
      },
    })

    // 点击不应该触发事件
    await wrapper.findAll('.jv-rate__icon')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 禁用状态
  it('禁用状态', async () => {
    const wrapper = mount(JvRate, {
      props: {
        disabled: true,
        modelValue: 3,
      },
    })

    // 点击不应该触发事件
    await wrapper.findAll('.jv-rate__icon')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 自定义图标
  it('自定义图标', () => {
    const wrapper = mount(JvRate, {
      props: {
        icon: 'heart',
        voidIcon: 'heart-outline',
        modelValue: 3,
      },
    })

    const icons = wrapper.findAll('.jv-icon')
    expect(icons[2].attributes('name')).toBe('heart')
    expect(icons[3].attributes('name')).toBe('heart-outline')
  })

  // 提示文字
  it('提示文字', async () => {
    const wrapper = mount(JvRate, {
      props: {
        showText: true,
        modelValue: 3,
        texts: ['差', '一般', '好', '很好', '完美'],
      },
    })

    expect(wrapper.find('.jv-rate__text').text()).toBe('好')

    // 更新评分
    await wrapper.setProps({ modelValue: 4 })
    await nextTick()
    expect(wrapper.find('.jv-rate__text').text()).toBe('很好')
  })

  // 自定义颜色
  it('自定义颜色', () => {
    const wrapper = mount(JvRate, {
      props: {
        color: '#ff4081',
        voidColor: '#999',
        modelValue: 3,
      },
    })

    const icons = wrapper.findAll('.jv-icon')
    expect(icons[2].attributes('style')).toContain('color: rgb(255, 64, 129)')
    expect(icons[3].attributes('style')).toContain('color: rgb(153, 153, 153)')
  })

  // 重置方法
  it('重置方法', async () => {
    const wrapper = mount(JvRate, {
      props: {
        modelValue: 3,
      },
    })

    // 调用重置方法
    wrapper.vm.reset()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
    expect(wrapper.emitted('change')?.[0]).toEqual([0])
  })

  // 自定义间距
  it('自定义间距', () => {
    const wrapper = mount(JvRate, {
      props: {
        gap: 10,
      },
    })

    const icons = wrapper.findAll('.jv-icon')
    expect(icons[0].attributes('style')).toContain('margin-right: 10px')
  })

  // 自定义大小
  it('自定义大小', () => {
    const wrapper = mount(JvRate, {
      props: {
        size: 30,
      },
    })

    const icons = wrapper.findAll('.jv-icon')
    expect(icons[0].attributes('style')).toContain('font-size: 30px')
  })
})
