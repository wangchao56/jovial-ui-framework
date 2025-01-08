const formProps = {
  model: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  rules: Object,
  showMessage: {
    type: Boolean,
    default: true,
  },
}
const formEmits = {}
const formSlots = {}
const formProviderKey = Symbol('form')
function converArray(rules) {
  return rules ? Array.isArray(rules) ? rules : [rules] : []
}

export { converArray, formEmits, formProps, formProviderKey, formSlots }
// # sourceMappingURL=form.mjs.map
