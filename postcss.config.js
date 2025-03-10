module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
      },
    }),
    require('autoprefixer')({
      // 自动添加前缀
      grid: true,
      supports: true,
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'iOS >= 10',
        'Android >= 6.0',
        '> 5% in CN',
      ],
    }),
    require('postcss-pxtorem')({
      // 转换单位
      rootValue: 16,
      propList: ['*'],
    }),
    require('postcss-bem-fix')({
      defaultNamespace: 'jv',
      style: 'suit',
      separators: {
        namespace: '-',
        modifier: '--',
        descendent: '__',
      },
      shortcuts: {
        component: 'b',
        modifier: 'm',
        descendent: 'e',
      },
    }),
  ],
}
