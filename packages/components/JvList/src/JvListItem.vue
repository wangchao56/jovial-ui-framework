<script setup lang="ts">
import type { JvListItemActionProps, JvListItemPrependProps } from './types'
import { createNamespace } from '@jienix/utils'
import { h } from 'vue'
import { jvListItemProps, type JvListItemSlots } from './JvListItem'
import JvListItemAction from './JvListItemAction.vue'
import JvListItemContent from './JvListItemContent.vue'
import JvListItemPrepend from './JvListItemPrepend.vue'

defineOptions({
  name: 'JvListItem',
  inheritAttrs: false,
})

const props = defineProps(jvListItemProps)

defineSlots<JvListItemSlots>()

const { metaRaw } = toRefs(props)

const bem = createNamespace('list-item')

const classes = computed(() => [
  bem.b(),
  {
    'jv-list-item--active': props.active,
  },
])

const prependProps = computed<JvListItemPrependProps>(() => {
  return {
    avatar: props.prependAvatar,
    icon: props.prependIcon,
    image: props.prependImage,
  }
})

const actionProps = computed<JvListItemActionProps>(() => {
  return {
    icon: props.actionIcon,
  }
})
</script>

<template>
  <li :class="classes">
    <slot>
      <JvListItemPrepend v-bind="prependProps">
        <slot name="prepend" :prepend-props="prependProps" />
      </JvListItemPrepend>
      <slot name="content" :record="metaRaw">
        <component
          :is="h(JvListItemContent, {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
          }, {
            title: $slots.title,
            subtitle: $slots.subtitle,
            description: $slots.description,
          })"
        />
      </slot>
      <JvListItemAction v-bind="actionProps">
        <slot name="action" :action-props="actionProps" />
      </JvListItemAction>
    </slot>
  </li>
</template>
