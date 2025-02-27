import { withInstall } from '@jovial/utils'
/**
 * icon 组件的设计规范
 */
import _JvIcon from './src/JvIcon.vue'

const JvIcon = withInstall(_JvIcon)

export * from './src/icon'
export default JvIcon

declare module 'vue' {
  export interface GlobalComponents {
    JvIcon: typeof JvIcon
  }
}
