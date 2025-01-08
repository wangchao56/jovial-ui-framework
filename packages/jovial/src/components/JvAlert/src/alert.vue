<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import JvButton from '../../button'
import { alertEmits, alertProps } from './alert'

defineOptions({ name: 'JvAlert' })
defineProps(alertProps)
const emit = defineEmits(alertEmits)
const bem = createNamespace('alert')

const visible = ref(true)

function handleClose() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[bem.b(), bem.m(type), bem.is('closable', closable)]"
    >
      <div v-if="showIcon" :class="bem.e('icon')">
        <JvIcon />
      </div>
      <div :class="bem.e('header')">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="bem.e('content')">
        <slot>{{ message }}</slot>
      </div>
      <div v-if="closable" :class="bem.e('close')">
        <JvButton variant="plain" @click="handleClose">
          ×
        </JvButton>
      </div>
    </div>
  </transition>
</template>
