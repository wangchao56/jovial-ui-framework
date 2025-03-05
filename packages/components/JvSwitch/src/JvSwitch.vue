<script setup lang="ts">
import type { JvSwitchEmits, JvSwitchProps } from './JvSwitch'
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { computed, ref, watch } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvSwitch' })
const props = withDefaults(defineProps<JvSwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
  loading: false,
})
const emit = defineEmits<JvSwitchEmits>()
const bem = createNamespace('switch')
const theme = useTheme()

// 内部状态
const innerValue = useModel(props, 'modelValue')
// 内部loading状态
const isLoading = ref(false)
// 缓存点击时的目标值
const pendingValue = ref<boolean | null>(null)

// 监听外部loading变化
watch(() => props.loading, (newLoading) => {
  if (newLoading === true && props.manual) {
    isLoading.value = true
    pendingValue.value = !innerValue.value
    return
  }
  if (newLoading === false && pendingValue.value !== null) {
    // loading结束且有待更新的值时,更新状态
    innerValue.value = pendingValue.value
    emit('change', pendingValue.value)
    pendingValue.value = null
    isLoading.value = false
  }
  else {
    isLoading.value = newLoading
  }
})

// 处理点击事件
function updateValue() {
  const targetValue = !innerValue.value
  // 否则直接更新
  innerValue.value = targetValue
  emit('change', targetValue)
}

const events = computed(() => {
  if (props.disabled) {
    return {}
  }
  // 非手动控制loading时,点击事件需要更新值
  if (!props.manual) {
    return {
      click: updateValue,
    }
  }
  // 手动控制loading时,点击事件需要阻止冒泡
  return {
    click: (e: MouseEvent) => {
      e.stopPropagation()
      emit('click', e)
    },
  }
})

// 计算不同尺寸下的视图框和按钮位置
const sizeConfig = computed(() => {
  switch (props.size) {
    case 'large':
      return {
        viewBox: '0 0 50 24',
        width: 50,
        height: 24,
        radius: 12,
        buttonRadius: 10,
        buttonX: 12,
        buttonY: 12,
        moveDistance: 26,
      }
    case 'small':
      return {
        viewBox: '0 0 30 16',
        width: 30,
        height: 16,
        radius: 8,
        buttonRadius: 6,
        buttonX: 8,
        buttonY: 8,
        moveDistance: 14,
      }
    default:
      return {
        viewBox: '0 0 40 20',
        width: 40,
        height: 20,
        radius: 10,
        buttonRadius: 8,
        buttonX: 10,
        buttonY: 10,
        moveDistance: 20,
      }
  }
})

// 计算按钮的当前位置
const currentButtonX = computed(() =>
  innerValue.value
    ? sizeConfig.value.buttonX + sizeConfig.value.moveDistance
    : sizeConfig.value.buttonX,
)
// 计算类名
const switchClasses = computed(() => [
  bem.b(),
  bem.is('checked', innerValue.value),
  bem.is('disabled', props.disabled),
  bem.is('loading', isLoading.value),
  bem.m(props.size),
  theme.themeClasses.value,
])
</script>

<template>
  <div
    :class="switchClasses"
    role="switch"
    :aria-checked="innerValue"
    :aria-disabled="disabled || isLoading"
    :tabindex="disabled || isLoading ? -1 : 0"
    v-on="events"
  >
    <div :class="bem.e('core')">
      <svg
        :class="bem.e('svg')"
        :viewBox="sizeConfig.viewBox"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          :class="bem.e('track')"
          x="0"
          y="0"
          :rx="sizeConfig.radius"
          :ry="sizeConfig.radius"
          :width="sizeConfig.width"
          :height="sizeConfig.height"
        />
        <circle
          :class="bem.e('thumb')"
          :cx="currentButtonX"
          :cy="sizeConfig.buttonY"
          :r="sizeConfig.buttonRadius"
        />
        <!-- loading 动画 -->
        <circle
          v-if="isLoading"
          :class="bem.e('loading')"
          :cx="sizeConfig.width - currentButtonX"
          :cy="sizeConfig.buttonY"
          :r="sizeConfig.buttonRadius * 0.75"
          fill="none"
          :stroke-width="sizeConfig.buttonRadius * 0.2"
          :style="{
            transformOrigin: `${sizeConfig.width - currentButtonX}px ${sizeConfig.buttonY}px`,
          }"
        />
        <circle
          v-if="isLoading"
          :class="bem.e('loading-inner')"
          :cx="sizeConfig.width - currentButtonX"
          :cy="sizeConfig.buttonY"
          :r="sizeConfig.buttonRadius * 0.75"
          fill="none"
          :stroke-width="sizeConfig.buttonRadius * 0.2"
          :style="{
            transformOrigin: `${sizeConfig.width - currentButtonX}px ${sizeConfig.buttonY}px`,
          }"
        />
      </svg>
    </div>
  </div>
</template>
