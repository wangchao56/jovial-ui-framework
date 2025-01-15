jovial-ui-framework/ // UI组件库根目录 pnpm + Monorepo
├── build/ // 构建相关文件
├── examples/ // 示例代码
├── script/ // 脚本文件
├── typings/ // 类型定义文件
├── packages/ // 包目录
│ ├── theme-chalk/ // 样式主题包目录
│ ├── utils/ // 工具函数
│ ├── locale // 本地化
│ ├── jovial/ // 组件库主包目录 -- vite开发环境
│ │ ├── src/ // 源代码目录
│ │ │ ├── composables // 可组合的逻辑
│ │ │ ├── directives // 指令
│ │ │ ├── components/ // 组件目录
│ │ │ ├── stories/ // Storybook 文件目录
│ │ ├── vite.config.mts // Vite 配置文件
│ │ ├── vitest.config.mts // Vitest 配置文件
│ │ ├── ... // 其它与 Vite 相关的配置文件
├── postcss.config.js // PostCSS 配置文件
├── package.json // 项目配置文件
├── pnpm-workspace.yaml // pnpm 工作区配置文件
├── ... // 其它配置文件

├── JvButton/ // JvButton 组件目录
│ ├── src/ // 组件的源代码目录
│ │ ├── JvButton.ts // JvButton 组件的 Ts 类型文件
│ │ ├── JvButton.vue // JvButton 组件的逻辑文件
│ ├── style/ // 测试目录
│ │ ├── theme-vars.css // JvButton 组件的样式文件
│ │ ├── JvButton.css // JvButton 组件的样式文件
│ ├── **tests**/ // 测试目录
│ │ ├── JvButton.spec.ts // JvButton 组件的测试文件
