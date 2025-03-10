import { withInstall } from '@jienix/utils'
import _JvIcon from './src/JvIcon.vue'
import './style'

const JvIcon = withInstall(_JvIcon)

export * from './src/JvIcon'
export default JvIcon

declare module 'vue' {
  export interface GlobalComponents {
    JvIcon: typeof JvIcon
  }
}
