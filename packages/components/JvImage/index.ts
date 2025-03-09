import { withInstall } from '@jienix/utils'
import _JvImage from './src/JvImage.vue'
import './style'

const JvImage = withInstall(_JvImage)

export * from './src/JvImage'
export default JvImage

declare module 'vue' {
  export interface GlobalComponents {
    JvImage: typeof JvImage
  }
}
