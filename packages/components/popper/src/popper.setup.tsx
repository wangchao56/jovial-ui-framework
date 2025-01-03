import { defineComponent } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { MaybeReadonlyRefOrGetter, Placement } from '@floating-ui/vue'
import { flip, offset, shift, useFloating, arrow } from '@floating-ui/vue'
import { createNamespace } from '@jovial/utils'
const JvPopper = defineComponent({
  name: 'JvPopper',
  setup(props, ctx) {
    const bem = createNamespace('popper')
    const popoverRef = ref(null)
    const placementRef =
      ref<MaybeReadonlyRefOrGetter<Placement | undefined>>('right')
    const referenceRef = ref(null)
    const floatingRef = ref(null)
    const floatingArrowRef = ref(null)
    const middlewareRef = ref([offset(10), flip(), shift()])
    const { floatingStyles, middlewareData: middlewareDataRef } = useFloating(
      referenceRef,
      floatingRef,
      {
        middleware: [arrow({ element: floatingArrowRef.value })]
      }
    )

    return () => {
      const middlewareData = middlewareDataRef.value
      return (
        <div class={[bem.b()]}>
          <span ref={referenceRef}>
            Reference <slot></slot>
          </span>
          <div ref={popoverRef} style={floatingStyles.value}>
            <div
              ref={floatingArrowRef}
              style={{
                position: 'absolute',
                left:
                  middlewareData.arrow?.x != null
                    ? `${middlewareData.arrow.x}px`
                    : '',
                top:
                  middlewareData.arrow?.y != null
                    ? `${middlewareData.arrow.y}px`
                    : ''
              }}
            ></div>
          </div>
        </div>
      )
    }
  }
})

export default JvPopper
