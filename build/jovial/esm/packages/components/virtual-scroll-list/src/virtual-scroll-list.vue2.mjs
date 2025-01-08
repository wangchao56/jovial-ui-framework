import { createElementBlock, defineComponent, normalizeClass, openBlock, unref } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import { virtualScrollListEmits, virtualScrollListProps } from './virtual-scroll-list.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvVirtualScrollList' },
  __name: 'virtual-scroll-list',
  props: virtualScrollListProps,
  emits: virtualScrollListEmits,
  setup(__props, { emit: __emit }) {
    const bem = createNamespace('virtual-scroll-list')
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
// # sourceMappingURL=virtual-scroll-list.vue2.mjs.map
