type CSSProperties = Record<string, string | number>
type Breakpoints = Record<number, Record<string, CSSProperties>>

function createResponsiveStyles(baseStyles: CSSProperties, breakpoints: Breakpoints): void {
  const styleSheet = document.createElement('style')
  document.head.appendChild(styleSheet)

  // 基础样式
  const baseRules = Object.entries(baseStyles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ')

  const cssRules = [`* { ${baseRules} }`]

  // 响应式断点
  Object.entries(breakpoints).forEach(([breakpoint, styles]) => {
    const mediaQuery = `@media (min-width: ${breakpoint}px) {`
    const mediaRules = Object.entries(styles)
      .map(([selector, ruleSet]) => {
        const rules = Object.entries(ruleSet)
          .map(([prop, value]) => `${prop}: ${value};`)
          .join(' ')
        return `${selector} { ${rules} }`
      })
      .join('\n')

    cssRules.push(`${mediaQuery}\n${mediaRules}\n}`)
  })

  styleSheet.textContent = cssRules.join('\n')
}

// 使用示例
createResponsiveStyles(
  {
    fontFamily: 'Arial',
    lineHeight: '1.5',
  },
  {
    768: {
      '.container': {
        maxWidth: '750px',
        padding: '0 15px',
      },
      'body': {
        fontSize: '16px',
      },
    },
    1024: {
      '.container': {
        maxWidth: '960px',
      },
    },
  },
)

export { Breakpoints, createResponsiveStyles, CSSProperties }
