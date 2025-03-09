import { withInstall } from '@jienix/utils'
import _JvApp from './src/JvApp.vue'
import './style'

const JvApp = withInstall(_JvApp)

export default JvApp
export type JvJvAppInstance = InstanceType<typeof JvApp>
declare module 'vue' {
  export interface GlobalComponents {
    JvApp: typeof JvApp
  }
}
