import { computed, defineComponent, onMounted, reactive, ref, unref } from 'vue'
import { virtualScrollProps } from './virtual'
import { createNamespace } from '@jovial/utils'
import { nextTick } from 'vue'

export default defineComponent({
  name: 'jv-virtual-scroll',
  props: virtualScrollProps,
  emits: [],
  components: {},
  setup(props, { slots }) {
    console.log(props)

    const bem = createNamespace('virtual-scroll')
    const scrollWrapperRef = ref<HTMLDivElement>()
    const barRef = ref<HTMLDivElement>()
    const state = reactive({
      start: 0,
      end: props.remain
    })

    onMounted(() => {
      console.log('virtual-scroll mounted')
    })

    const virtualDataRef = computed(() => {
      return props.items.slice(state.start, state.end)
    })

    const createWrapperStyleRef = computed(() => {
      return {
        height: `${props.remain * props.itemHeight}px`
      }
    })

    const createScrollBarStyleRef = computed(() => {
      return {
        height: `${props.items.length * props.size}px`
      }
    })

    const offset = ref(0)
    const handleScroll = () => {
      const scrollTop = scrollWrapperRef.value!.scrollTop
      state.start = Math.floor(scrollTop / props.itemHeight)
      state.end = state.start + props.remain
      offset.value = state.start * props.itemHeight
    }

    return () => {
      const virtualData = virtualDataRef.value
      return (
        <div
          class={bem.b()}
          ref={scrollWrapperRef}
          style={createWrapperStyleRef.value}
          onScroll={handleScroll}
        >
          <div
            class={bem.e('bar')}
            ref={barRef}
            style={createScrollBarStyleRef.value}
          ></div>
          <div
            class={bem.e('list')}
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
