import type { IconifyIcon } from '@iconify/vue'
import type { Size } from '@jovial/typings'

import type { PropType } from 'vue'

export const iconProps = {
  /** 图标大小 */
  size: {
    type: [String, Number] as PropType<Size | string | number>,
    default: '1em',
  },
  /** 图标颜色 */
  color: {
    type: String,
    default: 'currentColor',
  },
  name: {
    type: String,
  },
  fill: {
    type: String,
  },
} as const

export const iconSlots = {
  default: {
    type: String,
  },
}

export interface IconProps {
  /** 图标大小 */
  size?: Size | string | number
  /** 图标颜色 */
  color?: string
  /** 图标名称 */
  name?: string | keyof IconifyIcon
  /** 图标填充 */
  fill?: string
}
