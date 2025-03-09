import type { Size } from '@jienix/typings'

import type { PropType } from 'vue'

export const jvIconProps = {
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
  /** 图标名称 */
  name: {
    type: String,
  },
} as const

export type JvIconProps = ExtractPropTypes<typeof jvIconProps>
