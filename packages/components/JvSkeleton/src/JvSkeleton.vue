<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'
import { jvSkeletonProps } from './JvSkeleton'

defineOptions({ name: 'JvSkeleton', inheritAttrs: false })
const props = defineProps(jvSkeletonProps)
const bem = createNamespace('skeleton')

const styles = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  }
})
</script>

<template>
  <div
    v-if="loading" :class="[
      bem.b(),
      bem.m(type),
      { [bem.m('animated')]: animated },
    ]" :style="styles"
  >
    <template v-if="type === 'text'">
      <div v-for="i in rows" :key="i" :class="bem.e('text')" />
    </template>
    <template v-else-if="type === 'avatar'">
      <div :class="bem.e('avatar')" />
    </template>
    <template v-else-if="type === 'button'">
      <div :class="bem.e('button')" />
    </template>
    <template v-else-if="type === 'image'">
      <div :class="bem.e('image')" />
    </template>
    <template v-else-if="type === 'card'">
      <div :class="bem.e('image')" />
      <div :class="bem.e('content')">
        <div :class="bem.e('title')" />
        <div :class="bem.e('text')" />
      </div>
    </template>
    <template v-else-if="type === 'list'">
      <div v-for="i in rows" :key="i" :class="bem.e('list-item')">
        <div :class="bem.e('avatar')" />
        <div :class="bem.e('content')">
          <div :class="bem.e('title')" />
          <div :class="bem.e('text')" />
        </div>
      </div>
    </template>
  </div>
  <slot v-else />
</template>
