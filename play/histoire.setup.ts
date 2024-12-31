import JvIcon from '@jovial/components/icon/index'
import JvTree from '@jovial/components/tree'
import JvCheckbox from '@jovial/components/checkbox'
import JvCharts from '@jovial/components/chart'
import * as SvgVicons from '@vicons/material'
import '@jovial/theme-chalk/src/index.scss'
const plugins = [JvIcon, JvTree, JvCheckbox].concat(
  Object.values(JvCharts).map((c) => c)
)

export function setupVue3({ app }) {
  app.provide('test', 'hello')
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  Object.keys(SvgVicons).forEach((key) => {
    app.component(key, SvgVicons[key])
  })
}
