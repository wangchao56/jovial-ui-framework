import JvText from '@components/Typography/src/JvText.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvText', () => {
  it('renders different types correctly', () => {
    const types = ['default', 'success', 'warning', 'error']

    types.forEach((type) => {
      const wrapper = mount(JvText, {
        props: { type },
        slots: {
          default: '测试文本',
        },
      })

      expect(wrapper.classes()).toContain(`jv-text--${type}`)
      expect(wrapper.text()).toContain('测试文本')
    })
  })

  it('renders with correct variant', () => {
    const wrapper = mount(JvText, {
      props: {
        variant: 'mark',
      },
      slots: {
        default: '高亮文本',
      },
    })

    expect(wrapper.find('mark').exists()).toBe(true)
  })
})
