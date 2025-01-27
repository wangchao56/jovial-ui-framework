import { withInstall } from '@jovial/utils'
import _JvApp from './JvApp.vue'

const JvApp = withInstall(_JvApp)

export default JvApp
export type JvJvAppInstance = InstanceType<typeof JvApp>
declare module 'vue' {
  export interface GlobalComponents {
    JvApp: typeof JvApp
  }
}
