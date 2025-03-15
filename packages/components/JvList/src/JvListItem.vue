<script setup lang="ts">
import type { JvListItemActionProps, JvListItemPrependProps, ListItemType } from './types'
import { JvText, JvTitle } from '@components/Typography'
import { createNamespace } from '@jienix/utils'
import { computed, inject, unref } from 'vue'
import { type JvListContext, JvListContextKey } from './JvList'
import { type JvListItemEmits, jvListItemProps, type JvListItemSlots } from './JvListItem'
import JvListItemAction from './JvListItemAction.vue'
import JvListItemPrepend from './JvListItemPrepend.vue'

defineOptions({
  name: 'JvListItem',
  inheritAttrs: false,
})

const { metaRaw, disabled, title, subtitle, description, prependAvatar, prependIcon, prependImage, actionIcon } = defineProps(jvListItemProps)
const emit = defineEmits<JvListItemEmits>()

defineSlots<JvListItemSlots>()

const { selectedKeys, activeKey, props: listProps, handleClickListItem, handleSelectListItem } = inject(JvListContextKey) as JvListContext
const instance = getCurrentInstance()
const instanceKey = instance?.vnode.key as string

// 是否激活
const isActive = computed(() => {
  return activeKey.value === instanceKey
})
// 是否选中
const isSelected = computed(() => {
  return selectedKeys.value.includes(instanceKey)
})

const bem = createNamespace('list-item')

const classes = computed(() => [
  bem.b(),
  bem.is('active', isActive.value),
  bem.is('clickable', listProps.clickable?.value),
  bem.is('disabled', disabled),
  bem.is('selected', isSelected.value),
])

const prependProps = computed<Partial<JvListItemPrependProps>>(() => {
  return {
    avatar: prependAvatar,
    icon: prependIcon,
    image: prependImage,
  }
})

const actionProps = computed<Partial<JvListItemActionProps>>(() => {
  return {
    icon: actionIcon,
  }
})

// 处理点击事件
function handleClick(e: MouseEvent) {
  if (disabled || !listProps.clickable?.value)
    return

  const options = {
    key: instanceKey,
    isActive: isActive.value,
    isSelected: isSelected.value,
    isClickable: listProps.clickable?.value || false,
    isDisabled: disabled || false,
  }

  emit('click', e, options)

  // 如果是列表项，调用列表的点击处理函数
  if (unref(metaRaw)?.type === 'item' && listProps) {
    handleClickListItem(unref(metaRaw) as ListItemType)
  }
}

// 处理选择事件
function handleSelect() {
  if (disabled)
    return

  const options = {
    key: instanceKey,
    isActive: isActive.value,
    isSelected: isSelected.value,
    isClickable: listProps.clickable?.value || false,
    isDisabled: disabled || false,
  }

  emit('select', options)

  // 如果是列表项，调用列表的选择处理函数
  if (unref(metaRaw)?.type === 'item' && listProps) {
    handleSelectListItem(unref(metaRaw) as ListItemType)
  }
}

function handleActionClick() {
}

// 暴露方法
defineExpose({
  isActive,
  select: handleSelect,
})
</script>

<template>
  <li :class="classes" @click="handleClick">
    <slot>
      <JvListItemPrepend v-bind="prependProps">
        <slot name="prepend" :prepend-props="prependProps" />
      </JvListItemPrepend>
      <slot name="content" :record="metaRaw">
        <div :class="bem.e('content')">
          <slot v-if="unref(listProps.lines) === 'one' || unref(listProps.lines) === 'two'" name="title" :title="title">
            <JvTitle :title="title" :level="4" />
          </slot>
          <slot v-if="unref(listProps.lines) === 'two' || unref(listProps.lines) === 'three'" name="subtitle" :subtitle="subtitle">
            <JvText :text="subtitle" type="secondary" />
          </slot>
          <slot v-if="unref(listProps.lines) === 'three'" name="description" :description="description">
            <JvText :text="description" type="secondary" />
          </slot>
        </div>
      </slot>
      <JvListItemAction v-bind="actionProps" @click="handleActionClick">
        <slot name="action" :action-props="actionProps" />
      </JvListItemAction>
    </slot>
  </li>
</template>
