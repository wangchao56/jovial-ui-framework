<script setup lang="ts">
import type { JvAffixEmits } from './JvAffix'
import { provideTheme, useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { jvAffixProps } from './JvAffix'

defineOptions({ name: 'JvAffix', inheritAttrs: false })

const { zIndex, position, offset, target, theme: _theme, enabled, customClass, targetMargin } = defineProps(jvAffixProps)

const emit = defineEmits<JvAffixEmits>()

const bem = createNamespace('affix')

const affixRef = useTemplateRef('affix')
const fixed = ref(false)
const scrollTarget = ref<HTMLElement | Window | null>(null)
const affixStyle = ref<Record<string, string>>({})
const placeholderStyle = ref<Record<string, string>>({})
const originalRect = ref<DOMRect | null>(null)

// 提供主题
provideTheme({ theme: _theme })
// 使用主题
const theme = useTheme()

// 计算固定样式
function updateAffixStyle() {
  if (!fixed.value || !affixRef.value || !originalRect.value) {
    affixStyle.value = {}
    return
  }

  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: `${zIndex}`,
    width: `${originalRect.value.width}px`,
  }

  if (position === 'top') {
    style.top = `${offset}px`
  }
  else {
    style.bottom = `${offset}px`
  }

  affixStyle.value = style
}

// 更新占位符样式
function updatePlaceholderStyle() {
  if (!fixed.value || !originalRect.value) {
    placeholderStyle.value = {}
    return
  }

  placeholderStyle.value = {
    width: `${originalRect.value.width}px`,
    height: `${originalRect.value.height}px`,
  }
}

// 保存原始位置信息
function saveOriginalRect() {
  if (affixRef.value) {
    originalRect.value = affixRef.value.getBoundingClientRect()
  }
}

// 更新位置信息
function update() {
  // 如果组件被禁用，则不进行固定
  if (!enabled) {
    if (fixed.value) {
      fixed.value = false
      emit('change', false)
    }
    return
  }

  // 检查 affixRef 和 scrollTarget 是否存在
  if (!affixRef.value || !scrollTarget.value)
    return

  // 如果没有保存原始位置信息，则保存
  if (!originalRect.value) {
    saveOriginalRect()
  }

  // 根据 scrollTarget 的值获取目标区域的位置信息
  const targetRect = scrollTarget.value === window
    ? { top: 0, bottom: window.innerHeight } // 如果 scrollTarget 是 window，则目标区域为视口
    : (scrollTarget.value as HTMLElement).getBoundingClientRect() // 否则获取 HTMLElement 的边界框

  // 获取 affixRef 的边界框
  const affixRect = affixRef.value.getBoundingClientRect()

  // 应用目标边距
  const adjustedTargetTop = targetRect.top + targetMargin
  const adjustedTargetBottom = targetRect.bottom - targetMargin

  // 如果 props.position 设置为 'top'
  if (position === 'top') {
    // 判断 affixRef 是否需要固定
    const isFixed = affixRect.top - offset <= adjustedTargetTop
    // 如果固定状态发生了变化
    if (fixed.value !== isFixed) {
      fixed.value = isFixed
      updateAffixStyle()
      updatePlaceholderStyle()
      emit('change', isFixed) // 触发 change 事件
    }
  }
  // 如果 props.position 不是 'top'
  else {
    // 判断 affixRef 是否需要固定
    const isFixed = affixRect.bottom + offset >= adjustedTargetBottom
    // 如果固定状态发生了变化
    if (fixed.value !== isFixed) {
      fixed.value = isFixed
      updateAffixStyle()
      updatePlaceholderStyle()
      emit('change', isFixed) // 触发 change 事件
    }
  }

  // 触发滚动事件
  emitScrollEvent()
}

// 触发滚动事件
function emitScrollEvent() {
  // 如果 scrollTarget 是 window
  if (scrollTarget.value === window) {
    emit('scroll', {
      scrollTop: window.pageYOffset, // 获取视口的滚动位置
      fixed: fixed.value, // 获取当前的固定状态
    })
  }
  // 如果 scrollTarget 不是 window
  else if (scrollTarget.value) {
    emit('scroll', {
      scrollTop: (scrollTarget.value as HTMLElement).scrollTop, // 获取 HTMLElement 的滚动位置
      fixed: fixed.value, // 获取当前的固定状态
    })
  }
}

// 处理滚动事件
function onScroll() {
  update()
}

// 处理窗口大小变化事件
function onResize() {
  if (fixed.value) {
    saveOriginalRect()
    updateAffixStyle()
    updatePlaceholderStyle()
  }
  update()
}

// 初始化目标元素
function initTarget() {
  // 判断props.target是否为函数，如果是则执行该函数，否则将scrollTarget.value设为window
  scrollTarget.value = typeof target === 'function'
    ? target()
    : window

  // 如果scrollTarget.value存在
  if (scrollTarget.value) {
    // 为scrollTarget.value添加scroll事件监听器，监听滚动事件
    scrollTarget.value.addEventListener('scroll', onScroll, { passive: true })
    // 为window添加resize事件监听器，监听窗口大小变化事件
    window.addEventListener('resize', onResize, { passive: true })
    // 执行update函数
    nextTick(() => {
      saveOriginalRect()
      update()
      emit('ready')
    })
  }
}

// 清理事件监听
function cleanup() {
  if (scrollTarget.value) {
    scrollTarget.value.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }
}

// 手动设置固定状态
function setFixed(value: boolean) {
  if (fixed.value !== value) {
    fixed.value = value
    updateAffixStyle()
    updatePlaceholderStyle()
    emit('change', value)
  }
}

// 监听target属性变化
watch(() => target, () => {
  cleanup()
  initTarget()
})

// 监听enabled属性变化
watch(() => enabled, (newVal) => {
  if (!newVal && fixed.value) {
    fixed.value = false
    updateAffixStyle()
    updatePlaceholderStyle()
    emit('change', false)
  }
  else if (newVal) {
    update()
  }
})

// 监听position、offset、targetMargin属性变化
watch([() => position, () => offset, () => targetMargin], () => {
  update()
})

onMounted(() => {
  initTarget()
})

onBeforeUnmount(() => {
  cleanup()
})

// 暴露方法
defineExpose({
  update,
  getFixed: () => fixed.value,
  setFixed,
  getScrollTarget: () => scrollTarget.value,
})
</script>

<template>
  <div ref="affix" :class="[bem.b(), theme.themeClasses.value, customClass]">
    <div v-if="fixed" :style="placeholderStyle" />
    <div :class="[bem.e('wrapper'), bem.is('fixed', fixed)]" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>
