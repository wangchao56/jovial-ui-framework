import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvVirtualScroll from '../src/virtual-scroll'

describe('jvVirtualScroll', () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
  }))

  it('renders correctly with default props', () => {
    const wrapper = mount(JvVirtualScroll, {
      props: {
        items,
        itemHeight: 30,
        remain: 10,
      },
      slots: {
        default: ({ node }) => `<div>${node.text}</div>`,
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-virtual-scroll')
  })

  it('renders correct number of visible items', () => {
    const wrapper = mount(JvVirtualScroll, {
      props: {
        items,
        itemHeight: 30,
        remain: 10,
      },
      slots: {
        default: ({ node }) => `<div>${node.text}</div>`,
      },
    })

    // 默认情况下应该渲染 remain + 前后缓冲区数量的项目
    const renderedItems = wrapper.findAll('.jv-virtual-scroll__list > div')
    expect(renderedItems.length).toBeGreaterThan(10)
  })

  it('updates scroll position correctly', async () => {
    const wrapper = mount(JvVirtualScroll, {
      props: {
        items,
        itemHeight: 30,
        remain: 10,
      },
      slots: {
        default: ({ node }) => `<div>${node.text}</div>`,
      },
    })

    const scrollWrapper = wrapper.find('.jv-virtual-scroll')
    await scrollWrapper.trigger('scroll', {
      target: {
        scrollTop: 300, // 滚动 10 个项目的高度
      },
    })

    // 检查列表是否已经偏移
    const listWrapper = wrapper.find('.jv-virtual-scroll__list')
    expect(listWrapper.attributes('style')).toContain('transform')
  })
})
