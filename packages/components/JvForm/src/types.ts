import type { ExtractPropTypes, PropType } from 'vue'

// 表单项字段接口
export interface JvFormField {
  prop: string
  validate: () => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}

// 表单验证规则类型
export interface JvFormRules {
  [key: string]: JvFormRule | JvFormRule[]
}

// 单个验证规则
export interface JvFormRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change' | Array<'blur' | 'change'>
  min?: number
  max?: number
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'array'
    | 'object'
    | 'email'
    | 'url'
    | 'date'
  pattern?: RegExp
  validator?: (rule: any, value: any) => boolean | Promise<boolean>
}

// 表单属性
export const jvFormProps = {
  model: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  rules: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '100px',
  },
  labelPosition: {
    type: String,
    default: 'right',
    validator: (value: string) => ['left', 'right', 'top'].includes(value),
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  statusIcon: {
    type: Boolean,
    default: false,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => ['small', 'default', 'large'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

// 表单属性类型
export type JvFormProps = ExtractPropTypes<typeof jvFormProps>

// 表单事件
export interface JvFormEmits {
  (e: 'validate', prop: string, isValid: boolean, message: string): void
  (e: 'submit', data: { valid: boolean, model: Record<string, any> }): void
}

// 表单方法
export interface JvFormExpose {
  validate: () => Promise<boolean>
  validateField: (prop: string) => Promise<boolean>
  validateFields: (props: string[]) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
}

// 表单上下文
export interface JvFormContext extends JvFormProps {
  fields: JvFormField[]
  addField: (field: JvFormField) => void
  removeField: (field: JvFormField) => void
}
