import type { MaybeRefOrGetter, VNode, VNodeArrayChildren, VNodeChild } from 'vue'
import { isVNode, unref } from 'vue'
import { isArray, isFunction } from '../common'
/**
 * 确保只有一个子节点。
 * 如果传入的 children 不是数组或者数组长度大于1，将抛出错误。
 * 否则，返回第一个子节点。
 *
 * @param children - Vue 的 VNode 数组或未定义
 * @returns 单个 VNode
 * @throws {Error} 当 children 不是单个元素时
 */
export function ensureOnlyChild(children: VNodeArrayChildren | undefined) {
  if (!isArray(children) || children.length > 1) {
    throw new Error('expect to receive a single Vue element child')
  }
  return children[0]
}
/**
 * 从插槽中获取第一个子节点
 * @param slots - 插槽
 * @returns 第一个子节点
 */
export function getSlotsFirstChild(
  slots: () => VNodeArrayChildren | undefined,
): VNodeChild {
  const [firstChild] = isFunction(slots) ? (slots() as VNodeArrayChildren) : []
  return firstChild
}

/**
 * 判断一个vue的vnode是否为文本节点
 * @param vnode - 一个vue的vnode
 * @returns 是否为文本节点
 */
export function isTextNode(vnode: MaybeRefOrGetter<VNodeChild>) {
  const _vnode = unref(vnode)
  if (!isVNode(_vnode)) {
    // 如果不是vnode，则返回false
    return false
  }

  const result = _vnode.type === Symbol.for('v-txt')
  return result
}
/**
 * 判断一个vnode是否为slot节点
 * @param vnode - 一个vue的vnode
 * @returns 是否为slot节点
 */
export function isSlotNode(vnode: MaybeRefOrGetter<VNodeChild>) {
  const _vnode = unref(vnode)
  return isVNode(_vnode) && _vnode.type === Symbol.for('v-fgt') // 判断是否为slot节点
}

/**
 * 提取vnode的的组件name
 * @param vnode - 一个vue的vnode
 * @returns 组件name
 */
export function getComponentName(vnode: VNode) {
  if (!isVNode(vnode)) {
    return ''
  }
  if (typeof vnode.type === 'string') {
    return vnode.type
  }
  if (isTextNode(vnode)) {
    return 'v-txt'
  }
  if (isVNode(vnode.type)) {
    return (vnode.type as any).name
  }
  return ''
}
