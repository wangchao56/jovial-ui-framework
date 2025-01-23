import type {
  ValidateError,
  ValidateFieldsError,
  Values,
} from 'async-validator'
import type { ComputedRef } from 'vue'
import type {
  FormItemContext,
  FormItemRule,
  FormValidateCallback,
  TiggerType,
  ValidateStatusType,
} from './form-item'
import {
  createNamespace,
  isEmpty,
  isString,
} from '@jovial/utils'
import AsyncValideter from 'async-validator'
import { get } from 'lodash'
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  unref,
} from 'vue'
import { converArray, formProviderKey } from './form'
import {
  formItemExpose,
  formItemProps,
  formItemProviderKey,
  VALIDATE_STATE,
} from './form-item'

export default defineComponent({
  name: 'JvFormItem',
  props: formItemProps,
  expose: formItemExpose,
  setup(props, { slots }) {
    const bem = createNamespace('form-item')
    const validateStateRef = ref<ValidateStatusType>('')
    const validateMessageRef = ref('校验失败')
    const formContext = inject(formProviderKey)
    /**
     * 计算属性，用于动态生成表单项的校验规则。
     * 它根据传入的 props.rules 和 formContext?.rules 合并生成最终的校验规则数组。
     */
    const _rules: ComputedRef<FormItemRule[]> = computed(() => {
      const tempRules: FormItemRule[] = converArray(props.rules) // 将 props.rules 转换为 FormItemRule 数组
      const formRules = formContext?.rules // 从 formContext 中获取规则

      if (formRules && props.prop) {
        // 根据 props.prop 的类型（字符串或数组），从 formRules 中获取对应的规则并合并到 tempRules 中
        if (isString(props.prop)) {
          tempRules.push(...converArray(formRules[props.prop as string]))
        }
        else if (Array.isArray(props.prop)) {
          const _formRules = get(formRules, props.prop.join('.')) // 使用 lodash 的 get 方法获取深层嵌套属性
          if (!isEmpty(_formRules)) {
            // 如果获取到的规则不为空
            tempRules.push(...converArray(_formRules))
          }
        }
      }
      return tempRules // 返回合并后的校验规则数组
    })

    /**
     * 根据触发器类型过滤校验规则。
     * @param trigger 触发器类型
     * @returns 过滤后的校验规则数组
     */
    const getRuleFiltered = (trigger: TiggerType) => {
      // console.log('用户传入的校验规则为：', _rules.value) // 输出当前计算属性的值

      return unref(_rules).filter((rule: FormItemRule) => {
        // 如果没有规则中的触发器或没有传入触发器，则保留该规则
        if (!rule.trigger || !trigger)
          return true
        // 如果规则中的触发器是数组，则检查是否包含传入的触发器
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        }
        else {
          // 如果规则中的触发器不是数组，则直接比较是否相等
          return rule.trigger === trigger
        }
      })
    }

    /**
     * 表单项校验成功时的回调函数。
     */
    const onVlidationOnSuccessed = () => {
      validateStateRef.value = VALIDATE_STATE.SUCCESS // 更新校验状态为成功
    }

    /**
     * 表单项校验失败时的回调函数。
     * @param errors 校验失败时的错误信息
     */
    const onVlidationOnFailed = (errors: any) => {
      validateStateRef.value = VALIDATE_STATE.ERROR // 更新校验状态为错误
      const errorMessage = errors ? errors[0].message : '' // 获取第一条错误信息
      validateMessageRef.value = errorMessage // 更新错误信息
    }

    /**
     * 表单项的校验函数。
     * @param trigger 触发器类型
     * @param callback 校验完成后的回调函数
     * @returns Promise 对象，表示校验过程
     */
    const validate: FormItemContext['validate'] = async (
      trigger: TiggerType,
      callback?: FormValidateCallback | undefined,
    ) => {
      // console.log('触发器', trigger)

      // 根据触发器过滤校验规则
      const rules = getRuleFiltered(trigger)
      // console.log('过滤后校验规则', rules)

      if (rules.length === 0) {
        // 如果没有校验规则，则直接调用回调并返回成功的 Promise
        callback?.(true)
        onVlidationOnSuccessed()
        return Promise.resolve(true)
      }

      // 获取要校验的属性名
      const modelName
        = Array.isArray(props.prop) ? props.prop.join('.') : props.prop

      // 从数据源中获取要校验的属性值
      const fieldValue = get(formContext?.model, modelName)

      // 创建校验器实例
      const validator = new AsyncValideter({
        [modelName]: rules,
      })

      // 执行校验
      return validator
        .validate({
          [modelName]: fieldValue,
        })
        .then(() => {
          // 校验成功时调用回调并更新状态
          callback?.(true)
          onVlidationOnSuccessed()
        })
        .catch(
          ({
            errors,
            fields,
          }: {
            errors: ValidateError[] | undefined
            fields: ValidateFieldsError | Values
          }) => {
            // 校验失败时调用回调并更新状态
            callback?.(false, fields)
            onVlidationOnFailed(errors)
            return Promise.reject(fields)
          },
        )
    }

    // 重置表单项
    const resetField = () => {
      validateStateRef.value = ''
      validateMessageRef.value = ''
    }

    // 跨组件通信
    const context: FormItemContext = reactive({
      ...toRefs(props),
      validate,
      resetField,
    })

    provide(formItemProviderKey, context)

    onMounted(() => {
      formContext?.addField(context)
    })
    // 校验表单项
    return () => {
      const { label, error, labelPosition } = props
      const validateState = validateStateRef.value
      const validateMessage = validateMessageRef.value
      return (
        <div class={[bem.b()]}>
          {label && (
            <label class={[bem.e('label'), bem.em('label', labelPosition)]}>
              {label}
            </label>
          )}
          <div class={bem.e('content')}>{slots.default?.()}</div>
          {validateState === VALIDATE_STATE.ERROR && (
            <div class={bem.e('error')}>
              {slots.error?.() || error || validateMessage}
            </div>
          )}
        </div>
      )
    }
  },
})
