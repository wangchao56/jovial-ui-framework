import { defineComponent, type SlotsType } from 'vue'

const JvListGroup = defineComponent({
  name: 'JvListGroup',
  props: {},
  emits: [],
  slots: Object as SlotsType<{
    default: { foo: string, bar: number }
    item: { data: number }
  }>,
  setup(props, { slots }) {
    return () => (
      <div>
        {
          slots.item?.({ data: 1 })
        }
      </div>
    )
  },
})
export default JvListGroup
