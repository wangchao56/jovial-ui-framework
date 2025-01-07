import { PropType } from "vue";

export const chartProps = {
  data: {
    type: Array as PropType<number[]>,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#3498db' // 默认柱状图颜色
  }
} as const
