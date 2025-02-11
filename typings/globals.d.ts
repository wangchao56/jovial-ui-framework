// Types
import type {
  ComponentInjectOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  SlotsType,
} from 'vue'

import type { ComputedOptions, Events, MethodOptions, VNode } from 'vue'
import type { TouchStoredHandlers } from '../packages/directives/touch'
import 'vue/jsx'

declare global {

  export type PropertyKey = string | number | symbol
  // 制定接口中的某些key为必选
  export type RequiredKeys<T, K extends keyof T> = {
    [P in K]-?: T[P]
  } & Omit<T, K>

  // 制定接口中的某些key为必选
  export type OptionalKeys<T, K extends keyof T> = {
    [P in K]?: T[P]
  } & Omit<T, K>
  // 方法1：直接提取共有属性名
  export type CommonKeys<T, U> = Extract<keyof T, keyof U>
  // 方法2：生成包含共有属性的完整类型
  export type CommonProperties<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K] & U[K]
  }

  /**
   * 提取A类型中存在但B类型中不存在的属性
   */
  export type Diff<A, B> = Omit<A, keyof B>

  interface HTMLCollection {
    [Symbol.iterator]: () => IterableIterator<Element>
  }

  interface Element {
    _clickOutside?: Record<
      number,
      | {
        onClick: EventListener
        onMousedown: EventListener
      }
      | undefined
    > & { lastMousedownWasOutside: boolean }
    _onResize?: Record<
      number,
      | {
        handler: () => void
        options: AddEventListenerOptions
      }
      | undefined
    >
    _ripple?: {
      enabled?: boolean
      centered?: boolean
      class?: string
      circle?: boolean
      touched?: boolean
      isTouch?: boolean
      showTimer?: number
      showTimerCommit?: (() => void) | null
    }
    _observe?: Record<
      number,
      | {
        init: boolean
        observer: IntersectionObserver
      }
      | undefined
    >
    _mutate?: Record<
      number,
      | {
        observer: MutationObserver
      }
      | undefined
    >
    _onScroll?: Record<
      number,
      | {
        handler: EventListenerOrEventListenerObject
        options: AddEventListenerOptions
        target?: EventTarget
      }
      | undefined
    >
    _touchHandlers?: {
      [_uid: number]: TouchStoredHandlers
    }
    _transitionInitialStyles?: {
      position: string
      top: string
      left: string
      width: string
      height: string
    }

    getElementsByClassName: (classNames: string) => NodeListOf<HTMLElement>
  }

  interface WheelEvent {
    path?: EventTarget[]
  }

  interface MouseEvent {
    sourceCapabilities?: { firesTouchEvents: boolean }
    shadowTarget?: EventTarget | null
  }

  interface ColorSelectionOptions {
    signal?: AbortSignal
  }

  interface ColorSelectionResult {
    sRGBHex: string
  }

  interface EyeDropper {
    open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>
  }

  interface EyeDropperConstructor {
    new (): EyeDropper
  }

  interface Window {
    EyeDropper: EyeDropperConstructor
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number

  export const __JOVIAL_VERSION__: string
  export const __REQUIRED_VUE__: string
  export const __VUE_OPTIONS_API__: boolean | undefined

  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicAttributes {
      [name: string]: any
    }
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    _: ComponentInternalInstance
  }

  export interface ComponentInternalInstance {
    provides: Record<string, unknown>
    setupState: any
  }

  export interface FunctionalComponent {
    aliasName?: string
  }

  export interface ComponentOptionsBase<
    Props,
    RawBindings,
    D,
    C extends ComputedOptions,
    M extends MethodOptions,
    Mixin extends ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin,
    E extends EmitsOptions,
    EE extends string = string,
    Defaults = {},
    I extends ComponentInjectOptions = {},
    II extends string = string,
    S extends SlotsType = {},
  > {
    aliasName?: string
  }

  export interface App {
    $nuxt?: { hook: (name: string, fn: () => void) => void }
  }

  export interface VNode {
    ctx: ComponentInternalInstance | null
    ssContent: VNode | null
  }

  type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  type Combine<T extends string> =
    | T
    | {
      [K in T]: {
        [L in Exclude<T, K>]:
          | `${K}${Exclude<T, K>}`
          | `${K}${L}${Exclude<T, K | L>}`
      }[Exclude<T, K>]
    }[T]

  type Modifiers = Combine<'Passive' | 'Capture' | 'Once'>

  type ModifiedEvents = UnionToIntersection<
    {
      [K in keyof Events]: { [L in `${K}${Modifiers}`]: Events[K] }
    }[keyof Events]
  >

  type EventHandlers<E> = {
    [K in keyof E]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
  }

  export interface HTMLAttributes extends EventHandlers<ModifiedEvents> {
    onScrollend?: (e: Event) => void
  }

  type CustomProperties = {
    [k in `--${string}`]: any
  }

  export interface CSSProperties extends CustomProperties {}

}
