<script setup lang="ts">
import type { JvTabPaneProps, JvTabsEmits, JvTabsSlots } from './JvTabs'
import JvEmpty from '@components/JvEmpty'
import { createNamespace, getUid, isString } from '@jienix/utils'
import { computed, h, reactive, ref, watch } from 'vue'
import JvTabNav from './JvTabNav.vue'
import JvTabPanel from './JvTabPanel.vue'
import { jvTabsContextKey, jvTabsProps } from './JvTabs'

defineOptions({ name: 'JvTabs', inheritAttrs: false })

const { tabs, position, type, width, height, closable, addable, align, centerActive } = defineProps(jvTabsProps)
const emit = defineEmits<JvTabsEmits>()
const slots = defineSlots<JvTabsSlots>()
const bem = createNamespace('tabs')
// 当前激活的标签页
const activeKey = defineModel<string>('activeKey', { required: false, default: '' })
// 标签页的唯一ID
const tabId = `jv-tabs-${getUid()}`

// 标签页set
const innerTabs = shallowReactive<Map<string, VNode>>((new Map()))

// 分段控制器滑动指示器相关
const segmentIndicatorStyle = reactive({
  width: '0px',
  height: '0px',
  transform: 'translateX(0px)',
  transition: 'transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
})

// 是否为分段控制器类型
const isSegmentType = computed(() => type === 'segment')

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
      icon: item.icon,
      disabled: item.disabled,
      closable: item.closable,
      content: item.content,
    })
  })
})

watch(() => panelVnodes.value, (newVal) => {
  innerTabs.clear() // 清空之前的标签页
  newVal.forEach((vnode) => {
    innerTabs.set(vnode.props?.name as string, vnode)
  })
  // 只有在activeKey为空或者不存在时才设置默认值
  if (!activeKey.value || !innerTabs.has(activeKey.value)) {
    const firstTabName = newVal[0]?.props?.name as string
    if (firstTabName) {
      activeKey.value = firstTabName
      emit('update:activeKey', firstTabName)
    }
  }
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

// 获取动画名称
const getTransitionName = computed(() => {
  if (position === 'top' || position === 'bottom') {
    return 'jv-tabs-fade-in-linear'
  }
  return position === 'left' ? 'jv-tabs-fade-in-right' : 'jv-tabs-fade-in-left'
})

// 处理标签页点击
function handleTabClick(key: string, item: JvTabPaneProps) {
  if (item.disabled)
    return
  activeKey.value = key
  emit('update:activeKey', key)
  emit('click', key, item)
}

// 处理标签页关闭
function handleTabClose(key: string, item: JvTabPaneProps) {
  innerTabs.delete(key)
  emit('close', key, item)

  // 如果关闭的是当前激活的标签页，则激活下一个标签页
  if (key === activeKey.value) {
    const keys = Array.from(innerTabs.keys())
    if (keys.length > 0) {
      activeKey.value = keys[0]
      emit('update:activeKey', keys[0])
    }
  }
}

// 处理添加标签页
function handleAddTab() {
  emit('add')
}

provide(jvTabsContextKey, {
  activeKey,
  closable: ref(closable),
  addable: ref(addable),
  type: ref(type),
  position: ref(position),
  align: ref(align),
  centerActive: ref(centerActive),
  bem,
  changeActiveKey: (name: string) => {
    const tabNode = innerTabs.get(name)
    handleTabClick(name, tabNode?.props as JvTabPaneProps)
  },
  addTab: (panelProps: JvTabPaneProps) => {
    innerTabs.set(panelProps.name, h(JvTabPanel, { ...panelProps }))
  },
  removeTab: (name: string) => {
    innerTabs.delete(name)
    const tabNode = innerTabs.get(name)
    handleTabClose(name, tabNode?.props as JvTabPaneProps)
  },
})

const tabNavItems = computed(() => {
  return Array.from(innerTabs.values()).map((item) => {
    return {
      ...item.props as JvTabPaneProps,
    }
  })
})
</script>

<template>
  <div :id="tabId" :class="containerClass" :style="styles" role="tablist">
    <!-- 标签页导航 -->
    <JvTabNav
      :tabs="tabNavItems"
      @add="handleAddTab"
    >
      <!-- 分段控制器滑动指示器 -->
      <div
        v-if="isSegmentType"
        :class="bem.e('segment-indicator')"
        :style="segmentIndicatorStyle"
      />
    </JvTabNav>

    <!-- 标签页内容区域 -->
    <div :class="bem.e('content')" :aria-labelledby="tabId" aria-live="polite" aria-atomic="true" role="tabpanel">
      <Transition :name="getTransitionName">
        <KeepAlive include="JvTabPanel">
          <component :is="renderPanel" v-if="renderPanel" />
          <div v-else :class="bem.e('empty')">
            <slot name="empty">
              <JvEmpty />
            </slot>
          </div>
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>
