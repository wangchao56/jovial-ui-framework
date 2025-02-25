import type { Ref } from 'vue'
import type { I18n, useI18n } from 'vue-i18n'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '../types'
import { useModel, watch } from 'vue'

/**
 * Vue I18n适配器参数接口
 */
interface VueI18nAdapterParams {
  /** Vue I18n实例 */
  i18n: I18n<any, {}, {}, string, false>
  /** Vue I18n的useI18n组合式函数 */
  useI18n: typeof useI18n
}

/**
 * 处理属性和提供的值之间的关系
 * @param props 组件属性
 * @param prop 属性名
 * @param provided 提供的值
 * @returns 响应式引用
 */
function useProvided<T>(props: any, prop: string, provided: Ref<T>) {
  const internal = useModel(props, prop)
  internal.value = props[prop] ?? provided.value

  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = v
    }
  })

  return internal as Ref<T>
}

/**
 * 创建提供函数
 * @param data 包含当前语言、回退语言、语言包和useI18n的数据对象
 * @param data.current 当前语言引用
 * @param data.fallback 回退语言引用
 * @param data.messages 语言包引用
 * @param data.useI18n useI18n组合式函数
 * @returns 返回一个创建LocaleInstance的函数
 */
function createProvideFunction(data: {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  useI18n: typeof useI18n
}) {
  return (props: LocaleOptions): LocaleInstance => {
    // 处理locale、fallback和messages属性
    const current = useProvided(props, 'locale', data.current)
    const fallback = useProvided(props, 'fallback', data.fallback)
    const messages = useProvided(props, 'messages', data.messages)

    // 创建本地i18n实例
    const i18n = data.useI18n({
      locale: current.value,
      fallbackLocale: fallback.value,
      messages: messages.value as any,
      useScope: 'local', // 使用本地作用域
      legacy: false, // 不使用旧版模式
      inheritLocale: false, // 不继承父级的locale
    })

    // 监听当前语言变化
    watch(current, (v) => {
      i18n.locale.value = v
    })

    // 返回LocaleInstance实例
    return {
      name: 'vue-i18n',
      current,
      fallback,
      messages,
      t: (key: string, ...params: unknown[]) => i18n.t(key, params),
      n: i18n.n,
      provide: createProvideFunction({ current, fallback, messages, useI18n: data.useI18n }) as unknown as (props: LocaleOptions) => LocaleInstance,
    }
  }
}

/**
 * 创建Vue I18n适配器
 * @param param0 Vue I18n适配器参数
 * @param param0.i18n Vue I18n实例
 * @param param0.useI18n Vue I18n的useI18n组合式函数
 * @returns 国际化实例
 *
 * 功能:
 * 1. 与Vue I18n无缝集成
 * 2. 复用Vue I18n的全局配置
 * 3. 支持本地化作用域
 * 4. 提供与Jovial一致的API接口
 * 5. 支持动态切换语言
 * 6. 支持数字格式化
 */
export function createVueI18nAdapter({ i18n, useI18n }: VueI18nAdapterParams): LocaleInstance {
  const current = i18n.global.locale
  const fallback = i18n.global.fallbackLocale as Ref<any>
  const messages = i18n.global.messages

  return {
    name: 'vue-i18n',
    current,
    fallback,
    messages,
    t: ((key: string, ...params: unknown[]) => i18n.global.t(key, params)) as LocaleInstance['t'],
    n: i18n.global.n as LocaleInstance['n'],
    provide: createProvideFunction({ current, fallback, messages, useI18n }),
  }
}
