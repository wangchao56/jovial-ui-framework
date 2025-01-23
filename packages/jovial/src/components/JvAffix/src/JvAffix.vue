<script setup lang="ts">
import type { JvAffixEmits, JvAffixProps } from './JvAffix'
import { createNamespace } from '@jovial/utils'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvAffix' })
const props = defineProps<JvAffixProps>()
const emit = defineEmits<JvAffixEmits>()
const bem = createNamespace('affix')

const affixRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const fixed = ref(false)
const scrollTarget = ref<HTMLElement | Window>()
// const rootTop = ref(0)

// 计算固定样式
const affixStyle = computed(() => {
  if (!fixed.value)
    return {}

  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: `${props.zIndex}`,
  }

  if (props.position === 'top') {
    style.top = `${props.offset}px`
  }
  else {
    style.bottom = `${props.bottomOffset}px`
  }

  if (affixRef.value) {
    style.width = `${affixRef.value.offsetWidth}px`
  }

  return style
})

// 更新位置信息
function update() {
  // 检查 affixRef 和 scrollTarget 是否存在
  if (!affixRef.value || !scrollTarget.value)
    return

  // 根据 scrollTarget 的值获取目标区域的位置信息
  const targetRect = scrollTarget.value === window
    ? { top: 0, bottom: window.innerHeight } // 如果 scrollTarget 是 window，则目标区域为视口
    : (scrollTarget.value as HTMLElement).getBoundingClientRect() // 否则获取 HTMLElement 的边界框

  // 获取 affixRef 的边界框
  const affixRect = affixRef.value.getBoundingClientRect()

  // 如果 props.position 设置为 'top'
  if (props.position === 'top') {
    // 判断 affixRef 是否需要固定
    const isFixed = affixRect.top - props.offset <= targetRect.top
    // 如果固定状态发生了变化
    if (fixed.value !== isFixed) {
      fixed.value = isFixed
      emit('change', isFixed) // 触发 change 事件
    }
  }
  // 如果 props.position 不是 'top'
  else {
    // 判断 affixRef 是否需要固定
    const isFixed = affixRect.bottom + props.bottomOffset >= targetRect.bottom
    // 如果固定状态发生了变化
    if (fixed.value !== isFixed) {
      fixed.value = isFixed
      emit('change', isFixed) // 触发 change 事件
    }
  }

  // 如果 scrollTarget 是 window
  if (scrollTarget.value === window) {
    emit('scroll', {
      scrollTop: window.pageYOffset, // 获取视口的滚动位置
      fixed: fixed.value, // 获取当前的固定状态
    })
  }
  // 如果 scrollTarget 不是 window
  else {
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

// 初始化目标元素
function initTarget() {
  // 判断props.target是否为函数，如果是则执行该函数，否则将scrollTarget.value设为window
  scrollTarget.value = typeof props.target === 'function'
    ? props.target()
    : window

  // 如果scrollTarget.value存在
  if (scrollTarget.value) {
    // 为scrollTarget.value添加scroll事件监听器，监听滚动事件
    scrollTarget.value.addEventListener('scroll', onScroll)
    // 为window添加resize事件监听器，监听窗口大小变化事件
    window.addEventListener('resize', update)
    // 执行update函数
    update()
  }
}

// 清理事件监听
function cleanup() {
  if (scrollTarget.value) {
    scrollTarget.value.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', update)
  }
}

watch(() => props.target, () => {
  cleanup()
  initTarget()
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
})
</script>

<template>
  <div ref="affixRef" :class="bem.b()">
    <div
      ref="wrapperRef"
      :class="[bem.e('wrapper'), bem.is('fixed', fixed)]"
      :style="affixStyle"
    >
      <slot />
    </div>
  </div>
</template>
