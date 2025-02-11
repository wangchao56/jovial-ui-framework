import type { Directive } from 'vue'
import { createPopper } from '@popperjs/core'

const Ellipsis: Directive = {
  mounted(el, binding) {
    let popperInstance: ReturnType<typeof createPopper> | null = null
    let popperEl: HTMLElement | null = null

    const init = () => {
      if (el.scrollWidth <= el.offsetWidth)
        return

      popperEl = document.createElement('div')
      popperEl.className = 'jv-ellipsis-popper'
      popperEl.textContent = el.textContent
      document.body.appendChild(popperEl)

      popperInstance = createPopper(el, popperEl, {
        placement: binding.arg || 'top',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'preventOverflow', options: { padding: 8 } },
        ],
      })
    }

    const show = () => {
      if (!popperEl)
        init()
      popperEl?.style.setProperty('display', 'block')
      popperInstance?.update()
    }

    const hide = () => {
      popperEl?.style.setProperty('display', 'none')
    }

    el.addEventListener('mouseenter', show)
    el.addEventListener('mouseleave', hide)

    // Cleanup
    el._ellipsisCleanup = () => {
      el.removeEventListener('mouseenter', show)
      el.removeEventListener('mouseleave', hide)
      popperInstance?.destroy()
      popperEl?.remove()
    }
  },
  beforeUnmount(el) {
    el._ellipsisCleanup?.()
  },
}
export { Ellipsis }
