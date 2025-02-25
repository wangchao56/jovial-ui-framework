import type { BreadcrumbItem } from '../src/JvBreadcrumb'
import JvBreadcrumb from '@components/JvBreadcrumb/src/JvBreadcrumb.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('jvBreadcrumb 组件', () => {
  // 基础测试数据
  const basicItems: BreadcrumbItem[] = [
    { key: '1', label: '首页' },
    { key: '2', label: '列表页' },
    { key: '3', label: '详情页' },
  ]

  // 测试基本渲染
  it('应该正确渲染面包屑项', () => {
    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: basicItems,
        separator: '/',
        separatorIcon: 'chevron-right',
      },
    })

    // 检查面包屑项数量
    expect(wrapper.findAll('.jv-breadcrumb__item')).toHaveLength(3)

    // 检查文本内容
    const labels = wrapper.findAll('.jv-breadcrumb__label')
    expect(labels[0].text()).toBe('首页')
    expect(labels[1].text()).toBe('列表页')
    expect(labels[2].text()).toBe('详情页')
  })

  // 测试分隔符
  it('应该正确渲染自定义分隔符', () => {
    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: basicItems,
        separator: '>',
        separatorIcon: 'chevron-right',
      },
    })

    const separators = wrapper.findAll('.jv-breadcrumb__separator')
    expect(separators).toHaveLength(2) // 应该有2个分隔符
    expect(separators[0].text()).toBe('>')
  })

  // 测试带图标的面包屑
  it('应该正确渲染带图标的面包屑项', () => {
    const itemsWithIcon: BreadcrumbItem[] = [
      { key: '1', label: '首页', icon: 'home' },
    ]

    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: itemsWithIcon,
        separator: '>',
        separatorIcon: 'chevron-right',
      },
    })

    expect(wrapper.find('.jv-breadcrumb__icon').exists()).toBe(true)
  })

  // 测试点击事件
  it('点击非禁用项时应该触发click事件', async () => {
    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: basicItems,
      },
    })

    await wrapper.findAll('.jv-breadcrumb__item')[1].trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([basicItems[1]])
  })

  // 测试禁用状态
  it('点击禁用项时不应该触发click事件', async () => {
    const itemsWithDisabled: BreadcrumbItem[] = [
      { key: '1', label: '首页' },
      { key: '2', label: '列表页', disabled: true },
    ]

    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: itemsWithDisabled,
      },
    })

    const disabledItem = wrapper.findAll('.jv-breadcrumb__item')[1]
    expect(disabledItem.classes()).toContain('is-disabled')

    await disabledItem.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试自定义插槽
  it('应该正确渲染自定义item插槽', () => {
    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: basicItems,
      },
      slots: {
        item: `<template #item="{ item }">
          <span class="custom-item">{{ item.label }}</span>
        </template>`,
      },
    })

    expect(wrapper.findAll('.custom-item')).toHaveLength(3)
  })

  // 测试分隔符图标
  it('应该正确渲染分隔符图标', () => {
    const wrapper = mount(JvBreadcrumb, {
      props: {
        items: basicItems,
        separatorIcon: 'arrow-right',
      },
    })

    const separators = wrapper.findAll('.jv-breadcrumb__separator')
    expect(separators[0].find('.jv-icon').exists()).toBe(true)
  })
})
