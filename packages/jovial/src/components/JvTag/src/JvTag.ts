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
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  round?: boolean
}

export const jvTagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
} as const

export interface JvTagEmits {
  close: (evt: MouseEvent) => void
}

export const jvTagSlots = {} as const
export interface JvTagSlots {
  default?: () => any
}

export interface JvTagExpose {
  // 暴露的方法和属性
}
