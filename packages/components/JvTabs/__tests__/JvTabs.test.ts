import type { TabPosition, TabType } from '../src/JvTabs'
import { describe, expect, it } from 'vitest'
import JvTabNav from '../src/JvTabNav.vue'
import JvTabPanel from '../src/JvTabPanel.vue'
import { createTabsTest } from './tabs-test-utils'

describe('jvTabs 组件', () => {
  // 基础渲染测试
  describe('渲染', () => {
    it('应该正确渲染基础结构', () => {
      const { wrapper } = createTabsTest()
      expect(wrapper.find('.jv-tabs').exists()).toBe(true)
      expect(wrapper.findComponent(JvTabNav).exists()).toBe(true)
    })

    it('应该渲染默认插槽内容', () => {
      const { wrapper } = createTabsTest({
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
      })

      expect(wrapper.findAllComponents(JvTabPanel).length).toBe(2)
      expect(wrapper.findComponent(JvTabNav).exists()).toBe(true)
    })
  })

  // 属性测试
  describe('属性', () => {
    it('应该正确应用 position 属性', async () => {
      const positions: TabPosition[] = ['top', 'right', 'bottom', 'left']

      for (const position of positions) {
        const { wrapper } = createTabsTest({ props: { position } })
        expect(wrapper.classes()).toContain(`jv-tabs--${position}`)
      }
    })

    it('应该正确应用 type 属性', async () => {
      const types: TabType[] = ['line', 'card', 'segment']

      for (const type of types) {
        const { wrapper } = createTabsTest({ props: { type } })
        // 由于type是通过provide/inject传递给JvTabNav的，我们检查JvTabs的类名
        expect(wrapper.classes()).toContain(`jv-tabs--${type}`)
      }
    })

    it('应该正确应用 width 和 height 属性', () => {
      const { wrapper } = createTabsTest({
        props: {
          width: '300px',
          height: '200px',
        },
      })

      expect(wrapper.attributes('style')).toContain('--jv-tabs-width: 300px')
      expect(wrapper.attributes('style')).toContain('--jv-tabs-height: 200px')
    })

    it('应该正确应用 closable 属性', () => {
      const { wrapper } = createTabsTest({
        props: { closable: true },
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
          `,
        },
      })

      // closable是通过provide/inject传递给JvTabNav的
      expect(wrapper.props('closable')).toBe(true)
    })

    it('应该正确应用 addable 属性', () => {
      const { wrapper } = createTabsTest({
        props: { addable: true },
      })

      // addable是通过provide/inject传递给JvTabNav的
      expect(wrapper.props('addable')).toBe(true)
    })
  })

  // 事件测试
  describe('事件', () => {
    it('应该正确触发 update:activeKey 事件', async () => {
      const { wrapper } = createTabsTest({
        props: { activeKey: 'tab1' },
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
        global: {
          stubs: {
            JvTabNav: false,
          },
        },
      })

      // 模拟 TabNav 组件触发 update:activeKey 事件
      await wrapper.findComponent(JvTabNav).vm.$emit('update:activeKey', 'tab2')

      expect(wrapper.emitted('update:activeKey')).toBeTruthy()
      expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['tab2'])
    })

    it('应该正确触发 click 事件', async () => {
      const { wrapper } = createTabsTest({
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
      })

      // 模拟 TabNav 组件触发 click 事件
      await wrapper.findComponent(JvTabNav).vm.$emit('click', 'tab2')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0]).toEqual(['tab2'])
    })

    it('应该正确触发 close 事件', async () => {
      const { wrapper } = createTabsTest({
        props: { closable: true },
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
      })

      // 模拟 TabNav 组件触发 close 事件
      await wrapper.findComponent(JvTabNav).vm.$emit('close', 'tab1')

      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close')?.[0]).toEqual(['tab1'])
    })

    it('应该正确触发 add 事件', async () => {
      const { wrapper, hasEmitted } = createTabsTest({
        props: { addable: true },
      })

      // 模拟 TabNav 组件触发 add 事件
      await wrapper.findComponent(JvTabNav).vm.$emit('add')

      expect(hasEmitted('add')).toBe(true)
    })
  })

  // 插槽测试
  describe('插槽', () => {
    it('应该正确渲染 nav 插槽', () => {
      const { wrapper } = createTabsTest({
        slots: {
          nav: '<div class="custom-nav">自定义导航</div>',
        },
      })

      expect(wrapper.find('.custom-nav').exists()).toBe(true)
      expect(wrapper.find('.custom-nav').text()).toBe('自定义导航')
    })

    it('应该正确渲染 navExtra 插槽', () => {
      const { wrapper } = createTabsTest({
        slots: {
          navExtra: '<div class="nav-extra">额外内容</div>',
        },
      })

      expect(wrapper.find('.nav-extra').exists()).toBe(true)
      expect(wrapper.find('.nav-extra').text()).toBe('额外内容')
    })
  })

  // 计算属性测试
  describe('计算属性', () => {
    it('应该正确计算 tabPanels', () => {
      const { wrapper } = createTabsTest({
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
      })

      // 获取组件实例上的计算属性
      const vm = wrapper.vm as any
      expect(vm.tabPanels).toBeDefined()
      expect(vm.tabPanels.length).toBe(2)
    })

    it('应该正确计算 currentActiveKey', async () => {
      const { wrapper, waitForUpdate } = createTabsTest({
        props: { activeKey: 'tab1' },
        slots: {
          default: `
            <jv-tab-panel key="tab1" tab="标签1">内容1</jv-tab-panel>
            <jv-tab-panel key="tab2" tab="标签2">内容2</jv-tab-panel>
          `,
        },
      })

      const vm = wrapper.vm as any
      expect(vm.currentActiveKey).toBe('tab1')

      // 更新 activeKey
      await wrapper.setProps({ activeKey: 'tab2' })
      await waitForUpdate()
      expect(vm.currentActiveKey).toBe('tab2')
    })
  })
})
