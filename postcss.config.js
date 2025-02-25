module.exports = {
  plugins: [
    require('postcss-import'), // 导入
    require('postcss-mixins'), // 混合
    require('postcss-each'), // each
    require('postcss-for'), // for
    require('postcss-preset-env')({ // 预设环境
      stage: 1, // 指定 stage 级别
      features: {
        'nesting-rules': true, // 启用嵌套规则
      },
    }),
    require('postcss-bem-fix')({ // bem 修复
      defaultNamespace: 'jv',
      style: 'suit',
      separators: { namespace: '-', modifier: '--', descendent: '__' },
      shortcuts: { component: 'b', modifier: 'm', descendent: 'e' },
    }),
    require('autoprefixer')({ // 自动添加前缀
      grid: true,
      supports: true,
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead', 'iOS >= 10', 'Android >= 6.0', '> 5% in CN', 'IE 10-11'],
    }),
    require('postcss-pxtorem')({ // 转换单位
      rootValue: 16,
      propList: ['*'],
    }),
    require('stylelint')({
      fix: true,
    }),
  ],
}
