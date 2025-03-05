import type { App, Plugin } from 'vue'
import components from './components'
import { createJovialUI } from './framework'

// console.log(components)
// 全局安装
const install: Plugin = function (app: App) {
  // 判断是否安装
  if (install?.installed)
    return
  // 全局注册组件
  components.forEach((component) => {
    app.use(component)
  })
  install.installed = true
}
export { components, createJovialUI }
export default install
