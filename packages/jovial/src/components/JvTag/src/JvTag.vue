<script setup lang="ts">
import type { JvTagEmits } from './JvTag'
import JvIcon from '@/components/JvIcon/src/JvIcon.vue'
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import { jvTagProps } from './JvTag'
import '../style/style.css'

defineOptions({ name: 'JvTag' })
const props = defineProps(jvTagProps)
const emit = defineEmits<JvTagEmits>()
const bem = createNamespace('tag')
const visible = ref(true)

function handleClose(evt: MouseEvent) {
  emit('close', evt)
  visible.value = false
}
</script>

<template>
  <Transition name="jv-tag">
    <span
      v-if="visible"
      :class="[
        bem.b(),
        bem.m(props.type),
        bem.m(props.size),
        bem.is('rounded', props.rounded),
      ]"
    >
      <JvIcon v-if="props.closable" :class="bem.e('close')" name="$close" :size="12" @click="handleClose($event)" />
      <slot />
    </span>
  </Transition>
</template>

<style lang="css">
.jv-tag-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.jv-tag-leave-to {
  opacity: 0;
}
</style>
