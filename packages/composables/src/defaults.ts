import type { MaybeRef } from '@jienix/utils'
// Types
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue'
import { getCurrentInstance, injectSelf, mergeDeep, toKebabCase } from '@jienix/utils'

// Utilities
import {
  computed,
  inject,
  provide,
  ref,
  shallowRef,
  unref,
  watchEffect,
} from 'vue'

export type DefaultsInstance =
  | undefined
  | {
    [key: string]: undefined | Record<string, unknown>
    global?: Record<string, unknown>
  }

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>>
  = Symbol.for('jovial:defaults')

export function createDefaults(
  options?: DefaultsInstance,
): Ref<DefaultsInstance> {
  return ref(options)
}

export function injectDefaults() {
  const defaults = inject(DefaultsSymbol)

  if (!defaults)
    throw new Error('[Jovial] Could not find defaults instance')

  return defaults
}

export function provideDefaults(
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    disabled?: MaybeRef<boolean | undefined>
    reset?: MaybeRef<number | string | undefined>
    root?: MaybeRef<boolean | string | undefined>
    scoped?: MaybeRef<boolean | undefined>
  },
) {
  const injectedDefaults = injectDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    const disabled = unref(options?.disabled)

    if (disabled)
      return injectedDefaults.value

    const scoped = unref(options?.scoped)
    const reset = unref(options?.reset)
    const root = unref(options?.root)

    if (providedDefaults.value == null && !(scoped || reset || root))
      return injectedDefaults.value

    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value,
    })

    if (scoped)
      return properties

    if (reset || root) {
      const len = Number(reset || Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break
        }

        properties = properties.prev
      }

      if (properties && typeof root === 'string' && root in properties) {
        properties = mergeDeep(
          mergeDeep(properties, { prev: properties }),
          properties[root],
        )
      }

      return properties
    }

    return properties.prev ? mergeDeep(properties.prev, properties) : properties
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}

function propIsDefined(vnode: VNode, prop: string) {
  return (
    typeof vnode.props?.[prop] !== 'undefined'
    || typeof vnode.props?.[toKebabCase(prop)] !== 'undefined'
  )
}
/**
 * 内部使用默认值
 * @param props - 可选的属性对象，默认为空对象
 * @param name - 可选的组件名称
 * @param defaults - 可选的默认值，默认为注入的默认值
 * @returns 一个对象，包含处理后的属性和提供子组件默认值的函数
 */
export function internalUseDefaults(
  props: Record<string, any> = {},
  name?: string,
  defaults = injectDefaults(),
) {
  // 获取当前组件实例
  const vm = getCurrentInstance('useDefaults')

  // 如果没有提供名称，则使用组件实例的名称
  name = name ?? vm.type.name ?? vm.type.__name
  // 如果没有找到组件名称，则抛出错误
  if (!name) {
    throw new Error('[Jovial] Could not determine component name')
  }

  // 创建一个计算属性，用于获取组件的默认值
  const componentDefaults = computed(() => defaults.value?.[props._as ?? name])
  // 创建一个代理对象，用于处理属性
  const _props = new Proxy(props, {
    get(target, prop) {
      // 获取属性的值
      const propValue = Reflect.get(target, prop)
      // 如果属性是 class 或 style，则返回默认值和属性值的数组
      if (prop === 'class' || prop === 'style') {
        return [componentDefaults.value?.[prop], propValue].filter(
          v => v != null,
        )
      }
      // 如果属性是字符串，并且在 VNode 的 props 中未定义
      else if (typeof prop === 'string' && !propIsDefined(vm.vnode, prop)) {
        // 返回组件默认值、全局默认值或属性值
        return componentDefaults.value?.[prop] !== undefined
          ? componentDefaults.value?.[prop]
          : defaults.value?.global?.[prop] !== undefined
            ? defaults.value?.global?.[prop]
            : propValue
      }
      // 返回属性值
      return propValue
    },
  })

  // 创建一个浅引用，用于存储子组件的默认值
  const _subcomponentDefaults = shallowRef()
  // 监听组件默认值的变化
  watchEffect(() => {
    // 如果组件默认值存在
    if (componentDefaults.value) {
      // 过滤出以大写字母开头的子组件
      const subComponents = Object.entries(componentDefaults.value).filter(
        ([key]) => key.startsWith(key[0].toUpperCase()),
      )
      // 如果有子组件，则将子组件的默认值存储在 _subcomponentDefaults 中
      _subcomponentDefaults.value = subComponents.length
        ? Object.fromEntries(subComponents)
        : undefined
    }
    // 如果组件默认值不存在，则将 _subcomponentDefaults 设置为 undefined
    else {
      _subcomponentDefaults.value = undefined
    }
  })

  /**
   * 提供子组件的默认值
   */
  function provideSubDefaults() {
    // 注入默认值
    const injected = injectSelf(DefaultsSymbol, vm)
    // 提供新的默认值
    provide(
      DefaultsSymbol,
      computed(() => {
        // 如果有子组件的默认值，则合并注入的默认值和子组件的默认值
        return _subcomponentDefaults.value
          ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value)
          : injected?.value
      }),
    )
  }
  // 返回处理后的属性和提供子组件默认值的函数
  return { props: _props, provideSubDefaults }
}

export function useDefaults<T extends Record<string, any>>(
  props: T,
  name?: string
): T
export function useDefaults(
  props?: undefined,
  name?: string
): Record<string, any>
export function useDefaults(props: Record<string, any> = {}, name?: string) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name)
  provideSubDefaults()
  return _props
}
