<script setup lang="ts">
import type { JvAvatarProps } from '@components/JvAvatar/src/JvAvatar'
import type { JvIconProps } from '@components/JvIcon/src/JvIcon'
import type { JvImageProps } from '@components/JvImage/src/JvImage'
import type { JvListItemPrependProps } from './types'

defineOptions({
  name: 'JvListItemPrepend',
  inheritAttrs: false,
})
/**
 * 前置插槽
 *
 * 预设JvAvatar组件
 *
 * 预设JvIcon组件
 *
 * 预设JvImage组件
 *
 *
 */
const { type, avatar, icon, image } = defineProps<JvListItemPrependProps>()

const avatarProps = computed<JvAvatarProps>(() => {
  if (typeof avatar === 'string') {
    return { src: avatar }
  }
  return avatar
})

const iconProps = computed<JvIconProps>(() => {
  if (typeof icon === 'string') {
    return { name: icon }
  }
  return icon
})

const imageProps = computed<JvImageProps>(() => {
  if (typeof image === 'string') {
    return { src: image }
  }
  return image
})
</script>

<template>
  <div class="jv-list-item--prepend">
    <slot>
      <JvAvatar v-if="type === 'avatar'" v-bind="avatarProps" />
      <JvIcon v-if="type === 'icon'" v-bind="iconProps" />
      <JvImage v-if="type === 'image'" v-bind="imageProps" />
    </slot>
  </div>
</template>
