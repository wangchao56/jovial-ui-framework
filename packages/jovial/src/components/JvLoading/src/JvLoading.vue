<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import { jvLoadingEmits, jvLoadingProps } from './JvLoading'

defineOptions({ name: 'JvLoading' })
defineProps(jvLoadingProps)
const emit = defineEmits(jvLoadingEmits)
const bem = createNamespace('loading')

const loading = ref(true)

function stopLoading() {
  loading.value = false
  emit('stop')
}
</script>

<template>
  <div v-if="loading" :class="bem.b()">
    <slot>Loading...</slot>
    <button @click="stopLoading">
      Stop
    </button>
  </div>
</template>

<style src="../style/style.css" scoped></style>
