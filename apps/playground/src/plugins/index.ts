import type { ThemeOptions } from '@jienix/jovial-theme/src/theme'
import type { App } from 'vue'
import * as components from '@jienix/jovial-components'
import * as directives from '@jienix/jovial-directives'
import { createJovialUI } from '../../../../packages/jovial-ui/src/framework'

const defaultTheme: ThemeOptions = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        primary: '#409EFF',
        background: '#F5f5f5',
        surface: '#121212',
        success: '#67C23A',
        warning: '#E6A23C',
        error: '#F56C6C',
        info: '#909399',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#409EFF',
        background: '#121212',
        surface: '#121212',
        success: '#67C23A',
        warning: '#E6A23C',
        error: '#F56C6C',
        info: '#909399',
      },
    },
  },
}

// 注册组件
const Jovial = createJovialUI({
  components,
  directives,
  theme: defaultTheme,
})

export function registerPlugins(app: App) {
  app.use(Jovial)
}

export default Jovial
