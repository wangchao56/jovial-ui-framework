import type { TabPosition, TabType } from '../src/JvTabs'
/**
 * JvTabs组件测试辅助工具
 */
import { mount, type MountingOptions } from '@vue/test-utils'
import JvTabPanel from '../src/JvTabPanel.vue'
import JvTabs from '../src/JvTabs.vue'

/**
 * 创建标签页测试辅助函数
 * @param options 挂载选项
 * @returns 测试辅助对象
 */
export function createTabsTest(options: MountingOptions<{
  activeKey?: string
  position?: TabPosition
  type?: TabType
  width?: string | number
  height?: string | number
  closable?: boolean
  addable?: boolean
}> = {}) {
  // 默认配置
  const defaultOptions: Partial<MountingOptions<any>> = {
    global: {
      stubs: {
        'transition': false,
        'transition-group': false,
      },
      components: {
        JvTabPanel,
      },
    },
  }

  // 合并配置
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    global: {
      ...defaultOptions.global,
      ...options.global,
    },
  }

  // 挂载组件
  const wrapper = mount(JvTabs, mergedOptions as any)

  // 辅助函数
  return {
    wrapper,

    // 获取标签页导航
    getTabNav() {
      return wrapper.find('.jv-tabs__nav')
    },

    // 获取标签页内容区域
    getTabContent() {
      return wrapper.find('.jv-tabs__content')
    },

    // 获取所有标签页项
    getTabItems() {
      return wrapper.findAll('.jv-tab-nav-item')
    },

    // 获取特定标签页项
    getTabItem(index: number) {
      const items = wrapper.findAll('.jv-tab-nav-item')
      return items[index]
    },

    // 获取添加按钮
    getAddButton() {
      return wrapper.find('.jv-tabs__nav-add')
    },

    // 获取关闭按钮
    getCloseButtons() {
      return wrapper.findAll('.jv-tab-nav-item__close')
    },

    // 点击标签页
    async clickTab(index: number) {
      const items = wrapper.findAll('.jv-tab-nav-item')
      await items[index].trigger('click')
    },

    // 点击添加按钮
    async clickAddButton() {
      const addButton = wrapper.find('.jv-tabs__nav-add')
      await addButton.trigger('click')
    },

    // 点击关闭按钮
    async clickCloseButton(index: number) {
      const closeButtons = wrapper.findAll('.jv-tab-nav-item__close')
      await closeButtons[index].trigger('click')
    },

    // 检查事件是否被触发
    hasEmitted(event: string) {
      return !!wrapper.emitted()[event]
    },

    // 获取事件参数
    getEmittedArgs(event: string, index = 0) {
      const events = wrapper.emitted()[event]
      return events ? events[index] : undefined
    },

    // 等待组件更新
    async waitForUpdate() {
      await wrapper.vm.$nextTick()
      return wrapper
    },
  }
}
