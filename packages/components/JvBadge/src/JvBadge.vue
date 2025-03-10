<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'
import { jvBadgeEmits, jvBadgeProps } from './JvBadge'

defineOptions({ name: 'JvBadge' })
const props = defineProps(jvBadgeProps)
const emit = defineEmits(jvBadgeEmits)
const bem = createNamespace('badge')
const showContent = computed(() => props.dot && props.count > 0)
const content = computed(() => (props.count > props.max ? `${props.max}+` : props.count))

useCssVars(_ctx => ({
  'jv-badge-color': props.color ?? 'red',
}))
</script>

<template>
  <div
    role="status"
    :aria-label="content ? content.toString() : undefined"
    :class="[bem.b(),
             bem.is('visible', showContent),
             bem.m(position),
             bem.is('rounded', rounded),
             bem.m(size),
    ]"
    :data-count="content"
    :data-color="color"
    @click="emit('click', $event)"
  >
    <slot aria-live="polite" />
  </div>
</template>
