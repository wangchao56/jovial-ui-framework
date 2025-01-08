'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const index$1 = require('../../checkbox/index.cjs')
const index = require('../../icon/index.cjs')
const Loading = require('../../internal-icon/Loading.cjs')
const Switcher = require('../../internal-icon/Switcher.cjs')
const treeNodeContent = require('./tree-node-content.cjs')
const tree = require('./tree.cjs')

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: 'JvTreeNode',
    inheritAttrs: false,
  },
  __name: 'treeNode',
  props: tree.treeNodeProps,
  emits: tree.treeNodeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
    const bem = create.createNamespace('tree-node')
    const loading = vue.computed(() => props.loadingKeys.has(props.node.key))
    const isSelected = vue.computed(() => props.selectedKeys.includes(props.node.key))
    const handleSelect = () => {
      if (!props.selectable) {
        console.warn('Node is not selectable.')
        return
      }
      if (props.node.disabled) {
        console.warn('Node is disabled and cannot be selected.')
        return
      }
      emit('select', props.node)
    }
    function handleCheckboxChange(_checked) {
      emit('check', props.node, _checked)
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        'div',
        {
          class: vue.normalizeClass([
            vue.unref(bem).b(),
            vue.unref(bem).is('selected', isSelected.value),
            vue.unref(bem).is('disabled', _ctx.node.disabled),
          ]),
        },
        [
          vue.createElementVNode(
            'div',
            {
              class: vue.normalizeClass([vue.unref(bem).e('content')]),
              style: vue.normalizeStyle({ paddingLeft: `${_ctx.node.level * 24}px` }),
            },
            [
              vue.createElementVNode(
                'span',
                {
                  class: vue.normalizeClass([
                    vue.unref(bem).e('expand-icon'),
                    vue.unref(bem).is('leaf', _ctx.node.isLeaf),
                    {
                      expanded: _ctx.expanded && !_ctx.node.isLeaf,
                    },
                  ]),
                  onClick: _cache[0] || (_cache[0] = () => emit('toggle', _ctx.node)),
                },
                [
                  vue.createVNode(vue.unref(index.default), {
                    color: 'gray',
                    size: '24',
                  }, {
                    default: vue.withCtx(() => [
                      !loading.value ? (vue.openBlock(), vue.createBlock(vue.unref(Switcher.default), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(Loading.default), { key: 1 })),
                    ]),
                    _: 1,
                    /* STABLE */
                  }),
                ],
                2,
                /* CLASS */
              ),
              vue.createCommentVNode(' select-icon'),
              vue.createCommentVNode(` <span v-if="selectable" :class="bem.e('select-icon')"></span> `),
              vue.createCommentVNode(' \u524D\u7F00 '),
              _ctx.showCheckbox
                ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.default), {
                    'key': 0,
                    'model-value': props.checked,
                    'disabled': _ctx.disabled,
                    'indeterminate': _ctx.indeterminate,
                    'onChange': handleCheckboxChange,
                  }, null, 8, ['model-value', 'disabled', 'indeterminate']))
                : vue.createCommentVNode('v-if', true),
              vue.createCommentVNode(' label\u6E32\u67D3 '),
              vue.createElementVNode(
                'span',
                {
                  class: vue.normalizeClass([vue.unref(bem).e('label')]),
                  onClick: handleSelect,
                },
                [
                  vue.createVNode(vue.unref(treeNodeContent.default), {
                    node: props.node,
                  }, null, 8, ['node']),
                ],
                2,
                /* CLASS */
              ),
              vue.createCommentVNode(' \u540E\u7F00 '),
              vue.renderSlot(_ctx.$slots, 'suffix'),
            ],
            6,
            /* CLASS, STYLE */
          ),
        ],
        2,
        /* CLASS */
      )
    }
  },
})

exports.default = _sfc_main
// # sourceMappingURL=treeNode.vue2.cjs.map
