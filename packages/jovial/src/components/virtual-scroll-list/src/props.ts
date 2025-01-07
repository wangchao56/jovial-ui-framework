import { DefineComponent, ExtractPropTypes, PropType, VNodeChild } from 'vue'

export type VirtualOptions = {
  /** 总数据量 */
  keeps: number
  /** 缓冲数量 */
  buffer: number
  /** 预估组件的大小 */
  estimateSize: number
  /** 渲染的唯一标识 */
  uniqueIds: string[]
}

export const virtualProps = {
  dataSource: {
    type: Array as () => any[],
    default: () => []
  },
  dataKey: {
    type: String,
    default: 'id'
  },
  keeps: {
    type: Number,
    default: 20
  },
  estimateSize: {
    type: Number,
    default: 50
  },
  dataComponent: {
    type: [Object, Function] as PropType<DefineComponent<{}, {}, {}>>,
    required: true
  },
  //是否启用动态计算组件高度
  isDynamic: {
    type: Boolean,
    default: false
  }
} as const

export type VirtualProps = {
  //传入要渲染的总数据
  dataSource: any[]
  //传入数据唯一标识
  dataKey: string
  //传入要缓存的组件数量
  keeps: number
  //传入预估组件大小
  estimateSize: number
  //传入要渲染的组件
  dataComponent: VNodeChild
}
export type RangeOptions = {
  start: number
  end: number
  padFront: number
  padBehind: number
}

export type UpDataFuncType = (newRange: RangeOptions) => void

export const virtualItemProps = {
  index: {
    type: Number,
    required: true
  },
  uniqueKey: {
    type: String,
    default: (val) => String(val)
  },
  estimateSize: {
    type: Number,
    default: 50
  },
  source: {
    type: Object as () => any,
    required: true
  },
  component: {
    type: [Object, Function] as PropType<DefineComponent<{}, {}, any>>,
    required: true
  }
} as const

export type VirtualItemProps = ExtractPropTypes<typeof virtualItemProps>

export interface ScrollTo {
  (x: number, y: number): void
  (options: {
    left?: number
    top?: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    index: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    key: string | number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    position: 'top' | 'bottom'
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
}

export type ScrollToOptions = {
  x?: number
  y?: number
  key?: string | number
  index?: number
  position?: 'top' | 'bottom'
  left?: number
  top?: number
  behavior?: ScrollBehavior
  debounce?: boolean
}
