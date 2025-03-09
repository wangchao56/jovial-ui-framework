import type { InjectionKey } from 'vue'

export interface JvFormContext extends Record<string, any> {
  fields: any[]
  addField: (field: any) => void
  removeField: (field: any) => void
}

export const JvFormContextKey: InjectionKey<JvFormContext> = Symbol('JvFormOContextKey')
