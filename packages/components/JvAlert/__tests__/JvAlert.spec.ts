import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import JvAlert from '../src/JvAlert.vue'

describe('jvAlert', () => {
  // 测试基本渲染
  it('应该正确渲染组件', () => {
    const wrapper = mount(JvAlert)
    expect(wrapper.classes()).toContain('jv-alert')
  })

  // 测试默认插槽
  it('应该正确渲染默认插槽内容', () => {
    const wrapper = mount(JvAlert, {
      slots: {
        default: () => h('div', { class: 'custom-content' }, '自定义内容'),
        icon: '',
        title: '',
        message: '',
        close: '',
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('自定义内容')
  })

  // 测试type属性
  describe('type属性', () => {
    it('默认type应该为info', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('type')).toBe('info')
      expect(wrapper.classes()).toContain('jv-alert--info')
    })

    it('应该接受不同的type值', () => {
      const types = ['success', 'warning', 'error', 'info'] as const

      types.forEach((type) => {
        const wrapper = mount(JvAlert, {
          props: { type },
        })
        expect(wrapper.props('type')).toBe(type)
        expect(wrapper.classes()).toContain(`jv-alert--${type}`)
      })
    })
  })

  // 测试variant属性
  describe('variant属性', () => {
    it('默认variant应该为filled', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('variant')).toBe('filled')
      expect(wrapper.classes()).toContain('jv-alert--filled')
    })

    it('应该接受不同的variant值', () => {
      const variants = ['filled', 'outlined', 'border-left'] as const

      variants.forEach((variant) => {
        const wrapper = mount(JvAlert, {
          props: { variant },
        })
        expect(wrapper.props('variant')).toBe(variant)
        expect(wrapper.classes()).toContain(`jv-alert--${variant}`)
      })
    })
  })

  // 测试title属性
  describe('title属性', () => {
    it('默认title应该为空字符串', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('title')).toBe('')
    })

    it('应该正确渲染title', () => {
      const title = '警告标题'
      const wrapper = mount(JvAlert, {
        props: { title },
      })
      expect(wrapper.props('title')).toBe(title)
      expect(wrapper.find('.jv-alert__title').text()).toBe(title)
    })
  })

  // 测试message属性
  describe('message属性', () => {
    it('默认message应该为空字符串', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('message')).toBe('')
    })

    it('应该正确渲染message', () => {
      const message = '警告消息内容'
      const wrapper = mount(JvAlert, {
        props: { message },
      })
      expect(wrapper.props('message')).toBe(message)
      expect(wrapper.find('.jv-alert__message').text()).toBe(message)
    })
  })

  // 测试icon属性
  describe('icon属性', () => {
    it('默认icon应该为空字符串', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('icon')).toBe('')
    })

    it('应该正确使用自定义icon', () => {
      const icon = '$customIcon'
      const wrapper = mount(JvAlert, {
        props: { icon },
      })
      expect(wrapper.props('icon')).toBe(icon)
      // 由于JvIcon是一个组件，这里只能测试图标容器是否存在
      expect(wrapper.find('.jv-alert__icon').exists()).toBe(true)
    })
  })

  // 测试showIcon属性
  describe('showIcon属性', () => {
    it('默认showIcon应该为true', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('showIcon')).toBe(true)
      expect(wrapper.find('.jv-alert__icon').exists()).toBe(true)
    })

    it('当showIcon为false时不应显示图标', () => {
      const wrapper = mount(JvAlert, {
        props: { showIcon: false },
      })
      expect(wrapper.props('showIcon')).toBe(false)
      // 由于没有提供自定义图标，且showIcon为false，图标容器不应存在
      expect(wrapper.find('.jv-alert__icon').exists()).toBe(false)
    })
  })

  // 测试dismissible属性
  describe('dismissible属性', () => {
    it('默认dismissible应该为false', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('dismissible')).toBe(false)
      expect(wrapper.find('.jv-alert__close').exists()).toBe(false)
    })

    it('当dismissible为true时应显示关闭按钮', () => {
      const wrapper = mount(JvAlert, {
        props: { dismissible: true },
      })
      expect(wrapper.props('dismissible')).toBe(true)
      expect(wrapper.find('.jv-alert__close').exists()).toBe(true)
    })

    it('点击关闭按钮应触发update:visible事件', async () => {
      const wrapper = mount(JvAlert, {
        props: { dismissible: true },
      })

      await wrapper.find('.jv-alert__close').trigger('click')

      expect(wrapper.emitted('update:visible')).toBeTruthy()
      const updateEvent = wrapper.emitted('update:visible')
      if (updateEvent) {
        expect(updateEvent[0]).toEqual([false])
      }
    })
  })

  // 测试closeText属性
  describe('closeText属性', () => {
    it('默认closeText应该为空字符串', () => {
      const wrapper = mount(JvAlert, {
        props: { dismissible: true },
      })
      expect(wrapper.props('closeText')).toBe('')
      // 默认应该显示关闭图标而不是文本
      expect(wrapper.findComponent({ name: 'JvIcon' }).exists()).toBe(true)
    })

    it('应该正确渲染closeText', () => {
      const closeText = '关闭'
      const wrapper = mount(JvAlert, {
        props: {
          dismissible: true,
          closeText,
        },
      })
      expect(wrapper.props('closeText')).toBe(closeText)
      expect(wrapper.find('.jv-alert__close').text()).toBe(closeText)
    })
  })

  // 测试dense属性
  describe('dense属性', () => {
    it('默认dense应该为false', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('dense')).toBe(false)
      expect(wrapper.classes()).not.toContain('jv-alert--dense')
    })

    it('当dense为true时应添加对应类名', () => {
      const wrapper = mount(JvAlert, {
        props: { dense: true },
      })
      expect(wrapper.props('dense')).toBe(true)
      expect(wrapper.classes()).toContain('jv-alert--dense')
    })
  })

  // 测试visible属性和v-model
  describe('visible属性和v-model', () => {
    it('默认visible应该为true', () => {
      const wrapper = mount(JvAlert)
      expect(wrapper.props('visible')).toBe(true)
      expect(wrapper.find('.jv-alert').exists()).toBe(true)
    })

    it('当visible为false时不应渲染组件', () => {
      const wrapper = mount(JvAlert, {
        props: { visible: false },
      })
      expect(wrapper.props('visible')).toBe(false)
      expect(wrapper.find('.jv-alert').exists()).toBe(false)
    })

    it('关闭后应触发close事件', async () => {
      const wrapper = mount(JvAlert, {
        props: {
          dismissible: true,
          visible: true,
        },
      })

      await wrapper.find('.jv-alert__close').trigger('click')

      // 模拟transition结束
      await wrapper.vm.$nextTick()
      wrapper.vm.$emit('after-leave')

      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  // 测试插槽
  describe('插槽', () => {
    it('应该正确渲染icon插槽', () => {
      const wrapper = mount(JvAlert, {
        slots: {
          icon: '<div class="custom-icon">自定义图标</div>',
          default: '',
          title: '',
          message: '',
          close: '',
        },
      })

      expect(wrapper.find('.jv-alert__icon').exists()).toBe(true)
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.find('.custom-icon').text()).toBe('自定义图标')
    })

    it('应该正确渲染title插槽', () => {
      const wrapper = mount(JvAlert, {
        slots: {
          title: '<div class="custom-title">自定义标题</div>',
          default: '',
          icon: '',
          message: '',
          close: '',
        },
      })

      expect(wrapper.find('.jv-alert__title').exists()).toBe(true)
      expect(wrapper.find('.custom-title').exists()).toBe(true)
      expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
    })

    it('应该正确渲染message插槽', () => {
      const wrapper = mount(JvAlert, {
        slots: {
          message: '<div class="custom-message">自定义消息</div>',
          default: '',
          icon: '',
          title: '',
          close: '',
        },
      })

      expect(wrapper.find('.jv-alert__message').exists()).toBe(true)
      expect(wrapper.find('.custom-message').exists()).toBe(true)
      expect(wrapper.find('.custom-message').text()).toBe('自定义消息')
    })

    it('应该正确渲染close插槽', () => {
      const wrapper = mount(JvAlert, {
        props: { dismissible: true },
        slots: {
          close: '<div class="custom-close">自定义关闭</div>',
          default: '',
          icon: '',
          title: '',
          message: '',
        },
      })

      expect(wrapper.find('.jv-alert__close').exists()).toBe(true)
      expect(wrapper.find('.custom-close').exists()).toBe(true)
      expect(wrapper.find('.custom-close').text()).toBe('自定义关闭')
    })
  })
})
