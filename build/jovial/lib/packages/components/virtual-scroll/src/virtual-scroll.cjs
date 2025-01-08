'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const virtual = require('./virtual.cjs')

const _virtualScroll = vue.defineComponent({
  name: 'jv-virtual-scroll',
  props: virtual.virtualScrollProps,
  emits: [],
  components: {},
  setup(props, { slots }) {
    const bem = create.createNamespace('virtual-scroll')
    const scrollWrapperRef = vue.ref()
    const barRef = vue.ref()
    const scrollListRef = vue.ref()
    const state = vue.reactive({
      start: 0,
      end: props.remain,
    })
    const prev = vue.computed(() => {
      return Math.min(state.start, props.remain)
    })
    const next = vue.computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })
    const virtualDataRef = vue.computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })
    const wrapperStyle = vue.computed(() => ({
      height: `${props.remain * props.itemHeight}px`,
    }))
    const scrollBarStyle = vue.computed(() => ({
      height: `${props.items.length * props.size}px`,
    }))
    const offset = vue.ref(0)
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
    vue.watch(() => props.items.length, initWrapper, { immediate: true })
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

exports.default = _virtualScroll
// # sourceMappingURL=virtual-scroll.cjs.map
