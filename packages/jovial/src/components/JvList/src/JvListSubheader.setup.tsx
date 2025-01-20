import { createNamespace } from '@jovial/utils'
import { createVNode, defineComponent } from 'vue'

export default defineComponent({
  name: 'JvListSubheader',
  props: {
    tag: String,
    title: String,
  },
  emits: [],
  setup(props, ctx) {
    const bem = createNamespace('list-subheader')
    return () => createVNode('div', {
      class: bem.b(),
      ...ctx.attrs,
    }, props.title)
  },
})
