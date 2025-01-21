import type { Slot } from 'vue'

export const jvCardProps = {
  /** 卡片标题 */
  title: {
    type: String,
    default: '',
  },
  /** 卡片副标题 */
  subtitle: {
    type: String,
    default: '',
  },
  /** 是否显示阴影 */
  shadow: {
    type: String as () => 'always' | 'hover' | 'never',
    default: 'always',
  },
  /** 卡片边框 */
  border: {
    type: Boolean,
    default: true,
  },
  /** 卡片圆角 */
  round: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvCardProps {
  title?: string
  subtitle?: string
  shadow?: 'always' | 'hover' | 'never'
  border?: boolean
  round?: boolean
}

export const jvCardEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
} as const

export interface JvCardEmits {
  click: (evt: MouseEvent) => void
}

export const jvCardSlots = {
  /** 卡片头部内容 */
  header: {},
  /** 卡片标题内容 */
  title: {},
  /** 卡片封面 */
  cover: {},
  /** 卡片主体内容 */
  default: {},
  /** 卡片底部内容 */
  footer: {},
  /** 卡片操作按钮区域 */
  actions: {},
} as const

export interface JvCardSlots {
  header?: Slot
  title?: Slot
  cover?: Slot
  default?: Slot
  footer?: Slot
  actions?: Slot
}

export interface JvCardExpose {}
