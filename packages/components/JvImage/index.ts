import { withInstall } from '@jienix/utils'
/**
 * icon 组件的设计规范
 */
import _JvImage from './src/JvImage.vue'

const JvImage = withInstall(_JvImage)

export * from './src/JvImage'
export default JvImage

declare module 'vue' {
  export interface GlobalComponents {
    JvImage: typeof JvImage
  }
}
