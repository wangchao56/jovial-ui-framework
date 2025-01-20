<script setup lang="ts">
import type { PopperProps, PopperSlots } from './popper'
import JvRenderVNodeContent from '@components/internal/render-vnode-content.setup'
import { createNamespace } from '@jovial/utils'
import { createPopper, type Instance, type PositioningStrategy } from '@popperjs/core'
// import flip from '@popperjs/core/lib/modifiers/flip'
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import {
  computed,
  ref,
} from 'vue'
// 1. 定义组件名称
defineOptions({ name: 'JvPopper' })
// 2. 完善 props
const props = withDefaults(defineProps<PopperProps>(), {
  arrow: false,
})
// 3. 定义 emitted 事件
const slots = defineSlots<PopperSlots>()
const bem = createNamespace('popper')
// 5. 定义引用和插槽
const popperNode = ref<HTMLElement>()
// const isOpen = ref<boolean>(false)
let popperInstance: Instance | null = null
// 显示

const visible = defineModel({
  type: Boolean,
  default: false,
})

const options = computed(() => ({
  strategy: 'fixed' as PositioningStrategy,
  modifiers: [
    {
      name: 'offset',
      options: { offset: [0, 8] },
    },
  ],
  ...props.options,
}))
watch(() => visible.value, (newVal) => {
  if (newVal) {
    if (props.reference && popperNode.value) {
      popperInstance = createPopper(props.reference, popperNode.value, options.value)
    }
  }
  else {
    popperInstance?.destroy()
  }
}, { flush: 'post' })
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose({
  update: () => {
    popperInstance?.forceUpdate()
  },
  destroy: () => {
    popperInstance?.destroy()
  },
  popperInstance,
})

const id = useId()

const content = computed(() => props.content || slots.default)
</script>

<template>
  <div v-if="visible" :id="id" ref="popperNode" :class="bem.b()">
    <JvRenderVNodeContent :render="content" />
    <div v-if="arrow" id="jv-popper-arrow" data-popper-arrow />
  </div>
</template>

<style scoped>
/* 进入阶段的过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

/* 进入开始时的样式 */
.fade-enter-from {
  opacity: 0;
  position: fixed;
}

/* 进入结束时的样式（通常是目标样式，但在这种情况下与 .fade-enter-active 相同） */
.fade-enter-to {
  opacity: 1;
}

/* 离开开始时的样式 */
.fade-leave-from {
  opacity: 1;
}

/* 离开结束时的样式 */
.fade-leave-to {
  opacity: 0;
  position: fixed;
}
</style>
