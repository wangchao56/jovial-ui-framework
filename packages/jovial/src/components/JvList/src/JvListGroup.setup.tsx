import { createNamespace } from '@jovial/utils'
import { defineComponent, type Slot, type SlotsType } from 'vue'

const JvListGroup = defineComponent({
  name: 'JvListGroup',
  props: {
    title: String,
    expanded: Boolean,
  },
  emits: ['update:expanded'],
  slots: Object as SlotsType<{
    default: Slot
    header: Slot
  }>,
  setup(props, { slots, emit }) {
    const bem = createNamespace('list-group')
    return () => (
      <div class={bem.b()}>
        <div
          class={bem.e('header')}
          onClick={() => emit('update:expanded', !props.expanded)}
        >
          {slots.header?.() || props.title}
        </div>
        <div class={[
          bem.e('content'),
          bem.is('expanded', props.expanded),
        ]}
        >
          {slots.default?.()}
        </div>
      </div>
    )
  },
})

export default JvListGroup
