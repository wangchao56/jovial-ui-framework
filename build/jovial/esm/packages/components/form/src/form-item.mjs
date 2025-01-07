const formItemProps = {
  prop: {
    type: [String, Array],
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  labelPosition: {
    type: String,
    default: ""
  },
  labelWidth: [String, Number],
  required: Boolean,
  rules: [Array, Object],
  error: String,
  showMessage: {
    type: Boolean,
    default: true
  },
  inlineMessage: Boolean,
  size: {
    type: String,
    default: ""
  },
  validateStatus: {
    type: String,
    default: ""
  }
};
const formItemEmits = {};
const formItemSlots = {
  default: () => ({ name: "default" }),
  label: () => ({ name: "label" }),
  error: () => ({ name: "error" })
};
const formItemExpose = [
  "size",
  "validate",
  "validateMessage",
  "validateState",
  "resetField",
  "clearValidate"
];
const formItemProviderKey = Symbol("formItem");
var VALIDATE_STATE = /* @__PURE__ */ ((VALIDATE_STATE2) => {
  VALIDATE_STATE2["SUCCESS"] = "success";
  VALIDATE_STATE2["WARNING"] = "warning";
  VALIDATE_STATE2["ERROR"] = "error";
  VALIDATE_STATE2["VALIDATING"] = "validating";
  return VALIDATE_STATE2;
})(VALIDATE_STATE || {});

export { VALIDATE_STATE, formItemEmits, formItemExpose, formItemProps, formItemProviderKey, formItemSlots };
//# sourceMappingURL=form-item.mjs.map
