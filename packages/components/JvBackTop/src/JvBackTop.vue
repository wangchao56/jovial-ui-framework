<script setup lang="ts">
import type { JvBacktopEmits } from './JvBacktop'
import JvAffix from '@components/JvAffix'
import { JvButton } from '@components/JvButton'
import { createNamespace } from '@jienix/utils'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { jvBacktopProps } from './JvBacktop'

defineOptions({ name: 'JvBacktop', inheritAttrs: false })

const { right, bottom, visibilityHeight, duration, target } = defineProps(jvBacktopProps)
const emit = defineEmits<JvBacktopEmits>()
const bem = createNamespace('backTop')
const visible = ref(false)
const el = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | Window>(window)

// 处理滚动
function handleScroll() {
  if (!el.value)
    return
  const scrollTop = container.value instanceof Window
    ? document.documentElement.scrollTop
    : (container.value as HTMLElement).scrollTop

  visible.value = scrollTop >= visibilityHeight
}

// 滚动到顶部
function scrollToTop() {
  const begin = container.value instanceof Window
    ? document.documentElement.scrollTop
    : (container.value as HTMLElement).scrollTop
  const startTime = Date.now()

  const scroll = () => {
    const progress = (Date.now() - startTime) / duration
    if (progress < 1) {
      const scrollTop = begin * (1 - easeInOutCubic(progress))
      if (container.value instanceof Window) {
        document.documentElement.scrollTop = scrollTop
      }
      else {
        (container.value as HTMLElement).scrollTop = scrollTop
      }
      requestAnimationFrame(scroll)
    }
  }

  requestAnimationFrame(scroll)
}

// 缓动函数
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// 点击处理
function handleClick(event: MouseEvent) {
  scrollToTop()
  emit('click', event)
}

onMounted(() => {
  if (target === 'window') {
    container.value = window
  }
  else {
    container.value = document.querySelector(target) as HTMLElement
  }
  container.value?.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  container.value?.removeEventListener('scroll', handleScroll)
})

defineExpose({
  handleScroll,
  scrollToTop,
})
</script>

<template>
  <Transition name="fade">
    <JvAffix
      v-show="visible" ref="el" :class="bem.b()" :style="{
        right: `${right}px`,
        bottom: `${bottom}px`,
      }" position="bottom" :bottom-offset="bottom" :target="() => container" @click="handleClick"
    >
      <component
        :is="h(JvButton, {
          size: 'small',
          variant: 'plain',
          icon: '$arrowUpBold',
        }, $slots)"
      />
    </JvAffix>
  </Transition>
</template>
