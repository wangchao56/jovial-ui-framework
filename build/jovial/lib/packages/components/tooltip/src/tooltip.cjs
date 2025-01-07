'use strict';

const tooltipProps = {
  activator: {
    type: [String, Object],
    default: "parent"
  },
  content: {
    type: String,
    default: ""
  },
  placement: {
    type: String,
    default: "top"
  },
  disabled: Boolean,
  offset: Number,
  trigger: {
    type: String,
    default: "hover"
  },
  virtualTriggering: Boolean,
  triggerKeys: Array
};
const tooltipEmits = {};
const tooltipSlots = {};

exports.tooltipEmits = tooltipEmits;
exports.tooltipProps = tooltipProps;
exports.tooltipSlots = tooltipSlots;
//# sourceMappingURL=tooltip.cjs.map
