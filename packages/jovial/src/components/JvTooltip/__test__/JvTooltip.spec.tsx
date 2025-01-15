import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import JvTooltip from '../src/JvTooltip.vue'

const onVisibleChange = vi.fn()

describe('jvTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('basic tooltip', async () => {
    const wrapper = mount(() => {
      return (
        <JvTooltip content="hello tooltip" trigger="click" onVisibleChange={onVisibleChange}>
          <button id="trigger">trigger</button>
        </JvTooltip>
      )
    }, {
      attachTo: document.body,
    })
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy() // 触发器存在
    expect(wrapper.find('.jv-tooltip__popper').exists()).toBeFalsy() // 提示框不存在
    // console.log('before', wrapper.html())
    // 交互测试
    triggerArea.trigger('click')
    await vi.runAllTimers() // 触发器点击后，等待定时器执行
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    // console.log('after', wrapper.html())
    expect(wrapper.find('.jv-tooltip__popper').exists()).toBeTruthy() // 提示框存在
    expect(wrapper.get('.jv-tooltip__popper').text()).toBe('hello tooltip') // 提示框内容正确
    // 触发器再次点击，关闭提示框
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    // console.log('last after', wrapper.html())
    expect(wrapper.find('.jv-tooltip--popper').exists()).toBeFalsy() // 提示框不存在
  })

  it('tooltip click out siade', async () => {
    const wrapper = mount(() => {
      return (
        <div>
          <div id="outside">outside</div>
          <JvTooltip content="hello tooltip" trigger="click" onVisibleChange={onVisibleChange}>
            <button id="trigger">trigger</button>
          </JvTooltip>
        </div>
      )
    }, {
      attachTo: document.body,
    })
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    // 交互测试
    triggerArea.trigger('click')
    await vi.runAllTimers() // 触发器点击后，等待定时器执行
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    expect(wrapper.find('.jv-tooltip__popper').exists()).toBeTruthy() // 提示框存在

    // 触发器再次点击，关闭提示框
    // wrapper.find('#outside').trigger('mousedown')
    wrapper.find('#outside').trigger('touchstart')
    await vi.runAllTimers()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    expect(wrapper.find('.jv-tooltip__popper').exists()).toBeFalsy() // 提示框不存在
  })
})
