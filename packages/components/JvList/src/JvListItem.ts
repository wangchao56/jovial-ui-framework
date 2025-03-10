import type { Slot } from 'vue'
import type { EmitOptions, JvListItemActionProps, JvListItemPrependProps, ListGroupType, ListItem, RoundedType } from './types'

// Props 类型定义
export const jvListItemProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 副标题 */
  subtitle: {
    type: String,
    default: '',
  },
  /** 描述文本 */
  description: {
    type: String,
    default: '',
  },
  /** 根元素类名 */
  class: String,
  /** 激活状态 */
  active: {
    type: Boolean,
    default: false,
  },
  /** 激活状态下的背景色 */
  activeColor: String,
  /** 非激活状态下的背景色 */
  inactiveColor: String,
  /** 是否可悬浮 */
  hoverable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示分割线 */
  showDivider: {
    type: Boolean,
    default: false,
  },
  /** 是否为链接 */
  link: {
    type: Boolean,
    default: false,
  },
  /** 链接地址 */
  href: String,
  /** 前置头像 */
  prependAvatar: String,
  /** 前置图标 */
  prependIcon: String,
  /** 前置图片 */
  prependImage: String,
  /** 动作图标 */
  actionIcon: String,
  /** 圆角设置 */
  rounded: {
    type: [Boolean, String, Number] as PropType<RoundedType>,
    default: false,
    validator: (value: boolean | string | number) => {
      if (typeof value === 'boolean')
        return true
      if (typeof value === 'string') {
        return [
          'rounded',
          'rounded-sm',
          'rounded-lg',
          'rounded-xl',
          'rounded-pill',
          'rounded-circle',
          'rounded-shaped',
        ].includes(value)
      }
      if (typeof value === 'number') {
        return value >= 0
      }
      return false
    },
  },
  /** 是否有子节点 */
  hasChildren: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否选中 */
  selected: {
    type: Boolean,
    default: false,
  },
  /** 是否可点击 */
  clickable: {
    type: Boolean,
    default: false,
  },
  /** 是否可以展开 */
  expandable: {
    type: Boolean,
    default: false,
  },
  /** 是否展开 */
  expanded: {
    type: Boolean,
    default: false,
  },
  /** 元数据 */
  metaRaw: {
    type: Object as PropType<ListItem | ListGroupType>,
    default: () => ({}),
  },
} as const

// Props 类型
export type JvListItemProps = ExtractPropTypes<typeof jvListItemProps>
// Emits 定义
export const jvListItemEmits = {
  'click': (e: MouseEvent | KeyboardEvent, options: EmitOptions) => e && options,
  'select': (options: EmitOptions) => options,
  'expand': (options: EmitOptions) => options,
  'update:expanded': (value: boolean) => typeof value === 'boolean',
} as const

// Emits 类型
export interface JvListItemEmits {
  (e: 'click', event: MouseEvent | KeyboardEvent, options: EmitOptions): void
  (e: 'select', options: EmitOptions): void
  (e: 'expand', options: EmitOptions): void
  (e: 'update:expanded', value: boolean): void
}
// Slots 类型
export interface JvListItemSlots {
  /** 默认插槽 */
  default?: Slot
  /** 标题插槽 */
  title?: Slot<{ title: string }>
  /** 副标题插槽 */
  subtitle?: Slot<{ subtitle: string }>
  /** 描述文本插槽 */
  description?: Slot<{ description: string }>
  /** 前置插槽 */
  prepend?: Slot<{ prependProps: JvListItemPrependProps }>
  /** 动作插槽 */
  action?: Slot<{ actionProps: JvListItemActionProps }>
  /** 展开插槽 */
  // expand?: Slot<{ expandProps: JvListItemExpandProps }>
  /** 内容插槽 */
  content?: Slot<{ record: ListItem }>
}

// 组件暴露的方法
export interface JvListItemExpose {
  /** 是否激活 */
  isActive: boolean | undefined
  /** 选择 */
  select: (selected: boolean, e: Event) => void
}
