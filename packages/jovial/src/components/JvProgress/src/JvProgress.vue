<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvProgressProps } from './JvProgress'

defineOptions({ name: 'JvProgress' })
const props = defineProps(jvProgressProps)
const bem = createNamespace('progress')
</script>

<template>
  <div :class="bem.b()">
    <div v-if="props.type === 'line'" :class="bem.e('bar')">
      <div
        :class="bem.e('outer')"
        :style="{ height: `${props.strokeWidth}px` }"
      >
        <div
          :class="bem.e('inner')"
          :style="{
            width: `${props.percentage}%`,
            backgroundColor: props.color,
          }"
        >
          <div
            v-if="props.showText && props.textInside"
            :class="bem.e('text-inside')"
          >
            {{ props.percentage }}%
          </div>
        </div>
      </div>
      <div
        v-if="props.showText && !props.textInside"
        :class="bem.e('text')"
      >
        {{ props.percentage }}%
      </div>
    </div>

    <div
      v-else
      :class="bem.e('circle')"
      :style="{
        width: '120px',
        height: '120px',
      }"
    >
      <!-- 圆形进度条的实现将在后续添加 -->
    </div>
  </div>
</template>

<style src="../style/style.css" scoped></style>
