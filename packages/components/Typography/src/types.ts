export type TypographyType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'disabled'
  | 'loading'
  | 'placeholder'
  | 'link'
  | 'default'

export type WritingMode = 'horizontal' | 'vertical'

export type TextVariant =
  | 'text'
  | 'strong'
  | 'italic'
  | 'underline'
  | 'small'
  | 'code'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'kbd'
  | 'ruby'
  | 'rp'
  | 'rt'
  | 'bdo'
  | 'wbr'
  | 'em'
  | 'i'

export interface TypographyBaseProps {
  /** 排版方向 */
  writingMode?: WritingMode
  /** 文本方向 */
  direction?: 'ltr' | 'rtl'
  /** 文本对齐方式 */
  align?: 'start' | 'end' | 'center'
  /** 字体大小（px） */
  fontSize?: number
  /** 文本颜色 */
  color?: string
  /** 是否可交互 */
  interactive?: boolean
  /** WCAG AA 最小对比度 */
  minContrast?: number
  /** 是否启用标点压缩 */
  punctuationCompress?: boolean
  /** 是否启用避头尾 */
  lineBreak?: boolean
  /** 是否启用文本换行 */
  textWrap?: boolean
}
// 段落
export interface ParagraphProps extends TypographyBaseProps {
  /** 首行缩进 (默认true) */
  indent?: boolean
  /** 两端对齐 (默认false) */
  justified?: boolean
  /** 最大行宽 (默认80ch) */
  maxWidth?: number | string
  /** 允许分页 (打印优化) */
  pageBreakInside?: boolean
  /** 首行悬挂 */
  hangingIndent?: boolean
}
// 文本
export interface TextProps extends TypographyBaseProps {
  /** 文本内容 */
  text?: string
  /** 类型 */
  type?: TypographyType
  /** 变体 */
  variant?: TextVariant
}
// 标题
export interface TitleProps extends TypographyBaseProps {
  /** 标题内容 */
  title?: string
  /** 标题等级 */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** 标题对齐方式 */
  aligned?: 'start' | 'end' | 'center'
}
// 列表
export interface ListProps extends TypographyBaseProps {
  type?: 'unordered' | 'ordered'
}
// 引用
export interface QuoteProps extends TypographyBaseProps {
  type?: 'normal' | 'block'
}
// 代码
export interface CodeProps extends TypographyBaseProps {
  type?: 'inline' | 'block'
  /** 代码标题 */
  title?: string
  /** 代码语言 */
  language?: string
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认折叠状态 */
  defaultCollapsed?: boolean
}
// 链接
export interface LinkProps extends TypographyBaseProps {
  href: string
  to?: string
  disabled?: boolean
  disabledColor?: boolean
}
