import { createNamespace } from '@jienix/utils'
import { createTextVNode, createVNode, defineComponent, Fragment, inject } from 'vue'
import { JvListContextKey } from './JvList'

export default defineComponent({
  name: 'JvListSubheader',
  props: {
    tag: {
      type: String,
      default: 'li',
    },
    title: String,
    sticky: Boolean,
    inset: Boolean,
  },
  setup(props, { slots }) {
    const bem = createNamespace('list-subheader')
    const listContext = inject(JvListContextKey)

    const style = computed(() => {
      return props.inset
        ? {
            paddingLeft: `${listContext?.indent || 24}px`,
          }
        : undefined
    })
    const children = [slots.default && createVNode(Fragment, null, slots.default()), createTextVNode(props.title)]

    return () => createVNode(props.tag, {
      class: bem.b(),
      style,
    }, children)
  },
})
