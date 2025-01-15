<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvDropdownEmits, jvDropdownProps } from './JvDropdown'

defineOptions({ name: 'JvJvDropdown' })
defineProps(jvDropdownProps)
defineEmits(jvDropdownEmits)
const bem = createNamespace('JvDropdown')
</script>

<template>
  <div :class="bem.b()" />
</template>
