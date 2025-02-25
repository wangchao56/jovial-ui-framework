import type BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'
import type { MouseWheelOptions } from '@better-scroll/mouse-wheel'
import type { ScrollbarOptions } from '@better-scroll/scroll-bar'
import type { Slot, VNode, VNodeChild } from 'vue'

export type RenderFunction = Slot | VNode | string | null | undefined

export type RenderContent =
  | string
  | VNode
  | ((...args: any[]) => VNodeChild)
  | Element

export type ScrollPanelOptions = Options & { scrollbar: ScrollbarOptions } & { mouseWheel: MouseWheelOptions }

export interface ScrollPanelExpose {
  refresh: () => void
  scrollTo: (x: number, y: number, time?: number) => void
  instance?: BScroll | null
}
