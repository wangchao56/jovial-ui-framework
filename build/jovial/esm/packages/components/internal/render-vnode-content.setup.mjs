import { defineComponent } from 'vue'

const JvRenderVNodeContent = defineComponent({
  name: 'JvRenderVNodeContent',
  props: {
    render: {
      type: Function,
      default: undefined,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      return slots.default ? slots.default() : props.render ? props.render() : null
    }
  },
})

export { JvRenderVNodeContent as default }
// # sourceMappingURL=render-vnode-content.setup.mjs.map
