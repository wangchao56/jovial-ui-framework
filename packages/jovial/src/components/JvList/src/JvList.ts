import type { JvListItemProps, ListItem } from '@components/JvListItem'
import type { InjectionKey, VNodeChild } from 'vue'

export const jvListProps = {
  tag: {
    type: String as PropType<string>,
    default: 'ul',
    description: '自定义根标签',
    required: false,
  },
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
    description: '列表数据',
    required: false,
  },
  bordered: {
    type: Boolean,
    description: '是否显示边框',
    required: false,
  },
  clickable: {
    type: Boolean,
    description: '列表项是否有可点击样式',
    required: false,
  },
  hoverable: {
    type: Boolean,
    description: '列表项是否有悬浮样式',
    required: false,
  },
  showDivider: {
    type: Boolean,
    default: false,
    description: '是否显示标项之间的分割线',
    required: false,
  },
} as const

export interface JvListProps {
  tag: string
  items: ListItem[]
  bordered: boolean
  clickable: boolean
  hoverable: boolean
  showDivider: boolean
}

export const jvListEmits = {
  clickItem: (val: ListItem) => val,
  selectItem: (val: ListItem) => val,
  activateItem: (val: ListItem) => val,
} as const

export interface JvListEmits {
  (e: 'clickItem', val: ListItem): void
  (e: 'selectItem', val: ListItem): void
  (e: 'activateItem', val: ListItem): void
}

export const jvListSlots = {
  [Symbol('default')]: (..._args: any[]) => null as unknown as VNodeChild,
  [Symbol('item')]: (..._args: JvListItemProps[]) => null as unknown as VNodeChild,
  [Symbol('header')]: () => null as unknown as VNodeChild,
  [Symbol('footer')]: () => null as unknown as VNodeChild,
}

export interface JvListSlots {
  default: () => VNodeChild
  item: (props: JvListItemProps) => VNodeChild
  header: () => VNodeChild
  footer: () => VNodeChild
}

export interface JvListExpose {}
export const JvListContextKey: InjectionKey<{
  handleClickListItem: (val: ListItem) => void
}> = Symbol('JvListContextKey')
