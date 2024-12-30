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
    default: 50
  },
  itemHeight: {
    type: Number,
    default: 50
  }
}

export type VirtualSrcollProps = ExtractPropTypes<typeof virtualScrollProps>
