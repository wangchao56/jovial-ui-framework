import { toCamelCase } from './common.mjs';

function withInstall(comp) {
  comp.install = function(app) {
    const componentName = comp.name;
    if (typeof componentName === "string") {
      app.component(componentName, comp);
      app.component(toCamelCase(componentName), comp);
    }
  };
  return comp;
}

export { withInstall };
//# sourceMappingURL=with-install.mjs.map
