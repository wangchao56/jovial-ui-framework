export default function useEventListener(target: Ref<HTMLElement | null | undefined> | EventTarget, eventName: Event['type'], handler: (e: Event) => void) {
  const flag = ref(false)

  if (isRef(target)) {
    watch(target, (newTarget, oldTarget) => {
      oldTarget?.removeEventListener(eventName, handler)
      newTarget?.addEventListener(eventName, handler)
    })
  }
  else {
    onMounted(() => {
      target.addEventListener(eventName, handler)
    })
  }
  onBeforeUnmount(() => {
    if (!flag.value) {
      unref(target)?.removeEventListener(eventName, handler)
    }
  })
  return () => {
    unref(target)?.removeEventListener(eventName, handler)
    flag.value = true
  }
}
