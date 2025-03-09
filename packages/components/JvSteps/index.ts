import { withInstall } from '@jienix/utils'
import _JvSteps from './src/JvSteps.vue'
import './style'

const JvSteps = withInstall(_JvSteps)

export * from './src/JvSteps'

export default JvSteps

declare module 'vue' {
  export interface GlobalComponents {
    JvSteps: typeof JvSteps
  }
}
