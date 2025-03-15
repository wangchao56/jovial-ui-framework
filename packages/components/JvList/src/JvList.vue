<script setup lang="ts">
import type { ListItemType } from './types'
import { createNamespace } from '@jienix/utils'
import { provide, ref } from 'vue'
import { JvListContextKey, type JvListEmits, jvListProps, type JvListSlots } from './JvList'
import JvListChildren from './JvListChildren.vue'

defineOptions({
  name: 'JvList',
  inheritAttrs: true,
})

const props = defineProps(jvListProps)
const emit = defineEmits<JvListEmits>()
defineSlots<JvListSlots>()
const bem = createNamespace('list')
// 处理展开的节点
const expandedKeys = ref<string[]>(props.defaultExpandedKeys || [])
// 处理选中状态
const selectedKeys = ref<string[]>(props.defaultSelectedKeys || [])
// 处理激活状态
const activeKey = ref<string>(props.defaultActiveKey || '')

// 处理点击列表项
function handleClickListItem(val: ListItemType) {
  emit('clickItem', val)
}

// 处理选择列表项(多选)
function handleSelectListItem(val: ListItemType) {
  if (props.selectable && val.type === 'item') {
    selectedKeys.value = Array.from(new Set([...selectedKeys.value, val.key]))
  }
  emit('selectItem', val)
}

// 处理激活列表项
function handleActivateListItem(val: ListItemType) {
  if (props.activeable && val.type === 'item') {
    activeKey.value = val.key
  }
  emit('activateItem', val)
}

provide(JvListContextKey, {
  handleClickListItem,
  handleSelectListItem,
  handleActivateListItem,
  onExpanded: (key: string, expanded: boolean) => {
    if (expanded) {
      expandedKeys.value = Array.from(new Set([...expandedKeys.value, key]))
    }
    else {
      expandedKeys.value = expandedKeys.value.filter(k => k !== key)
    }
  },
  selectedKeys,
  activeKey,
  expandedKeys,
  indent: props.indent,
  items: props.items,
  props: toRefs(props),
})
</script>

<template>
  <component
    :is="tag" :class="[
      bem.b(),
      bem.m(lines),
      {
        'jv-list--bordered': bordered,
        'jv-list--clickable': clickable,
        'jv-list--hoverable': hoverable,
        'jv-list--selectable': selectable,
        'jv-list--show-divider': showDivider,
      },
    ]"
  >
    <slot name="header" />
    <slot>
      <JvListChildren v-for="item in items" :key="item.key" :item="item" :level="0" :type="item.type" />
    </slot>
    <slot name="footer" />
  </component>
</template>
