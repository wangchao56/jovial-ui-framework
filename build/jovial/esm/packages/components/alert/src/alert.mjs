const alertProps = {
  title: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "info"
  },
  message: {
    type: String,
    required: true
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeText: {
    type: String
  },
  showIcon: {
    type: Boolean,
    default: false
  }
};
const alertEmits = {
  close: null
};
const alertSlots = {
  default: null
};

export { alertEmits, alertProps, alertSlots };
//# sourceMappingURL=alert.mjs.map
