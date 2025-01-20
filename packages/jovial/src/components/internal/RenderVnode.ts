export default defineComponent({
  name: 'RenderVNode',
  props: {
    vnode: {
      type: [String, Object] as PropType<string | VNode>,
      required: true,
    },
  },
  setup(props) {
    const attrs = useAttrs()

    return () => h('div', Object.assign({}, attrs), props.vnode)
  },
})
