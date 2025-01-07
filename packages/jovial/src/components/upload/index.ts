import _upload from './src/upload.vue'
import { withInstall } from '@jovial/utils'

const upload = withInstall(_upload)

export * from './src/upload'

export default upload

declare module 'vue' {
  export interface GlobalComponents {
    JvUpload: typeof upload
  }
}
