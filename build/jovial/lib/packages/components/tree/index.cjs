'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const withInstall = require('../../utils/with-install.cjs')
const tree = require('./src/tree.cjs')
const tree_vue_vue_type_script_setup_true_lang = require('./src/tree.vue2.cjs')

const Tree = withInstall.withInstall(tree_vue_vue_type_script_setup_true_lang.default)

exports.createOptions = tree.createOptions
exports.treeEmits = tree.treeEmits
exports.treeInjectKey = tree.treeInjectKey
exports.treeNodeContentProps = tree.treeNodeContentProps
exports.treeNodeEmits = tree.treeNodeEmits
exports.treeNodeProps = tree.treeNodeProps
exports.treePorps = tree.treePorps
exports.default = Tree
// # sourceMappingURL=index.cjs.map
