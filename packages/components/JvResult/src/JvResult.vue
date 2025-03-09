<script setup lang="ts">
import type { JvResultEmits, JvResultSlots } from './JvResult'
import { createNamespace } from '@jienix/utils'
import { jvResultProps } from './JvResult'

defineOptions({ name: 'JvResult', inheritAttrs: false })

defineProps(jvResultProps)
defineEmits<JvResultEmits>()
defineSlots<JvResultSlots>()
const bem = createNamespace('result')
</script>

<template>
  <div :class="bem.b()" @click="$emit('click', $event)">
    <div :class="bem.e('icon')">
      <slot name="icon">
        <i :class="[bem.e('icon-inner'), icon || `jv-icon-${status}`]" />
      </slot>
    </div>

    <div :class="bem.e('title')">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div v-if="subTitle || $slots.subTitle" :class="bem.e('subtitle')">
      <slot name="subTitle">
        {{ subTitle }}
      </slot>
    </div>

    <div v-if="$slots.default" :class="bem.e('content')">
      <slot />
    </div>

    <div v-if="$slots.extra" :class="bem.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>
