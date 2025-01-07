'use strict';

var common = require('../../../utils/common.cjs');

const inputProps = {};
const inputEmits = {
  "update:modelValue": (value) => common.isString(value),
  "update:disabled": (value) => true,
  "update:readonly": (value) => true,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  change: (value) => common.isString(value),
  input: (value) => common.isString(value),
  keydown: (e) => e instanceof KeyboardEvent,
  clear: () => true
};

exports.inputEmits = inputEmits;
exports.inputProps = inputProps;
//# sourceMappingURL=input.cjs.map
