import { ExtractPropTypes } from 'vue'
export const checkboxProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  indeterminate: {
    type: Boolean,
    default: false
  }
} as const

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean'
} as const

export type CheckBoxEmitsType = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
export type CheckBoxPropsType = ExtractPropTypes<typeof checkboxProps>
