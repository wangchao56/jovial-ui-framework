<script setup lang="ts">
import type { Slot } from 'vue'
import RenderVNode from '@components/internal/RenderVnode'
import { computed, onActivated, onDeactivated, onUnmounted, ref } from 'vue'
import { type JvTabPaneProps, type JvTabsContext, jvTabsContextKey } from './JvTabs'

defineOptions({
  name: 'JvTabPanel',
  inheritAttrs: false,
})

const { name, content } = defineProps<JvTabPaneProps>()

defineSlots<{
  default?: Slot
}>()

const { activeKey, bem } = inject(jvTabsContextKey) as JvTabsContext

const active = computed(() => {
  return activeKey.value === name
})

// 是否已经渲染过
const hasRendered = ref(false)

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  hasRendered.value = true
})

onDeactivated(() => {
  // 当组件被缓存时调用
})

onUnmounted(() => {
  // 当组件被销毁时调用
})
</script>

<template>
  <div
    :id="`jv-panel-${name}`"
    :class="[bem.e('panel'), bem.is('active', active)]"
    role="tabpanel"
    :aria-labelledby="`jv-tab-${name}`"
    :aria-hidden="!active"
  >
    <RenderVNode v-if="content" :class="bem.e('panel-content')" :vnode="content" />
    <div v-else :class="bem.e('panel-content')">
      <slot />
    </div>
  </div>
</template>

<style>
.jv-tabs__panel {
  display: none;
  padding: 16px;
}

.jv-tabs__panel.is-active {
  display: block;
}

.jv-tabs__panel-content {
  width: 100%;
  height: 100%;
}
</style>
