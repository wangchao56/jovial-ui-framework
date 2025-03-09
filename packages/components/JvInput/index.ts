import { withInstall } from '@jienix/utils'
import _JvInput from './src/JvInput.vue'
import './style'

const JvInput = withInstall(_JvInput)

export * from './src/JvInput'

export default JvInput

declare module 'vue' {
  export interface GlobalComponents {
    JvInput: typeof JvInput
  }
}
