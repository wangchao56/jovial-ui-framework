import JvAvatar from '@/components/JvAvatar'
import JvIcon from '@/components/JvIcon'
import { JvListContextKey } from '@components/JvList'
import { createNamespace } from '@jienix/utils'
import { computed, createVNode, defineComponent, Fragment, inject } from 'vue'
import {
  type EmitOptions,
  jvListItemEmits,
  jvListItemProps,
  type JvListItemSlotsType,
} from './types'

export const bem = createNamespace('list-item')

export default defineComponent({
  name: 'JvListItem',
  props: jvListItemProps,
  emits: jvListItemEmits,
  slots: Object as JvListItemSlotsType,
  expose: ['isActive'],
  inheritAttrs: false,
  setup(props, { slots, emit }) {
    const listContext = inject(JvListContextKey) // 获取列表上下文 只读取 不修改

    // 创建一个新对象而不是直接修改 props
    const finalProps = computed(() => ({
      ...props,
      ...props.metaRaw?.props,
    }))

    // 设置class
    const borderRadiusClass = computed(() => {
      let className = ''
      if (typeof finalProps.value.rounded === 'boolean') {
        className = finalProps.value.rounded ? 'rounded' : ''
      }
      if (typeof finalProps.value.rounded === 'string') {
        // 预设的圆角类名直接返回
        if (
          finalProps.value.rounded.startsWith('rounded-')
          || finalProps.value.rounded === 'rounded'
        ) {
          className = finalProps.value.rounded
        }
        // 其他字符串值作为自定义圆角值
        className = `rounded-${finalProps.value.rounded}`
      }

      if (typeof finalProps.value.rounded === 'number') {
        className = `${finalProps.value.rounded}px`
      }
      return className
    })

    const itemStyle = computed(() => {
      const style: Record<string, string> = {}

      // 处理自定义圆角
      if (typeof finalProps.value.rounded === 'number') {
        style.borderRadius = `${finalProps.value.rounded}px`
      }

      // 处理激活和非激活状态的背景色
      if (finalProps.value.activeColor && finalProps.value.active) {
        style.backgroundColor = finalProps.value.activeColor
      }
      else if (finalProps.value.inactiveColor && !finalProps.value.active) {
        style.backgroundColor = finalProps.value.inactiveColor
      }
      return style
    })

    const isExpanded = useModel(finalProps.value, 'expanded')
    const emitOptions = computed<EmitOptions>(() => {
      return {
        key: finalProps.value.metaRaw?.key,
        isActive: finalProps.value.active,
        isSelected: finalProps.value.selected,
        isClickable: finalProps.value.clickable,
        isHoverable: finalProps.value.hoverable,
        isDisabled: finalProps.value.disabled,
        isExpanded: isExpanded.value,
      }
    })

    return () => {
      const {
        title,
        subtitle,
        description,
        prependAvatar,
        prependIcon,
        appendIcon,
      } = finalProps.value
      // prpand 渲染什么内容
      const renderPrepend = () => {
        if (slots.prepend) {
          return createVNode(Fragment, null, slots.prepend())
        }
        if (prependAvatar) {
          return createVNode(JvAvatar, {
            src: prependAvatar,
          })
        }
        if (prependIcon) {
          return createVNode(JvIcon, {
            name: prependIcon,
          })
        }
        return null
      }
      // content 渲染什么内容
      const renderContent = () => {
        if (slots.default) {
          return <div class={bem.e('content')}>{slots.default()}</div>
        }
        return (
          <div class={bem.e('content')}>
            {slots.title ? slots.title() : title}
            {slots.subtitle ? slots.subtitle() : subtitle}
            {slots.description ? slots.description() : description}
          </div>
        )
      }
      // append 渲染什么内容
      const renderAppend = () => {
        if (slots.append) {
          return slots.append()
        }
        if (appendIcon) {
          return <JvIcon name={appendIcon} />
        }
      }

      return createVNode(
        props.tag,
        {
          key: finalProps.value.metaRaw?.key,
          class: [
            bem.b(),
            borderRadiusClass.value,
            bem.is('disabled', finalProps.value.disabled),
            bem.is('selected', finalProps.value.selected),
            bem.is('active', finalProps.value.active),
            bem.is(
              'clickable',
              finalProps.value.clickable || finalProps.value.link,
            ),
            bem.is('hoverable', finalProps.value.hoverable),
            {
              'cursor-pointer': finalProps.value.link || finalProps.value.href,
            },
            props.class,
          ],
          style: itemStyle.value,
          href: finalProps.value.href,
          onClick: (e: MouseEvent | KeyboardEvent) => {
            if (finalProps.value.disabled)
              return
            emit('click', e, emitOptions.value)
            if (
              listContext?.props.selectable
              && finalProps.value.clickable
              && finalProps.value.metaRaw.type === 'item'
            ) {
              emit('select', emitOptions.value)
              return
            }
            if (
              finalProps.value.expandable
              && finalProps.value.metaRaw.type === 'group'
            ) {
              isExpanded.value = !isExpanded.value // 切换展开状态
              emit('expand', emitOptions.value)
              return
            }
            if (finalProps.value.link && finalProps.value.href) {
              emit('click', e, emitOptions.value)
            }
          },
        },
        [
          <Fragment>
            <div
              class={[
                bem.e('prepend'),
                { 'divider-right': finalProps.value.showDivider },
              ]}
            >
              {renderPrepend()}
            </div>
            {renderContent()}
            <div
              class={[
                bem.e('append'),
                { 'divider-left': finalProps.value.showDivider },
              ]}
            >
              {renderAppend()}
            </div>
            {finalProps.value.expandable
            && isExpanded.value
            && slots.expand && (
              <div class={bem.e('expand')}>{slots.expand()}</div>
            )}
            {' '}
          </Fragment>,
        ],
      )
    }
  },
})
