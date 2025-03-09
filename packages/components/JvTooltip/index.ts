import { withInstall } from '@jienix/utils'
import _Tooltip from './src/JvTooltip.vue'
import './style'

const JvTooltip = withInstall(_Tooltip)

export * from './src/tooltip'
export default JvTooltip

declare module 'vue' {
  export interface GlobalComponents {
    JvTooltip: typeof JvTooltip
  }
}
