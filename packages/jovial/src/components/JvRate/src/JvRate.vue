<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvRateEmits, jvRateProps } from './JvRate'

defineOptions({ name: 'JvRate' })
defineProps(jvRateProps)
defineEmits(jvRateEmits)
const bem = createNamespace('rate')
</script>

<template>
  <div :class="bem.b()" />
</template>
