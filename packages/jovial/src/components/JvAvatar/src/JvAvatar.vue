<script setup lang="ts">
import type { JvAvatarEmits } from './avatar'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, ref } from 'vue'
import { jvAvatarProps } from './JvAvatar.ts'
import '../style/style.css'

defineOptions({ name: 'JvAvatar' })

const props = defineProps(jvAvatarProps)
const emit = defineEmits<JvAvatarEmits>()
const bem = createNamespace('avatar')

const rootRef = ref<HTMLElement | null>(null)
const hasLoadError = ref(false)

// 计算样式
const avatarStyle = computed(() => {
  const style: Record<string, string> = {}

  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
    style.lineHeight = `${props.size}px`
    style.fontSize = `${Math.floor(props.size / 2)}px`
  }

  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }

  if (props.color) {
    style.color = props.color
  }

  return style
})

// 计算图标大小
const iconSize = computed(() => {
  if (props.iconSize)
    return props.iconSize
  if (typeof props.size === 'number') {
    return Math.floor(props.size * 0.6)
  }
  return ''
})

// 处理图片加载错误
function handleError(evt: Event) {
  hasLoadError.value = true
  emit('error', evt)
}

// 获取显示的文字
function getDisplayText() {
  if (hasLoadError.value && props.fallbackText) {
    return props.fallbackText
  }
  if (props.text) {
    return props.text.charAt(0).toUpperCase()
  }
  return ''
}

defineExpose({
  root: rootRef,
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      bem.b(),
      bem.m(typeof size === 'number' ? '' : size),
      bem.m(shape),
      bem.is('bordered', bordered),
    ]"
    :style="avatarStyle"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="src && !hasLoadError">
      <img
        :src="src"
        :style="{ objectFit: fit }"
        @error="handleError"
      >
    </template>
    <template v-else-if="icon || $slots.icon">
      <slot name="icon">
        <JvIcon
          v-if="icon"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
        />
      </slot>
    </template>
    <template v-else>
      <span :class="bem.e('text')">
        {{ getDisplayText() }}
      </span>
    </template>
  </div>
</template>
