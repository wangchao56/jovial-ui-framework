'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const floatingUi_dom = require('../../../../node_modules/.pnpm/@floating-ui_dom@1.6.12/node_modules/@floating-ui/dom/dist/floating-ui.dom.cjs')
const floatingUi_vue = require('../../../../node_modules/.pnpm/@floating-ui_vue@1.1.5_vue@3.5.13_typescript@5.7.2_/node_modules/@floating-ui/vue/dist/floating-ui.vue.cjs')
const create = require('../../../utils/create.cjs')

const JvPopper = vue.defineComponent({
  name: 'JvPopper',
  setup(props, ctx) {
    const bem = create.createNamespace('popper')
    const popoverRef = vue.ref(null)
    vue.ref('right')
    const referenceRef = vue.ref(null)
    const floatingRef = vue.ref(null)
    const floatingArrowRef = vue.ref(null)
    vue.ref([floatingUi_dom.offset(10), floatingUi_dom.flip(), floatingUi_dom.shift()])
    const { floatingStyles, middlewareData: middlewareDataRef } = floatingUi_vue.useFloating(
      referenceRef,
      floatingRef,
      {
        middleware: [floatingUi_vue.arrow({ element: floatingArrowRef.value })],
      },
    )
    return () => {
      let _a, _b
      const middlewareData = middlewareDataRef.value
      return /* @__PURE__ */ React.createElement('div', { class: [bem.b()] }, /* @__PURE__ */ React.createElement('span', { ref: referenceRef }, 'Reference ', /* @__PURE__ */ React.createElement('slot', null)), /* @__PURE__ */ React.createElement('div', { ref: popoverRef, style: floatingStyles.value }, /* @__PURE__ */ React.createElement(
        'div',
        {
          ref: floatingArrowRef,
          style: {
            position: 'absolute',
            left: ((_a = middlewareData.arrow) == null ? undefined : _a.x) != null ? `${middlewareData.arrow.x}px` : '',
            top: ((_b = middlewareData.arrow) == null ? undefined : _b.y) != null ? `${middlewareData.arrow.y}px` : '',
          },
        },
      )))
    }
  },
})

exports.default = JvPopper
// # sourceMappingURL=popper.setup.cjs.map
