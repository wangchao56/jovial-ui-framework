import type { Slot } from 'vue'

export const jvEmptyProps = {
  /** 图片 */
  image: {
    type: String,
    default: '',
  },
  /** 图片大小 */
  imageSize: {
    type: Number,
    default: 100,
  },
  /** 描述文字 */
  description: {
    type: String,
    default: '暂无数据',
  },
} as const

export type JvEmptyProps = ExtractPropTypes<typeof jvEmptyProps>

export interface JvEmptyEmits {
  // 暂无事件
}

export interface JvEmptySlots {
  /** 图片区域的插槽 */
  image?: Slot
  /** 描述文字区域的插槽 */
  description?: Slot
  /** 空状态内容的插槽 */
  default?: Slot
  /** 底部内容的插槽 */
  footer?: Slot
}

export interface JvEmptyExpose {
  // 暂无需要暴露的方法
}
