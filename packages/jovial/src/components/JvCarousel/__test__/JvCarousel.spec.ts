import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import JvCarousel from '../src/JvCarousel.vue'

describe('jvCarousel', () => {
  // 基础功能测试
  it('基础功能', async () => {
    const wrapper = mount(JvCarousel, {
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    expect(wrapper.findAll('.jv-carousel__container > div').length).toBe(3)
    expect(wrapper.find('.jv-carousel__indicators').exists()).toBe(true)
    expect(wrapper.findAll('.jv-carousel__indicator').length).toBe(3)
  })

  // 自动播放
  it('自动播放', async () => {
    vi.useFakeTimers()
    const wrapper = mount(JvCarousel, {
      props: {
        interval: 1000,
      },
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.vm.activeIndex).toBe(1)

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.vm.activeIndex).toBe(2)

    vi.useRealTimers()
  })

  // 手动切换
  it('手动切换', async () => {
    const wrapper = mount(JvCarousel, {
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)

    await wrapper.vm.next()
    expect(wrapper.vm.activeIndex).toBe(1)
    expect(wrapper.emitted('change')?.[0]).toEqual([1])

    await wrapper.vm.prev()
    expect(wrapper.vm.activeIndex).toBe(0)
    expect(wrapper.emitted('change')?.[1]).toEqual([0])
  })

  // 循环播放
  it('循环播放', async () => {
    const wrapper = mount(JvCarousel, {
      props: {
        loop: true,
      },
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)

    await wrapper.vm.prev()
    expect(wrapper.vm.activeIndex).toBe(2)

    await wrapper.vm.next()
    await wrapper.vm.next()
    await wrapper.vm.next()
    expect(wrapper.vm.activeIndex).toBe(0)
  })

  // 指示器点击
  it('指示器点击', async () => {
    const wrapper = mount(JvCarousel, {
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    await wrapper.findAll('.jv-carousel__indicator')[1].trigger('click')
    expect(wrapper.vm.activeIndex).toBe(1)
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  // 鼠标悬停暂停
  it('鼠标悬停暂停', async () => {
    vi.useFakeTimers()
    const wrapper = mount(JvCarousel, {
      props: {
        interval: 1000,
        pauseOnHover: true,
      },
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
          <div>3</div>
        `,
      },
    })

    await nextTick()
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(1000)
    expect(wrapper.vm.activeIndex).toBe(0)

    await wrapper.trigger('mouseleave')
    vi.advanceTimersByTime(1000)
    expect(wrapper.vm.activeIndex).toBe(1)

    vi.useRealTimers()
  })

  // 自定义指示器
  it('自定义指示器', async () => {
    const wrapper = mount(JvCarousel, {
      slots: {
        default: `
          <div>1</div>
          <div>2</div>
        `,
        indicator: `
          <template #indicator="{ index, active }">
            <div class="custom-indicator" :class="{ active }">{{ index }}</div>
          </template>
        `,
      },
    })

    await nextTick()
    expect(wrapper.findAll('.custom-indicator').length).toBe(2)
    expect(wrapper.find('.custom-indicator.active').text()).toBe('0')
  })

  // 垂直方向
  it('垂直方向', () => {
    const wrapper = mount(JvCarousel, {
      props: {
        direction: 'vertical',
      },
    })

    expect(wrapper.classes()).toContain('jv-carousel--vertical')
  })

  // 淡入淡出效果
  it('淡入淡出效果', () => {
    const wrapper = mount(JvCarousel, {
      props: {
        effect: 'fade',
      },
    })

    expect(wrapper.classes()).toContain('jv-carousel--fade')
  })
})
