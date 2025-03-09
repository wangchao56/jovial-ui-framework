import type { VNodeChild } from 'vue'
/**
这个面包屑组件实现了以下功能：
支持基本的面包屑导航
支持图标
支持链接跳转
支持禁用状态
支持自定义分隔符
支持自定义内容
完整的类型定义和文档
 */
/** 面包屑项配置 */
export interface JvBreadcrumbItem {
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
    type: Array as PropType<JvBreadcrumbItem[]>,
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

export interface JvBreadcrumbProps extends ExtractPropTypes<typeof jvBreadcrumbProps> {}

export interface JvBreadcrumbEmits {
  /** 点击面包屑项时触发 */
  (e: 'click', item: JvBreadcrumbItem): void
}

export interface JvBreadcrumbSlots {
  /** 自定义面包屑项内容 */
  item?: (props: { item: JvBreadcrumbItem }) => VNodeChild
  /** 自定义分隔符 */
  separator?: () => VNodeChild
}
