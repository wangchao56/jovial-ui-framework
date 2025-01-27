export const jvSwitchProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  loading: {
    type: Boolean,
    default: false,
  },
} as const
export interface JvSwitchProps {

  modelValue: boolean
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  loading?: boolean
  /**
   * 是否手动控制loading
   * @default false
   */
  manual?: boolean

};
export interface JvSwitchEmits {
  (e: 'update:modelValue', value: boolean): boolean
  (e: 'change', value: boolean): boolean
  (e: 'click', event: MouseEvent): void
}
export interface JvSwitchSlots {}
export interface JvSwitchExpose {}
