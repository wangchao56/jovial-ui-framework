import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref, withCtx } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import CheckBox from '../../checkbox/index.mjs'
import Icon from '../../icon/index.mjs'
import Loading from '../../internal-icon/Loading.mjs'
import Switcher from '../../internal-icon/Switcher.mjs'
import JvTreeNodeContent from './tree-node-content.mjs'
import { treeNodeEmits, treeNodeProps } from './tree.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: 'JvTreeNode',
    inheritAttrs: false,
  },
  __name: 'treeNode',
  props: treeNodeProps,
  emits: treeNodeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
    const bem = createNamespace('tree-node')
    const loading = computed(() => props.loadingKeys.has(props.node.key))
    const isSelected = computed(() => props.selectedKeys.includes(props.node.key))
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
      return openBlock(), createElementBlock(
        'div',
        {
          class: normalizeClass([
            unref(bem).b(),
            unref(bem).is('selected', isSelected.value),
            unref(bem).is('disabled', _ctx.node.disabled),
          ]),
        },
        [
          createElementVNode(
            'div',
            {
              class: normalizeClass([unref(bem).e('content')]),
              style: normalizeStyle({ paddingLeft: `${_ctx.node.level * 24}px` }),
            },
            [
              createElementVNode(
                'span',
                {
                  class: normalizeClass([
                    unref(bem).e('expand-icon'),
                    unref(bem).is('leaf', _ctx.node.isLeaf),
                    {
                      expanded: _ctx.expanded && !_ctx.node.isLeaf,
                    },
                  ]),
                  onClick: _cache[0] || (_cache[0] = () => emit('toggle', _ctx.node)),
                },
                [
                  createVNode(unref(Icon), {
                    color: 'gray',
                    size: '24',
                  }, {
                    default: withCtx(() => [
                      !loading.value ? (openBlock(), createBlock(unref(Switcher), { key: 0 })) : (openBlock(), createBlock(unref(Loading), { key: 1 })),
                    ]),
                    _: 1,
                    /* STABLE */
                  }),
                ],
                2,
                /* CLASS */
              ),
              createCommentVNode(' select-icon'),
              createCommentVNode(` <span v-if="selectable" :class="bem.e('select-icon')"></span> `),
              createCommentVNode(' \u524D\u7F00 '),
              _ctx.showCheckbox
                ? (openBlock(), createBlock(unref(CheckBox), {
                    'key': 0,
                    'model-value': props.checked,
                    'disabled': _ctx.disabled,
                    'indeterminate': _ctx.indeterminate,
                    'onChange': handleCheckboxChange,
                  }, null, 8, ['model-value', 'disabled', 'indeterminate']))
                : createCommentVNode('v-if', true),
              createCommentVNode(' label\u6E32\u67D3 '),
              createElementVNode(
                'span',
                {
                  class: normalizeClass([unref(bem).e('label')]),
                  onClick: handleSelect,
                },
                [
                  createVNode(unref(JvTreeNodeContent), {
                    node: props.node,
                  }, null, 8, ['node']),
                ],
                2,
                /* CLASS */
              ),
              createCommentVNode(' \u540E\u7F00 '),
              renderSlot(_ctx.$slots, 'suffix'),
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

export { _sfc_main as default }
// # sourceMappingURL=treeNode.vue2.mjs.map
