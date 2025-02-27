export type ResizeListener = (entries: ResizeObserverEntry[]) => void

export function addResizeListener(element: HTMLElement, fn: ResizeListener) {
  const observer = new ResizeObserver(fn)
  observer.observe(element)
  return observer
}

export function removeResizeListener(element: HTMLElement, fn: ResizeListener) {
  const observer = new ResizeObserver(fn)
  observer.unobserve(element)
  observer.disconnect()
}
