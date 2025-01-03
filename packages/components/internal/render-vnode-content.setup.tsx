import { defineComponent, PropType, VNodeChild } from 'vue'

export default defineComponent({
  name: 'JvRenderVNodeContent',
  props: {
    render: {
      type: Function as PropType<((...args: any[]) => VNodeChild) | undefined>,
      default: undefined,
      required: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return slots.default
        ? slots.default()
        : props.render
          ? props.render()
          : null
    }
  }
})
