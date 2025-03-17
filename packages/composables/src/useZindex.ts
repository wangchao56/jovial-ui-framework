import { ref } from 'vue'

const zIndex = ref(2000)

// 一些组件需要使用z-index，但是z-index需要自增，所以需要一个自增的z-index
// 组件的z-index定义
export const zIndexMap = {
  // 弹窗
  dialog: 2000,
  // 抽屉
  drawer: 1800,
  // 模态框
  modal: 1700,
  // 提示框
  tooltip: 1600,
  // 下拉框
  dropdown: 1500,
  // 选择器
  select: 1400,
}

export function useZIndex() {
  const next = () => {
    zIndex.value += 1
    return zIndex.value
  }
  return {
    next,
    current: zIndex,
  }
}
