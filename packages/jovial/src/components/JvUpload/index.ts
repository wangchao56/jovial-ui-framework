import { withInstall } from '@jovial/utils'
import _upload from './src/upload.vue'

const upload = withInstall(_upload)

export * from './src/upload'

export default upload

declare module 'vue' {
  export interface GlobalComponents {
    JvUpload: typeof upload
  }
}
