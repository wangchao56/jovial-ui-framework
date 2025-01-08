'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const withInstall = require('../../utils/with-install.cjs')
const virtualScroll = require('./src/virtual-scroll.cjs')
const virtual = require('./src/virtual.cjs')

const VirtualScroll = withInstall.withInstall(virtualScroll.default)

exports.virtualScrollProps = virtual.virtualScrollProps
exports.default = VirtualScroll
// # sourceMappingURL=index.cjs.map
