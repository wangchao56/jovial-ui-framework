import type { ExtractPropTypes } from 'vue'

export const jvCheckboxProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
} as const

export const jvCheckboxEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  'change': (value: boolean) => typeof value === 'boolean',
} as const

export interface JvCheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
export type JvCheckboxProps = ExtractPropTypes<typeof jvCheckboxProps>
