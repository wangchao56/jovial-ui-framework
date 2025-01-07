import type { ComputedRef, InjectionKey, PropType, Ref, VNodeChild } from 'vue'
import type { Size } from '../../button'
import type { RuleItem, ValidateFieldsError } from 'async-validator'
import type { FormProps } from './form'
export type Arrayable<T> = T | T[]
export type TiggerType = 'blur' | 'change' | 'submit' | string

export interface FormItemRule extends RuleItem {
  /** 触发验证的时机 */
  trigger?: TiggerType | TiggerType[]
}

export type FormValidationResult = Promise<boolean | void>
export type ValidateStatusType = '' | 'error' | 'validating' | 'success'
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => Promise<void> | void
export const formItemProps = {
  prop: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  label: {
    type: String as PropType<string>,
    default: ''
  },
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: ''
  },
  labelWidth: [String, Number] as PropType<string | number>,
  required: Boolean,
  rules: [Array, Object] as PropType<FormItemRule[] | FormItemRule>,
  error: String,
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  inlineMessage: Boolean,
  size: {
    type: String as PropType<Exclude<Size, 'x-large'>>,
    default: ''
  },
  validateStatus: {
    type: String as PropType<ValidateStatusType>,
    default: ''
  }
} as const
export interface FormItemProps {
  /**model 的键名。 它可以是一个属性的值(如 a.b.0 或 ['a', 'b', '0'])。 在使用了 validate、resetFields 的方法时，该属性是必填的。 */
  prop: string | string[]
  /** 标签信息 */
  label: string
  /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 默认会继承 Form的label-position */
  labelPosition?: 'left' | 'right'
  /**	标签宽度，例如 '50px'。 可以使用 auto。 */
  labelWidth?: string | number
  /**	是否为必填项，如不设置，则会根据校验规则确认 */
  required?: boolean
  /**表单验证规则, 具体配置见下表, 更多内容可以参考async-validator */
  rules?: Arrayable<FormItemRule>
  /**表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 */
  error?: string
  /** 是否显示校验错误信息 */
  showMessage?: boolean
  /**  是否在行内显示校验信息*/
  inlineMessage?: boolean
  /** 	用于控制该表单域下组件的默认尺寸 */
  size?: Exclude<Size, 'x-large'>
  /**formitem 校验的状态 */
  validateStatus?: ValidateStatusType
}
export const formItemEmits = {} as const
export type FormItemEmits = {}
export const formItemSlots = {
  default: () => ({ name: 'default' }),
  label: () => ({ name: 'label' }),
  error: () => ({ name: 'error' })
} as const
export type FormItemSlots = {
  /** 自定义表单项内容 */
  default: ((...args: any[]) => VNodeChild | string) | undefined
  /** 自定义表单项标签 */
  label: (() => VNodeChild | string) | undefined
  /** 自定义表单项校验信息 */
  error: (() => VNodeChild | string) | undefined
}

export const formItemExpose = [
  'size',
  'validate',
  'validateMessage',
  'validateState',
  'resetField',
  'clearValidate'
]

export type FormItemExpose = {
  /** 表单项大小 */
  size: ComputedRef<Exclude<Size, 'x-large'>>
  /** 验证表单项 FormValidationResult */
  validate: (
    trigger: TiggerType,
    callback?: FormValidateCallback | undefined
  ) => FormValidationResult
  /**校验消息  */
  validateMessage: ComputedRef<string>
  /**校验状态  */
  validateState: Ref<ValidateStatusType>
  /** 对该表单项进行重置，将其值重置为初始值并移除校验结果 */
  resetField: () => void
  /** 移除该表单项的校验结果 */
  clearValidate: () => void
}

export interface FormItemContext extends FormItemProps {
  validate: FormItemExpose['validate']
  // model: FormProps['model']
}

export const formItemProviderKey: InjectionKey<FormItemContext> =
  Symbol('formItem')

export enum VALIDATE_STATE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  VALIDATING = 'validating'
}
