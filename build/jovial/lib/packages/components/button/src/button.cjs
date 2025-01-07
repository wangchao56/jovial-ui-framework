'use strict';

const buttonProps = {
  type: {
    type: String,
    default: "default"
  },
  width: {
    type: [String, Number],
    default: "100%"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  /** 图标 */
  // icon: {
  //   type: String,
  //   default: ''
  // },
  // prependIcon: {
  //   type: String,
  //   default: ''
  // },
  // appendIcon: {
  //   type: String,
  //   default: ''
  // },
  rounded: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  stacked: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  },
  bgColor: {
    type: String,
    default: ""
  },
  variant: {
    type: String,
    default: "elevated"
  },
  /** 原生 type 属性 */
  nativeType: {
    type: String,
    default: "button"
  },
  /** 原生 autofocus 属性 */
  autofocus: {
    type: Boolean,
    default: false
  }
};
const buttonEmits = {
  click: (e) => e instanceof MouseEvent,
  mousedown: (e) => e instanceof MouseEvent,
  keydown: (e) => e instanceof MouseEvent
};

exports.buttonEmits = buttonEmits;
exports.buttonProps = buttonProps;
//# sourceMappingURL=button.cjs.map
