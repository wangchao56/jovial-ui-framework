<script setup lang="ts">
import type { JvMenuEmits, JvMenuProps } from './JvMenu'
import type { MenuItem } from './types'
import { useExpandedKeys, useSelectedKeys } from '@jienix/jovial-composables'
import { createNamespace } from '@jienix/utils'
import { computed, provide } from 'vue'
import JvMenuChildren from './components/JvMenuChildren.vue'
import { JvMenuContextKey } from './JvMenu'

defineOptions({ name: 'JvMenu' })

// 使用定义好的类型
const props = withDefaults(defineProps<JvMenuProps>(), {
  mode: 'vertical',
  defaultOpenKeys: () => [],
  defaultSelectedKeys: () => [],
  trigger: 'hover',
  items: () => [],
  multiple: false,
})

const emit = defineEmits<JvMenuEmits>()
const bem = createNamespace('menu')
const { expandedKeys, toggleKey, setExpandedKeys, collapseAll } = useExpandedKeys()
const { selectedKeys, setSelectedKeys, clearSelectedKeys, toggleSelectedKey } = useSelectedKeys({
  multiple: props.multiple,
  defaultSelectedKeys: props.defaultSelectedKeys,
})

onMounted(() => {
  setExpandedKeys(props.defaultOpenKeys)
  setSelectedKeys(props.defaultSelectedKeys)
})

onUnmounted(() => {
  clearSelectedKeys()
  collapseAll()
})

// 转换菜单数据为List数据
const MenuItems = computed<MenuItem[]>(() => {
  return props.items
})
// 处理选择事件
function handleSelect(item: MenuItem) {
  if (props.multiple) {
    toggleSelectedKey(item.key)
  }
  else {
    setSelectedKeys([item.key])
  }
  emit('update:selectedKeys', Array.from(selectedKeys.value))
}
// 处理展开事件
function handleExpand(key: PropertyKey) {
  toggleKey(key)
}
// 计算菜单样式
const menuStyle = computed(() => {
  return ''
})

// 提供上下文
provide(JvMenuContextKey, {
  mode: props.mode,
  trigger: props.trigger,
  openKeys: expandedKeys,
  selectedKeys,
  items: MenuItems.value,
  onSelect: (key: PropertyKey, item: MenuItem) => {
    handleSelect(item)
    emit('update:selectedKeys', Array.from(selectedKeys.value))
    emit('select', key, item)
  },
  onOpenChange: (key: PropertyKey) => {
    handleExpand(key)
    emit('update:openKeys', Array.from(expandedKeys.value))
    emit('openChange', Array.from(expandedKeys.value))
  },
})
</script>

<template>
  <nav
    :class="[
      bem.b(),
      bem.m(mode),
    ]"
    :style="menuStyle"
    aria-label="Main navigation"
    role="navigation"
  >
    <menu
      :class="bem.e('content')"
      :aria-label="`${mode} menu`"
      role="menubar"
    >
      <JvMenuChildren :items="items" />
    </menu>
  </nav>
</template>
