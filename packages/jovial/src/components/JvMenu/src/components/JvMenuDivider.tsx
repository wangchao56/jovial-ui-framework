import type { MenuDividerType } from '../types'
import { createNamespace } from '@jovial/utils'
import { defineComponent } from 'vue'

export const jvMenuDividerProps = {
  dashed: Boolean as PropType<MenuDividerType['dashed']>,
} as const

export type JvMenuDividerProps = ExtractPropTypes<typeof jvMenuDividerProps>

export default defineComponent({
  name: 'JvMenuDivider',
  props: jvMenuDividerProps,
  setup(props) {
    const bem = createNamespace('menu-divider')
    return () => (
      <li role="separator" class={[bem.b(), bem.is('dashed', props.dashed)]} />
    )
  },
})
