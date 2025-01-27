export interface JvSplitProps {
  direction: 'horizontal' | 'vertical'
  triggerSize: number
  disabled: boolean
  defaultSize: string | number
  size?: string | number
  min: string | number
  max: string | number
  pane1Class?: string
  pane1Style?: string | Record<string, any>
  pane2Class?: string
  pane2Style?: string | Record<string, any>
}

export interface JvSplitEmits {
  (e: 'update:size', size: string | number): void
  (e: 'dragStart', e: MouseEvent): void
  (e: 'dragMove', e: MouseEvent): void
  (e: 'dragEnd', e: MouseEvent): void
}

export interface JvSplitSlots {
  'default'?: () => any
  'pane-1'?: () => any
  'pane-2'?: () => any
  'trigger'?: () => any
}

export interface JvSplitExpose {
  // 暴露的方法
}
