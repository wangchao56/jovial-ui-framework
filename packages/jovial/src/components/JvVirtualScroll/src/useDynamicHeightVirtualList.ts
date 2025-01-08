// useDynamicHeightVirtualList.js
import { computed, reactive, ref, watch } from 'vue'

export function useDynamicHeightVirtualList(props) {
  const scrollWrapperRef = ref<HTMLDivElement>()
  const barRef = ref<HTMLDivElement>()
  const state = reactive({
    start: 0,
    end: props.remain,
  })

  const prev = computed(() => {
    return Math.min(state.start, props.remain)
  })

  const next = computed(() => {
    return Math.min(props.remain, props.items.length - state.end)
  })

  // 计算可视虚拟数据
  const virtualDataRef = computed(() => {
    return props.items.slice(state.start - prev.value, state.end + next.value)
  })

  // 容器的样式
  const wrapperStyle = computed(() => ({
    height: `${props.remain * props.itemHeight}px`,
  }))

  // 滚动条的样式
  const scrollBarStyle = computed(() => ({
    height: `${props.items.reduce((total, item) => total + item.height, 0)}px`,
  }))

  const offset = ref(0)

  // 处理滚动事件
  const handleScroll = () => {
    const scrollTop = scrollWrapperRef.value!.scrollTop || 0
    const height = props.itemHeight // 假设所有项目的平均高度为 props.itemHeight，实际使用时可能需要 Dynamic height logic.

    state.start = Math.floor(scrollTop / height)
    state.end = Math.min(state.start + props.remain, props.items.length)
    offset.value
      = state.start * height
      - props.items
        .slice(0, state.start)
        .reduce((total, item) => total + item.height, 0)
  }

  // 初始化 wrapper 的样式
  const initWrapper = () => {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style!.height = `${
        props.remain * props.itemHeight
      }px`
    }
    if (barRef.value) {
      barRef.value.style.height = `${props.items.reduce(
        (total, item) => total + item.height,
        0,
      )}px`
    }
  }

  // 监听 items 的变化
  watch(() => props.items.length, initWrapper, { immediate: true })

  // 返回 Hook 的状态
  return {
    scrollWrapperRef,
    barRef,
    virtualDataRef,
    wrapperStyle,
    scrollBarStyle,
    offset,
    handleScroll,
    initWrapper,
  }
}
