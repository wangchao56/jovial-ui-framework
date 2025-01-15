import type { NameType } from '@/components/JvCollapseItem'
import type { InjectionKey } from 'vue'

export const jvCollapseProps = {} as const
export interface JvCollapseProps {
  modelValue: NameType[]
  /** 手风琴模式 */
  accordion?: boolean
};
export const jvCollapseEmits = {} as const
export interface JvCollapseEmits {
  /** */
  (e: 'update:modelValue', values: NameType[]): void
  /** 数据变化 */
  (e: 'change', values: NameType[]): void
}
export const jvCollapseSlots = {} as const
export interface JvCollapseSlots {}
export interface JvCollapseExpose {}
export interface JvCollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export const collapseContextKey: InjectionKey<JvCollapseContext> = Symbol('JvCollapseContext')
