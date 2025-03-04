import { withInstall } from '@jienix/utils'
import _JvMessage from './src/JvMessage.vue'
import './style'

const JvMessage = withInstall(_JvMessage)

export * from './src/JvMessage'
export type {
  JvMessageEmits,
  JvMessageExpose,
  JvMessageProps,
  JvMessageSlots,
} from './src/JvMessage'
export default JvMessage
export type JvJvMessageInstance = InstanceType<typeof JvMessage>
export * from './src/method'
declare module 'vue' {
  export interface GlobalComponents {
    JvMessage: typeof JvMessage
  }
}
