import { withInstall } from '@jovial/utils'
import _JvTag from './src/JvTag.vue'
import './style'

const JvTag = withInstall(_JvTag)

export * from './src/JvTag'
export default JvTag
export type JvJvTagInstance = InstanceType<typeof JvTag>
export type {
  JvTagEmits,
  JvTagExpose,
  JvTagProps,
  JvTagSlots,
} from './src/JvTag'
declare module 'vue' {
  export interface GlobalComponents {
    JvTag: typeof JvTag
  }
}
