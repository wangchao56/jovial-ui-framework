import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvIcon from '../../JvIcon'
import JvAvatar from '../src/JvAvatar.vue'

describe('jvAvatar', () => {
  // 测试基本渲染
  it('应该正确渲染组件', () => {
    const wrapper = mount(JvAvatar)
    expect(wrapper.classes()).toContain('jv-avatar')
  })

  // 测试图片显示模式
  describe('图片显示模式', () => {
    it('当提供src属性时应该显示图片', () => {
      const src = 'https://example.com/avatar.jpg'
      const wrapper = mount(JvAvatar, {
        props: { src },
      })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe(src)
    })

    it('当图片加载失败时应该触发error事件', async () => {
      const wrapper = mount(JvAvatar, {
        props: { src: 'invalid-url.jpg' },
      })

      await wrapper.find('img').trigger('error')
      expect(wrapper.emitted('error')).toBeTruthy()
    })

    it('应该正确应用fit属性', () => {
      const fit = 'contain'
      const wrapper = mount(JvAvatar, {
        props: { src: 'avatar.jpg', fit },
      })

      expect(wrapper.classes()).toContain(`jv-avatar--${fit}`)
    })
  })

  // 测试文本显示模式
  describe('文本显示模式', () => {
    it('当提供text属性时应该显示文本的首字母', () => {
      const wrapper = mount(JvAvatar, {
        props: { text: 'John Doe' },
      })

      const textElement = wrapper.find('.jv-avatar__text')
      expect(textElement.exists()).toBe(true)
      expect(textElement.text()).toBe('JD')
    })

    it('文本应该最多显示两个字符', () => {
      const wrapper = mount(JvAvatar, {
        props: { text: 'John Doe Smith' },
      })

      const textElement = wrapper.find('.jv-avatar__text')
      expect(textElement.text().length).toBeLessThanOrEqual(2)
    })
  })

  // 测试图标显示模式
  describe('图标显示模式', () => {
    it('当提供icon属性时应该显示图标', () => {
      const wrapper = mount(JvAvatar, {
        props: { icon: 'user' },
        global: {
          components: { JvIcon },
        },
      })

      const iconElement = wrapper.find('.jv-avatar__icon')
      expect(iconElement.exists()).toBe(true)
      expect(wrapper.findComponent(JvIcon).exists()).toBe(true)
    })
  })

  // 测试自定义插槽
  describe('插槽', () => {
    it('应该正确渲染默认插槽内容', () => {
      const wrapper = mount(JvAvatar, {
        slots: {
          default: '<span class="custom-content">Custom</span>',
        },
      })

      const content = wrapper.find('.jv-avatar__content')
      expect(content.exists()).toBe(true)
      expect(content.find('.custom-content').exists()).toBe(true)
    })

    it('应该正确渲染图标插槽内容', () => {
      const wrapper = mount(JvAvatar, {
        slots: {
          icon: '<div class="custom-icon">Icon</div>',
        },
      })

      const iconElement = wrapper.find('.jv-avatar__icon')
      expect(iconElement.exists()).toBe(true)
      expect(iconElement.find('.custom-icon').exists()).toBe(true)
    })
  })

  // 测试尺寸属性
  describe('尺寸', () => {
    it('应该应用预设尺寸类', () => {
      const size = 'large'
      const wrapper = mount(JvAvatar, {
        props: { size },
      })

      expect(wrapper.classes()).toContain(`jv-avatar--${size}`)
    })

    it('当使用customSize时应该应用自定义尺寸', () => {
      const customSize = 60
      const wrapper = mount(JvAvatar, {
        props: { customSize },
      })

      // 检查CSS变量是否被正确设置
      expect(wrapper.attributes('style')).toContain(`--jv-avatar-size: ${customSize}px`)
    })
  })

  // 测试形状属性
  describe('形状', () => {
    it('应该应用圆形形状类', () => {
      const wrapper = mount(JvAvatar, {
        props: { shape: 'circle' },
      })

      expect(wrapper.classes()).toContain('jv-avatar--circle')
    })

    it('应该应用方形形状类', () => {
      const wrapper = mount(JvAvatar, {
        props: { shape: 'square' },
      })

      expect(wrapper.classes()).toContain('jv-avatar--square')
    })
  })

  // 测试其他样式属性
  describe('样式属性', () => {
    it('当bordered为true时应该添加边框类', () => {
      const wrapper = mount(JvAvatar, {
        props: { bordered: true },
      })

      expect(wrapper.classes()).toContain('jv-avatar--bordered')
    })

    it('当clickable为true时应该添加可点击类', () => {
      const wrapper = mount(JvAvatar, {
        props: { clickable: true },
      })

      expect(wrapper.classes()).toContain('jv-avatar--clickable')
    })

    it('应该应用自定义背景色', () => {
      const bgColor = '#ff0000'
      const wrapper = mount(JvAvatar, {
        props: { bgColor },
      })

      expect(wrapper.attributes('style')).toContain(`--jv-avatar-bg-color: ${bgColor}`)
    })

    it('应该应用自定义文本颜色', () => {
      const color = '#00ff00'
      const wrapper = mount(JvAvatar, {
        props: { color },
      })

      expect(wrapper.attributes('style')).toContain(`--jv-avatar-color: ${color}`)
    })
  })

  // 测试交互
  describe('交互', () => {
    it('点击头像时应该触发click事件', async () => {
      const wrapper = mount(JvAvatar, {
        props: { clickable: true },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })
})
