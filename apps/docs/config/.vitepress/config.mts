import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JOVIAL-UI',
  description: '一个基于 Vue 3 的 UI 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/jv-button' },
    ],

    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: '按钮 JvButton', link: '/components/jv-button' },
          { text: '输入框 JvInput', link: '/components/jv-input' },
        ],
      },
      {
        text: '数据展示',
        items: [
          { text: '表格 JvTable', link: '/components/jv-table' },
          { text: '分页 JvPagination', link: '/components/jv-pagination' },
        ],
      },
    ],
    socialLinks: [

      { icon: 'github', link: 'https://github.com/wangchao56/jovial-ui-framework' },
    ],
  },
})
