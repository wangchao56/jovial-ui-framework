import JvIcon from '@/components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { defineComponent, inject, type Slot, type SlotsType } from 'vue'
import { Transition } from 'vue'
import { JvListContextKey } from './JvList'
import JvListChildren from './JvListChildren.setup'
import JvListItem from './JvListItem.setup'
import { type EmitOptions, jvListGroupEmits, jvListGroupProps } from './types'

export default defineComponent({
  name: 'JvListGroup',
  props: jvListGroupProps,
  slots: Object as SlotsType<{
    default: Slot
    header: Slot
  }>,
  emits: jvListGroupEmits,
  setup(props, { emit }) {
    const bem = createNamespace('list-group')
    const listContext = inject(JvListContextKey) // 获取列表上下文 只读取 不修改
    // 是否展开
    const isExpanded = ref(props.expanded)

    const handleExpand = (options: EmitOptions) => {
      isExpanded.value = options.isExpanded
      emit('update:expanded', options.isExpanded)
    }

    const renderIcon = () => {
      const iconName = isExpanded.value ? listContext?.props.collapseIcon : listContext?.props.expandIcon
      if (!iconName || props.items.length === 0)
        return null
      // 是否为自定义图标
      return (
        <JvIcon
          class={[
            bem.e('icon'),
            bem.is('expanded', isExpanded.value),
            bem.is('custom', !iconName),
          ]}
          name={iconName}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#888888" d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0" />
          </svg>
        </JvIcon>
      )
    }

    return () => {
      const { title, metaRaw } = props
      return (
        <li class={bem.b()} key={metaRaw?.key}>
          <JvListItem
            tag="div"
            class={bem.e('header')}
            key={metaRaw?.key}
            expandable={true}
            expanded={isExpanded.value}
            onExpand={handleExpand}
            metaRaw={metaRaw}
            v-slots={{
              title: () => (<span class={bem.e('title')}>{title}</span>),
              append: () => renderIcon(),
            }}
          >
          </JvListItem>
          <Transition name="jv-expand">
            <JvListChildren
              v-show={isExpanded.value}
              class={[bem.e('content'), bem.is('expanded', isExpanded.value)]}
              items={props.items}
              level={(listContext?.level || 0) + 1}
            />
          </Transition>
        </li>
      )
    }
  },
})
