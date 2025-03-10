import type { ListItem } from '../types'
import { useVirtualList as useVueUseVirtualList } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useVirtualList(props: any) {
  const containerRef = ref<HTMLElement>()
  const wrapperRef = ref<HTMLElement>()

  // 计算每项高度
  const itemHeight = computed(() => {
    return props.itemHeight || 40
  })

  // 使用 VueUse 的虚拟列表
  const { list: visibleItems, scrollTo, scrollToIndex } = useVueUseVirtualList(
    computed(() => props.items as ListItem[]),
    {
      itemHeight: itemHeight.value,
      overscan: 5,
    },
  )

  return {
    containerRef,
    wrapperRef,
    visibleItems,
    scrollTo,
    scrollToIndex,
  }
}
