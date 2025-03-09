import type { Slot } from 'vue'

export const jvTextareaProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 最大长度
   */
  maxlength: {
    type: Number,
    default: 100,
  },
  /**
   * 最小长度
   */
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
  /**
   * 行数
   */
  rows: {
    type: Number,
    default: 2,
  },
  /**
   * 列数
   */
  cols: {
    type: Number,
    default: 20,
  },
  /**
   * 是否自动大写
   */
  autocapitalize: {
    type: String as PropType<
      'off' | 'on' | 'words' | 'sentences' | 'characters'
    >,
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
export type JvTextareaProps = Partial<ExtractPropTypes<typeof jvTextareaProps>>
export interface JvTextareaEmits {
  /**
   * 更新绑定值
   */
  (e: 'update:modelValue', value: string): void
  /**
   * 改变时触发
   */
  (e: 'change', value: string): void
  /**
   * 输入时触发
   */
  (e: 'input', event: Event): void
  /**
   * 失去焦点时触发
   */
  (e: 'blur', event: FocusEvent): void
  /**
   * 聚焦时触发
   */
  (e: 'focus', event: FocusEvent): void
  /**
   * 清除时触发
   */
  (e: 'clear'): void
}
export interface JvTextareaSlots {
  /**
   * 默认插槽
   */
  default?: Slot
  /**
   * 前缀插槽
   */
  prefix?: Slot
  /**
   * 后缀插槽
   */
  suffix?: Slot
}
export interface JvTextareaExpose {
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
