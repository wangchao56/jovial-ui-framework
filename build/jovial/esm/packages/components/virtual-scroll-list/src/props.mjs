const virtualProps = {
  dataSource: {
    type: Array,
    default: () => [],
  },
  dataKey: {
    type: String,
    default: 'id',
  },
  keeps: {
    type: Number,
    default: 20,
  },
  estimateSize: {
    type: Number,
    default: 50,
  },
  dataComponent: {
    type: [Object, Function],
    required: true,
  },
  // 是否启用动态计算组件高度
  isDynamic: {
    type: Boolean,
    default: false,
  },
}
const virtualItemProps = {
  index: {
    type: Number,
    required: true,
  },
  uniqueKey: {
    type: String,
    default: val => String(val),
  },
  estimateSize: {
    type: Number,
    default: 50,
  },
  source: {
    type: Object,
    required: true,
  },
  component: {
    type: [Object, Function],
    required: true,
  },
}

export { virtualItemProps, virtualProps }
// # sourceMappingURL=props.mjs.map
