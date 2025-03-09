<script lang="ts" setup>
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'

defineOptions({ name: 'JvLoadingBar', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    percentage?: number
    type?: 'primary' | 'success' | 'warning' | 'error'
    height?: number | string
    active?: boolean
    strokeWidth?: number
    shadow?: boolean
  }>(),
  {
    percentage: 0,
    type: 'primary',
    height: 2,
    active: false,
    strokeWidth: 2,
    shadow: true,
  },
)

const bem = createNamespace('loading-bar')
const theme = useTheme()

const progressStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const pathStyle = computed(() => ({
  strokeDasharray: '100, 100',
  strokeDashoffset: 100 - props.percentage,
}))

// 获取当前主题的背景色
const trackColor = computed(() =>
  theme.current.value.colors.background,
)

// 获取当前主题的对应类型颜色
const pathColor = computed(() =>
  theme.current.value.colors[props.type],
)

// 计算 viewBox 高度
const viewBoxHeight = computed(() => Math.max(2, props.strokeWidth))

// 计算路径的 y 坐标
const pathY = computed(() => viewBoxHeight.value / 2)

// 生成阴影路径数组
const shadowPaths = computed(() => {
  if (!props.shadow)
    return []
  return Array.from({ length: 10 }, (_, i) => ({
    offset: i + 1,
    opacity: (10 - i) / 20, // 从 0.5 递减到 0.05
  }))
})
</script>

<template>
  <Teleport to="body">
    <div
      class="jv-loading-bar"
      :class="[
        bem.b(),
        bem.m(type),
        {
          [bem.m('active')]: active,
          [bem.m('shadow')]: shadow,
        },
      ]"
      :style="[
        progressStyle,
        {
          '--loading-bar-track-color': trackColor,
          '--loading-bar-path-color': pathColor,
        },
      ]"
    >
      <svg
        class="jv-loading-bar__svg"
        :viewBox="`0 0 100 ${viewBoxHeight}`"
        preserveAspectRatio="none"
      >
        <!-- 阴影路径 -->
        <template v-if="shadow">
          <path
            v-for="{ offset, opacity } in shadowPaths"
            :key="offset"
            class="jv-loading-bar__shadow"
            :d="`M0 ${pathY} L100 ${pathY}`"
            :stroke-width="strokeWidth"
            :style="{
              ...pathStyle,
              opacity,
              transform: `translateY(${offset * 0.5}px)`,
            }"
          />
        </template>
        <path
          class="jv-loading-bar__track"
          :d="`M0 ${pathY} L100 ${pathY}`"
          :stroke-width="strokeWidth"
        />
        <path
          class="jv-loading-bar__path"
          :d="`M0 ${pathY} L100 ${pathY}`"
          :stroke-width="strokeWidth"
          :style="pathStyle"
        />
      </svg>
    </div>
  </Teleport>
</template>

<style lang="scss">
.jv-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 9999;

  &__svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__track {
    stroke: var(--loading-bar-track-color);
    stroke-linecap: round;
  }

  &__path {
    stroke: var(--loading-bar-path-color);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease;
  }

  &__shadow {
    stroke: var(--loading-bar-path-color);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease;
    filter: blur(1px);
  }

  &--primary {
    color: var(--jv-color-primary);
  }

  &--success {
    color: var(--jv-color-success);
  }

  &--warning {
    color: var(--jv-color-warning);
  }

  &--error {
    color: var(--jv-color-error);
  }

  &--active &__path,
  &--active &__shadow {
    animation: loading-bar-slide 1s linear infinite;
  }
}

@keyframes loading-bar-slide {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
