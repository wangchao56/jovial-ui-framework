import { computed, defineComponent, nextTick, reactive, ref, watch } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import { virtualScrollProps } from './virtual.mjs'

const virtualScrollObserver = defineComponent({
  name: 'jv-virtual-scroll',
  props: virtualScrollProps,
  setup(props, { slots }) {
    const bem = createNamespace('virtual-scroll')
    const scrollWrapperRef = ref(null)
    const barRef = ref(null)
    const scrollListRef = ref(null)
    const state = reactive({
      start: 0,
      end: props.remain,
    })
    const virtualData = computed(() => {
      return props.items.slice(state.start, state.end)
    })
    const wrapperStyle = computed(() => ({
      height: `${props.remain * props.itemHeight}px`,
    }))
    const scrollBarStyle = computed(() => ({
      height: `${props.items.length * props.size}px`,
    }))
    const offset = ref(0)
    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollWrapperRef.value,
      threshold: 0.5,
    })
    function handleIntersection(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting)
          return
        console.log(entry)
        if (entry.boundingClientRect.bottom < scrollWrapperRef.value.clientHeight && state.end < props.items.length) {
          state.end += 1
        }
        if (entry.boundingClientRect.top > 0 && state.start > 0) {
          state.start -= 1
          offset.value = state.start * props.itemHeight
        }
      })
    }
    const handleScroll = () => {
      const scrollTop = scrollWrapperRef.value.scrollTop
      state.start = Math.floor(scrollTop / props.itemHeight)
      state.end = state.start + props.remain
      offset.value = state.start * props.itemHeight
      nextTick(() => {
        updateObserver()
      })
    }
    const updateObserver = () => {
      if (scrollListRef.value) {
        const lastElement = scrollListRef.value.lastElementChild
        const firstElement = scrollListRef.value.firstElementChild
        if (lastElement)
          observer.unobserve(lastElement)
        if (lastElement)
          observer.observe(lastElement)
        if (firstElement)
          observer.unobserve(firstElement)
        if (firstElement)
          observer.observe(firstElement)
      }
    }
    watch(
      () => props.items,
      () => {
        state.end = Math.min(state.end, props.items.length)
        updateObserver()
      },
    )
    const initWrapper = () => {
      if (scrollWrapperRef.value) {
        scrollWrapperRef.value.style.height = `${props.remain * props.itemHeight}px`
      }
      if (barRef.value) {
        barRef.value.style.height = `${props.items.length * props.size}px`
      }
    }
    watch(() => props.items.length, initWrapper, { immediate: true })
    return () => /* @__PURE__ */ React.createElement(
      'div',
      {
        class: bem.b(),
        ref: scrollWrapperRef,
        style: wrapperStyle.value,
        onScroll: handleScroll,
      },
      /* @__PURE__ */ React.createElement(
        'div',
        {
          class: bem.e('bar'),
          ref: barRef,
          style: scrollBarStyle.value,
        },
      ),
      /* @__PURE__ */ React.createElement(
        'div',
        {
          class: bem.e('list'),
          ref: scrollListRef,
          style: { transform: `translate3d(0,${offset.value}px,0)` },
        },
        virtualData.value.map(
          (item, index) => slots.default({ node: item, index }),
        ),
      ),
    )
  },
})

export { virtualScrollObserver as default }
// # sourceMappingURL=virtual-scroll-observer.mjs.map
