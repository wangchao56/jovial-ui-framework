import type { JvButtonGroupProps } from './JvButtonGroup'
import { createNamespace } from '@jovial/utils'
import { defineComponent, provide, ref } from 'vue'
import '../style/jv-button-group.css'

export default defineComponent({
  name: 'JvButtonGroup',
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: [Number, String],
      default: 0,
    },
    justify: {
      type: String,
      default: 'start',
    },
  },
  setup(props: JvButtonGroupProps, { slots }) {
    const bem = createNamespace('button-group')
    const rootRef = ref<HTMLElement | null>(null)

    // 提供按钮组上下文给子按钮使用
    provide('buttonGroupContext', {
      size: props.size,
      rounded: props.rounded,
    })

    const groupStyle = {
      gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
      justifyContent: props.justify,
    }

    return () => (
      <div
        ref={rootRef}
        class={[
          bem.b(),
          bem.is('vertical', props.vertical),
          bem.is('rounded', props.rounded),
        ]}
        style={groupStyle}
      >
        {slots.default?.()}
      </div>
    )
  },
})
