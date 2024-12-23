import JvIcon from "@jovial/components/icon/index";
import * as SvgVicons from "@vicons/material";
import "@jovial/theme-chalk/src/index.scss";
const plugins = [JvIcon];

export function setupVue3({ app }) {
  app.provide("test", "hello");
  plugins.forEach((plugin) => {
    app.use(plugin);
  });

  Object.keys(SvgVicons).forEach((key) => {
    app.component(key, SvgVicons[key]);
  });
}
