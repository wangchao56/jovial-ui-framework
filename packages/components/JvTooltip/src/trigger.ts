import type { ReferenceType } from '@components/JvPopper'
import type { createNamespace } from '@jienix/utils'
import type { VNodeChild } from 'vue'
import type { TooltipProps, TriggerKeys } from './tooltip'

export interface JvTooltipTriggerProps {
  /** 是否为触发器文本节点 */
  isTriggerTextNode: boolean
  /** 触发器第一个子节点 */
  firstChild: VNodeChild
  /** 触发器 */
  activator: TooltipProps['activator']
  /** 触发器 */
  referenceRef: Ref<ReferenceType | null>
  /** 设置触发器 */
  setReference: (el: HTMLElement | null) => void
  /** 命名空间 */
  bem: ReturnType<typeof createNamespace>
  /** 触发器id */
  tootipId?: string
  /** 打开 */
  onOpen: () => void
  /** 关闭 */
  onClose: () => void
  /** 切换 */
  onToggle: () => void
  /** 触发方式 */
  trigger: TriggerKeys
  /** 父元素 */
  parentDom: Ref<HTMLElement | null>
}
