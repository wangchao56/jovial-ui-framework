import { withInstall } from '@jienix/utils'
import _JvNotification from './src/JvNotification.vue'
import './style'

const JvNotification = withInstall(_JvNotification)

export * from './src/JvNotification'
export default JvNotification
export type JvJvNotificationInstance = InstanceType<typeof JvNotification>
export type {
  JvNotificationEmits,
  JvNotificationExpose,
  JvNotificationProps,
  JvNotificationSlots,
} from './src/JvNotification'
declare module 'vue' {
  export interface GlobalComponents {
    JvNotification: typeof JvNotification
  }
}
