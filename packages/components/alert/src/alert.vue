<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[bem.b(), bem.m(type), bem.is('closable', closable)]"
    >
      <div v-if="showIcon" :class="bem.e('icon')">
        <JvIcon> </JvIcon>
      </div>
      <div :class="bem.e('header')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="bem.e('content')">
        <slot>{{ message }}</slot>
      </div>
      <div v-if="closable" :class="bem.e('close')">
        <JvButton variant="plain" @click="handleClose"> × </JvButton>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import { alertEmits, alertProps } from './alert'
import JvButton from '@jovial/components/button'
defineOptions({ name: 'JvAlert' })
const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)
const bem = createNamespace('alert')

const visible = ref(true)

const handleClose = () => {
  visible.value = false
  emit('close')
}
</script>
