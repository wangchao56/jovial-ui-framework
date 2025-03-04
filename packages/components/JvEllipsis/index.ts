import { withInstall } from '@jienix/utils'
import _JvEllipsis from './src/JvEllipsis.vue'
import './style'

const JvEllipsis = withInstall(_JvEllipsis)

export * from './src/JvEllipsis'
export default JvEllipsis
export type JvEllipsisInstance = InstanceType<typeof JvEllipsis>
declare module 'vue' {
  export interface GlobalComponents {
    JvEllipsis: typeof JvEllipsis
  }
}
