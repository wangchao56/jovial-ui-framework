<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { ThemeOptions } from './types'
import { useCssVar } from '@vueuse/core'

const themeName = ref('light')
const a = '--jv-background'

const _defaultTheme: ThemeOptions = { // 基础主题
  dark: true, // 是否有暗黑模式 默认为亮色模式
  // 主题色
  colors: {
    primary: '#000',
    surface: '#000',
    secondary: '#000',
    success: '#000',
    warning: '#000',
    error: '#000',
    info: '#000',
    // 背景
    background: {
      base: '#ccc',
      light: '#ccc',
      dark: '#000', // 暗黑模式下的背景色
    },
    // 文本
    text: {
      base: '#000',
      light: '#000',
      dark: '#fff',
    },
    // 边框
    border: {
      base: '#000',
      light: '#000',
      dark: '#fff',
    },
    // 阴影
    shadow: {
      base: '#000',
      light: '#000',
      dark: '#000',
    },
    // 禁用
    disabled: {
      base: '#000',
      light: '#000',
      dark: '#000',
    },
    // 分割线
    divider: {
      base: '#000',
      light: '#000',
      dark: '#000',
    },
    // 遮罩
    overlay: {
      base: '#000',
      light: '#000',
      dark: '#000',
    },
    // 渐变
    gradient: {
      base: '#000',
      light: '#000',
      dark: '#000',
    },
  },
  // 字体
  font: {
    fontfamily: {
      serif: 'Roboto, sans-serif',
      sans: 'Roboto, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    fontSize: {
      base: 14,
      small: 12,
      medium: 16,
      large: 18,
      xlarge: 20,
      xsmall: 10,
    },
    fontWeight: {
      base: 400,
      medium: 500,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      base: 1.5,
      small: 1.2,
      medium: 1.4,
      large: 1.8,
      xlarge: 2,
      xsmall: 1,
    },
    letterSpacing: {
      base: 0,
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
      xsmall: 0,
    },
  },
}

const customDarkTheme: Partial<ThemeOptions> = {
  dark: true, // 是否有暗黑模式 默认为亮色模式
  // 主题色
  colors: {
    primary: '#1F3A5F',
    surface: '#4d648d',
    secondary: '#acc2ef',
    success: '#3D5A80',
    warning: '#000',
    error: '#000',
    info: '#000',
    // 背景
    background: '#0F1C2E',
    // 文本
    text: '#fff',
    // 边框
    border: '#374357',
    // // 阴影
    // shadow: {
    //   light: '#000',
    //   dark: '#000',
    // },
    // // 禁用
    // disabled: {
    //   light: '#000',
    //   dark: '#000',
    // },
    // // 分割线
    // divider: {
    //   light: '#000',
    //   dark: '#000',
    // },
    // // 遮罩
    // overlay: {
    //   light: '#000',
    //   dark: '#000',
    // },
    // // 渐变
    // gradient: {
    //   light: '#000',
    //   dark: '#000',
    // },
  },
  // 字体
  // font: {
  //   family: {
  //     sans: 'Roboto, sans-serif',
  //     mono: 'Roboto Mono, monospace',
  //   },
  //   fontSize: 14,
  //   fontWeight: 400,
  //   lineHeight: 1.5,
  //   letterSpacing: 0,
  // },
}

function handleClick() {
  toggleTheme()
  // document.documentElement.style.setProperty(a, '#000')// 方法一
  if (customDarkTheme[themeName.value]) {
    Object.keys(customDarkTheme.colors as {}).forEach((key) => {
      document.documentElement.style.setProperty(`--jv-theme-${key}-color`, customDarkTheme.colors[key] as string)
    })
  }
}

function handleTwo() { // 方法二 创建一个新的style标签
  toggleTheme()
  const theme = 'jieni' // 主题名称
  const curStyleDom = document.getElementById(`style-${theme}`)
  if (curStyleDom && themeName.value === 'light') {
    document.head.removeChild(curStyleDom)
    return
  }

  if (!customDarkTheme[themeName.value]) {
    return
  }
  const styleDom = document.createElement('style') // 方法二
  styleDom.type = 'text/css'
  styleDom.id = `style-${theme}`

  let style = '[data-theme="dark"]{'
  if (customDarkTheme.colors) {
    Object.keys(customDarkTheme.colors as {}).forEach((key) => {
      style += `--jv-theme-${key}-color:${customDarkTheme.colors[key]};`
    })
  }
  style += '}'
  styleDom.textContent = style
  document.head.appendChild(styleDom)
}

// 方法三 ps: 淘汰
function handleThree() {
  toggleTheme()
  const cssVar = useCssVar(a)
  if (customDarkTheme[themeName.value] && customDarkTheme.colors) {
    Object.keys(customDarkTheme.colors as {}).forEach((key) => {
      window.CSS.registerProperty({
        name: `--jv-theme-${key}-color`,
        syntax: '<color>',
        inherits: false,
        initialValue: key === 'background' ? '#ffb787' : customDarkTheme.colors[key] as string,
      })
    })
  }
  if (unref(cssVar)) {
    // 存在，修改
    // cssVar.value = '#000' //不行
  }
  // 不存在，注册
  // window.CSS.supports('(a: 1)')
}

// 方法四 使用css module
const cssModel = useCssModule('jieni')

function handleFour() {
  toggleTheme()
  if (customDarkTheme[themeName.value]) {
    document.documentElement.setAttribute('id', cssModel.proprety)
  }
  else {
    document.documentElement.removeAttribute('id')
  }
}
// 在已有的css表中添加变量

function addSheets(params: CSSProperties) {
  const newstyleSheet = new CSSStyleSheet()

  Object.keys(params).forEach((key) => {
    newstyleSheet.insertRule(`:root{${key}:${params[key]};}`)
  })
  // newstyleSheet.replaceSync(params)
  console.log(document.adoptedStyleSheets)

  document.adoptedStyleSheets.push(newstyleSheet)
}

// 方法五 使用CSSStyleSheet API
function handleFive() {
  toggleTheme()
  if (!customDarkTheme[themeName.value] && themeName.value === 'light') {
    const params = {
    }
    if (customDarkTheme.colors) {
      Object.keys(customDarkTheme.colors as {}).forEach((key) => {
        params[`--jv-theme-${key}-color`] = customDarkTheme.colors[key] as string
      })
      params[`--jv-theme-background-color`] = '#c21d03'
      addSheets(params)
    }
  }
  else {
    document.adoptedStyleSheets = []
  }
}

// 方法六 使用CSSStyleSheet API 对应的去修改每一个css变量
function handleSix() {
  toggleTheme()
  const _styleSheets = document.styleSheets

  // console.log(cssRules.find(item => item.selectorText && item.selectorText.includes('data-theme')))

  if (customDarkTheme[themeName.value]) {
    const params = {
    }
    if (customDarkTheme.colors) {
      Object.keys(customDarkTheme.colors as {}).forEach((key) => {
        params[`--jv-theme-${key}-color`] = customDarkTheme.colors[key] as string
      })
    }
  }
}

function toggleTheme() {
  // 切换主题
  // 当前主题
  const currentTheme = document.documentElement.dataset.theme || 'light'
  themeName.value = currentTheme === 'dark' ? 'light' : 'dark'
  // 方法一
  document.documentElement.dataset.theme = themeName.value
  document.documentElement.removeAttribute('style')
  // 主题切换动画
}

const boxStyle = computed(() => {
  return {
    backgroundColor: '#fff',
    width: 'max-content',
    height: 'max-content',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.5s ease-in-out',
  }
})
</script>

<template>
  <div :style="boxStyle">
    <JvButton type="success" :class="cssModel.proprety" @click="handleClick">
      方法一
    </JvButton>
    <JvButton type="success" @click="handleTwo">
      方法二
    </JvButton>
    <JvButton type="success" @click="handleThree">
      方法三
    </JvButton>
    <JvButton type="success" @click="handleFour">
      方法四
    </JvButton>
    <JvButton type="success" @click="handleFive">
      方法五
    </JvButton>
    <JvButton type="success" @click="handleSix">
      方法六
    </JvButton>
    <div class="proprety">
      <JvButton type="success" @click="toggleTheme">
        切换主题
      </JvButton>
    </div>
  </div>
</template>

<style  module="jieni">
#proprety {
  --jv-theme-primary-color: #6c35de;
  --jv-theme-surface-color: #a364ff;
  --jv-theme-secondary-color: #ffc7ff;
  --jv-theme-success-color: #cb80ff;
  --jv-theme-warning-color: #373737;
  --jv-theme-error-color: #fff;
  --jv-theme-info-color: #e0e0e0;
  --jv-theme-background-color: #ffc7ff;
  --jv-theme-text-color: #e0e0e0;
  --jv-theme-border-color: #342a45;
}
</style>

<style  module="jienicss2">
.proprety {
  --jv-btn-background: var(--jv-theme-border-color);

  transition: background-color 0.5s ease-in-out;
}
</style>

<style scoped>
.jv-button {
  --jv-btn-background: var(--jv-theme-border-color);

  background-color: var(--jv-btn-background) !important;
  color: var(--jv-theme-text-color) !important;
  border-color: var(--jv-theme-border-color) !important;
}
</style>
