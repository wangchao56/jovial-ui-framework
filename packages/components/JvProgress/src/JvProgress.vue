<script setup lang="ts">
import JvIcon from '@components/JvIcon/src/JvIcon.vue'
import { createNamespace, shades, toCSSValue } from '@jienix/utils'
import { useCssVar } from '@vueuse/core'
import { computed, normalizeClass, normalizeStyle, provide, useAttrs, watch } from 'vue'
import CircleProgress from './CircleProgress.vue'
import { jvProgressContextKey, type JvProgressEmits, type JvProgressSlots } from './JvProgress'
import { jvProgressProps } from './JvProgress'
import LineProgress from './LineProgress.vue'

defineOptions({ name: 'JvProgress' })
const props = defineProps(jvProgressProps)
const emit = defineEmits<JvProgressEmits>()
defineSlots<JvProgressSlots>()
const { textPosition, type, textInside, showText, width, strokeWidth, strokeRadius, bgColor, valueColor } = props
const percentage = defineModel<number>('percentage', { required: true })
const bem = createNamespace('progress')
const attrs = useAttrs()
// 2. 优化类名计算
const classes = computed(() =>
  normalizeClass([
    bem.b(),
    bem.em(props.type, props.textPosition),
    bem.em(props.type, props.size),
    bem.is('inside', props.textInside),
    attrs?.class,
  ]),
)

// 进度结束标志
const isEnd = computed(() => percentage.value === 100)

// 3. 优化百分比验证
watch(percentage, (value) => {
  if (value > 100 || value < 0) {
    console.warn('[JvProgress] percentage should be between 0 and 100')
  }
  // 边界值处理
  if (value < 0) {
    percentage.value = 0
    emit('update:percentage', 0)
  }
  if (value > 100) {
    percentage.value = 100
    emit('update:percentage', 100)
  }
  // 进度条开始
  if (value === 0) {
    emit('start')
  }
  // 进度条结束
  if (value === 100) {
    emit('end')
  }
}, { immediate: true })

// 是否显示文字 只有在line类型且textInside才显示
const showTextFlag = computed(() => showText && !textInside && type === 'line')
provide(jvProgressContextKey, {
  start: () => {
    // console.log('start')
  },
  end: () => {
    // console.log('end')
  },
  cancel: () => {
    // console.log('cancel')
  },
  pause: () => {
    // console.log('pause')
  },
  resume: () => {
    // console.log('resume')
  },
})
const successColor = useCssVar('--jv-color-success-light', document.documentElement, {
  observe: true,
})
const cssVars = computed(() => ({
  '--jv-progress-width': toCSSValue(width),
  '--jv-progress-stroke-width': toCSSValue(strokeWidth),
  '--jv-progress-radius': type === 'circle' ? '50%' : toCSSValue(strokeRadius),
  '--jv-progress-bg-color': bgColor || '',
  '--jv-progress-value-color': isEnd.value ? successColor.value : valueColor || '',
  '--jv-progress-text-color': textInside ? shades.white : '',
}))

const lineProps = computed(() => ({
  ...props,
  valueColor: isEnd.value ? successColor.value : valueColor || '',
}))
</script>

<template>
  <div
    role="progressbar" :class="classes" :style="normalizeStyle([attrs?.style, cssVars])" :aria-valuenow="percentage"
    :aria-valuemin="0" :aria-valuemax="100"
  >
    <LineProgress
      v-if="type === 'line'" v-model="percentage" :class="bem.em(type, 'inner')" v-bind="lineProps"
      :type="type"
    >
      <slot name="text" :percentage="percentage">
        {{ ` ${percentage}% ` }}
      </slot>
    </LineProgress>
    <CircleProgress v-else v-model="percentage" :class="bem.em(type, 'inner')" v-bind="props" :type="type" />
    <span v-if="showTextFlag" :class="[bem.em(`${type}-text`, textPosition), bem.e(`${type}-text`)] ">
      <slot name="text" :percentage="percentage">
        <template v-if="isEnd">
          <JvIcon name="$success" :size="strokeWidth * 2" :color="successColor" />
        </template>
        <template v-else>
          {{ ` ${percentage}% ` }}
        </template>
      </slot>
    </span>
  </div>
</template>
