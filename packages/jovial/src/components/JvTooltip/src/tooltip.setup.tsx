import type { ReferenceType } from '@components/JvPopper'
import JvPopperVue from '@components/JvPopper/src/popper.vue'
import { createNamespace } from '@jovial/utils'
import { defineComponent, ref, watch } from 'vue'
import { tooltipProps } from './tooltip'

export default defineComponent({
  name: 'JvTooltip',
  props: tooltipProps,
  setup(props, { slots }) {
    const bem = createNamespace('tooltip')
    const popperRef = ref<InstanceType<typeof JvPopperVue> | null>(null)
    const referenceRef = ref<ReferenceType | null>(null)
    const visibleRef = ref(false) // 初始化为false，因为tooltip默认不显示

    function handleShow() {
      if (props.trigger === 'click') {
        visibleRef.value = !visibleRef.value
      }
      else if (props.trigger === 'hover') {
        visibleRef.value = true
      }
      if (popperRef.value) {
        popperRef.value.update()
      }
    }

    function handleHide() {
      if (props.trigger === 'hover') {
        visibleRef.value = false
      }
    }

    watch(
      () => visibleRef.value,
      () => {
      },
    )

    return () => (
      <div class={bem.b()}>
        <div
          ref={referenceRef}
          class={bem.e('reference')}
          onClick={handleShow}
          onMouseenter={handleShow}
          onMouseleave={handleHide}
        >
          {slots.content
            ? (
                <slot name="content" />
              )
            : slots.activator
              ? (
                  <slot name="activator" />
                )
              : (
                  <slot />
                )}
        </div>
        {popperRef.value && (
          <JvPopperVue
            ref={popperRef}
            visible={visibleRef.value}
            reference={referenceRef}
            placement={props.placement || 'bottom-end'}
          >
            {{
              content: () => {
                return props.content || slots.default?.()
              },
            }}
          </JvPopperVue>
        )}
      </div>
    )
  },
})
