import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

export interface ListItem {
  /** 唯一标识 */
  key: string
  /** 类型 */
  type: 'item' | 'divider'
  /** 图标 */
  icon?: string | VNodeChild
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 描述 */
  description?: string
  /** 禁用 */
  disabled?: boolean
  /** 选中 */
  selected?: boolean
  /** 激活 */
  active?: boolean
  /** 子list */
  children?: ListItem[]
}

export const jvListItemProps = {

  item: {
    type: Object as PropType<ListItem>,
    default: () => ({}),
  },

  tag: {
    type: String,
    default: 'li',
  },
  /** 激活状态下的背景色 */
  activeColor: String,
  /** 非激活状态下的背景色 */
  inactiveColor: String,
  // /** 拖拽 */
  // draggable: Boolean,
  // dragging: Boolean,
  // dragged: Boolean,
  // dragover: Boolean,
  // dragenter: Boolean,
  // dragleave: Boolean,
  // dragstart: Function,
  // dragend: Function,
  // dragoverFn: Function,
  // dragenterFn: Function,
  // dragleaveFn: Function,
  // dragstartFn: Function,
  // dragendFn: Function,
} as const
export type JvListItemProps = ExtractPropTypes<typeof jvListItemProps>
export const jvListItemEmits = {
  click: (val: ListItem) => val,
} as const
export interface JvListItemEmits {}
export interface JvListItemSlots {
  default?: (props: JvListItemProps) => any
  title?: (props: JvListItemProps) => any
  description?: (props: JvListItemProps) => any
  icon?: (props: JvListItemProps) => any
  actions?: (props: JvListItemProps) => any
}
export interface JvListItemExpose {}
