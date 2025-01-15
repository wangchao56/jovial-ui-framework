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
        'not ie <= 11',

        // 移动端
        'iOS >= 10',
        'Android >= 6.0',

        // 国内市场
        '> 5% in CN',
      ],
    }),
    require('postcss-each-variables'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')],
      },
    }),
  ],
}
