'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const components = require('./components.cjs')

const install = function (app) {
  if (install == null ? undefined : install.installed)
    return
  components.default.forEach((component) => {
    app.use(component)
  })
  install.installed = true
}

exports.default = install
exports.install = install
// # sourceMappingURL=index.cjs.map
