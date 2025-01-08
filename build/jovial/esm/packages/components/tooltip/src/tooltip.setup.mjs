import { defineComponent, ref, watch } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import _sfc_main from '../../popper/src/popper.vue2.mjs'
import { tooltipProps } from './tooltip.mjs'

const tooltip_setup = defineComponent({
  name: 'JvTooltip',
  props: tooltipProps,
  setup(props, { slots }) {
    const bem = createNamespace('tooltip')
    const popperRef = ref(null)
    const referenceRef = ref(null)
    const visibleRef = ref(false)
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
      console.log(1)
    }
    function handleHide() {
      if (props.trigger === 'hover') {
        visibleRef.value = false
      }
      console.log(2)
    }
    watch(
      () => visibleRef.value,
      (newVal) => {
        console.log(newVal)
      },
    )
    return () => /* @__PURE__ */ React.createElement('div', { class: bem.b() }, /* @__PURE__ */ React.createElement(
      'div',
      {
        ref: referenceRef,
        class: bem.e('reference'),
        onClick: handleShow,
        onMouseenter: handleShow,
        onMouseleave: handleHide,
      },
      slots.content ? /* @__PURE__ */ React.createElement('slot', { name: 'content' }) : slots.activator ? /* @__PURE__ */ React.createElement('slot', { name: 'activator' }) : /* @__PURE__ */ React.createElement('slot', null),
    ), popperRef.value && /* @__PURE__ */ React.createElement(
      _sfc_main,
      {
        ref: popperRef,
        visible: visibleRef.value,
        reference: referenceRef,
        placement: props.placement || 'bottom-end',
      },
      {
        content: () => {
          let _a
          return props.content || ((_a = slots.default) == null ? undefined : _a.call(slots))
        },
      },
    ))
  },
})

export { tooltip_setup as default }
// # sourceMappingURL=tooltip.setup.mjs.map
