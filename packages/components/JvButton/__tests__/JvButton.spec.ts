import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvIcon from '../../JvIcon'
import JvButton from '../src/JvButton.vue'

describe('jvButton', () => {
  // 测试基本渲染
  it('应该正确渲染组件', () => {
    const wrapper = mount(JvButton)
    expect(wrapper.classes()).toContain('jv-button')
  })

  // 测试按钮类型
  describe('按钮类型', () => {
    it('应该应用正确的类型类', () => {
      const type = 'primary'
      const wrapper = mount(JvButton, {
        props: { type },
      })

      expect(wrapper.classes()).toContain(`jv-button--${type}`)
    })
  })

  // 测试按钮尺寸
  describe('按钮尺寸', () => {
    it('应该应用正确的尺寸类', () => {
      const size = 'large'
      const wrapper = mount(JvButton, {
        props: { size },
      })

      expect(wrapper.classes()).toContain(`jv-button--${size}`)
    })
  })

  // 测试禁用状态
  describe('禁用状态', () => {
    it('当disabled为true时应该禁用按钮', () => {
      const wrapper = mount(JvButton, {
        props: { disabled: true },
      })

      expect(wrapper.classes()).toContain('jv-button--is-disabled')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('禁用状态下点击不应触发click事件', async () => {
      const wrapper = mount(JvButton, {
        props: { disabled: true },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // 测试加载状态
  describe('加载状态', () => {
    it('当loading为true时应该显示加载状态', () => {
      const wrapper = mount(JvButton, {
        props: { loading: true },
        global: {
          components: { JvIcon },
        },
      })

      expect(wrapper.classes()).toContain('jv-button--is-loading')
      expect(wrapper.find('.jv-button__loader').exists()).toBe(true)
    })

    it('加载状态下点击不应触发click事件', async () => {
      const wrapper = mount(JvButton, {
        props: { loading: true },
        global: {
          components: { JvIcon },
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // 测试圆角属性
  describe('圆角属性', () => {
    it('当rounded为true时应该应用圆角类', () => {
      const wrapper = mount(JvButton, {
        props: { rounded: true },
      })

      expect(wrapper.classes()).toContain('jv-button--is-rounded')
    })
  })

  // 测试块级属性
  describe('块级属性', () => {
    it('当block为true时应该应用块级类', () => {
      const wrapper = mount(JvButton, {
        props: { block: true },
      })

      expect(wrapper.classes()).toContain('jv-button--is-block')
    })
  })

  // 测试虚线属性
  describe('虚线属性', () => {
    it('当dashed为true时应该应用虚线类', () => {
      const wrapper = mount(JvButton, {
        props: { dashed: true },
      })

      expect(wrapper.classes()).toContain('jv-button--is-dashed')
    })
  })

  // 测试图标
  describe('图标', () => {
    it('当提供icon属性时应该显示图标', () => {
      const wrapper = mount(JvButton, {
        props: { icon: 'search' },
        global: {
          components: { JvIcon },
        },
      })

      expect(wrapper.find('.jv-button__content').exists()).toBe(true)
      expect(wrapper.findComponent(JvIcon).exists()).toBe(true)
    })

    it('当提供prependIcon属性时应该显示前置图标', () => {
      const wrapper = mount(JvButton, {
        props: { prependIcon: 'search' },
        global: {
          components: { JvIcon },
        },
      })

      expect(wrapper.find('.jv-button__prepend').exists()).toBe(true)
      expect(wrapper.findComponent(JvIcon).exists()).toBe(true)
    })

    it('当提供appendIcon属性时应该显示后置图标', () => {
      const wrapper = mount(JvButton, {
        props: { appendIcon: 'search' },
        global: {
          components: { JvIcon },
        },
      })

      expect(wrapper.find('.jv-button__append').exists()).toBe(true)
      expect(wrapper.findComponent(JvIcon).exists()).toBe(true)
    })
  })

  // 测试自定义颜色
  describe('自定义颜色', () => {
    it('应该应用自定义文本颜色', () => {
      const color = '#ff0000'
      const wrapper = mount(JvButton, {
        props: { color, type: 'default' },
      })

      expect(wrapper.attributes('style')).toContain(`color: ${color}`)
    })

    it('应该应用自定义背景颜色', () => {
      const bgColor = '#ff0000'
      const wrapper = mount(JvButton, {
        props: { bgColor, type: 'default' },
      })

      expect(wrapper.attributes('style')).toContain(`background-color: ${bgColor}`)
    })
  })

  // 测试插槽
  describe('插槽', () => {
    it('应该正确渲染默认插槽内容', () => {
      const wrapper = mount(JvButton, {
        slots: {
          default: '按钮文本',
        },
      })

      expect(wrapper.find('.jv-button__content').exists()).toBe(true)
      expect(wrapper.text()).toContain('按钮文本')
    })

    it('应该正确渲染前置插槽内容', () => {
      const wrapper = mount(JvButton, {
        slots: {
          prepend: '<span class="custom-prepend">前置</span>',
        },
      })

      expect(wrapper.find('.jv-button__prepend').exists()).toBe(true)
      expect(wrapper.find('.custom-prepend').exists()).toBe(true)
    })

    it('应该正确渲染后置插槽内容', () => {
      const wrapper = mount(JvButton, {
        slots: {
          append: '<span class="custom-append">后置</span>',
        },
      })

      expect(wrapper.find('.jv-button__append').exists()).toBe(true)
      expect(wrapper.find('.custom-append').exists()).toBe(true)
    })
  })

  // 测试事件
  describe('事件', () => {
    it('点击按钮时应该触发click事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('鼠标按下时应该触发mousedown事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('mousedown')
      expect(wrapper.emitted('mousedown')).toBeTruthy()
    })

    it('键盘按下时应该触发keydown事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('keydown')
      expect(wrapper.emitted('keydown')).toBeTruthy()
    })

    it('键盘弹起时应该触发keyup事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('keyup')
      expect(wrapper.emitted('keyup')).toBeTruthy()
    })

    it('聚焦时应该触发focus事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('失焦时应该触发blur事件', async () => {
      const wrapper = mount(JvButton)

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  // 测试暴露的方法
  describe('暴露的方法', () => {
    it('setLoading方法应该正确设置加载状态', async () => {
      const wrapper = mount(JvButton)
      const vm = wrapper.vm as any

      expect(wrapper.classes()).not.toContain('jv-button--is-loading')

      vm.setLoading(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.classes()).toContain('jv-button--is-loading')

      vm.setLoading(false)
      await wrapper.vm.$nextTick()
      expect(wrapper.classes()).not.toContain('jv-button--is-loading')
    })

    it('setDisabled方法应该正确设置禁用状态', async () => {
      const wrapper = mount(JvButton)
      const vm = wrapper.vm as any

      expect(wrapper.classes()).not.toContain('jv-button--is-disabled')

      vm.setDisabled(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.classes()).toContain('jv-button--is-disabled')

      vm.setDisabled(false)
      await wrapper.vm.$nextTick()
      expect(wrapper.classes()).not.toContain('jv-button--is-disabled')
    })
  })
})
