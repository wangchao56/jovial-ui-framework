module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: ['!packages/jovial/src/components/**/*'],
  plugins: [
    'stylelint-order', // 用于 CSS 属性排序
  ],
  rules: {
    // 允许使用自定义属性
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
          '/^--jv-/',
        ],
      },
    ],
    // 允许空源
    'no-empty-source': null,
    // 禁用 at-rule 描述符检查
    'at-rule-descriptor-no-unknown': null,
    'at-rule-descriptor-value-no-unknown': null,
    // 允许未知的 at 规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // postcss-bem-fix
          'b',
          'e',
          'm',
          'when',
          // postcss-mixins
          'define-mixin',
          'mixin',
          // postcss-each
          'each',
          // postcss-for
          'for',
          // 其他自定义 at 规则
          'include',
          'content',
          'extend',
        ],
      },
    ],

    // CSS 属性顺序
    'order/properties-order': [
      // 布局属性
      {
        groupName: 'Layout',
        properties: [
          'display',
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'float',
          'clear',
        ],
      },
      // 盒模型
      {
        groupName: 'Box Model',
        properties: [
          'width',
          'height',
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
        ],
      },
      // 视觉效果
      {
        groupName: 'Visual',
        properties: [
          'background',
          'border',
          'border-radius',
          'box-shadow',
          'opacity',
        ],
      },
      // 文字样式
      {
        groupName: 'Typography',
        properties: [
          'color',
          'font-size',
          'font-weight',
          'line-height',
          'text-align',
          'text-decoration',
        ],
      },
      // 其他
      {
        groupName: 'Misc',
        properties: [
          'cursor',
          'z-index',
          'transition',
          'transform',
        ],
      },
    ],

    // 颜色格式
    'color-function-notation': 'modern',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,

    // 字体
    'font-family-name-quotes': 'always-where-required',
    'font-family-no-duplicate-names': true,

    'unit-allowed-list': ['px', 'em', 'rem', '%', 'deg', 'ms', 's', 'vh', 'vw', 'fr', 'lh', 'ch'],

    // 简写属性
    'shorthand-property-no-redundant-values': true,

    // 注释
    'comment-empty-line-before': 'always',

    // 其他
    'no-duplicate-selectors': true,
    'no-invalid-double-slash-comments': true,
    'declaration-no-important': null,
    'declaration-property-value-no-unknown': [
      true,
      {
        ignoreProperties: {
          'text-justify': ['inter-ideograph'],
        },
      },
    ],
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'number-max-precision': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
  },
}
