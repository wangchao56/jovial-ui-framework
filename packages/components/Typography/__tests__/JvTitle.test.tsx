import JvTitle from '@components/Typography/src/JvTitle.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvTitle', () => {
  it('renders with correct heading level', () => {
    const wrapper = mount(JvTitle, {
      props: {
        level: 2,
      },
      slots: {
        default: '测试标题',
      },
    })

    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.text()).toContain('测试标题')
  })

  it('applies writing mode correctly', () => {
    const wrapper = mount(JvTitle, {
      props: {
        level: 1,
        writingMode: 'vertical',
      },
    })

    expect(wrapper.classes()).toContain('jv-title')
  })
})
