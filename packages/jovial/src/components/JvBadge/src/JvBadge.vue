<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'
import { jvBadgeEmits, type JvBadgeProps } from './JvBadge'

defineOptions({ name: 'JvBadge' })
const props = withDefaults(defineProps<JvBadgeProps>(), {
  dot: false,
  count: 0,
  max: 99,
  rounded: false,
  position: 'top-right',
  size: 'medium',
  color: 'red',
})
const emit = defineEmits(jvBadgeEmits)
const bem = createNamespace('badge')
const showContent = computed(() => props.dot && props.count > 0)
const content = computed(() => (props.count > props.max ? `${props.max}+` : props.count))

useCssVars(_ctx => ({
  'badge-color': props.color,
}))
</script>

<template>
  <div
    :class="[bem.b(),
             bem.is('visible', showContent),
             bem.m(position),
             bem.is('rounded', rounded),
             bem.m(size),
    ]" :data-count="content"
    :data-color="color"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>

<style src="./JvBadge.css"></style>
