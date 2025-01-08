'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const index = require('../../virtual-scroll/index.cjs')
const tree = require('./tree.cjs')
const treeNode_vue_vue_type_script_setup_true_lang = require('./treeNode.vue2.cjs')

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: 'jv-tree' },
  __name: 'tree',
  props: tree.treePorps,
  emits: tree.treeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
    const bem = create.createNamespace('tree')
    vue.provide(tree.treeInjectKey, { slots: vue.useSlots() })
    const tree$1 = vue.ref([])
    const treeOption = tree.createOptions(
      props.keyField,
      props.labelField,
      props.childrenField,
    )
    function createTree(data, parent = null) {
      function traversalTree(data2, parent2 = null) {
        return data2.map((item) => {
          let _a
          const children = treeOption.getChildren(item) || []
          const node = {
            key: treeOption.getKey(item),
            label: treeOption.getLabel(item),
            rawNode: item,
            children: [],
            level: parent2 ? parent2.level + 1 : 0,
            // 判断 是否是叶子节点
            isLeaf: (_a = item.isLeaf) != null ? _a : children.length === 0,
            disabled: !!item.disabled,
            parentKey: parent2 == null ? undefined : parent2.key,
          }
          if (children.length > 0) {
            node.children = traversalTree(children, node)
          }
          return node
        })
      }
      const result = traversalTree(data, parent)
      return result
    }
    vue.watch(
      () => props.data,
      (newVal) => {
        tree$1.value = createTree(newVal)
      },
      { immediate: true },
    )
    const expandedKeysSet = vue.ref(new Set(props.defaultExpandedKeys))
    const flattenTree = vue.computed(() => {
      const expandedKeys = expandedKeysSet.value
      const flattedNodes = []
      const nodes = tree$1.value || []
      const stack = []
      console.time('dfs')
      for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i])
      }
      while (stack.length > 0) {
        const node = stack.pop()
        if (!node)
          continue
        const expanded = expandedKeys.has(node.key)
        flattedNodes.push({
          ...node,
        })
        if (expanded && node.children) {
          for (let i = node.children.length - 1; i >= 0; --i) {
            stack.push(node.children[i])
          }
        }
      }
      console.timeEnd('dfs')
      return flattedNodes
    })
    function isExpanded(node) {
      return expandedKeysSet.value.has(node.key)
    }
    const checkedKeysSetRef = vue.ref(new Set(props.defaultCheckedKeys))
    function isChecked(node) {
      return checkedKeysSetRef.value.has(node.key)
    }
    const indeterminateRefs = vue.ref(/* @__PURE__ */ new Set())
    function isIndeterminate(node) {
      return indeterminateRefs.value.has(node.key)
    }
    function isDisabled(node) {
      return !!node.disabled
    }
    const loadingKeysRef = vue.ref(/* @__PURE__ */ new Set())
    function triggerLoading(node) {
      if (!node.children.length && !node.isLeaf) {
        if (!vue.unref(loadingKeysRef).has(node.key)) {
          loadingKeysRef.value.add(node.key)
          if (props.onLoad) {
            props.onLoad(node.rawNode).then((_children) => {
              node.rawNode.children = _children
              node.children = createTree(_children, node)
              loadingKeysRef.value.delete(node.key)
            })
          }
        }
      }
    }
    function expandNode(node) {
      expandedKeysSet.value.add(node.key)
      triggerLoading(node)
    }
    function collapseNode(node) {
      expandedKeysSet.value.delete(node.key)
    }
    function toggleNode(node) {
      if (vue.unref(expandedKeysSet).has(node.key) && !vue.unref(loadingKeysRef).has(node.key))
        collapseNode(node)
      else expandNode(node)
    }
    const selectedKeysRef = vue.ref([])
    vue.watch(
      () => props.selectedKeys,
      (newVal) => {
        if (newVal)
          selectedKeysRef.value = newVal
      },
      { immediate: true },
    )
    function selectNode(node) {
      console.log('selectNode', node, props.selectable)
      if (!props.selectable)
        return
      let selectedKeys = Array.from(selectedKeysRef.value)
      if (props.multiple) {
        const index = selectedKeys.indexOf(node.key)
        index > -1 ? selectedKeys.splice(index, 1) : selectedKeys.push(node.key)
      }
      else {
        if (selectedKeys.includes(node.key)) {
          selectedKeys = []
        }
        else {
          selectedKeys = [node.key]
        }
      }
      emit('update:selectedKeys', selectedKeys)
    }
    function toggleCheckKeys(node, checked) {
      const checkedKeys = checkedKeysSetRef.value
      if (checked) {
        checkedKeys.add(node.key)
        indeterminateRefs.value.delete(node.key)
      }
      else {
        checkedKeys.delete(node.key)
      }
      const children = node.children
      if (children) {
        for (const child of children) {
          if (!child.disabled) {
            toggleCheckKeys(child, checked)
          }
        }
      }
    }
    function findNode(key) {
      return flattenTree.value.find(item => item.key === key)
    }
    function updateCheckedKeys(node) {
      if (node.parentKey) {
        const parentNode = findNode(node.parentKey)
        if (parentNode) {
          let allChecked = true
          let hasChecked = false
          const nodes = parentNode.children
          for (const childNode of nodes) {
            if (checkedKeysSetRef.value.has(childNode.key)) {
              hasChecked = true
            }
            else if (indeterminateRefs.value.has(childNode.key)) {
              allChecked = false
              hasChecked = true
            }
            else {
              allChecked = false
            }
          }
          if (allChecked) {
            checkedKeysSetRef.value.add(parentNode.key)
            indeterminateRefs.value.delete(parentNode.key)
          }
          else if (hasChecked) {
            checkedKeysSetRef.value.delete(parentNode.key)
            indeterminateRefs.value.add(parentNode.key)
          }
          else {
            checkedKeysSetRef.value.delete(parentNode.key)
            indeterminateRefs.value.delete(parentNode.key)
          }
          updateCheckedKeys(parentNode)
        }
      }
    }
    function checkNode(node, checked) {
      console.log('checkNode', node, checked)
      toggleCheckKeys(node, checked)
      updateCheckedKeys(node)
    }
    vue.onMounted(() => {
      props.defaultCheckedKeys.forEach((key) => {
        const node = findNode(key)
        if (node) {
          toggleCheckKeys(node, true)
        }
      })
    })
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        'div',
        {
          class: vue.normalizeClass(vue.unref(bem).b()),
        },
        [
          props.virtualScroll && flattenTree.value.length ? (vue.openBlock(), vue.createBlock(vue.unref(index.default), {
            key: 0,
            items: flattenTree.value,
            remain: 8,
            size: 35,
          }, {
            default: vue.withCtx(({ node: _node }) => [
              (vue.openBlock(), vue.createBlock(treeNode_vue_vue_type_script_setup_true_lang.default, {
                'node': _node,
                'key': _node.label,
                'label': _node.label,
                'is-leaf': _node.isLeaf,
                'level': _node.level,
                'raw-node': _node.rawNode,
                'expanded': isExpanded(_node),
                'loading-keys': loadingKeysRef.value,
                'selected-keys': selectedKeysRef.value,
                'show-checkbox': props.showCheckbox,
                'checked': isChecked(_node),
                'disabled': isDisabled(_node),
                'indeterminate': isIndeterminate(_node),
                'onToggle': toggleNode,
                'onSelect': selectNode,
                'onCheck': checkNode,
              }, null, 8, ['node', 'label', 'is-leaf', 'level', 'raw-node', 'expanded', 'loading-keys', 'selected-keys', 'show-checkbox', 'checked', 'disabled', 'indeterminate'])),
            ]),
            _: 1,
            /* STABLE */
          }, 8, ['items'])) : (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            vue.renderList(flattenTree.value, (node) => {
              return vue.openBlock(), vue.createBlock(treeNode_vue_vue_type_script_setup_true_lang.default, {
                node,
                'key': node.key,
                'label': node.label,
                'is-leaf': node.isLeaf,
                'level': node.level,
                'raw-node': node.rawNode,
                'expanded': isExpanded(node),
                'loading-keys': loadingKeysRef.value,
                'selected-keys': selectedKeysRef.value,
                'show-checkbox': props.showCheckbox,
                'checked': isChecked(node),
                'disabled': isDisabled(node),
                'indeterminate': isIndeterminate(node),
                'onToggle': toggleNode,
                'onSelect': selectNode,
                'onCheck': checkNode,
              }, null, 8, ['node', 'label', 'is-leaf', 'level', 'raw-node', 'expanded', 'loading-keys', 'selected-keys', 'show-checkbox', 'checked', 'disabled', 'indeterminate'])
            }),
            128,
            /* KEYED_FRAGMENT */
          )),
        ],
        2,
        /* CLASS */
      )
    }
  },
})

exports.default = _sfc_main
// # sourceMappingURL=tree.vue2.cjs.map
