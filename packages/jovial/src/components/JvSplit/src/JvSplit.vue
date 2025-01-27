<script setup lang="ts">
import type { JvSplitEmits, JvSplitProps } from './JvSplit'
import { createNamespace, off, on } from '@jovial/utils'
import { computed, ref } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvSplit' })

const props = withDefaults(defineProps<JvSplitProps>(), {
  direction: 'horizontal',
  triggerSize: 3,
  disabled: false,
  defaultSize: 0.5,
  min: 0,
  max: 1,
})
const emit = defineEmits<JvSplitEmits>()
const bem = createNamespace('split')

const triggerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const uncontrolledSize = ref(props.defaultSize)

// 计算合并后的 size
const mergedSize = computed(() => {
  return props.size ?? uncontrolledSize.value
})

// 第一个面板样式
const firstPaneStyle = computed(() => {
  const size = mergedSize.value
  if (typeof size === 'string') {
    return {
      flex: `0 0 ${size}`,
    }
  }
  else {
    const sizePercent = size * 100
    return {
      flex: `0 0 calc(${sizePercent}% - ${(props.triggerSize * sizePercent) / 100}px)`,
    }
  }
})

// 触发器包装器样式
const triggerWrapperStyle = computed(() => {
  const isHorizontal = props.direction === 'horizontal'
  return {
    width: isHorizontal ? `${props.triggerSize}px` : '',
    height: isHorizontal ? '' : `${props.triggerSize}px`,
    cursor: isHorizontal ? 'col-resize' : 'row-resize',
  }
})

// 触发器样式
const triggerStyle = computed(() => {
  return props.direction === 'horizontal'
    ? {
        width: `${props.triggerSize}px`,
        height: '100%',
      }
    : {
        width: '100%',
        height: `${props.triggerSize}px`,
      }
})

// 处理鼠标事件
let offset = 0

function handleMouseDown(e: MouseEvent): void {
  e.preventDefault()
  isDragging.value = true
  emit('dragStart', e)

  const triggerEl = triggerRef.value
  if (triggerEl) {
    const rect = triggerEl.getBoundingClientRect()
    offset = props.direction === 'horizontal'
      ? e.clientX - rect.left
      : rect.top - e.clientY
  }

  const onMouseMove = (e: MouseEvent) => {
    updateSize(e)
    emit('dragMove', e)
  }

  const onMouseUp = (e: MouseEvent) => {
    off(document, 'mousemove', onMouseMove)
    off(document, 'mouseup', onMouseUp)
    isDragging.value = false
    emit('dragEnd', e)
    document.body.style.cursor = ''
  }

  document.body.style.cursor = triggerWrapperStyle.value.cursor
  on(document, 'mousemove', onMouseMove)
  on(document, 'mouseup', onMouseUp)
}

// 更新尺寸
function updateSize(e: MouseEvent): void {
  const containerEl = triggerRef.value?.parentElement
  if (!containerEl)
    return

  const rect = containerEl.getBoundingClientRect()
  const { direction, triggerSize, min, max } = props

  const containerSize = direction === 'horizontal'
    ? rect.width - triggerSize
    : rect.height - triggerSize

  let newSize = direction === 'horizontal'
    ? e.clientX - rect.left - offset
    : e.clientY - rect.top + offset

  // 处理最大最小值
  const minSize = typeof min === 'string'
    ? Number.parseFloat(min)
    : min * containerSize
  const maxSize = typeof max === 'string'
    ? Number.parseFloat(max)
    : max * containerSize

  newSize = Math.max(minSize, Math.min(maxSize, newSize))

  // 更新尺寸
  const finalSize = typeof mergedSize.value === 'string'
    ? `${newSize}px`
    : newSize / containerSize

  emit('update:size', finalSize)
  uncontrolledSize.value = finalSize
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      { [bem.m('disabled')]: disabled },
    ]"
  >
    <div
      :class="[bem.e('pane-1'), pane1Class]"
      :style="[firstPaneStyle, pane1Style]"
    >
      <slot name="pane-1" />
    </div>

    <div
      v-if="!disabled"
      ref="triggerRef"
      :class="bem.e('trigger-wrapper')"
      :style="triggerWrapperStyle"
      @mousedown="handleMouseDown"
    >
      <slot name="trigger">
        <div
          :class="[
            bem.e('trigger'),
            { [bem.em('trigger', 'active')]: isDragging },
          ]"
          :style="triggerStyle"
        />
      </slot>
    </div>

    <div
      :class="[bem.e('pane-2'), pane2Class]"
      :style="pane2Style"
    >
      <slot name="pane-2" />
    </div>
  </div>
</template>
