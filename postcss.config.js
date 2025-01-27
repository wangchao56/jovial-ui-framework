module.exports = {
  plugins: [
    require('autoprefixer')({
      grid: true, // 启用grid兼容
      supports: true, // 检查@supports
      overrideBrowserslist: [
        // 桌面端
        '> 1%',
        'last 2 versions',
        'not dead',

        // 移动端
        'iOS >= 10',
        'Android >= 6.0',

        // 国内市场
        '> 5% in CN',

        // IE 10-11
        'IE 10-11',
      ],
    }),
    require('postcss-each-variables'),
    require('postcss-import'),
    require('postcss-bem-fix')({
      defaultNamespace: 'jv', // 默认命名空间
      style: 'suit', // 使用 suit 风格
      separators: {
        namespace: '-', // 命名空间分隔符
        modifier: '--', // 修饰符分隔符
        descendent: '__', // 后代分隔符
      },
      shortcuts: {
        component: 'b', // 组件简写
        modifier: 'm', // 修饰符简写
        descendent: 'e', // 后代简写
      },
    }),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')],
      },
    }),
  ],
}
