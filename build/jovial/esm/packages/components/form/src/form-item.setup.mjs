import AsyncValideter from 'async-validator'
import { computed, defineComponent, inject, onMounted, provide, reactive, ref, toRefs, unref } from 'vue'
import { l as lodashExports } from '../../../../_virtual/lodash.mjs'
import { isEmpty, isString } from '../../../utils/common.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { formItemExpose, formItemProps, formItemProviderKey, VALIDATE_STATE } from './form-item.mjs'
import { converArray, formProviderKey } from './form.mjs'

const _formItem = defineComponent({
  name: 'JvFormItem',
  props: formItemProps,
  expose: formItemExpose,
  setup(props, { slots, expose }) {
    const bem = createNamespace('form-item')
    const validateStateRef = ref('')
    const validateMessageRef = ref('\u6821\u9A8C\u5931\u8D25')
    const formContext = inject(formProviderKey)
    const _rules = computed(() => {
      const tempRules = converArray(props.rules)
      const formRules = formContext == null ? undefined : formContext.rules
      if (formRules && props.prop) {
        if (isString(props.prop)) {
          tempRules.push(...converArray(formRules[props.prop]))
        }
        else if (Array.isArray(props.prop)) {
          const _formRules = lodashExports.get(formRules, props.prop.join('.'))
          if (!isEmpty(_formRules)) {
            tempRules.push(...converArray(_formRules))
          }
        }
      }
      return tempRules
    })
    const getRuleFiltered = (trigger) => {
      console.log('\u7528\u6237\u4F20\u5165\u7684\u6821\u9A8C\u89C4\u5219\u4E3A\uFF1A', _rules.value)
      return unref(_rules).filter((rule) => {
        if (!rule.trigger || !trigger)
          return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        }
        else {
          return rule.trigger === trigger
        }
      })
    }
    const onVlidationOnSuccessed = () => {
      validateStateRef.value = VALIDATE_STATE.SUCCESS
      console.log('formItem\u6821\u9A8C\u6210\u529F')
    }
    const onVlidationOnFailed = (errors) => {
      console.log('formItem\u6821\u9A8C\u5931\u8D25', errors)
      validateStateRef.value = VALIDATE_STATE.ERROR
      const errorMessage = errors ? errors[0].message : ''
      validateMessageRef.value = errorMessage
    }
    const validate = async (trigger, callback) => {
      console.log('\u89E6\u53D1\u5668', trigger)
      const rules = getRuleFiltered(trigger)
      console.log('\u8FC7\u6EE4\u540E\u6821\u9A8C\u89C4\u5219', rules)
      if (rules.length === 0) {
        callback == null ? undefined : callback(true)
        onVlidationOnSuccessed()
        return Promise.resolve(true)
      }
      const modelName = Array.isArray(props.prop) ? props.prop.join('.') : props.prop
      console.log('\u6821\u9A8C\u7684\u5C5E\u6027', modelName)
      const fieldValue = lodashExports.get(formContext == null ? undefined : formContext.model, modelName)
      console.log('\u6821\u9A8C\u7684\u503C', fieldValue)
      const validator = new AsyncValideter({
        [modelName]: rules,
      })
      return validator.validate({
        [modelName]: fieldValue,
      }).then(() => {
        callback == null ? undefined : callback(true)
        onVlidationOnSuccessed()
      }).catch(
        ({
          errors,
          fields,
        }) => {
          callback == null ? undefined : callback(false, fields)
          onVlidationOnFailed(errors)
          return Promise.reject(fields)
        },
      )
    }
    const context = reactive({
      ...toRefs(props),
      validate,
    })
    provide(formItemProviderKey, context)
    onMounted(() => {
      formContext == null ? undefined : formContext.addField(context)
    })
    return () => {
      let _a, _b
      const { label, required, error, labelPosition } = props
      const validateState = validateStateRef.value
      const validateMessage = validateMessageRef.value
      return /* @__PURE__ */ React.createElement('div', { class: [bem.b()] }, label && /* @__PURE__ */ React.createElement('label', { class: [bem.e('label'), bem.em('label', labelPosition)] }, label), /* @__PURE__ */ React.createElement('div', { class: bem.e('content') }, (_a = slots.default) == null ? undefined : _a.call(slots)), validateState === VALIDATE_STATE.ERROR && /* @__PURE__ */ React.createElement('div', { class: bem.e('error') }, ((_b = slots.error) == null ? undefined : _b.call(slots)) || error || validateMessage))
    }
  },
})

export { _formItem as default }
// # sourceMappingURL=form-item.setup.mjs.map
