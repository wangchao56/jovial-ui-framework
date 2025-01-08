<script setup lang="ts">
import type {
  Middleware,
} from '@floating-ui/vue'
import type { PopperSlots, ReferenceType } from './popper'
import {
  arrow,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue'
import { createNamespace } from '@jovial/utils'
import {
  computed,
  nextTick,
  ref,
  watchEffect,
} from 'vue'
import { popperProps } from './popper'
// 1. 定义组件名称
defineOptions({ name: 'JvPoppervue' })

// 2. 完善 props
const props = defineProps(popperProps)

// 3. 定义 emitted 事件
const emit = defineEmits(['update:visible', 'someEvent'])

const slots = defineSlots<PopperSlots>()

const bem = createNamespace('popper')

// 4. 创建 BEM 命名空间

// 5. 定义引用和插槽
const reference = ref<ReferenceType | null>(null)
const floatingRef = ref(null)
const floatingArrow = ref(null)
const prop = 'activator'

// 6. 处理插槽和属性的监听

watchEffect(() => {
  if (slots.activator) {
    nextTick(() => {
      reference.value = document.querySelector(`[prop=${prop}]`)
    })
  }
  else {
    reference.value = props.reference
  }
})

const showPopper = computed(() => {
  return props.visible
})

const middlewareRef = computed(() => {
  const temp: Middleware[] = []
  if (props.offset) {
    temp.push(offset(props.offset))
  }
  if (props.arrow) {
    temp.push(arrow({ element: floatingArrow }))
  }
  if (props.flip) {
    temp.push(flip())
  }
  if (props.shift) {
    temp.push(shift())
  }
  return temp
})

// 7. 使用 useFloating
const { floatingStyles, middlewareData, ...args } = useFloating(
  reference,
  floatingRef,
  {
    placement: props.placement,
    middleware: middlewareRef,
    open: showPopper,
    // whileElementsMounted(referenceEl, floatingEl, update) {
    //   const cleanup = autoUpdate(referenceEl, floatingEl, update, {
    //     layoutShift: false
    //   })
    //   return cleanup
    // }
  },
)

// 8. 暴露需要的实例方法
defineExpose({
  close: () => {
    emit('update:visible', false)
  },
  floatingStyles,
  middlewareData,
  ...args,
  // 其他实例方法...
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="showPopper"
      ref="floatingRef"
      :class="[bem.b()]"
      :style="floatingStyles"
    >
      <div
        v-if="props.arrow"
        ref="floatingArrow"
        :class="[bem.e('arrow')]"
        :style="{
          position: 'absolute',
          left:
            middlewareData.arrow?.x != null
              ? `${middlewareData.arrow.x}px`
              : '',
          top:
            middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
        }"
      />
      <div :class="bem.e('content')">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>
