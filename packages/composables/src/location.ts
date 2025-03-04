import type { Anchor } from '@jienix/utils'

// Types
import type { CSSProperties, PropType } from 'vue'
import { parseAnchor, propsFactory } from '@jienix/utils'

// Utilities
import { computed } from 'vue'
// Composables
import { useRtl } from './locale'

const oppositeMap = {
  center: 'center',
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const

export interface LocationProps {
  location: Anchor | null | undefined
}

export const makeLocationProps = propsFactory(
  {
    location: String as PropType<Anchor | null>,
  },
  'location',
)

/**
 * 位置计算钩子
 * 作用：根据给定的位置值计算对应的CSS样式
 *
 * @param props - 位置属性对象
 * @param opposite - 是否启用反向位置计算（默认false）
 * @param offset - 偏移量计算函数（可选）
 * @returns {ComputedRef<CSSProperties>} 计算后的CSS样式对象
 *
 * 核心功能：
 * 1. 解析位置值并计算对应的CSS样式
 * 2. 支持反向位置计算
 * 3. 响应式计算结果
 */
export function useLocation(
  props: LocationProps,
  opposite = false,
  offset?: (side: string) => number,
) {
  const { isRtl } = useRtl()

  const locationStyles = computed(() => {
    if (!props.location)
      return {}

    const { side, align } = parseAnchor(
      props.location.split(' ').length > 1
        ? props.location
        : (`${props.location} center` as Anchor),
      isRtl.value,
    )

    function getOffset(side: string) {
      return offset ? offset(side) : 0
    }

    const styles = {} as CSSProperties

    if (side !== 'center') {
      if (opposite)
        styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`
      else styles[side] = 0
    }
    if (align !== 'center') {
      if (opposite)
        styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`
      else styles[align] = 0
    }
    else {
      if (side === 'center') {
        styles.top = styles.left = '50%'
      }
      else {
        styles[
          (
            {
              top: 'left',
              bottom: 'left',
              left: 'top',
              right: 'top',
            } as const
          )[side]
        ] = '50%'
      }
      styles.transform = {
        top: 'translateX(-50%)',
        bottom: 'translateX(-50%)',
        left: 'translateY(-50%)',
        right: 'translateY(-50%)',
        center: 'translate(-50%, -50%)',
      }[side]
    }

    return styles
  })

  return { locationStyles }
}
