import { ExtractPropTypes, PropType } from 'vue'

export const virtualScrollProps = {
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  remain: {
    type: Number,
    default: 10
  },
  size: {
    type: Number,
    default: 35
  },
  itemHeight: {
    type: Number,
    default: 35
  }
}

export type VirtualScrollProps = ExtractPropTypes<typeof virtualScrollProps>
