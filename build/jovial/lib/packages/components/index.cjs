'use strict'

const index = require('./button/index.cjs')
const button = require('./button/src/button.cjs')
const index$1 = require('./icon/index.cjs')
const icon = require('./icon/src/icon.cjs')

exports.JvButton = index.default
exports.JvIcon = index$1.default
exports.buttonEmits = button.buttonEmits
exports.buttonProps = button.buttonProps
exports.iconProps = icon.iconProps
exports.iconSlots = icon.iconSlots
// # sourceMappingURL=index.cjs.map
