import type { VNodeChild } from 'vue'

export type Arrayable<T> = T | T[]

export type ArrayMethodKey = keyof any[]

export type TupleKey<T extends ReadonlyArray<any>> = Exclude<
  keyof T,
  ArrayMethodKey
>
export type ArrayKey = number

export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
  ? false
  : true
export type BrowserNativeObject = Date | FileList | File | Blob | RegExp

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type PathImpl<K extends string | number, V> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`

export type Path<T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKey<T>]-?: PathImpl<Exclude<K, symbol>, T[K]>
        }[TupleKey<T>]
      : PathImpl<ArrayKey, V>
    : {
        [K in keyof T]-?: PathImpl<Exclude<K, symbol>, T[K]>
      }[keyof T]
export type FieldPath<T> = T extends object ? Path<T> : never

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type Slot<T extends any[] = any[]> = ((...args: T) => VNodeChild | VNodeChild[]) | undefined

export type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu'
export type Type =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
export type Variant =
  | 'text'
  | 'flat'
  | 'tonal'
  | 'plain'
  | 'elevated'
  | 'outlined'
export type Size = 'tiny' | 'small' | 'medium' | 'large' | 'x-large'
export enum SizeOptions {
  'TINY' = 'tiny',
  'SMALL' = 'small',
  'MEDIUM' = 'medium',
  'LARGE' = 'large',
  'X-LARGE' = 'x-large',
}

/** 按钮的 DOM 的 type 属性 */
export type NativeType = 'button' | 'submit' | 'reset'
/**
 * 提取A类型中存在但B类型中不存在的属性
 * 示例:
 * interface A {
 *  id: number;
 *  name: string;
 * }
 * interface B {
 *  id: number;
 *  name: string;
 *  email: string;
 * }
 * 结果类型为 { id: number; name: string }
 * type DiffAB = Diff<A, B>;
 */
export type Diff<A, B> = Omit<A, keyof B>

/**
 * 提取A类型中存在但B类型中不存在的属性
 * 示例:
 * interface A {
 *  id: number;
 *  name: string;
 * }
 * interface B {
 *  id: number;
 *  name: string;
 * }
 * 结果类型为 { id: number & string; name: string }
 * type CommonPropsAB = CommonProperties<A, B>;
 */
export type CommonProperties<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K] & U[K];
}
