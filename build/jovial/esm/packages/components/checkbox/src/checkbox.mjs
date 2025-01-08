const checkboxProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
}
const checkboxEmits = {
  'update:modelValue': value => typeof value === 'boolean',
  'change': value => typeof value === 'boolean',
}

export { checkboxEmits, checkboxProps }
// # sourceMappingURL=checkbox.mjs.map
