<script setup lang="ts">
import type { JvEmptyEmits } from './JvEmpty'
import { createNamespace } from '@jienix/utils'
import { jvEmptyProps } from './JvEmpty'

defineOptions({ name: 'JvEmpty', inheritAttrs: false })
defineProps(jvEmptyProps)
defineEmits<JvEmptyEmits>()
const bem = createNamespace('empty')
</script>

<template>
  <div :class="bem.b()">
    <div :class="bem.e('image')" :style="{ width: `${imageSize}px`, height: `${imageSize}px` }">
      <slot name="image">
        <img v-if="image" :src="image" alt="empty">
        <div v-else :class="bem.e('image-default')" />
      </slot>
    </div>
    <div :class="bem.e('description')">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div :class="bem.e('bottom')">
      <slot name="footer" />
    </div>
  </div>
</template>
