import { withInstall } from '@jovial/utils'
import _upload from './src/JvUpload.vue'

const upload = withInstall(_upload)

export * from './src/JvUpload'

export default upload

declare module 'vue' {
  export interface GlobalComponents {
    JvUpload: typeof upload
  }
}
