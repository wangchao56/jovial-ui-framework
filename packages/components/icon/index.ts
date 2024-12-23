/**
 * icon 组件的设计规范
 */
import _icon from "./src/icon.vue";
import { withInstall } from "@jovial/utils";

const Icon = withInstall(_icon);

export * from "./src/icon";
export default Icon;

declare module "vue" {
  export interface GlobalComponents {
    JvIcon: typeof Icon;
  }
}
