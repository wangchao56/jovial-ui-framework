import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvButton from '../src/button.vue'
import JvButtonGroup from '../src/JvButtonGroup'

describe('jvButtonGroup', () => {
  // 基础渲染测试
  it('renders properly', () => {
    const wrapper = mount(JvButtonGroup, {
      slots: {
        default: [
          '<jv-button>Button 1</jv-button>',
          '<jv-button>Button 2</jv-button>',
        ],
      },
    })
    expect(wrapper.classes()).toContain('jv-button-group')
    expect(wrapper.findAll('.jv-button')).toHaveLength(2)
  })

  // 属性测试
  it('applies size prop to child buttons', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        size: 'large',
      },
      slots: {
        default: () => [
          h(JvButton, null, { default: () => 'Button 1' }),
          h(JvButton, null, { default: () => 'Button 2' }),
        ],
      },
    })
    expect(wrapper.findAll('.jv-button--large')).toHaveLength(2)
  })

  // 垂直布局测试
  it('applies vertical layout', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        vertical: true,
      },
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  // 圆角样式测试
  it('applies rounded style', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        rounded: true,
      },
    })
    expect(wrapper.classes()).toContain('is-rounded')
  })

  // 间距测试
  it('applies gap style', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        gap: 8,
      },
    })
    expect(wrapper.attributes('style')).toContain('gap: 8px')
  })

  // 对齐方式测试
  it('applies justify content', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        justify: 'center',
      },
    })
    expect(wrapper.attributes('style')).toContain('justify-content: center')
  })

  // 上下文传递测试
  it('provides context to child buttons', async () => {
    const wrapper = mount({
      template: `
        <jv-button-group size="large" rounded>
          <jv-button>Test Button</jv-button>
        </jv-button-group>
      `,
      components: {
        JvButtonGroup,
        JvButton,
      },
    })

    const button = wrapper.find('.jv-button')
    expect(button.classes()).toContain('jv-button--large')
    expect(button.classes()).toContain('is-rounded')
  })
})
