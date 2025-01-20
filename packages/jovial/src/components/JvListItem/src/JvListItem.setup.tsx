import { JvListContextKey } from '@components/JvList'
import { createNamespace } from '@jovial/utils'

import { createVNode, defineComponent, Fragment } from 'vue'
import { jvListItemEmits, jvListItemProps, type ListItem } from './JvListItem'

export const bem = createNamespace('list-item')

export default defineComponent({
  props: jvListItemProps,
  emits: jvListItemEmits,
  name: 'JvListItem',
  setup(props, { slots, attrs, emit }) {
    const listContext = inject(JvListContextKey)
    const { item } = props
    const isShowPrependRef = computed(() => {
      return !!(slots.prepend || item.icon)
    })
    const isShowAppendRef = computed(() => {
      return !!(slots.append)
    })

    const listItemRef = computed<ListItem>(() => {
      return {
        key: item.key,
        type: item.type,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        disabled: item.disabled,
        selected: item.selected,
        active: item.active,
      }
    })

    return () => {
      const { title, disabled, description, subtitle } = props.item
      const isShowPrepend = isShowPrependRef.value
      const isShowAppend = isShowAppendRef.value

      const children = (
        <Fragment>
          {
            isShowPrepend
              ? (
                  <div class={[bem.e('prepend')]}>
                    {slots.prepend && slots.prepend()}
                  </div>
                )
              : null
          }
          {
            slots.content
              ? <div class={bem.e('content')}>{slots.content()}</div>
              : (
                  <div class={bem.e('content')}>
                    {title && <div class={bem.e('title')}>{title}</div>}
                    {subtitle && <div class={bem.e('subtitle')}>{subtitle}</div>}
                    {description && <div class={bem.e('description')}>{description}</div>}
                  </div>
                )
          }
          {
            isShowAppend
              ? (
                  <div class={[bem.e('append')]}>
                    {slots.append && slots.append()}
                  </div>
                )
              : null
          }
        </Fragment>
      )

      return createVNode(props.tag, {
        key: attrs.key as string,
        class: [bem.b()],
        onClick: () => {
          if (disabled)
            return

          emit('click', listItemRef.value)
          listContext?.handleClickListItem(listItemRef.value)
        },
      }, children)
    }
  },
})
