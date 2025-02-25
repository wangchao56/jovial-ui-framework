<script setup lang="ts">
import type { ParagraphProps } from './types'
import { createNamespace } from '@jovial/utils'
import { useTypography } from './composables'
import '../style/jv-paragraph.css'

defineOptions({
  name: 'JvParagraph',
})
const props = withDefaults(defineProps<ParagraphProps>(), {
  writingMode: 'horizontal',
  fontSize: 14,
  color: undefined,
  interactive: false,
  indent: true,
  justified: false,
  punctuationCompress: true,
  lineBreak: true,
  maxWidth: '80ch',
  pageBreakInside: false,
  hangingIndent: false,
})
const bem = createNamespace('paragraph')
const { styleComputed, classComputed } = useTypography(props)
// const { processText } = usePunctuation()
// const theme = useTheme()
// const locale = useLocale()
// const defaults = useDefaults()
</script>

<template>
  <p
    :class="[
      bem.b(),
      {
        [bem.m('line-break')]: props.lineBreak,
        [bem.m('indent')]: props.indent,
        [bem.m('justified')]: props.justified,
        [bem.m('vertical')]: props.writingMode === 'vertical',
        [bem.m('page-break')]: props.pageBreakInside,
        [bem.m('hanging')]: props.hangingIndent,
      },
      classComputed,
    ]"
    :style="styleComputed"
    role="paragraph"
    :data-writing-mode="props.writingMode"
  >
    <slot />
  </p>
</template>
