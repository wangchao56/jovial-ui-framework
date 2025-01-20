import { withInstall } from '@jovial/utils'
import _Tooltip from './src/JvTooltip.vue'
import './style/jv-tooltip.css'

const JvTooltip = withInstall(_Tooltip)

export * from './src/tooltip'
export default JvTooltip

declare module 'vue' {
  export interface GlobalComponents {
    JvTooltip: typeof JvTooltip
  }
}
