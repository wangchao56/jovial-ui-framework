import type { MutationOptions } from '@/composables'
// Types
import type { DirectiveBinding } from 'vue'

export interface MutationDirectiveBinding
  extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value:
    | MutationCallback
    | { handler: MutationCallback, options?: MutationObserverInit }
  modifiers: MutationOptions
}

function mounted(el: HTMLElement & { _mutate?: Record<string, { observer: MutationObserver }> }, binding: MutationDirectiveBinding) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { once, immediate, ...modifierKeys } = modifiers
  const defaultValue = !Object.keys(modifierKeys).length

  const { handler, options }
    = typeof value === 'object'
      ? value
      : {
          handler: value,
          options: {
            attributes: modifierKeys?.attr ?? defaultValue,
            characterData: modifierKeys?.char ?? defaultValue,
            childList: modifierKeys?.child ?? defaultValue,
            subtree: modifierKeys?.sub ?? defaultValue,
          },
        }

  const observer = new MutationObserver(
    (mutations: MutationRecord[] = [], observer: MutationObserver) => {
      handler?.(mutations, observer)

      if (once)
        unmounted(el, binding)
    },
  )

  if (immediate)
    handler?.([], observer)

  el._mutate = new Object(el._mutate) as Record<string, { observer: MutationObserver }>
  el._mutate![binding.instance!.$.uid] = { observer }

  observer.observe(el, options)
}

function unmounted(el: HTMLElement & { _mutate?: Record<string, { observer: MutationObserver }> }, binding: MutationDirectiveBinding) {
  if (!el._mutate?.[binding.instance!.$.uid])
    return

  el._mutate[binding.instance!.$.uid]!.observer.disconnect()
  delete el._mutate[binding.instance!.$.uid]
}

export const Mutate = {
  mounted,
  unmounted,
}

export default Mutate
