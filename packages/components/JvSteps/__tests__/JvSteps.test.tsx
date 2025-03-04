import type { StepItem } from '../src/JvSteps'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvSteps from '../src/JvSteps.vue'

function createSteps(props = {}, slots = {}) {
  return mount(JvSteps, {
    props: {
      items: [
        { title: '步骤1', description: '这是第一步' },
        { title: '步骤2', description: '这是第二步' },
        { title: '步骤3', description: '这是第三步' },
      ],
      ...props,
    },
    slots,
  })
}

describe('jvSteps', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = createSteps()
    expect(wrapper.find('.jv-steps').exists()).toBe(true)
    expect(wrapper.findAll('.jv-steps__item')).toHaveLength(3)
  })

  // 方向测试
  it('should render with different directions', () => {
    const horizontal = createSteps({ direction: 'horizontal' })
    expect(horizontal.classes()).toContain('jv-steps--horizontal')

    const vertical = createSteps({ direction: 'vertical' })
    expect(vertical.classes()).toContain('jv-steps--vertical')
  })

  // 步骤状态测试
  it('should show correct step status', async () => {
    const wrapper = createSteps({ modelValue: 1 })
    const items = wrapper.findAll('.jv-steps__item')

    expect(items[0].classes()).toContain('jv-steps__item--finish')
    expect(items[1].classes()).toContain('jv-steps__item--process')
    expect(items[2].classes()).toContain('jv-steps__item--wait')
  })

  // 自定义状态测试
  it('should respect custom status', () => {
    const items: StepItem[] = [
      { title: '步骤1', status: 'error' },
      { title: '步骤2', status: 'finish' },
      { title: '步骤3', status: 'process' },
    ]
    const wrapper = createSteps({ items })
    const stepItems = wrapper.findAll('.jv-steps__item')

    expect(stepItems[0].classes()).toContain('jv-steps__item--error')
    expect(stepItems[1].classes()).toContain('jv-steps__item--finish')
    expect(stepItems[2].classes()).toContain('jv-steps__item--process')
  })

  // 点击事件测试
  it('should handle click events when clickable', async () => {
    const onClick = vi.fn()
    const wrapper = createSteps({
      clickable: true,
      onClick,
    })

    await wrapper.findAll('.jv-steps__item')[1].trigger('click')
    expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  // 禁用状态测试
  it('should not respond to clicks when disabled', async () => {
    const onClick = vi.fn()
    const wrapper = createSteps({
      clickable: true,
      disabled: true,
      onClick,
    })

    await wrapper.findAll('.jv-steps__item')[1].trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 图标测试
  it('should render custom icons', () => {
    const items: StepItem[] = [
      { title: '步骤1', icon: 'check' },
      { title: '步骤2', icon: 'close' },
    ]
    const wrapper = createSteps({ items })
    const icons = wrapper.findAll('.jv-icon')

    expect(icons[0].attributes('name')).toBe('check')
    expect(icons[1].attributes('name')).toBe('close')
  })

  // 序号显示测试
  it('should show/hide index numbers', () => {
    const withIndex = createSteps({ showIndex: true })
    const withoutIndex = createSteps({ showIndex: false })

    expect(withIndex.find('.jv-steps__icon').text()).toBe('1')
    expect(withoutIndex.find('.jv-steps__icon').text()).toBe('')
  })

  // 连接线测试
  it('should show/hide connection lines', () => {
    const withLine = createSteps({ showLine: true })
    const withoutLine = createSteps({ showLine: false })

    expect(withLine.find('.jv-steps__line').exists()).toBe(true)
    expect(withoutLine.find('.jv-steps__line').exists()).toBe(false)
  })

  // 插槽测试
  it('should render custom slots correctly', () => {
    const wrapper = createSteps({}, {
      icon: ({ index }) => <div class="custom-icon">{index}</div>,
      title: ({ item }) => <div class="custom-title">{item.title}</div>,
      description: ({ item }) => <div class="custom-desc">{item.description}</div>,
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  // 响应式更新测试
  it('should update when modelValue changes', async () => {
    const wrapper = createSteps({ modelValue: 0 })

    await wrapper.setProps({ modelValue: 2 })
    const items = wrapper.findAll('.jv-steps__item')

    expect(items[0].classes()).toContain('jv-steps__item--finish')
    expect(items[1].classes()).toContain('jv-steps__item--finish')
    expect(items[2].classes()).toContain('jv-steps__item--process')
  })

  // 单个步骤禁用测试
  it('should respect individual step disabled state', async () => {
    const onClick = vi.fn()
    const items: StepItem[] = [
      { title: '步骤1' },
      { title: '步骤2', disabled: true },
      { title: '步骤3' },
    ]
    const wrapper = createSteps({
      items,
      clickable: true,
      onClick,
    })

    await wrapper.findAll('.jv-steps__item')[1].trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(wrapper.findAll('.jv-steps__item')[1].classes()).toContain('jv-steps__item--disabled')
  })
})
