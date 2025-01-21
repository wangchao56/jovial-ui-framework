<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTagEmits, jvTagProps } from './JvTag'

defineOptions({ name: 'JvTag' })
const props = defineProps(jvTagProps)
const emit = defineEmits(jvTagEmits)
const bem = createNamespace('tag')

function handleClose(evt: MouseEvent) {
  emit('close', evt)
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(props.type),
      bem.m(props.size),
      { [bem.m('round')]: props.round },
    ]"
  >
    <slot />
    <span
      v-if="props.closable"
      :class="bem.e('close')"
      @click="handleClose"
    >
      ×
    </span>
  </div>
</template>

    <style src="../style/style.css" scoped></style>
