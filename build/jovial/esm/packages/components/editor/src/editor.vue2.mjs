import { createElementBlock, defineComponent, normalizeClass, openBlock, unref } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import { editorEmits, editorProps } from './editor.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvEditor' },
  __name: 'editor',
  props: editorProps,
  emits: editorEmits,
  setup(__props, { emit: __emit }) {
    const bem = createNamespace('editor')
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
// # sourceMappingURL=editor.vue2.mjs.map
