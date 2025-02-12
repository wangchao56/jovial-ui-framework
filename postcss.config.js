module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-for'),
    require('postcss-conditionals'),
    require('postcss-mixins')({
      plugins: {
        beforeEach: [require('postcss-each-variables')],
      },
    }),
    require('postcss-each')({
      plugins: {
        beforeEach: [
          require('postcss-for'),
          require('postcss-conditionals'),
          require('postcss-color-mix'),
        ],
      },
    }),
    require('postcss-nested'),
    require('postcss-bem-fix')({
      defaultNamespace: 'jv',
      style: 'suit',
      separators: { namespace: '-', modifier: '--', descendent: '__' },
      shortcuts: { component: 'b', modifier: 'm', descendent: 'e' },
    }),
    require('autoprefixer')({
      grid: true,
      supports: true,
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead', 'iOS >= 10', 'Android >= 6.0', '> 5% in CN', 'IE 10-11'],
    }),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
    }),
  ],
}
