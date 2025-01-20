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
} as const
export interface JvSwitchProps {

  modelValue: boolean
  disabled?: boolean
  size?: 'small' | 'default' | 'large'

};
export const jvSwitchEmits = {
  'update:modelValue': (value: boolean) => value,
  'change': (value: boolean) => value,
} as const
export interface JvSwitchEmits {}
export const jvSwitchSlots = {} as const
export interface JvSwitchSlots {}
export interface JvSwitchExpose {}
