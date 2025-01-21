import type { VNodeChild } from 'vue'

/** 面包屑项配置 */
export interface BreadcrumbItem {
  /** 标识 */
  key: string
  /** 文本 */
  label: string
  /** 图标 */
  icon?: string
  /** 链接 */
  to?: string
  /** 是否禁用 */
  disabled?: boolean
}

export const jvBreadcrumbProps = {
  /** 面包屑项列表 */
  items: {
    type: Array as () => BreadcrumbItem[],
    default: () => [],
  },
  /** 分隔符 */
  separator: {
    type: String,
    default: '/',
  },
  /** 分隔符图标 */
  separatorIcon: {
    type: String,
    default: '',
  },
} as const

export interface JvBreadcrumbProps {
  /** 面包屑项列表 */
  items?: BreadcrumbItem[]
  /** 分隔符 */
  separator?: string
  /** 分隔符图标 */
  separatorIcon?: string
}

export interface JvBreadcrumbEmits {
  /** 点击面包屑项时触发 */
  (e: 'click', item: BreadcrumbItem): void
}

export interface JvBreadcrumbSlots {
  /** 自定义面包屑项内容 */
  item?: (props: { item: BreadcrumbItem }) => VNodeChild
  /** 自定义分隔符 */
  separator?: () => VNodeChild
}
