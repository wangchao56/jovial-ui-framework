// 创建样式表
export function createDynamicStyleSheet(): CSSStyleSheet {
  const styleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet]
  return styleSheet
}

// 插入规则
export function addCSSRule(
  styleSheet: CSSStyleSheet,
  selector: string,
  rules: string,
): void {
  styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length)
}
// 删除规则
export function removeCSSRule(
  styleSheet: CSSStyleSheet,
  selector: string,
): void {
  const index = Array.from(styleSheet.cssRules).findIndex(
    rule => rule instanceof CSSStyleRule && rule.selectorText === selector,
  )
  if (index !== -1) {
    styleSheet.deleteRule(index)
  }
}
// 获取规则
export function getCSSRule(
  styleSheet: CSSStyleSheet,
  selector: string,
): CSSStyleRule | null {
  const rule = Array.from(styleSheet.cssRules).find(
    rule => rule instanceof CSSStyleRule && rule.selectorText === selector,
  )
  return rule instanceof CSSStyleRule ? rule : null
}
// // 使用示例
// const dynamicSheet = createDynamicStyleSheet()
// addCSSRule(dynamicSheet, '.my-class', `
//   color: green;
//   background: yellow;
// `)

// 性能优化样式注入
class PerformanceStyleInjector {
  private styleCache: Map<number, boolean>
  private styleElement: HTMLStyleElement | null

  constructor() {
    this.styleCache = new Map()
    this.styleElement = null
  }

  // 缓存和去重
  inject(styles: string): void {
    const styleHash = this.hashStyles(styles)

    if (!this.styleCache.has(styleHash)) {
      this.createStyleElement()
      if (this.styleElement) {
        this.styleElement.textContent += styles
        this.styleCache.set(styleHash, true)
      }
    }
  }

  // 样式哈希
  private hashStyles(styles: string): number {
    return styles.split('')
      .reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0)
      }, 0)
  }

  // 创建样式标签
  private createStyleElement(): void {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style')
      document.head.appendChild(this.styleElement)
    }
  }
}

// 使用
const styleInjector = new PerformanceStyleInjector()
styleInjector.inject(`  
  .button {   
    color: blue;   
    padding: 10px;   
  }  
`)

/** 将number或者string 转换为css可识别的值 */
export function toCSSValue(value: number | string | undefined): string {
  return typeof value === 'number' ? `${value}px` : value ?? '0'
}

/** 将string类型的css值转换为number */
export function csstoNumber(value: string | number): number {
  return typeof value === 'number' ? value : Number.parseInt(value)
}
