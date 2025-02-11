import type { TypographyBaseProps } from './types'
import { useLocale } from '@jovial/locale'
import { parseColor } from '@jovial/utils'
import { computed } from 'vue'

export function checkPunctuation(text: string) {
  const forbiddenStart = /([。，、》」』】〕〉〗〞"'])/
  const forbiddenEnd = /([《「『【〔〈〖〝"'(])/
  return text
    .replace(new RegExp(`^${forbiddenStart.source}`), '\u200B$&')
    .replace(new RegExp(`${forbiddenEnd.source}$`), '$&\u200B')
}

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

export function useContrast(bgColor: string, textColor: string) {
  const calculateLuminance = (color: Color) => {
    const [r, g, b] = color.toRgb().map((c) => {
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
