// useVirtualScroll.js
import { computed, reactive, ref, watch } from 'vue'

export function useVirtualScroll(props) {
  const scrollWrapperRef = ref<HTMLDivElement>()
  const barRef = ref<HTMLDivElement>()
  const state = reactive({
    start: 0,
    end: props.remain
  })

  const prev = computed(() => {
    return Math.min(state.start, props.remain)
  })

  const next = computed(() => {
    return Math.min(props.remain, props.items.length - state.end)
  })

  // 计算显示的虚拟数据
  const virtualDataRef = computed(() => {
    return props.items.slice(state.start - prev.value, state.end + next.value)
  })

  // 计算容器和滚动条的样式
  const wrapperStyle = computed(() => ({
    height: `${props.remain * props.itemHeight}px`
  }))

  const scrollBarStyle = computed(() => ({
    height: `${props.items.length * props.size}px`
  }))

  const offset = ref(0)

  // 处理滚动事件
  const handleScroll = () => {
    const scrollTop = scrollWrapperRef.value!.scrollTop || 0
    state.start = Math.round(scrollTop / props.itemHeight)
    // 检查边界问题
    state.end = state.start + props.remain
    offset.value =
      state.start * props.itemHeight - props.itemHeight * prev.value
  }

  // 初始化 wrapper 的样式
  const initWrapper = () => {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style.height = `${
        props.remain * props.itemHeight
      }px`
    }
    if (barRef.value) {
      barRef.value.style.height = `${props.items.length * props.size}px`
    }
  }

  // 监听 items 的变化
  watch(() => props.items.length, initWrapper, { immediate: true })

  return {
    scrollWrapperRef,
    barRef,
    virtualDataRef,
    wrapperStyle,
    scrollBarStyle,
    offset,
    handleScroll
  }
}
