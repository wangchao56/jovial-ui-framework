/**
 * 返回给定节点的根节点
 * @param node - 要获取根节点的节点
 * @returns 如果节点未附加到DOM，则返回null；否则返回根节点（HTMLDocument或ShadowRoot）
 */
export function attachedRoot(node: Node): null | Document | ShadowRoot {
  // istanbul ignore next
  // 如果节点没有getRootNode方法（即不支持Shadow DOM，如IE11），则手动查找根节点
  if (typeof node.getRootNode !== 'function') {
    // 循环查找父节点，直到找到根节点
    while (node.parentNode) node = node.parentNode

    // 如果根节点不是document，则说明节点未附加到DOM，返回null
    if (node !== document)
      return null

    // 返回document作为根节点
    return document
  }

  // 使用getRootNode方法获取根节点
  const root = node.getRootNode()

  // 如果根节点不是document，并且根节点的组合根节点也不是document，则说明节点未附加到DOM，返回null
  if (root !== document && root.getRootNode({ composed: true }) !== document)
    return null

  // 返回根节点（HTMLDocument或ShadowRoot）
  return root as Document | ShadowRoot
}

export function on(element: Element | Document | Window, event: string, handler: EventListener): void {
  element.addEventListener(event, handler)
}

export function off(element: Element | Document | Window, event: string, handler: EventListener): void {
  element.removeEventListener(event, handler)
}
