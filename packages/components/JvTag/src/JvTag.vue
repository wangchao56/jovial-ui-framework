<script setup lang="ts">
import type { JvTagEmits } from './JvTag'
import { JvButton } from '@components/JvButton'
import JvIcon from '@components/JvIcon'
import { JvText } from '@components/Typography'
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'
import { jvTagProps } from './JvTag'

defineOptions({ name: 'JvTag', inheritAttrs: false })
const { showIcon, icon } = defineProps(jvTagProps)
const emit = defineEmits<JvTagEmits>()
const bem = createNamespace('tag')
const visible = ref(true)

function handleClose() {
  visible.value = false
}

function handleLeave() {
  emit('close')
}
</script>

<template>
  <Transition name="jv-tag" @after-leave="handleLeave">
    <span
      v-if="visible" :class="[
        bem.b(),
        bem.m(type),
        bem.m(size),
        bem.m(variant as string),
        bem.is('rounded', rounded),
      ]"
      role="tag"
      aria-label="标签"
      aria-atomic="true"
      aria-live="polite"
    >
      <JvIcon v-if="showIcon" :name="icon" :size="12" :class="bem.e('icon')" />
      <JvText :size="size" :class="bem.e('label')" :type="type">
        <slot> {{ label }} </slot>
      </JvText>
      <JvButton
        v-if="closable" :type="type" :class="bem.e('close')" icon="$close" size="small" variant="plain"
        @click="handleClose"
      />
    </span>
  </Transition>
</template>
