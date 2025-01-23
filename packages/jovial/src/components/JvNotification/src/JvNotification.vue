<script setup lang="ts">
import type { JvNotificationEmits, JvNotificationExpose, JvNotificationProps } from './JvNotification'
import { badge } from '@/directives/index'
import JvButton from '@components/JvButton/src/button.vue'
import JvIcon from '@components/JvIcon/src/JvIcon.vue'
import { createNamespace } from '@jovial/utils'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'JvNotification' })
const props = withDefaults(defineProps<JvNotificationProps>(), {
  position: 'top-right',
  type: 'info',
  duration: 4500,
  showClose: true,
  zIndex: 4500,
  pauseOnHover: true,
  offset: 0,
  grouping: true,
  repeatNum: 1,
  dangerouslyUseHTMLString: false,
})

const emit = defineEmits<JvNotificationEmits>()

const bem = createNamespace('notification')

const vBadge = badge

const visible = useModel(props, 'visible')
let timer: NodeJS.Timeout | null = null

// 计算偏移
const fianlOffset = computed<number[]>(() => {
  let defineOffset = [16, 16]
  if (typeof props.offset === 'number') {
    defineOffset[0] = props.offset
  }
  if (Array.isArray(props.offset)) {
    defineOffset = props.offset
  }
  return defineOffset
})
// 计算徽标数据
const badgeProps = computed(() => {
  if (!props.grouping || props.repeatNum <= 1)
    return null

  return {
    count: props.repeatNum,
    max: 99,
    position: 'top-right',
    size: 'medium',
  }
})
// 计算样式
const containerStyle = computed(() => ({
  zIndex: props.zIndex,
  [props.position.includes('right') ? 'right' : 'left']: `${fianlOffset.value[0]}px`,
  [props.position.includes('top') ? 'top' : 'bottom']: `${fianlOffset.value[1]}px`,
  overflow: badgeProps.value ? 'visible' : 'hidden',
}))

const classes = computed(() => [
  bem.b(),
  bem.m(props.type),
  bem.m(props.position),
  props.customClass,
])

// 关闭通知
function close() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  visible.value = false
  emit('update:visible', false)
  props.onClose?.()
}

// 鼠标悬停
function onMouseenter() {
  if (props.pauseOnHover) {
    endTimer()
  }
}

// 鼠标离开
function onMouseleave() {
  if (props.pauseOnHover && props.duration > 0) {
    startTimer()
  }
}

// 开始计时器
function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// 停止计时
function endTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 生命周期钩子
onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  emit('destroy')
})

// 动画钩子
function afterLeave() {
  emit('afterLeave')
}

function afterEnter() {
  emit('afterEnter')
}

async function beforeDestroy() {
  // 执行动画
  visible.value = false
  await nextTick()
  return true
}

const appendTo = ref<HTMLElement | string>('body')
// 禁用teleport
const disabled = ref(!visible.value)

defineExpose<JvNotificationExpose>({
  close,
  beforeDestroy,
  setAppendTo(value: HTMLElement | string) {
    appendTo.value = value
  },
  setDisabled(value: boolean) {
    disabled.value = value
  },
})
</script>

<template>
  <Teleport :to="appendTo" :disabled="disabled">
    <Transition
      :name="`notification-${position}`"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
    >
      <div
        v-if="visible"
        :id="id"
        v-badge="badgeProps"
        :class="classes"
        :style="containerStyle"
        role="alert"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <!-- 图标 -->
        <div v-if="icon || type" :class="bem.e('icon')">
          <slot name="icon">
            <JvIcon :name="icon || `$${type}`" />
          </slot>
        </div>

        <div :class="bem.e('wrapper')">
          <!-- 标题 -->
          <div v-if="title || $slots.header" :class="bem.e('title')">
            <slot name="header">
              {{ title }}
            </slot>
          </div>

          <!-- 消息内容 -->
          <div :class="bem.e('body')">
            <slot>
              <span
                v-if="dangerouslyUseHTMLString"
                :class="bem.em('body', 'message')"
                v-html="message"
              />
              <span v-else :class="bem.em('body', 'message')">
                {{ message }}
              </span>
            </slot>
          </div>
        </div>

        <!-- 关闭按钮 -->
        <JvButton
          v-if="showClose"
          :class="bem.e('close')"
          icon="$close"
          variant="text"
          @click.stop="close"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.notification-top-right-enter-active,
.notification-top-right-leave-active,
.notification-top-left-enter-active,
.notification-top-left-leave-active,
.notification-bottom-right-enter-active,
.notification-bottom-right-leave-active,
.notification-bottom-left-enter-active,
.notification-bottom-left-leave-active {
  transition: all 0.3s ease-in-out;
}

.notification-top-right-enter-from,
.notification-top-right-leave-to {
  transform: translateX(100%);
  background-color: transparent !important;
}

.notification-top-left-enter-from,
.notification-top-left-leave-to {
  transform: translateX(-100%);
  background-color: transparent !important;
}

.notification-bottom-right-enter-from,
.notification-bottom-right-leave-to {
  transform: translateX(100%);
  background-color: transparent !important;
}

.notification-bottom-left-enter-from,
.notification-bottom-left-leave-to {
  transform: translateX(-100%);
  background-color: transparent !important;
}
</style>
