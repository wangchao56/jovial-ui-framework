import { withInstall } from '@jovial/utils'
import _formItem from './src/form-item.setup'
import _form from './src/form.vue'

const JvFormItem = withInstall(_formItem)
const JvForm = withInstall(_form)

export * from './src/form'
export * from './src/form-item'

export type JvFormInstance = InstanceType<typeof JvForm>
export type JvFormItemInstance = InstanceType<typeof JvFormItem>
export {
  JvForm,
  JvFormItem,
}
declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof JvForm
    JvFormItem: typeof JvFormItem
  }
}
