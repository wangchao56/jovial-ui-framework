<script setup lang="ts">
import type { Slot } from 'vue'
import RenderVNode from '@components/internal/RenderVnode'
import { onActivated, onDeactivated, onUnmounted } from 'vue'
import { type JvTabPaneProps, type JvTabsContext, jvTabsContextKey } from './JvTabs'

defineOptions({
  name: 'JvTabPanel',
  inheritAttrs: false,
})
const { content, name } = defineProps<JvTabPaneProps>()

defineSlots<{
  default?: Slot
}>()

const { activeKey, bem } = inject(jvTabsContextKey) as JvTabsContext

const active = computed(() => {
  return activeKey.value === name
})

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
})

onUnmounted(() => {

})
</script>

<template>
  <div
    :id="`jv-panel-${name}`" :class="bem.e('panel')" role="tabpanel" :aria-labelledby="`jv-tab-${name}`"
    :aria-hidden="!active"
  >
    <RenderVNode v-if="content" :class="bem.e('panel-content')" :vnode="content" />
    <div v-else :class="bem.e('panel-content')">
      <slot />
    </div>
  </div>
</template>
