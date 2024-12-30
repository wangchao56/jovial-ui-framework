<template>
  <div :class="bem.b()">
    <sapn :class="bem.e('input')">
      <input type="checkbox" />
    </sapn>
    <sapn v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </sapn>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { checkboxProps } from './checkbox'
const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
</script>
