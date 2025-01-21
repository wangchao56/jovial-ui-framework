<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvCardEmits, jvCardProps } from './JvCard'

defineOptions({ name: 'JvCard' })
defineProps(jvCardProps)
const emit = defineEmits(jvCardEmits)
const bem = createNamespace('card')

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('border', border),
      bem.is('round', round),
      bem.m(`shadow-${shadow}`),
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.header || title || subtitle" :class="bem.e('header')">
      <slot name="header">
        <div v-if="title || subtitle" :class="bem.e('title-group')">
          <slot name="title">
            <h3 v-if="title" :class="bem.e('title')">
              {{ title }}
            </h3>
          </slot>
          <p v-if="subtitle" :class="bem.e('subtitle')">
            {{ subtitle }}
          </p>
        </div>
      </slot>
    </div>

    <div v-if="$slots.cover" :class="bem.e('cover')">
      <slot name="cover" />
    </div>

    <div :class="bem.e('body')">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="bem.e('footer')">
      <slot name="footer" />
    </div>

    <div v-if="$slots.actions" :class="bem.e('actions')">
      <slot name="actions" />
    </div>
  </div>
</template>

<style  scoped>
</style>
