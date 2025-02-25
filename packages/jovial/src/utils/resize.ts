export function addResizeListener(element: HTMLElement, fn: () => void) {
  const observer = new ResizeObserver(fn)
  observer.observe(element)
  return observer
}

export function removeResizeListener(element: HTMLElement, observer: ResizeObserver) {
  observer.unobserve(element)
}
