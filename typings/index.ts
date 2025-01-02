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
