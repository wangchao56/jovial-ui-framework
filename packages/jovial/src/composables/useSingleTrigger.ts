export function useSingleTrigger(handler: Function) {
  const allowed = ref(true)

  const trigger = () => {
    if (!allowed.value)
      return
    handler()
    allowed.value = false
  }

  const reset = () => {
    allowed.value = true
  }

  return { trigger, reset }
}
