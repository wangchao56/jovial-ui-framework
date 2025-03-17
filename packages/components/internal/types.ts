import type BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'
import type { MouseWheelOptions } from '@better-scroll/mouse-wheel'
import type { ScrollbarOptions } from '@better-scroll/scroll-bar'
import type { Ref, Slot, VNode, VNodeChild } from 'vue'

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
  scrollBy: (x: number, y: number, time?: number) => void
  scrollToElement: (el: HTMLElement, time?: number, offsetX?: number, offsetY?: number) => void
  stop: () => void
  enable: () => void
  disable: () => void
  instance: Ref<BScroll | null>
}
