import JvParagraph from '@components/Typography/src/JvParagraph.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvParagraph', () => {
  it('renders paragraph with default props', () => {
    const wrapper = mount(JvParagraph, {
      slots: {
        default: '测试段落',
      },
    })

    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.text()).toContain('测试段落')
    expect(wrapper.classes()).toContain('jv-paragraph')
  })

  it('applies writing mode correctly', () => {
    const wrapper = mount(JvParagraph, {
      props: {
        writingMode: 'vertical',
      },
      slots: {
        default: '垂直文本',
      },
    })

    expect(wrapper.classes()).toContain('jv-paragraph--vertical')
  })

  it('handles text indentation', () => {
    const wrapper = mount(JvParagraph, {
      props: {
        indent: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-paragraph--indent')
  })

  it('applies justified text alignment', () => {
    const wrapper = mount(JvParagraph, {
      props: {
        justified: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-paragraph--justified')
  })
})
