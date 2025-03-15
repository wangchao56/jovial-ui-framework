<script setup lang="ts">
import type { JvAvatarProps } from '@components/JvAvatar'
import type { JvIconProps } from '@components/JvIcon'
import type { JvImageProps } from '@components/JvImage'
import type { JvListItemPrependProps } from './types'
import JvAvatar from '@components/JvAvatar'
import JvIcon from '@components/JvIcon'
import JvImage from '@components/JvImage'
import { computed } from 'vue'

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

// 自动判断类型
const autoType = computed(() => {
  if (type)
    return type
  if (avatar)
    return 'avatar'
  if (icon)
    return 'icon'
  if (image)
    return 'image'
  return undefined
})

const avatarProps = computed<Partial<JvAvatarProps>>(() => {
  if (typeof avatar === 'string') {
    return { src: avatar }
  }
  return avatar || {}
})

const iconProps = computed<Partial<JvIconProps>> (() => {
  if (typeof icon === 'string') {
    return { name: icon }
  }
  return icon || {}
})

const imageProps = computed<Partial<JvImageProps>>(() => {
  if (typeof image === 'string') {
    return { src: image }
  }
  return image || {}
})
</script>

<template>
  <div class="jv-list-item__prepend">
    <slot>
      <JvAvatar v-if="autoType === 'avatar'" v-bind="avatarProps" />
      <JvIcon v-if="autoType === 'icon'" v-bind="iconProps" />
      <JvImage v-if="autoType === 'image'" v-bind="imageProps" />
    </slot>
  </div>
</template>
