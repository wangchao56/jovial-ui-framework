<script setup lang="ts">
import type { Size } from '@jienix/typings'
import type { JvAvatarEmits, JvAvatarSlots } from './JvAvatar'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { computed, defineEmits, ref } from 'vue'
import { avatarSizes, jvAvatarProps } from './JvAvatar'

defineOptions({ name: 'JvAvatar', inheritAttrs: false })
const { src, alt, text, icon, size, shape, bordered, clickable, fit, bgColor, color, customSize } = defineProps(jvAvatarProps)

const emit = defineEmits<JvAvatarEmits>()
defineSlots<JvAvatarSlots>()
const bem = createNamespace('avatar')
const imgError = ref(false)

const initials = computed(() => {
  if (!text)
    return ''

  return text
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

function onImageError(event: Event) {
  imgError.value = true
  emit('error', event)
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

const innerSize = computed(() => {
  if (avatarSizes.includes(size as Size))
    return size
  return 'medium'
})

useCssVars(() => {
  return {
    'jv-avatar-bg-color': bgColor,
    'jv-avatar-color': color,
    'jv-avatar-size': `${customSize}px`,
  }
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(innerSize),
      bem.m(shape),
      bem.m(fit),
      {
        'jv-avatar--bordered': bordered,
        'jv-avatar--clickable': clickable || to,
      },
    ]" @click="handleClick"
  >
    <img v-if="src" :src="src" :alt="alt" :class="bem.e('image')" @error="onImageError">

    <span v-else-if="$slots.default" :class="bem.e('content')">
      <slot />
    </span>

    <span v-else-if="text" :class="bem.e('text')">
      {{ initials }}
    </span>

    <span v-else-if="icon || $slots.icon" :class="bem.e('icon')">
      <slot name="icon">
        <JvIcon :name="icon" />
      </slot>
    </span>

    <span v-else-if="fallbackText" :class="bem.e('fallback-text')">
      {{ fallbackText }}
    </span>
  </div>
</template>
