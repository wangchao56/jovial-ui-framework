import { plugins } from './config'

export function setupVue3({ app }) {
  app.provide('test', 'hello')
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
