<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { createNamespace, isNumberExcludeNaN, isString, sizeOptions } from '@jienix/utils'
import { computed, normalizeClass } from 'vue'
import { icons, jvIconProps } from './JvIcon'

defineOptions({ name: 'JvIcon', inheritAttrs: false })
const { color, size, name, class: className } = defineProps(jvIconProps)

const bem = createNamespace('icon')

const iconStyle = computed(() => {
  const result = {} as Record<string, string>
  if (isNumberExcludeNaN(size)) {
    result.fontSize = `${size}px`
    result.width = `${size}px`
    result.height = `${size}px`
    result.maxHeight = `${size}px`
    result.maxWidth = `${size}px`
  }
  return result
})

const show = computed(() => name && !String(name).startsWith('$'))

const internalIconVnode = computed(() => {
  if (name && String(name).startsWith('$')) {
    const iconName = name as keyof typeof icons
    return icons[iconName]
  }
  return null
})

const innerSize = computed(() => {
  if (isString(size) && sizeOptions.includes(size as string)) {
    return size
  }
  return ''
})
</script>

<template>
  <i
    :class="[bem.b(), { [bem.m(innerSize)]: innerSize }, normalizeClass(className), { [bem.m(type)]: type !== 'default' }]"
    :style="iconStyle"
  >
    <slot v-if="$slots.default" />
    <Icon v-else-if="show && name" :icon="name" :color="color" />
    <component :is="internalIconVnode" v-else-if="internalIconVnode" />
  </i>
</template>
