import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { virtualScrollProps } from './virtual'
import { createNamespace } from '@jovial/utils'

export default defineComponent({
  name: 'jv-virtual-scroll',
  props: virtualScrollProps,
  emits: [],
  components: {},
  setup(props, { slots }) {
    const bem = createNamespace('virtual-scroll')
    const scrollWrapperRef = ref<HTMLDivElement>()
    const barRef = ref<HTMLDivElement>()
    const scrollListRef = ref<HTMLDivElement>()
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
    //应该上下多显示几条数据
    const virtualDataRef = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    const wrapperStyle = computed(() => ({
      height: `${props.remain * props.itemHeight}px`
    }))

    const scrollBarStyle = computed(() => ({
      height: `${props.items.length * props.size}px`
    }))

    const offset = ref(0)

    const handleScroll = () => {
      const scrollTop = scrollWrapperRef.value!.scrollTop
      state.start = Math.round(scrollTop / props.itemHeight)
      //检查边界问题
      state.end = state.start + props.remain
      offset.value =
        state.start * props.itemHeight - props.itemHeight * prev.value
    }
    // Initialize wrapper styles
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

    watch(() => props.items.length, initWrapper, { immediate: true })

    return () => {
      const virtualData = virtualDataRef.value
      return (
        <div
          class={bem.b()}
          ref={scrollWrapperRef}
          style={wrapperStyle.value}
          onScroll={handleScroll}
        >
          <div
            class={bem.e('bar')}
            ref={barRef}
            style={scrollBarStyle.value}
          ></div>
          <div
            class={bem.e('list')}
            ref={scrollListRef}
            style={{
              transform: `translate3d(0,${offset.value}px,0)`
            }}
          >
            {virtualData.map((item, index) => {
              return slots.default!({ node: item })
            })}
          </div>
        </div>
      )
    }
  }
})
