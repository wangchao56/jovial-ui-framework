export const jvSliderProps = {
  modelValue: {
    type: Number,
    default: 50,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  list: {
    type: String,
    default: '',
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (val: string) => ['horizontal', 'vertical'].includes(val),
  },
  showStops: {
    type: Boolean,
    default: false,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  showTooltip: {
    type: Boolean,
    default: true,
  },
  marks: {
    type: Object as PropType<Record<number, string>>,
    default: () => ({}),
  },
  showTicks: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvSliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  list?: string
  orientation?: 'horizontal' | 'vertical'
  showStops?: boolean
  showInput?: boolean
  showTooltip?: boolean
  marks?: Record<number, string>
  showTicks?: boolean
}

export const jvSliderEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  'change': (value: number) => typeof value === 'number',
  'input': (value: number) => typeof value === 'number',
} as const

export interface JvSliderEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'input', value: number): void
}

export const jvSliderSlots = {} as const
export interface JvSliderSlots {
  mark?: (props: { value: number }) => any
  tooltip?: (props: { value: number }) => any
}
export interface JvSliderExpose {}
