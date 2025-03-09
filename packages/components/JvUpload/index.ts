import { withInstall } from '@jienix/utils'
import _JvUpload from './src/JvUpload.vue'
import './style'

const JvUpload = withInstall(_JvUpload)

export * from './src/JvUpload'

export default JvUpload

declare module 'vue' {
  export interface GlobalComponents {
    JvUpload: typeof JvUpload
  }
}
