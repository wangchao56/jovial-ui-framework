import type { VNodeArrayChildren } from 'vue'

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)
export default defineComponent({
  name: 'RenderVNode',
  props: {
    vnode: {
      type: [String, Object, Function] as PropType<RawChildren>,
      required: true,
    },
    tag: {
      type: String as PropType<string>,
      default: 'div',
    },
  },
  setup(props, { attrs }) {
    return () => {
      const content = typeof props.vnode === 'function'
        ? props.vnode()
        : props.vnode

      const tag = props.tag || 'div'

      return h(tag, Object.assign({}, attrs), content)
    }
  },
})
