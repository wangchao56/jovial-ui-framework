<script setup lang="ts">
import type { JvMessageExpose, JvMessageProps } from './JvMessage'
import RenderVnode from '@components/internal/RenderVnode'
import { JvButton } from '@components/JvButton'
import JvIcon from '@components/JvIcon'
import { useZIndex } from '@jienix/jovial-composables'
import { createNamespace } from '@jienix/utils'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { v4 as uuid4 } from 'uuid'
import { getPrevBottomOffset, messageInstances } from './method'

defineOptions({ name: 'JvMessage', inheritAttrs: false })
const props = withDefaults(defineProps<JvMessageProps>(), {
  closable: false,
  visible: false,
  type: 'info',
  duration: 3000,
  offset: 20,
})
const bem = createNamespace('message')
const messageRef = ref<HTMLElement>()
const model = useModel(props, 'modelValue')
const compId = uuid4()
// 1.是否显示关闭按钮
const visible = ref(true)

let timer: NodeJS.Timeout | null = null
const context = getCurrentInstance()
messageInstances.push(context!)
// 2.消息框的高度，用于计算下一个消息的位置
const height = ref(0)
// 3.上一个实例的底部偏移量，用于计算当前消息的位置
const lastOffset = computed(() => getPrevBottomOffset(context?.uid))
// 4.当前消息的顶部偏移量，用于计算下一个消息的位置
const topOffset = computed(() => {
  return lastOffset.value + props.offset
})
// 5.当前消息的底部偏移量，用于计算下一个消息的位置
const bottomOffset = computed<number>(() => {
  return height.value + topOffset.value
})

const { next: nextZIndex } = useZIndex()

const cssStyle = computed(() => ({
  transform: `translate(-50%,${topOffset.value}px)`,
  zIndex: nextZIndex(),
}))

// 监听键盘事件，按下Esc键时关闭消息框
const cleanup = useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    visible.value = false
  }
})

function handleClose(_e: MouseEvent) {
  visible.value = false
}

function startTimer() {
  if (props.duration === 0)
    return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

function clearTimer() {
  if (timer)
    clearTimeout(timer)
}

function destoryComponent() {
  const index = messageInstances.findIndex(item => item?.uid === context!.uid)
  messageInstances.splice(
    index,
    1,
  )
  props.onDestory?.()
}

useResizeObserver(messageRef, (entries) => {
  const entry = entries[0]
  height.value = entry.contentRect.height
})

watch(() => model.value, (val) => {
  visible.value = val
})

onMounted(async () => {
  startTimer()
  nextZIndex()
})

onUnmounted(() => {
  cleanup()
  if (timer)
    clearTimeout(timer)
})

defineExpose<JvMessageExpose>({
  bottomOffset,
  visible,
})

const icons = {
  info: 'mdi:information-slab-circle-outline',
  success: 'mdi:check-circle-outline',
  warning: 'mdi:alert-circle-outline',
  danger: 'mdi:alien-outline',
}
</script>

<template>
  <Transition name="fade-up" @after-leave="destoryComponent">
    <div
      v-if="visible" :id="compId" :key="compId" ref="messageRef" role="alert"
      :class="[bem.b(), bem.m(type), bem.is('closable', closable)]" :style="cssStyle" aria-live="assertive"
      aria-atomic="true" aria-hidden="false" @mouseenter="clearTimer" @mouseleave="startTimer"
    >
      <JvIcon :class="bem.e('prepend')" :name="icons[type]" />
      <slot>
        <RenderVnode tag="div" :class="bem.e('content')" :vnode="message" />
      </slot>
      <JvButton v-if="closable" size="tiny" :class="bem.e('append')" variant="text" @click="handleClose">
        <JvIcon :class="bem.em('append', 'icon')" name="ic:outline-close" />
      </JvButton>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
