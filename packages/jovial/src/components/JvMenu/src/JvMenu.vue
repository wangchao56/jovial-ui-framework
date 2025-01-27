<script setup lang="ts">
import type { JvMenuEmits, JvMenuProps } from './JvMenu'
import type { MenuItem } from './types'
import { useExpandedKeys, useSelectedKeys } from '@/composables'
import { createNamespace } from '@jovial/utils'
import { computed, provide, watch } from 'vue'
import JvMenuChildren from './components/JvMenuChildren.vue'
import { JvMenuContextKey } from './JvMenu'
import '../style/style.css'

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
const { selectedKeys, setSelectedKeys, clearSelectedKeys, toggleSelectedKey } = useSelectedKeys()
watch(() => expandedKeys.value, (newVal) => {
  console.log('expandedKeys', newVal)
})

watch(() => selectedKeys.value, (newVal) => {
  console.log('selectedKeys', newVal)
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
    console.log('onSelect', key, item)
    handleSelect(item)
    emit('update:selectedKeys', Array.from(selectedKeys.value))
    emit('select', key, item)
  },
  onOpenChange: (key: PropertyKey, expanded: boolean) => {
    console.log('onOpenChange', key, expanded)
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
      role="menu"
    >
      <JvMenuChildren :items="items" />
    </menu>
  </nav>
</template>

<style>
.jv-menu {
  border-right: 1px solid var(--jv-border-color);
  transition: width 0.3s;
  min-width: 200px;
  height: 100%;
}

.jv-menu--horizontal {
  border-right: none;
  border-bottom: 1px solid var(--jv-border-color);
  min-width: auto;
  width: 100%;
}

.jv-menu .jv-list {
  height: 100%;
}

.jv-menu .jv-list-item {
  padding: 12px 16px;
}

.jv-menu .jv-list-group {
  margin: 4px 0;
}

.jv-menu.is-collapsed .jv-list-item__content {
  display: none;
}

.jv-menu.is-collapsed .jv-list-group__title {
  display: none;
}

/* 添加焦点样式 */
.jv-menu :focus-visible {
  outline: 2px solid var(--jv-color-primary);
  outline-offset: -2px;
}

/* 添加键盘导航指示器 */
.jv-menu [role='menuitem']:focus-visible::before {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: var(--jv-color-primary);
}

/* 修复 IE 兼容性问题 */
.jv-menu .jv-list-item > * {
  align-self: center;
}
</style>
