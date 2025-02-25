import type { ComputedRef, MaybeRef } from '@jovial/utils'
import { getCurrentInstanceName } from '@jovial/utils'
import { computed, unref } from 'vue'

// 变体类型定义
export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain',
  'ghost',
] as const

export type Variant = (typeof allowedVariants)[number]

// 变体属性接口
export interface VariantProps {
  /** 变体类型 */
  variant?: Variant
  /** 是否禁用 */
  disabled?: boolean
  /** 颜色 */
  color?: string
  /** 背景色 */
  background?: string
}

// 变体样式接口
export interface VariantStyle {
  /** 变体类名 */
  variantClasses: string[]
  /** 变体样式 */
  variantStyles: Record<string, string>
}

/**
 * 使用变体的组合式函数
 * @param props - 变体属性
 * @param _name - 组件名称
 * @returns 变体样式和类名
 */
export function useVariant(
  props: MaybeRef<VariantProps>,
  _name = getCurrentInstanceName(),
): ComputedRef<VariantStyle> {
  return computed(() => {
    const {
      variant = 'elevated',
      disabled = false,
      color,
      background,
    } = unref(props)

    // 基础类名
    const classes = [`variant-${variant}`]

    // 禁用状态
    if (disabled) {
      classes.push('variant-disabled')
    }

    // 自定义样式
    const styles: Record<string, string> = {}

    // 处理颜色
    if (color) {
      if (['outlined', 'text', 'plain'].includes(variant)) {
        styles.color = color
      }
      else if (variant === 'tonal') {
        styles.backgroundColor = `rgba(${color}, var(--jv-variant-opacity))`
        styles.color = color
      }
    }

    // 处理背景色
    if (background && ['elevated', 'flat'].includes(variant)) {
      styles.backgroundColor = background
    }

    return {
      variantClasses: classes,
      variantStyles: styles,
    }
  })
}

/**
 * 生成变体覆盖层
 * @param isClickable - 是否可点击
 * @param name - 组件名称
 * @returns JSX元素
 */
// export function genVariantOverlays(isClickable: boolean, name: string) {
//   return (
//     <>
//       {isClickable && <span class={`${name}__overlay`} />}
//       <span class={`${name}__underlay`} />
//     </>
//   )
// }

/**
 * 变体属性工厂
 * @param props - 属性配置
 * @param _name - 组件名称
 * @returns 属性定义
 */
export function defineVariantProps(props = {}, _name = 'variant') {
  return {
    variant: {
      type: String as () => Variant,
      default: 'elevated',
      validator: (v: any) => allowedVariants.includes(v),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    background: {
      type: String,
      default: undefined,
    },
    ...props,
  }
}

// 变体工具函数
export const variantUtils = {
  /**
   * 是否为扁平变体
   * @param variant - 变体类型
   */
  isFlat: (variant: Variant) => variant === 'flat',

  /**
   * 是否为轮廓变体
   * @param variant - 变体类型
   */
  isOutlined: (variant: Variant) => variant === 'outlined',

  /**
   * 是否为文本变体
   * @param variant - 变体类型
   */
  isText: (variant: Variant) => variant === 'text' || variant === 'plain',

  /**
   * 是否需要背景色
   * @param variant - 变体类型
   */
  needsBackground: (variant: Variant) => ['elevated', 'flat', 'tonal'].includes(variant),

  /**
   * 是否为幽灵变体
   * @param variant - 变体类型
   */
  isGhost: (variant: Variant) => variant === 'ghost',

  /**
   * 是否需要边框
   * @param variant - 变体类型
   */
  needsBorder: (variant: Variant) => ['outlined', 'ghost'].includes(variant),
}

// 导出默认对象
export default {
  useVariant,
  // genVariantOverlays,
  defineVariantProps,
  variantUtils,
  allowedVariants,
}
