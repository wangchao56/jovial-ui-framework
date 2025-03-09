export const jvSwitchProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 大小
   */
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  /**
   * 是否显示loading
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否手动控制loading
   */
  manual: {
    type: Boolean,
    default: false,
  },
} as const
export type JvSwitchProps = Partial<ExtractPropTypes<typeof jvSwitchProps>>
export interface JvSwitchEmits {
  /**
   * 更新绑定值
   */
  (e: 'update:modelValue', value: boolean): boolean
  /**
   * 改变时触发
   */
  (e: 'change', value: boolean): boolean
  /**
   * 点击时触发
   */
  (e: 'click', event: MouseEvent): void
}
export interface JvSwitchSlots {}
export interface JvSwitchExpose {}
