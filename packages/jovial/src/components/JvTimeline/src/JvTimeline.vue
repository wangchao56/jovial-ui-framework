<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTimelineEmits, jvTimelineProps } from './JvTimeline'

defineOptions({ name: 'JvTimeline' })
defineProps(jvTimelineProps)
defineEmits(jvTimelineEmits)
const bem = createNamespace('timeline')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
