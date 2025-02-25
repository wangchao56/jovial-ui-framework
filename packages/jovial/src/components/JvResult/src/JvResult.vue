<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvResultProps } from './JvResult'
import '../style/style.css'

defineOptions({ name: 'JvResult' })

defineProps(jvResultProps)
defineEmits<{
  click: [event: MouseEvent]
}>()

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
