import type { Slot } from 'vue'

export const jvRadioProps = {
  label: String,
  value: [String, Number, Boolean],
  modelValue: [String, Number, Boolean],
} as const

export interface JvRadioProps {
  /**
   * 单选框标签文本
   * @description 显示在单选框右侧的文本
   */
  label?: string

  /**
   * 单选框的值
   * @description 在表单提交时使用的值
   */
  value?: string | number | boolean

  /**
   * 是否选中
   * @description 用于 v-model 绑定
   */
  modelValue?: boolean

  /**
   * 是否禁用
   * @default false
   * @description 禁用状态下不可点击
   */
  disabled?: boolean

  /**
   * 单选框的 name 属性
   * @description 用于表单提交时的标识
   */
  name?: string

  /**
   * 图标颜色
   * @description 可以自定义单选框选中状态的颜色
   */
  color?: string
}

export interface JvRadioEmits {
  /**
   * 更新选中状态
   * @param {boolean} value - 新的选中状态
   */
  (e: 'update:modelValue', value: boolean): void

  /**
   * 选中状态变化时触发
   * @param {string | number | boolean} value - 单选框的值
   */
  (e: 'change', value?: string | number | boolean): void
}

export interface JvRadioSlots {
  /** 自定义标签内容的插槽 */
  label: Slot<any>
}

export interface JvRadioExpose {
  // 暂时没有需要暴露的方法
}

/**
 * JvRadio 单选框组件
 *
 * @description
 * 单选框组件用于在多个选项中选择一个选项。
 * 可以单独使用，也可以配合 JvRadioGroup 组件使用。
 *
 * @features
 * - 支持禁用状态
 * - 支持自定义颜色
 * - 支持键盘操作
 * - 支持表单验证
 * - 支持自定义标签内容
 *
 * @example
 * ```vue
 * <JvRadio v-model="value" label="选项1" value="1" />
 * ```
 *
 * @example
 * ```vue
 * <JvRadioGroup v-model="groupValue">
 *   <JvRadio label="选项1" value="1" />
 *   <JvRadio label="选项2" value="2" />
 * </JvRadioGroup>
 * ```
 */
