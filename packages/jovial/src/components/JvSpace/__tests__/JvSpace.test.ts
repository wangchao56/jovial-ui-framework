import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSpace from '../src/JvSpace.vue'

describe('jvSpace', () => {
  // 测试默认渲染
  it('renders default space correctly', () => {
    const wrapper = mount(JvSpace, {
      slots: {
        default: '<div>test content</div>',
      },
    })

    expect(wrapper.classes()).toContain('jv-space')
    expect(wrapper.classes()).toContain('jv-space--horizontal')
    expect(wrapper.classes()).toContain('jv-space--align-start')
    expect(wrapper.classes()).toContain('jv-space--justify-start')
  })

  // 测试direction属性
  it('renders with vertical direction', () => {
    const wrapper = mount(JvSpace, {
      props: {
        direction: 'vertical',
      },
    })
    expect(wrapper.classes()).toContain('jv-space--vertical')
  })

  // 测试size属性
  it('applies correct size styles', async () => {
    const wrapper = mount(JvSpace, {
      props: {
        size: 'small',
      },
    })

    expect(wrapper.attributes('style')).toContain('--jv-space-size: 8px')
    expect(wrapper.attributes('style')).toContain('--jv-space-vertical-size: 8px')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.attributes('style')).toContain('--jv-space-size: 24px')
    expect(wrapper.attributes('style')).toContain('--jv-space-vertical-size: 24px')

    await wrapper.setProps({ size: [10, 20] })
    expect(wrapper.attributes('style')).toContain('--jv-space-size: 10px')
    expect(wrapper.attributes('style')).toContain('--jv-space-vertical-size: 20px')
  })

  // 测试align属性
  it('renders with different align values', async () => {
    const wrapper = mount(JvSpace)

    for (const align of ['start', 'end', 'center', 'baseline', 'stretch']) {
      await wrapper.setProps({ align })
      expect(wrapper.classes()).toContain(`jv-space--align-${align}`)
    }
  })

  // 测试justify属性
  it('renders with different justify values', async () => {
    const wrapper = mount(JvSpace)

    for (const justify of ['start', 'end', 'center', 'between', 'around', 'evenly']) {
      await wrapper.setProps({ justify })
      expect(wrapper.classes()).toContain(`jv-space--justify-${justify}`)
    }
  })

  // 测试wrap属性
  it('applies wrap class when wrap is true', () => {
    const wrapper = mount(JvSpace, {
      props: {
        wrap: true,
      },
    })
    expect(wrapper.classes()).toContain('is-wrap')
  })

  // 测试inline属性
  it('applies inline class when inline is true', () => {
    const wrapper = mount(JvSpace, {
      props: {
        inline: true,
      },
    })
    expect(wrapper.classes()).toContain('is-inline')
  })

  // 测试插槽渲染
  it('renders multiple children in slot correctly', () => {
    const wrapper = mount(JvSpace, {
      slots: {
        default: [
          '<div>Item 1</div>',
          '<div>Item 2</div>',
          '<div>Item 3</div>',
        ],
      },
    })

    expect(wrapper.findAll('div > div')).toHaveLength(3)
  })
})
