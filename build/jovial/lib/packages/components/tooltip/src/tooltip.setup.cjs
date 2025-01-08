'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const popper_vue_vue_type_script_setup_true_lang = require('../../popper/src/popper.vue2.cjs')
const tooltip = require('./tooltip.cjs')

const tooltip_setup = vue.defineComponent({
  name: 'JvTooltip',
  props: tooltip.tooltipProps,
  setup(props, { slots }) {
    const bem = create.createNamespace('tooltip')
    const popperRef = vue.ref(null)
    const referenceRef = vue.ref(null)
    const visibleRef = vue.ref(false)
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
    vue.watch(
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
      popper_vue_vue_type_script_setup_true_lang.default,
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

exports.default = tooltip_setup
// # sourceMappingURL=tooltip.setup.cjs.map
