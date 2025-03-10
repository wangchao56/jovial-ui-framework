<script setup lang="ts">
import type { JvListItemActionEmits, JvListItemActionProps } from './types'
import JvIcon, { type JvIconProps } from '@components/JvIcon'

defineOptions({
  name: 'JvListItemAction',
})

const { icon } = defineProps<JvListItemActionProps>()

const emit = defineEmits<JvListItemActionEmits>()

function handleClick() {
  emit('click')
}

const iconProps = computed<JvIconProps>(() => {
  if (typeof icon === 'string') {
    return { name: icon }
  }
  return icon || {}
})
</script>

<template>
  <div class="jv-list-item--action" @click="handleClick">
    <slot>
      <JvIcon v-bind="iconProps" />
    </slot>
  </div>
</template>
