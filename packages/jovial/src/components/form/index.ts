import _form from './src/form.vue'
import _formItem from './src/form-item.setup'
import { withInstall } from '@jovial/utils'

const JvForm = withInstall(_form)
const JvFormItem = withInstall(_formItem)

export * from './src/form'
export * from './src/form-item'

export type FormInstance = InstanceType<typeof JvForm>
export type FormItemInstance = InstanceType<typeof JvFormItem>
export { JvForm, JvFormItem }

declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof JvForm
    JvFormItem: typeof JvFormItem
  }
}
