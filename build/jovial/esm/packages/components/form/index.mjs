import { withInstall } from '../../utils/with-install.mjs'
import _formItem from './src/form-item.setup.mjs'
import _sfc_main from './src/form.vue2.mjs'

export { formItemEmits, formItemExpose, formItemProps, formItemProviderKey, formItemSlots, VALIDATE_STATE } from './src/form-item.mjs'
export { converArray, formEmits, formProps, formProviderKey, formSlots } from './src/form.mjs'

const JvForm = withInstall(_sfc_main)
const JvFormItem = withInstall(_formItem)

export { JvForm, JvFormItem }
// # sourceMappingURL=index.mjs.map
