import type { LocaleOptions } from '@jienix/jovial-locale'
import type { App, VNode } from 'vue'
import { createDefaults, type DefaultsOptions, DefaultsSymbol } from '@jienix/jovial-composables'
import { createJovialAdapter, LocaleSymbol } from '@jienix/jovial-locale'
import { createTheme, type ThemeOptions, ThemeSymbol } from '@jienix/jovial-theme'
import { getUid } from '@jienix/utils'

export interface JovialOptions {
  aliases?: Record<string, any>
  // blueprint?: Blueprint
  components?: (VNode & { install: (app: App) => void })[]
  // date?: DateOptions
  directives?: Record<string, any>
  defaults?: DefaultsOptions
  // display?: DisplayOptions
  // goTo?: GoToOptions
  theme?: ThemeOptions
  // icons?: IconOptions
  locale?: LocaleOptions // 添加国际化选项
  // ssr?: SSROptions
}

export interface Blueprint extends Omit<JovialOptions, 'blueprint'> {}

/**
 *  创建Jovial
 */

export function createJovialUI(jovial: JovialOptions = {}) {
  // 注入组件
  // 主题
  // in8
  // 自定义指令
  // icons
  // 将这些内容全部注入到项目的app中,共后代组件使用
  // 注册方法app.use(Jovial)
  const { ...rest } = jovial
  const options: JovialOptions = rest
  const {
    components = [],
    directives,
    locale: localeOptions,
  } = options
  const defaults = createDefaults(options.defaults)
  const theme = createTheme(options.theme)
  const locale = createJovialAdapter(localeOptions) // 创建国际化实例
  const install = (app: App) => {
    for (const key in directives) {
      app.directive(key, directives[key])
    }
    components.forEach((component: (VNode & { install: (app: App) => void })) => {
      app.use(component)
    })
    theme.install(app) // 安装主题

    app.provide(DefaultsSymbol, defaults)
    app.provide(ThemeSymbol, theme)
    app.provide(LocaleSymbol, locale) // 提供国际化实例

    getUid.reset()
  }

  return {
    install,
    defaults,
    theme,
    locale, // 导出国际化实例
  }
}
// export const version = __VUETIFY_VERSION__
// createJovialUI.version = version
