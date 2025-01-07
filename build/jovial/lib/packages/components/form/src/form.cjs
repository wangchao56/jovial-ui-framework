'use strict';

const formProps = {
  model: {
    type: Object,
    default: () => ({}),
    required: true
  },
  rules: Object,
  showMessage: {
    type: Boolean,
    default: true
  }
};
const formEmits = {};
const formSlots = {};
const formProviderKey = Symbol("form");
const converArray = (rules) => {
  return rules ? Array.isArray(rules) ? rules : [rules] : [];
};

exports.converArray = converArray;
exports.formEmits = formEmits;
exports.formProps = formProps;
exports.formProviderKey = formProviderKey;
exports.formSlots = formSlots;
//# sourceMappingURL=form.cjs.map
