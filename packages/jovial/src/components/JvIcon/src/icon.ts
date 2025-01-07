import type { ExtractPropTypes, PropType } from 'vue'

import type { Size } from '@components/JvButton'

export const iconProps = {
  size: {
    type: [String, Number] as PropType<Size | string | number>,
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
