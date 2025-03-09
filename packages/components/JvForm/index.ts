import { withInstall } from '@jienix/utils'
import _JvForm from './src/JvForm.vue'
import _JvFormItem from './src/JvFormItem.vue'

const JvForm = withInstall(_JvForm)
const JvFormItem = withInstall(_JvFormItem)

export * from './src/context'
export * from './src/types'

export type JvFormInstance = InstanceType<typeof JvForm>
export type JvFormItemInstance = InstanceType<typeof JvFormItem>
export { JvForm, JvFormItem }
declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof JvForm
    JvFormItem: typeof JvFormItem
  }
}
