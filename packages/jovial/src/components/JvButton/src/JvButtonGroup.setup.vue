<script setup lang="tsx">
import type { JvButtonGroupProps } from './buttonGroup'
import { createNamespace } from '@jovial/utils'
import { provide, ref } from 'vue'
import '../style/buttonGroup.css'

defineOptions({ name: 'JvButtonGroup' })

const props = withDefaults(defineProps<JvButtonGroupProps>(), {
  size: 'medium',
  vertical: false,
  rounded: false,
  gap: 0,
  justify: 'start',
})

const bem = createNamespace('button-group')
const rootRef = ref<HTMLElement | null>(null)

provide('buttonGroupContext', {
  size: props.size,
  rounded: props.rounded,
})

const groupStyle = {
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
  justifyContent: props.justify,
}
</script>

<template>
  <div
    ref="rootRef"
    :class="[bem.b(), bem.is('vertical', vertical), bem.is('rounded', rounded)]"
    :style="groupStyle"
  >
    <slot />
  </div>
</template>
