import type { Slot } from 'vue'

export const jvRadioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: String,
} as const

export interface JvRadioGroupProps {
  /**
   * 单选框组的值
   * @type {string | number | boolean}
   */
  modelValue?: string | number | boolean

  /**
   * 是否禁用整个单选框组
   * @default false
   */
  disabled?: boolean

  /**
   * 单选框组的 name 属性
   * @description 用于表单提交时的标识
   */
  name?: string

  /**
   * 是否为垂直布局
   * @default false
   * @description 启用后单选框将垂直排列
   */
  column?: boolean

  /**
   * 是否为内联布局
   * @default false
   * @description 启用后单选框将水平排列且不换行
   */
  inline?: boolean
}

export interface JvRadioGroupEmits {
  /**
   * 更新单选框组的值
   * @param {string | number | boolean} value - 选中的值
   */
  (e: 'update:modelValue', value?: string | number | boolean): void

  /**
   * 选中值变化时触发
   * @param {string | number | boolean} value - 新的选中值
   */
  (e: 'change', value?: string | number | boolean): void
}

export interface JvRadioGroupSlots {
  /** 默认插槽，用于放置 Radio 组件 */
  default: Slot<any>
  /** 标签插槽，用于自定义标签内容 */
  label: Slot<any>
}

export interface JvRadioGroupExpose {
  // 暂时没有需要暴露的方法
}

/**
 * Radio 组上下文接口
 * @description 用于向子组件注入的上下文数据
 */
export interface JvRadioGroupContext {
  /** 单选框组的 name 属性 */
  name?: string
  /** 单选框组的值 */
  modelValue?: Ref<string | number | boolean | undefined>
  /** 是否禁用 */
  disabled?: boolean
  /**
   * 派发事件方法
   * @param {string} event - 事件名称
   * @param {any[]} args - 事件参数
   */
  dispatch: (event: 'change' | 'update:modelValue', ...args: any[]) => void
}

/** Radio 组注入的 key */
export const radioGroupContextKey: InjectionKey<JvRadioGroupContext> = Symbol.for('radioGroupContextKey')
