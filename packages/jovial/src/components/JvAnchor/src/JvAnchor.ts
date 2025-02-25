/**
 * 这个实现包含了以下功能：
支持固定定位和相对定位
2. 支持自定义偏移量配置
支持点击滚动到目标位置
支持滚动时自动高亮当前锚点
支持嵌套的锚点结构
支持自定义滚动容器
提供了必要的事件回调
 */
export const jvAnchorProps = {
  /** 固定模式 */
  affix: {
    type: Boolean,
    default: true,
  },
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /** 锚点滚动偏移量 */
  targetOffset: {
    type: Number,
    default: 0,
  },
  /** 指定滚动的容器 */
  container: {
    type: String,
    default: 'window',
  },
} as const

export interface JvAnchorProps {
  affix?: boolean
  offsetTop?: number
  targetOffset?: number
  container?: string
}

export interface JvAnchorEmits {
  /**
   * 更新当前激活的锚点
   */
  (e: 'update:activeKey', key: string): void
  /**
   * 点击锚点
   */
  (e: 'click', evt: MouseEvent, link: AnchorLinkItem): void
  /**
   * 改变当前激活的锚点
   */
  (e: 'change', currentActiveKey: string): void
}

export interface JvAnchorSlots {
  default?: () => any
}

export interface JvAnchorExpose {
  /** 滚动到指定锚点 */
  scrollTo: (key: string) => void
}

export interface AnchorLinkItem {
  key: string
  href: string
  title: string
  children?: AnchorLinkItem[]
}
