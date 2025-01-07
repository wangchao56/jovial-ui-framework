'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var virtualScroll = require('./src/virtual-scroll.cjs');
var withInstall = require('../../utils/with-install.cjs');
var virtual = require('./src/virtual.cjs');

const VirtualScroll = withInstall.withInstall(virtualScroll.default);

exports.virtualScrollProps = virtual.virtualScrollProps;
exports.default = VirtualScroll;
//# sourceMappingURL=index.cjs.map
