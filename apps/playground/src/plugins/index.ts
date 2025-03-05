import type { App } from 'vue'
import components from '@jienix/jovial-components'
import * as directives from '@jienix/jovial-directives'
import { createJovialUI } from 'jovial-ui'

const defaultTheme = {
  name: 'default',
  dark: false,
  color: {
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
  },
  variables: {
    'border-color': '#dcdfe6',
    'border-color-light': '#e4e7ed',
    'border-color-lighter': '#ebeef5',
    'border-color-lightest': '#f2f6fc',
    'border-color-dark': '#454d64',
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
