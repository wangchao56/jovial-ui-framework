'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const withInstall = require('../../utils/with-install.cjs')
const props = require('./src/props.cjs')
const virtualScrollList = require('./src/virtual-scroll-list.cjs')
const virtualScrollList_setup = require('./src/virtual-scroll-list.setup.cjs')
const virtual = require('./src/virtual.cjs')

const VirtualScrollList = withInstall.withInstall(virtualScrollList_setup.default)

exports.virtualScrollListEmits = virtualScrollList.virtualScrollListEmits
exports.virtualScrollListProps = virtualScrollList.virtualScrollListProps
exports.virtualScrollListSlots = virtualScrollList.virtualScrollListSlots
exports.initVirtual = virtual.initVirtual
exports.virtualItemProps = props.virtualItemProps
exports.virtualProps = props.virtualProps
exports.default = VirtualScrollList
// # sourceMappingURL=index.cjs.map
