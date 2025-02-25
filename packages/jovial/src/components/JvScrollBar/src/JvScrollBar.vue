<script setup lang="ts">
import { addResizeListener, removeResizeListener } from '@/utils'
import { createNamespace } from '@jovial/utils'
import { computed, onMounted, ref, watch } from 'vue'
import Bar from './bar.vue'
import { type JvScrollBarEmits, jvScrollBarProps } from './JvScrollBar'
import '../style/style.css'

defineOptions({ name: 'JvScrollBar' })

const props = defineProps(jvScrollBarProps)
const emit = defineEmits<JvScrollBarEmits>()
const bem = createNamespace('scrollBar')

// refs
const wrapRef = ref<HTMLElement>()
const viewRef = ref<HTMLElement>()
const verticalBar = ref()
const horizontalBar = ref()

// computed
const style = computed(() => {
  const style: Record<string, string> = {}
  if (props.height)
    style.height = `${props.height}px`
  if (props.maxHeight)
    style.maxHeight = `${props.maxHeight}px`
  return [props.wrapStyle, style]
})

// state
const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref(0)
const moveY = ref(0)
const ratioX = ref(1)
const ratioY = ref(1)

function handleScroll() {
  if (wrapRef.value) {
    const { scrollTop, scrollLeft } = wrapRef.value
    moveY.value = ((scrollTop * 100) / wrapRef.value.clientHeight)
    moveX.value = ((scrollLeft * 100) / wrapRef.value.clientWidth)
    emit('scroll', {
      scrollTop,
      scrollLeft,
    })
  }
}

function update() {
  if (!wrapRef.value || !viewRef.value)
    return

  const { clientHeight: wrapHeight, clientWidth: wrapWidth } = wrapRef.value
  const { offsetHeight: viewHeight, offsetWidth: viewWidth } = viewRef.value

  ratioY.value = (wrapHeight ** 2 / viewHeight / wrapHeight)
  ratioX.value = (wrapWidth ** 2 / viewWidth / wrapWidth)

  sizeHeight.value = `${ratioY.value * 100}%`
  sizeWidth.value = `${ratioX.value * 100}%`
}

// methods
function scrollTo(options: ScrollToOptions) {
  wrapRef.value?.scrollTo(options)
}

function setScrollTop(value: number) {
  if (!wrapRef.value)
    return
  wrapRef.value.scrollTop = value
}

function setScrollLeft(value: number) {
  if (!wrapRef.value)
    return
  wrapRef.value.scrollLeft = value
}

// lifecycle
onMounted(() => {
  if (!props.noresize) {
    addResizeListener(viewRef.value!, update)
    update()
  }
})

onUnmounted(() => {
  if (!props.noresize) {
    removeResizeListener(viewRef.value!, update)
  }
})

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.noresize) {
      update()
    }
  },
)

defineExpose({
  wrapRef,
  update,
  scrollTo,
  setScrollTop,
  setScrollLeft,
})
</script>

<template>
  <div :class="bem.b()">
    <div
      ref="wrapRef"
      :class="[
        bem.e('wrap'),
        wrapClass,
        {
          [bem.em('wrap', 'hidden-default')]: !native,
        },
      ]"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="viewRef"
        :class="[bem.e('view'), viewClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>

    <template v-if="!native">
      <!-- 垂直滚动条 -->
      <Bar
        ref="verticalBar"
        vertical
        :size="sizeHeight"
        :move="moveY"
        :ratio="ratioY"
        :always="always"
      />
      <!-- 水平滚动条 -->
      <Bar
        ref="horizontalBar"
        :size="sizeWidth"
        :move="moveX"
        :ratio="ratioX"
        :always="always"
      />
    </template>
  </div>
</template>
