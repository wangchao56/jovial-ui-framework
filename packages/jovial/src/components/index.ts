import type { App } from 'vue'
import components from './components'

// console.log(components)
// 全局安装
export const install: any = function (app: App) {
  // 判断是否安装
  if (install?.installed)
    return
  // 全局注册组件
  components.forEach((component) => {
    app.use(component)
  })
  install.installed = true
}
export default install
