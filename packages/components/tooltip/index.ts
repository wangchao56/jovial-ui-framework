import _Tooltip from './src/tooltip.vue'
import { withInstall } from '@jovial/utils'

const tooltip = withInstall(_Tooltip)

export * from './src/tooltip'
export default tooltip

declare module 'vue' {
  export interface GlobalComponents {
    JvTooltip: typeof tooltip
  }
}
