<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import '../style/jv-main.css'

defineOptions({ name: 'JvMain' })

const bem = createNamespace('main')
</script>

<template>
  <main :class="bem.b()">
    <div :class="bem.e('wrapper')">
      <slot />
    </div>
  </main>
</template>
