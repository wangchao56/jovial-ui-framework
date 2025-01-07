import { ref, reactive, computed, watch } from 'vue';

function useVirtualScroll(props) {
  const scrollWrapperRef = ref();
  const barRef = ref();
  const state = reactive({
    start: 0,
    end: props.remain
  });
  const prev = computed(() => {
    return Math.min(state.start, props.remain);
  });
  const next = computed(() => {
    return Math.min(props.remain, props.items.length - state.end);
  });
  const virtualDataRef = computed(() => {
    return props.items.slice(state.start - prev.value, state.end + next.value);
  });
  const wrapperStyle = computed(() => ({
    height: `${props.remain * props.itemHeight}px`
  }));
  const scrollBarStyle = computed(() => ({
    height: `${props.items.length * props.size}px`
  }));
  const offset = ref(0);
  const handleScroll = () => {
    const scrollTop = scrollWrapperRef.value.scrollTop || 0;
    state.start = Math.round(scrollTop / props.itemHeight);
    state.end = state.start + props.remain;
    offset.value = state.start * props.itemHeight - props.itemHeight * prev.value;
  };
  const initWrapper = () => {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style.height = `${props.remain * props.itemHeight}px`;
    }
    if (barRef.value) {
      barRef.value.style.height = `${props.items.length * props.size}px`;
    }
  };
  watch(() => props.items.length, initWrapper, { immediate: true });
  return {
    scrollWrapperRef,
    barRef,
    virtualDataRef,
    wrapperStyle,
    scrollBarStyle,
    offset,
    handleScroll
  };
}

export { useVirtualScroll };
//# sourceMappingURL=useVirtualScroll.mjs.map
