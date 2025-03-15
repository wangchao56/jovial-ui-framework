<script setup lang="ts">
import type { JvTabPaneProps, JvTabsEmits, JvTabsSlots } from './JvTabs'
import { createNamespace, isString } from '@jienix/utils'
import { computed, h, ref, watch } from 'vue'
import JvTabNav from './JvTabNav.vue'
import JvTabPanel from './JvTabPanel.vue'
import { jvTabsContextKey, jvTabsProps } from './JvTabs'

defineOptions({ name: 'JvTabs', inheritAttrs: false })

const { tabs, position, type, width, height, closable, addable } = defineProps(jvTabsProps)
const emit = defineEmits<JvTabsEmits>()
const slots = defineSlots<JvTabsSlots>()
const bem = createNamespace('tabs')
// 当前激活的标签页
const activeKey = defineModel<string>('activeKey', { required: false, default: '' })

// 标签页set
const innerTabs = new Map<string, VNode>()

// 计算容器类名
const containerClass = computed(() => [
  bem.b(),
  bem.m(position),
  bem.m(type),
])

const panelVnodes = computed<VNode[]>(() => {
  const defaultSlot = slots.default?.()
  if (defaultSlot) {
    // 如果插槽有子节点，则返回子节点，否则返回插槽
    return defaultSlot.map(item => item.children ? item.children : item).flat() as VNode[]
  }
  if (tabs.length <= 0) {
    return []
  }
  return tabs.map((item) => {
    return h(JvTabPanel, {
      key: item.name,
      name: item.name,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      closable: item.closable,
      content: item.content,
    })
  })
})

watch(() => panelVnodes.value, (newVal) => {
  newVal.forEach((vnode) => {
    innerTabs.set(vnode.props?.name as string, vnode)
  })
  activeKey.value = newVal[0].props?.name as string
}, {
  immediate: true,
})

const renderPanel = computed(() => {
  return innerTabs.get(activeKey.value)
})

const styles = computed(() => {
  return {
    '--jv-tabs-width': isString(width) ? width : `${width}px`,
    '--jv-tabs-height': isString(height) ? height : `${height}px`,
  }
})

provide(jvTabsContextKey, {
  activeKey,
  closable: ref(closable),
  addable: ref(addable),
  type: ref(type),
  bem,
  changeActiveKey: (key: string) => {
    activeKey.value = key
    emit('update:activeKey', key)
  },
  addTab: (item: JvTabPaneProps) => {
    innerTabs.set(item.name, h(JvTabPanel, { ...item }))
  },
  removeTab: (key: string) => {
    innerTabs.delete(key)
  },
})
const tabNavItems = computed(() => {
  return panelVnodes.value.map((item) => {
    return {
      ...item.props as JvTabPaneProps,
    }
  })
})
</script>

<template>
  <div :class="containerClass" :style="styles">
    <!-- 标签页导航 -->
    <JvTabNav :tabs="tabNavItems" />
    <!-- KeepAlive 组件 -->
    <KeepAlive include="JvTabPanel">
      <component :is="renderPanel" />
    </KeepAlive>
  </div>
</template>
