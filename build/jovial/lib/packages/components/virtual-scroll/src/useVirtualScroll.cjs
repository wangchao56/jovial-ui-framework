'use strict';

var vue = require('vue');

function useVirtualScroll(props) {
  const scrollWrapperRef = vue.ref();
  const barRef = vue.ref();
  const state = vue.reactive({
    start: 0,
    end: props.remain
  });
  const prev = vue.computed(() => {
    return Math.min(state.start, props.remain);
  });
  const next = vue.computed(() => {
    return Math.min(props.remain, props.items.length - state.end);
  });
  const virtualDataRef = vue.computed(() => {
    return props.items.slice(state.start - prev.value, state.end + next.value);
  });
  const wrapperStyle = vue.computed(() => ({
    height: `${props.remain * props.itemHeight}px`
  }));
  const scrollBarStyle = vue.computed(() => ({
    height: `${props.items.length * props.size}px`
  }));
  const offset = vue.ref(0);
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
  vue.watch(() => props.items.length, initWrapper, { immediate: true });
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

exports.useVirtualScroll = useVirtualScroll;
//# sourceMappingURL=useVirtualScroll.cjs.map
