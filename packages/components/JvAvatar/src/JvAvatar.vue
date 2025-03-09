<script setup lang="ts">
import type { JvAvatarEmits } from './JvAvatar'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { computed, defineEmits, ref } from 'vue'
import { jvAvatarProps } from './JvAvatar'

defineOptions({ name: 'JvAvatar', inheritAttrs: false })
const { src, alt, text, icon, size, variant, bordered, clickable } = defineProps(jvAvatarProps)

const emit = defineEmits<JvAvatarEmits>()
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
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(size),
      bem.m(variant),
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

    <span v-else-if="icon" :class="bem.e('icon')">
      <JvIcon :name="icon" />
    </span>
  </div>
</template>
