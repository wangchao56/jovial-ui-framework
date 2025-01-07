import type { ExtractPropTypes, PropType } from 'vue'

import type { Size } from '@jovial/typings'

export const iconProps = {
  /**图标大小 */
  size: {
    type: [String, Number] as PropType<Size | string | number>,
    default: '1em'
  },
  /**图标颜色 */
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

export type IconProps = {
  /**图标大小 */
  size?: Size | string | number
  /**图标颜色 */
  color?: string
}
