import type { TypographyBaseProps } from './types'
import { useLocale } from '@jienix/jovial-locale'
import { parseColor, type RGB } from '@jienix/utils'
import { computed } from 'vue'

/**
 * 检查标点
 * @param text 文本
 * @returns 检查后的文本 避免标点被截断
 */
export function checkPunctuation(text: string) {
  const forbiddenStart = /([。，、》」』】〕〉〗〞"'])/
  const forbiddenEnd = /([《「『【〔〈〖〝"'(])/
  return text
    .replace(new RegExp(`^${forbiddenStart.source}`), '\u200B$&')
    .replace(new RegExp(`${forbiddenEnd.source}$`), '$&\u200B')
}

/**
 * 使用排版
 * @param props 排版属性
 * @returns 排版样式和类名
 */
export function useTypography(props: TypographyBaseProps) {
  const styleComputed = computed(() => ({
    '--jv-text-font-size': `${props.fontSize}px`,
    '--jv-text-color': props.color,
    'writing-mode': props.writingMode === 'vertical' ? 'vertical-rl' : '',
    'text-orientation': props.writingMode === 'vertical' ? 'upright' : '',
    'line-break': props.lineBreak ? 'strict' : 'auto',
  }))

  const classComputed = computed(() => ({
    'is-interactive': props.interactive,
    [`writing-mode-${props.writingMode}`]: !!props.writingMode,
  }))

  return { styleComputed, classComputed }
}
/**
 * 计算颜色对比度
 * @param bgColor 背景颜色
 * @param textColor 文本颜色
 * @returns 对比度 0-1
 * wcag 2.0 标准 最小对比度 4.5
 *
 * 计算公式
 *  L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * 其中，R、G、B 是颜色的 RGB 值，范围在 0-255 之间
 */
export function useContrast(bgColor: string, textColor: string) {
  const calculateLuminance = (color: RGB) => {
    const [r, g, b] = [color.r, color.g, color.b].map((c) => {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const bgLum = calculateLuminance(parseColor(bgColor))
  const textLum = calculateLuminance(parseColor(textColor))

  const contrast = (Math.max(bgLum, textLum) + 0.05)
    / (Math.min(bgLum, textLum) + 0.05)

  return Number(contrast.toFixed(2))
}

/**
 * 处理标点
 */
export function usePunctuation() {
  const locale = useLocale()
  const processText = (text: string) => {
    let processed = text

    // 中文标点处理
    if (locale.current.value.startsWith('zh')) {
      processed = processed
        .replace(/([。！？；])([^’”])/g, '$1$2')
        .replace(/（/g, ' ( ')
        .replace(/）/g, ' ) ')
    }

    // 西文标点处理
    else {
      processed = processed
        .replace(/(\w)([‘’"”])/g, '$1 $2')
        .replace(/([,.!?])(\w)/g, '$1 $2')
    }

    return processed
  }

  return { processText }
}
