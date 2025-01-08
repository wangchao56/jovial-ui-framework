import components from './components.mjs'

const install = function (app) {
  if (install == null ? undefined : install.installed)
    return
  components.forEach((component) => {
    app.use(component)
  })
  install.installed = true
}

export { install as default, install }
// # sourceMappingURL=index.mjs.map
