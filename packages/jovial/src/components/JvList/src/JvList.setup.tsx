import type { ExtractSlotsType, ListItem, ListItemType } from './types'
import JvDivider from '@components/JvDivider'
import { createNamespace } from '@jovial/utils'
import { createVNode, defineComponent, Fragment, onMounted, provide } from 'vue'
import { JvListContextKey, jvListEmits, jvListProps, type JvListSlots } from './JvList'
import JvListChildren from './JvListChildren.setup'
import '../style/style.css'

export default defineComponent({
  name: 'JvList',
  props: jvListProps,
  emits: jvListEmits,
  slots: Object as ExtractSlotsType<JvListSlots>,
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    const bem = createNamespace('list')
    const selectedKeys = ref<Set<string>>()
    const handleClickListItem = (val: ListItemType) => {
      emit('clickItem', val)
      if ((props.clickable || props.selectable)) {
        selectedKeys.value?.add((val as ListItemType).key)
      }
    }
    const handleSelectListItem = (val: ListItemType) => {
      emit('selectItem', val)
      if (props.selectable) {
        selectedKeys.value?.add((val as ListItemType).key)
      }
    }

    const expandedKeys = ref<Set<string>>(new Set(props.expandedKeys))

    const isExpanded = (key: string) => expandedKeys.value.has(key)

    const toggleExpand = (key: string) => {
      const newKeys = new Set(expandedKeys.value)
      if (props.accordion) {
        // 手风琴模式，清除同级其他展开的节点
        newKeys.clear()
      }

      if (newKeys.has(key)) {
        newKeys.delete(key)
      }
      else {
        newKeys.add(key)
      }

      expandedKeys.value = newKeys
      emit('update:expandedKeys', Array.from(newKeys))
      emit('expand', key, newKeys.has(key))
    }

    // 初始化默认展开
    onMounted(() => {
      if (props.defaultExpandAll) {
        const allKeys = new Set<string>()
        const collectKeys = (items: ListItem[]) => {
          items.forEach((item) => {
            if (item.type === 'group' && item.children?.length) {
              allKeys.add(item.key)
              collectKeys(item.children)
            }
          })
        }
        collectKeys(props.items)
        expandedKeys.value = allKeys
      }
    })

    provide(JvListContextKey, {
      handleClickListItem,
      handleSelectListItem,
      isExpanded,
      toggleExpand,
      indent: props.indent,
      props,
      level: 0,
    })

    const containerRef = ref<HTMLElement>()

    return () => {
      const { bordered, items, showDivider } = props
      const children = [
        slots.header && createVNode(Fragment, null, slots.header()),
        showDivider && createVNode(JvDivider),
        slots.default && createVNode(Fragment, null, slots.default()),
        createVNode(JvListChildren, {
          items,
          slots: {
            item: slots.item,
          },
        }),
        showDivider && createVNode(JvDivider),
        slots.footer && createVNode(Fragment, null, slots.footer()),
      ].filter(Boolean)

      return createVNode(props.tag, {
        ref: containerRef,
        class: [bem.b(), bem.is('bordered', bordered)],
      }, children)
    }
  },
})
