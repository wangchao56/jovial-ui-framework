export const jvEmptyProps = {
  image: {
    type: String,
    default: '',
  },
  imageSize: {
    type: Number,
    default: 100,
  },
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
  // 图片区域的插槽
  image?: () => any
  // 描述文字区域的插槽
  description?: () => any
  // 底部内容的插槽
  default?: () => any
}

export interface JvEmptyExpose {
  // 暂无需要暴露的方法
}
