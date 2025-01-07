'use strict';

var vue = require('vue');

function useDynamicHeightVirtualList(props) {
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
    height: `${props.items.reduce((total, item) => total + item.height, 0)}px`
  }));
  const offset = vue.ref(0);
  const handleScroll = () => {
    const scrollTop = scrollWrapperRef.value.scrollTop || 0;
    const height = props.itemHeight;
    state.start = Math.floor(scrollTop / height);
    state.end = Math.min(state.start + props.remain, props.items.length);
    offset.value = state.start * height - props.items.slice(0, state.start).reduce((total, item) => total + item.height, 0);
  };
  const initWrapper = () => {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style.height = `${props.remain * props.itemHeight}px`;
    }
    if (barRef.value) {
      barRef.value.style.height = `${props.items.reduce(
        (total, item) => total + item.height,
        0
      )}px`;
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
    handleScroll,
    initWrapper
  };
}

exports.useDynamicHeightVirtualList = useDynamicHeightVirtualList;
//# sourceMappingURL=useDynamicHeightVirtualList.cjs.map
