import { computed, reactive, ref, watch } from 'vue'

function useDynamicHeightVirtualList(props) {
  const scrollWrapperRef = ref()
  const barRef = ref()
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
  const virtualDataRef = computed(() => {
    return props.items.slice(state.start - prev.value, state.end + next.value)
  })
  const wrapperStyle = computed(() => ({
    height: `${props.remain * props.itemHeight}px`,
  }))
  const scrollBarStyle = computed(() => ({
    height: `${props.items.reduce((total, item) => total + item.height, 0)}px`,
  }))
  const offset = ref(0)
  const handleScroll = () => {
    const scrollTop = scrollWrapperRef.value.scrollTop || 0
    const height = props.itemHeight
    state.start = Math.floor(scrollTop / height)
    state.end = Math.min(state.start + props.remain, props.items.length)
    offset.value = state.start * height - props.items.slice(0, state.start).reduce((total, item) => total + item.height, 0)
  }
  const initWrapper = () => {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style.height = `${props.remain * props.itemHeight}px`
    }
    if (barRef.value) {
      barRef.value.style.height = `${props.items.reduce(
        (total, item) => total + item.height,
        0,
      )}px`
    }
  }
  watch(() => props.items.length, initWrapper, { immediate: true })
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

export { useDynamicHeightVirtualList }
// # sourceMappingURL=useDynamicHeightVirtualList.mjs.map
