import type { MenuItem, SubMenuType } from '../types'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { defineComponent, inject, type SlotsType } from 'vue'
import { JvMenuContextKey } from '../JvMenu'
import JvMenuChildren from './JvMenuChildren.vue'

const jvSubMenuTitleProps = {
  label: { type: [String, Function] as PropType<string | ((item: SubMenuType) => VNode)>, required: true },
  icon: { type: [String, Function] as PropType<string | ((item: MenuItem) => VNode)>, default: '' },
  disabled: Boolean,
  expanded: Boolean,
  record: { type: Object as PropType<SubMenuType>, required: true },
} as const

export type JvSubMenuTitleProps = ExtractPropTypes<typeof jvSubMenuTitleProps>

const JvSubMenuTitle = defineComponent({
  name: 'JvSubMenuTitle',
  props: jvSubMenuTitleProps,
  slots: Object as SlotsType<{
    label: () => VNode
    icon: () => VNode
  }>,
  setup(props, { slots }) {
    const bem = createNamespace('submenu-title')
    const menuContext = inject(JvMenuContextKey)
    if (!menuContext) {
      throw new Error('JvSubMenuTitle 必须在 JvMenu 组件内使用')
    }
    const { onOpenChange, openKeys } = menuContext
    const expanded = computed(() => openKeys.value.has(props.record.key))

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation()
      onOpenChange(props.record.key, !expanded.value, props.record as SubMenuType)
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
      if (slots.label) {
        return slots.label()
      }
      if (typeof props.label === 'function') {
        return props.label(props.record)
      }
      return props.label
    }
    return () => (
      <div onClick={handleClick} role="menuitem" tabindex={-1} class={bem.b()}>
        {props.icon && <span class={bem.e('icon')}>{renderIcon()}</span>}
        <span class={bem.e('label')}>{renderLabel()}</span>
        <span class={bem.e('expand')}>
          <JvIcon name={expanded.value ? 'chevron-up' : 'chevron-down'} />
        </span>
      </div>
    )
  },
})

const jvSubMenuProps = {
  label: { type: [String, Function] as PropType<string | ((item: SubMenuType) => VNode)>, required: true },
  icon: { type: [String, Function] as PropType<string | ((item: MenuItem) => VNode)>, default: '' },
  disabled: Boolean,
  record: { type: Object as PropType<SubMenuType>, required: true },
} as const

export type JvSubMenuProps = ExtractPropTypes<typeof jvSubMenuProps>

export default defineComponent({
  name: 'JvSubMenu',
  props: jvSubMenuProps,
  slots: Object as SlotsType<{
    label: () => VNode
    icon: () => VNode
  }>,
  setup(props, { slots }) {
    const bem = createNamespace('submenu')
    const menuContext = inject(JvMenuContextKey)
    if (!menuContext) {
      throw new Error('JvSubMenu 必须在 JvMenu 组件内使用')
    }
    const { openKeys } = menuContext
    const isOpen = computed(() => openKeys.value.has(props.record.key))
    return () => {
      return (
        <li
          role="presentation"
          class={[
            bem.b(),
            bem.is('open', isOpen.value),
            bem.is('disabled', props.disabled),
          ]}
        >
          {/* 标题 */}
          <JvSubMenuTitle record={props.record} label={props.label} icon={props.icon} expanded={isOpen.value} v-slots={slots} />
          {/* 内容 */}
          <ul role="menu" v-show={isOpen.value} class={bem.e('content')}>
            <JvMenuChildren items={props.record.children!} />
          </ul>
        </li>
      )
    }
  },
})
