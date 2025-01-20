import JvDivider from '@/components/JvDivider'
import JvListItem, { type ListItem } from '@/components/JvListItem'
import { defineComponent } from 'vue'

const JvListChildren = defineComponent({
  name: 'JvListChildren',
  props: {
    items: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    children: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  emits: {
    clickItem: (val: ListItem) => val,
  },
  setup(props, { emit, slots }) {
    const clickItem = (val: ListItem) => {
      emit('clickItem', val)
    }
    return () => {
      const { items } = props
      return slots.default?.() ?? items.map((child) => {
        if (child.type === 'divider') {
          return <JvDivider />
        }
        else if (child.type === 'item') {
          return <JvListItem item={child} onClick={() => clickItem(child)} />
        }
        else if (child.children && child.children.length > 0) {
          return <JvListChildren items={child.children} />
        }
        else {
          return null
        }
      })
    }
  },
})

export default JvListChildren
export type JvListChildrenInstance = InstanceType<typeof JvListChildren>
