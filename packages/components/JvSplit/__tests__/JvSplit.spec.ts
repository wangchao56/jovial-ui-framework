import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSplit from '../src/JvSplit.vue'

describe('jvSplit', () => {
  it('renders correctly', () => {
    const wrapper = mount(JvSplit)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-split')
    expect(wrapper.classes()).toContain('jv-split--horizontal')
    expect(wrapper.find('.jv-split__pane-1').exists()).toBe(true)
    expect(wrapper.find('.jv-split__pane-2').exists()).toBe(true)
    expect(wrapper.find('.jv-split__trigger-wrapper').exists()).toBe(true)
  })

  it('renders with vertical direction', () => {
    const wrapper = mount(JvSplit, {
      props: {
        direction: 'vertical',
      },
    })
    expect(wrapper.classes()).toContain('jv-split--vertical')
    const triggerWrapper = wrapper.find('.jv-split__trigger-wrapper')
    expect(triggerWrapper.attributes('style')).toContain('height: 10px')
  })

  it('renders with custom trigger size', () => {
    const wrapper = mount(JvSplit, {
      props: {
        triggerSize: 20,
      },
    })
    const triggerWrapper = wrapper.find('.jv-split__trigger-wrapper')
    expect(triggerWrapper.attributes('style')).toContain('width: 20px')
  })

  it('renders with disabled state', () => {
    const wrapper = mount(JvSplit, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-split--disabled')
    expect(wrapper.find('.jv-split__trigger-wrapper').exists()).toBe(false)
  })

  it('renders with custom default size', () => {
    const wrapper = mount(JvSplit, {
      props: {
        defaultSize: '30%',
      },
    })
    const paneOne = wrapper.find('.jv-split__pane-1')
    expect(paneOne.attributes('style')).toContain('flex: 0 0 30%')
  })

  it('renders with custom size (controlled mode)', () => {
    const wrapper = mount(JvSplit, {
      props: {
        size: '200px',
      },
    })
    const paneOne = wrapper.find('.jv-split__pane-1')
    expect(paneOne.attributes('style')).toContain('flex: 0 0 200px')
  })

  it('renders with custom pane classes and styles', () => {
    const wrapper = mount(JvSplit, {
      props: {
        paneOneClass: 'custom-pane-1',
        paneOneStyle: 'background: red',
        paneTwoClass: 'custom-pane-2',
        paneTwoStyle: 'background: blue',
      },
    })
    const paneOne = wrapper.find('.jv-split__pane-1')
    const paneTwo = wrapper.find('.jv-split__pane-2')
    expect(paneOne.classes()).toContain('custom-pane-1')
    expect(paneOne.attributes('style')).toContain('background: red')
    expect(paneTwo.classes()).toContain('custom-pane-2')
    expect(paneTwo.attributes('style')).toContain('background: blue')
  })

  it('renders with custom slots', () => {
    const wrapper = mount(JvSplit, {
      slots: {
        paneOne: '<div class="custom-pane-one">Pane One Content</div>',
        paneTwo: '<div class="custom-pane-two">Pane Two Content</div>',
        trigger: '<div class="custom-trigger">Custom Trigger</div>',
      },
    })
    expect(wrapper.find('.custom-pane-one').exists()).toBe(true)
    expect(wrapper.find('.custom-pane-two').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
  })

  it('emits events on drag', async () => {
    const wrapper = mount(JvSplit)
    const triggerWrapper = wrapper.find('.jv-split__trigger-wrapper')

    // 模拟鼠标按下事件
    await triggerWrapper.trigger('mousedown', {
      clientX: 100,
      clientY: 100,
    })

    expect(wrapper.emitted('dragStart')).toBeTruthy()

    // 模拟鼠标移动和抬起事件需要在全局触发
    // 由于测试环境限制，这里只测试事件绑定和初始触发
  })

  it('exposes methods correctly', () => {
    const wrapper = mount(JvSplit, {
      props: {
        defaultSize: '30%',
      },
    })

    const vm = wrapper.vm as any
    expect(typeof vm.getSize).toBe('function')
    expect(typeof vm.resetSize).toBe('function')
    expect(vm.getSize()).toBe('30%')
  })
})
