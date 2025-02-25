<script lang="ts" setup>
import type { JvRowProps } from './type'
import { createNamespace } from '@jovial/utils'
import { useResizeObserver } from '@vueuse/core'
import { computed, provide, ref } from 'vue'

defineOptions({
  name: 'JvRow',
})

const props = withDefaults(defineProps<JvRowProps>(), {
  justify: 'start',
  align: 'top',
  gutter: 0,
  wrap: false,
})

const row = createNamespace('row')
const rowRef = ref<HTMLDivElement | null>(null)

// 控制自动换行
const finalWrap = ref(props.wrap)
const isOverflow = ref(false)

// 监听容器尺寸变化
useResizeObserver(rowRef, (entries) => {
  const entry = entries[0]
  if (!entry)
    return

  const { contentRect, target } = entry
  // 检查是否存在溢出
  isOverflow.value = Array.from(target.children).some((child) => {
    const childRect = child.getBoundingClientRect()
    return childRect.right > contentRect.right
  })

  // 当检测到溢出时自动启用换行
  if (isOverflow.value && !finalWrap.value) {
    finalWrap.value = true
  }
})

// 计算行样式
const rowStyle = computed(() => {
  const style: Record<string, string> = {}

  // 处理 gutter
  if (Array.isArray(props.gutter)) {
    const [horizontalGutter, verticalGutter] = props.gutter
    style.rowGap = `${verticalGutter}px`
    style.columnGap = `${horizontalGutter}px`
  }
  else if (props.gutter) {
    style.rowGap = `${props.gutter}px`
    style.columnGap = `${props.gutter}px`
  }

  return style
})

// 提供 gutter 信息给 col 组件
provide('JvRow', {
  gutter: props.gutter,
})

// 导出一些有用的状态
defineExpose({
  isOverflow,
  finalWrap,
})
</script>

<template>
  <div
    ref="rowRef"
    :class="[
      row.b(),
      `jv-row--justify-${justify}`,
      `jv-row--align-${align}`,
      row.is('wrap', wrap),
    ]"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<style>

</style>
