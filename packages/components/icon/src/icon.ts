import { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  size: {
    type: [String, Number] as PropType<string | number>,
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
