import { withInstall } from '@jovial/utils'
import _formItem from './form-item.setup'

const JvFormItem = withInstall(_formItem)

export * from './form-item'

export type FormItemInstance = InstanceType<typeof JvFormItem>
export default JvFormItem

declare module 'vue' {
  export interface GlobalComponents {
    JvFormItem: typeof JvFormItem
  }
}
