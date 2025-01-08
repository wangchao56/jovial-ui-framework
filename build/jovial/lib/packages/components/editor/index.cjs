'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const withInstall = require('../../utils/with-install.cjs')
const editor$1 = require('./src/editor.cjs')
const editor_vue_vue_type_script_setup_true_lang = require('./src/editor.vue2.cjs')

const editor = withInstall.withInstall(editor_vue_vue_type_script_setup_true_lang.default)

exports.editorEmits = editor$1.editorEmits
exports.editorProps = editor$1.editorProps
exports.editorSlots = editor$1.editorSlots
exports.default = editor
// # sourceMappingURL=index.cjs.map
