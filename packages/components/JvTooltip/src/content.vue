<script setup lang="ts">
import type { RenderContent } from '@components/internal/types'
import JvRenderVNodeContent from '@components/internal/render-vnode-content.setup'
import { createNamespace } from '@jienix/utils'
import { useEventListener } from '@vueuse/core'

defineOptions({
  name: 'JvTooltipContent',
})
const props = defineProps<{
  renderContent: RenderContent
  trigger: string
  openFinal: () => void
  closeFinal: () => void
}>()
const bem = createNamespace('tooltip')

const contentRef = ref<HTMLElement | null>(null)
const openClearUp = ref<() => void>()
const closeClearUp = ref<() => void>()
// 挂载时执行
onMounted(() => {
  if (props.trigger === 'hover') {
    openClearUp.value = useEventListener(contentRef, 'mouseenter', props.openFinal, {
      capture: true,
      once: true,
    })
    closeClearUp.value = useEventListener(contentRef, 'mouseleave', props.closeFinal, {
      capture: true,
      once: true,
    })
  }
  else {
    openClearUp.value?.()
    closeClearUp.value?.()
  }
})

onBeforeUnmount(() => {
  // 卸载时执行
  openClearUp.value?.()
  closeClearUp.value?.()
})
</script>

<template>
  <div
    ref="contentRef"
    :class="bem.e('content')"
  >
    <JvRenderVNodeContent :render="renderContent" />
  </div>
</template>

<style lang="css" scoped>
@b tooltip {
  @e content {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #323232;
    color: #fff;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
