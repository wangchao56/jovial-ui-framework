import type { PropType, VNodeChild } from 'vue'
import { defineComponent, isVNode } from 'vue'

export default defineComponent({
  name: 'JvRenderVNodeContent',
  props: {
    render: {
      type: [String, Object, Function] as PropType<((...args: any[]) => VNodeChild) | string | VNodeChild>,
      default: undefined,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      // 如果提供了默认插槽，则使用它
      if (slots.default) {
        return slots.default()
      }
      // 如果 render 是一个函数，则调用它
      else if (typeof props.render === 'function') {
        return props.render()
      }
      // 如果 render 是一个 VNodeChild，则直接返回它
      else if (isVNode(props.render)) {
        return props.render
      }
      // 如果 render 是一个字符串，则尝试将其作为内容返回（可能需要进一步处理）
      else if (typeof props.render === 'string') {
        return props.render
      }
      // 如果没有提供有效的 render 值，则返回 null
      return null
    }
  },
})
