import JvDialog from '@components/JvDialog/src/JvDialog.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvDialog', () => {
  // 测试基本渲染
  it('should render correctly', () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
        title: '测试标题',
      },
    })

    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('测试标题')
  })

  // 测试自定义内容
  it('should render custom content', () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
        content: '测试内容',
      },
    })

    expect(wrapper.text()).toContain('测试内容')
  })

  // 测试插槽
  it('should render slots correctly', () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        header: '<div>自定义标题</div>',
        default: '<div>自定义内容</div>',
        footer: '<div>自定义底部</div>',
      },
    })

    expect(wrapper.text()).toContain('自定义标题')
    expect(wrapper.text()).toContain('自定义内容')
    expect(wrapper.text()).toContain('自定义底部')
  })

  // 测试按钮事件
  it('should emit events when buttons are clicked', async () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
      },
    })

    // 点击确认按钮
    await wrapper.find('button[type="primary"]').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

    // 点击取消按钮
    await wrapper.find('button[type="danger"]').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  // 测试点击遮罩层关闭
  it('should close when clicking overlay if closeOnClickOverlay is true', async () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
        closeOnClickOverlay: true,
      },
    })

    const dialog = wrapper.find('dialog')
    // 模拟点击遮罩层
    await dialog.trigger('click', {
      clientX: 0,
      clientY: 0,
    })

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  // 测试按钮位置
  it('should render actions with correct position', () => {
    const wrapper = mount(JvDialog, {
      props: {
        modelValue: true,
        actionPosition: 'left',
      },
    })

    const space = wrapper.findComponent({ name: 'JvSpace' })
    expect(space.props('justify')).toBe('start')
  })
})
