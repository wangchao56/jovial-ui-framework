import type { Slot } from 'vue'

export const jvSliderProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: Number,
    default: 50,
  },
  /**
   * 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 列表
   */
  list: {
    type: String,
    default: '',
  },
  /**
   * 方向
   */
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (val: string) => ['horizontal', 'vertical'].includes(val),
  },
  /**
   * 是否显示刻度
   */
  showStops: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示输入框
   */
  showInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示提示
   */
  showTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 刻度
   */
  marks: {
    type: Object as PropType<Record<number, string>>,
    default: () => ({}),
  },
  /**
   * 是否显示刻度
   */
  showTicks: {
    type: Boolean,
    default: false,
  },
} as const

export type JvSliderProps = Partial<ExtractPropTypes<typeof jvSliderProps>>

export interface JvSliderEmits {
  /**
   * 更新绑定值
   * @param {number} value - 新的绑定值
   */
  (e: 'update:modelValue', value: number): void
  /**
   * 值改变时触发
   * @param {number} value - 新的值
   */
  (e: 'change', value: number): void
  /**
   * 输入框改变时触发
   * @param {number} value - 新的值
   */
  (e: 'input', value: number): void
}

export interface JvSliderSlots {
  /**
   * 刻度
   */
  mark?: Slot<{ value: number }>
  /**
   * 提示
   */
  tooltip?: Slot<{ value: number }>
}
export interface JvSliderExpose {
  /**
   * 获取当前值
   * @returns {number} 当前值
   */
  getValue: () => number
}
