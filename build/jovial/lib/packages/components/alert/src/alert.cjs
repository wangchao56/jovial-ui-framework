'use strict';

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

exports.alertEmits = alertEmits;
exports.alertProps = alertProps;
exports.alertSlots = alertSlots;
//# sourceMappingURL=alert.cjs.map
