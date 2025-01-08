import { withInstall } from '@jovial/utils'
import _form from './src/form.vue'

const JvForm = withInstall(_form)

export * from './src/form'

export type FormInstance = InstanceType<typeof JvForm>
export default JvForm

declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof JvForm
  }
}
