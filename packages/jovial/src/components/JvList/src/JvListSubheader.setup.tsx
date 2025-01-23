import { createNamespace } from '@jovial/utils'
import { createTextVNode, createVNode, defineComponent, normalizeClass } from 'vue'

export default defineComponent({
  name: 'JvListSubheader',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    title: String,
    sticky: Boolean,
    inset: Boolean,
  },
  setup(props, { slots }) {
    const bem = createNamespace('list-subheader')

    return () => createVNode(props.tag, {
      class: normalizeClass([
        bem.b(),
        bem.is('sticky', props.sticky),
        bem.is('inset', props.inset),
      ]),
    }, {
      default: slots.default?.() || createTextVNode(props.title),
    })
  },
})
