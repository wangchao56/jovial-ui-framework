import type { PropType, SlotsType } from 'vue'
import type { MenuItem, MenuItemGroupType } from '../types'
import { createNamespace } from '@jovial/utils'
import { defineComponent } from 'vue'
import { JvMenuContextKey } from '../JvMenu'
import JvMenuChildren from './JvMenuChildren.vue'

const jvMenuGroupProps = {
  label: { type: String, required: true },
  children: { type: Array as PropType<MenuItem[]>, required: true },
  record: { type: Object as PropType<MenuItemGroupType>, required: true },
} as const

export type JvMenuGroupProps = ExtractPropTypes<typeof jvMenuGroupProps>

export default defineComponent({
  name: 'JvMenuGroup',
  props: jvMenuGroupProps,
  slots: Object as SlotsType<{
    label: () => VNode
  }>,
  emits: {
    'update:expandedKey': (key: PropertyKey[]) => Array.isArray(key),
  },
  setup(props, { slots }) {
    const bem = createNamespace('menu-group')
    const menuContext = inject(JvMenuContextKey)
    if (!menuContext) {
      throw new Error('JvMenuGroup 必须在 JvMenu 组件内使用')
    }
    return () => {
      const { record } = props
      return (
        <li role="presentation" key={record.key} id={record.key.toString()} class={bem.b()}>
          <div role="presentation" class={bem.e('label')}>{slots.label?.() || props.label}</div>
          <ul role="group" class={bem.e('content')}>
            <JvMenuChildren items={props.children} />
          </ul>
        </li>
      )
    }
  },
})
