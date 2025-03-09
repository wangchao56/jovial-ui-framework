import { withInstall } from '@jienix/utils'
import _JvCheckbox from './src/JvCheckbox.vue'
import './style'

const JvCheckbox = withInstall(_JvCheckbox)

export * from './src/JvCheckbox'

export default JvCheckbox

declare module 'vue' {
  export interface GlobalComponents {
    JvCheckbox: typeof JvCheckbox
  }
}
