<script lang="ts" setup>
import type { Breakpoint, JvColProps } from './type'
import { computed } from 'vue'
import '../style/jv-col.css'

defineOptions({
  name: 'JvCol',
})

const props = withDefaults(defineProps<JvColProps>(), {
  span: 24,
  offset: 0,
})

const colClasses = computed(() => {
  const classes: string[] = []

  // 基础类
  if (props.span) {
    classes.push(`jv-col-${props.span}`)
  }
  if (props.offset) {
    classes.push(`jv-col-offset-${props.offset}`)
  }

  // 响应式类
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']
  breakpoints.forEach((bp) => {
    const sizeProp = props[bp]
    if (typeof sizeProp === 'number') {
      classes.push(`jv-col-${bp}-${sizeProp}`)
    }
    else if (typeof sizeProp === 'object') {
      if (sizeProp.span) {
        classes.push(`jv-col-${bp}-${sizeProp.span}`)
      }
      if (sizeProp.offset) {
        classes.push(`jv-col-${bp}-offset-${sizeProp.offset}`)
      }
    }
  })

  return classes
})
</script>

<template>
  <div
    class="jv-col"
    :class="colClasses"
  >
    <slot />
  </div>
</template>
