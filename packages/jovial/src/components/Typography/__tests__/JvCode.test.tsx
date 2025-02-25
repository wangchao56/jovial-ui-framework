import JvCode from '@components/Typography/src/JvCode.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvCode', () => {
  it('renders code block correctly', () => {
    const wrapper = mount(JvCode, {
      props: {
        language: 'javascript',
        title: '示例代码',
      },
      slots: {
        default: 'const test = "hello";',
      },
    })

    expect(wrapper.find('.jv-code__title').text()).toBe('示例代码')
    expect(wrapper.find('.language-javascript').exists()).toBe(true)
  })

  it('handles collapsible state', async () => {
    const wrapper = mount(JvCode, {
      props: {
        collapsible: true,
        defaultCollapsed: false,
      },
    })

    const collapseButton = wrapper.find('.jv-code__collapse')
    expect(collapseButton.exists()).toBe(true)

    await collapseButton.trigger('click')
    expect(wrapper.find('.jv-code__content').isVisible()).toBe(false)
  })
})
