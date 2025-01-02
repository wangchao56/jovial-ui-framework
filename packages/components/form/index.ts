import _form from './src/form.vue'
import _formItem from './src/form-item.setup'
import { withInstall } from '@jovial/utils'

const form = withInstall(_form)
const formItem = withInstall(_formItem)

export * from './src/form'
export * from './src/form-item'

export type FormInstance = InstanceType<typeof form>

export default {
  JvForm: form,
  JvFormItem: formItem
}

declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof form
    JvFormItem: typeof formItem
  }
}
