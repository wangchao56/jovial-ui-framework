import { withInstall } from '@jienix/utils'
import _JvAvatar from './src/JvAvatar.vue'
import './style'

const JvAvatar = withInstall(_JvAvatar)

export * from './src/JvAvatar'
export default JvAvatar
export type JvJvAvatarInstance = InstanceType<typeof JvAvatar>
export type {
  JvAvatarEmits,
  JvAvatarExpose,
  JvAvatarProps,
  JvAvatarSlots,
} from './src/JvAvatar'
declare module 'vue' {
  export interface GlobalComponents {
    JvAvatar: typeof JvAvatar
  }
}
