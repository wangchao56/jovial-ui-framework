export interface Variable {
  light: string
  dark: string
}

export interface ThemeOptions {
  dark: boolean // 是否为暗黑模式
  colors: Partial<{
    primary: string // 主色
    surface: string // 背景
    secondary: string // 辅助色
    success: string // 成功色
    warning: string // 警告色
    error: string // 错误色
    info: string // 信息色
    background: string | Partial<Variable> // 背景
    text: string | Partial<Variable> // 文本
    border: string | Partial<Variable> // 边框
    shadow: string | Partial<Variable> // 阴影
    disabled: string | Partial<Variable> // 禁用
    divider: string | Partial<Variable> // 分割线
    overlay: string | Partial<Variable> // 遮罩
    gradient: string | Partial<Variable> // 渐变
    [key: string]: string | Partial<Variable>
    // hover: Partial<Variable> // 悬浮
    // active: Partial<Variable> // 激活
    // focus: Partial<Variable> // 聚焦
    // link: Partial<Variable> // 链接
    // visited: Partial<Variable> // 访问过
    // hovered: Partial<Variable> // 悬浮
    // pressed: Partial<Variable> // 按下
    // selected: Partial<Variable> // 选中
    // checked: Partial<Variable> // 选中
    // indeterminate: Partial<Variable> // 不确定
    // expanded: Partial<Variable> // 展开
    // open: Partial<Variable> // 打开
    // closed: Partial<Variable> // 关闭
    // loading: Partial<Variable> // 加载中
    // finished: Partial<Variable> // 完成
    // failed: Partial<Variable> // 失败
    // successed: Partial<Variable> // 成功
    // errored: Partial<Variable> // 失败
    // warninged: Partial<Variable> // 警告
    // infomed: Partial<Variable> // 信息
  }>
  font: Partial<{
    fontfamily: {
      sans: string //  无衬线字体
      serif: string // 衬线字体
      mono: string // 等宽字体
    }
    fontSize: {
      base: number // 基础 14px
      medium: number // 中 16px
      large: number // 大 18px
      small: number // 小 12px
      xlarge: number // 超大 20px
      xsmall: number // 超小 10px
    }
    lineHeight: { // 对应字体大小
      base: number // 基础  17px
      medium: number // 中
      large: number // 大 1.5
      small: number // 小 1.5
      xlarge: number // 超大 1.5
      xsmall: number // 超小 1.5
    }
    fontWeight: {
      base: number // 基础 400
      medium: number // 中 500
      bold: number // 粗 600
      extrabold: number // 极粗 800
    }
    letterSpacing: {
      base: number // 基础 0
      medium: number // 中 0.05em
      large: number // 大 0.05em
      small: number // 小 0.05em
      xlarge: number // 超大 0.05em
      xsmall: number // 超小 0.05em
    }
  }>
  // 边框的样式
  // border: {
  //   // color使用colors中的颜色
  //   color: ThemeOptions['colors']['border']['base'] // 边框颜色
  //   radius: string // 边框圆角
  //   width: string // 边框宽度
  //   style: string // 边框样式
  // }
  // // 间距
  // spacing: {
  //   base: number // 基础 4
  //   small: number // 小  4
  //   medium: number // 中 8
  //   large: number // 大 16
  //   xlarge: number // 超大  24
  //   xsmall: number // 超小  2
  // }
}
