import { withInstall } from '@jovial/utils'
import _JvSteps from './src/JvSteps.vue'
import './style/style.css'

const JvSteps = withInstall(_JvSteps)

export * from './src/JvSteps'

export default JvSteps

declare module 'vue' {
  export interface GlobalComponents {
    JvSteps: typeof JvSteps
  }
}
