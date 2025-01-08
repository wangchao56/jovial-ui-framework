import { createElementBlock, defineComponent, normalizeClass, openBlock, unref } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import { popoverEmits, popoverProps } from './popover.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvPopover' },
  __name: 'popover',
  props: popoverProps,
  emits: popoverEmits,
  setup(__props, { emit: __emit }) {
    const bem = createNamespace('popover')
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        'div',
        {
          class: normalizeClass(unref(bem).b()),
        },
        null,
        2,
        /* CLASS */
      )
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=popover.vue2.mjs.map
