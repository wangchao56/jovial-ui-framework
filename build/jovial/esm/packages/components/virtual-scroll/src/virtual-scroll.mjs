import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import { virtualScrollProps } from './virtual.mjs'

const _virtualScroll = defineComponent({
  name: 'jv-virtual-scroll',
  props: virtualScrollProps,
  emits: [],
  components: {},
  setup(props, { slots }) {
    const bem = createNamespace('virtual-scroll')
    const scrollWrapperRef = ref()
    const barRef = ref()
    const scrollListRef = ref()
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
      height: `${props.items.length * props.size}px`,
    }))
    const offset = ref(0)
    const handleScroll = () => {
      const scrollTop = scrollWrapperRef.value.scrollTop
      state.start = Math.round(scrollTop / props.itemHeight)
      state.end = state.start + props.remain
      offset.value = state.start * props.itemHeight - props.itemHeight * prev.value
    }
    const initWrapper = () => {
      if (scrollWrapperRef.value) {
        scrollWrapperRef.value.style.height = `${props.remain * props.itemHeight}px`
      }
      if (barRef.value) {
        barRef.value.style.height = `${props.items.length * props.size}px`
      }
    }
    watch(() => props.items.length, initWrapper, { immediate: true })
    return () => {
      const virtualData = virtualDataRef.value
      return /* @__PURE__ */ React.createElement(
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
            style: {
              transform: `translate3d(0,${offset.value}px,0)`,
            },
          },
          virtualData.map((item, index) => {
            return slots.default({ node: item })
          }),
        ),
      )
    }
  },
})

export { _virtualScroll as default }
// # sourceMappingURL=virtual-scroll.mjs.map
