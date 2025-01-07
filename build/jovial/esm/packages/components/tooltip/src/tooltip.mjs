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

export { tooltipEmits, tooltipProps, tooltipSlots };
//# sourceMappingURL=tooltip.mjs.map
