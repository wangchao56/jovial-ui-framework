import type { App, DeepReadonly, InjectionKey } from 'vue'
import {
  getCurrentInstance,
  getLuma,
  IN_BROWSER,
  parseColor,
} from '@jovial/utils'

const THEME_PREFIX = 'jv-theme'
const THEME_CLASS = `${THEME_PREFIX}`
const THEME_PREFIX_VARIABLE = `--${THEME_PREFIX}`
const THEME_STYLESHEET_ID = `${THEME_PREFIX}-stylesheet`

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

/** 基础颜色定义 */
interface BaseColors {
  /** 背景色 */
  background: string
  /** 表面色/前景色 */
  surface: string
  /** 主色 */
  primary: string
  /** 次色 */
  secondary: string
  /** 成功色 */
  success: string
  /** 警告色 */
  warning: string
  /** 错误色 */
  error: string
  /** 信息色 */
  info: string
}
/** 前景色 (文字颜色) */
interface OnColors {
  /** 背景色 */
  'on-background': string
  /** 表面色/前景色 */
  'on-surface': string
  /** 主色 */
  'on-primary': string
  /** 次色 */
  'on-secondary': string
  /** 成功色 */
  'on-success': string
  /** 警告色 */
  'on-warning': string
  /** 错误色 */
  'on-error': string
  /** 信息色 */
  'on-info': string
}

export interface Colors extends BaseColors, OnColors {
  [key: string]: string
}
interface InternalThemeOptions {
  cspNonce?: string
  isDisabled: boolean
  defaultTheme: string
  variations: false | VariationsOptions
  themes: Record<string, InternalThemeDefinition>
}
interface VariationsOptions {
  /** 颜色 */
  colors: string[]
  /** 浅色 */
  lighten: number
  /** 深色 */
  darken: number
}
// 定义一个类型别名ThemeOptions，它是一个对象类型
// 该对象可以包含以下属性：
interface InternalThemeDefinition {
  /** 是否为暗色主题 */
  dark: boolean
  /** 颜色配置 */
  colors: Colors
  /** 变量配置 */
  variables?: Record<string, string | number>
}
/** 主题选项 */
export interface ThemeOptions {
  /** 默认主题 */
  defaultTheme: string
  /** 主题配置 */
  themes: Record<string, DeepPartial<InternalThemeDefinition>>
}

export interface ThemeInstance {
  /** 禁用主题 */
  readonly isDisabled: boolean
  /** 主题名称 */
  readonly name: Readonly<Ref<string>>
  /** 主题类名 */
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  /** 主题配置 */
  readonly themes: Ref<Record<string, InternalThemeDefinition>>
  /** 主题类名 */
  readonly themeClasses: Readonly<Ref<string | undefined>>
  /** 样式 */
  readonly styles: Readonly<Ref<string>>
  /** 全局配置 */
  readonly global: {
    /** 主题名称 */
    readonly name: Ref<string>
    /** 当前主题 */
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  }
  /** 切换主题 */
  switch: (themeName: string) => void
}

export const ThemeSymbol: InjectionKey<ThemeInstance>
  = Symbol.for('jovial-ui-theme')

// 替换原有的getForeground函数
function getContrastText(background: string): string {
  const rgb = parseColor(background)
  // 计算相对亮度（WCAG公式）
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
  // 根据对比度选择前景色
  return luminance > 0.179 ? '#000000' : '#ffffff' // 阈值调整为4.5:1对比度
}

// 修正默认主题中的错误对比色
function genDefaults(): ThemeOptions {
  return {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#f5f5f5',
          surface: '#ffffff',
          primary: '#6200ee',
          secondary: '#03dac4',
          success: '#00c853',
          warning: '#ffd600',
          error: '#d50000',
          info: '#ccc',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#121212',
          primary: '#bb86fc',
          secondary: '#03dac4',
          success: '#00c853',
          warning: '#ffd600',
          error: '#cf6679',
          info: '#81d4fa',
        },
      },
    },
  }
}

/**
 * 创建主题
 * @param options 主题选项
 * @returns 主题实例
 */
export function createTheme(
  options: ThemeOptions = {} as ThemeOptions,
): ThemeInstance & { install: (app: App) => void } {
  const parsedOptions = Object.assign(
    {},
    genDefaults(),
    options,
  ) as InternalThemeOptions

  const name = ref(parsedOptions.defaultTheme || 'light')
  const themes = ref(parsedOptions.themes)

  // 计算主题
  const computedThemes = computed(() => {
    const result: Record<string, InternalThemeDefinition> = {}

    for (const [key, original] of Object.entries(unref(themes))) {
      const theme: InternalThemeDefinition = (result[key] = {
        dark: original.dark || false,
        colors: {
          ...original.colors,
        },
      })
      // 修改主题生成逻辑中的颜色处理部分
      for (const [color, value] of Object.entries(theme.colors)) {
        if (!value || color.startsWith('on-'))
          continue
        const onColor = `on-${color}` as keyof OnColors
        // 使用新的对比度计算方法
        theme.colors[onColor] = getContrastText(value)
      }
    }
    return result
  })

  const current = computed(() => computedThemes.value[name.value])

  // 计算样式
  const styles = computed(() => {
    const lines: string[] = []
    if (current.value?.dark) {
      // 创建一个CSS类，设置根元素的颜色方案为深色
      createCssClass(lines, ':root', ['color-scheme: dark'])
    }
    // 创建一个CSS类，设置根元素的CSS变量
    createCssClass(lines, ':root', genCssVariables(current.value))
    // 遍历计算后的主题
    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      // 创建一个CSS类，设置主题类的颜色方案和CSS变量
      createCssClass(lines, `.jv-theme--${themeName}`, [
        `color-scheme: ${theme.dark ? 'dark' : 'normal'}`,
        ...genCssVariables(theme),
      ])
    }
    // 初始化背景色和前景色的样式行数组
    const bgLines: string[] = []
    const fgLines: string[] = []
    // 创建一个颜色集合，包含所有计算后的主题颜色
    const colors = new Set(
      Object.values(computedThemes.value).flatMap(theme =>
        Object.keys(theme.colors),
      ),
    )
    // 遍历颜色集合
    for (const key of colors) {
      // 如果颜色是"on-"前缀
      if (/^on-[a-z]/.test(key)) {
        // 创建一个CSS类，设置前景色
        createCssClass(fgLines, `.${key}`, [
          `color: rgb(var(${THEME_PREFIX_VARIABLE}-${key})) !important`,
        ])
      }
      else {
        // 创建一个CSS类，设置背景色、前景色和边框颜色
        createCssClass(bgLines, `.bg-${key}`, [
          `${THEME_PREFIX_VARIABLE}-overlay-multiplier: var(${THEME_PREFIX_VARIABLE}-${key}-overlay-multiplier)`,
          `background-color: rgb(var(${THEME_PREFIX_VARIABLE}-${key})) !important`,
          `color: rgb(var(${THEME_PREFIX_VARIABLE}-on-${key})) !important`,
        ])
        // 创建一个CSS类，设置文本颜色
        createCssClass(fgLines, `.text-${key}`, [
          `color: rgb(var(${THEME_PREFIX_VARIABLE}-${key})) !important`,
        ])
        // 创建一个CSS类，设置边框颜色
        createCssClass(fgLines, `.border-${key}`, [
          `--jv-border-color: var(${THEME_PREFIX_VARIABLE}-${key})`,
        ])
      }
    }

    // 将背景色和前景色的样式行添加到总样式行数组中
    lines.push(...bgLines, ...fgLines)

    // 返回格式化后的样式行
    return lines.map((str, i) => (i === 0 ? str : `    ${str}`)).join('')
  })

  function install(_app: App) {
    // 如果主题被禁用，则直接返回
    if (parsedOptions.isDisabled)
      return

    // 获取应用的head实例
    // const head = app._context.provides.usehead as VueHeadClient<any> | undefined
    // 如果head实例不存在
    // 如果在浏览器环境中
    let styleEl = IN_BROWSER
      ? document.getElementById('vuetify-theme-stylesheet')
      : null

    // 如果在浏览器环境中
    if (IN_BROWSER) {
      // 监听样式变化，更新样式
      watch(styles, updateStyles, { immediate: true })
    }
    else {
      // 更新样式
      updateStyles()
    }

    /**
     * 更新样式
     */
    function updateStyles() {
      // 如果在浏览器环境中且样式元素不存在
      if (typeof document !== 'undefined' && !styleEl) {
        // 创建一个新的样式元素
        const el = document.createElement('style')
        // 设置样式元素的类型为text/css
        el.type = 'text/css'
        el.id = THEME_STYLESHEET_ID
        if (parsedOptions.cspNonce) {
          el.setAttribute('nonce', parsedOptions.cspNonce)
        }

        styleEl = el
        document.head.appendChild(styleEl)
      }

      if (styleEl)
        styleEl.innerHTML = styles.value
    }
  }

  const themeClasses = computed(() => parsedOptions.isDisabled ? undefined : `${THEME_CLASS}--${name.value}`)
  return {
    install,
    isDisabled: false,
    name,
    current,
    themes,
    themeClasses,
    styles,
    global: {
      name,
      current,
    },
    switch(themeName: string) {
      name.value = themeName
    },
  }
}

/**
 * 提供主题
 * @param props 主题
 * @param props.theme 主题名称
 * @returns 主题
 */
export function provideTheme(props: { theme?: string }) {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme)
    throw new Error('Could not find Vuetify theme injection')

  const name = computed<string>(() => {
    return props.theme ?? theme.name.value
  })
  const current = computed(() => theme.themes.value[name.value])

  const themeClasses = computed(() =>
    theme.isDisabled ? undefined : `${THEME_CLASS}--${name.value}`,
  )

  const newTheme: ThemeInstance = {
    ...theme,
    name,
    current,
    themeClasses,
  }

  provide(ThemeSymbol, newTheme)

  return newTheme
}

/**
 * 使用主题
 * @returns 主题
 */
export function useTheme() {
  getCurrentInstance('useTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme)
    throw new Error('Could not find Jovial theme injection')

  return theme
}

/**
 * 创建CSS类
 * @param lines 行数组
 * @param selector 选择器
 * @param declarations 声明
 */
function createCssClass(
  lines: string[],
  selector: string,
  declarations: string[],
) {
  lines.push(
    `${selector} {\n`,
    ...declarations.map(line => `  ${line};\n`),
    '}\n',
  )
}
/**
 * 生成CSS变量
 * @param theme 主题
 * @returns 生成的CSS变量
 */
function genCssVariables(theme: InternalThemeDefinition): string[] {
  // 根据主题的黑暗模式设置覆盖层的乘数
  const lightOverlay = theme.dark ? 2 : 1
  const darkOverlay = theme.dark ? 1 : 2

  // 存储生成的CSS变量
  const variables: string[] = []

  // 遍历主题颜色对象，生成CSS变量
  for (const [key, value] of Object.entries(theme.colors)) {
    // 解析颜色值为RGB对象
    const rgb = parseColor(value)
    // 添加颜色变量
    variables.push(
      `${THEME_PREFIX_VARIABLE}-${key}: ${rgb.r},${rgb.g},${rgb.b}`,
    )
    // 如果颜色键不以'on-'开头，添加覆盖层乘数变量
    if (!key.startsWith('on-')) {
      variables.push(
        `${THEME_PREFIX_VARIABLE}-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`,
      )
    }
  }

  if (!theme.variables)
    return variables

  for (const [key, value] of Object.entries(theme.variables)) {
    // 如果变量值是字符串且以'#'开头，解析为RGB对象
    const color
      = typeof value === 'string' && value.startsWith('#')
        ? parseColor(value)
        : undefined
    // 获取RGB值或原始值
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined
    // 添加变量
    variables.push(`--jv-${key}: ${rgb ?? value}`)
  }
  return variables
}
