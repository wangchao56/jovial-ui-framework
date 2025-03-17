import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import JvAffix from '../src/JvAffix.vue'

// 模拟主题模块 - 提供最小必要的模拟
vi.mock('@jienix/jovial-theme', () => {
  return {
    provideTheme: vi.fn(),
    useTheme: () => ({
      themeClasses: {
        value: 'theme-test',
      },
    }),
  }
})

// 模拟window的事件监听器
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

// 模拟window的pageYOffset
Object.defineProperty(window, 'pageYOffset', {
  value: 0,
  writable: true,
})

// 模拟window的innerHeight
Object.defineProperty(window, 'innerHeight', {
  value: 800,
  writable: true,
})

// 保存原始方法
const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

describe('jvAffix', () => {
  // 模拟DOM方法
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')

  beforeEach(() => {
    // 重置所有模拟
    vi.clearAllMocks()

    // 模拟window的事件监听器
    window.addEventListener = mockAddEventListener
    window.removeEventListener = mockRemoveEventListener

    // 模拟getBoundingClientRect方法 - 默认不触发固定状态
    Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 50, // 确保元素在视口内，不会触发固定状态
      bottom: 150,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
    })

    // 模拟offsetWidth属性
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 100,
    })
  })

  afterEach(() => {
    // 恢复原始方法
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
    }
    vi.restoreAllMocks()
  })

  // 测试基本渲染
  it('应该正确渲染组件', () => {
    const wrapper = mount(JvAffix)
    expect(wrapper.classes()).toContain('jv-affix')
  })

  // 测试默认插槽
  it('应该正确渲染默认插槽内容', () => {
    const wrapper = mount(JvAffix, {
      slots: {
        default: () => h('div', { class: 'test-content' }, 'Test Content'),
      },
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Test Content')
  })

  // 测试position属性
  describe('position属性', () => {
    it('默认position应该为top', () => {
      const wrapper = mount(JvAffix)
      expect(wrapper.props('position')).toBe('top')
    })

    it('应该接受position=bottom', () => {
      const wrapper = mount(JvAffix, {
        props: {
          position: 'bottom',
        },
      })
      expect(wrapper.props('position')).toBe('bottom')
    })
  })

  // 测试offset属性
  describe('offset属性', () => {
    it('默认offset应该为0', () => {
      const wrapper = mount(JvAffix)
      expect(wrapper.props('offset')).toBe(0)
    })

    it('应该接受自定义offset值', () => {
      const wrapper = mount(JvAffix, {
        props: {
          offset: 10,
        },
      })
      expect(wrapper.props('offset')).toBe(10)
    })
  })

  // 测试zIndex属性
  describe('zIndex属性', () => {
    it('默认zIndex应该为100', () => {
      const wrapper = mount(JvAffix)
      expect(wrapper.props('zIndex')).toBe(100)
    })

    it('应该接受自定义zIndex值', () => {
      const wrapper = mount(JvAffix, {
        props: {
          zIndex: 200,
        },
      })
      expect(wrapper.props('zIndex')).toBe(200)
    })
  })

  // 测试target属性
  describe('target属性', () => {
    it('默认target应该为window', () => {
      mount(JvAffix)
      // 不直接检查props，而是检查组件内部行为
      expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('应该接受自定义target函数', () => {
      const targetFn = () => document.body
      const wrapper = mount(JvAffix, {
        props: {
          target: targetFn,
        },
      })
      expect(wrapper.props('target')).toBe(targetFn)
    })
  })

  // 测试固定状态
  describe('固定状态', () => {
    it('当元素顶部超出视口顶部时应该固定(position=top)', async () => {
      // 模拟元素位于视口顶部上方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -10,
        bottom: 90,
      })

      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查fixed状态
      expect(wrapper.vm.getFixed()).toBe(true)
    })

    it('当元素底部超出视口底部时应该固定(position=bottom)', async () => {
      // 模拟元素位于视口底部下方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 750,
        bottom: 850,
      })

      const wrapper = mount(JvAffix, {
        props: {
          position: 'bottom',
        },
      })

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查fixed状态
      expect(wrapper.vm.getFixed()).toBe(true)
    })

    it('当元素在视口内时不应该固定(position=top)', async () => {
      // 模拟元素位于视口内
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 10,
        bottom: 110,
      })

      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查fixed状态
      expect(wrapper.vm.getFixed()).toBe(false)
    })
  })

  // 测试事件
  describe('事件', () => {
    it('当固定状态改变时应该触发change事件', async () => {
      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 初始状态
      expect(wrapper.vm.getFixed()).toBe(false)

      // 模拟元素位于视口顶部上方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -10,
        bottom: 90,
      })

      // 触发update方法
      await wrapper.vm.update()

      // 检查事件是否被触发
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })

    it('滚动时应该触发scroll事件', async () => {
      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查事件是否被触发
      expect(wrapper.emitted('scroll')).toBeTruthy()
      expect(wrapper.emitted('scroll')![0][0]).toHaveProperty('scrollTop')
      expect(wrapper.emitted('scroll')![0][0]).toHaveProperty('fixed')
    })
  })

  // 测试样式
  describe('样式', () => {
    it('固定时应该应用正确的样式(position=top)', async () => {
      // 模拟元素位于视口顶部上方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -10,
        bottom: 90,
      })

      const wrapper = mount(JvAffix, {
        props: {
          offset: 5,
          zIndex: 200,
        },
      })

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查样式
      const wrapperEl = wrapper.find('.jv-affix__wrapper')
      expect(wrapperEl.attributes('style')).toContain('position: fixed')
      expect(wrapperEl.attributes('style')).toContain('z-index: 200')
      expect(wrapperEl.attributes('style')).toContain('top: 5px')
    })

    it('固定时应该应用正确的样式(position=bottom)', async () => {
      // 模拟元素位于视口底部下方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 750,
        bottom: 850,
      })

      const wrapper = mount(JvAffix, {
        props: {
          position: 'bottom',
          offset: 10,
          zIndex: 300,
        },
      })

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 触发update方法
      await wrapper.vm.update()

      // 检查样式
      const wrapperEl = wrapper.find('.jv-affix__wrapper')
      expect(wrapperEl.attributes('style')).toContain('position: fixed')
      expect(wrapperEl.attributes('style')).toContain('z-index: 300')
      expect(wrapperEl.attributes('style')).toContain('bottom: 10px')
    })
  })

  // 测试生命周期
  describe('生命周期', () => {
    it('组件挂载时应该添加事件监听器', () => {
      mount(JvAffix)

      // 检查是否添加了事件监听器
      expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('组件卸载时应该移除事件监听器', () => {
      const wrapper = mount(JvAffix)
      wrapper.unmount()

      // 检查是否移除了事件监听器
      expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  // 测试暴露的方法
  describe('暴露的方法', () => {
    it('update方法应该更新固定状态', async () => {
      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 初始状态
      expect(wrapper.vm.getFixed()).toBe(false)

      // 模拟元素位于视口顶部上方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -10,
        bottom: 90,
      })

      // 调用update方法
      await wrapper.vm.update()

      // 检查fixed状态是否更新
      expect(wrapper.vm.getFixed()).toBe(true)
    })

    it('getFixed方法应该返回当前固定状态', async () => {
      const wrapper = mount(JvAffix)

      // 重置初始状态
      await wrapper.setData({ fixed: false })

      // 初始状态
      expect(wrapper.vm.getFixed()).toBe(false)

      // 模拟元素位于视口顶部上方
      Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -10,
        bottom: 90,
      })

      // 触发update方法
      await wrapper.vm.update()

      // 检查getFixed方法返回值
      expect(wrapper.vm.getFixed()).toBe(true)
    })
  })
})
