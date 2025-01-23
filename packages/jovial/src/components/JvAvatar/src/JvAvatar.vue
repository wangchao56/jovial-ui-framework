<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvAvatarEmits, jvAvatarProps } from './JvAvatar'
import '../style/style.css'

defineOptions({ name: 'JvAvatar' })
defineProps(jvAvatarProps)
defineEmits(jvAvatarEmits)
const bem = createNamespace('avatar')
</script>

<template>
  <div :class="bem.b()" />
</template>
