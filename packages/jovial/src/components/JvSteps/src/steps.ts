import type { VNodeChild } from 'vue'

/** 步骤条方向 */
export type StepsDirection = 'horizontal' | 'vertical'

/** 步骤条状态 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

/** 步骤项配置 */
export interface StepItem {
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 图标 */
  icon?: string
  /** 状态 */
  status?: StepStatus
  /** 是否禁用 */
  disabled?: boolean
}

export const jvStepsProps = {
  /** 当前步骤 */
  modelValue: {
    type: Number,
    default: 0,
  },
  /** 步骤项列表 */
  items: {
    type: Array as () => StepItem[],
    default: () => [],
  },
  /** 步骤条方向 */
  direction: {
    type: String as () => StepsDirection,
    default: 'horizontal',
  },
  /** 是否启用点击切换 */
  clickable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示序号 */
  showIndex: {
    type: Boolean,
    default: true,
  },
  /** 是否显示连接线 */
  showLine: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvStepsProps {
  /** 当前步骤 */
  modelValue?: number
  /** 步骤项列表 */
  items?: StepItem[]
  /** 步骤条方向 */
  direction?: StepsDirection
  /** 是否启用点击切换 */
  clickable?: boolean
  /** 是否显示序号 */
  showIndex?: boolean
  /** 是否显示连接线 */
  showLine?: boolean
  /** 是否禁用 */
  disabled?: boolean
}

export interface JvStepsEmits {
  /** 当前步骤改变时触发 */
  (e: 'update:modelValue', index: number): void
  /** 点击步骤时触发 */
  (e: 'click', index: number, item: StepItem): void
}

export interface JvStepsSlots {
  /** 自定义步骤标题 */
  title?: (props: { item: StepItem, index: number, active: boolean }) => VNodeChild
  /** 自定义步骤描述 */
  description?: (props: { item: StepItem, index: number, active: boolean }) => VNodeChild
  /** 自定义步骤图标 */
  icon?: (props: { item: StepItem, index: number, active: boolean }) => VNodeChild
}
