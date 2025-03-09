<!-- jovial-ui/components/JvAvatar.vue -->
<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { jvAvatarProps } from './JvAvatar'

const props = defineProps(jvAvatarProps)

const emit = defineEmits(['click', 'error'])
const imgError = ref(false)

const initials = computed(() => {
  if (!props.text)
    return ''

  return props.text
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

function onImageError(event) {
  imgError.value = true
  emit('error', event)
}

function handleClick(event) {
  emit('click', event)
}
</script>

<template>
  <div
    class="jv-avatar" :class="[
      `jv-avatar--${size}`,
      `jv-avatar--${variant}`,
      {
        'jv-avatar--bordered': bordered,
        'jv-avatar--clickable': clickable || to,
      },
    ]" :style="{
      backgroundColor: bgColor,
      color: textColor,
      width: customSize ? `${customSize}px` : null,
      height: customSize ? `${customSize}px` : null,
      fontSize: customSize ? `${customSize * 0.4}px` : null,
    }" @click="handleClick"
  >
    <img v-if="src" :src="src" :alt="alt" class="jv-avatar__image" @error="onImageError">

    <span v-else-if="$slots.default" class="jv-avatar__content">
      <slot />
    </span>

    <span v-else-if="text" class="jv-avatar__text">
      {{ initials }}
    </span>

    <span v-else-if="icon" class="jv-avatar__icon">
      <i class="jv-icon" :class="icon" />
    </span>
  </div>
</template>

<style>
.jv-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--jv-primary);
  color: var(--jv-on-primary);
  font-family: var(--jv-font-family);
  font-weight: var(--jv-font-weight-medium);
  user-select: none;
}

/* 尺寸变体 */
.jv-avatar--small {
  width: 32px;
  height: 32px;
  font-size: 14px;
}

.jv-avatar--medium {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.jv-avatar--large {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.jv-avatar--xlarge {
  width: 64px;
  height: 64px;
  font-size: 24px;
}

/* 形状变体 */
.jv-avatar--circle {
  border-radius: 50%;
}

.jv-avatar--rounded {
  border-radius: var(--jv-radius-medium);
}

.jv-avatar--square {
  border-radius: 0;
}

.jv-avatar--bordered {
  border: 2px solid var(--jv-background);
}

.jv-avatar--clickable {
  cursor: pointer;
  transition:
    transform var(--jv-transition-fast) var(--jv-easing-standard),
    box-shadow var(--jv-transition-fast) var(--jv-easing-standard);
}

.jv-avatar--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--jv-shadow-2);
}

.jv-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.jv-avatar__content,
.jv-avatar__text,
.jv-avatar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.jv-avatar__icon {
  font-size: 1.2em;
}
</style>
