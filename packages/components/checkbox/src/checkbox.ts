import { ExtractPropTypes } from 'vue'
export const checkboxProps = {
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  }
} as const

export type CheckBoxPropsType = ExtractPropTypes<typeof checkboxProps>
