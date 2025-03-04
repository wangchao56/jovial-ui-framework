// theme-plugin.ts
import type { App, InjectionKey } from 'vue'
import type { ThemeManagerType } from './theme-manager'
import { defaultTheme } from './theme-config'
import { ThemeManager } from './theme-manager'

export const themeManagerContentKey: InjectionKey<ThemeManagerType> = Symbol('themeManager')

export default {
  install(app: App) {
    const themeManager = new ThemeManager()
    themeManager.registerTheme('jieni', defaultTheme)
    themeManager.switchTheme('jieni')

    // 全局属性
    app.config.globalProperties.$theme = themeManager

    // 依赖注入
    app.provide(themeManagerContentKey, themeManager)
    nextTick(() => {
      // console.log(document.documentElement)
      document.documentElement.setAttribute('data-theme', themeManager.getCurrentTheme())
      themeManager.init()
    })
  },
}
