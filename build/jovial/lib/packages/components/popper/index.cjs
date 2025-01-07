'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popper_setup = require('./src/popper.setup.cjs');
var withInstall = require('../../utils/with-install.cjs');
var popper = require('./src/popper.cjs');

const JvPopper = withInstall.withInstall(popper_setup.default);

exports.popperEmits = popper.popperEmits;
exports.popperProps = popper.popperProps;
exports.popperSlots = popper.popperSlots;
exports.default = JvPopper;
//# sourceMappingURL=index.cjs.map
