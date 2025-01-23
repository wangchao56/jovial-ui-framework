<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { headerProps } from './types'
import '../style/jv-header.css'

defineOptions({ name: 'JvHeader' })

const props = defineProps(headerProps)
const bem = createNamespace('header')
</script>

<template>
  <header :class="bem.b()" :style="{ height: props.height }">
    <slot />
  </header>
</template>
