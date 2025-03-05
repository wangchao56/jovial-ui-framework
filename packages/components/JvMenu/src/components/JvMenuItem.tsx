import type { ExtractPropTypes, PropType } from 'vue'
import type { MenuItem } from '../types'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { computed, defineComponent, inject } from 'vue'
import { JvMenuContextKey } from '../JvMenu'

const jvMenuItemProps = {
  icon: { type: [String, Function] as PropType<string | ((item: MenuItem) => VNode)>, default: '' },
  label: {
    type: [String, Function] as PropType<string | ((item: MenuItem) => VNode)>,
    required: true,
  },
  tooltip: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  record: { type: Object as PropType<MenuItem>, required: true },

} as const

export type JvMenuItemProps = ExtractPropTypes<typeof jvMenuItemProps>

export default defineComponent({
  name: 'JvMenuItem',
  props: jvMenuItemProps,
  setup(props, { slots }) {
    const bem = createNamespace('menu-item')
    const menuContext = inject(JvMenuContextKey)
    if (!menuContext) {
      throw new Error('JvMenuItem 必须在 JvMenu 组件内使用')
    }
    const { selectedKeys, onSelect } = menuContext

    const isSelected = computed(() => {
      return selectedKeys.value.has(props.record.key)
    })

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation()
      onSelect(props.record.key, props.record as MenuItem)
    }

    const renderIcon = () => {
      if (!props.icon)
        return null
      if (typeof props.icon === 'function') {
        return props.icon(props.record)
      }
      return <JvIcon name={props.icon} />
    }

    const renderLabel = () => {
      if (slots.default) {
        return slots.default()
      }
      return props.label
    }
    // tabindex 设置为 -1 表示该元素不会获得焦点
    return () => {
      return (
        <li
          role="menuitem"
          tabindex={props.disabled ? -1 : 0}
          class={[
            bem.b(),
            bem.is('selected', isSelected.value),
            bem.is('disabled', props.disabled),
          ]}
          onClick={handleClick}
        >
          {props.icon && <span class={bem.e('icon')}>{renderIcon()}</span>}
          <span class={bem.e('label')}>{renderLabel()}</span>
        </li>
      )
    }
  },
})
