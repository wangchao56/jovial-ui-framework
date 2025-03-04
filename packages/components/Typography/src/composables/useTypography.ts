import type { CSSProperties } from 'vue'
import type { TypographyProps } from '../types'

export function useTypography(props: TypographyProps) {
  const styleComputed = computed<CSSProperties>(() => ({
    '--jv-text-font-size': `${props.fontSize}px`,
    '--jv-text-color': props.color,
    'writing-mode': props.writingMode === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
    'text-orientation': props.writingMode === 'vertical' ? 'upright' : 'mixed',
    'line-break': props.lineBreak ? 'strict' : 'auto',
  }))

  const classComputed = computed(() => [
    {
      'jv-typography--interactive': props.interactive,
    },
  ])

  return {
    styleComputed,
    classComputed,
  }
}
