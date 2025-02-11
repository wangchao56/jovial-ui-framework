import type { Slot, VNode, VNodeChild } from 'vue'

export type RenderFunction = Slot | VNode | string | null | undefined

export type RenderContent =
  | string
  | VNode
  | ((...args: any[]) => VNodeChild)
  | Element
