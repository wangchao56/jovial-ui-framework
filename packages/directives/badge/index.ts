import type { Directive } from 'vue'
import { createNamespace } from '@jienix/utils'

interface BadgeOptions {
  count: number
  max: number
  rounded: boolean
  position: string
  size: string
  color: string
}
const bem = createNamespace('badge')

const badgeDirective: Directive<HTMLElement, BadgeOptions> = {
  mounted(el, binding) {
    const { count, max, rounded, position, size, color } = binding.value
    el.style.setProperty('--jv-badge-color', color || 'red')
    el.classList.add(bem.b(), bem.m(position), bem.m(size))
    if (rounded) {
      el.classList.add(bem.m('rounded'))
    }
    if (count > 0) {
      el.setAttribute('data-count', count > max ? `${max}+` : count.toString())
    }
  },
  updated(el, binding) {
    const { count, max, rounded, position, size, color } = binding.value
    el.style.setProperty('--jv-badge-color', color)
    el.classList.add(bem.b(), bem.m(position), bem.m(size))
    if (rounded) {
      el.classList.add(bem.m('rounded'))
    }
    if (count > 0) {
      el.setAttribute('data-count', count > max ? `${max}+` : count.toString())
    }
  },
}
const Badge = badgeDirective

export { Badge }
