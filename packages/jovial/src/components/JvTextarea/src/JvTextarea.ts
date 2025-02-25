export const jvTextareaProps = {
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: 100,
  },
  minlength: {
    type: Number,
    default: 0,
  },
  /**
   * 是否自动换行
   */
  wrap: {
    type: String as PropType<'soft' | 'hard'>,
    default: 'soft',
  },
  rows: {
    type: Number,
    default: 2,
  },
  cols: {
    type: Number,
    default: 20,
  },
  /**
   * 是否自动大写
   */
  autocapitalize: {
    type: String as PropType<'off' | 'on' | 'words' | 'sentences' | 'characters'>,
    default: 'off',
  },
  /**
   * 是否自动聚焦
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自动补全
   */
  autocomplete: {
    type: String as PropType<'on' | 'off'>,
    default: 'off',
  },
  /**
   * 是否启用拼写检查
   */
  spellcheck: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用自动补全
   */
  autofill: {
    type: Boolean,
    default: true,
  },
  /**
   * 文本方向
   */
  dirname: {
    type: String as PropType<'ltr' | 'rtl' | 'auto'>,
    default: 'auto',
  },
  /**
   * 表单
   */
  form: {
    type: String,
    default: '',
  },
  /**
   * 名称
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 唯一标识
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * 是否自动调整高度
   */
  autosize: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示字数统计
   */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const
export type JvTextareaProps = ExtractPropTypes<typeof jvTextareaProps>
export interface JvTextareaEmits {
  // 事件定义
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'input', event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'clear'): void
}
export interface JvTextareaSlots {
  // 插槽定义
  default?: () => any
}
export interface JvTextareaExpose {
  // 暴露的方法和属性
  /**
   * 清除内容
   */
  clear: () => void
  /**
   * 根元素
   */
  root: Ref<HTMLTextAreaElement>
  /**
   * 文本长度
   */
  textLength: number
}
