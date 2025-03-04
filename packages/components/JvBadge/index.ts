import { withInstall } from '@jienix/utils'
import _JvBadge from './src/JvBadge.vue'

const JvBadge = withInstall(_JvBadge)

export * from './src/JvBadge'
export default JvBadge
export type JvJvBadgeInstance = InstanceType<typeof JvBadge>
export type {
  JvBadgeEmits,
  JvBadgeExpose,
  JvBadgeProps,
  JvBadgeSlots,
} from './src/JvBadge'
declare module 'vue' {
  export interface GlobalComponents {
    JvBadge: typeof JvBadge
  }
}
