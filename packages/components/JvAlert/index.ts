import { withInstall } from '@jienix/utils'
import _JvAlert from './src/JvAlert.vue'
import './style'

const JvAlert = withInstall(_JvAlert)

export * from './src/JvAlert'
export default JvAlert
export type JvJvAlertInstance = InstanceType<typeof JvAlert>
export type {
  JvAlertEmits,
  JvAlertExpose,
  JvAlertProps,
  JvAlertSlots,
} from './src/JvAlert'
declare module 'vue' {
  export interface GlobalComponents {
    JvAlert: typeof JvAlert
  }
}
