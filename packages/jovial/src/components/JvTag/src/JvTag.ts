export const jvTagProps = {
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'primary',
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvTagProps {
  /**
   * @description 类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * @description 尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * @description 是否可关闭
   */
  closable?: boolean
  /**
   * @description 是否圆角
   */
  round?: boolean
}

export interface JvTagEmits {
  (event: 'close', evt: MouseEvent): void
}

export const jvTagSlots = {} as const
export interface JvTagSlots {
  default?: () => any
}

export interface JvTagExpose {
  // 暴露的方法和属性
}
