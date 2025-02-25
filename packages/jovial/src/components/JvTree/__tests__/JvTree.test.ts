import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTree from '../src/tree.vue'

const treeData = [
  {
    key: '1',
    label: '节点1',
    children: [
      {
        key: '1-1',
        label: '节点1-1',
      },
      {
        key: '1-2',
        label: '节点1-2',
      },
    ],
  },
  {
    key: '2',
    label: '节点2',
  },
]

describe('jvTree', () => {
  it('基础渲染', () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
      },
    })
    expect(wrapper.find('.jv-tree').exists()).toBe(true)
    expect(wrapper.findAll('.jv-tree-node')).toHaveLength(2) // 初始只显示顶层节点
  })

  it('节点展开/折叠', async () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
      },
    })

    // 点击展开第一个节点
    await wrapper.find('.jv-tree-node-expand-icon').trigger('click')
    expect(wrapper.findAll('.jv-tree-node')).toHaveLength(4) // 1 + 2 + 1

    // 再次点击折叠
    await wrapper.find('.jv-tree-node-expand-icon').trigger('click')
    expect(wrapper.findAll('.jv-tree-node')).toHaveLength(2)
  })

  it('节点选择', async () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
        selectable: true,
      },
    })

    await wrapper.find('.jv-tree-node-content').trigger('click')
    expect(wrapper.emitted('update:selectedKeys')?.[0]).toEqual([['1']])
  })

  it('多选', async () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
        selectable: true,
        multiple: true,
        selectedKeys: ['1'],
      },
    })

    const nodes = wrapper.findAll('.jv-tree-node-content')
    await nodes[1].trigger('click')
    expect(wrapper.emitted('update:selectedKeys')?.[0]).toEqual([['1', '2']])
  })

  it('复选框功能', async () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
        showCheckbox: true,
      },
    })

    // 点击第一个复选框
    await wrapper.find('.jv-checkbox').trigger('click')

    // 展开节点查看子节点状态
    await wrapper.find('.jv-tree-node-expand-icon').trigger('click')

    // 验证子节点也被选中
    const checkboxes = wrapper.findAll('.jv-checkbox-checked')
    expect(checkboxes.length).toBe(3) // 父节点和两个子节点都应该被选中
  })

  it('默认展开节点', () => {
    const wrapper = mount(JvTree, {
      props: {
        data: treeData,
        defaultExpandedKeys: ['1'],
      },
    })
    expect(wrapper.findAll('.jv-tree-node')).toHaveLength(4)
  })
})
