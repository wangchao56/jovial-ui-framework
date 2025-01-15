import type { ThemeConfig } from './theme-config'
import { defaultTheme } from './theme-config'
// theme-manager.ts
class ThemeManager {
  // 当前主题
  private currentTheme: string = 'default'

  // 主题仓库
  private themeRegistry: Map<string, ThemeConfig> = new Map()

  // 注册主题
  registerTheme(name: string, config: ThemeConfig) {
    this.themeRegistry.set(name, config)
  }

  // 切换主题
  switchTheme(themeName: string) {
    if (!this.themeRegistry.has(themeName)) {
      throw new Error(`Theme ${themeName} not found`)
    }
    const theme = this.themeRegistry.get(themeName)
    this.applyTheme(theme || defaultTheme)
    this.currentTheme = themeName
  }

  // 应用主题
  private applyTheme(theme: ThemeConfig) {
    if (this.currentTheme === theme.name)
      return

    // 动态更新CSS变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--jv-theme-color-${key}`,
        value,
      )
    })

    // 更新字体

    Object.entries(theme.typography).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--jv-theme-typography-${key}`,
        value,
      )
    })

    // 更新组件样式
    Object.entries(theme.components).forEach(([key, value]) => {
      // console.log(key, value)
      // document.querySelector(`.jv-${key}`)?.setAttribute('style', value)
      const dom = document.querySelector(`.jv-${key}`) as HTMLElement
      if (!dom) {
        return
      }
      Object.assign(dom.style, value)
      // 通过CSS变量更新组件样式 添加到样式表中
      // Object.entries(value).forEach(([k, v]) => {
      //   console.log(k, v)

      // })
    })
  }

  // 获取当前主题
  getCurrentTheme() {
    return this.currentTheme
  }

  // 初始化主题
  init() {
    this.registerTheme('default', defaultTheme)
    this.switchTheme('default')
  }
}

export type ThemeManagerType = InstanceType<typeof ThemeManager>
// 导出主题管理器
export { ThemeManager }
