'use strict'

const common = require('./common.cjs')

function withInstall(comp) {
  comp.install = function (app) {
    const componentName = comp.name
    if (typeof componentName === 'string') {
      app.component(componentName, comp)
      app.component(common.toCamelCase(componentName), comp)
    }
  }
  return comp
}

exports.withInstall = withInstall
// # sourceMappingURL=with-install.cjs.map
