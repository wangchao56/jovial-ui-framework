import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import JvRate from '../src/JvRate.vue'

describe('jvRate', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(JvRate, {
      props: {
        modelValue: 0,
      },
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('.jv-icon').length).toBe(5) // 默认5个星星
  })

  it('updates value on click', async () => {
    const icons = wrapper.findAll('.jv-icon')
    await icons[2].trigger('click') // 点击第三个星星

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
    expect(wrapper.emitted('change')?.[0]).toEqual([3])
  })

  it('supports half star mode', async () => {
    await wrapper.setProps({ allowHalf: true })
    const icons = wrapper.findAll('.jv-icon')

    // 模拟鼠标移动到星星左半部分
    await icons[2].trigger('mousemove', {
      clientX: 0,
      target: {
        getBoundingClientRect: () => ({
          left: 0,
          width: 20,
        }),
      },
    })

    expect(wrapper.vm.hoverValue).toBe(2.5)
  })

  it('handles disabled state', async () => {
    await wrapper.setProps({ disabled: true })
    const icons = wrapper.findAll('.jv-icon')

    await icons[2].trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('handles readonly state', async () => {
    await wrapper.setProps({ readonly: true })
    const icons = wrapper.findAll('.jv-icon')

    await icons[2].trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('supports custom icons', async () => {
    await wrapper.setProps({
      icon: '$starFilled',
      voidIcon: '$starOutline',
      halfIcon: '$starHalf',
    })

    expect(wrapper.html()).toContain('$starOutline')
  })

  it('supports custom colors', async () => {
    await wrapper.setProps({
      color: '#ff0000',
      voidColor: '#cccccc',
    })

    // 验证渐变定义是否包含自定义颜色
    expect(wrapper.html()).toContain('#ff0000')
    expect(wrapper.html()).toContain('#cccccc')
  })

  it('shows text when enabled', async () => {
    await wrapper.setProps({
      showText: true,
      modelValue: 3,
    })

    await nextTick()
    expect(wrapper.find('.jv-rate__text').text()).toBe('一般')
  })

  it('supports custom texts', async () => {
    const texts = ['很差', '较差', '一般', '较好', '很好']
    await wrapper.setProps({
      showText: true,
      texts,
      modelValue: 3,
    })

    await nextTick()
    expect(wrapper.find('.jv-rate__text').text()).toBe('一般')
  })

  it('resets rating correctly', async () => {
    await wrapper.setProps({ modelValue: 3 })

    // @ts-expect-error: Exposed type
    await wrapper.vm.reset()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
    expect(wrapper.emitted('change')?.[0]).toEqual([0])
  })

  it('handles mouse events correctly', async () => {
    const icons = wrapper.findAll('.jv-icon')

    // 鼠标移入
    await icons[2].trigger('mousemove')
    expect(wrapper.vm.hoverValue).toBe(3)

    // 鼠标移出
    await wrapper.trigger('mouseleave')
    expect(wrapper.vm.hoverValue).toBe(-1)
  })

  it('supports different sizes', async () => {
    await wrapper.setProps({ size: 30 })

    const icon = wrapper.find('.jv-icon')
    expect(icon.attributes('style')).toContain('30px')
  })

  it('supports different gaps', async () => {
    await wrapper.setProps({ gap: 10 })

    const icons = wrapper.findAll('.jv-icon')
    expect(icons[0].attributes('style')).toContain('margin-right: 10px')
    // 最后一个图标不应该有间距
    expect(icons[4].attributes('style')).not.toContain('margin-right')
  })
})
