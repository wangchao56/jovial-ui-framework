'use strict'

const popperProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  reference: {
    type: Object,
    default: null,
  },
  /** 偏移量 */
  offset: {
    type: Number,
    default: 8,
  },
  /** 翻转 */
  flip: {
    type: Boolean,
    default: false,
  },
  /** 跟随 */
  followCursor: {
    type: Boolean,
    default: false,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
  /** 偏移 */
  shift: {
    type: Boolean,
    default: true,
  },
  /** 对齐方式 */
  placement: {
    type: String,
    default: 'top-center',
  },
}
const popperEmits = {}
const popperSlots = {}

exports.popperEmits = popperEmits
exports.popperProps = popperProps
exports.popperSlots = popperSlots
// # sourceMappingURL=popper.cjs.map
