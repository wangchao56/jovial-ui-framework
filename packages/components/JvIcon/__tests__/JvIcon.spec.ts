import { Icon } from '@iconify/vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvIcon from '../src/JvIcon.vue'

describe('jvIcon', () => {
  // 测试基本渲染
  it('应该正确渲染组件', () => {
    const wrapper = mount(JvIcon)
    expect(wrapper.classes()).toContain('jv-icon')
  })

  // 测试图标名称
  describe('图标名称', () => {
    it('当提供name属性时应该显示图标', () => {
      const name = 'mdi:home'
      const wrapper = mount(JvIcon, {
        props: { name },
        global: {
          components: { Icon },
        },
      })

      expect(wrapper.findComponent(Icon).exists()).toBe(true)
      expect(wrapper.findComponent(Icon).props('icon')).toBe(name)
    })

    it('当name以$开头时应该显示内部图标', () => {
      const name = '$loading'
      const wrapper = mount(JvIcon, {
        props: { name },
      })

      // 内部图标是通过component动态渲染的
      expect(wrapper.html()).toContain('<svg')
    })
  })

  // 测试图标尺寸
  describe('图标尺寸', () => {
    it('当size为数字时应该设置对应的样式', () => {
      const size = 24
      const wrapper = mount(JvIcon, {
        props: { size },
      })

      const style = wrapper.attributes('style')
      expect(style).toContain(`font-size: ${size}px`)
      expect(style).toContain(`line-height: ${size}px`)
      expect(style).toContain(`width: ${size}px`)
      expect(style).toContain(`height: ${size}px`)
    })

    it('当size为预设值时应该应用对应的类', () => {
      const size = 'large'
      const wrapper = mount(JvIcon, {
        props: { size },
      })

      expect(wrapper.classes()).toContain(`jv-icon--${size}`)
    })
  })

  // 测试图标颜色
  describe('图标颜色', () => {
    it('应该将color属性传递给Icon组件', () => {
      const color = '#ff0000'
      const name = 'mdi:home'
      const wrapper = mount(JvIcon, {
        props: { color, name },
        global: {
          components: { Icon },
        },
      })

      expect(wrapper.findComponent(Icon).props('color')).toBe(color)
    })
  })

  // 测试图标类型
  describe('图标类型', () => {
    it('当type不为default时应该应用对应的类', () => {
      const type = 'primary'
      const wrapper = mount(JvIcon, {
        props: { type },
      })

      expect(wrapper.classes()).toContain(`jv-icon--${type}`)
    })

    it('当type为default时不应该应用类型类', () => {
      const wrapper = mount(JvIcon, {
        props: { type: 'default' },
      })

      expect(wrapper.classes()).not.toContain('jv-icon--default')
    })
  })

  // 测试自定义类名
  describe('自定义类名', () => {
    it('应该应用自定义类名', () => {
      const className = 'custom-icon'
      const wrapper = mount(JvIcon, {
        props: { class: className },
      })

      expect(wrapper.classes()).toContain(className)
    })

    it('应该应用多个自定义类名', () => {
      const classNames = ['custom-icon-1', 'custom-icon-2']
      const wrapper = mount(JvIcon, {
        props: { class: classNames },
      })

      classNames.forEach((className) => {
        expect(wrapper.classes()).toContain(className)
      })
    })
  })

  // 测试插槽
  describe('插槽', () => {
    it('应该正确渲染默认插槽内容', () => {
      const wrapper = mount(JvIcon, {
        slots: {
          default: '<span class="custom-content">自定义图标</span>',
        },
      })

      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('自定义图标')
    })

    it('当提供默认插槽时不应该渲染Icon组件', () => {
      const wrapper = mount(JvIcon, {
        props: { name: 'mdi:home' },
        slots: {
          default: '自定义图标',
        },
        global: {
          components: { Icon },
        },
      })

      expect(wrapper.findComponent(Icon).exists()).toBe(false)
    })
  })

  // 测试内部图标
  describe('内部图标', () => {
    it('应该正确渲染所有内部图标', () => {
      // 测试几个关键的内部图标
      const internalIconNames = ['$loading', '$close', '$eye', '$star']

      internalIconNames.forEach((name) => {
        const wrapper = mount(JvIcon, {
          props: { name },
        })

        expect(wrapper.html()).toContain('<svg')
      })
    })
  })
})
