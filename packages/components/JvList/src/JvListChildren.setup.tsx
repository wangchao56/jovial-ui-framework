import type { ListGroupType, ListItem, ListItemType, SubHeaderType } from './types'
import JvDivider from '@components/JvDivider'
import { createNamespace } from '@jienix/utils'
import { createVNode, defineComponent, inject, type PropType, type VNode } from 'vue'
import { JvListContextKey } from './JvList'
import JvListGroup from './JvListGroup.setup'
import JvListItem from './JvListItem.setup'
import JvListSubheader from './JvListSubheader.setup'

const JvListChildren = defineComponent({
  name: 'JvListChildren',
  props: {
    items: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    level: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: 'ul',
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace('list-children')
    const listContext = inject(JvListContextKey) // 获取列表上下文 只读取 并修改状态

    const renderTreeNode = (node: ListItem): VNode => {
      if (node.type === 'divider') {
        return createVNode('li', { key: node.key }, [
          createVNode(JvDivider, { key: node.key }),
        ])
      }

      if (node.type === 'subheader') {
        const subheader = node as SubHeaderType
        return createVNode(JvListSubheader, {
          key: subheader.key,
          title: subheader.title,
          sticky: subheader.sticky,
          inset: subheader.inset,
        })
      }

      if (node.type === 'group') {
        const group = node as ListGroupType
        return createVNode(JvListGroup, {
          'key': group.key,
          'title': group.title,
          'items': group.children,
          'expanded': listContext?.isExpanded(group.key),
          'hasChildren': true,
          'expandIcon': group.expandIcon,
          'collapseIcon': group.collapseIcon,
          'metaRaw': group,
          'onUpdate:expanded': (val: boolean) => {
            if (val) {
              listContext?.toggleExpand(group.key)
            }
          },
        })
      }
      // 渲染列表项 node.type === 'item'
      return createVNode(JvListItem, {
        ...node.props,
        key: node.key,
        title: node.title,
        subtitle: node.subtitle,
        description: node.description,
        onClick: () => {
          listContext?.handleClickListItem(node as ListItemType)
        },
        onSelect: () => {
          listContext?.handleSelectListItem(node as ListItemType)
        },
        onExpand: () => {
          listContext?.toggleExpand(node.key)
        },
      })
    }

    return () => {
      const { items } = props
      if (slots.default) {
        return slots.default()
      }
      return createVNode(props.tag, {
        class: bem.b(),
      }, items.map(item =>
        slots.item
          ? slots.item({ item })
          : renderTreeNode(item),
      ))
    }
  },
})

export default JvListChildren
export type JvListChildrenInstance = InstanceType<typeof JvListChildren>
