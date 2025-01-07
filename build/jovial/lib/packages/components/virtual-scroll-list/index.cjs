'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var virtualScrollList_setup = require('./src/virtual-scroll-list.setup.cjs');
var withInstall = require('../../utils/with-install.cjs');
var virtualScrollList = require('./src/virtual-scroll-list.cjs');
var virtual = require('./src/virtual.cjs');
var props = require('./src/props.cjs');

const VirtualScrollList = withInstall.withInstall(virtualScrollList_setup.default);

exports.virtualScrollListEmits = virtualScrollList.virtualScrollListEmits;
exports.virtualScrollListProps = virtualScrollList.virtualScrollListProps;
exports.virtualScrollListSlots = virtualScrollList.virtualScrollListSlots;
exports.initVirtual = virtual.initVirtual;
exports.virtualItemProps = props.virtualItemProps;
exports.virtualProps = props.virtualProps;
exports.default = VirtualScrollList;
//# sourceMappingURL=index.cjs.map
