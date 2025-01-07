import { isString } from '../../../utils/common.mjs';

const inputProps = {};
const inputEmits = {
  "update:modelValue": (value) => isString(value),
  "update:disabled": (value) => true,
  "update:readonly": (value) => true,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  change: (value) => isString(value),
  input: (value) => isString(value),
  keydown: (e) => e instanceof KeyboardEvent,
  clear: () => true
};

export { inputEmits, inputProps };
//# sourceMappingURL=input.mjs.map
