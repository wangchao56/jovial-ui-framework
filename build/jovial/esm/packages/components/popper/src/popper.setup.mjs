import { defineComponent, ref } from 'vue'
import { flip, offset, shift } from '../../../../node_modules/.pnpm/@floating-ui_dom@1.6.12/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs'
import { arrow, useFloating } from '../../../../node_modules/.pnpm/@floating-ui_vue@1.1.5_vue@3.5.13_typescript@5.7.2_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs'
import { createNamespace } from '../../../utils/create.mjs'

const JvPopper = defineComponent({
  name: 'JvPopper',
  setup(props, ctx) {
    const bem = createNamespace('popper')
    const popoverRef = ref(null)
    ref('right')
    const referenceRef = ref(null)
    const floatingRef = ref(null)
    const floatingArrowRef = ref(null)
    ref([offset(10), flip(), shift()])
    const { floatingStyles, middlewareData: middlewareDataRef } = useFloating(
      referenceRef,
      floatingRef,
      {
        middleware: [arrow({ element: floatingArrowRef.value })],
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

export { JvPopper as default }
// # sourceMappingURL=popper.setup.mjs.map
