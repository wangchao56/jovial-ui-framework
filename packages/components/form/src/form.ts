import type { Ref, PropType, InjectionKey, MaybeRef, UnwrapRef } from 'vue'
import type {
  FormItemContext,
  FormItemRule,
  FormItemProps,
  FormValidationResult,
  FormValidateCallback
} from './form-item'
import type { FieldPath, Arrayable } from '@jovial/typings'
import { Values } from 'async-validator'

export type FormRules<
  T extends MaybeRef<Record<string, any> | string> = string
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
    required: true
  },
  rules: Object as PropType<FormRules>,
  showMessage: {
    type: Boolean,
    default: true
  }
} as const
export interface FormProps {
  model: Record<string, any>
  rules?: FormRules
  showMessage: boolean
}
export const formEmits = {} as const
export type FormEmits = {}
export const formSlots = {} as const
export type FormSlots = {}
export type FormExpose = {
  validate: (
    callback?: FormValidateCallback
  ) => Promise<void | boolean | Values>
  // validateField: (
  //   props?: Arrayable<FormItemProps> | undefined,
  //   callback?: FormValidateCallback | undefined
  // ) => FormValidationResult
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
}
export const formProviderKey: InjectionKey<FormContext> = Symbol('form')

export const converArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}
