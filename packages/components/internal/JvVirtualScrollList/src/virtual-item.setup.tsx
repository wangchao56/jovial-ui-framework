import { defineComponent } from 'vue'
import { virtualItemProps } from './props'

export default defineComponent({
  name: 'Jv-virtual-item',
  props: virtualItemProps,
  emits: {
    itemResize: (_key: string, _size: number) => true,
  },
  setup(props, { emit }) {
    const rootRef = ref<HTMLDivElement | null>(null)

    function dispatchResize() {
      emit(
        'itemResize',
        props.uniqueKey,
        rootRef.value?.offsetHeight || props.estimateSize || 0,
      )
    }

    onMounted(() => {
      dispatchResize()
    })

    onUpdated(() => {
      dispatchResize()
    })

    return () => {
      const { component: Comp, uniqueKey, source, index } = props

      return (
        <>
          {Comp
            ? (
                <div ref={rootRef} key={uniqueKey} data-index={index}>
                  <Comp source={source} />
                </div>
              )
            : null}
        </>
      )
    }
  },
})
