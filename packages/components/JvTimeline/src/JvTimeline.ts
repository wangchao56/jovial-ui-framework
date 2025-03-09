import type { ExtractPropTypes, PropType, Ref, Slot } from 'vue'

interface TimelineItem {
  /**
   * 时间轴项的标题
   */
  title: string
  /**
   * 时间轴项的内容
   */
  content: string
  /**
   * 时间轴项的时间
   */
  time: string
}

export const jvTimelineProps = {
  /**
   * 时间轴列表
   */
  timelineList: {
    type: Array as PropType<TimelineItem[]>,
    default: () => [],
  },
  /**
   * 时间轴方向
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
} as const

export type JvTimelineProps = ExtractPropTypes<typeof jvTimelineProps>

export interface JvTimelineEmits {
  /**
   * 点击时间轴项
   */
  (e: 'clickItem', item: TimelineItem): void
}

export interface JvTimelineSlots {
  /**
   * 默认插槽
   */
  default?: Slot
  /**
   * 时间轴项插槽
   */
  item?: Slot<{ item: TimelineItem }>
  /**
   * 时间轴点插槽
   */
  dot?: Slot<{ item: TimelineItem }>
}

export interface JvTimelineExpose {
  /**
   * 根元素
   */
  root: Ref<HTMLDivElement>
  /**
   * 时间轴列表
   */
  timelineList: Ref<HTMLElement[]>
  /**
   * 时间轴项
   */
  timelineItem: Ref<HTMLElement[]>
}
