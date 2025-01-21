import type { Slot, VNode } from 'vue'

export type RenderFunction = Slot | VNode | string | null | undefined

export type RenderContent = string | VNode | RenderFunction | null | undefined
