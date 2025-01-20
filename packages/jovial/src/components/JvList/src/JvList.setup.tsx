import type { ListItem } from '@/components/JvListItem'
import JvDivider from '@/components/JvDivider'
import { createNamespace } from '@jovial/utils'
import { createVNode, defineComponent, Fragment } from 'vue'
import { JvListContextKey, jvListEmits, jvListProps } from './JvList'
import JvListChildren from './JvListChildren.setup'

export function useRender(render: () => VNode): void {
  const vm = getCurrentInstance() as any
  vm.render = render
}

export default defineComponent(
  {
    name: 'JvList',
    props: jvListProps,
    emits: jvListEmits,
    inheritAttrs: false,
    setup(props, { emit, slots }) {
      const bem = createNamespace('list')
      const listItemKeys = ref<Set<string>>()
      const handleClickListItem = (val: ListItem) => {
        emit('clickItem', val)
        listItemKeys.value?.add(val.key)
      }

      provide(JvListContextKey, {
        handleClickListItem,
      })

      return () => {
        const { bordered, items, showDivider } = props

        const children = (
          <Fragment>
            {
              slots.header?.()
            }
            {
              showDivider && <JvDivider />
            }
            {
              slots.default && slots.default()
            }
            <JvListChildren items={items} />
            {
              showDivider && <JvDivider />
            }
            {
              slots.footer?.()
            }
          </Fragment>
        )

        return createVNode(props.tag, {
          class: [bem.b(), bem.is('bordered', bordered)],
        }, children)
      }
    },
  },
)
