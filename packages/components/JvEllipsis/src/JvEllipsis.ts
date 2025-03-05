import type { TooltipProps } from '@components/JvTooltip'
import type { Slot, VNode } from 'vue'

export const jvEllipsisProps = {
  rows: {
    type: Number,
    default: 1,
  },
  expandable: {
    type: [Boolean, String],
    default: false,
  },
  suffix: {
    type: String,
    default: '',
  },
  symbol: {
    type: Function,
    default: undefined,
  },
  tooltip: {
    type: Object,
    default: undefined,
  },
  defaultExpanded: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvEllipsisProps {
  /** 最大行数 */
  rows: number
  /** 省略后缀 */
  suffix?: string
  /** 提示配置 */
  tooltip?: boolean | TooltipProps
  /** 宽度 */
  width?: string | number
  /** 文本 */
  text?: string
}

export interface JvEllipsisEmits {
  // 事件定义
  (e: 'expand', event: MouseEvent, info: { expanded: boolean }): void
  (e: 'ellipsis', ellipsis: boolean): void
}

export interface JvEllipsisSlots {
  // 插槽定义
  default?: Slot
}

export interface JvEllipsisExpose {
  // 暴露的方法和属性
}

export interface EllipsisProps {
  /** 最大行数 */
  rows?: number
  /** 是否可展开（双向折叠） */
  expandable?: boolean | 'collapsible'
  /** 展开状态（受控模式） */
  expanded?: boolean
  /** 默认展开状态 */
  defaultExpanded?: boolean
  /** 省略后缀 */
  suffix?: string
  /** 提示配置 */
  tooltip?: boolean | TooltipProps
  /** 展开符号 */
  expandSymbol?: string | VNode
  /** 折叠符号 */
  collapseSymbol?: string | VNode
  /** 是否显示测量标记 */
  showMark?: boolean
}

export interface EllipsisEmits {
  (e: 'update:expanded', value: boolean): void
  (e: 'expandChange', expanded: boolean): void
  (e: 'ellipsisChange', ellipsised: boolean): void
}

export interface EllipsisSlots {
  default?: () => VNode
  symbol?: (params: { expanded: boolean }) => VNode
  tooltip?: (params: { ellipsised: boolean }) => VNode
}
/**
 * 获取文本渲染宽度（像素级精确）
 * @param text 需要测量的文本
 * @param element 参考元素（用于获取字体样式）
 * @returns 文本渲染宽度（单位：px）
 */
export function getTextWidth(text: string, element: HTMLElement): number {
  // 创建临时 Canvas
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  // 获取目标元素的所有字体样式
  const computedStyle = window.getComputedStyle(element)
  const fontStyles = [
    computedStyle.fontWeight,
    computedStyle.fontStyle,
    computedStyle.fontSize,
    computedStyle.fontFamily,
  ].join(' ')

  // 设置 Canvas 字体（必须与目标元素完全一致）
  context.font = fontStyles

  // 测量文本（考虑多字节字符和连字）
  const metrics = context.measureText(text)

  // 计算精确宽度（考虑某些字体的溢出绘制）
  return Math.ceil(
    Math.abs(metrics.actualBoundingBoxLeft)
    + Math.abs(metrics.actualBoundingBoxRight),
  )
}
