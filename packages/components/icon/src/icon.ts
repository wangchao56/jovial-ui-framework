import { ExtractPropTypes, PropType } from 'vue'

import { Size } from '../../button'

export const iconProps = {
  size: {
    type: [String, Number] as PropType<Size| string | number>,
    default: '1em'
  },
  color: {
    type: String,
    default: 'currentColor'
  }
} as const

export const iconSlots = {
  default: {
    type: String
  }
}

export type IconProps = ExtractPropTypes<typeof iconProps>
