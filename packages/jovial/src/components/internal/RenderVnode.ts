import type { VNodeArrayChildren } from 'vue'

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)
export default defineComponent({
  name: 'RenderVNode',
  props: {
    vnode: {
      type: [String, Object, Function] as PropType<RawChildren>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => {
      const content = typeof props.vnode === 'function'
        ? props.vnode()
        : props.vnode

      return h('div', Object.assign({}, attrs), content)
    }
  },
})
