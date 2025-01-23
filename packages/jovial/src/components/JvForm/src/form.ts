import type { Arrayable, FieldPath } from '@jovial/typings'
import type { Values } from 'async-validator'
import type { InjectionKey, MaybeRef, PropType, UnwrapRef } from 'vue'
import type {
  FormItemContext,
  FormItemRule,
  FormValidateCallback,
} from './form-item'

export type FormRules<
  T extends MaybeRef<Record<string, any> | string> = string,
> = Partial<
  Record<
    UnwrapRef<T> extends string ? UnwrapRef<T> : FieldPath<UnwrapRef<T>>,
    Arrayable<FormItemRule>
  >
>

export const formProps = {
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    required: true,
  },
  rules: Object as PropType<FormRules>,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const
export interface FormProps {
  model: Record<string, any>
  rules?: FormRules
  showMessage: boolean
}
export const formEmits = {} as const
export interface FormEmits {}
export const formSlots = {} as const
export interface FormSlots {}
export interface FormExpose {
  validate: (
    callback?: FormValidateCallback
  ) => Promise<void | boolean | Values>
  resetFields: () => void
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
}
export const formProviderKey: InjectionKey<FormContext> = Symbol('form')

export function converArray(rules: Arrayable<FormItemRule> | undefined): FormItemRule[] {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}
