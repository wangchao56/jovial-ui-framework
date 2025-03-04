// Types
import type { Directive, DirectiveBinding, VNode } from 'vue'

// Utilities
import { classToHex, isCssColor, parseGradient } from '@jienix/utils'
import colors from '@jienix/utils/colors'

/**
 * 测试覆盖了指令的所有主要功能：
 * 背景颜色设置
 * 文本颜色设置
 * 边框颜色设置（包括边框方向修饰符）
 * 渐变颜色设置
 * 支持多种颜色格式（HEX、RGB、RGBA、主题颜色名）
 */

interface VuetifyThemeVariant {
  [key: string]: string
}

interface BorderModifiers {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}

function setTextColor(
  el: HTMLElement,
  color: string,
  currentTheme: Partial<VuetifyThemeVariant>,
) {
  const cssColor = !isCssColor(color)
    ? classToHex(color, colors, currentTheme)
    : color
  // 设置文本颜色
  el.style.color = cssColor
  // 设置光标颜色
  el.style.caretColor = cssColor
}

function setBackgroundColor(
  el: HTMLElement,
  color: string,
  currentTheme: Partial<VuetifyThemeVariant>,
) {
  const cssColor = !isCssColor(color)
    ? classToHex(color, colors, currentTheme)
    : color
  // 设置背景颜色
  el.style.backgroundColor = cssColor
  // 设置边框颜色
  el.style.borderColor = cssColor
}

function setBorderColor(
  el: HTMLElement,
  color: string,
  currentTheme: Partial<VuetifyThemeVariant>,
  modifiers?: BorderModifiers,
) {
  const cssColor = !isCssColor(color)
    ? classToHex(color, colors, currentTheme)
    : color

  if (!modifiers || !Object.keys(modifiers).length) {
    // 设置边框颜色
    el.style.borderColor = cssColor
    return
  }

  if (modifiers.top)
    el.style.borderTopColor = cssColor
  if (modifiers.right)
    el.style.borderRightColor = cssColor
  if (modifiers.bottom)
    el.style.borderBottomColor = cssColor
  if (modifiers.left)
    // 设置左边框颜色
    el.style.borderLeftColor = cssColor
}

function setGradientColor(
  el: HTMLElement,
  gradient: string,
  currentTheme: Partial<VuetifyThemeVariant>,
) {
  // 设置渐变颜色
  el.style.backgroundImage = `linear-gradient(${parseGradient(
    gradient,
    colors,
    currentTheme,
  )})`
}

function updateColor(
  el: HTMLElement,
  binding: DirectiveBinding,
  node: VNode & { $vuetify?: { theme: { currentTheme: VuetifyThemeVariant } } },
) {
  const currentTheme = node.$vuetify?.theme.currentTheme || {}

  if (binding.arg === undefined) {
    setBackgroundColor(el, binding.value, currentTheme)
  }
  else if (binding.arg === 'text') {
    setTextColor(el, binding.value, currentTheme)
  }
  else if (binding.arg === 'border') {
    setBorderColor(el, binding.value, currentTheme, binding.modifiers)
  }
  else if (binding.arg === 'gradient') {
    setGradientColor(el, binding.value, currentTheme)
  }
}

function update(
  el: HTMLElement,
  binding: DirectiveBinding,
  node: VNode & { $vuetify?: { theme: { currentTheme: VuetifyThemeVariant } } },
) {
  if (binding.value === binding.oldValue)
    return

  updateColor(el, binding, node)
}

export const Color: Directive = {
  mounted: updateColor,
  updated: update,
}

export default Color
