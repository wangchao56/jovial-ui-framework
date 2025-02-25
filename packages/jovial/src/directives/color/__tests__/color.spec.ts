import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { Color } from '../index'

describe('color.ts', () => {
  const createWrapper = (directive = {}) => {
    return mount(defineComponent({
      data: () => ({
        color: '',
      }),
      render() {
        return h('div', {
          directives: [{
            ...directive,
            value: this.color,
          }],
        })
      },
    }), {
      global: {
        directives: {
          Color,
        },
        provide: {
          $vuetify: {
            theme: {
              currentTheme: {
                primary: '#1976d2',
              },
            },
          },
        },
      },
    })
  }

  describe('背景颜色测试', () => {
    it('应该正确设置背景颜色', async () => {
      const wrapper = createWrapper({
        name: 'Color',
      })

      await wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.backgroundColor).toBe('rgb(0, 17, 255)')
      expect(wrapper.element.style.borderColor).toBe('#01f')

      await wrapper.setData({ color: 'rgb(255, 255, 0)' })
      expect(wrapper.element.style.backgroundColor).toBe('rgb(255, 255, 0)')
      expect(wrapper.element.style.borderColor).toBe('rgb(255, 255, 0)')

      await wrapper.setData({ color: 'primary' })
      expect(wrapper.element.style.backgroundColor).toBe('rgb(25, 118, 210)')
      expect(wrapper.element.style.borderColor).toBe('#1976d2')
    })
  })

  describe('文本颜色测试', () => {
    it('应该正确设置文本颜色', async () => {
      const wrapper = createWrapper({
        name: 'Color',
        arg: 'text',
      })

      await wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.color).toBe('rgb(0, 17, 255)')
      expect(wrapper.element.style.caretColor).toBe('#01f')

      await wrapper.setData({ color: 'rgba(0, 1, 2, 0.5)' })
      expect(wrapper.element.style.color).toBe('rgba(0, 1, 2, 0.5)')
      expect(wrapper.element.style.caretColor).toBe('rgba(0, 1, 2, 0.5)')

      await wrapper.setData({ color: 'primary' })
      expect(wrapper.element.style.color).toBe('rgb(25, 118, 210)')
      expect(wrapper.element.style.caretColor).toBe('#1976d2')
    })
  })

  describe('边框颜色测试', () => {
    it('应该正确设置边框颜色', async () => {
      const wrapper = createWrapper({
        name: 'Color',
        arg: 'border',
      })

      await wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.borderColor).toBe('#01f')

      await wrapper.setData({ color: 'rgb(255, 255, 0)' })
      expect(wrapper.element.style.borderColor).toBe('rgb(255, 255, 0)')

      await wrapper.setData({ color: 'primary' })
      expect(wrapper.element.style.borderColor).toBe('#1976d2')
    })

    it('应该正确处理边框方向修饰符', async () => {
      const wrapper = createWrapper({
        name: 'Color',
        arg: 'border',
        modifiers: { top: true, right: true, left: true },
      })

      await wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderTopColor).toBe('#fff')
      expect(wrapper.element.style.borderRightColor).toBe('#fff')
      expect(wrapper.element.style.borderLeftColor).toBe('#fff')
      expect(wrapper.element.style.borderBottomColor).toBe('')
      expect(wrapper.element.style.borderColor).toBe('')
    })
  })

  describe('渐变颜色测试', () => {
    it('应该正确设置渐变颜色', async () => {
      const wrapper = createWrapper({
        name: 'Color',
        arg: 'gradient',
      })

      await wrapper.setData({ color: 'to right, primary, #ff0' })
      expect(wrapper.element.style.backgroundImage)
        .toBe('linear-gradient(to right, rgb(25, 118, 210), rgb(255, 255, 0))')
    })
  })
})
