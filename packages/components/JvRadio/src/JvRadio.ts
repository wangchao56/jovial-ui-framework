import type { ExtractPropTypes, Slot } from 'vue'

export const jvRadioProps = {
  /* 单选框标签文本 */
  label: String,
  /* 单选框的值 */
  value: [String, Number, Boolean] as PropType<string | number | boolean>,
  /* 是否选中 */
  modelValue: [String, Number, Boolean] as PropType<string | number | boolean>,
  /* 是否禁用 */
  disabled: Boolean as PropType<boolean>,
  /* 单选框的 name 属性 */
  name: String,
  /* 图标颜色 */
  color: String,
} as const

export type JvRadioProps = ExtractPropTypes<typeof jvRadioProps>

export interface JvRadioEmits {
  /**
   * 更新选中状态
   */
  (e: 'update:modelValue', value: boolean): void

  /**
   * 选中状态变化时触发
   */
  (e: 'change', value?: string | number | boolean): void

  /**
   * 获得焦点时触发
   */
  (e: 'focus'): void

  /**
   * 失去焦点时触发
   */
  (e: 'blur'): void
}

export interface JvRadioSlots {
  /** 自定义标签内容的插槽 */
  label: Slot
}

export interface JvRadioExpose {
  // 暂时没有需要暴露的方法
}
