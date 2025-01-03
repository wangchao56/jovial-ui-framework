import _Alert from './src/alert.vue'
import { withInstall } from '@jovial/utils'

const alert = withInstall(_Alert)

export * from './src/alert'
export default alert

declare module 'vue' {
  export interface GlobalComponents {
    JvAlert: typeof alert
  }
}
