<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import { jvNotificationEmits, jvNotificationProps } from './JvNotification'

defineOptions({ name: 'JvNotification' })
defineProps(jvNotificationProps)
defineEmits(jvNotificationEmits)
const bem = createNamespace('notification')

const visible = ref(true)

// function close() {
//   visible.value = false
//   emit('close')
// }
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-in-out">
      <div v-if="visible" :class="bem.b()">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-in-out-enter-from,
.slide-in-out-leave-to {
  transform: translateX(100%);
}
</style>
